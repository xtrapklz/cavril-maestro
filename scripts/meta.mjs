/**
 * Cavril Maestro — display metadata (names, categories, icons).
 * A presentation layer over the raw soundscape ids. The engine keeps using the
 * real ids and file paths; this only changes what the Director shows.
 *
 *  - Music soundscapes get curated generic names + category + icon (CURATED).
 *  - The 110 ambience arrangements + 6 weather states are auto-named from their
 *    ids (prettify) and categorised by keyword (ambienceCategory / ambienceIcon).
 *  - Original Ember ids are shown as subtitles in the UI.
 */

/* ---- Categories (label + FontAwesome icon) ---- */
export const CATEGORIES = {
  combat:     { label: "Combat",            icon: "fa-solid fa-burst" },
  settlement: { label: "Towns & Settlements", icon: "fa-solid fa-city" },
  wild:       { label: "Wilderness",        icon: "fa-solid fa-tree" },
  coast:      { label: "Coast & Sea",       icon: "fa-solid fa-water" },
  dungeon:    { label: "Caves & Dungeons",  icon: "fa-solid fa-dungeon" },
  sacred:     { label: "Sacred & Arcane",   icon: "fa-solid fa-wand-magic-sparkles" },
  folk:       { label: "Folk & Social",     icon: "fa-solid fa-masks-theater" },
  theme:      { label: "Themes & Moods",    icon: "fa-solid fa-compact-disc" },
  weather:    { label: "Weather",           icon: "fa-solid fa-cloud-bolt" },
  ambience:   { label: "Ambience",          icon: "fa-solid fa-wind" }
};

