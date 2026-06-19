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
  CATEGORIES, WEATHER, prettify, musicMeta, hasTension, isTense, moodVariant,
  ambienceBase, ambienceMeta, folderIcon, folderCat
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
    position: { width: 500, height: 760 }
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

  /** A cue's tags as a comma-joined string (for the dialog + search). */
  #tags(kind, id) { return (Maestro.tagsFor?.(kind, id) || []).join(", "); }

  /** A cue's icon — custom override if set, else the built-in. */
  #icon(kind, id, fallback) { return Maestro.customIcon?.(kind, id) || fallback; }

  /** Is this cue the one currently playing on its channel? */
  #isActive(kind, id) {
    const cfg = Maestro.sound?.getActiveConfiguration?.() ?? {};
    if (kind === "music") return cfg.music?.soundscapeId === id;
    if (kind === "amb") return !!cfg.environment?.arrangementId && ambienceBase(cfg.environment.arrangementId) === ambienceBase(id);
    if (kind === "weather") return cfg.weather?.arrangementId === id;
    return false;
  }

  /** Play a cue, or stop its channel if it's already the one playing (click-to-toggle). */
  #toggleCue(kind, id) {
    if (kind === "music") this.#isActive("music", id) ? Maestro.fadeOutChannel("music") : Maestro.play(id, { channel: "music" });
    else if (kind === "amb") this.#isActive("amb", id) ? Maestro.fadeOutChannel("environment") : Maestro.play("emberEnvironment", { channel: "environment", arrangementId: id });
    else if (kind === "weather") this.#isActive("weather", id) ? Maestro.fadeOutChannel("weather") : Maestro.play("weather", { channel: "weather", arrangementId: id });
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
        id: s.id, favId: s.id, fav: this.#fav("music", s.id), tags: this.#tags("music", s.id), base: m.name, name: custom || m.name, cat: m.cat,
        sub: custom ? m.name : s.id, icon: this.#icon("music", s.id, m.icon), active: s.id === music.soundscapeId
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
        id: canonical, renameId: base, base, favId: base, fav: this.#fav("amb", base), tags: this.#tags("amb", base), cat: m.cat,
        name: custom || m.name, sub: custom ? m.name : (envArrs[canonical]?.label ?? ""),
        icon: this.#icon("amb", base, m.icon), active: !!env.arrangementId && base === curBase
      });
    }

    // Weather (optional).
    const weatherItems = weatherEnabled
      ? Object.keys(soundscapes.weather?.arrangements ?? {}).map(id => {
          const base = WEATHER[id] ?? prettify(id);
          const custom = this.#cn("weather", id);
          return { id, favId: id, fav: this.#fav("weather", id), tags: this.#tags("weather", id), icon: this.#icon("weather", id, "fa-solid fa-cloud"), base, name: custom || base, cat: "weather", active: id === weather.arrangementId };
        })
      : [];

    // Soundboard (optional) — folders + files for the current folder, from cache.
    const sbRoot = String(game.settings.get(MODULE_ID, "soundboardPath") || "").trim();
    const sbCur = this.#sbPath || sbRoot;
    const sbEntry = sbEnabled ? this.#sbCache.get(sbCur) : null;
    const sbDirs = (sbEntry?.dirs ?? []).map(d => {
      const wild = Maestro.isFolderWild?.(d.path);
      return {
        path: d.path, base: d.name,
        name: this.#cn("folder", d.path) || Maestro.sbAlias?.(d.path) || d.name,
        icon: this.#icon("folder", d.path, wild ? folderIcon(d.name) : "fa-solid fa-folder"),
        cat: wild ? folderCat(d.name) : "sfx",
        wild
      };
    });
    // Wildcard sounds: files sharing a name before "_" collapse to one tile that
    // plays a random variation each trigger.
    const sbGroups = {};
    for (const f of (sbEntry?.files ?? [])) {
      const stem = String(f.stem ?? f.name);
      const prefix = stem.includes("_") ? stem.slice(0, stem.indexOf("_")) : stem;
      (sbGroups[prefix] ??= []).push(f);
    }
    const soundboard = Object.entries(sbGroups).map(([prefix, files]) => {
      if (files.length === 1) {
        const f = files[0], base = f.name;
        return { src: f.src, srcs: "", wild: false, editId: f.src, base, favId: f.src, fav: this.#fav("sfx", f.src), tags: this.#tags("sfx", f.src), name: this.#cn("sfx", f.src) || Maestro.sbAlias?.(f.src) || base, icon: this.#icon("sfx", f.src, "fa-solid fa-volume-high"), cat: "sfx" };
      }
      const srcs = files.map(f => f.src), base = prettify(prefix);
      return { src: srcs[0], srcs: srcs.join("|"), wild: true, count: files.length, editId: srcs[0], base, favId: srcs[0], fav: this.#fav("sfx", srcs[0]), tags: this.#tags("sfx", srcs[0]), name: this.#cn("sfx", srcs[0]) || base, icon: this.#icon("sfx", srcs[0], "fa-solid fa-shuffle"), cat: "sfx" };
    });

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
        it = { kind, favId: fid, fav: true, id: fid, name: this.#cn("music", fid) || m.name, sub: m.name, icon: this.#icon("music", fid, m.icon), cat: m.cat };
      } else if (kind === "amb" && baseToCanonical[fid]) {
        const canonical = baseToCanonical[fid];
        const m = ambienceMeta(canonical);
        it = { kind, favId: fid, fav: true, id: canonical, name: this.#cn("amb", fid) || m.name, sub: "", icon: this.#icon("amb", fid, m.icon), cat: m.cat };
      } else if (kind === "weather") {
        it = { kind, favId: fid, fav: true, id: fid, name: this.#cn("weather", fid) || WEATHER[fid] || prettify(fid), sub: "", icon: this.#icon("weather", fid, "fa-solid fa-cloud"), cat: "weather" };
      } else if (kind === "sfx") {
        const nm = Maestro.sbAlias?.(fid) || prettify(decodeURIComponent(fid.split("?")[0].split("/").pop() || "").replace(/\.[a-z0-9]+$/i, ""));
        it = { kind, favId: fid, fav: true, src: fid, name: nm, sub: "", icon: "fa-solid fa-volume-high", cat: "sfx" };
      }
      if (it) (favByCat[it.cat] ??= []).push(it);
    }
    // Favorites grouped by category, but ordered by the user's manual favOrder
    // (falling back to sub-type/name for any not yet placed).
    const favOrder = game.settings.get(MODULE_ID, "favOrder") || [];
    const favIdx = it => { const i = favOrder.indexOf(`${it.kind}:${it.favId}`); return i < 0 ? 1e6 : i; };
    const favoriteGroups = Object.keys(CATEGORIES).filter(k => favByCat[k]?.length).map(k => ({
      key: k, label: CATEGORIES[k].label, icon: CATEGORIES[k].icon,
      items: favByCat[k].sort((a, b) => favIdx(a) - favIdx(b) || String(a.icon).localeCompare(String(b.icon)) || a.name.localeCompare(b.name))
    }));

    // Presets — each tag is a group; members shown as square tiles per category,
    // with a per-preset display alias and manual order.
    const tagMap = game.settings.get(MODULE_ID, "tags") || {};
    const resolveMember = (kind, fid) => {
      if (kind === "music" && soundscapes[fid]) { const m = musicMeta(fid); return { kind, id: fid, baseName: this.#cn("music", fid) || m.name, icon: this.#icon("music", fid, m.icon), cat: m.cat }; }
      if (kind === "amb") { const canon = baseToCanonical[fid] || (envArrs[`${fid}Day`] ? `${fid}Day` : (envArrs[`${fid}Night`] ? `${fid}Night` : fid)); const m = ambienceMeta(canon); return { kind, id: canon, baseName: this.#cn("amb", fid) || m.name, icon: this.#icon("amb", fid, m.icon), cat: m.cat }; }
      if (kind === "weather") return { kind, id: fid, baseName: this.#cn("weather", fid) || WEATHER[fid] || prettify(fid), icon: this.#icon("weather", fid, "fa-solid fa-cloud"), cat: "weather" };
      if (kind === "sfx") return { kind, src: fid, baseName: Maestro.sbAlias?.(fid) || prettify(decodeURIComponent(fid.split("?")[0].split("/").pop() || "").replace(/\.[a-z0-9]+$/i, "")), icon: "fa-solid fa-volume-high", cat: "sfx" };
      return null;
    };
    const byTag = {};
    for (const [key, arr] of Object.entries(tagMap)) {
      if (!Array.isArray(arr)) continue;
      const ci = key.indexOf(":");
      const m = resolveMember(key.slice(0, ci), key.slice(ci + 1));
      if (!m) continue;
      m.key = key;
      for (const tag of arr) (byTag[tag] ??= []).push(m);
    }
    const presets = Object.keys(byTag).sort((a, b) => a.localeCompare(b)).map(tag => {
      const meta = Maestro.presetMeta?.(tag) ?? { order: [], aliases: {} };
      const ord = k => { const i = meta.order.indexOf(k); return i < 0 ? 1e6 : i; };
      const members = byTag[tag].map(m => ({ ...m, tag, name: meta.aliases[m.key] || m.baseName, active: m.kind !== "sfx" && this.#isActive(m.kind, m.id) }));
      const cats = Object.keys(CATEGORIES).filter(k => members.some(m => m.cat === k)).map(k => ({
        cat: k, label: CATEGORIES[k].label, icon: CATEGORIES[k].icon,
        items: members.filter(m => m.cat === k).sort((a, b) => ord(a.key) - ord(b.key) || a.name.localeCompare(b.name))
      }));
      return { tag, count: members.length, cats };
    });

    // Custom music variations saved for the active soundscape.
    const customVariations = music.soundscapeId ? Maestro.musicVariations(music.soundscapeId).map(v => ({ id: v.id, name: v.name, active: v.id === av })) : [];
    const sbAtRoot = !sbEnabled || sbCur === sbRoot;
    const sbFolderName = sbAtRoot ? "" : prettify(decodeURIComponent(sbCur.replace(/\/+$/, "").split("/").pop() || ""));

    const musicGroups = orderedGroups(musicByCat);
    const ambienceGroups = orderedGroups(ambByCat);
    const counts = {
      music: musicGroups.reduce((n, g) => n + g.items.length, 0),
      amb: ambienceGroups.reduce((n, g) => n + g.items.length, 0),
      weather: weatherItems.length,
      sfx: soundboard.length,
      fav: favoriteGroups.reduce((n, g) => n + g.items.length, 0),
      preset: presets.length
    };

    // Active music soundscape — arrangement select + mood.
    const cur = soundscapes[music.soundscapeId];
    const av = (Maestro.activeVariation && Maestro.activeVariation.soundscapeId === music.soundscapeId) ? Maestro.activeVariation.vid : null;
    // Variation buttons: tense variants live on the switch. When auto day/night is
    // on, collapse Day/Night pairs into one button (no Day/Night word) — the clock
    // picks the variant. Keyed on ORIGINAL ids, so aliases never matter.
    let arrangements = [];
    if (cur) {
      const autoDN = !!game.settings.get(MODULE_ID, "autoDayNight");
      if (autoDN) {
        const seen = new Set();
        for (const [id] of Object.entries(cur.arrangements ?? {})) {
          if (isTense(id)) continue;
          const base = ambienceBase(id);
          if (seen.has(base)) continue;
          seen.add(base);
          const canon = cur.arrangements[`${base}Day`] ? `${base}Day` : (cur.arrangements[`${base}Night`] ? `${base}Night` : id);
          const label = String(cur.arrangements[canon]?.label ?? prettify(base)).replace(/\s*(day|night)\s*$/i, "") || prettify(base);
          arrangements.push({ id: canon, label, selected: !av && !!music.arrangementId && ambienceBase(music.arrangementId) === base });
        }
      } else {
        arrangements = Object.entries(cur.arrangements ?? {})
          .filter(([id]) => !isTense(id))
          .map(([id, v]) => ({ id, label: v?.label ?? prettify(id), selected: id === music.arrangementId && !av }));
      }
    }
    const onTension = !!music.arrangementId && isTense(music.arrangementId);
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
      tabMusic: tab === "music", tabAmb: tab === "amb", tabWeather: tab === "weather", tabSfx: tab === "sfx", tabFav: tab === "fav", tabPreset: tab === "preset",
      counts,
      musicGroups, ambienceGroups, weatherItems, soundboard, sbDirs, favoriteGroups, presets,
      // Music transport
      hasMusic: !!music.soundscapeId,
      nowMusic: music.soundscapeId ? (this.#cn("music", music.soundscapeId) || musicMeta(music.soundscapeId).name) : "—",
      arrangements, customVariations,
      canTension: cur ? hasTension(cur) : false,
      calmActive: !!music.soundscapeId && !onTension,
      tensionActive: onTension,
      // Ambience transport
      hasAmb: !!env.arrangementId,
      nowAmb: env.arrangementId ? (this.#cn("amb", curBase) || ambienceMeta(env.arrangementId).name) : "—",
      morphCollapsed: !!game.settings.get(MODULE_ID, "morphCollapsed"),
      ambMorph: env.arrangementId && !game.settings.get(MODULE_ID, "morphCollapsed") ? MaestroMixer.view("environment") : null,
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

    // Live search filter (scoped to the active zone, no re-render).
    const applyFilter = () => {
      const q = (el.querySelector('[name="search"]')?.value ?? "").trim().toLowerCase();
      this.#search = q;
      const zone = el.querySelector(".maestro-zone.active") ?? el;
      for (const it of zone.querySelectorAll(".maestro-item")) {
        const hay = `${it.dataset.name ?? ""} ${it.dataset.id ?? ""} ${it.dataset.default ?? ""} ${it.dataset.tags ?? ""}`.toLowerCase();
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

    // Soundboard refresh (rescan) + back-to-main-board.
    on('[data-sb-refresh]', "click", () => { this.#sbCache.clear(); this.render(); });
    on('[data-sb-home]', "click", () => { this.#sbPath = null; this.render(); });

    // Presets — a member plays just itself (click playing = stop, like the zones).
    onAll('[data-preset-member]', "click", e => {
      const { kind, id, src } = e.currentTarget.dataset;
      if (kind === "sfx") Maestro.playOneShot(src);
      else { this.#toggleCue(kind, id); this.render(); }
    });
    // Preset member: rename (alias scoped to this preset).
    onAll('[data-preset-rename]', "click", async e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (item) await this.#promptPresetAlias(item.dataset.tag, item.dataset.key, item.dataset.name);
    });
    // Preset member: drag to reorder within the same preset.
    const presetZone = el.querySelector('.maestro-zone[data-zone="preset"]');
    if (presetZone) {
      let dk = null, dtag = null;
      presetZone.querySelectorAll('.maestro-item[draggable="true"]').forEach(it => {
        it.addEventListener("dragstart", e2 => { dk = it.dataset.key; dtag = it.dataset.tag; it.classList.add("dragging"); try { e2.dataTransfer.effectAllowed = "move"; e2.dataTransfer.setData("text/plain", dk || ""); } catch (_e) { /* ignore */ } });
        it.addEventListener("dragend", () => { dk = null; dtag = null; it.classList.remove("dragging"); });
        it.addEventListener("dragover", e2 => e2.preventDefault());
        it.addEventListener("drop", e2 => { e2.preventDefault(); const tk = it.dataset.key, tt = it.dataset.tag; if (dk && tk && dtag === tt && dk !== tk) this.#reorderPresetMember(dtag, dk, tk); });
      });
    }

    // Rename pencil — blank reverts to the built-in name.
    onAll('[data-rename]', "click", async e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (!item) return;
      const { kind, id, renameId, name, default: base, tags } = item.dataset;
      const editId = renameId || id;
      await this.#promptEdit(kind, editId, name, base, tags || "", Maestro.customIcon?.(kind, editId) || "");
    });

    // Soundboard folder edit (rename alias + icon + wildcard toggle).
    onAll('[data-folder-edit]', "click", async e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (!item) return;
      const path = item.dataset.path;
      await this.#promptFolderEdit(path, item.dataset.name || "", item.dataset.default || "", Maestro.customIcon?.("folder", path) || "", Maestro.isFolderWild?.(path));
    });

    // Favorite star — toggle (per-user; onChange re-renders).
    onAll('[data-fav]', "click", e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (item) Maestro.toggleFavorite(item.dataset.kind, item.dataset.favId);
    });

    // Item clicks (the row is the button; the pencil stops propagation).
    onAll('.maestro-zone:not([data-zone="preset"]) .maestro-item', "click", e => {
      const { kind, id, src, path } = e.currentTarget.dataset;
      if (kind === "music" || kind === "amb" || kind === "weather") this.#toggleCue(kind, id);  // click playing = stop, click other = switch
      else if (kind === "sbdir") {                                                     // wildcard folder = random sound; else open
        if (Maestro.isFolderWild?.(path)) { Maestro.playRandomInFolder(path); return; }
        this.#sbPath = path; this.render(); return;
      }
      else if (kind === "sfx") {                                                       // play (random variation if wildcard), then back to main board
        const list = (e.currentTarget.dataset.srcs || "").split("|").filter(Boolean);
        Maestro.playOneShot(list.length ? list[Math.floor(Math.random() * list.length)] : src);
        this.#sbPath = null; this.render(); return;
      }
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
    onAll('[data-variation]', "click", e => {
      const sid = Maestro.sound?.getActiveConfiguration?.().music?.soundscapeId;
      if (sid) Maestro.playMusicVariation(sid, e.currentTarget.dataset.variation);
    });
    onAll('[data-variation-edit]', "click", e => {
      e.stopPropagation();
      const sid = Maestro.sound?.getActiveConfiguration?.().music?.soundscapeId;
      if (sid) this.#promptEditVariation(sid, e.currentTarget.dataset.variationEdit);
    });
    on('[data-add-variation]', "click", () => this.#promptNewVariation());
    on('[data-reroll]', "click", () => Maestro.rearrange("music"));
    on('[data-morph]', "click", () => Maestro.openMorph?.());
    on('[data-morph-toggle]', "click", async () => { await game.settings.set(MODULE_ID, "morphCollapsed", !game.settings.get(MODULE_ID, "morphCollapsed")); this.render(); });
    // Inline ambience morpher — wire the embedded pad (shared with the pop-out).
    const inlineMorph = el.querySelector('.mini-morph[data-channel="environment"]');
    if (inlineMorph) MaestroMixer.wire(inlineMorph, "environment", () => this.render());

    // Stops — fade out at the crossfade pace (the eventual stop re-renders via onChange).
    onAll('[data-stop]', "click", e => { Maestro.fadeOutChannel(e.currentTarget.dataset.stop); });
    on('[data-stopall]', "click", () => { Maestro.stopAll(); });

    // Footer per-type volumes (icon-only sliders).
    on('[name="music-volume"]', "change", e => this.#setVolume("music", e.target.value));
    on('[name="environment-volume"]', "change", e => this.#setVolume("environment", e.target.value));
    on('[name="weather-volume"]', "change", e => this.#setVolume("weather", e.target.value));
    on('[name="sfx-volume"]', "change", e => game.settings.set(MODULE_ID, "sfxVolume", Number(e.target.value)));

    // Favorites — drag a tile onto another to reorder (within its category).
    const favZone = el.querySelector('.maestro-zone[data-zone="fav"]');
    if (favZone) {
      let dragKey = null;
      favZone.querySelectorAll('.maestro-item[draggable="true"]').forEach(it => {
        it.addEventListener("dragstart", e => { dragKey = it.dataset.favKey; it.classList.add("dragging"); try { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", dragKey || ""); } catch (_e) { /* ignore */ } });
        it.addEventListener("dragend", () => { dragKey = null; it.classList.remove("dragging"); });
        it.addEventListener("dragover", e => e.preventDefault());
        it.addEventListener("drop", e => { e.preventDefault(); const target = it.dataset.favKey; if (dragKey && target && dragKey !== target) this.#reorderFavorite(dragKey, target); });
      });
    }

    applyFilter(); // re-apply preserved search after a re-render
  }

  /** Reorder favorites by moving `dragKey` to just before `targetKey` (per-user). */
  async #reorderFavorite(dragKey, targetKey) {
    const favs = Maestro.favorites?.() || {};
    const keys = Object.keys(favs).filter(k => favs[k]);
    let order = (game.settings.get(MODULE_ID, "favOrder") || []).filter(k => keys.includes(k));
    for (const k of keys) if (!order.includes(k)) order.push(k);
    const from = order.indexOf(dragKey);
    if (from < 0) return;
    order.splice(from, 1);
    const ti = order.indexOf(targetKey);
    order.splice(ti < 0 ? order.length : ti, 0, dragKey);
    await game.settings.set(MODULE_ID, "favOrder", order);   // onChange → refresh
  }

  async #setVolume(channel, value) {
    const sound = Maestro.sound?.channels?.[channel];
    if (sound) await sound.update({ volume: Number(value) });
  }

  /** Edit a cue's custom name + tags + icon (blank name reverts to default; tags power Presets). */
  async #promptEdit(kind, id, current, base, currentTags, currentIcon) {
    const DialogV2 = foundry.applications?.api?.DialogV2;
    const esc = s => String(s ?? "").replace(/"/g, "&quot;");
    if (DialogV2?.prompt) {
      const res = await DialogV2.prompt({
        window: { title: `Edit — ${base ?? id}`, icon: "fa-solid fa-pen" },
        content: `<p style="margin:.25rem 0 .4rem;opacity:.75">Custom name for <b>${esc(base ?? id)}</b> (blank = built-in name).</p>`
               + `<input type="text" name="nm" value="${esc(current)}" placeholder="${esc(base ?? id)}" style="width:100%;margin-bottom:.55rem">`
               + `<p style="margin:.25rem 0 .4rem;opacity:.75">Tags (comma-separated) — searchable, and each tag becomes a Preset.</p>`
               + `<input type="text" name="tg" value="${esc(currentTags)}" placeholder="combat, night, docks" style="width:100%;margin-bottom:.55rem">`
               + `<p style="margin:.25rem 0 .4rem;opacity:.75">Icon — a Font Awesome class (blank = default). <a href="https://fontawesome.com/search?o=r&m=free" target="_blank">browse free icons</a></p>`
               + `<input type="text" name="ic" value="${esc(currentIcon)}" placeholder="fa-solid fa-dragon" style="width:100%">`,
        ok: { label: "Save", icon: "fa-solid fa-check", callback: (_ev, btn) => ({ name: btn.form.elements.nm.value, tags: btn.form.elements.tg.value, icon: btn.form.elements.ic.value }) },
        rejectClose: false
      }).catch(() => null);
      if (!res) return;
      await Maestro.setCustomName(kind, id, res.name);
      await Maestro.setTags(kind, id, String(res.tags || "").split(",").map(s => s.trim()).filter(Boolean));
      await Maestro.setCustomIcon(kind, id, res.icon);
    } else {
      const next = window.prompt(`Custom name for "${base ?? id}" (blank = default):`, current ?? "");
      if (next !== null) await Maestro.setCustomName(kind, id, next);
    }
  }

  /** Folder editor: non-destructive name + icon + wildcard (random-on-click) toggle. */
  async #promptFolderEdit(path, current, base, icon, wild) {
    const DialogV2 = foundry.applications?.api?.DialogV2;
    const esc = s => String(s ?? "").replace(/"/g, "&quot;");
    if (!DialogV2?.prompt) return;
    const res = await DialogV2.prompt({
      window: { title: `Folder — ${base || ""}`, icon: "fa-solid fa-folder" },
      content: `<p style="margin:.25rem 0 .4rem;opacity:.75">Display name (blank = original folder name).</p>`
             + `<input type="text" name="nm" value="${esc(current)}" placeholder="${esc(base)}" style="width:100%;margin-bottom:.5rem">`
             + `<p style="margin:.25rem 0 .4rem;opacity:.75">Icon — Font Awesome class (blank = folder).</p>`
             + `<input type="text" name="ic" value="${esc(icon)}" placeholder="fa-solid fa-folder" style="width:100%;margin-bottom:.6rem">`
             + `<label style="display:flex;gap:7px;align-items:center;font-size:12px"><input type="checkbox" name="wild" ${wild ? "checked" : ""}> Wildcard — click plays a random sound inside (instead of opening it)</label>`,
      ok: { label: "Save", icon: "fa-solid fa-check", callback: (_ev, btn) => ({ name: btn.form.elements.nm.value, icon: btn.form.elements.ic.value, wild: btn.form.elements.wild.checked }) },
      rejectClose: false
    }).catch(() => null);
    if (!res) return;
    await Maestro.setCustomName("folder", path, res.name);
    await Maestro.setCustomIcon("folder", path, res.icon);
    await Maestro.setFolderWild(path, res.wild);
  }

  /** "+" — save a new music variation from a chosen subset of the theme's tracks. */
  async #promptNewVariation() {
    const cfg = Maestro.sound?.getActiveConfiguration?.().music ?? {};
    const info = MaestroMixer.tracksFor?.("music");
    if (!cfg.soundscapeId || !info) return ui.notifications?.warn("Maestro: play a music theme first.");
    const DialogV2 = foundry.applications?.api?.DialogV2;
    if (!DialogV2?.prompt) return;
    const res = await foundry.applications.api.DialogV2.prompt({
      window: { title: "New variation", icon: "fa-solid fa-plus" },
      content: `<div class="maestro-vardlg"><p class="hint">Check the tracks to include, name it, and save it as a variation of this theme.</p>`
             + `<input type="text" name="nm" class="vname" placeholder="Variation name" autocomplete="off">`
             + `<div class="vlist">${this.#trackChecklist(info.tracks.map(t => ({ id: t.id })), [])}</div></div>`,
      ok: { label: "Save", icon: "fa-solid fa-check", callback: (_ev, btn) => ({ name: btn.form.elements.nm.value, enabled: this.#checkedTracks(btn.form) }) },
      rejectClose: false
    }).catch(() => null);
    if (!res || !String(res.name || "").trim()) return;
    await Maestro.saveMusicVariation(cfg.soundscapeId, cfg.arrangementId, res.name, res.enabled);
  }

  /** Build a fixed-row track checklist (stable height so toggling doesn't reflow). */
  #trackChecklist(tracks, checkedIds) {
    const esc = s => String(s ?? "").replace(/"/g, "&quot;");
    const set = new Set(checkedIds || []);
    return tracks.map(t =>
      `<label class="vrow"><input type="checkbox" name="trk" value="${esc(t.id)}"${set.has(t.id) ? " checked" : ""}><span>${esc(prettify(t.id))}</span></label>`
    ).join("");
  }

  #checkedTracks(form) {
    return [...form.querySelectorAll('input[name="trk"]:checked')].map(c => c.value);
  }

  /** Edit or delete a saved custom variation. */
  async #promptEditVariation(soundscapeId, vid) {
    const v = (Maestro.musicVariations?.(soundscapeId) || []).find(x => x.id === vid);
    const DialogV2 = foundry.applications?.api?.DialogV2;
    if (!v || !DialogV2?.wait) return;
    const esc = s => String(s ?? "").replace(/"/g, "&quot;");
    const ids = Object.keys(soundscapes[soundscapeId]?.arrangements?.[v.base]?.layers || {});
    const content = `<div class="maestro-vardlg"><p class="hint">Edit which tracks are in “${esc(v.name)}”, rename it, or delete it.</p>`
                  + `<input type="text" name="nm" class="vname" value="${esc(v.name)}" autocomplete="off">`
                  + `<div class="vlist">${this.#trackChecklist(ids.map(id => ({ id })), v.enabled)}</div></div>`;
    const res = await DialogV2.wait({
      window: { title: `Edit variation — ${v.name}`, icon: "fa-solid fa-sliders" },
      content,
      buttons: [
        { action: "save", label: "Save", icon: "fa-solid fa-check", default: true, callback: (_e, btn) => ({ op: "save", name: btn.form.elements.nm.value, enabled: this.#checkedTracks(btn.form) }) },
        { action: "delete", label: "Delete", icon: "fa-solid fa-trash", callback: () => ({ op: "delete" }) },
        { action: "cancel", label: "Cancel", icon: "fa-solid fa-xmark" }
      ],
      rejectClose: false
    }).catch(() => null);
    if (!res || typeof res !== "object" || !res.op) return;
    if (res.op === "delete") await Maestro.deleteMusicVariation(soundscapeId, vid);
    else if (res.op === "save" && String(res.name || "").trim()) {
      await Maestro.deleteMusicVariation(soundscapeId, vid);                 // replace (name/id may change)
      await Maestro.saveMusicVariation(soundscapeId, v.base, res.name, res.enabled);
    }
  }

  /** Rename a member within a preset (alias scoped to that preset only). */
  async #promptPresetAlias(tag, key, current) {
    const DialogV2 = foundry.applications?.api?.DialogV2;
    const esc = s => String(s ?? "").replace(/"/g, "&quot;");
    let next = null;
    if (DialogV2?.prompt) {
      next = await DialogV2.prompt({
        window: { title: `Rename in “${tag}”`, icon: "fa-solid fa-pen" },
        content: `<p style="margin:.25rem 0 .4rem;opacity:.75">Name shown for this sound inside the “${esc(tag)}” preset only. Blank restores its normal name.</p>`
               + `<input type="text" name="al" value="${esc(current)}" style="width:100%">`,
        ok: { label: "Save", icon: "fa-solid fa-check", callback: (_ev, btn) => btn.form.elements.al.value },
        rejectClose: false
      }).catch(() => null);
    } else {
      next = window.prompt("Name in this preset (blank = normal):", current ?? "");
    }
    if (next === null || next === undefined) return;
    await Maestro.setPresetAlias(tag, key, next);
  }

  /** Reorder a member within a preset by moving it before `targetKey`. */
  async #reorderPresetMember(tag, dragKey, targetKey) {
    const tagMap = game.settings.get(MODULE_ID, "tags") || {};
    const keys = Object.keys(tagMap).filter(k => Array.isArray(tagMap[k]) && tagMap[k].includes(tag));
    let order = (Maestro.presetMeta?.(tag).order || []).filter(k => keys.includes(k));
    for (const k of keys) if (!order.includes(k)) order.push(k);
    const from = order.indexOf(dragKey);
    if (from < 0) return;
    order.splice(from, 1);
    const ti = order.indexOf(targetKey);
    order.splice(ti < 0 ? order.length : ti, 0, dragKey);
    await Maestro.setPresetOrder(tag, order);
  }
}
