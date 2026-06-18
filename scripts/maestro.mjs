/**
 * Cavril Maestro — Adaptive Music Director
 * ------------------------------------------------------------------
 * A standalone port of Ember's generative soundscape engine.
 *
 *   engine.mjs       — EmberSoundOrchestration / EmberAudioArrangement /
 *                      EmberSoundscape (lifted verbatim, couplings rewired here)
 *   soundscapes.mjs  — the data (40 soundscapes: segments + arrangements + timing)
 *   compat.mjs       — Array.prototype.filterJoin shim
 *
 * Audio assets are NOT bundled. The `assetBasePath` setting points at a folder
 * (local path or Forge Assets Library URL) holding music/ environment/ weather/
 * effects subfolders. On ready we rewrite each soundscape's relative `src` to an
 * absolute path against that base (the soundscape objects are not deep-frozen).
 * ------------------------------------------------------------------
 */

import "./compat.mjs";
import { EmberSoundscape } from "./engine.mjs";
import { soundscapes } from "./soundscapes.mjs";
import { MaestroDirector } from "./director.mjs";

const MODULE_ID = "cavril-maestro";
const CHANNELS = ["music", "environment", "weather", "effects"];

/* ------------------------------------------------------------------ */
/*  Public namespace — macros and other modules drive music here       */
/* ------------------------------------------------------------------ */

globalThis.Maestro = {
  id: MODULE_ID,
  /** @type {EmberSoundscape|null} the singleton state manager */
  sound: null,
  /** @type {Record<string, object>} the soundscape data registry */
  soundscapes,
  _pathsResolved: false,

  CONST: {
    PLAYLIST_NAME: "Maestro Channels",
    CHANNELS,
    PLAYLIST_ID: null,
    MUSIC_SOUND_ID: null,
    ENVIRONMENT_SOUND_ID: null,
    WEATHER_SOUND_ID: null,
    EFFECTS_SOUND_ID: null
  },

  /** Resolve a soundscape-relative path against the configured asset base. */
  assetPath(rel = "") {
    const base = String(game.settings.get(MODULE_ID, "assetBasePath") || "").replace(/\/+$/, "");
    return [base, rel].filter(Boolean).join("/");
  },

  /**
   * Time-of-day phase used to pick day/night environment arrangements.
   * Standalone-safe default ("day"); honors Simple Calendar if present.
   * @returns {string}
   */
  dayPhase() {
    try {
      const sc = game.modules.get("foundryvtt-simple-calendar")?.api;
      const hour = sc?.timestampToDate?.(game.time.worldTime)?.hour;
      if (Number.isFinite(hour)) return (hour < 6 || hour >= 20) ? "night" : "day";
    } catch (_e) { /* ignore */ }
    return "day";
  },

  /**
   * Base per-channel configuration for the active scene. Reads an optional
   * scene flag (Stage 3 auto-by-scene); otherwise returns empty channels so the
   * GM's explicit overrides fully drive playback.
   * @param {Scene} [scene]
   * @returns {object}
   */
  readSceneConfiguration(scene) {
    const blank = () => ({ soundscapeId: null, arrangementId: null });
    const cfg = {
      music: { ...blank(), mood: this.sound?.mood ?? "calm" },
      environment: blank(),
      weather: blank(),
      effects: blank()
    };
    const flag = scene?.getFlag?.(MODULE_ID, "soundscape");
    if (flag) foundry.utils.mergeObject(cfg, flag);
    return cfg;
  },

  /* ----- Convenience control API (macros / hotbar / other modules) ----- */

  /** List soundscapes (and their arrangements) to the console. */
  list() {
    const rows = Object.values(soundscapes).map(s => ({
      id: s.id, type: s.type, arrangements: Object.keys(s.arrangements ?? {}).join(", ")
    }));
    console.table(rows);
    return rows;
  },

  /**
   * Direct a soundscape to play on a channel. Picks the first arrangement if
   * none is given, ensures the channel sentinel sound is "playing", and
   * broadcasts the state to all clients.
   * @param {string} soundscapeId
   * @param {object} [opts]
   * @param {string} [opts.arrangementId]
   * @param {string} [opts.channel="music"]
   * @param {string} [opts.mood]
   */
  async play(soundscapeId, { arrangementId, channel = "music", mood } = {}) {
    if (!game.user.isGM) return ui.notifications?.warn("Maestro: only a GM can direct music.");
    const ss = soundscapes[soundscapeId];
    if (!ss) return ui.notifications?.warn(`Maestro: unknown soundscape "${soundscapeId}".`);
    arrangementId ??= Object.keys(ss.arrangements ?? {})[0];
    const sentinel = this.sound?.channels?.[channel];
    if (sentinel && !sentinel.playing) await sentinel.update({ playing: true });
    const change = { [channel]: { soundscapeId, arrangementId } };
    if (mood && channel === "music") change.music.mood = mood;
    return this.sound?.setState(change);
  },

  /** Stop a channel and clear its soundscape. */
  async stop(channel = "music") {
    if (!game.user.isGM) return ui.notifications?.warn("Maestro: only a GM can direct music.");
    const sentinel = this.sound?.channels?.[channel];
    if (sentinel?.playing) await sentinel.update({ playing: false });
    return this.sound?.setState({ [channel]: { soundscapeId: null, arrangementId: null } });
  },

  /** Raise tension (cross-fades tension stems in over the current bed). */
  tension() { return this.sound?.setMood("tension"); },
  /** Return to calm. */
  calm() { return this.sound?.setMood("calm"); },
  /** Re-roll the current arrangement's random layer selection. */
  rearrange(channel = "music") {
    const c = this.sound?.containers?.[channel];
    return c?.arrange?.();
  },

  /** Open the GM Director panel. */
  openDirector() { return MaestroDirector.open(); }
};