/* ---- Curated metadata for the 38 music soundscapes ---- */
export const MUSIC = {
  abyssalCombat:      { name: "Abyssal / Demonic Combat", cat: "combat", icon: "fa-solid fa-fire-flame-curved" },
  beastCombat:        { name: "Beast Combat",             cat: "combat", icon: "fa-solid fa-paw" },
  celestialCombat:    { name: "Celestial Combat",         cat: "combat", icon: "fa-solid fa-sun" },
  constructCombat:    { name: "Construct Combat",         cat: "combat", icon: "fa-solid fa-gears" },
  elementalCombat:    { name: "Elemental Combat",         cat: "combat", icon: "fa-solid fa-bolt" },
  illusoryCombat:     { name: "Fey / Illusory Combat",    cat: "combat", icon: "fa-solid fa-wand-sparkles" },
  monstrosityCombat:  { name: "Monstrosity Combat",       cat: "combat", icon: "fa-solid fa-spaghetti-monster-flying" },
  mutagenicCombat:    { name: "Aberrant / Dragon Combat", cat: "combat", icon: "fa-solid fa-dragon" },
  oozeCombat:         { name: "Ooze Combat",              cat: "combat", icon: "fa-solid fa-droplet" },
  pirateCombat:       { name: "Pirate / Bandit Combat",   cat: "combat", icon: "fa-solid fa-skull-crossbones" },
  raiderCombat:       { name: "Raider Combat",            cat: "combat", icon: "fa-solid fa-shield-halved" },
  undeadCombat:       { name: "Undead Combat",            cat: "combat", icon: "fa-solid fa-skull" },

  arcturianTown:      { name: "Large City",               cat: "settlement", icon: "fa-solid fa-city" },
  ordain:             { name: "Coastal Town",             cat: "settlement", icon: "fa-solid fa-anchor" },
  gravensRestMusic:   { name: "Somber Town",              cat: "settlement", icon: "fa-solid fa-place-of-worship" },
  seawall:            { name: "Coastal Fortress",         cat: "settlement", icon: "fa-solid fa-water" },
  houseBastilla:      { name: "Noble Manor",              cat: "settlement", icon: "fa-solid fa-chess-rook" },
  marlstoneGala:      { name: "Grand Gala / Ballroom",    cat: "settlement", icon: "fa-solid fa-champagne-glasses" },
  aedirTheme:         { name: "Frontier Garrison",        cat: "settlement", icon: "fa-solid fa-tower-observation" },

  arctusPlateauMusic: { name: "Plateau & Plains",         cat: "wild", icon: "fa-solid fa-mountain-sun" },
  forestOfStoneExploration: { name: "Petrified Forest",   cat: "wild", icon: "fa-solid fa-tree" },
  kadisosExploration: { name: "Mountain Wilds",           cat: "wild", icon: "fa-solid fa-mountain" },

  ancientRuins:       { name: "Ancient Ruins",            cat: "dungeon", icon: "fa-solid fa-archway" },
  mysticalDungeon:    { name: "Mystical Dungeon",         cat: "dungeon", icon: "fa-solid fa-dungeon" },
  pitTrap:            { name: "Danger / Trap",            cat: "dungeon", icon: "fa-solid fa-triangle-exclamation" },

  arcaneTheme:        { name: "Arcane / Magical",         cat: "sacred", icon: "fa-solid fa-hat-wizard" },
  templeCindaric:     { name: "Fire Temple",              cat: "sacred", icon: "fa-solid fa-fire" },
  templeWater:        { name: "Water Shrine",             cat: "sacred", icon: "fa-solid fa-place-of-worship" },
  cosmosMusic:        { name: "Cosmic / Astral",          cat: "sacred", icon: "fa-solid fa-meteor" },

  arcturianFolk:      { name: "Folk Festival",            cat: "folk", icon: "fa-solid fa-people-group" },
  ordaniFolk:         { name: "Rustic Folk",              cat: "folk", icon: "fa-solid fa-guitar" },
  bardTroupe:         { name: "Bard / Tavern",            cat: "folk", icon: "fa-solid fa-mug-hot" },
  solemnFolk:         { name: "Funeral / Mourning",       cat: "folk", icon: "fa-solid fa-dove" },

  ankaristTheme:      { name: "Ominous Theme",            cat: "theme", icon: "fa-solid fa-eye" },
  lylaTheme:          { name: "Wistful Theme",            cat: "theme", icon: "fa-solid fa-feather" },
  sinTheme:           { name: "Whimsical Theme",          cat: "theme", icon: "fa-solid fa-wand-sparkles" },
  seydiriTheme:       { name: "Sunken Depths",            cat: "theme", icon: "fa-solid fa-water-ladder" },
  innerRealmsMusic:   { name: "Ethereal / Dreamlike",     cat: "theme", icon: "fa-solid fa-cloud-moon" }
};

/* ---- Weather states ---- */
export const WEATHER = {
  clear:      "Clear",
  rainLight:  "Light Rain",
  rainNormal: "Rain",
  rainStorm:  "Thunderstorm",
  arcaneFog:  "Arcane Fog",
  mayisStorm: "Magical Storm"
};

/* ---- Curated generic names for the ambience THEMES ----
 * Keyed by the day/night-stripped base id (so each theme is one entry; the
 * actual day/night arrangement is chosen by the clock). Names are concise,
 * content-based descriptions inferred from the sounds each theme is built from
 * — the lore names (Ordain, Arcturel, Yakoshta…) are dropped in favour of what
 * the place actually *is*. The original Ember label is shown as a subtitle. */
