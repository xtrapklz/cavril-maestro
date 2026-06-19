/**
 * Cavril Maestro — Director panel (v0.8)
 * Tabbed picker over Music (soundscapes), Ambience (emberEnvironment themes,
 * day/night collapsed into one generic-named entry), optional Weather, and an
 * optional Soundboard of one-shot SFX from a configured folder. List or
 * icon-grid layout; GM-authored custom cue names. Everything routes through the
 * public Maestro.* API, which broadcasts to all players.
 */

import { soundscapes } from "./soundscapes.mjs";
import {
  CATEGORIES, WEATHER, prettify, musicMeta, hasTension, moodVariant,
  ambienceBase, ambienceMeta
} from "./meta.mjs";
import { MaestroMixer } from "./mixer.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const MODULE_ID = "cavril-maestro";

function orderedGroups(byCat) {
  return Object.keys(CATEGORIES)
    .filter(k => byCat[k]?.length)
    .map(k => ({
      key: k, label: CATEGORIES[k].label, icon: CATEGORIES[k].icon,
      // Group sub-types together by icon (e.g. all cities, all docks, all farms),
      // then alphabetical within each sub-type.
      items: byCat[k].sort((a, b) =>
        String(a.icon).localeCompare(String(b.icon)) || a.name.localeCompare(b.name))
    }));
}

