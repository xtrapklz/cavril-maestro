/**
 * Cavril Maestro — Ambience Morpher (pop-out window)
 * A larger radial mixer in its own window, for the AMBIENCE channel only.
 * Nodes are big, labelled with the track name, and carry a best-guess icon so
 * each stem is easy to spot. Same mixer behaviour as before (centre = full mix,
 * rim = solo 1–2; click a node to mute; drag a node to re-order). Drives the
 * shared MaestroMixer on the "environment" channel.
 */

import { MaestroMixer } from "./mixer.mjs";
import { prettify, trackIcon, ambienceMeta } from "./meta.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const MODULE_ID = "cavril-maestro";
const CHANNEL = "environment";
// Wide viewBox so the radial track labels at 3 & 9 o'clock have room and don't clip.
const VBW = 440, VBH = 360;
const CX = 220, CY = 172, R = 118;

export class MaestroMorphWindow extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "maestro-morph",
    classes: ["maestro-morph"],
    window: { title: "Maestro — Ambience Mixer", icon: "fa-solid fa-circle-nodes", resizable: true },
    position: { width: 520, height: "auto" }
  };
  static PARTS = { body: { template: `modules/${MODULE_ID}/templates/morphwindow.hbs` } };

  static #instance = null;
  static open() {
    MaestroMorphWindow.#instance ??= new MaestroMorphWindow();
    MaestroMorphWindow.#instance.render({ force: true });
    return MaestroMorphWindow.#instance;
  }
  static refresh() { if (MaestroMorphWindow.#instance?.rendered) MaestroMorphWindow.#instance.render(); }

  async _prepareContext() {
    const info = MaestroMixer.tracksFor(CHANNEL);
    if (!info) return { empty: true };
    const tracks = info.tracks.map(t => {
      const x = CX + R * Math.cos(t.angle), y = CY + R * Math.sin(t.angle);
      const lx = CX + (R + 13) * Math.cos(t.angle), ly = CY + (R + 13) * Math.sin(t.angle);
      const c = Math.cos(t.angle);
      return {
        id: t.id, label: prettify(t.id), icon: trackIcon(t.id), muted: t.muted,
        x: +x.toFixed(1), y: +y.toFixed(1), ix: +(x - 11).toFixed(1), iy: +(y - 11).toFixed(1),
        lx: +lx.toFixed(1), ly: +(ly + 3).toFixed(1),
        anchor: c < -0.3 ? "end" : (c > 0.3 ? "start" : "middle")
      };
    });
    return { name: ambienceMeta(info.arrangementId).name, tracks, puckX: CX, puckY: CY };
  }

  _onRender() {
    const el = this.element;
    const svg = el.querySelector(".mm-svg");
    const puck = svg?.querySelector(".mm-puck");
    if (!svg || !puck) return;
    const toSvg = ev => { const r = svg.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * VBW, y: (ev.clientY - r.top) / r.height * VBH }; };
    const clamp = (x, y) => { const dx = x - CX, dy = y - CY, d = Math.hypot(dx, dy); return d <= R ? { x, y } : { x: CX + dx / d * R, y: CY + dy / d * R }; };
    let dragging = false, bc = null;
    const update = (x, y) => {
      puck.setAttribute("cx", x.toFixed(1)); puck.setAttribute("cy", y.toFixed(1));
      const pr = Math.min(1, Math.hypot(x - CX, y - CY) / R), pa = Math.atan2(y - CY, x - CX);
      MaestroMixer.applyMix(CHANNEL, pr, pa);
      clearTimeout(bc); bc = setTimeout(() => MaestroMixer.broadcast(CHANNEL), 120);
    };
    const onMove = ev => { if (dragging) { const p = clamp(...Object.values(toSvg(ev))); update(p.x, p.y); } };
    const onUp = () => { dragging = false; window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); MaestroMixer.broadcast(CHANNEL); };

    svg.addEventListener("pointerdown", ev => {
      const g = ev.target.closest?.(".mm-anchor");
      if (g) {                                  // node: click = mute, drag = reorder
        ev.stopPropagation();
        const id = g.dataset.id, x0 = +g.dataset.x, y0 = +g.dataset.y, start = toSvg(ev);
        let moved = false;
        const aMove = e2 => { const p = toSvg(e2); if (!moved && Math.hypot(p.x - start.x, p.y - start.y) > 6) moved = true; if (moved) g.setAttribute("transform", `translate(${(p.x - x0).toFixed(1)},${(p.y - y0).toFixed(1)})`); };
        const aUp = e2 => {
          window.removeEventListener("pointermove", aMove); window.removeEventListener("pointerup", aUp);
          if (!moved) { MaestroMixer.toggleMute(CHANNEL, id).then(() => this.render()); return; }
          const p = toSvg(e2);
          MaestroMixer.reorderTrack(CHANNEL, id, Math.atan2(p.y - CY, p.x - CX)).then(() => this.render());
        };
        window.addEventListener("pointermove", aMove); window.addEventListener("pointerup", aUp);
        return;
      }
      dragging = true; const s = toSvg(ev), p = clamp(s.x, s.y); update(p.x, p.y);
      window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
    });

    el.querySelector("[data-reset]")?.addEventListener("click", () => { MaestroMixer.reset(CHANNEL); puck.setAttribute("cx", CX); puck.setAttribute("cy", CY); });
    el.querySelector("[data-shuffle]")?.addEventListener("click", () => MaestroMixer.shuffleOrder(CHANNEL).then(() => this.render()));
  }
}
