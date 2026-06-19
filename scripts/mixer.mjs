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
import { trackZoneIndex, trackIcon, prettify, ambienceMeta } from "./meta.mjs";

const MODULE_ID = "cavril-maestro";
export const SOCKET = `module.${MODULE_ID}`;

/** Which engine channel backs each Director tab. */
export const CHANNEL_FOR_TAB = { music: "music", amb: "environment" };

/** Shared morpher geometry (viewBox units). Both the pop-out window and the
 * inline Director morpher use it; the inline one is just CSS-sized smaller. */
export const GEOM = { CX: 220, CY: 172, R: 138, VBW: 440, VBH: 360, GAP: 15 };

/** Shortest angular distance between two angles (0..π). */
const angDist = (a, b) => { const d = Math.abs(a - b) % (2 * Math.PI); return d > Math.PI ? (2 * Math.PI) - d : d; };

/* Auto-stroll state: the puck rotates while its radius rides a sine wave. */
let _autoTimer = null, _autoT = 0, _autoAngle = -Math.PI / 2;

/** Move every visible morpher puck to a normalized radius `r` / `angle` (auto-stroll visual). */
function movePucks(r, angle) {
  for (const svg of document.querySelectorAll(".mm-svg")) {
    const cx = +svg.dataset.cx, cy = +svg.dataset.cy, rr = +svg.dataset.r;
    if (!Number.isFinite(cx)) continue;
    const puck = svg.querySelector(".mm-puck");
    if (puck) { puck.setAttribute("cx", (cx + rr * r * Math.cos(angle)).toFixed(1)); puck.setAttribute("cy", (cy + rr * r * Math.sin(angle)).toFixed(1)); }
  }
}

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

/** Auto-stroll waveform shapes → value in [-1, 1] for a phase in cycles. */
export const WAVES = ["sine", "triangle", "square", "saw", "random"];
function waveform(type, phase) {
  const p = phase - Math.floor(phase);   // 0..1
  switch (type) {
    case "triangle": return 4 * Math.abs(p - 0.5) - 1;
    case "square": return p < 0.5 ? 1 : -1;
    case "saw": return 2 * p - 1;
    case "random": return 0.6 * Math.sin(2 * Math.PI * phase) + 0.3 * Math.sin(2 * Math.PI * phase * 1.7 + 1) + 0.1 * Math.sin(2 * Math.PI * phase * 0.43 + 2);
    default: return Math.sin(2 * Math.PI * phase);   // sine
  }
}

/** Polygon points for the live intensity graph: each track's vertex at radius ∝ its factor. */
function graphPoints(tracks, factors) {
  const { CX, CY, R } = GEOM;
  return (tracks || []).map(t => {
    const f = Math.max(0, Math.min(1, factors ? (factors[t.id] ?? 1) : 1));
    return `${(CX + R * f * Math.cos(t.angle)).toFixed(1)},${(CY + R * f * Math.sin(t.angle)).toFixed(1)}`;
  }).join(" ");
}