export const AMBIENCE = {
  campVista:               { name: "Wilderness Camp",       cat: "wild",       icon: "fa-solid fa-campground" },
  bluffs:                  { name: "Windswept Sea Cliffs",  cat: "coast",      icon: "fa-solid fa-water" },
  cauldron:                { name: "Bubbling Pools",         cat: "coast",      icon: "fa-solid fa-droplet" },
  jungle:                  { name: "Jungle",                 cat: "wild",       icon: "fa-solid fa-leaf" },
  mountains:               { name: "Mountains",              cat: "wild",       icon: "fa-solid fa-mountain" },
  ocean:                   { name: "Open Ocean",             cat: "coast",      icon: "fa-solid fa-water" },
  oceanShip:               { name: "Ship at Sea",            cat: "coast",      icon: "fa-solid fa-ship" },
  tidalPools:              { name: "Tide Pools",             cat: "coast",      icon: "fa-solid fa-water" },
  teeth:                   { name: "Jagged Coastline",       cat: "coast",      icon: "fa-solid fa-water" },
  gravensRest:             { name: "Quiet Harbor Town",      cat: "settlement", icon: "fa-solid fa-anchor" },
  raiderHideout:           { name: "Cliffside Hideout",      cat: "coast",      icon: "fa-solid fa-skull-crossbones" },
  sunkenRejarh:            { name: "Sunken Ruins",           cat: "coast",      icon: "fa-solid fa-water-ladder" },
  ancientRuins:            { name: "Ancient Ruins",          cat: "dungeon",    icon: "fa-solid fa-archway" },
  ancientRuinsMagicDepths: { name: "Ancient Ruins — Deep",   cat: "dungeon",    icon: "fa-solid fa-archway" },
  bloodletterCave:         { name: "Bat-Infested Cave",      cat: "dungeon",    icon: "fa-solid fa-dungeon" },
  shipwreck:               { name: "Shipwreck Shore",        cat: "coast",      icon: "fa-solid fa-water" },
  noxiousCave:             { name: "Noxious Cavern",         cat: "dungeon",    icon: "fa-solid fa-dungeon" },
  forestStone:             { name: "Petrified Forest",       cat: "wild",       icon: "fa-solid fa-tree" },
  spires:                  { name: "Stone Spires",           cat: "wild",       icon: "fa-solid fa-mountain" },
  dripstones:              { name: "Dripstone Caves",        cat: "dungeon",    icon: "fa-solid fa-dungeon" },
  Yakoshta:                { name: "Marshland Crags",        cat: "wild",       icon: "fa-solid fa-mountain" },
  shentWaterTemple:        { name: "Water Temple",           cat: "sacred",     icon: "fa-solid fa-place-of-worship" },
  kaleidoscopeCaverns:     { name: "Crystal Caverns",        cat: "dungeon",    icon: "fa-solid fa-gem" },
  kaleidoscopeGrave:       { name: "Crystal Tomb",           cat: "dungeon",    icon: "fa-solid fa-gem" },
  helkas:                  { name: "Farming Village",        cat: "settlement", icon: "fa-solid fa-wheat-awn" },
  helkasFestival:          { name: "Village Festival",       cat: "folk",       icon: "fa-solid fa-people-group" },
  helkasAttackDrakes:      { name: "Village Raid — Drakes",  cat: "settlement", icon: "fa-solid fa-fire" },
  helkasAttackRaiders:     { name: "Village Raid — Raiders", cat: "settlement", icon: "fa-solid fa-fire" },
  helkasAttack:            { name: "Village Raid",           cat: "settlement", icon: "fa-solid fa-fire" },
  oozeFarm:                { name: "Festering Bog",          cat: "wild",       icon: "fa-solid fa-droplet" },
  yakoshtaMine:            { name: "Working Mine",           cat: "dungeon",    icon: "fa-solid fa-helmet-safety" },
  goldenFlats:             { name: "Golden Plains",          cat: "wild",       icon: "fa-solid fa-mountain-sun" },
  goldenFlatsWater:        { name: "Riverside Plains",       cat: "wild",       icon: "fa-solid fa-water" },
  rustvarValleys:          { name: "Windswept Valleys",      cat: "wild",       icon: "fa-solid fa-mountain-sun" },
  corpinSanctuary:         { name: "Open Grasslands",        cat: "wild",       icon: "fa-solid fa-mountain-sun" },
  bloodwoods:              { name: "Deep Woods",             cat: "wild",       icon: "fa-solid fa-tree" },
  ameraspGrove:            { name: "Ancient Grove",          cat: "wild",       icon: "fa-solid fa-tree" },
  bleakArchive:            { name: "Arcane Archive",         cat: "sacred",     icon: "fa-solid fa-wand-magic-sparkles" },
  signara:                 { name: "Crystal Sanctum",        cat: "sacred",     icon: "fa-solid fa-gem" },
  redrakFields:            { name: "Farm Fields",            cat: "settlement", icon: "fa-solid fa-wheat-awn" },
  skybrush:                { name: "High Plains",            cat: "wild",       icon: "fa-solid fa-mountain-sun" },
  steedsPoint:             { name: "Cliffside Plains",       cat: "wild",       icon: "fa-solid fa-mountain-sun" },
  marlstoneGala:           { name: "Grand Ballroom",         cat: "folk",       icon: "fa-solid fa-champagne-glasses" },
  pathways:                { name: "Underground Pathways",   cat: "dungeon",    icon: "fa-solid fa-dungeon" },
  scrapyard:               { name: "Scrapyard",              cat: "dungeon",    icon: "fa-solid fa-gears" },
  inkaroPools:             { name: "Underground Pools",      cat: "dungeon",    icon: "fa-solid fa-droplet" },
  mycelianExpanse:         { name: "Fungal Expanse",         cat: "dungeon",    icon: "fa-solid fa-dungeon" },
  fogboundCaverns:         { name: "Fogbound Caverns",       cat: "dungeon",    icon: "fa-solid fa-dungeon" },
  primordialBastion:       { name: "Primordial Depths",      cat: "dungeon",    icon: "fa-solid fa-dungeon" },
  quarryLabChaos:          { name: "Laboratory — Chaos",     cat: "dungeon",    icon: "fa-solid fa-flask" },
  quarryLab:               { name: "Laboratory — Quiet",     cat: "dungeon",    icon: "fa-solid fa-flask" },
  splinterCanyons:         { name: "Desert Canyons",         cat: "wild",       icon: "fa-solid fa-mountain-sun" },
  wedgelands:              { name: "Barren Badlands",        cat: "wild",       icon: "fa-solid fa-mountain-sun" },
  seawall:                 { name: "Seaside Town",           cat: "settlement", icon: "fa-solid fa-anchor" },
  nain:                    { name: "River Port Town",        cat: "settlement", icon: "fa-solid fa-anchor" },
  ordainDocks:             { name: "Town Docks",             cat: "settlement", icon: "fa-solid fa-anchor" },
  ordainFlats:             { name: "City Streets",           cat: "settlement", icon: "fa-solid fa-city" },
  ordainSpires:            { name: "Upper City",             cat: "settlement", icon: "fa-solid fa-city" },
  upperArcturel:           { name: "Hilltop City",           cat: "settlement", icon: "fa-solid fa-city" },
  lowerArcturel:           { name: "Undercity",              cat: "settlement", icon: "fa-solid fa-city" },
  Arcturel:                { name: "Great City",             cat: "settlement", icon: "fa-solid fa-city" },
  waterworks:              { name: "Waterworks",             cat: "dungeon",    icon: "fa-solid fa-water" },
  clockworkDungeon:        { name: "Clockwork Dungeon",      cat: "dungeon",    icon: "fa-solid fa-gears" },
  burialGrounds:           { name: "Burial Grounds",         cat: "dungeon",    icon: "fa-solid fa-skull" },
  spellbreakerTower:       { name: "Wizard's Tower",         cat: "sacred",     icon: "fa-solid fa-hat-wizard" },
  embersBounty:            { name: "Anchored Ship",          cat: "coast",      icon: "fa-solid fa-anchor" },
  pitTrap:                 { name: "Fighting Pit",           cat: "folk",       icon: "fa-solid fa-hand-fist" },
  sarinStrand:             { name: "Windy Beach",            cat: "coast",      icon: "fa-solid fa-water" },
  ordainTemple:            { name: "Temple Interior",        cat: "sacred",     icon: "fa-solid fa-place-of-worship" },
  ordainInterior:          { name: "Town Interior",          cat: "settlement", icon: "fa-solid fa-house" },
  stadiumUnderworks:       { name: "Underworks",             cat: "dungeon",    icon: "fa-solid fa-dungeon" }
};