export class MaestroDirector extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "maestro-director",
    classes: ["maestro-director"],
    window: { title: "Maestro — Music Director", icon: "fa-solid fa-compact-disc", resizable: true },
    position: { width: 420, height: 640 }
  };

  static PARTS = { body: { template: `modules/${MODULE_ID}/templates/director.hbs` } };

  /** @type {string} live search query, preserved across re-renders */
  #search = "";
  /** @type {string} active zone ("music"|"amb"|"weather"|"sfx"), preserved */
  #tab = "music";
  /** soundboard navigation: current folder, per-folder cache, root tracking */
  #sbPath = null;            // null = root (the configured folder)
  #sbCache = new Map();      // path → { dirs, files }
  #sbBusy = false;
  #sbRootSeen = null;        // detect a changed root path → reset cache + nav
  #mixBusy = false;          // a waveform-analysis batch is running

  /* ----- singleton ----- */
  static #instance = null;
  static open() {
    MaestroDirector.#instance ??= new MaestroDirector();
    MaestroDirector.#instance.render({ force: true });
    return MaestroDirector.#instance;
  }
  static refresh() {
    if (MaestroDirector.#instance?.rendered) MaestroDirector.#instance.render();
  }

  #channelVolume(channel) {
    const v = Maestro.sound?.channels?.[channel]?.volume;
    return Number.isFinite(v) ? v : 0.8;
  }

  /** Custom GM label for a cue, or "" if none. */
  #cn(kind, id) { return (id && Maestro.customName?.(kind, id)) || ""; }

  /** Whether a cue is favorited. */
  #fav(kind, id) { return !!Maestro.isFavorite?.(kind, id); }

  /** Build the radial morpher view for a channel (anchors placed on a circle), or null. */
  #morphView(channel) {
    const info = MaestroMixer.tracksFor?.(channel);
    if (!info || !info.tracks.length) return null;
    const CX = 100, CY = 100, R = 78;
    const tracks = info.tracks.map(t => ({
      id: t.id, label: prettify(t.id), muted: t.muted,
      x: +(CX + R * Math.cos(t.angle)).toFixed(1),
      y: +(CY + R * Math.sin(t.angle)).toFixed(1)
    }));
    return { tracks, puckX: CX, puckY: CY };
  }

  /** Lazily run (cached) waveform analysis for a channel's tracks, then re-render. */
  #maybeAnalyze(channel) {
    if (!game.user?.isGM || this.#mixBusy) return;
    const info = MaestroMixer.tracksFor?.(channel);
    if (!info || !info.tracks.some(t => t.src && !Number.isFinite(t.feature))) return;
    this.#mixBusy = true;
    MaestroMixer.analyzeTracks(channel)
      .then(changed => { if (changed && this.rendered) this.render(); })
      .catch(() => {})
      .finally(() => { this.#mixBusy = false; });
  }

  /** The currently-active tab, falling back to Music if its zone is disabled. */
  #activeTab(weatherEnabled, sbEnabled) {
    if (this.#tab === "weather" && !weatherEnabled) return "music";
    if (this.#tab === "sfx" && !sbEnabled) return "music";
    return this.#tab;
  }

  async _prepareContext(_options) {
    const cfg = Maestro.sound?.getActiveConfiguration?.() ?? {};
    const music = cfg.music ?? {}, env = cfg.environment ?? {}, weather = cfg.weather ?? {};
    const layout = game.settings.get(MODULE_ID, "gridLayout") ? "grid" : "list";
    const weatherEnabled = !!game.settings.get(MODULE_ID, "weatherEnabled");
    const sbEnabled = !!game.settings.get(MODULE_ID, "soundboardEnabled");
    const tab = this.#activeTab(weatherEnabled, sbEnabled);

    // Music grouped by category (custom name overrides the curated one).
    const musicByCat = {};
    for (const s of Object.values(soundscapes)) {
      if (s?.type !== "music") continue;
      const m = musicMeta(s.id);
      const custom = this.#cn("music", s.id);
      (musicByCat[m.cat] ??= []).push({
        id: s.id, favId: s.id, fav: this.#fav("music", s.id), base: m.name, name: custom || m.name, cat: m.cat,
        sub: custom ? m.name : s.id, icon: m.icon, active: s.id === music.soundscapeId
      });
    }

    // Ambience: collapse day/night into one generic-named THEME entry.
    const ambByCat = {};
    const baseToCanonical = {};          // theme base → playable arrangement id (for favorites)
    const envArrs = soundscapes.emberEnvironment?.arrangements ?? {};
    const curBase = ambienceBase(env.arrangementId || "");
    const seen = new Set();
    for (const arrId of Object.keys(envArrs)) {
      const base = ambienceBase(arrId);
      if (seen.has(base)) continue;
      seen.add(base);
      // Canonical playable id: prefer the day variant; auto day/night swaps it.
      const dayId = `${base}Day`, nightId = `${base}Night`;
      const canonical = envArrs[dayId] ? dayId : (envArrs[nightId] ? nightId : (envArrs[base] ? base : arrId));
      baseToCanonical[base] = canonical;
      const m = ambienceMeta(canonical);
      const custom = this.#cn("amb", base);
      (ambByCat[m.cat] ??= []).push({
        id: canonical, renameId: base, base, favId: base, fav: this.#fav("amb", base), cat: m.cat,
        name: custom || m.name, sub: custom ? m.name : (envArrs[canonical]?.label ?? ""),
        icon: m.icon, active: !!env.arrangementId && base === curBase
      });
    }

    // Weather (optional).
    const weatherItems = weatherEnabled
      ? Object.keys(soundscapes.weather?.arrangements ?? {}).map(id => {
          const base = WEATHER[id] ?? prettify(id);
          const custom = this.#cn("weather", id);
          return { id, favId: id, fav: this.#fav("weather", id), base, name: custom || base, cat: "weather", active: id === weather.arrangementId };
        })
      : [];

    // Soundboard (optional) — folders + files for the current folder, from cache.
    const sbRoot = String(game.settings.get(MODULE_ID, "soundboardPath") || "").trim();
    const sbCur = this.#sbPath || sbRoot;
    const sbEntry = sbEnabled ? this.#sbCache.get(sbCur) : null;
    const sbDirs = (sbEntry?.dirs ?? []).map(d => ({ path: d.path, name: d.name }));
    const soundboard = (sbEntry?.files ?? []).map(f => ({ src: f.src, favId: f.src, fav: this.#fav("sfx", f.src), name: f.name, cat: "sfx" }));

    // Favorites — any starred cue, grouped by type, sorted by sub-type then name.
    const favByCat = {};
    const favs = Maestro.favorites?.() ?? {};
    for (const key of Object.keys(favs)) {
      if (!favs[key]) continue;
      const ci = key.indexOf(":");
      const kind = key.slice(0, ci), fid = key.slice(ci + 1);
      let it = null;
      if (kind === "music" && soundscapes[fid]) {
        const m = musicMeta(fid);
        it = { kind, favId: fid, fav: true, id: fid, name: this.#cn("music", fid) || m.name, sub: m.name, icon: m.icon, cat: m.cat };
      } else if (kind === "amb" && baseToCanonical[fid]) {
        const canonical = baseToCanonical[fid];
        const m = ambienceMeta(canonical);
        it = { kind, favId: fid, fav: true, id: canonical, name: this.#cn("amb", fid) || m.name, sub: "", icon: m.icon, cat: m.cat };
      } else if (kind === "weather") {
        it = { kind, favId: fid, fav: true, id: fid, name: this.#cn("weather", fid) || WEATHER[fid] || prettify(fid), sub: "", icon: "fa-solid fa-cloud", cat: "weather" };
      } else if (kind === "sfx") {
        const nm = prettify(decodeURIComponent(fid.split("?")[0].split("/").pop() || "").replace(/\.[a-z0-9]+$/i, ""));
        it = { kind, favId: fid, fav: true, src: fid, name: nm, sub: "", icon: "fa-solid fa-volume-high", cat: "sfx" };
      }
      if (it) (favByCat[it.cat] ??= []).push(it);
    }
    const favoriteGroups = orderedGroups(favByCat);
    const sbAtRoot = !sbEnabled || sbCur === sbRoot;
    const sbFolderName = sbAtRoot ? "" : prettify(decodeURIComponent(sbCur.replace(/\/+$/, "").split("/").pop() || ""));

    const musicGroups = orderedGroups(musicByCat);
    const ambienceGroups = orderedGroups(ambByCat);
    const counts = {
      music: musicGroups.reduce((n, g) => n + g.items.length, 0),
      amb: ambienceGroups.reduce((n, g) => n + g.items.length, 0),
      weather: weatherItems.length,
      sfx: soundboard.length,
      fav: favoriteGroups.reduce((n, g) => n + g.items.length, 0)
    };

    // Active music soundscape — arrangement select + mood.
    const cur = soundscapes[music.soundscapeId];
    const arrangements = cur
      ? Object.entries(cur.arrangements ?? {})
          .filter(([id]) => !/tension/i.test(id))
          .map(([id, v]) => ({ id, label: v?.label ?? prettify(id), selected: id === music.arrangementId }))
      : [];
    const onTension = !!music.arrangementId && /tension/i.test(music.arrangementId);
    const phase = Maestro.dayPhase?.() ?? "day";

    return {
      ready: !!Maestro.sound,
      assetWarning: !game.settings.get(MODULE_ID, "assetBasePath"),
      search: this.#search,
      phase, phaseIcon: phase === "night" ? "fa-moon" : "fa-sun",
      autoDayNight: !!game.settings.get(MODULE_ID, "autoDayNight"),
      layout, layoutList: layout === "list", layoutGrid: layout === "grid",
      weatherEnabled, sbEnabled,
      autoWeather: !!game.settings.get(MODULE_ID, "autoWeather"),
      tabMusic: tab === "music", tabAmb: tab === "amb", tabWeather: tab === "weather", tabSfx: tab === "sfx", tabFav: tab === "fav",
      counts,
      musicGroups, ambienceGroups, weatherItems, soundboard, sbDirs, favoriteGroups,
      // Per-track morphers (one per category, by active theme)
      musicMorph: this.#morphView("music"),
      ambMorph: this.#morphView("environment"),
      // Music transport
      hasMusic: !!music.soundscapeId,
      nowMusic: music.soundscapeId ? (this.#cn("music", music.soundscapeId) || musicMeta(music.soundscapeId).name) : "—",
      arrangements,
      canTension: cur ? hasTension(cur) : false,
      calmActive: !!music.soundscapeId && !onTension,
      tensionActive: onTension,
      // Ambience transport
      hasAmb: !!env.arrangementId,
      nowAmb: env.arrangementId ? (this.#cn("amb", curBase) || ambienceMeta(env.arrangementId).name) : "—",
      // Weather transport
      hasWeather: !!weather.arrangementId,
      nowWeather: weather.arrangementId ? (this.#cn("weather", weather.arrangementId) || WEATHER[weather.arrangementId] || prettify(weather.arrangementId)) : "—",
      // Footer volumes (icon-only sliders)
      musicVolume: this.#channelVolume("music"),
      envVolume: this.#channelVolume("environment"),
      weatherVolume: this.#channelVolume("weather"),
      sfxVolume: (() => { const v = Number(game.settings.get(MODULE_ID, "sfxVolume")); return Number.isFinite(v) ? v : 0.8; })(),
      // Soundboard meta
      sbPath: sbCur,
      sbAtRoot, sbFolderName,
      sbLoading: sbEnabled && this.#sbBusy,
      sbWarning: sbEnabled && !sbRoot,
      sbEmpty: sbEnabled && !this.#sbBusy && !!sbEntry && soundboard.length === 0 && sbDirs.length === 0 && !!sbRoot
    };
  }

  _onRender(_context, _options) {
    const el = this.element;
    const on = (sel, evt, fn) => el.querySelector(sel)?.addEventListener(evt, fn);
    const onAll = (sel, evt, fn) => el.querySelectorAll(sel).forEach(n => n.addEventListener(evt, fn));

    // Lazy-load the current soundboard folder (re-scan when the root changes).
    if (game.settings.get(MODULE_ID, "soundboardEnabled")) {
      const root = String(game.settings.get(MODULE_ID, "soundboardPath") || "").trim();
      if (this.#sbRootSeen !== root) { this.#sbRootSeen = root; this.#sbCache.clear(); this.#sbPath = null; }
      const cur = this.#sbPath || root;
      if (root && !this.#sbBusy && !this.#sbCache.has(cur)) {
        this.#sbBusy = true;
        Maestro.browseSoundboard(cur)
          .then(r => { this.#sbCache.set(cur, r); })
          .catch(() => { this.#sbCache.set(cur, { dirs: [], files: [] }); })
          .finally(() => { this.#sbBusy = false; this.render(); });
      }
    }

    // Per-track morpher — (cached) timbre analysis + wire each embedded pad.
    this.#maybeAnalyze("music");
    this.#maybeAnalyze("environment");
    el.querySelectorAll(".mini-morph").forEach(box => {
      const channel = box.dataset.channel;
      const svg = box.querySelector(".mm-svg");
      const puck = svg?.querySelector(".mm-puck");
      if (!svg || !puck) return;
      const CX = 100, CY = 100, R = 78;
      const toSvg = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * 200, y: (ev.clientY - r.top) / r.height * 200 }; };
      const clamp = (x, y) => { const dx = x - CX, dy = y - CY, d = Math.hypot(dx, dy); return d <= R ? { x, y } : { x: CX + dx / d * R, y: CY + dy / d * R }; };
      let dragging = false, bc = null;
      const update = (x, y) => {
        puck.setAttribute("cx", x.toFixed(1)); puck.setAttribute("cy", y.toFixed(1));
        const pr = Math.min(1, Math.hypot(x - CX, y - CY) / R), pa = Math.atan2(y - CY, x - CX);
        MaestroMixer.applyMix(channel, pr, pa);
        clearTimeout(bc); bc = setTimeout(() => MaestroMixer.broadcast(channel), 120);
      };
      const onMove = ev => { if (dragging) { const p = clamp(...Object.values(toSvg(ev))); update(p.x, p.y); } };
      const onUp = () => { dragging = false; window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); MaestroMixer.broadcast(channel); };
      svg.addEventListener("pointerdown", ev => {
        const anchor = ev.target.closest?.(".mm-anchor");
        if (anchor) { ev.stopPropagation(); MaestroMixer.toggleMute(channel, anchor.dataset.id); return; }   // dot = mute toggle
        dragging = true; const s = toSvg(ev), p = clamp(s.x, s.y); update(p.x, p.y);
        window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
      });
    });

    // Live search filter (scoped to the active zone, no re-render).
    const applyFilter = () => {
      const q = (el.querySelector('[name="search"]')?.value ?? "").trim().toLowerCase();
      this.#search = q;
      const zone = el.querySelector(".maestro-zone.active") ?? el;
      for (const it of zone.querySelectorAll(".maestro-item")) {
        const hay = `${it.dataset.name ?? ""} ${it.dataset.id ?? ""} ${it.dataset.default ?? ""}`.toLowerCase();
        it.classList.toggle("hidden", !!q && !hay.includes(q));
      }
      for (const grp of zone.querySelectorAll(".grp")) {
        let n = grp.nextElementSibling, any = false;
        while (n && n.classList.contains("maestro-item")) { if (!n.classList.contains("hidden")) { any = true; break; } n = n.nextElementSibling; }
        grp.classList.toggle("hidden", !any);
      }
    };
    on('[name="search"]', "input", applyFilter);

    // Zone tabs — switch without a re-render so search/scroll stay put.
    onAll('[data-tab]', "click", e => {
      this.#tab = e.currentTarget.dataset.tab;
      el.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle("active", b.dataset.tab === this.#tab));
      el.querySelectorAll(".maestro-zone").forEach(z => z.classList.toggle("active", z.dataset.zone === this.#tab));
      if (this.#tab === "music") this.#maybeAnalyze("music");
      else if (this.#tab === "amb") this.#maybeAnalyze("environment");
      applyFilter();
    });

    // Layout toggle (persists per-user; re-render to re-flow the grid).
    onAll('[data-layout]', "click", async e => {
      await game.settings.set(MODULE_ID, "gridLayout", e.currentTarget.dataset.layout === "grid");
      this.render();
    });

    // Soundboard refresh (rescan) + back-to-main-board.
    on('[data-sb-refresh]', "click", () => { this.#sbCache.clear(); this.render(); });
    on('[data-sb-home]', "click", () => { this.#sbPath = null; this.render(); });

    // Rename pencil — blank reverts to the built-in name.
    onAll('[data-rename]', "click", async e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (!item) return;
      const { kind, id, renameId, name, default: base } = item.dataset;
      await this.#promptRename(kind, renameId || id, name, base);
    });

    // Favorite star — toggle (per-user; onChange re-renders).
    onAll('[data-fav]', "click", e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (item) Maestro.toggleFavorite(item.dataset.kind, item.dataset.favId);
    });

    // Item clicks (the row is the button; the pencil stops propagation).
    onAll(".maestro-item", "click", e => {
      const { kind, id, src, path } = e.currentTarget.dataset;
      if (kind === "music") Maestro.play(id, { channel: "music" });
      else if (kind === "amb") Maestro.play("emberEnvironment", { channel: "environment", arrangementId: id });
      else if (kind === "weather") Maestro.play("weather", { channel: "weather", arrangementId: id });
      else if (kind === "sbdir") { this.#sbPath = path; this.render(); return; }      // into a sub-folder
      else if (kind === "sfx") { Maestro.playOneShot(src); this.#sbPath = null; this.render(); return; } // play, then back to main board
      this.render();
    });
    onAll(".maestro-item", "keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.click(); }
    });

    // Music controls — variation buttons (replace the dropdown)
    onAll('[data-arrangement]', "click", e => {
      const id = Maestro.sound?.getActiveConfiguration?.().music?.soundscapeId;
      if (id) Maestro.play(id, { channel: "music", arrangementId: e.currentTarget.dataset.arrangement });
    });
    // Calm/Tension switch — toggles between the calm and tension counterpart.
    on('[data-mood-switch]', "click", () => {
      const m = Maestro.sound?.getActiveConfiguration?.().music ?? {};
      if (!m.soundscapeId) return;
      const onTension = /tension/i.test(m.arrangementId || "");
      const target = moodVariant(soundscapes[m.soundscapeId], m.arrangementId, onTension ? "calm" : "tension");
      if (target) Maestro.play(m.soundscapeId, { channel: "music", arrangementId: target });
      this.render();
    });
    on('[data-reroll]', "click", () => Maestro.rearrange("music"));

    // Stops — fade out at the crossfade pace (the eventual stop re-renders via onChange).
    onAll('[data-stop]', "click", e => { Maestro.fadeOutChannel(e.currentTarget.dataset.stop); });
    on('[data-stopall]', "click", () => { Maestro.stopAll(); });

    // Footer per-type volumes (icon-only sliders).
    on('[name="music-volume"]', "change", e => this.#setVolume("music", e.target.value));
    on('[name="environment-volume"]', "change", e => this.#setVolume("environment", e.target.value));
    on('[name="weather-volume"]', "change", e => this.#setVolume("weather", e.target.value));
    on('[name="sfx-volume"]', "change", e => game.settings.set(MODULE_ID, "sfxVolume", Number(e.target.value)));

    applyFilter(); // re-apply preserved search after a re-render
  }

  async #setVolume(channel, value) {
    const sound = Maestro.sound?.channels?.[channel];
    if (sound) await sound.update({ volume: Number(value) });
  }

  /** Prompt for a new label for a cue and persist it (blank reverts to default). */
  async #promptRename(kind, id, current, base) {
    const DialogV2 = foundry.applications?.api?.DialogV2;
    const esc = s => String(s ?? "").replace(/"/g, "&quot;");
    let next = null;
    if (DialogV2?.prompt) {
      next = await DialogV2.prompt({
        window: { title: `Rename — ${base ?? id}`, icon: "fa-solid fa-pen" },
        content: `<p style="margin:.25rem 0 .5rem;opacity:.75">Custom name for <b>${esc(base ?? id)}</b>. Leave blank to use the built-in name.</p>`
               + `<input type="text" name="nm" value="${esc(current)}" placeholder="${esc(base ?? id)}" style="width:100%">`,
        ok: { label: "Save", icon: "fa-solid fa-check", callback: (_ev, btn) => btn.form.elements.nm.value },
        rejectClose: false
      }).catch(() => null);
    } else {
      next = window.prompt(`Custom name for "${base ?? id}" (blank = default):`, current ?? "");
    }
    if (next === null || next === undefined) return; // cancelled
    await Maestro.setCustomName(kind, id, next); // onChange → refresh()
  }
}
