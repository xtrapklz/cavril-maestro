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
import { EmberSoundscape, EmberAudioArrangement } from "./engine.mjs";
import { soundscapes } from "./soundscapes.mjs";
import { MaestroDirector } from "./director.mjs";
import { MaestroCombat } from "./combat.mjs";
import { MaestroMixer, SOCKET } from "./mixer.mjs";
import { dayNightVariant, prettify } from "./meta.mjs";

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
  /** @type {Set<foundry.audio.Sound>} live soundboard one-shots (for Stop all) */
  _oneShots: new Set(),

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
   * Current in-world hour (0-23), read in a calendar-module-agnostic way:
   *   1. Foundry's native calendar (V13+: game.time.components.hour) — this is
   *      what Mini-Calendar and any other UI drive, so it Just Works.
   *   2. Simple Calendar's API, if installed.
   *   3. Derived from worldTime assuming a 24h/86400s day.
   * @returns {number|null}
   */
  worldHour() {
    try {
      const h = game.time?.components?.hour;
      if (Number.isFinite(h)) return h;
    } catch (_e) { /* ignore */ }
    try {
      const sc = game.modules.get("foundryvtt-simple-calendar")?.api;
      const h = sc?.timestampToDate?.(game.time.worldTime)?.hour;
      if (Number.isFinite(h)) return h;
    } catch (_e) { /* ignore */ }
    const wt = Number(game.time?.worldTime);
    if (Number.isFinite(wt)) return Math.floor((((wt % 86400) + 86400) % 86400) / 3600);
    return null;
  },

  /**
   * Time-of-day phase used to auto-pick day/night arrangements. Night is
   * 20:00–05:59. Standalone-safe default ("day") when no time source exists.
   * @returns {"day"|"night"}
   */
  dayPhase() {
    const h = this.worldHour();
    if (!Number.isFinite(h)) return "day";
    return (h < 6 || h >= 20) ? "night" : "day";
  },

  /**
   * Re-evaluate the active music & ambience channels against the current
   * time-of-day phase and switch any cue that has a matching day/night variant.
   * Called on calendar time changes, on ready, and when the setting toggles on.
   * GM only (the state broadcast carries the switch to players).
   */
  applyDayNight() {
    if (!game.user?.isGM) return;
    if (!game.settings.get(MODULE_ID, "autoDayNight")) return;
    const cfg = this.sound?.getActiveConfiguration?.();
    if (!cfg) return;
    const phase = this.dayPhase();
    for (const ch of ["music", "environment"]) {
      const c = cfg[ch];
      if (!c?.soundscapeId || !c?.arrangementId) continue;
      const ss = soundscapes[c.soundscapeId];
      const v = ss ? dayNightVariant(ss, c.arrangementId, phase) : null;
      if (v && v !== c.arrangementId) this.play(c.soundscapeId, { channel: ch, arrangementId: v });
    }
  },

  /**
   * Map a calendar weather icon (FontAwesome class from Mini Calendar's forecast)
   * to one of Maestro's weather arrangements. Anything that isn't rain/storm/fog
   * maps to the "clear" bed (so calm weather still has a gentle ambience rather
   * than silence — Maestro has no snow bed, so snow rides on "clear" too). Tunable here.
   * @param {string} icon
   * @returns {string} a Maestro weather arrangement id
   */
  weatherArrangementForIcon(icon = "") {
    const s = String(icon).toLowerCase();
    if (/bolt/.test(s)) return "rainStorm";              // thunderstorm
    if (/snow-blowing|blizzard/.test(s)) return "rainStorm"; // howling wind
    if (/showers-heavy/.test(s)) return "rainNormal";    // rain / heavy rain
    if (/hail|cloud-rain/.test(s)) return "rainLight";   // light rain / hail
    if (/smog|fog/.test(s)) return "arcaneFog";          // fog
    return "clear";                                       // clear / clouds / snow / wind / sun
  },

  /**
   * Follow Mini Calendar's weather: read its current forecast and play the
   * matching Maestro weather arrangement (or stop the weather channel when the
   * sky is clear). Gated by the world setting `autoWeather`; coexists with Mini
   * Calendar's own "enableWeatherSound" toggle so the GM has granular control.
   * GM only — the state broadcast carries it to players.
   */
  async syncWeatherFromCalendar() {
    if (!game.user?.isGM) return;
    if (!game.settings.get(MODULE_ID, "autoWeather")) return;
    const mc = game.modules.get("wgtgm-mini-calendar");
    if (!mc?.active || typeof mc.api?.getForecast !== "function") return;
    let icon = null;
    try { icon = (await mc.api.getForecast())?.weatherIcon ?? null; }
    catch (e) { return void console.warn(`${MODULE_ID} | weather forecast read skipped:`, e); }
    const arr = this.weatherArrangementForIcon(icon);
    const cur = this.sound?.getActiveConfiguration?.().weather ?? {};
    if (arr) { if (cur.arrangementId !== arr) await this.play("weather", { channel: "weather", arrangementId: arr }); }
    else if (cur.arrangementId) { await this.stop("weather"); }
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
    // Auto day/night: prefer the variant matching the in-world time of day.
    if ((channel === "music" || channel === "environment") && game.settings.get(MODULE_ID, "autoDayNight")) {
      const v = dayNightVariant(ss, arrangementId, this.dayPhase());
      if (v) arrangementId = v;
    }
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
  openDirector() { return MaestroDirector.open(); },

  /* ----- Soundboard (one-shot SFX from a configurable folder) ----- */

  /**
   * Browse one soundboard folder: its sub-folders and its audio files.
   * Best-effort across file sources (Forge assets vs local data).
   * @param {string} [path]  folder to browse; defaults to the configured root
   * @returns {Promise<{dirs:Array<{path:string,name:string}>, files:Array<{src:string,name:string}>}>}
   */
  async browseSoundboard(path) {
    const root = String(game.settings.get(MODULE_ID, "soundboardPath") || "").trim();
    const target = String(path || root).trim();
    if (!target) return { dirs: [], files: [] };
    const FP = foundry.applications?.apps?.FilePicker?.implementation ?? globalThis.FilePicker;
    const AUDIO = [".ogg", ".mp3", ".wav", ".webm", ".m4a", ".opus", ".flac"];
    const order = /^https?:/i.test(target) ? ["forgevtt", "s3", "data"] : ["data", "forgevtt"];
    let res = null;
    for (const s of order) { try { const r = await FP.browse(s, target); if (r) { res = r; break; } } catch (_e) { /* try next source */ } }
    if (!res) return { dirs: [], files: [] };
    const base = p => decodeURIComponent(String(p).split("?")[0].replace(/\/+$/, "").split("/").pop() || "");
    const files = (res.files || [])
      .filter(f => AUDIO.some(e => f.toLowerCase().split("?")[0].endsWith(e)))
      .map(src => { const stem = base(src).replace(/\.[a-z0-9]+$/i, ""); return { src, stem, name: prettify(stem) }; });
    const dirs = (res.dirs || []).map(d => ({ path: d, name: prettify(base(d)) }));
    return { dirs, files };
  },

  /** Play a one-shot effect for everyone (GM-triggered, broadcast to all). */
  async playOneShot(src, { volume } = {}) {
    if (!src) return;
    let v = Number.isFinite(volume) ? volume : Number(game.settings.get(MODULE_ID, "sfxVolume"));
    if (!Number.isFinite(v)) v = 0.8;
    try {
      const snd = await foundry.audio.AudioHelper.play({ src, volume: v, autoplay: true, loop: false }, true);
      if (snd) {
        this._oneShots.add(snd);
        const drop = () => this._oneShots.delete(snd);
        try { snd.addEventListener?.("stop", drop, { once: true }); snd.addEventListener?.("end", drop, { once: true }); } catch (_e) { /* ignore */ }
      }
      return snd;
    } catch (e) {
      console.warn(`${MODULE_ID} | one-shot play failed:`, e);
    }
  },

  /** Stop any soundboard one-shots currently playing on this client (quick fade). */
  stopOneShots() {
    const ms = Math.min(800, Math.max(150, (Number(game.settings.get(MODULE_ID, "crossfadeSeconds")) || 0.8) * 1000));
    for (const snd of [...this._oneShots]) {
      try { snd?.stop?.({ volume: 0, fade: ms }); } catch (_e) { /* ignore */ }
    }
    this._oneShots.clear();
  },

  /**
   * Gracefully fade a channel's audio to silence over the crossfade length, then
   * stop it (clears state). Ramps the orchestration's master gainNode so the
   * whole channel fades together; the gain is restored after the stop so the
   * channel isn't muted next time it plays. Falls back to a plain stop.
   * @param {string} channel
   */
  async fadeOutChannel(channel) {
    const secs = Math.max(0.1, Number(game.settings.get(MODULE_ID, "crossfadeSeconds")) || 0.8);
    const orch = this.sound?.containers?.[channel];
    const g = orch?.gainNode;
    const ctx = orch?.context ?? g?.context;
    if (g && ctx && typeof g.gain?.linearRampToValueAtTime === "function") {
      const orig = g.gain.value;
      try {
        const now = ctx.currentTime;
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.linearRampToValueAtTime(0.0001, now + secs);
      } catch (_e) { /* ignore */ }
      await new Promise(r => setTimeout(r, secs * 1000 + 40));
      await this.stop(channel);
      try { const t = ctx.currentTime; g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(orig, t); } catch (_e) { /* ignore */ }
    } else {
      await this.stop(channel);
    }
  },

  /** Fade every channel out together and silence soundboard one-shots. */
  async stopAll() {
    this.stopOneShots();
    await Promise.all(this.CONST.CHANNELS.map(c => this.fadeOutChannel(c)));
  },

  /* ----- Custom display names (GM-authored, world-shared) ----- */

  /**
   * The custom name a GM has assigned to a cue, or "" if none.
   * @param {"music"|"amb"|"weather"} kind
   * @param {string} id  soundscape id / arrangement id
   * @returns {string}
   */
  customName(kind, id) {
    const map = game.settings.get(MODULE_ID, "customNames") || {};
    return map[`${kind}:${id}`] || "";
  },

  /**
   * Assign (or clear, when name is blank) a custom display name for a cue.
   * Stored in a world setting so every client sees the same labels.
   * @param {"music"|"amb"|"weather"} kind
   * @param {string} id
   * @param {string} name  blank/whitespace reverts to the built-in name
   */
  async setCustomName(kind, id, name) {
    if (!game.user.isGM) return ui.notifications?.warn("Maestro: only a GM can rename cues.");
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "customNames") || {});
    const key = `${kind}:${id}`;
    const v = String(name ?? "").trim();
    if (v) map[key] = v; else delete map[key];
    return game.settings.set(MODULE_ID, "customNames", map);
  },

  /* ----- Favorites (per-user; any cue can be starred) ----- */

  /** The favorites map: { "kind:id": true }. */
  favorites() { return game.settings.get(MODULE_ID, "favorites") || {}; },

  /** Whether a cue is favorited. */
  isFavorite(kind, id) { return !!this.favorites()[`${kind}:${id}`]; },

  /** Toggle a cue's favorite state (per-user client setting). */
  async toggleFavorite(kind, id) {
    const map = foundry.utils.deepClone(this.favorites());
    const key = `${kind}:${id}`;
    if (map[key]) delete map[key]; else map[key] = true;
    return game.settings.set(MODULE_ID, "favorites", map);
  }
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

  // GM-authored custom display names for cues ("kind:id" → label). Shared to all.
  game.settings.register(MODULE_ID, "customNames", {
    scope: "world",
    config: false,
    type: Object,
    default: {},
    onChange: () => MaestroDirector.refresh()
  });

  // Per-user Director layout preference (list vs icon grid).
  game.settings.register(MODULE_ID, "gridLayout", {
    scope: "client",
    config: false,
    type: Boolean,
    default: false
  });

  // Per-user favorited cues: { "kind:id": true }.
  game.settings.register(MODULE_ID, "favorites", {
    scope: "client",
    config: false,
    type: Object,
    default: {},
    onChange: () => MaestroDirector.refresh()
  });

  // Soundboard one-shot volume (used by playOneShot).
  game.settings.register(MODULE_ID, "sfxVolume", {
    scope: "world",
    config: false,
    type: Number,
    default: 0.8
  });

  // Morpher: one-time waveform analysis cache (src → percussiveness 0..1).
  game.settings.register(MODULE_ID, "trackAnalysis", { scope: "world", config: false, type: Object, default: {} });
  // Morpher: muted tracks per theme ({ "soundscape:arrangement": { trackId: true } }).
  game.settings.register(MODULE_ID, "trackMute", { scope: "world", config: false, type: Object, default: {}, onChange: () => MaestroDirector.refresh() });
  // Morpher: custom track order around the circle per theme (client).
  game.settings.register(MODULE_ID, "trackOrder", { scope: "client", config: false, type: Object, default: {} });

  // Auto-pick (and switch) day/night arrangement variants from the calendar.
  game.settings.register(MODULE_ID, "autoDayNight", {
    name: "Auto Day/Night Variants",
    hint: "When a cue has day/night variants, automatically choose the one matching the in-world time of day, " +
          "and switch music & ambience when day turns to night. Reads your calendar (works with Mini Calendar, " +
          "Simple Calendar, or Foundry's built-in time).",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => Maestro.applyDayNight?.()
  });

  // Show the Weather zone in the Director (off by default — weather is often
  // driven by a calendar/weather module instead).
  game.settings.register(MODULE_ID, "weatherEnabled", {
    name: "Show Weather Zone",
    hint: "Show the Weather tab in the Director for manual weather control. Independent of Auto Weather below.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: () => MaestroDirector.refresh()
  });

  // Follow Mini Calendar's weather and play the matching Maestro weather bed.
  game.settings.register(MODULE_ID, "autoWeather", {
    name: "Auto Weather (follow calendar)",
    hint: "When Mini Calendar's weather changes, automatically play Maestro's matching weather sound (rain/storm/fog), and silence it when the sky clears. This is independent of Mini Calendar's own 'enableWeatherSound' toggle — turn that off if you want only Maestro's weather audio (or leave both on to layer them).",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => Maestro.syncWeatherFromCalendar?.()
  });

  // Soundboard of one-shot SFX from a configurable folder.
  game.settings.register(MODULE_ID, "soundboardEnabled", {
    name: "Enable Soundboard",
    hint: "Show a Soundboard tab that lists every audio file in the folder below as a click-to-play one-shot (broadcast to all players).",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: () => MaestroDirector.refresh()
  });
  game.settings.register(MODULE_ID, "soundboardPath", {
    name: "Soundboard Folder",
    hint: "Folder holding your one-shot sound effects (a local path or a Forge Assets Library URL). Each audio file becomes a tile.",
    scope: "world",
    config: true,
    type: String,
    default: "",
    onChange: () => MaestroDirector.refresh()
  });

  // Auto combat music — pick a combat theme from the monsters in the encounter.
  game.settings.register(MODULE_ID, "autoCombatMusic", {
    name: "Auto Combat Music",
    hint: "When combat begins, automatically play a combat theme chosen from the monsters present, and re-pick as they fall. Restores the previous music when combat ends.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
  game.settings.register(MODULE_ID, "combatHordeWeight", {
    name: "Combat Horde Weight",
    hint: "Extra weight each monster body adds on top of its CR when choosing combat music. Higher = swarms of weak minions hold their theme longer. 0 = pure CR totals. (The combat theme is chosen once when combat begins.)",
    scope: "world",
    config: true,
    type: Number,
    default: 1,
    range: { min: 0, max: 5, step: 0.25 }
  });
  game.settings.register(MODULE_ID, "combatEndSound", {
    name: "Combat End Sound",
    hint: "Optional one-shot played when combat ends (a victory sting, horn, etc.). Full path or Forge URL to an audio file. Leave blank for none.",
    scope: "world",
    config: true,
    type: String,
    default: ""
  });

  game.settings.register(MODULE_ID, "crossfadeSeconds", {
    name: "Crossfade Length (seconds)",
    hint: "Minimum fade applied to every clip so transitions and loops are seamless. 0 = hard cuts. Reload after changing.",
    scope: "world",
    config: true,
    type: Number,
    default: 0.8,
    range: { min: 0, max: 5, step: 0.1 },
    onChange: v => { EmberAudioArrangement.FADE_FLOOR = Number(v) || 0; }
  });
  EmberAudioArrangement.FADE_FLOOR = Number(game.settings.get(MODULE_ID, "crossfadeSeconds")) || 0;

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

    // Snap the restored state to the current time of day (if it has variants).
    try { Maestro.applyDayNight(); } catch (e) { console.warn(`${MODULE_ID} | initial day/night sync skipped:`, e); }

    // Auto combat music — drive the music channel from encounter monsters.
    try { MaestroCombat.installHooks(); } catch (e) { console.warn(`${MODULE_ID} | combat hooks skipped:`, e); }

    // Follow the calendar's current weather (if Mini Calendar is present).
    try { Maestro.syncWeatherFromCalendar(); } catch (e) { console.warn(`${MODULE_ID} | initial weather sync skipped:`, e); }

    // Per-track morpher: apply mixes pushed by the GM, and keep the mix alive
    // across generative re-rolls with a light re-apply tick.
    try { game.socket.on(SOCKET, data => { try { MaestroMixer.onSocket(data); } catch (e) { console.warn(`${MODULE_ID} | mix socket skipped:`, e); } }); } catch (_e) { /* ignore */ }
    setInterval(() => { try { MaestroMixer.reapply("music"); MaestroMixer.reapply("environment"); } catch (_e) { /* ignore */ } }, 1500);

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

/* ------------------------------------------------------------------ */
/*  Auto day/night + auto weather — react to calendar changes (debounced) */
/* ------------------------------------------------------------------ */

let _calTimer = null;
function onCalendarChange() {
  clearTimeout(_calTimer);
  _calTimer = setTimeout(() => {
    try { Maestro.applyDayNight(); }
    catch (e) { console.warn(`${MODULE_ID} | day/night switch skipped:`, e); }
    try { Maestro.syncWeatherFromCalendar(); }
    catch (e) { console.warn(`${MODULE_ID} | weather sync skipped:`, e); }
  }, 400);
}

// Time advancing changes both the phase and (often) the weather.
Hooks.on("updateWorldTime", onCalendarChange);
// Mini Calendar has no change hook. It writes weather to its own world settings,
// so react to any of its setting writes (catches manual overrides from the
// dropdown too). `key` is the full "namespace.key".
Hooks.on("updateSetting", setting => {
  if (typeof setting?.key === "string" && setting.key.startsWith("wgtgm-mini-calendar.")) onCalendarChange();
});
// And its HUD re-renders whenever the weather icon updates — a reliable signal
// for a manual override that might not write a setting we can see.
Hooks.on("renderCalendarHUD", onCalendarChange);

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
