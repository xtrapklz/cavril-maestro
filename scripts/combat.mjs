/**
 * Cavril Maestro — Auto Combat Music
 * ------------------------------------------------------------------
 * When a combat encounter begins (and the feature is enabled), pick a combat
 * soundscape from the monsters on the field, and re-pick as they fall.
 *
 * Selection math
 *   For every living, non-friendly NPC combatant we read its creature TYPE and
 *   challenge rating. Each body contributes  (CR + hordeWeight)  to a running
 *   score for the combat THEME its type maps to (aberration & dragon share one
 *   theme, etc). The highest-scoring theme wins and plays.
 *
 *   The flat per-body `hordeWeight` is what lets a swarm of low-CR minions own
 *   the music while they're numerous: 20 goblins (CR 1/4) score 20·(0.25+1)=25,
 *   beating a lone CR 10 boss at 11 — until the goblins thin out, at which point
 *   the boss's score overtakes and the music shifts to its theme. A genuinely
 *   deadly boss (high CR) dominates from the start, as it should. The weight is
 *   tunable via the "Combat Horde Weight" setting (0 = pure CR sum).
 *
 *   Recompute fires on every event that can change who's alive: combatant
 *   add/remove/defeat, turn/round changes, and HP edits to a combatant's actor.
 * ------------------------------------------------------------------
 */

import { soundscapes } from "./soundscapes.mjs";

const MODULE_ID = "cavril-maestro";

/** D&D 5e creature type → combat soundscape id. */
const TYPE_MUSIC = {
  aberration:  "mutagenicCombat",   // Aberrant / Dragon theme
  beast:       "beastCombat",
  celestial:   "celestialCombat",
  construct:   "constructCombat",
  dragon:      "mutagenicCombat",
  elemental:   "elementalCombat",
  fey:         "illusoryCombat",    // Fey / Illusory theme
  fiend:       "abyssalCombat",     // Abyssal / Demonic theme
  giant:       "raiderCombat",
  humanoid:    "pirateCombat",      // Pirate / Bandit theme — generic humanoid foe
  monstrosity: "monstrosityCombat",
  ooze:        "oozeCombat",
  plant:       "monstrosityCombat", // no dedicated plant theme
  undead:      "undeadCombat"
};

/* Internal state for the active auto-combat session. */
let _active = false;          // are we currently driving the music?
let _current = null;          // soundscape id we last set
let _saved = null;            // {soundscapeId, arrangementId} to restore afterwards

const enabled = () => {
  try { return !!game.settings.get(MODULE_ID, "autoCombatMusic"); }
  catch (_e) { return false; }
};

const FRIENDLY = 1;           // CONST.TOKEN_DISPOSITIONS.FRIENDLY

/** 5e creature type for an actor (value, or a custom string), lowercased. */
function creatureType(actor) {
  const t = actor?.system?.details?.type;
  const v = (typeof t === "string" ? t : (t?.value || t?.custom)) || "";
  return String(v).toLowerCase().trim();
}

/** Numeric challenge rating, 0 if absent/unparseable. */
function crOf(actor) {
  const cr = actor?.system?.details?.cr;
  const n = Number(cr);
  return Number.isFinite(n) ? n : 0;
}

/** Living, non-friendly NPC combatants of the active combat. */
function monsters(combat) {
  const out = [];
  for (const c of combat?.combatants ?? []) {
    const a = c.actor;
    if (!a || a.type !== "npc") continue;            // dnd5e: monsters are "npc"
    if (c.isDefeated) continue;                       // skull-marked
    const hp = a.system?.attributes?.hp?.value;
    if (Number.isFinite(hp) && hp <= 0) continue;     // dropped
    const disp = c.token?.disposition ?? a.prototypeToken?.disposition;
    if (disp === FRIENDLY) continue;                  // allied NPCs don't count
    const type = creatureType(a);
    if (!type || !TYPE_MUSIC[type]) continue;          // unknown type → ignore
    out.push({ type, cr: crOf(a) });
  }
  return out;
}

/** The winning combat soundscape id for the current field, or null. */
function chooseSoundscape(combat) {
  const mobs = monsters(combat);
  if (!mobs.length) return null;
  let w = Number(game.settings.get(MODULE_ID, "combatHordeWeight"));
  if (!Number.isFinite(w)) w = 1;
  const scores = {};
  for (const m of mobs) {
    const ss = TYPE_MUSIC[m.type];
    scores[ss] = (scores[ss] || 0) + m.cr + w;
  }
  let best = null, bestScore = -Infinity;
  for (const [ss, sc] of Object.entries(scores)) {
    if (soundscapes[ss] && sc > bestScore) { bestScore = sc; best = ss; }
  }
  return best;
}

export const MaestroCombat = {
  TYPE_MUSIC,
  get active() { return _active; },

  /** Combat began — remember current music, then choose a theme. */
  onCombatStart(combat) {
    if (!game.user?.isGM || !enabled() || _active) return;
    const cur = Maestro.sound?.getActiveConfiguration?.().music ?? {};
    _saved = { soundscapeId: cur.soundscapeId ?? null, arrangementId: cur.arrangementId ?? null };
    _active = true;
    _current = null;
    this.recompute(combat, true);
  },

  /** Re-evaluate the field and switch the combat theme if the leader changed. */
  recompute(combat, force = false) {
    if (!_active || !game.user?.isGM || !enabled()) return;
    const ss = chooseSoundscape(combat ?? game.combat);
    if (!ss) return;                       // nothing recognisable → leave music as-is
    if (ss === _current && !force) return;
    _current = ss;
    Maestro.play(ss, { channel: "music" });
  },

  /** Combat ended — restore whatever was playing before (or stop). */
  async onCombatEnd() {
    if (!_active) return;
    _active = false;
    _current = null;
    if (!game.user?.isGM) return;
    const s = _saved; _saved = null;
    if (s?.soundscapeId) Maestro.play(s.soundscapeId, { channel: "music", arrangementId: s.arrangementId });
    else await Maestro.stop("music");
  },

  /**
   * Register the Foundry hooks that drive auto-combat-music. Called once on
   * ready. All handlers are GM-gated and no-op unless the feature is enabled.
   */
  installHooks() {
    let timer = null;
    const recompute = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try { this.recompute(game.combat); }
        catch (e) { console.warn(`${MODULE_ID} | combat recompute skipped:`, e); }
      }, 250);
    };

    Hooks.on("combatStart", combat => { try { this.onCombatStart(combat); } catch (e) { console.warn(`${MODULE_ID} | combatStart skipped:`, e); } });
    // Fallback: some flows set started without firing combatStart.
    Hooks.on("updateCombat", combat => {
      if (combat?.started && !_active) { try { this.onCombatStart(combat); } catch (_e) {} }
    });
    Hooks.on("deleteCombat", () => { try { this.onCombatEnd(); } catch (e) { console.warn(`${MODULE_ID} | deleteCombat skipped:`, e); } });

    for (const h of ["createCombatant", "updateCombatant", "deleteCombatant", "combatTurn", "combatRound"]) {
      Hooks.on(h, () => recompute());
    }
    // A monster being damaged to 0 should retrigger selection.
    Hooks.on("updateActor", actor => { if (_active && actor?.inCombat) recompute(); });
    Hooks.on("updateToken", (_doc, change) => { if (_active && change && ("actorData" in change || "delta" in change)) recompute(); });
  }
};
