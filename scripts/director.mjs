/**
 * Cavril Maestro — Director panel (v0.3)
 * A searchable, categorised, icon'd picker over Music (soundscapes), Ambience
 * (emberEnvironment arrangements) and Weather. Drives everything through the
 * public Maestro.* API, which broadcasts to all players.
 */

import { soundscapes } from "./soundscapes.mjs";
import { CATEGORIES, WEATHER, prettify, ambienceCategory, ambienceIcon, musicMeta } from "./meta.mjs";

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

  async _prepareContext(_options) {
    const cfg = Maestro.sound?.getActiveConfiguration?.() ?? {};
    const music = cfg.music ?? {}, env = cfg.environment ?? {}, weather = cfg.weather ?? {};

    // Music grouped by category
    const musicByCat = {};
    for (const s of Object.values(soundscapes)) {
      if (s?.type !== "music") continue;
      const m = musicMeta(s.id);
      (musicByCat[m.cat] ??= []).push({ id: s.id, name: m.name, sub: s.id, icon: m.icon, active: s.id === music.soundscapeId });
    }

    // Ambience (emberEnvironment arrangements) grouped by category
    const ambByCat = {};
    for (const arrId of Object.keys(soundscapes.emberEnvironment?.arrangements ?? {})) {
      (ambByCat[ambienceCategory(arrId)] ??= []).push({
        id: arrId, name: prettify(arrId), sub: arrId, icon: ambienceIcon(arrId), active: arrId === env.arrangementId
      });
    }

    // Weather
    const weatherItems = Object.keys(soundscapes.weather?.arrangements ?? {})
      .map(id => ({ id, name: WEATHER[id] ?? prettify(id), active: id === weather.arrangementId }));

    // Active music soundscape — arrangement select + mood
    const cur = soundscapes[music.soundscapeId];
    const arrangements = cur
      ? Object.entries(cur.arrangements ?? {}).map(([id, v]) => ({ id, label: v?.label ?? prettify(id), selected: id === music.arrangementId }))
      : [];
    const mood = Maestro.sound?.mood ?? "calm";

    return {
      ready: !!Maestro.sound,
      assetWarning: !game.settings.get(MODULE_ID, "assetBasePath"),
      search: this.#search,
      musicGroups: orderedGroups(musicByCat),
      ambienceGroups: orderedGroups(ambByCat),
      weatherItems,
      hasMusic: !!music.soundscapeId,
      nowMusic: music.soundscapeId ? musicMeta(music.soundscapeId).name : "—",
      arrangements,
      calmActive: mood === "calm",
      tensionActive: mood === "tension",
      musicVolume: this.#channelVolume("music"),
      envVolume: this.#channelVolume("environment")
    };
  }

  _onRender(_context, _options) {
    const el = this.element;
    const on = (sel, evt, fn) => el.querySelector(sel)?.addEventListener(evt, fn);
    const onAll = (sel, evt, fn) => el.querySelectorAll(sel).forEach(n => n.addEventListener(evt, fn));

    // Live search filter (no re-render, so focus/typing is preserved)
    const applyFilter = () => {
      const q = (el.querySelector('[name="search"]')?.value ?? "").trim().toLowerCase();
      this.#search = q;
      for (const it of el.querySelectorAll(".maestro-item")) {
        const hay = `${it.dataset.name ?? ""} ${it.dataset.id ?? ""}`.toLowerCase();
        it.classList.toggle("hidden", !!q && !hay.includes(q));
      }
      // Hide group/section headers with no visible items
      for (const grp of el.querySelectorAll(".grp")) {
        let n = grp.nextElementSibling, any = false;
        while (n && n.classList.contains("maestro-item")) { if (!n.classList.contains("hidden")) { any = true; break; } n = n.nextElementSibling; }
        grp.classList.toggle("hidden", !any);
      }
    };
    on('[name="search"]', "input", applyFilter);

    // Item clicks
    onAll(".maestro-item", "click", e => {
      const { kind, id } = e.currentTarget.dataset;
      if (kind === "music") Maestro.play(id, { channel: "music" });
      else if (kind === "amb") Maestro.play("emberEnvironment", { channel: "environment", arrangementId: id });
      else if (kind === "weather") Maestro.play("weather", { channel: "weather", arrangementId: id });
      this.render();
    });

    // Music controls
    on('[name="music-arrangement"]', "change", e => {
      const id = Maestro.sound?.getActiveConfiguration?.().music?.soundscapeId;
      if (id) Maestro.play(id, { channel: "music", arrangementId: e.target.value });
    });
    onAll('[data-mood]', "click", e => { Maestro.sound?.setMood(e.currentTarget.dataset.mood); this.render(); });
    on('[data-reroll]', "click", () => Maestro.rearrange("music"));

    // Stops
    onAll('[data-stop]', "click", e => { Maestro.stop(e.currentTarget.dataset.stop); this.render(); });
    on('[data-stopall]', "click", async () => { for (const c of Maestro.CONST.CHANNELS) await Maestro.stop(c); this.render(); });

    // Volumes
    on('[name="music-volume"]', "change", e => this.#setVolume("music", e.target.value));
    on('[name="environment-volume"]', "change", e => this.#setVolume("environment", e.target.value));

    applyFilter(); // re-apply preserved search after a re-render
  }

  async #setVolume(channel, value) {
    const sound = Maestro.sound?.channels?.[channel];
    if (sound) await sound.update({ volume: Number(value) });
  }
}
