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
    return {
      name: musicMeta(music.soundscapeId).name,
      soundscapeId: music.soundscapeId,
      anchors,
      puckX: act?.x ?? CX,
      puckY: act?.y ?? CY
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
    let dragging = false, lastId = null, timer = null;

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
      let best = null, bestD = Infinity;
      for (const a of anchors) {
        const d = Math.hypot(a.x - x, a.y - y);
        const w = Math.max(0, 1 - d / (2 * R));
        a.el.style.opacity = (0.3 + 0.7 * w).toFixed(2);
        if (d < bestD) { bestD = d; best = a; }
      }
      if (best && best.id !== lastId) {
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
