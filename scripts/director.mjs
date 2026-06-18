/**
 * Cavril Maestro — Director panel (v0.6)
 * A searchable, categorised, icon'd picker over Music (soundscapes), Ambience
 * (emberEnvironment arrangements) and Weather, split into three zones (tabs).
 * Supports a list or icon-grid layout and GM-authored custom cue names.
 * Drives everything through the public Maestro.* API, which broadcasts to all
 * players.
 */

import { soundscapes } from "./soundscapes.mjs";
import { CATEGORIES, WEATHER, prettify, ambienceCategory, ambienceIcon, musicMeta, hasTension, moodVariant } from "./meta.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const MODULE_ID = "cavril-maestro";

function orderedGroups(byCat) {
  return Object.keys(CATEGORIES)
    .filter(k => byCat[k]?.length)
    .map(k => ({
      key: k, label: CATEGORIES[k].label, icon: CATEGORIES[k].icon,
      items: byCat[k].sort((a, b) => a.name.localeCompare(b.name))
    }));
}

export class MaestroDirector extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "maestro-director",
    classes: ["maestro-director"],
    window: { title: "Maestro — Music Director", icon: "fa-solid fa-compact-disc", resizable: true },
    position: { width: 420, height: 640 }
  };

  static PARTS = { body: { template: `modules/${MODULE_ID}/templates/director.hbs` } };

  /** @type {string} live search query, preserved across re-renders */
  #search = "";
  /** @type {"music"|"amb"|"weather"} active zone, preserved across re-renders */
  #tab = "music";

  /* ----- singleton ----- */
  static #instance = null;
  static open() {
    MaestroDirector.#instance ??= new MaestroDirector();
    MaestroDirector.#instance.render({ force: true });
    return MaestroDirector.#instance;
  }
  static refresh() {
    if (MaestroDirector.#instance?.rendered) MaestroDirector.#instance.render();
  }

  #channelVolume(channel) {
    const v = Maestro.sound?.channels?.[channel]?.volume;
    return Number.isFinite(v) ? v : 0.8;
  }

  /** Custom GM label for a cue, or "" if none. */
  #cn(kind, id) { return (id && Maestro.customName?.(kind, id)) || ""; }

  async _prepareContext(_options) {
    const cfg = Maestro.sound?.getActiveConfiguration?.() ?? {};
    const music = cfg.music ?? {}, env = cfg.environment ?? {}, weather = cfg.weather ?? {};
    const layout = game.settings.get(MODULE_ID, "gridLayout") ? "grid" : "list";

    // Music grouped by category (custom name overrides the curated one).
    const musicByCat = {};
    for (const s of Object.values(soundscapes)) {
      if (s?.type !== "music") continue;
      const m = musicMeta(s.id);
      const custom = this.#cn("music", s.id);
      (musicByCat[m.cat] ??= []).push({
        id: s.id, base: m.name, name: custom || m.name,
        sub: custom ? m.name : s.id, icon: m.icon, active: s.id === music.soundscapeId
      });
    }

    // Ambience (emberEnvironment arrangements) grouped by category.
    const ambByCat = {};
    for (const arrId of Object.keys(soundscapes.emberEnvironment?.arrangements ?? {})) {
      const base = prettify(arrId);
      const custom = this.#cn("amb", arrId);
      (ambByCat[ambienceCategory(arrId)] ??= []).push({
        id: arrId, base, name: custom || base,
        sub: custom ? base : arrId, icon: ambienceIcon(arrId), active: arrId === env.arrangementId
      });
    }

    // Weather.
    const weatherItems = Object.keys(soundscapes.weather?.arrangements ?? {}).map(id => {
      const base = WEATHER[id] ?? prettify(id);
      const custom = this.#cn("weather", id);
      return { id, base, name: custom || base, active: id === weather.arrangementId };
    });

    const musicGroups = orderedGroups(musicByCat);
    const ambienceGroups = orderedGroups(ambByCat);
    const counts = {
      music: musicGroups.reduce((n, g) => n + g.items.length, 0),
      amb: ambienceGroups.reduce((n, g) => n + g.items.length, 0),
      weather: weatherItems.length
    };

    // Active music soundscape — arrangement select + mood.
    const cur = soundscapes[music.soundscapeId];
    // Scene/section variants only — the Calm/Tension toggle owns the tension ones.
    const arrangements = cur
      ? Object.entries(cur.arrangements ?? {})
          .filter(([id]) => !/tension/i.test(id))
          .map(([id, v]) => ({ id, label: v?.label ?? prettify(id), selected: id === music.arrangementId }))
      : [];
    const onTension = !!music.arrangementId && /tension/i.test(music.arrangementId);

    return {
      ready: !!Maestro.sound,
      assetWarning: !game.settings.get(MODULE_ID, "assetBasePath"),
      search: this.#search,
      layout, layoutList: layout === "list", layoutGrid: layout === "grid",
      tabMusic: this.#tab === "music", tabAmb: this.#tab === "amb", tabWeather: this.#tab === "weather",
      counts,
      musicGroups, ambienceGroups, weatherItems,
      // Music transport
      hasMusic: !!music.soundscapeId,
      nowMusic: music.soundscapeId ? (this.#cn("music", music.soundscapeId) || musicMeta(music.soundscapeId).name) : "—",
      arrangements,
      canTension: cur ? hasTension(cur) : false,
      calmActive: !!music.soundscapeId && !onTension,
      tensionActive: onTension,
      // Ambience transport
      hasAmb: !!env.arrangementId,
      nowAmb: env.arrangementId ? (this.#cn("amb", env.arrangementId) || prettify(env.arrangementId)) : "—",
      // Weather transport
      hasWeather: !!weather.arrangementId,
      nowWeather: weather.arrangementId ? (this.#cn("weather", weather.arrangementId) || WEATHER[weather.arrangementId] || prettify(weather.arrangementId)) : "—",
      musicVolume: this.#channelVolume("music"),
      envVolume: this.#channelVolume("environment")
    };
  }

  _onRender(_context, _options) {
    const el = this.element;
    const on = (sel, evt, fn) => el.querySelector(sel)?.addEventListener(evt, fn);
    const onAll = (sel, evt, fn) => el.querySelectorAll(sel).forEach(n => n.addEventListener(evt, fn));

    // Live search filter (no re-render, so focus/typing is preserved). Scoped to
    // the active zone so the count and headers reflect what you're looking at.
    const applyFilter = () => {
      const q = (el.querySelector('[name="search"]')?.value ?? "").trim().toLowerCase();
      this.#search = q;
      const zone = el.querySelector(".maestro-zone.active") ?? el;
      for (const it of zone.querySelectorAll(".maestro-item")) {
        const hay = `${it.dataset.name ?? ""} ${it.dataset.id ?? ""} ${it.dataset.default ?? ""}`.toLowerCase();
        it.classList.toggle("hidden", !!q && !hay.includes(q));
      }
      for (const grp of zone.querySelectorAll(".grp")) {
        let n = grp.nextElementSibling, any = false;
        while (n && n.classList.contains("maestro-item")) { if (!n.classList.contains("hidden")) { any = true; break; } n = n.nextElementSibling; }
        grp.classList.toggle("hidden", !any);
      }
    };
    on('[name="search"]', "input", applyFilter);

    // Zone tabs — switch without a re-render so search/scroll stay put.
    onAll('[data-tab]', "click", e => {
      this.#tab = e.currentTarget.dataset.tab;
      el.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle("active", b.dataset.tab === this.#tab));
      el.querySelectorAll(".maestro-zone").forEach(z => z.classList.toggle("active", z.dataset.zone === this.#tab));
      applyFilter();
    });

    // Layout toggle (persists per-user; re-render to re-flow the grid).
    onAll('[data-layout]', "click", async e => {
      await game.settings.set(MODULE_ID, "gridLayout", e.currentTarget.dataset.layout === "grid");
      this.render();
    });

    // Rename pencil — opens a prompt; blank reverts to the built-in name.
    onAll('[data-rename]', "click", async e => {
      e.stopPropagation();
      const item = e.currentTarget.closest(".maestro-item");
      if (!item) return;
      const { kind, id, name, default: base } = item.dataset;
      await this.#promptRename(kind, id, name, base);
    });

    // Item clicks (the row is the button now; the pencil stops propagation).
    onAll(".maestro-item", "click", e => {
      const { kind, id } = e.currentTarget.dataset;
      if (kind === "music") Maestro.play(id, { channel: "music" });
      else if (kind === "amb") Maestro.play("emberEnvironment", { channel: "environment", arrangementId: id });
      else if (kind === "weather") Maestro.play("weather", { channel: "weather", arrangementId: id });
      this.render();
    });
    // Keyboard activation for the role="button" rows.
    onAll(".maestro-item", "keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.click(); }
    });

    // Music controls
    on('[name="music-arrangement"]', "change", e => {
      const id = Maestro.sound?.getActiveConfiguration?.().music?.soundscapeId;
      if (id) Maestro.play(id, { channel: "music", arrangementId: e.target.value });
    });
    onAll('[data-mood]', "click", e => {
      const mood = e.currentTarget.dataset.mood;
      const m = Maestro.sound?.getActiveConfiguration?.().music ?? {};
      if (!m.soundscapeId) return;
      const target = moodVariant(soundscapes[m.soundscapeId], m.arrangementId, mood);
      if (target) Maestro.play(m.soundscapeId, { channel: "music", arrangementId: target });
      this.render();
    });
    on('[data-reroll]', "click", () => Maestro.rearrange("music"));
    on('[data-morph]', "click", () => Maestro.openMorph?.());

    // Stops
    onAll('[data-stop]', "click", e => { Maestro.stop(e.currentTarget.dataset.stop); this.render(); });
    on('[data-stopall]', "click", async () => { for (const c of Maestro.CONST.CHANNELS) await Maestro.stop(c); this.render(); });

    // Volumes
    on('[name="music-volume"]', "change", e => this.#setVolume("music", e.target.value));
    on('[name="environment-volume"]', "change", e => this.#setVolume("environment", e.target.value));

    applyFilter(); // re-apply preserved search after a re-render
  }

  /** Prompt for a new label for a cue and persist it (blank reverts to default). */
  async #promptRename(kind, id, current, base) {
    const DialogV2 = foundry.applications?.api?.DialogV2;
    const esc = s => String(s ?? "").replace(/"/g, "&quot;");
    let next = null;
    if (DialogV2?.prompt) {
      next = await DialogV2.prompt({
        window: { title: `Rename — ${base ?? id}`, icon: "fa-solid fa-pen" },
        content: `<p style="margin:.25rem 0 .5rem;opacity:.75">Custom name for <b>${esc(base ?? id)}</b>. Leave blank to use the built-in name.</p>`
               + `<input type="text" name="nm" value="${esc(current)}" placeholder="${esc(base ?? id)}" style="width:100%">`,
        ok: { label: "Save", icon: "fa-solid fa-check", callback: (_ev, btn) => btn.form.elements.nm.value },
        rejectClose: false
      }).catch(() => null);
    } else {
      next = window.prompt(`Custom name for "${base ?? id}" (blank = default):`, current ?? "");
    }
    if (next === null || next === undefined) return; // cancelled
    await Maestro.setCustomName(kind, id, next); // onChange → refresh()
  }

  async #setVolume(channel, value) {
    const sound = Maestro.sound?.channels?.[channel];
    if (sound) await sound.update({ volume: Number(value) });
  }
}
