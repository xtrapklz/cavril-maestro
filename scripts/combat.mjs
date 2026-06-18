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
 *   the music: 20 goblins (CR 1/4) score 20·(0.25+1)=25, beating a lone CR 10
 *   boss at 11. A genuinely deadly boss (high CR) dominates. The weight is
 *   tunable via the "Combat Horde Weight" setting (0 = pure CR sum).
 *
 *   The theme is chosen ONCE, when combat begins — no live re-picking as
 *   monsters fall. When combat ends the music fades out gracefully and an
 *   optional end sting (the "Combat End Sound" setting) plays.
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

  /** Combat began — choose a theme from the field, once. */
  onCombatStart(combat) {
    if (!game.user?.isGM || !enabled() || _active) return;
    _active = true;
    _current = null;
    const ss = chooseSoundscape(combat ?? game.combat);
    if (!ss) return;                       // nothing recognisable → stay armed, leave music
    _current = ss;
    Maestro.play(ss, { channel: "music" });
  },

  /** Combat ended — play the optional end sting, then fade our combat music out. */
  async onCombatEnd() {
    if (!_active) return;
    const startedMusic = !!_current;       // did we actually take over the music?
    _active = false;
    _current = null;
    if (!game.user?.isGM) return;
    const sfx = String(game.settings.get(MODULE_ID, "combatEndSound") || "").trim();
    if (sfx) { try { await Maestro.playOneShot(sfx); } catch (_e) { /* ignore */ } }
    // Only fade the music if we were the ones driving it (don't touch the GM's
    // own track when no combat theme was chosen).
    if (startedMusic) { try { await Maestro.fadeOutChannel("music"); } catch (_e) { try { await Maestro.stop("music"); } catch (_e2) { /* ignore */ } } }
  },

  /**
   * Register the Foundry hooks that drive auto-combat-music. Called once on
   * ready. GM-gated; no-op unless the feature is enabled. The theme is picked
   * only at combat start — no live re-picking.
   */
  installHooks() {
    Hooks.on("combatStart", combat => { try { this.onCombatStart(combat); } catch (e) { console.warn(`${MODULE_ID} | combatStart skipped:`, e); } });
    // Fallback: some flows set started without firing combatStart.
    Hooks.on("updateCombat", combat => {
      if (combat?.started && !_active) { try { this.onCombatStart(combat); } catch (_e) { /* ignore */ } }
    });
    Hooks.on("deleteCombat", () => { try { this.onCombatEnd(); } catch (e) { console.warn(`${MODULE_ID} | deleteCombat skipped:`, e); } });
  }
};
