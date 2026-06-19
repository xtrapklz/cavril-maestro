/**
 * Cavril Maestro — Ambience Morpher (pop-out window)
 * A larger radial mixer in its own window, for the AMBIENCE channel only. The
 * view + interaction are shared with the inline Director morpher via
 * MaestroMixer.view / MaestroMixer.wire (same geometry, just bigger here).
 */

import { MaestroMixer } from "./mixer.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const MODULE_ID = "cavril-maestro";
const CHANNEL = "environment";

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
    return MaestroMixer.view(CHANNEL) ?? { empty: true };
  }

  _onRender() {
    MaestroMixer.wire(this.element, CHANNEL, () => { if (this.rendered) this.render(); });
  }
}
