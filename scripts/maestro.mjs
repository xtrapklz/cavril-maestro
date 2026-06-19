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
import { MaestroMorphWindow } from "./morphwindow.mjs";
import { dayNightVariant, prettify, musicMeta, ambienceMeta, WEATHER } from "./meta.mjs";

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
  /** @type {null|foundry.audio.Sound} the looping indoor room-tone bed (interior mode) */
  _interiorBed: null,
  _interiorBedWant: false,
  /** @type {Record<string,string[]>} per-wildcard shuffle bags (no repeats until a cycle completes) */
  _wildBag: {},
  _wildLast: {},
  /** @type {null|{soundscapeId:string,vid:string}} the custom music variation currently selected (UI highlight) */
  activeVariation: null,

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
    if (channel === "music") this.activeVariation = null;   // a normal play clears any custom-variation highlight
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

  /* ----- Universal reference (powers journal links, macros, hotbar) ----- */

  /**
   * Resolve the canonical ambience arrangement id for a theme base.
   * @param {string} base
   */
  ambienceCanonical(base) {
    const env = soundscapes.emberEnvironment?.arrangements || {};
    return env[`${base}Day`] ? `${base}Day` : (env[`${base}Night`] ? `${base}Night` : base);
  },

  /**
   * Trigger anything by a short reference string. Used by journal `@Maestro[…]`
   * links, drag-to-hotbar macros, and hand-written macros.
   *   music:<id> · amb:<base> · weather:<id> · sfx:<path> · preset:<tag> ·
   *   stop[:<channel>] · or a bare music soundscape id / name.
   * @param {string} ref
   */
  triggerRef(ref) {
    const s = String(ref ?? "").trim();
    if (!s) return;
    const ci = s.indexOf(":");
    const kind = ci >= 0 ? s.slice(0, ci).toLowerCase() : "";
    const id = ci >= 0 ? s.slice(ci + 1) : s;
    switch (kind) {
      case "preset": return this.triggerPreset(id);
      case "music": return this.play(id, { channel: "music" });
      case "amb": case "ambience": case "environment":
        return this.play("emberEnvironment", { channel: "environment", arrangementId: this.ambienceCanonical(id) });
      case "weather": return this.play("weather", { channel: "weather", arrangementId: id });
      case "sfx": return this.playOneShot(id);
      case "stop": return (id && id !== "all") ? this.stop(id) : this.stopAll();
      default: {
        if (soundscapes[s]?.type === "music") return this.play(s, { channel: "music" });
        const byName = Object.values(soundscapes).find(x => x.type === "music" && musicMeta(x.id).name.toLowerCase() === s.toLowerCase());
        if (byName) return this.play(byName.id, { channel: "music" });
        const tag = this.allTags().find(t => t.tag.toLowerCase() === s.toLowerCase());
        if (tag) return this.triggerPreset(tag.tag);
        return ui.notifications?.warn(`Maestro: couldn't resolve reference "${ref}".`);
      }
    }
  },

  /** Display {label, icon} for a reference (journal link text, macro name/img). */
  refMeta(ref) {
    const s = String(ref ?? "").trim();
    const ci = s.indexOf(":");
    const kind = ci >= 0 ? s.slice(0, ci).toLowerCase() : "";
    const id = ci >= 0 ? s.slice(ci + 1) : s;
    if (kind === "preset") return { label: id, icon: "fa-solid fa-bolt" };
    if (kind === "music") return { label: musicMeta(id).name, icon: musicMeta(id).icon };
    if (kind === "amb" || kind === "ambience" || kind === "environment") { const m = ambienceMeta(this.ambienceCanonical(id)); return { label: m.name, icon: m.icon }; }
    if (kind === "weather") return { label: WEATHER[id] || prettify(id), icon: "fa-solid fa-cloud-bolt" };
    if (kind === "sfx") return { label: prettify(decodeURIComponent(id.split("?")[0].split("/").pop() || "").replace(/\.[a-z0-9]+$/i, "")), icon: "fa-solid fa-volume-high" };
    if (kind === "stop") return { label: id && id !== "all" ? `Stop ${id}` : "Stop all", icon: "fa-solid fa-circle-stop" };
    if (soundscapes[s]?.type === "music") return { label: musicMeta(s).name, icon: musicMeta(s).icon };
    return { label: s, icon: "fa-solid fa-compact-disc" };
  },

  /** Open the pop-out Ambience Morpher (per-track mixer). */
  openMorph() { return MaestroMorphWindow.open(); },

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

  /**
   * Interior perspective: route the WEATHER and AMBIENCE (environment) channels
   * through a low-pass filter so the outdoors sounds muffled, as if heard from
   * inside. `freq` is the cutoff in Hz (lower = more muffled). Off = bypass.
   * Idempotent — safe to re-call after a channel re-plays (re-wires only if needed).
   *
   * When `ramp` is true the muffle eases IN/OUT by sweeping the cutoff between fully
   * open and the target over the crossfade duration (used by the on/off toggle, so
   * the interior transition matches every other fade); the filter is only unwired
   * once the open-up sweep finishes. Otherwise it snaps to the steady state (used by
   * the re-apply after a channel change / on load / while dragging the cutoff slider).
   * The looping room-tone bed is driven separately via setInteriorBed().
   */
  setInteriorFilter(on, freq, ramp = false) {
    const secs = Math.max(0.05, Number(game.settings.get(MODULE_ID, "crossfadeSeconds")) || 0.8);
    const OPEN = 20000;                                              // effectively bypassed
    const target = Math.max(120, Math.min(20000, Number(freq) || 800));
    for (const channel of ["weather", "environment"]) {
      const orch = this.sound?.containers?.[channel];
      const g = orch?.gainNode;
      const ctx = orch?.context ?? g?.context;
      if (!g || !ctx) continue;
      const dest = orch.destination ?? ctx.destination;
      try {
        if (on) {
          orch._lpf ||= ctx.createBiquadFilter();
          orch._lpf.type = "lowpass";
          clearTimeout(orch._lpfOffTimer); orch._lpfOffTimer = null;   // cancel a pending unwire
          const f = orch._lpf.frequency, now = ctx.currentTime;
          const start = orch._lpfWired ? Math.max(20, f.value) : (ramp ? OPEN : target);
          if (!orch._lpfWired) { g.disconnect(); g.connect(orch._lpf); orch._lpf.connect(dest); orch._lpfWired = true; }
          f.cancelScheduledValues(now);
          f.setValueAtTime(start, now);
          if (ramp) f.exponentialRampToValueAtTime(target, now + secs);   // muffle eases in
          else f.setValueAtTime(target, now);
        } else if (orch._lpfWired) {
          const f = orch._lpf.frequency, now = ctx.currentTime;
          if (ramp) {
            f.cancelScheduledValues(now);
            f.setValueAtTime(Math.max(20, f.value), now);
            f.exponentialRampToValueAtTime(OPEN, now + secs);              // un-muffle, then bypass
            clearTimeout(orch._lpfOffTimer);
            orch._lpfOffTimer = setTimeout(() => {
              try { if (orch._lpfWired) { g.disconnect(); orch._lpf?.disconnect(); g.connect(dest); orch._lpfWired = false; } } catch (_e) { /* ignore */ }
              orch._lpfOffTimer = null;
            }, secs * 1000 + 80);
          } else {
            clearTimeout(orch._lpfOffTimer); orch._lpfOffTimer = null;
            g.disconnect(); orch._lpf?.disconnect(); g.connect(dest); orch._lpfWired = false;
          }
        }
      } catch (e) { console.warn(`${MODULE_ID} | interior filter (${channel}) skipped:`, e); }
    }
  },

  /**
   * Indoor room-tone bed: while interior mode is on, loop the environment
   * room-tone asset under everything (a subtle "you're inside a room" hum).
   * Plays locally on every client (the interiorOn world setting fires this on all).
   */
  async setInteriorBed(on) {
    this._interiorBedWant = !!on;
    if (on) {
      if (this._interiorBed) return;
      const env = this.soundscapes?.emberEnvironment;
      const seg = env?.segments?.roomTone;
      if (!seg?.src) return;
      const src = [env.src, seg.src].filter(Boolean).join("/").replace(/([^:]\/)\/+/g, "$1");
      const vol = Math.min(0.6, (Number(this.sound?.channels?.environment?.volume) || 0.7) * 0.6);
      const ms = Math.max(120, (Number(game.settings.get(MODULE_ID, "crossfadeSeconds")) || 0.8) * 1000);
      let snd = null;
      try { snd = await foundry.audio.AudioHelper.play({ src, volume: 0, loop: true, autoplay: true }, false); }
      catch (e) { console.warn(`${MODULE_ID} | room-tone bed failed:`, e); }
      if (!this._interiorBedWant) { try { snd?.stop?.(); } catch (_e) { /* ignore */ } return; }   // toggled off mid-load
      if (snd) { try { snd.fade?.(vol, { duration: ms }); } catch (_e) { try { snd.volume = vol; } catch (_e2) { /* ignore */ } } }   // fade in to match the filter sweep
      this._interiorBed = snd || null;
    } else if (this._interiorBed) {
      const snd = this._interiorBed; this._interiorBed = null;
      const ms = Math.max(120, (Number(game.settings.get(MODULE_ID, "crossfadeSeconds")) || 0.8) * 1000);
      try { snd.stop?.({ volume: 0, fade: ms }); } catch (_e) { try { snd.stop?.(); } catch (_e2) { /* ignore */ } }
    }
  },

  /** The core door-open sound path (from CONFIG.Wall.doorSounds), falling back to the wood door. */
  doorSoundSrc() {
    try {
      const sets = CONFIG?.Wall?.doorSounds || {};
      const pick = sets.woodBasic || Object.values(sets)[0];
      let open = pick?.open;
      if (Array.isArray(open)) open = open[0];
      if (typeof open === "string" && open) return open;
    } catch (_e) { /* ignore */ }
    return "sounds/doors/wood/open.ogg";
  },

  /** Play the core door-open SFX once, locally — the interior/exterior transition cue (gated by the doorSound setting). */
  playDoorSound() {
    if (!game.settings.get(MODULE_ID, "doorSound")) return;
    const v = Number(game.settings.get(MODULE_ID, "sfxVolume"));
    try { foundry.audio.AudioHelper.play({ src: this.doorSoundSrc(), volume: Number.isFinite(v) ? v : 0.8, loop: false, autoplay: true }, false); }
    catch (e) { console.warn(`${MODULE_ID} | door sound failed:`, e); }
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
  },

  /* ----- Tags + presets ----- */

  /** Tags assigned to a cue (array). */
  tagsFor(kind, id) {
    const t = (game.settings.get(MODULE_ID, "tags") || {})[`${kind}:${id}`];
    return Array.isArray(t) ? t : [];
  },

  /** Set a cue's tags (array; empty clears). World-shared so presets are consistent. */
  async setTags(kind, id, tags) {
    if (!game.user.isGM) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "tags") || {});
    const key = `${kind}:${id}`;
    const clean = [...new Set((tags || []).map(s => String(s).trim()).filter(Boolean))];
    if (clean.length) map[key] = clean; else delete map[key];
    return game.settings.set(MODULE_ID, "tags", map);
  },

  /** All distinct tags in use, with how many cues carry each. */
  allTags() {
    const all = game.settings.get(MODULE_ID, "tags") || {};
    const counts = {};
    for (const arr of Object.values(all)) if (Array.isArray(arr)) for (const t of arr) counts[t] = (counts[t] || 0) + 1;
    return Object.entries(counts).map(([tag, count]) => ({ tag, count })).sort((a, b) => a.tag.localeCompare(b.tag));
  },

  /**
   * Trigger a preset: play the cues carrying `tag`, but only ONE per exclusive
   * channel (music / ambience / weather — they'd otherwise stomp each other),
   * and fire all one-shot SFX. A one-click scene.
   */
  async triggerPreset(tag) {
    if (!game.user.isGM) return ui.notifications?.warn("Maestro: only a GM can fire presets.");
    const all = game.settings.get(MODULE_ID, "tags") || {};
    const env = soundscapes.emberEnvironment?.arrangements || {};
    const usedChannel = new Set();
    for (const [key, tags] of Object.entries(all)) {
      if (!Array.isArray(tags) || !tags.includes(tag)) continue;
      const ci = key.indexOf(":");
      const kind = key.slice(0, ci), id = key.slice(ci + 1);
      try {
        if (kind === "music") { if (usedChannel.has("music")) continue; usedChannel.add("music"); await this.play(id, { channel: "music" }); }
        else if (kind === "amb") {
          if (usedChannel.has("environment")) continue; usedChannel.add("environment");
          const canon = env[`${id}Day`] ? `${id}Day` : (env[`${id}Night`] ? `${id}Night` : id);
          await this.play("emberEnvironment", { channel: "environment", arrangementId: canon });
        } else if (kind === "weather") { if (usedChannel.has("weather")) continue; usedChannel.add("weather"); await this.play("weather", { channel: "weather", arrangementId: id }); }
        else if (kind === "sfx") this.playOneShot(id);
      } catch (e) { console.warn(`${MODULE_ID} | preset member failed (${key}):`, e); }
    }
  },

  /* ----- Custom icons (per cue) + soundboard aliases (per file/folder) ----- */

  /** Custom Font Awesome class for a cue, or "" if none. */
  customIcon(kind, id) { return (game.settings.get(MODULE_ID, "customIcons") || {})[`${kind}:${id}`] || ""; },

  /** Set a cue's custom icon class (e.g. "fa-solid fa-dragon"); blank clears. */
  async setCustomIcon(kind, id, cls) {
    if (!game.user.isGM) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "customIcons") || {});
    const key = `${kind}:${id}`;
    const v = String(cls || "").trim();
    if (v) map[key] = v; else delete map[key];
    return game.settings.set(MODULE_ID, "customIcons", map);
  },

  /** Display alias for a soundboard file/folder path, or "" if none. */
  sbAlias(path) { return (game.settings.get(MODULE_ID, "sbAliases") || {})[path] || ""; },

  /** Set a soundboard file/folder display alias (non-destructive); blank clears. */
  async setSbAlias(path, name) {
    if (!game.user.isGM) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "sbAliases") || {});
    const v = String(name || "").trim();
    if (v) map[path] = v; else delete map[path];
    return game.settings.set(MODULE_ID, "sbAliases", map);
  },

  /** Whether a soundboard folder is a wildcard (click = random sound inside). Wildcard by DEFAULT. */
  isFolderWild(path) { return (game.settings.get(MODULE_ID, "folderWild") || {})[path] !== false; },

  /** Toggle a folder's wildcard mode (default is on, so only an explicit "navigate" is stored). */
  async setFolderWild(path, on) {
    if (!game.user.isGM) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "folderWild") || {});
    if (on) delete map[path]; else map[path] = false;
    return game.settings.set(MODULE_ID, "folderWild", map);
  },

  /**
   * Pick a random source from `srcs` and play it WITHOUT repeating any one until the
   * whole set has played (a shuffle-bag per `key`). Avoids the same audio twice in a row.
   */
  playRandomOneShot(key, srcs) {
    const pool = [...new Set((srcs || []).filter(Boolean))];
    if (!pool.length) return;
    if (pool.length === 1) return this.playOneShot(pool[0]);
    let bag = (this._wildBag[key] || []).filter(s => pool.includes(s));
    if (!bag.length) {                                   // exhausted → refill + reshuffle
      bag = [...pool];
      for (let i = bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; }
      if (bag[bag.length - 1] === this._wildLast[key]) [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];   // don't repeat across cycles
    }
    const pick = bag.pop();
    this._wildBag[key] = bag;
    this._wildLast[key] = pick;
    return this.playOneShot(pick);
  },

  /** Play a random audio file from a folder (wildcard click); looks one level into sub-folders if empty. */
  async playRandomInFolder(path) {
    if (!path) return;
    const top = await this.browseSoundboard(path);
    const files = (top.files || []).slice();
    if (!files.length) for (const d of (top.dirs || [])) { const sub = await this.browseSoundboard(d.path); files.push(...(sub.files || [])); }
    if (!files.length) return ui.notifications?.warn("Maestro: no sounds in that folder.");
    this.playRandomOneShot(path, files.map(f => f.src));
  },

  /* ----- Custom music variations (saved track subsets within a theme) ----- */

  /** Custom variations saved for a music soundscape. */
  musicVariations(soundscapeId) {
    const v = (game.settings.get(MODULE_ID, "musicVariations") || {})[soundscapeId];
    return Array.isArray(v) ? v : [];
  },

  /** Save a new variation = which tracks are enabled within a theme's arrangement. */
  async saveMusicVariation(soundscapeId, base, name, enabled) {
    if (!game.user.isGM) return;
    const nm = String(name || "").trim();
    if (!soundscapeId || !nm) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "musicVariations") || {});
    const list = (map[soundscapeId] ??= []);
    const id = nm.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `var-${list.length + 1}`;
    const entry = { id, name: nm, base, enabled: [...new Set(enabled || [])] };
    const at = list.findIndex(x => x.id === id);
    if (at >= 0) list[at] = entry; else list.push(entry);
    return game.settings.set(MODULE_ID, "musicVariations", map);
  },

  /** Remove a saved variation. */
  async deleteMusicVariation(soundscapeId, vid) {
    if (!game.user.isGM) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "musicVariations") || {});
    if (!map[soundscapeId]) return;
    map[soundscapeId] = map[soundscapeId].filter(x => x.id !== vid);
    if (!map[soundscapeId].length) delete map[soundscapeId];
    return game.settings.set(MODULE_ID, "musicVariations", map);
  },

  /** Play a saved variation: its base arrangement with only its enabled tracks audible. */
  async playMusicVariation(soundscapeId, vid) {
    if (!game.user.isGM) return;
    const v = this.musicVariations(soundscapeId).find(x => x.id === vid);
    if (!v) return;
    await this.play(soundscapeId, { channel: "music", arrangementId: v.base });   // clears activeVariation
    const arr = soundscapes[soundscapeId]?.arrangements?.[v.base];
    const factors = {};
    for (const id of Object.keys(arr?.layers || {})) factors[id] = v.enabled.includes(id) ? 1 : 0;
    MaestroMixer.setMix("music", `${soundscapeId}:${v.base}`, factors);   // reapply tick lands it once layers come up
    MaestroMixer.broadcast("music");
    this.activeVariation = { soundscapeId, vid };                          // highlight this variation
    MaestroDirector.refresh();
  },

  /* ----- Preset-specific member order + aliases ----- */

  /** Per-preset metadata: { order:[memberKey], aliases:{memberKey:name} }. */
  presetMeta(tag) {
    const m = (game.settings.get(MODULE_ID, "presetMeta") || {})[tag];
    return { order: Array.isArray(m?.order) ? m.order : [], aliases: m?.aliases || {} };
  },

  /** Set a preset-specific display alias for a member (blank clears). */
  async setPresetAlias(tag, memberKey, name) {
    if (!game.user.isGM) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "presetMeta") || {});
    const entry = (map[tag] ??= { order: [], aliases: {} });
    const v = String(name || "").trim();
    if (v) entry.aliases[memberKey] = v; else delete entry.aliases[memberKey];
    return game.settings.set(MODULE_ID, "presetMeta", map);
  },

  /** Set the member order within a preset. */
  async setPresetOrder(tag, order) {
    if (!game.user.isGM) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "presetMeta") || {});
    const entry = (map[tag] ??= { order: [], aliases: {} });
    entry.order = [...order];
    return game.settings.set(MODULE_ID, "presetMeta", map);
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
      // A freshly (re)played channel gets a new gain node — re-wire the interior LPF onto it.
      try { if (game.settings.get(MODULE_ID, "interiorOn")) Maestro.setInteriorFilter(true, game.settings.get(MODULE_ID, "interiorFreq")); } catch (_e) { /* ignore */ }
      MaestroDirector.refresh();
      MaestroMorphWindow.refresh();
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
  // Per-user manual order of favorites (array of "kind:id" keys).
  game.settings.register(MODULE_ID, "favOrder", { scope: "client", config: false, type: Array, default: [], onChange: () => MaestroDirector.refresh() });
  // Inline ambience morpher minimized inside the Director (per user).
  game.settings.register(MODULE_ID, "morphCollapsed", { scope: "client", config: false, type: Boolean, default: true });
  // Auto-stroll params (morpher): waveform preset for the radius, plus speed + intensity.
  // intensity = how far the radius deviates from the 0.5 midpoint (centre↔rim swing).
  game.settings.register(MODULE_ID, "autoWave", { scope: "client", config: false, type: String, default: "sine" });
  game.settings.register(MODULE_ID, "autoSpeed", { scope: "client", config: false, type: Number, default: 6 });
  game.settings.register(MODULE_ID, "autoIntensity", { scope: "client", config: false, type: Number, default: 0.7 });   // 0..1 slider position; mapped exponentially → swing

  // Interior perspective: low-pass the weather + ambience channels and loop a room-tone
  // bed (world-shared so all hear it).
  game.settings.register(MODULE_ID, "interiorOn", {
    scope: "world", config: false, type: Boolean, default: false,
    onChange: v => { try { Maestro.setInteriorFilter(v, game.settings.get(MODULE_ID, "interiorFreq"), true); Maestro.setInteriorBed(v); Maestro.playDoorSound(); } catch (_e) {} MaestroDirector.refresh(); }
  });
  // Door SFX cue on the interior/exterior toggle (core door-open sound).
  game.settings.register(MODULE_ID, "doorSound", {
    scope: "world", config: false, type: Boolean, default: true,
    onChange: () => MaestroDirector.refresh()
  });
  game.settings.register(MODULE_ID, "interiorFreq", {
    scope: "world", config: false, type: Number, default: 900,
    onChange: v => { try { if (game.settings.get(MODULE_ID, "interiorOn")) Maestro.setInteriorFilter(true, v); } catch (_e) {} }
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

  // Tags per cue ({ "kind:id": ["tag", …] }) — searchable + power the Presets tab.
  game.settings.register(MODULE_ID, "tags", { scope: "world", config: false, type: Object, default: {}, onChange: () => MaestroDirector.refresh() });
  // Custom per-cue icons ({ "kind:id": "fa-solid fa-…" }).
  game.settings.register(MODULE_ID, "customIcons", { scope: "world", config: false, type: Object, default: {}, onChange: () => MaestroDirector.refresh() });
  // Soundboard display aliases ({ path: "Alias" }) — non-destructive renames.
  game.settings.register(MODULE_ID, "sbAliases", { scope: "world", config: false, type: Object, default: {}, onChange: () => MaestroDirector.refresh() });
  // Soundboard folders set to wildcard mode ({ path: true }) — click plays a random sound inside.
  game.settings.register(MODULE_ID, "folderWild", { scope: "world", config: false, type: Object, default: {}, onChange: () => MaestroDirector.refresh() });
  // Custom music variations ({ soundscapeId: [{ id, name, base, enabled:[trackIds] }] }).
  game.settings.register(MODULE_ID, "musicVariations", { scope: "world", config: false, type: Object, default: {}, onChange: () => MaestroDirector.refresh() });
  // Per-preset member order + aliases ({ tag: { order:[key], aliases:{key:name} } }).
  game.settings.register(MODULE_ID, "presetMeta", { scope: "world", config: false, type: Object, default: {}, onChange: () => MaestroDirector.refresh() });

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

  // Journal links: @Maestro[ref]{optional label} → a clickable/draggable cue link.
  try {
    const enrichers = CONFIG.TextEditor?.enrichers;
    if (Array.isArray(enrichers)) enrichers.push({
      pattern: /@Maestro\[([^\]]+)\](?:\{([^}]+)\})?/g,
      enricher: m => {
        const ref = m[1].trim();
        const meta = Maestro.refMeta(ref);
        const label = (m[2]?.trim()) || meta.label;
        const a = document.createElement("a");
        a.className = "maestro-link content-link";
        a.dataset.ref = ref;
        a.draggable = true;
        a.innerHTML = `<i class="${meta.icon}"></i> ${foundry.utils.escapeHTML(label)}`;
        return a;
      }
    });
  } catch (e) { console.warn(`${MODULE_ID} | journal enricher skipped:`, e); }

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

    // Restore the interior-perspective filter + room-tone bed if it was left on.
    try { if (game.settings.get(MODULE_ID, "interiorOn")) { Maestro.setInteriorFilter(true, game.settings.get(MODULE_ID, "interiorFreq")); Maestro.setInteriorBed(true); } } catch (_e) { /* ignore */ }

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