/* ---- Helpers ---- */

/** Turn a camelCase / lore id into a readable title, tagging Day/Night/Tension. */
export function prettify(id = "") {
  let s = String(id)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d+)/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
  s = s.replace(/\bTension\b/gi, "(Tense)")
       .replace(/\b(Day|Night|Dawn|Dusk)\b/g, "($1)");
  return s;
}

const AMBIENCE_RULES = [
  [/ocean|tidal|ship|wreck|seawall|dock|strand|sarin|waterworks|pools/i, "coast"],
  [/cave|cavern|mine|noxious|fogbound|inkaro|mycelian|undergroun|burial|grave|kaleidoscope|quarry|scrapyard|expanse|primordial|bastion|clockwork|waterworks/i, "dungeon"],
  [/temple|shrine|sanctuary|archive|spellbreaker|tower|magic|arcane|signara|rejarh|cindaric|nite|ruins/i, "sacred"],
  [/docks|ordain|arcturel|helkas|nain|gravensrest|hideout|embersbounty|stadium|interior|gala|marlstone|corpin|steeds/i, "settlement"],
  [/jungle|forest|grove|wood|bloodwood|amerasp|skybrush|fields|flats|valley|plains|redrak|rustvar|wedgeland|splinter|canyon|bluff|teeth|mountain|spire|dripstone|stone|farm|yakoshta|cauldron|camp|vista|pit/i, "wild"]
];

