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

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const MODULE_ID = "cavril-maestro";

function orderedGroups(byCat) {
  return Object.keys(CATEGORIES)
    .filter(k => byCat[k]?.length)
    .map(k => ({
      key: k, label: CATEGORIES[k].label, icon: CATEGORIES[k].icon,
      items: byCat[k].sort((a, b) => a.name.localeCompare(b.name))
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
  /** soundboard file cache + the path it was built for */
  #soundboard = null;
  #sbPath = null;
  #sbBusy = false;

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
        id: s.id, base: m.name, name: custom || m.name, cat: m.cat,
        sub: custom ? m.name : s.id, icon: m.icon, active: s.id === music.soundscapeId
      });
    }

    // Ambience: collapse day/night into one generic-named THEME entry.
    const ambByCat = {};
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
      const m = ambienceMeta(canonical);
      const custom = this.#cn("amb", base);
      (ambByCat[m.cat] ??= []).push({
        id: canonical, renameId: base, base, cat: m.cat,
        name: custom || m.name, sub: custom ? m.name : (envArrs[canonical]?.label ?? ""),
        icon: m.icon, active: !!env.arrangementId && base === curBase
      });
    }

    // Weather (optional).
    const weatherItems = weatherEnabled
      ? Object.keys(soundscapes.weather?.arrangements ?? {}).map(id => {
          const base = WEATHER[id] ?? prettify(id);
          const custom = this.#cn("weather", id);
          return { id, base, name: custom || base, cat: "weather", active: id === weather.arrangementId };
        })
      : [];

    // Soundboard (optional) — served from the instance cache.
    const soundboard = sbEnabled ? (this.#soundboard ?? []).map(f => ({ src: f.src, name: f.name, cat: "sfx" })) : [];

    const musicGroups = orderedGroups(musicByCat);
    const ambienceGroups = orderedGroups(ambByCat);
    const counts = {
      music: musicGroups.reduce((n, g) => n + g.items.length, 0),
      amb: ambienceGroups.reduce((n, g) => n + g.items.length, 0),
      weather: weatherItems.length,
      sfx: soundboard.length
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
      tabMusic: tab === "music", tabAmb: tab === "amb", tabWeather: tab === "weather", tabSfx: tab === "sfx",
      counts,
      musicGroups, ambienceGroups, weatherItems, soundboard,
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
      // Soundboard meta
      sbPath: game.settings.get(MODULE_ID, "soundboardPath") || "",
      sbLoading: sbEnabled && this.#sbBusy,
      sbWarning: sbEnabled && !game.settings.get(MODULE_ID, "soundboardPath"),
      sbEmpty: sbEnabled && !this.#sbBusy && this.#soundboard !== null && soundboard.length === 0 && !!game.settings.get(MODULE_ID, "soundboardPath")
    };
  }

  _onRender(_context, _options) {
    const el = this.element;
    const on = (sel, evt, fn) => el.querySelector(sel)?.addEventListener(evt, fn);
    const onAll = (sel, evt, fn) => el.querySelectorAll(sel).forEach(n => n.addEventListener(evt, fn));

    // Lazy-load the soundboard folder when enabled / when the path changes.
    if (game.settings.get(MODULE_ID, "soundboardEnabled")) {
      const path = game.settings.get(MODULE_ID, "soundboardPath") || "";
      if (!this.#sbBusy && (this.#soundboard === null || this.#sbPath !== path)) {
        this.#sbBusy = true; this.#sbPath = path;
        Maestro.browseSoundboard()
          .then(list => { this.#soundboard = list; })
          .catch(() => { this.#soundboard = []; })
          .finally(() => { this.#sbBusy = false; this.render(); });
      }
    }

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
      applyFilter();
    });

    // Layout toggle (persists per-user; re-render to re-flow the grid).
    onAll('[data-layout]', "click", async e => {
      await game.settings.set(MODULE_ID, "gridLayout", e.currentTarget.dataset.layout === "grid");
      this.render();
    });

    // Soundboard refresh.
    on('[data-sb-refresh]', "click", () => { this.#soundboard = null; this.render(); });

    // Rename pencil — blank reverts to the built-in name.
    onAll('[data-rename]', "click", async e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (!item) return;
      const { kind, id, renameId, name, default: base } = item.dataset;
      await this.#promptRename(kind, renameId || id, name, base);
    });

    // Item clicks (the row is the button; the pencil stops propagation).
    onAll(".maestro-item", "click", e => {
      const { kind, id, src } = e.currentTarget.dataset;
      if (kind === "music") Maestro.play(id, { channel: "music" });
      else if (kind === "amb") Maestro.play("emberEnvironment", { channel: "environment", arrangementId: id });
      else if (kind === "weather") Maestro.play("weather", { channel: "weather", arrangementId: id });
      else if (kind === "sfx") { Maestro.playOneShot(src); return; } // one-shot: no re-render
      this.render();
    });
    onAll(".maestro-item", "keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.click(); }
    });

    // Music controls
    on('[name="music-arrangement"]', "change", e => {
      const id = Maestro.sound?.getActiveConfiguration?.().music?.soundscapeId;
      if (id) Maestro.play(id, { channel: "music", arrangementId: e.target.value });
    });
    onAll('[data-mood]', "click", e => {
      const mood = e.currentTarget.dataset.mood;
      const m = Maestro.sound?.getActiveConfiguration?.().music ?? {};
      if (!m.soundscapeId) return;
      const target = moodVariant(soundscapes[m.soundscapeId], m.arrangementId, mood);
      if (target) Maestro.play(m.soundscapeId, { channel: "music", arrangementId: target });
      this.render();
    });
    on('[data-reroll]', "click", () => Maestro.rearrange("music"));

    // Stops
    onAll('[data-stop]', "click", e => { Maestro.stop(e.currentTarget.dataset.stop); this.render(); });
    on('[data-stopall]', "click", async () => { for (const c of Maestro.CONST.CHANNELS) await Maestro.stop(c); this.render(); });

    applyFilter(); // re-apply preserved search after a re-render
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