/* ------------------------------------------------------------------ */
/*  Cue references — journal link clicks/drags + drag-to-hotbar macros  */
/* ------------------------------------------------------------------ */

Hooks.once("ready", () => {
  document.body.addEventListener("click", ev => {
    const a = ev.target.closest?.("a.maestro-link");
    if (!a) return;
    ev.preventDefault(); ev.stopPropagation();
    Maestro.triggerRef(a.dataset.ref);
  });
  document.body.addEventListener("dragstart", ev => {
    const a = ev.target.closest?.("a.maestro-link");
    if (!a) return;
    try { ev.dataTransfer.setData("text/plain", JSON.stringify({ type: "cavril-maestro", ref: a.dataset.ref, label: Maestro.refMeta(a.dataset.ref).label })); } catch (_e) { /* ignore */ }
  });
});

// Dropping a Maestro cue (from the Director or a journal link) onto the hotbar
// creates a one-line macro that triggers it.
Hooks.on("hotbarDrop", (bar, data, slot) => {
  if (data?.type !== "cavril-maestro") return;
  (async () => {
    try {
      const meta = Maestro.refMeta(data.ref);
      const macro = await Macro.create({
        name: data.label || meta.label || "Maestro",
        type: "script",
        img: "icons/svg/sound.svg",
        command: `Maestro.triggerRef(${JSON.stringify(data.ref)});`
      });
      if (macro) await game.user.assignHotbarMacro(macro, slot);
    } catch (e) { console.warn(`${MODULE_ID} | hotbar macro create failed:`, e); }
  })();
  return false;
});

