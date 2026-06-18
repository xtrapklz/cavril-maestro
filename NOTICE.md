# NOTICE — provenance & licensing

**Cavril Maestro** embeds the adaptive-audio engine and soundscape definitions
from **Ember**, a commercial module by **Foundry Gaming LLC**:

- `scripts/engine.mjs` and `scripts/soundscapes.mjs` are derived from
  `ember/scripts/ember.mjs` — lifted and decoupled from the Ember/Crucible
  runtime so the audio engine can run standalone.

Those portions remain the **copyright of Foundry Gaming LLC** and are included
here for the repository owner's **personal use** under their existing Ember
license.

> **Do not redistribute.** Keep this repository private. The audio files
> themselves are **not** included in this repository; they must be supplied
> separately by anyone holding a valid Ember license (e.g. uploaded to their own
> Forge Assets Library and referenced via the *Audio Asset Base Path* setting).

Original glue code written for this module — `scripts/maestro.mjs`,
`scripts/compat.mjs`, and the build/config files — is provided by the repository
owner and may be reused freely.
