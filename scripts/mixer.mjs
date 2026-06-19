/**
 * Cavril Maestro — Per-track Morpher (radial mixer)
 * ------------------------------------------------------------------
 * A small radial pad embedded in the Director, one per category (music +
 * ambience). The active theme's individual tracks (stems) sit around a circle.
 * The puck is a MIXER, not a trigger:
 *   - centre  → every track at its base volume (the normal mix)
 *   - edge    → the nearest track solos (others fade); between two anchors
 *               emphasises both; closer to centre = a wider blend.
 *
 * The engine dedups re-initialisation by (soundscape, arrangement) and preserves
 * continuing layers' volumes on merge, so per-track volume can't ride on
 * setState. Instead we drive the LIVE layers directly (layer.sound.fade) and
 * broadcast the per-track factors over the module socket so every client
 * applies the same mix to its own orchestration. A light re-apply tick keeps
 * the mix alive across generative re-rolls (music re-rolls a random subset of
 * stems each cycle → the morpher biases levels; static ambience is a true mixer).
 *
 * Track order clusters by timbre when a one-time, cached waveform analysis is
 * available (percussive on one side, sustained on the other); else by base vol.
 * ------------------------------------------------------------------
 */

import { soundscapes } from "./soundscapes.mjs";

const MODULE_ID = "cavril-maestro";
export const SOCKET = `module.${MODULE_ID}`;

/** Which engine channel backs each Director tab. */
export const CHANNEL_FOR_TAB = { music: "music", amb: "environment" };

const angDist = (a, b) => { let d = Math.abs(a - b) % (2 * Math.PI); return d > Math.PI ? (2 * Math.PI) - d : d; };

/** Onset-density feature (0 = smooth/sustained, 1 = percussive/transient-heavy). */
function percussiveness(buf) {
  const data = buf.getChannelData(0);
  const sr = buf.sampleRate || 44100;
  const win = Math.max(1, Math.floor(sr * 0.02));   // 20 ms frames
  let prev = 0, onsets = 0;
  for (let i = 0; i < data.length; i += win) {
    let e = 0; const end = Math.min(i + win, data.length);
    for (let j = i; j < end; j++) e += data[j] * data[j];
    e = Math.sqrt(e / win);
    if (prev > 0.02 && e > prev * 1.6 && e > 0.03) onsets++;   // sharp energy rise = onset
    prev = e;
  }
  return Math.max(0, Math.min(1, (onsets / (buf.duration || 1)) / 8));
}

/** Set a single live layer's volume to base*factor (muted → 0), with a short fade. */
function applyLayer(layer, factor) {
  const v = factor <= 0 ? 0 : (Number.isFinite(layer.volume) ? layer.volume : 1) * factor;
  layer.targetVolume = v;
  try { layer.sound?.fade?.(v, 150); } catch (_e) { /* not playing yet */ }
}