// Dragging a Maestro cue from the Director (or a journal link) onto the scene canvas
// drops a SILENT AmbientSound flagged as a trigger: when a party token enters its
// radius, the proximity system below fires the cue. No audio rides the sound itself
// (path left empty) — it's purely a placed trigger zone you can move/resize/delete.
Hooks.on("dropCanvasData", (cnv, data) => {
  if (data?.type !== "cavril-maestro" || !data.ref) return;
  if (!game.user?.isGM) { ui.notifications?.warn("Only a GM can place a Maestro trigger."); return false; }
  const scene = cnv?.scene;
  if (!scene || !Number.isFinite(data.x) || !Number.isFinite(data.y)) return false;
  (async () => {
    try {
      const radius = Math.max(5, Math.round((cnv.dimensions?.distance || 5) * 4));   // ~4 grid spaces
      await scene.createEmbeddedDocuments("AmbientSound", [{
        x: Math.round(data.x), y: Math.round(data.y), radius, walls: false,
        flags: { [MODULE_ID]: { ref: data.ref } }
      }]);
      const meta = Maestro.refMeta(data.ref);
      ui.notifications?.info(`Maestro trigger placed: ${data.label || meta.label || data.ref}`);
    } catch (e) {
      console.warn(`${MODULE_ID} | canvas trigger create failed:`, e);
      ui.notifications?.error("Could not place Maestro trigger.");
    }
  })();
  return false;
});

