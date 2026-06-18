# Cavril Maestro — Adaptive Music Director

A standalone port of Ember's generative, beat-synchronized soundscape engine.
System-agnostic (no Crucible/dnd5e dependency). Brings layered "stem" music with
Calm/Tension moods that re-sequences itself in real time.

## How it works

Each **soundscape** (e.g. `ordain`) is a folder of individual instrument stems.
An **arrangement** picks a subset of those stems at set volumes. A **group**
re-rolls a random handful of stems every N bars (beat-synced to the soundscape's
bpm), so the music evolves and never repeats. Moods (`calm` / `tension`)
cross-fade tension stems in/out over the current bed without restarting.

Engine = three classes lifted from Ember and decoupled:
- `EmberSoundOrchestration` — per-channel conductor (subclass of `foundry.audio.Sound`)
- `EmberAudioArrangement` — arrangement DataModel
- `EmberSoundscape` — state manager + cross-client broadcast (`Maestro.sound`)

## Install

1. Copy the `cavril-maestro/` folder into your Foundry **v14** install's
   `Data/modules/` directory (or upload/package it for The Forge).
2. Enable **Cavril Maestro** in *Manage Modules* and reload.

## Audio assets (not bundled)

The engine needs the stem files. Set **Settings → Configure Settings →
Cavril Maestro → Audio Asset Base Path** to a folder containing
`music/ environment/ weather/ effects` subfolders, then reload.

- **Zero-friction test:** if the Ember module is installed in the same world,
  set the base path to `modules/ember/assets/audio` — Maestro will use Ember's
  already-present stems. No upload needed.
- **Standalone / Forge:** upload the `audio/` folder to your Forge Assets
  Library and point the base path at that URL. ~916 MB (music 822 / env 87 /
  weather 3.5 / effects 3.2). Keep it private — it's paid Ember content.

## Smoke test (F12 console, as GM)

```js
Maestro.list();                 // table of all soundscapes + their arrangements
Maestro.play("ordain");         // start a music soundscape (first arrangement)
Maestro.tension();              // morph to tension
Maestro.calm();                 // morph back
Maestro.rearrange();            // re-roll the random layer selection now
Maestro.play("emberEnvironment", { channel: "environment" });
Maestro.stop();                 // stop music
Maestro.stop("environment");
```

A "Maestro Channels" playlist with four sentinel sounds (Music / Environment /
Weather / Effects) is created automatically; the Playlists sidebar also gets a
soundscape + mood picker.

## Status / roadmap

- [x] **Stage 1** — engine + 40 soundscapes extracted, decoupled, runs on V14;
      console control API.
- [x] **Stage 2** — Director panel (ApplicationV2): soundscape ▸ arrangement ▸
      Calm/Tension ▸ per-channel volume + ambience. Open via the Token Controls
      button or `Maestro.openDirector()`.
- [ ] **Stage 3** — auto: per-scene default soundscape (scene flag) + a generic,
      system-agnostic combat→tension hook (Ember's creature-type combat map is
      currently dead code, retained for reference).

## Known unknowns (need a live V14 run to confirm)

- Sentinel `PlaylistSound`s are created without a `path`. If V14 rejects that,
  the console logs a creation error — tell me and I'll bundle a silent file.
- `playlistSound.sound = <orchestration>` reassignment and the
  `renderPlaylistDirectory` picker rely on Ember's V14 DOM/Sound internals; both
  are wrapped in try/catch but unverified outside a live world.

## Provenance

Engine + data lifted from `modules/ember/scripts/ember.mjs` (Ember is
V14-native: `compatibility.minimum 14.362`). Couplings to `ember.*`,
`ember.CONST.*`, and the `("ember","soundscape")` setting were rewired to the
`Maestro` namespace and the `("cavril-maestro","state")` setting. For personal
use with your own Ember license — do not redistribute the audio.
