/**
 * Compatibility shims required by the lifted engine.
 * Ember relied on a couple of Array.prototype extensions that Foundry defines
 * globally; we provide the one the audio path needs (filterJoin) so the engine
 * runs without the rest of Ember present.
 */

// Used by EmberAudioArrangement.fromConfig to assemble layer src paths,
// skipping null/undefined/empty segments.
if (!Array.prototype.filterJoin) {
  Object.defineProperty(Array.prototype, "filterJoin", {
    value: function (sep) {
      return this.filter(e => (e !== null) && (e !== undefined) && (e !== "")).join(sep);
    },
    enumerable: false
  });
}