/* ------------------------------------------------------------------ */
/*  Scene + ambient-sound cue assignment                               */
/* ------------------------------------------------------------------ */

/** Inject a "Maestro cue" text field (saved as a flag) into a config sheet. */
function injectCueField(html, doc, flagKey, label, hint) {
  try {
    const el = html instanceof HTMLElement ? html : html?.[0];
    const form = el?.matches?.("form") ? el : el?.querySelector?.("form");
    if (!form || form.querySelector(`[name="flags.${MODULE_ID}.${flagKey}"]`)) return;
    const cur = doc?.getFlag?.(MODULE_ID, flagKey) ?? "";
    const grp = document.createElement("div");
    grp.className = "form-group";
    grp.innerHTML = `<label><i class="fa-solid fa-compact-disc"></i> ${label}</label>`
      + `<div class="form-fields"><input type="text" name="flags.${MODULE_ID}.${flagKey}" value="${foundry.utils.escapeHTML(String(cur))}" placeholder="preset:tavern · music:ordain · amb:bluffs"></div>`
      + `<p class="hint">${hint}</p>`;
    const footer = form.querySelector("footer");
    if (footer) footer.before(grp); else form.appendChild(grp);
  } catch (e) { console.warn(`${MODULE_ID} | cue field injection skipped:`, e); }
}