export function ambienceCategory(id = "") {
  for (const [re, cat] of AMBIENCE_RULES) if (re.test(id)) return cat;
  return "ambience";
}

export function ambienceIcon(id = "") {
  return CATEGORIES[ambienceCategory(id)]?.icon ?? CATEGORIES.ambience.icon;
}

/** The day/night-stripped base id for an ambience arrangement (its "theme"). */
export function ambienceBase(id = "") {
  return /(?:day|night)$/i.test(id) ? id.replace(/(?:day|night)$/i, "") : id;
}

/**
 * Display info for an ambience arrangement, resolved at the THEME level so day
 * and night variants share one curated generic name/category/icon. Falls back
 * to prettify + keyword categorisation for anything not in the curated map.
 * @returns {{name:string, cat:string, icon:string, base:string}}
 */
export function ambienceMeta(id = "") {
  const base = ambienceBase(id);
  const m = AMBIENCE[base];
  if (m) return { ...m, base };
  return { name: prettify(base), cat: ambienceCategory(base), icon: ambienceIcon(base), base };
}

/* ---- Per-track (stem) icons — keyword heuristic for the ambience mixer ---- */
const TRACK_ICON_RULES = [
  [/ocean|wave|tide|sea|surf|water|river|drip|bubble|slosh|gutter|pool|waterfall|rain|wet/i, "fa-solid fa-water"],
  [/fire|campfire|bonfire|ember|flame|torch|forge/i, "fa-solid fa-fire"],
  [/owl|gull|crow|eagle|vulture|raven|sparrow|bird|wing/i, "fa-solid fa-dove"],
  [/wind|breeze|gust|howl|gale|whistl/i, "fa-solid fa-wind"],
  [/bell|chime|gong/i, "fa-solid fa-bell"],
  [/voice|crowd|walla|murmur|children|party|festival|chatter|cheer|talk/i, "fa-solid fa-people-group"],
  [/drum|timpani|perc|impact|taiko|tom\b|hit\b/i, "fa-solid fa-drum"],
  [/cricket|mosquito|bug|insect|frog|cicada/i, "fa-solid fa-bug"],
  [/cello|violin|viola|pluck|harp|gittern|guitar|lute|string/i, "fa-solid fa-guitar"],
  [/horn|trumpet|brass|tuba|trombone/i, "fa-solid fa-bullhorn"],
  [/flute|woodwind|clarinet|oboe|pipe|melody|ostinato/i, "fa-solid fa-music"],
  [/choir|vocal|chant|sing|\bhum\b/i, "fa-solid fa-microphone"],
  [/mining|pickaxe|cart|metal|scrape|machine|factory|clockwork|steam|gear|chain/i, "fa-solid fa-gears"],
  [/rock|stone|cave|cavern|boulder|quarry|earth|tremor|quake|fall/i, "fa-solid fa-mountain"],
  [/foley|footstep|movement|walk|cloth|wood|creak|door|flag/i, "fa-solid fa-shoe-prints"],
  [/ghost|aura|whisper|horror|spectral|haunt|eerie|reverse/i, "fa-solid fa-ghost"],
  [/crystal|shimmer|magic|arcane|spell|glow|sparkle/i, "fa-solid fa-wand-sparkles"],
  [/leaf|leaves|grass|tree|forest|jungle|rustle|branch|rainforest/i, "fa-solid fa-leaf"],
  [/drone|pad|ambient|tone|swell|atmos|rumble|\blow|pulse|deep/i, "fa-solid fa-wave-square"]
];

