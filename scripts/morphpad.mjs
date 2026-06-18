/**
 * Cavril Maestro — Morph Pad (v0.4)
 * A radial pad: the active music soundscape's arrangements are placed as anchors
 * around a circle; dragging the puck crossfades toward the nearest arrangement.
 * Because adjacent arrangements share a layer bed, the engine's crossfade morphs
 * the timbre smoothly. While the pad is open we drop the orchestration's
 * transition delay so switches feel live.
 */

import { soundscapes } from "./soundscapes.mjs";
import { prettify, musicMeta } from "./meta.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const MODULE_ID = "cavril-maestro";

const CX = 150, CY = 150, R = 110;     // SVG geometry (viewBox 0 0 300 300)
const FAST_DELAY = 250;                 // ms transition while the pad is open
const DEFAULT_DELAY = 2000;             // engine default to restore on close

export class MaestroMorphPad extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "maestro-morph",
    classes: ["maestro-morph"],
    window: { title: "Maestro — Morph Pad", icon: "fa-solid fa-circle-nodes", resizable: false },
    position: { width: 340, height: "auto" }
  };

  static PARTS = { body: { template: `modules/${MODULE_ID}/templates/morphpad.hbs` } };

  static #instance = null;
  static open() {
    MaestroMorphPad.#instance ??= new MaestroMorphPad();
    const c = Maestro.sound?.containers?.music;       // make switches feel live while open
    if (c) c.transitionDelay = FAST_DELAY;
    MaestroMorphPad.#instance.render({ force: true });
    return MaestroMorphPad.#instance;
  }

  _onClose(options) {
    const c = Maestro.sound?.containers?.music;
    if (c) c.transitionDelay = DEFAULT_DELAY;
    super._onClose?.(options);
  }

  async _prepareContext(_options) {
    const music = Maestro.sound?.getActiveConfiguration?.().music ?? {};
    const ss = soundscapes[music.soundscapeId];
    if (!ss) return { empty: true };

    const ids = Object.keys(ss.arrangements ?? {});
    const n = Math.max(1, ids.length);
    const anchors = ids.map((id, i) => {
      const a = (-Math.PI / 2) + i * (2 * Math.PI / n);
      return {
        id,
        label: prettify(id),
        x: +(CX + R * Math.cos(a)).toFixed(1),
        y: +(CY + R * Math.sin(a)).toFixed(1),
        active: id === music.arrangementId
      };
    });
    const act = anchors.find(a => a.active);
    const vol = Math.max(0, Math.min(1, Maestro.sound?.channels?.music?.volume ?? 1));
    let puckX = CX, puckY = CY;     // centre = silent; place puck along the active anchor at current volume
    if (act) {
      const ang = Math.atan2(act.y - CY, act.x - CX);
      puckX = +(CX + Math.cos(ang) * R * vol).toFixed(1);
      puckY = +(CY + Math.sin(ang) * R * vol).toFixed(1);
    }
    return {
      name: musicMeta(music.soundscapeId).name,
      soundscapeId: music.soundscapeId,
      anchors,
      puckX, puckY
    };
  }

  _onRender(_context, _options) {
    const el = this.element;
    const svg = el.querySelector(".mp-svg");
    if (!svg) return;
    const puck = svg.querySelector(".mp-puck");
    const anchors = [...svg.querySelectorAll(".mp-anchor")].map(g => ({
      el: g, id: g.dataset.id, x: +g.dataset.x, y: +g.dataset.y
    }));
    const soundscapeId = svg.dataset.soundscape;
    let dragging = false, lastId = null, timer = null, lastVol = null;

    const toSvg = ev => {
      const rect = svg.getBoundingClientRect();
      return {
        x: (ev.clientX - rect.left) / rect.width * 300,
        y: (ev.clientY - rect.top) / rect.height * 300
      };
    };
    const clamp = (x, y) => {
      const dx = x - CX, dy = y - CY, d = Math.hypot(dx, dy);
      return d <= R ? { x, y } : { x: CX + dx / d * R, y: CY + dy / d * R };
    };
    const update = (x, y) => {
      puck.setAttribute("cx", x.toFixed(1));
      puck.setAttribute("cy", y.toFixed(1));
      const dx = x - CX, dy = y - CY;
      const r = Math.min(1, Math.hypot(dx, dy) / R);     // radius → volume (0 centre, 1 edge)
      lastVol = r;
      const c = Maestro.sound?.containers?.music;
      if (c) c.volume = r;                                // live gain — no document write mid-drag
      // Nearest arrangement by ANGLE, so circling the rim swaps arrangements.
      const pa = Math.atan2(dy, dx);
      let best = null, bestD = Infinity;
      for (const a of anchors) {
        const aa = Math.atan2(a.y - CY, a.x - CX);
        let d = Math.abs(pa - aa); if (d > Math.PI) d = (2 * Math.PI) - d;
        a.el.style.opacity = (0.3 + 0.7 * Math.max(0, 1 - d / Math.PI) * (0.4 + 0.6 * r)).toFixed(2);
        if (d < bestD) { bestD = d; best = a; }
      }
      if (r > 0.12 && best && best.id !== lastId) {       // ignore angle near the silent centre
        lastId = best.id;
        anchors.forEach(a => a.el.classList.toggle("active", a === best));
        clearTimeout(timer);
        timer = setTimeout(() => Maestro.play(soundscapeId, { channel: "music", arrangementId: best.id }), 120);
      }
    };
    const onMove = ev => { if (dragging) { const p = clamp(...Object.values(toSvg(ev))); update(p.x, p.y); } };
    const onUp = () => {
      dragging = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      // Persist the chosen volume to the channel so it sticks and syncs to players.
      if (lastVol != null) Maestro.sound?.channels?.music?.update({ volume: lastVol })?.catch?.(() => {});
    };
    svg.addEventListener("pointerdown", ev => {
      dragging = true;
      const s = toSvg(ev), p = clamp(s.x, s.y);
      update(p.x, p.y);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  }
}