Hooks.on("renderSceneConfig", (app, html) => injectCueField(html, app.document, "onActivate", "Maestro cue on activate", "Plays this Maestro cue/preset when this scene is activated."));
Hooks.on("renderAmbientSoundConfig", (app, html) => injectCueField(html, app.document, "ref", "Maestro cue on enter", "Fires this Maestro cue/preset when a party token enters this sound's area."));

// Scene activation → fire its assigned cue.
Hooks.on("updateScene", (scene, changes) => {
  if (!game.user?.isGM || changes?.active !== true) return;
  const ref = scene.getFlag(MODULE_ID, "onActivate");
  if (ref) try { Maestro.triggerRef(ref); } catch (e) { console.warn(`${MODULE_ID} | scene cue skipped:`, e); }
});

// Ambient-sound proximity → fire when a party token first enters the area.
const _ambInside = new Map();   // ambientSoundId → boolean (a party token is inside)
function checkAmbientTriggers() {
  if (!game.user?.isGM || !canvas?.ready) return;
  const dim = canvas.dimensions;
  const pxPerUnit = dim?.distance ? (dim.size / dim.distance) : 1;
  const tokens = (canvas.tokens?.placeables ?? []).filter(t => t.actor?.hasPlayerOwner);
  for (const snd of (canvas.sounds?.placeables ?? [])) {
    const ref = snd.document?.getFlag?.(MODULE_ID, "ref");
    if (!ref) continue;
    const cx = snd.document.x, cy = snd.document.y, pr = (snd.document.radius || 0) * pxPerUnit;
    const inside = tokens.some(t => Math.hypot(t.center.x - cx, t.center.y - cy) <= pr);
    const was = _ambInside.get(snd.id) || false;
    if (inside && !was) try { Maestro.triggerRef(ref); } catch (_e) { /* ignore */ }
    _ambInside.set(snd.id, inside);
  }
}
Hooks.on("updateToken", (_doc, ch) => { if (("x" in (ch || {})) || ("y" in (ch || {}))) checkAmbientTriggers(); });
Hooks.on("canvasReady", () => { _ambInside.clear(); checkAmbientTriggers(); });

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