export const MaestroMixer = {
  /**
   * The tracks of the theme currently playing on a channel, ordered for the
   * circle. Reads the runtime arrangement (absolute src + base volume per layer).
   * @returns {null|{channel,themeKey,soundscapeId,arrangementId,tracks:Array}}
   */
  tracksFor(channel) {
    const cfg = Maestro.sound?.getActiveConfiguration?.()?.[channel];
    if (!cfg?.soundscapeId || !cfg?.arrangementId) return null;
    const arrangement = Maestro.sound?.containers?.[channel]?.arrangement;
    if (!arrangement?.layers?.size) return null;

    const themeKey = `${cfg.soundscapeId}:${cfg.arrangementId}`;
    const muteMap = (game.settings.get(MODULE_ID, "trackMute") || {})[themeKey] || {};
    const analysis = game.settings.get(MODULE_ID, "trackAnalysis") || {};
    const order = (game.settings.get(MODULE_ID, "trackOrder") || {})[themeKey] || null;

    let tracks = [...arrangement.layers.values()].map(l => ({
      id: l.id,
      base: Number.isFinite(l.volume) ? l.volume : 1,
      src: l.src,
      muted: !!muteMap[l.id],
      feature: Number.isFinite(analysis[l.src]) ? analysis[l.src] : null
    }));

    if (order) {
      tracks.sort((a, b) => ((order.indexOf(a.id) + 1) || 1e6) - ((order.indexOf(b.id) + 1) || 1e6));
    } else if (tracks.length && tracks.every(t => Number.isFinite(t.feature))) {
      tracks.sort((a, b) => a.feature - b.feature || a.id.localeCompare(b.id));   // smooth … percussive
    } else {
      tracks.sort((a, b) => b.base - a.base || a.id.localeCompare(b.id));
    }

    const n = Math.max(1, tracks.length);
    tracks.forEach((t, i) => { t.angle = (-Math.PI / 2) + i * (2 * Math.PI / n); });
    return { channel, themeKey, soundscapeId: cfg.soundscapeId, arrangementId: cfg.arrangementId, tracks };
  },

  /**
   * Per-track volume factors for a puck at normalized radius `pr` (0..1), angle `pa`.
   * The "window" of audible tracks shrinks from the whole circle (centre = every
   * track at base) to ~one slot at the rim (solo the nearest one or two). This is
   * count-adaptive: the edge isolates 1–2 tracks no matter how many stems a theme
   * has, and away-tracks level down as the puck moves outward.
   */
  factors(channel, pr, pa) {
    const info = this.tracksFor(channel);
    if (!info) return null;
    const n = Math.max(1, info.tracks.length);
    const spacing = (2 * Math.PI) / n;                 // angle between adjacent anchors
    const reach = Math.max(spacing, (1 - pr) * Math.PI); // π at centre → one slot at the rim
    const f = {};
    for (const t of info.tracks) {
      if (t.muted) { f[t.id] = 0; continue; }
      const within = Math.max(0, 1 - angDist(pa, t.angle) / reach);  // 1 at puck angle … 0 at window edge
      f[t.id] = (1 - pr) + pr * within;                              // centre = base for all; rim = solo nearest
    }
    return { info, f };
  },

  /** Store + apply a factor map to the live layers of a channel (local only). */
  setMix(channel, themeKey, factors) {
    const orch = Maestro.sound?.containers?.[channel];
    if (!orch) return;
    orch._mix = factors ? { theme: themeKey, factors } : null;
    for (const layer of orch.layers) applyLayer(layer, factors ? (factors[layer.id] ?? 1) : 1);
  },

  /** GM drag: compute factors for a puck position, apply locally, return them. */
  applyMix(channel, pr, pa) {
    const res = this.factors(channel, pr, pa);
    if (!res) return null;
    this.setMix(channel, res.info.themeKey, res.f);
    return { theme: res.info.themeKey, factors: res.f };
  },

  /** Broadcast the current channel mix to every client (GM only). */
  broadcast(channel) {
    const orch = Maestro.sound?.containers?.[channel];
    const mix = orch?._mix;
    try { game.socket?.emit(SOCKET, { action: "mix", channel, theme: mix?.theme ?? null, factors: mix?.factors ?? null }); }
    catch (_e) { /* ignore */ }
  },

  /** Reset a channel to its base mix (puck centre) on all clients. */
  reset(channel) {
    this.setMix(channel, null, null);
    try { game.socket?.emit(SOCKET, { action: "mix", channel, theme: null, factors: null }); } catch (_e) { /* ignore */ }
  },

  /** Re-apply the stored mix to a channel's current layers (used by the tick + after re-roll). */
  reapply(channel) {
    const orch = Maestro.sound?.containers?.[channel];
    const mix = orch?._mix;
    if (!mix) return;
    const cfg = Maestro.sound?.getActiveConfiguration?.()?.[channel];
    const curTheme = cfg?.soundscapeId ? `${cfg.soundscapeId}:${cfg.arrangementId}` : null;
    if (mix.theme !== curTheme) { orch._mix = null; return; }   // theme changed → drop stale mix
    for (const layer of orch.layers) {
      const f = mix.factors[layer.id];
      if (f != null) applyLayer(layer, f);
    }
  },

  /** Socket receiver — apply a mix pushed by the GM. */
  onSocket(data) {
    if (!data || data.action !== "mix") return;
    this.setMix(data.channel, data.theme, data.factors);
  },

  /** Toggle a track's mute for the active theme (persisted per theme), GM only. */
  async toggleMute(channel, trackId) {
    if (!game.user?.isGM) return;
    const info = this.tracksFor(channel);
    if (!info) return;
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "trackMute") || {});
    const theme = (map[info.themeKey] ??= {});
    if (theme[trackId]) delete theme[trackId]; else theme[trackId] = true;
    if (!Object.keys(theme).length) delete map[info.themeKey];
    await game.settings.set(MODULE_ID, "trackMute", map);
    // Fold the mute into the live mix + broadcast.
    const orch = Maestro.sound?.containers?.[channel];
    const factors = foundry.utils.deepClone(orch?._mix?.factors || {});
    factors[trackId] = theme[trackId] ? 0 : 1;
    this.setMix(channel, info.themeKey, factors);
    this.broadcast(channel);
  },

  /** Move a track to the circle slot nearest `angle` and persist the order (per theme, client). */
  async reorderTrack(channel, id, angle) {
    const info = this.tracksFor(channel);
    if (!info) return;
    const ids = info.tracks.map(t => t.id);
    const n = ids.length;
    if (n < 2) return;
    const spacing = (2 * Math.PI) / n;
    const norm = ((((angle + Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
    const slot = Math.round(norm / spacing) % n;
    const from = ids.indexOf(id);
    if (from < 0) return;
    ids.splice(from, 1);
    ids.splice(Math.min(slot, ids.length), 0, id);
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "trackOrder") || {});
    map[info.themeKey] = ids;
    await game.settings.set(MODULE_ID, "trackOrder", map);
  },

  /**
   * One-time timbre analysis of a channel's tracks (cached by src). Best-effort:
   * skips cached entries, tolerates CORS/decode failures.
   * @returns {Promise<boolean>} whether any new analysis was stored
   */
  async analyzeTracks(channel) {
    if (!game.user?.isGM) return false;
    const info = this.tracksFor(channel);
    if (!info) return false;
    const cache = game.settings.get(MODULE_ID, "trackAnalysis") || {};
    const todo = info.tracks.filter(t => t.src && !Number.isFinite(cache[t.src]));
    if (!todo.length) return false;

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;
    const ctx = new Ctx();
    const next = foundry.utils.deepClone(cache);
    let changed = false;
    for (const t of todo) {
      try {
        const ab = await (await fetch(t.src)).arrayBuffer();
        const audio = await ctx.decodeAudioData(ab);
        next[t.src] = percussiveness(audio);
        changed = true;
      } catch (_e) { /* CORS / decode / network — leave unanalyzed */ }
    }
    try { ctx.close?.(); } catch (_e) { /* ignore */ }
    if (changed) await game.settings.set(MODULE_ID, "trackAnalysis", next);
    return changed;
  }
};