/** Redraw every visible intensity graph from a channel's current live mix. */
function refreshGraph(channel) {
  const info = MaestroMixer.tracksFor(channel);
  if (!info) return;
  const pts = graphPoints(info.tracks, Maestro.sound?.containers?.[channel]?._mix?.factors);
  for (const poly of document.querySelectorAll(".mm-graph")) poly.setAttribute("points", pts);
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
    } else {
      // Name-based zones: similar timbres sit in adjacent arcs (a pleasing stroll).
      tracks.sort((a, b) => trackZoneIndex(a.id) - trackZoneIndex(b.id) || a.id.localeCompare(b.id));
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
  /** Build the morpher view (anchor positions, labels, icons) for a channel, or null. */
  view(channel) {
    const info = this.tracksFor(channel);
    if (!info) return null;
    const { CX, CY, R, GAP } = GEOM;
    const tracks = info.tracks.map(t => {
      const x = CX + R * Math.cos(t.angle), y = CY + R * Math.sin(t.angle);
      const lx = CX + (R + GAP) * Math.cos(t.angle), ly = CY + (R + GAP) * Math.sin(t.angle);
      const c = Math.cos(t.angle);
      return {
        id: t.id, label: prettify(t.id), icon: trackIcon(t.id), muted: t.muted,
        x: +x.toFixed(1), y: +y.toFixed(1), ix: +(x - 16).toFixed(1), iy: +(y - 16).toFixed(1),
        lx: +lx.toFixed(1), ly: +(ly + 3).toFixed(1), anchor: c < -0.3 ? "end" : (c > 0.3 ? "start" : "middle")
      };
    });
    const num = (key, dflt) => { const v = Number(game.settings.get(MODULE_ID, key)); return Number.isFinite(v) ? v : dflt; };
    const curWave = game.settings.get(MODULE_ID, "autoWave") || "sine";
    return {
      name: ambienceMeta(info.arrangementId).name, tracks, puckX: CX, puckY: CY,
      points: graphPoints(info.tracks, Maestro.sound?.containers?.[channel]?._mix?.factors),
      auto: !!_autoTimer, autoWave: curWave, autoSpeed: num("autoSpeed", 6), autoIntensity: num("autoIntensity", 0.7),
      waveOptions: WAVES.map(w => ({ value: w, label: w.charAt(0).toUpperCase() + w.slice(1), selected: w === curWave }))
    };
  },

  /* ----- Auto-stroll: rotate the puck + sine-wave its radius ----- */

  autoActive() { return !!_autoTimer; },

  /**
   * Start the auto-stroll on a channel (wave/speed/intensity read live from settings).
   * The puck rotates around the circle while its radius rides the chosen waveform,
   * oscillating around the 0.5 midpoint (halfway between centre and rim). `intensity`
   * is the deviation from 0.5 (0 = stay on the midpoint ring, 0.5 = full centre↔rim
   * swing); `speed` drives both the rotation and the wave's cadence.
   */
  startAuto(channel) {
    if (_autoTimer) return;
    _autoT = 0; _autoAngle = -Math.PI / 2;
    const dt = 0.18; let n = 0;
    const tick = () => {
      const wave = game.settings.get(MODULE_ID, "autoWave") || "sine";
      const speed = Math.max(0.2, Number(game.settings.get(MODULE_ID, "autoSpeed")) || 6);
      const pos = Math.max(0, Math.min(1, Number(game.settings.get(MODULE_ID, "autoIntensity")) ?? 0.7));
      const intensity = 0.5 * Math.pow(pos, 2.5);                               // exponential slider: fine at the low end, ramps up high
      _autoT += dt; _autoAngle += (speed * 0.017) * dt;                         // rotation around the circle (very gentle)
      const r = Math.max(0.02, Math.min(1, 0.5 + intensity * waveform(wave, _autoT * speed * 0.0135)));
      this.applyMix(channel, r, _autoAngle);
      if ((n++ % 3) === 0) this.broadcast(channel);       // sync players ~every 0.5s
      movePucks(r, _autoAngle);
    };
    _autoTimer = setInterval(tick, 180);
    tick();
  },

  stopAuto() { if (_autoTimer) { clearInterval(_autoTimer); _autoTimer = null; } },

  toggleAuto(channel, rerender) { if (_autoTimer) this.stopAuto(); else this.startAuto(channel); if (rerender) rerender(); },

  /** Wire pointer interaction (puck drag, node mute/reorder, reset, shuffle) onto an .mm-svg inside rootEl. */
  wire(rootEl, channel, rerender) {
    const { CX, CY, R, VBW, VBH } = GEOM;
    const svg = rootEl.querySelector(".mm-svg");
    const puck = svg?.querySelector(".mm-puck");
    if (!svg || !puck) return;
    const toSvg = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * VBW, y: (ev.clientY - r.top) / r.height * VBH }; };
    const clamp = (x, y) => { const dx = x - CX, dy = y - CY, d = Math.hypot(dx, dy); return d <= R ? { x, y } : { x: CX + dx / d * R, y: CY + dy / d * R }; };
    let dragging = false, bc = null;
    const update = (x, y) => {
      puck.setAttribute("cx", x.toFixed(1)); puck.setAttribute("cy", y.toFixed(1));
      const pr = Math.min(1, Math.hypot(x - CX, y - CY) / R), pa = Math.atan2(y - CY, x - CX);
      this.applyMix(channel, pr, pa);
      clearTimeout(bc); bc = setTimeout(() => this.broadcast(channel), 120);
    };
    const onMove = ev => { if (dragging) { const p = clamp(...Object.values(toSvg(ev))); update(p.x, p.y); } };
    const onUp = () => { dragging = false; window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); this.broadcast(channel); };
    svg.addEventListener("pointerdown", ev => {
      const g = ev.target.closest?.(".mm-anchor");
      if (g) {                                  // node: click = mute, drag = reorder
        ev.stopPropagation();
        const id = g.dataset.id, x0 = +g.dataset.x, y0 = +g.dataset.y, start = toSvg(ev);
        let moved = false;
        const aMove = e2 => { const p = toSvg(e2); if (!moved && Math.hypot(p.x - start.x, p.y - start.y) > 6) moved = true; if (moved) g.setAttribute("transform", `translate(${(p.x - x0).toFixed(1)},${(p.y - y0).toFixed(1)})`); };
        const aUp = e2 => {
          window.removeEventListener("pointermove", aMove); window.removeEventListener("pointerup", aUp);
          if (!moved) { this.toggleMute(channel, id).then(rerender); return; }
          const p = toSvg(e2);
          this.reorderTrack(channel, id, Math.atan2(p.y - CY, p.x - CX)).then(rerender);
        };
        window.addEventListener("pointermove", aMove); window.addEventListener("pointerup", aUp);
        return;
      }
      dragging = true; const s = toSvg(ev), p = clamp(s.x, s.y); update(p.x, p.y);
      window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
    });
    rootEl.querySelector("[data-reset]")?.addEventListener("click", () => { this.reset(channel); puck.setAttribute("cx", CX); puck.setAttribute("cy", CY); });
    rootEl.querySelector("[data-shuffle]")?.addEventListener("click", () => this.shuffleOrder(channel).then(rerender));
    rootEl.querySelector("[data-auto]")?.addEventListener("click", () => this.toggleAuto(channel, rerender));
    rootEl.querySelector('[name="auto-wave"]')?.addEventListener("change", e => game.settings.set(MODULE_ID, "autoWave", e.target.value));
    for (const [sel, key] of [['[name="auto-speed"]', "autoSpeed"], ['[name="auto-intensity"]', "autoIntensity"]]) {
      rootEl.querySelector(sel)?.addEventListener("input", e => game.settings.set(MODULE_ID, key, Number(e.target.value)));
    }
  },

  /**
   * Per-track volume factors for a puck at normalized radius `pr` (0..1), angle `pa`.
   *
   * A track is full inside a small angular "plateau" (half the spacing between
   * anchors, so the puck between two adjacent tracks keeps BOTH full); outside it the
   * level falls off, and that falloff sharpens with the puck's radius. So the graph
   * morphs from a full circle (centre → every track at base) to a tight spike toward
   * the puck (rim → only the nearest one, or two if it sits between them, at full;
   * everything else toward 0). No centre floor — far tracks reach 0 well before the rim.
   */
  factors(channel, pr, pa) {
    const info = this.tracksFor(channel);
    if (!info) return null;
    const r = Math.max(0, Math.min(1, pr));
    const n = Math.max(1, info.tracks.length);
    const hw = Math.PI / n;            // plateau half-width = half the angular spacing
    const SHARP = 0.9;                 // higher = tighter solo at the rim
    const f = {};
    for (const t of info.tracks) {
      if (t.muted) { f[t.id] = 0; continue; }
      const fall = r * (SHARP / hw) * Math.max(0, angDist(pa, t.angle) - hw);   // 0 in the plateau; grows outside, scaled by radius
      f[t.id] = Math.max(0, Math.min(1, 1 - fall));
    }
    return { info, f };
  },

  /** Store + apply a factor map to the live layers of a channel (local only). */
  setMix(channel, themeKey, factors) {
    const orch = Maestro.sound?.containers?.[channel];
    if (!orch) return;
    orch._mix = factors ? { theme: themeKey, factors } : null;
    for (const layer of orch.layers) applyLayer(layer, factors ? (factors[layer.id] ?? 1) : 1);
    if (channel === "environment") refreshGraph(channel);   // live intensity graph
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

  /** Shuffle the track order around the circle (persisted per theme, client). */
  async shuffleOrder(channel) {
    const info = this.tracksFor(channel);
    if (!info) return;
    const ids = info.tracks.map(t => t.id);
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    const map = foundry.utils.deepClone(game.settings.get(MODULE_ID, "trackOrder") || {});
    map[info.themeKey] = ids;
    await game.settings.set(MODULE_ID, "trackOrder", map);
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