/* ------------------------------------------------------------------ */
/*  Settings                                                           */
/* ------------------------------------------------------------------ */

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "assetBasePath", {
    name: "Audio Asset Base Path",
    hint: "REQUIRED — set this to the folder that holds your music/ environment/ weather/ effects " +
          "subfolders (e.g. your Forge Assets Library URL). Reload after changing.",
    scope: "world",
    config: true,
    type: String,
    default: ""
  });

  // GM-authored playing state. Writing this setting is the broadcast channel:
  // the onChange fires on every client and re-derives playback.
  game.settings.register(MODULE_ID, "state", {
    scope: "world",
    config: false,
    type: Object,
    default: {},
    onChange: data => {
      Maestro.sound?.onChange(data ?? {});
      MaestroDirector.refresh();
    }
  });

  console.log(`${MODULE_ID} | init`);
});

/* ------------------------------------------------------------------ */
/*  Bootstrap                                                          */
/* ------------------------------------------------------------------ */

/** Rewrite each soundscape's relative src to an absolute path (once). */
function resolveAssetPaths() {
  if (Maestro._pathsResolved) return;
  for (const s of Object.values(soundscapes)) {
    if (s?.src) s.src = Maestro.assetPath(s.src);
  }
  Maestro._pathsResolved = true;
}

/**
 * Ensure the "Maestro Channels" playlist + its 4 sentinel PlaylistSounds exist,
 * and record their ids on Maestro.CONST. The sentinels are on/off + volume
 * switches; the orchestration replaces each one's `.sound` at activation, so
 * their own path is never played.
 */
async function ensureChannels() {
  let pl = game.playlists.find(p => p.getFlag(MODULE_ID, "isChannels"));

  if (!pl && game.user.isGM) {
    pl = await Playlist.create({
      name: Maestro.CONST.PLAYLIST_NAME,
      flags: { [MODULE_ID]: { isChannels: true } }
    });
    try {
      await pl.createEmbeddedDocuments("PlaylistSound", CHANNELS.map(ch => ({
        name: ch.charAt(0).toUpperCase() + ch.slice(1),
        description: "Maestro channel — controlled by the adaptive engine.",
        repeat: true,
        volume: 1,
        flags: { [MODULE_ID]: { channel: ch } }
      })));
    } catch (err) {
      console.error(`${MODULE_ID} | Failed to create channel sounds (if this is a path-required ` +
                    `validation error, we'll bundle a silent placeholder):`, err);
    }
  }

  if (!pl) {
    console.warn(`${MODULE_ID} | Channel playlist not present yet (a GM must log in once to create it).`);
    return false;
  }

  Maestro.CONST.PLAYLIST_ID = pl.id;
  for (const ch of CHANNELS) {
    const snd = pl.sounds.find(s => s.getFlag(MODULE_ID, "channel") === ch);
    Maestro.CONST[`${ch.toUpperCase()}_SOUND_ID`] = snd?.id ?? null;
  }
  return CHANNELS.every(ch => Maestro.CONST[`${ch.toUpperCase()}_SOUND_ID`]);
}

Hooks.once("ready", async () => {
  try {
    resolveAssetPaths();

    if ( !game.settings.get(MODULE_ID, "assetBasePath") ) {
      console.warn(`${MODULE_ID} | Audio Asset Base Path is not set — audio files will 404 until you set it (module settings) and reload.`);
      if ( game.user.isGM ) ui.notifications?.warn("Cavril Maestro: set the Audio Asset Base Path in module settings, then reload.");
    }

    const ok = await ensureChannels();
    if (!ok) {
      console.warn(`${MODULE_ID} | ready — channels not fully provisioned; playback disabled this session.`);
      return;
    }

    Maestro.sound = new EmberSoundscape();
    Maestro.sound.initialize();
    await Maestro.sound.activate();

    // Stage-1 control surface: reuse the lifted Playlists-sidebar selector
    // (soundscape + mood + environment pickers). Replaced by a dedicated
    // Director panel in Stage 2.
    Hooks.on("renderPlaylistDirectory", (app, html) => {
      try { Maestro.sound?._createMoodSelector?.(html); }
      catch (e) { console.warn(`${MODULE_ID} | mood selector render skipped:`, e); }
    });

    console.log(`${MODULE_ID} | ready — ${Object.keys(soundscapes).length} soundscapes available. ` +
                `Try: Maestro.list() then Maestro.play("ordain")`);
  } catch (err) {
    console.error(`${MODULE_ID} | bootstrap failed:`, err);
  }
});

/* ------------------------------------------------------------------ */
/*  Scene-controls button (best-effort; the macro/console always work) */
/* ------------------------------------------------------------------ */

Hooks.on("getSceneControlButtons", controls => {
  if (!game.user?.isGM) return;
  try {
    const group = controls.tokens ?? controls.token ?? Object.values(controls ?? {})[0];
    if (!group?.tools) return;
    group.tools["maestro-director"] = {
      name: "maestro-director",
      title: "Maestro — Music Director",
      icon: "fa-solid fa-compact-disc",
      button: true,
      onChange: () => Maestro.openDirector()
    };
  } catch (e) {
    console.warn(`${MODULE_ID} | scene-control button skipped:`, e);
  }
});