/** Best-guess Font Awesome icon for a single track/stem id (mixer nodes). */
export function trackIcon(id = "") {
  for (const [re, ic] of TRACK_ICON_RULES) if (re.test(id)) return ic;
  return "fa-solid fa-volume-high";
}

/** Display info for a music soundscape id. */
export function musicMeta(id = "") {
  return MUSIC[id] ?? { name: prettify(id), cat: "theme", icon: CATEGORIES.theme.icon };
}

/** True if an arrangement id reads as the tense/intense version. */
export function isTense(id = "") { return /tens/i.test(id); }   // matches "tension" and "intense"

/** True if the soundscape has BOTH a tense and a calm arrangement (so the switch can toggle). */
export function hasTension(ss) {
  const ids = Object.keys(ss?.arrangements ?? {});
  return ids.some(isTense) && ids.some(id => !isTense(id));
}

/** Which time-of-day phase an arrangement id is flavoured for, or null if neutral. */
export function phaseOf(id = "") {
  if (/night/i.test(id)) return "night";
  if (/(day|dawn|dusk)/i.test(id)) return "day";
  return null;
}

/**
 * Find the day/night counterpart of the current arrangement for a target phase,
 * matching its "base" so Docks-Day → Docks-Night (not some other area). Returns
 * null when the current arrangement isn't phase-specific or already matches.
 * @param {object} ss          soundscape (its .arrangements are searched)
 * @param {string} curArrId    the currently-playing arrangement id
 * @param {"day"|"night"} phase target phase
 * @returns {string|null}
 */
export function dayNightVariant(ss, curArrId, phase) {
  const ids = Object.keys(ss?.arrangements ?? {});
  if (!curArrId || !ids.length) return null;
  const cur = phaseOf(curArrId);
  if (!cur || cur === phase) return null;                 // neutral, or already correct
  const strip = id => id.replace(/(day|night|dawn|dusk)/ig, "").toLowerCase();
  const b = strip(curArrId);
  return ids.find(id => phaseOf(id) === phase && strip(id) === b) || null;
}

/**
 * Find the calm/tension counterpart arrangement for the current one, matching
 * the current arrangement's "base" (so Docks-Day ↔ Docks-Tension, not some other area).
 * @returns {string|null} arrangement id, or null if none fits.
 */
export function moodVariant(ss, curArrId, mood) {
  const ids = Object.keys(ss?.arrangements ?? {});
  if (!ids.length) return null;
  // Strip mood/intensity/time tokens so "intense"↔"relaxed" and "main"↔"intense"
  // pair up (not just the "…Tension"/"…Calm" convention).
  const strip = id => id.replace(/(tension|intense|tense|calm|relaxed|relax|day|night|dawn|dusk|main)/ig, "").toLowerCase();
  const b = strip(curArrId || ids[0]);
  if (mood === "tension") {
    return ids.find(id => isTense(id) && strip(id) === b) || ids.find(isTense) || null;
  }
  const calm = ids.filter(id => !isTense(id));
  return calm.find(id => strip(id) === b)
      || calm.find(id => /calm|relax|main/i.test(id))
      || calm.find(id => /day$/i.test(id))
      || calm[0] || null;
}
