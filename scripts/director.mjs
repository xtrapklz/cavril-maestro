/**
 * Cavril Maestro — Director panel
 * A compact V14 ApplicationV2 for live music direction: pick a soundscape +
 * arrangement, flip Calm/Tension, set per-channel volume, drive ambience.
 * All actions go through the public Maestro.* API, which broadcasts to players.
 */

import { soundscapes } from "./soundscapes.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const MODULE_ID = "cavril-maestro";

export class MaestroDirector extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "maestro-director",
    classes: ["maestro-director"],
    window: { title: "Maestro — Music Director", icon: "fa-solid fa-compact-disc", resizable: false },
    position: { width: 360, height: "auto" }
  };

  static PARTS = {
    body: { template: `modules/${MODULE_ID}/templates/director.hbs` }
  };

  /* ----- Shared singleton ----- */

  static #instance = null;

  /** Open (or focus) the Director. */
  static open() {
    MaestroDirector.#instance ??= new MaestroDirector();
    MaestroDirector.#instance.render({ force: true });
    return MaestroDirector.#instance;
  }

  /** Re-render if currently open (keeps the UI in sync with external changes). */
  static refresh() {
    if (MaestroDirector.#instance?.rendered) MaestroDirector.#instance.render();
  }

  /* ----- Rendering ----- */

  #channelVolume(channel) {
    const v = Maestro.sound?.channels?.[channel]?.volume;
    return Number.isFinite(v) ? v : 0.8;
  }

  async _prepareContext(_options) {
    const cfg = Maestro.sound?.getActiveConfiguration?.() ?? {};
    const music = cfg.music ?? {};
    const env = cfg.environment ?? {};

    const byType = t => Object.values(soundscapes)
      .filter(s => s?.type === t)
      .sort((a, b) => String(a.label).localeCompare(String(b.label)));

    const cur = soundscapes[music.soundscapeId];
    const arrangements = cur
      ? Object.entries(cur.arrangements ?? {}).map(([id, v]) => ({
          id, label: v?.label ?? id, selected: id === music.arrangementId
        }))
      : [];

    const curEnv = soundscapes[env.soundscapeId];
    const envArrangements = curEnv
      ? Object.entries(curEnv.arrangements ?? {}).map(([id, v]) => ({ id, label: v?.label ?? id, selected: id === env.arrangementId }))
      : [];

    const mood = Maestro.sound?.mood ?? "calm";
    return {
      ready: !!Maestro.sound,
      assetWarning: !game.settings.get(MODULE_ID, "assetBasePath"),
      musicList: byType("music").map(s => ({ id: s.id, label: s.label, selected: s.id === music.soundscapeId })),
      arrangements,
      hasMusic: !!music.soundscapeId,
      calmActive: mood === "calm",
      tensionActive: mood === "tension",
      musicVolume: this.#channelVolume("music"),
      envList: byType("environment").map(s => ({ id: s.id, label: s.label, selected: s.id === env.soundscapeId })),
      hasEnv: !!env.soundscapeId,
      envArrangements,
      envVolume: this.#channelVolume("environment")
    };
  }

  _onRender(_context, _options) {
    const el = this.element;
    const on = (sel, evt, fn) => el.querySelector(sel)?.addEventListener(evt, fn);
    const onAll = (sel, evt, fn) => el.querySelectorAll(sel).forEach(n => n.addEventListener(evt, fn));

    // Music
    on('[name="music-soundscape"]', "change", e => {
      const id = e.target.value;
      if (id) Maestro.play(id, { channel: "music" }); else Maestro.stop("music");
      this.render();
    });
    on('[name="music-arrangement"]', "change", e => {
      const id = Maestro.sound?.getActiveConfiguration?.().music?.soundscapeId;
      if (id) Maestro.play(id, { channel: "music", arrangementId: e.target.value });
    });
    on('[name="music-volume"]', "change", e => this.#setVolume("music", e.target.value));
    onAll('[data-mood]', "click", e => { Maestro.sound?.setMood(e.currentTarget.dataset.mood); this.render(); });
    on('[data-reroll]', "click", () => Maestro.rearrange("music"));

    // Ambience
    on('[name="environment-soundscape"]', "change", e => {
      const id = e.target.value;
      if (id) Maestro.play(id, { channel: "environment" }); else Maestro.stop("environment");
      this.render();
    });
    on('[name="environment-arrangement"]', "change", e => {
      const id = Maestro.sound?.getActiveConfiguration?.().environment?.soundscapeId;
      if (id) Maestro.play(id, { channel: "environment", arrangementId: e.target.value });
    });
    on('[name="environment-volume"]', "change", e => this.#setVolume("environment", e.target.value));

    // Stops
    onAll('[data-stop]', "click", e => { Maestro.stop(e.currentTarget.dataset.stop); this.render(); });
    on('[data-stopall]', "click", async () => {
      for (const c of Maestro.CONST.CHANNELS) await Maestro.stop(c);
      this.render();
    });
  }

  async #setVolume(channel, value) {
    const sound = Maestro.sound?.channels?.[channel];
    if (sound) await sound.update({ volume: Number(value) });
  }
}
