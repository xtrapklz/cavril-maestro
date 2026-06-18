import "./compat.mjs";
import {soundscapes} from "./soundscapes.mjs";

class EmberSoundOrchestration extends foundry.audio.Sound {
  constructor(_src, {channel, playlistSound, ...options}={}) {
    options.context = playlistSound.context;
    super(undefined, options);

    /**
     * The audio channel that this Container manages.
     * A value in "environment", "music", "weather", "effects"
     * @type {string}
     */
    Object.defineProperty(this, "channel", {value: channel, writable: false});

    /**
     * The PlaylistSound which manages interaction with this container
     * @type {PlaylistSound}
     */
    Object.defineProperty(this, "playlistSound", {value: playlistSound, writable: false});

    /**
     * The currently active audio arrangement
     * @type {EmberAudioArrangement}
     */
    Object.defineProperty(this, "arrangement", {value: null, writable: false, configurable: true});

    /**
     * The set of layers which are currently playing in this orchestration.
     * There could be layers which do not belong to the current arrangement which are in the process of fading out.
     * @type {Set<EmberAudioLayer>}
     */
    Object.defineProperty(this, "layers", {value: new Set(), writable: false, configurable: false});
  }

  /* -------------------------------------------- */

  /**
   * The amount of transition delay applied to debounced updates of this container.
   * @type {number}
   */
  transitionDelay = 2000;

  /**
   * The numeric identifier of a pending window timeout.
   * @type {number}
   */
  #initializeId;

  /**
   * An identifier for the pending arrangement change. Used to ignore duplicative updates.
   * @type {string}
   */
  #pendingId;

  /**
   * A Promise which enqueues updates to ensure that only one occurs at a time.
   * @type {Promise}
   */
  #updating;

  /* -------------------------------------------- */

  /**
   * The soundscape ID currently playing in this container.
   * @type {string}
   */
  get id() {
    return this.config.id;
  }

  /* -------------------------------------------- */

  /** @override */
  get duration() {
    return Infinity;
  }

  /* -------------------------------------------- */
  /*  Arrangement Methods                         */
  /* -------------------------------------------- */

  /**
   * Initialize this composition with a new EmberAudioArrangement.
   * @param {EmberAudioArrangement} arrangement   The new desired arrangement
   * @returns {Promise<void[]>}                   A Promise which resolves once all fade operations are complete
   */
  initialize(arrangement) {
    console.groupCollapsed(`Ember | Initializing ${this.channel} audio channel | ${arrangement}"`);
    const promises = [];
    this.#pendingId ||= arrangement?.toString() ?? "null";

    // Merge the new arrangement with the current one
    const prior = this.arrangement;
    const newArrangement = EmberSoundOrchestration.#mergeArrangements(prior, arrangement);

    // Conclude the prior arrangement
    if ( prior && newArrangement ) promises.push(this.conclude(arrangement));

    // Update the active arrangement
    Object.defineProperty(this, "arrangement", {value: arrangement, configurable: true});

    // Begin playback for the new arrangement
    if ( arrangement && this.playlistSound.playing ) {
      if ( this.playing ) {
        this.volume = this.playlistSound.volume;
        promises.push(this.arrange());
      }
      else promises.push(this.play({volume: this.playlistSound.volume, fade: 0}));
    }
    console.groupEnd();
    return Promise.allSettled(promises);
  }

  /* -------------------------------------------- */

  /**
   * Perform a delayed initialization, de-duplicating requests and executing the latest unique request.
   * @param {EmberAudioArrangement} arrangement   The new desired arrangement
   * @param {boolean} customLayers                Does the new arrangement contain custom layers?
   */
  debounceInitialize(arrangement, customLayers) {
    let transactionId = arrangement?.toString() ?? "null";
    if ( customLayers ) transactionId += `-${Array.from(arrangement.layers.keys()).join("-")}`;
    if ( transactionId === this.#pendingId ) return;
    this.#pendingId = transactionId;
    clearTimeout(this.#initializeId);
    this.#initializeId = setTimeout(() => this.initialize(arrangement), this.transitionDelay);
  }

  /* -------------------------------------------- */

  /**
   * Merge the prior arrangement with the new one, preserving any continuing layers.
   * @param {EmberAudioArrangement|null} prior          The prior configured arrangement
   * @param {EmberAudioArrangement|null} arrangement    The new configured arrangement
   * @returns {boolean}                                 Is the arrangement changed?
   */
  static #mergeArrangements(prior, arrangement) {
    if ( prior === null ) return arrangement !== null;
    if ( arrangement === null ) return true;
    for ( const l0 of prior.layers.values() ) {
      const l1 = arrangement.layers.get(l0.id);
      // Preserve data for continuing layers
      if ( l1 && (l0.src === l1.src) ) {
        for ( const k of ["playing", "sound", "targetVolume", "timing"] ) l1[k] = l0[k];
      }
    }
    return (arrangement.soundscape !== prior.soundscape) || (arrangement.id !== prior.id);
  }

  /* -------------------------------------------- */
  /*  Life-Cycle Methods                          */
  /* -------------------------------------------- */

  /** @override */
  async _load() {} // No-op

  /* -------------------------------------------- */

  /** @override */
  _createNodes() {
    this.gainNode ||= this.context.createGain();
  }

  /* -------------------------------------------- */

  /** @override */
  _connectPipeline() {
    this.destination ||= this.context.gainNode;
    this.gainNode.connect(this.destination);
  }

  /* -------------------------------------------- */

  /** @override */
  _disconnectPipeline() {
    this.gainNode.disconnect();
  }

  /* -------------------------------------------- */

  /** @override */
  async _play() {
    if ( !this.arrangement ) return this;
    this.#debug(`Starting playback of ${this.channel} channel: ${this.arrangement}`);
    this.volume = this.playlistSound.volume; // Maintain volume of the overall orchestration
    // noinspection ES6MissingAwait
    this.arrange();
  }

  /* -------------------------------------------- */

  /** @override */
  _stop() {
    this.#debug(`Stopping playback of ${this.channel} channel: ${this.arrangement}`);
    for ( const layer of this.layers ) {
      this.#endPlayback(layer);
    }
    if ( this.arrangement ) {
      for ( const group of this.arrangement.groups.values() ) {
        this.#clearTransition(group);
      }
      for ( const layer of this.arrangement.layers.values() ) {
        this.#endPlayback(layer);
      }
    }
    this.volume = this.playlistSound.volume; // Maintain volume of the overall orchestration
  }

  /* -------------------------------------------- */

  /**
   * Compose a new arrangement configuration for the container.
   * @param {EmberAudioGroup} [group]      Arrange one particular group, leaving others as-is
   * @returns {Promise<Object<number>>}    A promise which resolves to the arranged layers and volumes
   */
  async arrange(group) {
    if ( !this.arrangement || (this.arrangement.timing.arranged === false) ) return {};
    let layers = {};
    let fadeOutOthers = false;
    if ( CONFIG.debug.audio ) console.groupCollapsed(`Ember | Rearranging ${this.channel} ${this.arrangement}`);

    // Fixed arrangement
    if ( !this.arrangement.groups.size ) {
      fadeOutOthers = true;
      layers = this.#arrangeFixed();
    }

    // Grouped Arrangement
    for ( const g of this.arrangement.groups.values() ) {
      if ( group && (group !== g) ) continue;
      Object.assign(layers, this.#arrangeGroup(g));
      this.#scheduleTransition(g);
    }

    // Update the composition to the new layered arrangement
    if ( CONFIG.debug.audio ) console.debug(layers);
    const update = this.update(layers, {fadeOutOthers});
    if ( CONFIG.debug.audio ) console.groupEnd();
    await update;
    return layers;
  }

  /* -------------------------------------------- */

  /**
   * Update the playback state of the container using a provided object of layers and volume levels.
   * @param {Record<string, number>|null} layers  The configuration of layers to play
   * @param {object} [options]            Options which configure playback
   * @param {boolean} [options.fadeOutOthers]   Fade out other playing layers?
   * @returns {Promise<void[]>}           A Promise which resolves once all audio changes have completed
   */
  async update(layers, options) {
    if ( this.#updating ) {
      await this.#updating;
      return this.update(layers, options);
    }
    this.#updating = this.#update(layers, options);
    await this.#updating;
    this.#updating = undefined;
  }

  /* -------------------------------------------- */

  /**
   * See EmberSoundOrchestration#update.
   * @param layers
   * @param root0
   * @param root0.fadeOutOthers
   */
  async #update(layers={}, {fadeOutOthers=false}={}) {
    if ( this.arrangement === null ) return [];
    const promises = [];
    for ( const layer of this.arrangement.layers.values() ) {

      // Determine new target volume
      const priorVolume = layer.playing ? layer.volume : 0;
      let targetVolume;
      if ( layer.id in layers ) targetVolume = layers[layer.id];  // Explicitly arranged
      else if ( fadeOutOthers ) targetVolume = 0;                 // Implicitly ended

      // If there is no target volume we can skip this layer
      if ( targetVolume === undefined ) continue;
      layer.targetVolume = targetVolume;
      const volumeChange = layer.targetVolume !== priorVolume;

      // Non-playing layers
      if ( !layer.targetVolume ) {
        if ( layer.playing ) {
          this.#debug(`END ${layer.id}`);
          promises.push(this.#endPlayback(layer));
        }
        continue;
      }

      // Initial layer creation
      if ( !layer.sound ) {
        this.#debug(`ADD ${layer.id}`);
        promises.push(this.#addLayer(layer));
      }

      // Adjust volume of already-playing layer
      else if ( layer.sound.playing ) {
        if ( !volumeChange ) continue;
        this.#debug(`FADE ${layer.id}`);
        promises.push(this.#fadeLayer(layer));
      }

      // Begin layer playback
      else {
        this.#debug(`PLAY ${layer.id}`);
        promises.push(this.#playLayer(layer));
      }
    }

    // Resolve all transitions with a half-interval timeout
    let settled = false;
    let timeoutMS = (this.arrangement.timing.bars * this.arrangement.timing.barSeconds) * 1000 / 2;
    if ( !Number.isFinite(timeoutMS) || (timeoutMS <= 0) ) {
      // Fallback for arrangements without bpm/bars: setTimeout(NaN) fires immediately and orphans play promises.
      let maxFadeMs = 0;
      for ( const layer of this.arrangement.layers.values() ) {
        maxFadeMs = Math.max(maxFadeMs, (layer.timing.fadeIn || 0) * 1000);
      }
      timeoutMS = Math.max(maxFadeMs, 5000) + 1000;
    }
    const timeout = new Promise(resolve => window.setTimeout(() => {
      if ( !settled ) {
        this.#debug(`${this.channel} channel update did not fully settle within ${timeoutMS}ms (normal for delayed ambience layers)`);
      }
      resolve();
    }, timeoutMS));
    await Promise.race([Promise.allSettled(promises), timeout]);
    settled = true;
  }

  /* -------------------------------------------- */

  /**
   * Conclude the current arrangement, fading out all playing layers.
   * @param {EmberAudioArrangement|null} nextArrangement  The next arrangement that will be playing
   * @returns {Promise<void[]>}                           A promise which resolves once all volume changes are complete
   */
  async conclude(nextArrangement) {
    if ( this.arrangement === null ) return [];
    const promises = [];

    // Conclude group transitions
    for ( const group of this.arrangement.groups.values() ) {
      this.#clearTransition(group);
    }

    // Conclude layer playback
    for ( const layer of this.arrangement.layers.values() ) {
      if ( layer.playing ) {
        if ( nextArrangement?.layers.has(layer.id) ) continue;
        promises.push(this.#endPlayback(layer));
      }
    }
    return Promise.all(promises);
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Compose a fixed arrangement which includes all layers.
   * @returns {Object<number>}      Arranged layers and target volume levels
   */
  #arrangeFixed() {
    const arranged = {};
    if ( this.arrangement.oneShot ) return arranged;
    this.#debug("Fixed arrangement");
    for ( const layer of this.arrangement.layers.values() ) {
      arranged[layer.id] = layer.volume;
    }
    return arranged;
  }

  /* -------------------------------------------- */

  /**
   * Compose a random arrangement of layers within a single arrangement group.
   * @param {EmberAudioGroup} group   The arrangement group
   * @returns {Object<number>}        Arranged layers and target volume levels
   */
  #arrangeGroup(group) {
    this.#debug(`Arranging group "${group.id}"`);
    const layers = group.layers;

    // Select a desired number of layers
    let {min=0, max=layers.length} = group.randomLayers || {};
    min = Math.max(min, 0);
    max = Math.min(max, layers.length);
    const nLayers = min + Math.round(Math.random() * (max - min));

    // Define the arrangement via randomized probabilities
    const probabilities = layers.map(layer => ([layer, Math.random()])).sort((a, b) => b[1] - a[1]);
    const arranged = {};
    for ( const [i, [layer]] of Object.entries(probabilities) ) {
      arranged[layer.id] = i < nLayers ? layer.volume : 0;
    }
    return arranged;
  }

  /* -------------------------------------------- */

  /**
   * Schedule the next transition for the composition.
   * @param {EmberAudioGroup} group     The arrangement group being transitioned
   */
  #scheduleTransition(group) {
    this.#clearTransition(group);
    const isCycleGroup = this.arrangement.timing.cycleGroup === group.id;
    const hasTransition = group.randomLayers || isCycleGroup;
    if ( !(this.playlistSound.playing && hasTransition) ) return;
    const currentTime = this.context.currentTime;
    const intervalSeconds = group.interval * this.arrangement.timing.barSeconds;
    const currentSeconds = currentTime % intervalSeconds;
    let remainingSeconds = intervalSeconds - currentSeconds;
    if ( isCycleGroup ) { // FIXME could be more elegant?
      remainingSeconds -= 3;
      if ( remainingSeconds < (intervalSeconds * 0.25) ) remainingSeconds += intervalSeconds;
    }
    group.transition = new foundry.audio.AudioTimeout(remainingSeconds * 1000, {
      context: this.context,
      callback: () => {
        delete group.transition;
        if ( this.arrangement.timing.cycleGroup === group.id ) this.#cycleArrangement();
        else this.arrange(group);
      }
    });
  }

  /* -------------------------------------------- */

  /**
   * Cycle to a random adjacent arrangement in the same soundscape.
   */
  #cycleArrangement() {
    const soundscape = Maestro.sound.soundscapes[this.arrangement.soundscape];
    const arrangements = Object.keys(soundscape.arrangements);
    if ( arrangements.length < 2 ) return;
    const currentIdx = arrangements.findIndex(i => i === this.arrangement.id) || 0;
    let nextIdx = currentIdx;
    while ( nextIdx === currentIdx ) nextIdx = Math.floor(Math.random() * arrangements.length);
    const arrangementId = arrangements[nextIdx];
    Maestro.sound.updateChannel(this.channel, {soundscapeId: soundscape.id, arrangementId});
  }

  /* -------------------------------------------- */

  /**
   * Clear any prior transition which may be still pending.
   * @param group
   */
  #clearTransition(group) {
    if ( group.transition ) {
      group.transition.cancel();
      delete group.transition;
    }
  }

  /* -------------------------------------------- */

  /**
   * Initialize a Sound instance for a newly playing layer.
   * @param {EmberAudioLayer} layer   The sound layer to begin
   * @returns {Promise<void>}         A promise which resolves once fade-in has completed
   */
  async #addLayer(layer) {
    layer.sound = new foundry.audio.Sound(layer.src, {context: this.context});
    layer.sound.destination = this.gainNode;
    await layer.sound.load();

    // Update layer duration
    const t = layer.timing;
    const s = this.arrangement.timing.barSeconds;
    t.duration = layer.sound.duration;
    if ( Number.isFinite(t.loopEnd - t.loopStart) ) t.duration = t.loopEnd - t.loopStart;
    t.bars ??= s ? Math.round(t.duration / s) : undefined;

    // Constrain crossfade time to half of layer duration
    if ( t.fadeIn || t.fadeOut ) {
      const inRatio = t.fadeIn / (t.fadeIn + t.fadeOut);
      t.fadeIn = Math.min(t.fadeIn, t.duration * inRatio);
      t.fadeOut = Math.min(t.fadeOut, t.duration * (1 - inRatio));
    }

    // Begin playback
    return this.#playLayer(layer);
  }

  /* -------------------------------------------- */

  /**
   * Begin playback for an initialized layer.
   * @param {EmberAudioLayer} layer   The sound layer to begin
   * @returns {Promise<void>}         A promise which resolves once fade-in has completed
   */
  async #playLayer(layer) {
    const {sound, timing: t, volume, targetVolume} = layer;
    if ( !this.arrangement || sound.playing ) return this.#endPlayback(layer);
    const ct = this.context.currentTime;

    // Configure playback options
    const sync = this.arrangement?.timing?.sync ?? false;
    const sparse = (t.pad > 0) || !!t.randomDelay;
    const loop = t.loop;
    const repeat = (sync || sparse || t.loop) && !this.arrangement.oneShot;
    const playback = {
      loop: loop,
      loopStart: t.loopStart,
      loopEnd: t.loopEnd,
      delay: 0,
      offset: t.loopStart ?? 0,
      volume: targetVolume ?? volume,
      fade: (layer.playing && !sparse) ? 0 : (t.fadeIn * 1000)
    };

    // At the end of each playback iteration
    playback.onended = () => {
      this.#debug(`ONENDED ${layer.id} | Repeat ${repeat} | Playing ${layer.playing} | Volume ${layer.targetVolume}`);
      if ( repeat && layer.playing && layer.targetVolume ) this.#playLayer(layer);
      else this.#endPlayback(layer);
    };

    // Synchronized playback
    if ( sync ) {
      const barSeconds = this.arrangement.timing.barSeconds;
      const loopDuration = t.bars + (t.pad || 0);
      const contextBar = ct / barSeconds;                                       // Overall bar of the context
      const layerBar = (contextBar - (t.delay || 0)) % loopDuration;            // Target bar of the layer
      if ( layerBar > t.bars ) {                                                // Delayed start time
        playback.delay = (loopDuration - layerBar) * barSeconds;
      }
      else playback.offset += (layerBar * barSeconds);                          // Layer start offset
    }

    // Non-synchronized playback
    else {

      // Randomized delay before starting
      if ( t.randomDelay ) {
        let {min, max} = t.randomDelay;
        if ( !layer.playing ) {
          min = Math.max(min - (max / 2), 0);
          max /= 2;
        }
        playback.delay = min + (Math.random() * (max - min));
      }

      // Randomized playback duration
      if ( t.randomDuration ) {
        const {min, max} = t.randomDuration;
        playback.duration = min + (Math.random() * (max - min));
      }

      // Randomized offset within the loop
      if ( t.randomOffset ) playback.offset += (Math.random() * t.duration);

      // Randomized playback volume
      if ( t.randomVolume ) {
        const {min, max} = t.randomVolume;
        const volumeFactor = min + (Math.random() * (max - min));
        playback.volume *= volumeFactor;
      }
    }

    // Log playback
    let log =`${layer.playing ? "Repeating" : "Beginning"} playback for ${layer.id}`;
    if ( loop ) log += " (Loop)";
    else if ( sync ) log += ` (${layer.timing.bars} Bars)`;
    else if ( sparse ) log += ` (Sparse ${playback.delay.toFixed(0)}s)`;
    this.#debug(log);

    // Begin playback
    layer.playing = true; // Immediately record the layer is playing
    this.layers.add(layer);
    await sound.play(playback);

    // Schedule fade-out for non-sync layers with finite duration
    if ( !sync && playback.duration && t.fadeOut ) {
      const fadeOutTime = playback.duration - t.fadeOut;
      sound.schedule(() => sound.fade(0, {duration: t.fadeOut * 1000}), fadeOutTime);
    }
  }

  /* -------------------------------------------- */

  /**
   * End playback for an audio arrangement layer.
   * @param {EmberAudioLayer} layer  The ending layer
   */
  async #endPlayback(layer) {
    layer.playing = false; // Immediately record the layer is no longer playing
    if ( layer.sound?.playing ) {
      this.#debug(`Ending playback for layer ${layer.id}`);
      layer.targetVolume = 0;
      await layer.sound.stop({volume: 0, fade: layer.timing.fadeOut * 1000});
    }
    this.layers.delete(layer);
  }

  /* -------------------------------------------- */

  /**
   * Fade the volume of an audio node to a target volume level.
   * @param {EmberAudioLayer} layer   The layer to fade
   * @returns {Promise<void>}        A Promise which resolves once the fade has completed
   */
  async #fadeLayer(layer) {
    if ( !layer.playing ) return;
    const seconds = layer.targetVolume > layer.sound.volume ? layer.timing.fadeIn : layer.timing.fadeOut;
    await layer.sound.fade(layer.targetVolume, seconds * 1000);
  }

  /* -------------------------------------------- */

  /**
   * Log an audio debugging message if the CONFIG.debug.audio flag is enabled
   * @param {string} message      The message to log
   * @param {...*} args           Additional arguments to log
   */
  #debug(message, ...args) {
    if ( CONFIG.debug.audio ) console.debug(`Ember | ${message}`, ...args);
  }
}

/**
 * @typedef {object} EmberAudioGroup
 * @property {string} id
 * @property {number} interval                  The number of bars that represents a single orchestration interval
 * @property {number} fadeIn                    Seconds of fade in duration applied to all layers in the group
 * @property {number} fadeOut                   Seconds of fade out duration applied to all layers in the group
 * @property {{min: number, max: number}} randomLayers
 * @property {EmberAudioLayer[]} [layers]
 * @property {AudioTimeout} [transition]
 */

/**
 * @typedef {object} EmberAudioLayer
 * @property {string} id                        A unique id for this layer
 * @property {string} src                       The source file path of the layer buffer
 * @property {string} group                     The EmberAudioGroup id which this layer belongs to
 * @property {number} volume                    The desired volume for the layer, when playing
 * @property {EmberAudioLayerTiming} timing     Special timing attributes for the layer
 * @property {boolean} [playing]                Prepared data: is the layer currently playing?
 * @property {number} [targetVolume]            Prepared data: the current target volume for the layer
 * @property {foundry.audio.Sound} [sound]      Prepared data: the Sound instance for this layer
 */

/**
 * @typedef {object} EmberAudioLayerTiming
 * @property {number} fadeIn                    Seconds of fade in duration
 * @property {number} fadeOut                   Seconds of fade out duration
 * @property {number} delay                     Milliseconds of fixed delay between iterations of a sparse loop
 * @property {number} [duration]                Duration of the layer buffer or explicit loop duration
 * @property {boolean} loop                     Does this layer loop?
 * @property {number} [loopStart]               An explicit loop start offset within the buffer
 * @property {number} [loopEnd]                 An explicit loop stop offset within the buffer
 * @property {number} pad                       Milliseconds of padding between iterations in a synchronized loop
 *
 * @property {{min: number, max: number}} randomDelay
 * Does this layer feature random delay between iterations of a sparse loop? If defined, the delay between recurring
 * playback of this layer is uniformly sampled between `randomDelay.min` and `randomDelay.max`.
 *
 * @property {{min: number, max: number}} randomDuration
 * Does this layer feature random playback duration? If defined, the duration of time for which the layer plays is
 * uniformly sampled between `randomDuration.min` and `randomDuration.max`.
 *
 * @property {boolean} randomOffset
 * Does this layer feature a randomized start offset?
 *
 * @property {{min: number, max: number}} randomVolume
 * Does this layer randomize volume? If defined, a multiplicative scaling factor between `randomVolume.min` and
 * `randomVolume.max` is uniformly sampled and multiplied by the standard target volume for the layer.
 *
 * @property {number} [startTime]
 * The context time at which point playback began for this layer.
 *
 * @property {number} [offset]
 * The initial offset in milliseconds applied when playback began.
 */

/**
 * @typedef {object} EmberAudioArrangementTiming
 * @property {number} bpm
 * @property {number} bars
 * @property {boolean} sync
 * @property {boolean} [arranged=true]          Some compositions may not use automatic arrangement
 * @property {string} [cycleGroup]              A composition group which governs arrangement cycling
 * @property {number} transitionDelay
 * @property {number} [barSeconds]              Prepared data: the number of seconds of a single bar
 * @property {number} [interval]                Prepared data: the number of seconds of a composed interval
 */

/**
 * The currently active audio arrangement for a certain EmberSoundOrchestration.
 * @property {string} id                            The ID of the arrangement
 * @property {string} soundscape                    The soundscape ID for the arrangement
 * @property {string} label                         The ID of the soundscape to which the arrangement belongs
 * @property {Map<string, EmberAudioGroup>} groups  Groups of the arrangement
 * @property {Map<string, EmberAudioLayer>} layers  Layers of the arrangement
 * @property {EmberSoundscape.MOODS} mood           The current mood
 * @property {EmberAudioArrangementTiming} timing   Arrangement timing configuration
 * @property {boolean} oneShot                      Does this arrangement play one-shot sounds?
 * @property {boolean} randomLayers                 Randomize layer arrangement?
 * @property {number} minLayers                     The minimum number of layers included when randomizing
 * @property {number} maxLayers                     The maximum number of layers included when randomizing
 */
class EmberAudioArrangement extends foundry.abstract.DataModel {
  /** Minimum fade (seconds) applied to any layer that defines none, so clips never hard-cut. */
  static FADE_FLOOR = 0.8;

  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      id: new fields.StringField({required: true, blank: false}),
      soundscape: new fields.StringField({required: true, blank: false}),
      label: new fields.StringField({required: true, blank: false}),
      layers: new fields.ArrayField(new fields.SchemaField({
        id: new fields.StringField({required: true, blank: false}),
        src: new fields.StringField({required: true, blank: false}),
        group: new fields.StringField({required: false, blank: false, initial: undefined}),
        playing: new fields.BooleanField({initial: false}),
        volume: new fields.NumberField({required: true, nullable: false, min: 0, max: 1.0, initial: 1.0}),
        timing: new fields.SchemaField({
          fadeIn: new fields.NumberField({required: false, nullable: false, initial: undefined}),
          fadeOut: new fields.NumberField({required: false, nullable: false, initial: undefined}),
          delay: new fields.NumberField({required: false, nullable: false, initial: undefined}),
          loop: new fields.BooleanField({required: false, initial: undefined}),
          loopStart: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined}),
          loopEnd: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined}),
          pad: new fields.NumberField({required: false, nullable: false, initial: undefined}),
          randomDelay: new fields.SchemaField({
            min: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined}),
            max: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined})
          }, {required: false, initial: undefined}),
          randomDuration: new fields.SchemaField({
            min: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined}),
            max: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined})
          }, {required: false, initial: undefined}),
          randomOffset: new fields.BooleanField({initial: false}),
          randomVolume: new fields.SchemaField({
            min: new fields.NumberField({nullable: false, min: 0, initial: 0}),
            max: new fields.NumberField({nullable: false, min: 0, initial: 0})
          }, {required: false, initial: undefined})
        })
      })),
      groups: new fields.ArrayField(new fields.SchemaField({
        id: new fields.StringField({required: true, blank: false}),
        interval: new fields.NumberField({required: false, nullable: false, integer: true, min: 1, initial: undefined}),
        fadeIn: new fields.NumberField({required: false, nullable: false, initial: undefined}),
        fadeOut: new fields.NumberField({required: false, nullable: false, initial: undefined}),
        randomLayers: new fields.SchemaField({
          min: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined}),
          max: new fields.NumberField({required: false, nullable: false, min: 0, initial: undefined})
        }, {required: false, initial: undefined})
      })),
      mood: new fields.StringField({required: true, choices: Object.values(EmberSoundscape.MOODS), initial: "calm"}),
      timing: new fields.SchemaField({
        bpm: new fields.NumberField({required: false, nullable: false, integer: true, min: 1, initial: undefined}),
        bars: new fields.NumberField({required: false, nullable: false, integer: true, min: 1, initial: undefined}),
        sync: new fields.BooleanField({initial: false}),
        arranged: new fields.BooleanField({initial: true}),
        cycleGroup: new fields.StringField()
      }),
      oneShot: new fields.BooleanField({initial: false}),
      randomLayers: new fields.BooleanField({initial: true}),
      minLayers: new fields.NumberField({required: false, nullable: false, integer: true, min: 0, initial: undefined}),
      maxLayers: new fields.NumberField({required: false, nullable: false, integer: true, min: 0, initial: undefined})
    };
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _initialize(options) {
    super._initialize(options);
    if ( this.timing.sync && !this.groups.length ) {
      throw new Error(`The ${this.id} synchronized arrangement must define at least one group`);
    }

    // Arrangement timing
    this.timing.barSeconds = (60 * 4) / this.timing.bpm;

    // Group initialization
    this.groups = new Map(this.groups.map(group => {
      group.layers = [];
      return [group.id, group];
    }));

    // Layer initialization
    this.layers = new Map(this.layers.map(layer => {
      const t = layer.timing;
      const canLoop = !(t.pad || t.randomDelay);

      // Layer group
      if ( this.timing.sync ) {
        const group = this.groups.get(layer.group);
        if ( !group ) throw new Error(`Arrangement ${this.id} layer ${layer.id} does not define a group`);
        t.fadeIn ??= group.fadeIn;
        t.fadeOut ??= group.fadeOut;
        group.layers.push(layer);
      }

      // Layer timing
      t.loop ??= canLoop;

      // Fade floor: give every layer a minimum fade so individual clips never hard-cut
      // in/out (especially non-sync ambience). Preserves explicit values, including 0.
      const floor = EmberAudioArrangement.FADE_FLOOR;
      if ( floor > 0 ) {
        if ( t.fadeIn === undefined ) t.fadeIn = floor;
        if ( t.fadeOut === undefined ) t.fadeOut = floor;
      }
      return [layer.id, layer];
    }));
  }

  /* -------------------------------------------- */

  /**
   * Create an EmberAudioArrangement instance given a soundscape and arrangement configuration.
   * @param {EmberSoundscapeChannelConfiguration} state  The desired soundscape configuration
   * @param {object} arrangementData        Additional custom arrangement data
   * @returns {EmberAudioArrangement|null}  The constructed instance or null if the arrangement was not valid
   */
  static fromConfig({soundscapeId, arrangementId, mood, layers}={}, arrangementData={}) {
    const soundscape = Maestro.sound.soundscapes[soundscapeId];
    const arrangement = soundscape?.arrangements[arrangementId];
    if ( !arrangement ) return null;
    const defaultGroup = soundscape.groups?.[0]?.id || undefined;

    // Prepare layers data
    layers = Object.entries(layers || arrangement.layers).map(([layerId, config]) => {
      const segment = soundscape.segments[layerId];
      if ( !segment ) {
        throw new Error(`Ember | Invalid layer "${layerId}" defined in soundscape "${soundscapeId}.${arrangementId}"`);
      }
      if ( segment.soundscape ) {
        const segmentSoundscape = Maestro.sound.soundscapes[segment.soundscape];
        Object.assign(segment, {path: segmentSoundscape.src}, segmentSoundscape.segments[layerId]);
      }
      const layer = Object.assign({id: layerId}, segment, typeof config === "number" ? {volume: config} : config);
      layer.src = [layer.path ?? soundscape.src, layer.src].filterJoin("/").replace(/([^:]\/)\/+/g, "$1");
      layer.group ??= defaultGroup;
      delete layer.path;
      return layer;
    });

    // Construct the EmberAudioArrangement instance
    return new this(foundry.utils.mergeObject({
      id: arrangementId,
      soundscape: soundscape.id,
      label: arrangement.label,
      groups: soundscape.groups,
      layers,
      mood,
      timing: soundscape.timing,
      oneShot: soundscape.oneShot ?? false,
      randomLayers: soundscape.randomLayers,
      minLayers: arrangement.minimum,
      maxLayers: arrangement.maximum
    }, arrangementData));
  }

  /* -------------------------------------------- */

  /**
   * A string that is used to uniquely identify the arrangement.
   * @returns {string}
   */
  toString() {
    return `${this.soundscape}.${this.id}`;
  }
}/**
 * @typedef EmberSoundscapeChannelConfiguration
 * @property {string|null} soundscapeId
 * @property {string|null} arrangementId
 * @property {string} [mood="calm"]
 * @property {Record<string, number>} [layers]
 */

/**
 * @typedef EmberSoundscapeConfiguration
 * @property {EmberSoundscapeChannelConfiguration} music
 * @property {EmberSoundscapeChannelConfiguration} environment
 * @property {EmberSoundscapeChannelConfiguration} weather
 * @property {EmberSoundscapeChannelConfiguration} effects
 */

class EmberSoundscape {
  constructor() {
    if ( Maestro.sound ) throw new Error("The singleton EmberSoundscape instance is already constructed.");
    this.#soundscapes = soundscapes;
    Hooks.on("updatePlaylist", (...args) => this.#onUpdatePlaylist(...args));
    Hooks.on("updatePlaylistSound", (...args) => this.#onUpdatePlaylistSound(...args));
  }

  /**
   * The data schema for the persisted soundscape state.
   * @type {foundry.data.fields.SchemaField}
   */
  static STATE_SCHEMA = new foundry.data.fields.SchemaField({
    music: new foundry.data.fields.SchemaField({
      soundscapeId: new foundry.data.fields.StringField({blank: false, nullable: true, initial: null}),
      arrangementId: new foundry.data.fields.StringField({blank: false, nullable: true, initial: null}),
      mood: new foundry.data.fields.StringField({blank: false, initial: "calm"})
    }),
    environment: new foundry.data.fields.SchemaField({
      soundscapeId: new foundry.data.fields.StringField({blank: false, nullable: true, initial: null}),
      arrangementId: new foundry.data.fields.StringField({blank: false, nullable: true, initial: null})
    })
  });

  /**
   * Current overrides which apply to state.
   * @type {Partial<EmberSoundscapeConfiguration>}
   */
  #overrides = {};

  /**
   * Has the soundscape received a first-time initialization this session?
   * Subsequent activations can take a diff-based approach to incrementally refresh channels.
   * @type {boolean}
   */
  #initialized = false;

  /**
   * The current configured Ember soundscape state.
   * @type {EmberSoundscapeConfiguration}
   */
  get state() {
    return this.#state;
  }

  #state = {};

  /**
   * The master Ember soundscape playlist.
   * @type {Playlist}
   */
  playlist;

  /**
   * The sound channels of the Ember master playlist
   * @enum {PlaylistSound}
   */
  channels = {
    effects: undefined,
    environment: undefined,
    music: undefined,
    weather: undefined
  };

  /**
   * The EmberSoundOrchestration instances for each channel
   * @enum {EmberSoundOrchestration}
   */
  containers = {
    effects: undefined,
    environment: undefined,
    music: undefined,
    weather: undefined
  };

  /* -------------------------------------------- */

  /**
   * Ember soundscape configuration
   * @enum {object}
   */
  get soundscapes() {
    return this.#soundscapes;
  }

  #soundscapes;

  /* -------------------------------------------- */

  /**
   * An enumeration of supported soundscape moods.
   * @enum {string}
   */
  static MOODS = Object.freeze({
    CALM: "calm",
    TENSION: "tension"
  });

  /**
   * The current music mood.
   * @type {string}
   */
  get mood() {
    return this.#overrides.music?.mood ?? this.#state.music?.mood ?? "calm";
  }

  /* -------------------------------------------- */

  /**
   * One-time initialization to reference playlist sounds.
   */
  initialize() {
    this.#overrides = this.#initializeState(game.settings.get("cavril-maestro", "state") || {});
    this.#state = foundry.utils.deepClone(this.#overrides);
    this.playlist = game.playlists.get(Maestro.CONST.PLAYLIST_ID);
    Object.assign(this.channels, {
      effects: this.playlist.sounds.get(Maestro.CONST.EFFECTS_SOUND_ID),
      environment: this.playlist.sounds.get(Maestro.CONST.ENVIRONMENT_SOUND_ID),
      music: this.playlist.sounds.get(Maestro.CONST.MUSIC_SOUND_ID),
      weather: this.playlist.sounds.get(Maestro.CONST.WEATHER_SOUND_ID)
    });
  }

  /* -------------------------------------------- */

  /**
   * Initialize audio state from the persisted soundscape setting.
   * @param state
   */
  #initializeState(state) {
    for ( const channel of ["music", "environment"] ) {
      state[channel] ||= {};
      state[channel].soundscapeId ??= null;
      state[channel].arrangementId ??= null;
    }
    state.music.mood ||= "calm";
    return state;
  }

  /* -------------------------------------------- */

  /**
   * Prepare an active soundscape configuration.
   * Start with the configuration for the current Scene, but then override that configuration with any explicit state.
   * @param {EmberSceneManager} [scene]                 A specific scene
   * @returns {EmberSoundscapeConfiguration}            A prepared output configuration
   */
  getActiveConfiguration(scene) {
    scene ??= canvas?.scene;
    const config = Maestro.readSceneConfiguration(scene);
    for ( const [k, v] of Object.entries(this.#overrides) ) {
      if ( v?.soundscapeId && v?.arrangementId ) config[k] = v;
    }
    if ( this.#overrides.music?.mood ) config.music.mood = this.#overrides.music.mood;
    return config;
  }

  /* -------------------------------------------- */

  /**
   * Activate the soundscape for the current scene.
   * First activation creates each channel; subsequent activations diff against current state, calling updateChannel.
   * @returns {Promise<void>}
   */
  async activate() {
    await game.audio.unlock;

    // One-time initialization of soundscape containers
    for ( const [channel, playlistSound] of Object.entries(this.channels) ) {
      if ( this.containers[channel] ) continue;
      const container = new EmberSoundOrchestration(null, {channel, playlistSound});
      playlistSound.sound = this.containers[channel] = container;
      await container.load(); // Does nothing, but needed for the Container to be treated as ready
    }

    // Compute target configuration
    const scene = canvas?.scene;
    const nextConfig = this.getActiveConfiguration(scene);

    // First activation
    if ( !this.#initialized ) await this.#initialize(nextConfig);

    // Subsequent activation
    else {
      const prior = foundry.utils.deepClone(this.#state);
      Object.assign(this.#state, nextConfig);
      const changed = foundry.utils.diffObject(prior, this.#state);
      for ( const channel in changed ) this.updateChannel(channel, this.#state[channel]);
    }

    // Downstream callback actions
    ui.playlists.render();
    // Ember scenes defined a downstream hook here; core scenes do not. Guard for standalone use.
    if ( typeof scene?._onSoundscapeActivate === "function" ) await scene._onSoundscapeActivate();
  }

  /* -------------------------------------------- */

  /**
   * One-time initialization of soundscape channels.
   * @param {EmberSoundscapeConfiguration} nextConfig
   */
  async #initialize(nextConfig) {
    Object.assign(this.#state, nextConfig);
    for ( const [channel, container] of Object.entries(this.containers) ) {
      await this.#initializeChannel(container, this.#state[channel]);
    }
    window.setInterval(this.#debugCurrentPlaying, 500);
    this.#initialized = true;
  }

  /* -------------------------------------------- */

  /**
   * Stop playback of all soundscape channels.
   */
  async deactivate() {
    this.#initialized = false;
    window.clearInterval(this.#debugCurrentPlaying);
    return Promise.all(Object.values(this.containers).map(c => c.stop()));
  }

  /* -------------------------------------------- */

  /**
   * One time channel initialization that occurs upon first activation.
   * @param container
   * @param state
   * @returns {Promise<void>}
   */
  async #initializeChannel(container, state) {
    const playlistSound = this.channels[container.channel];
    const arrangement = playlistSound.playing ? EmberAudioArrangement.fromConfig(state) : null;
    await container.initialize(arrangement);
  }

  /* -------------------------------------------- */

  /**
   * Update an audio channel, changing the active layers.
   * @param {string} channel                  The channel name
   * @param {EmberSoundscapeChannelConfiguration} state  The channel playback state
   * @param {object} arrangementData          Data used to configure the EmberAudioArrangement
   */
  updateChannel(channel, state, arrangementData={}) {
    if ( game.audio.locked ) return;
    const container = this.containers[channel];
    if ( !container ) return;
    const playlistSound = this.channels[channel];
    const arrangement = playlistSound.playing ? EmberAudioArrangement.fromConfig(state, arrangementData) : null;
    const customLayers = !foundry.utils.isEmpty(arrangementData.layers);
    container.debounceInitialize(arrangement, customLayers);
  }

  /* -------------------------------------------- */

  /**
   * Handle updates to the Ember Soundscape playlist
   * @param document
   * @param change
   * @param options
   * @param userId
   */
  #onUpdatePlaylist(document, change, options, userId) {
    if ( (document !== this.playlist) || !("sounds" in change) ) return;
    for ( const c of change.sounds ) {
      const sound = document.sounds.get(c._id);
      this.#onUpdatePlaylistSound(sound, c, options, userId);
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle updates to PlaylistSound documents to begin playback for Ember-managed audio.
   * @param document
   * @param change
   * @param _options
   * @param _userId
   */
  #onUpdatePlaylistSound(document, change, _options, _userId) {
    if ( (document.parent !== this.playlist) || !("playing" in change) ) return;
    const channel = Object.entries(this.channels).find(c => c[1] === document)[0];
    if ( !channel ) return;
    const config = Maestro.sound.getActiveConfiguration(canvas?.scene);
    if ( !config ) return;
    return this.updateChannel(channel, config[channel]);
  }

  /* -------------------------------------------- */

  /**
   * Update debugging HTML for currently playing sound containers.
   */
  #debugCurrentPlaying() {
    const cp = document.querySelector("#playlists .currently-playing");
    if ( !cp ) return;
    for ( const [channel, playlistSound] of Object.entries(Maestro.sound.channels) ) {
      const li = cp.querySelector(`li.sound[data-sound-id="${playlistSound.id}"]`);
      if ( !li || (li.dataset.playlistId !== Maestro.CONST.PLAYLIST_ID) ) continue;
      let debug = li.querySelector(".ember-debug");

      // Get audio container
      const orchestration = Maestro.sound.containers[channel];
      const arrangement = orchestration?.arrangement;
      if ( !orchestration?.playing || !arrangement || !orchestration.layers.size ) {
        debug?.remove();
        continue;
      }
      const ct = orchestration.context.currentTime;

      // Construct HTML if it does not yet exist
      if ( !debug ) {
        debug = document.createElement("section");
        debug.classList.add("ember", "ember-debug");
        li.appendChild(debug);
      }

      // Organize playing layers into an alphabetically sorted array
      const playing = CONFIG.debug.soundscape ? orchestration.layers.reduce((arr, layer) => {
        const {group, sound, timing} = layer;
        const playedTime = ct - sound.startTime;
        if ( !playedTime ) return arr;

        // Duration in seconds
        let duration = timing.duration;
        let current = playedTime % duration;
        let timeSuffix = "s";

        // Duration in bars
        if ( timing.bars ) {
          current *= (timing.bars / timing.duration);
          duration = timing.bars;
          timeSuffix = "b";
        }

        // Label
        let label = layer.id;
        if ( group && (arrangement.groups.size > 1) ) label += ` (${group})`;
        arr.push({layer: layer.id, label, volume: sound.volume, current, duration, timeSuffix});
        return arr;
      }, []).sort((a, b) => a.layer.localeCompare(b.layer)) : [];

      // Update HTML
      let html = `<strong>${orchestration.arrangement?.label || orchestration.config.label}</strong>`;
      if ( playing.length ) {
        html += "<ul class=\"plain\">";
        for ( const p of playing ) {
          html += `<li class="flexrow">
          <label>${p.label}</label>
          <span class="time">(${p.current.toFixed(2)}/${Math.round(p.duration)}${p.timeSuffix})</span>
          <span class="volume">${p.volume.toFixed(2)}</span>
        </li>`;
        }
        html += "</ul>";
      }
      debug.innerHTML = html;
    }
  }

  /* -------------------------------------------- */

  _createMoodSelector() {
    if ( !game.user.isGM ) return;

    // Create the mood selector
    if ( !document.getElementById("ember-mood") ) {
      const cp = document.querySelector("#playlists .currently-playing");
      if ( !cp ) return;

      const form = document.createElement("form");
      form.id = "ember-mood";
      form.classList.add("ember", "global-control", "standard-form");
      form.innerHTML = `
    <header class="playlist-header"><strong>Ember Music</strong></header>
    <div class="form-group">
        <select name="music"></select>
        <a class="control arrange fa-solid fa-shuffle" data-tooltip="Rearrange Music"></a>
    </div>
    <div class="form-group"><select name="mood"></select></div>
    <header class="playlist-header"><strong>Ember Environment</strong></header>
    <div class="form-group"><select name="environment"></select></div>`;
      cp.before(form);

      // Interactivity
      form.addEventListener("change", this.#onChangeSoundscapeForm.bind(this));
      form.querySelector(".arrange").addEventListener("click", this.#onClickRearrange.bind(this));
    }

    // Set current options
    this.#updateSoundscapeForm();
  }

  /* -------------------------------------------- */

  /**
   * Update the mood options which are available when the music soundscape changes.
   */
  #updateSoundscapeForm() {
    if ( !game.user.isGM ) return;
    const form = document.getElementById("ember-mood");
    if ( !form || !this.containers.music ) return; // Too early
    const csi = foundry.applications.fields.createSelectInput;
    const {music, environment} = this.#overrides;

    // Soundscapes
    const options = {music: [], environment: []};
    for ( const s of Object.values(this.soundscapes) ) {
      if ( !["music", "environment"].includes(s.type) ) continue;
      const arr = Object.entries(s.arrangements).map(([id, {label}]) => {
        return {value: `${s.id}.${id}`, label, group: s.label};
      });
      options[s.type].push(...arr);
    }

    // Music
    const musicValue = music.soundscapeId ? `${music.soundscapeId}.${music.arrangementId}` : "";
    const musicSelect = csi({value: musicValue, options: options.music, blank: "Ember Default", sort: true});
    form.music.innerHTML = musicSelect.innerHTML;

    // Environment
    const envValue = environment.soundscapeId ? `${environment.soundscapeId}.${environment.arrangementId}` : "";
    const envSelect = csi({value: envValue, options: options.environment, blank: "Ember Default", sort: true});
    form.environment.innerHTML = envSelect.innerHTML;

    // Mood
    const moods = Object.values(EmberSoundscape.MOODS).map(k => {
      return {value: k, label: _loc(`EMBER.SoundscapeMood${k.titleCase()}`)};
    });
    const moodSelect = csi({value: this.mood, options: moods});
    form.mood.innerHTML = moodSelect.innerHTML;
    form.mood.disabled = !!music.soundscapeId;
    form.mood.parentElement.classList.toggle("hidden", form.mood.disabled);
  }

  /* -------------------------------------------- */

  /**
   * Handle button clicks to rearrange the playlist.
   * @param event
   * @returns {Promise<void>}
   */
  async #onClickRearrange(event) {
    event.preventDefault();
    const button = event.currentTarget;
    button.className = "control arrange fa-solid fa-spinner fa-spin";
    button.toggleAttribute("disabled", true);
    await this.containers.music.arrange();
    button.className = "control arrange fa-solid fa-shuffle";
    button.toggleAttribute("disabled", false);
  }

  /* -------------------------------------------- */

  /**
   * Handle changes to the Ember soundscape control form.
   * @param {InputEvent} event
   * @returns {Promise<void>}
   */
  async #onChangeSoundscapeForm(event) {
    event.preventDefault();
    if ( !game.user.isGM ) throw new Error("You do not have permission to customize the Ember soundscape");
    const {name, value} = event.target;

    // Music
    if ( name === "music") {
      const music = {soundscapeId: null, arrangementId: null};
      if ( value ) {
        const [soundscapeId, arrangementId] = value.split(".");
        Object.assign(music, {soundscapeId, arrangementId});
      }
      await Maestro.sound.setState({music});
    }

    // Environment
    else if ( name === "environment") {
      const environment = {soundscapeId: null, arrangementId: null};
      if ( value ) {
        const [soundscapeId, arrangementId] = value.split(".");
        Object.assign(environment, {soundscapeId, arrangementId});
      }
      await Maestro.sound.setState({environment});
    }

    // Mood
    else if ( name === "mood" ) await Maestro.sound.setMood(value);
  }

  /* -------------------------------------------- */

  /**
   * Handle changes to the server-persisted soundscape state.
   * @param {Partial<EmberSoundscapeConfiguration>} overrides   The desired soundscape override state
   */
  onChange(overrides={}) {
    const prior = foundry.utils.deepClone(this.#state);
    this.#overrides = this.#initializeState(overrides);
    Object.assign(this.#state, this.getActiveConfiguration());
    const changed = foundry.utils.diffObject(prior, this.#state);
    for ( const channel in changed ) Maestro.sound.updateChannel(channel, this.#state[channel]);
    this.#updateSoundscapeForm();
  }

  /* -------------------------------------------- */

  /**
   * @typedef {object} EmberSceneSoundConfiguration
   * @property {string} soundscape
   * @property {string} [arrangementId]
   * @property {Object<string>} [arrangements]
   * @property {string} [mood]
   */

  /**
   * Get the soundscape state for the vista based on the current mood and time of day.
   * @param {EmberSceneSoundConfiguration} config   Sound configuration for this area
   * @returns {EmberSoundscapeChannelConfiguration}
   */
  getArrangement(config={}) {
    if ( !config.soundscape ) return {soundscapeId: null, arrangementId: null};
    if ( config.soundscape && config.arrangementId ) return {
      soundscapeId: config.soundscape,
      arrangementId: config.arrangementId
    };
    let mood = config.mood ?? Maestro.sound.mood;
    const arrangements = config.arrangements || {};
    if ( !(mood in arrangements) || (mood === Maestro.sound.constructor.MOODS.CALM) ) {
      mood = Maestro.dayPhase();
    }
    return {soundscapeId: config.soundscape, arrangementId: arrangements[mood]};
  }

  /* -------------------------------------------- */

  /**
   * Get an object of choices which can be selected as a target soundscape.
   * @returns {Record<string, string>}
   */
  getChoices() {
    return Object.values(soundscapes).reduce((obj, s) => {
      obj[s.id] = s.label;
      return obj;
    }, {});
  }

  /* -------------------------------------------- */

  /**
   * Override the Ember soundscape to force certain soundscape, arrangement, or mood.
   * It is important to note that this command is only available to a GM user. Therefore, it is important in an
   * Event hook to make sure that only the designated GM user performs this command.
   * @param {Partial<EmberSoundscapeConfiguration>} change
   * @returns {Promise<void>}
   *
   * @example Play "Ooze Combat" music
   * ```js
   * await Maestro.sound.setState({music: {soundscapeId: "oozeCombat", arrangementId: "weird"}});
   * ```
   *
   * @example Begin the Helkas Festival, changing both music and environment
   * ```js
   * await Maestro.sound.setState({
   *   music: {soundscapeId: "arcturianFolk", arrangementId: "helkasFestival"},
   *   environment: {soundscapeId: "emberEnvironment", arrangementId: "helkasFestival"}
   * });
   * ```
   *
   * @example Usage inside the Event "begin" hook
   * ```js
   * if ( options.gmUser.isSelf ) {
   *   Maestro.sound.setState({environment: {soundscapeId: "emberEnvironment", arrangementId: "helkasAttackDrakes"}});
   * }
   * ```
   */
  async setState(change) {
    const overrides = foundry.utils.deepClone(this.#overrides);
    foundry.utils.mergeObject(overrides, change);
    await game.settings.set("cavril-maestro", "state", overrides);
  }

  /* -------------------------------------------- */

  /**
   * Reset the Ember soundscape back to its default configuration and mood.
   * @returns {Promise<void>}
   */
  async resetState() {
    await game.settings.set("cavril-maestro", "state", this.#initializeState({}));
  }

  /* -------------------------------------------- */

  /**
   * Change the soundscape mood for all players.
   * @param {EmberSoundscape.MOODS} mood
   * @returns {Promise<void>}
   */
  async setMood(mood) {
    return this.setState({music: {mood}});
  }

  /* -------------------------------------------- */
  /*  Local Actions or Overrides                  */
  /* -------------------------------------------- */

  /**
   * Override the playing soundscape state for the current client only.
   * @param {EmberSoundscapeConfiguration} state
   */
  localOverrideState(state) {
    state = this.#initializeState(state);
    this.onChange(state);
  }

  /* -------------------------------------------- */

  /**
   * Reset any local override state that was applied for the current client.
   */
  localResetState() {
    this.onChange({});
  }

  /* -------------------------------------------- */

  /**
   * Play a "click" sound that provides tactile feedback for user interactions.
   * @returns {Promise<void>}
   */
  async playClick() {
    const src = "environment/foley/one-shots/generic-interact.ogg";
    await game.audio.play(src, {volume: 0.8, context: game.audio.interface});
  }

  /* -------------------------------------------- */
  /*  Combat Music                                */
  /* -------------------------------------------- */

  static COMBAT_THEMES = {
    aberration: "abyssalCombat",
    beast: "beastCombat",
    celestial: "celestialCombat",
    construct: "constructCombat",
    dragon: "mutagenicCombat",
    elemental: "elementalCombat",
    elementalEarth: "elementalCombat",
    elementalFire: "elementalCombat",
    elementalFrost: "elementalCombat",
    elementalStorm: "elementalCombat",
    fey: "illusoryCombat",
    fiend: "illusoryCombat",
    giant: "abyssalCombat",
    humanoid: "pirateCombat",
    monstrosity: "monstrosityCombat",
    ooze: "oozeCombat",
    outsider: "abyssalCombat",
    plant: "beastCombat",
    undead: "undeadCombat"
  };

  /* -------------------------------------------- */

  static async onAdvanceCombat(combat, prior, current) {
    if ( !game.users.activeGM?.isSelf ) return;
    if ( current.round === prior.round ) return; // Only change soundscape on round changes

    // Organize combatants by combat soundscape theme
    let hasThemes = false;
    const enemyThemes = {};
    for ( const c of combat.combatants ) {
      if ( c.defeated || (c.token?.disposition === CONST.TOKEN_DISPOSITIONS.FRIENDLY) || !c.actor ) continue;
      const sd = c.actor.system.details;
      const creatureType = game.system.id === "dnd5e" ? sd.type.value : sd.taxonomy?.category;
      const theme = c.actor.getFlag("ember", "combatTheme") || EmberSoundscape.COMBAT_THEMES[creatureType];
      if ( !theme ) continue;
      const level = game.system.id === "dnd5e" ? (sd.cr ?? sd.level) : c.actor.threat;
      enemyThemes[theme] ||= {n: 0, level: 0, s: 0};
      enemyThemes[theme].n++;
      enemyThemes[theme].level += level;
      enemyThemes[theme].s = Math.max(c.token.width, enemyThemes[theme].s);
      hasThemes = true;
    }

    // Treat the combat as over if there are no remaining adversaries
    if ( !hasThemes ) {
      await EmberSoundscape.onDeleteCombat(combat);
      await combat.unsetFlag("ember", "priorSoundscape");
      return;
    }

    // Rank the most significant combat theme by (1) cumulative CR, (2) count, or (3) largest size
    const ranked = Object.entries(enemyThemes).sort((a, b) => {
      const at = a[1];
      const bt = b[1];
      return (bt.level - at.level) || (bt.n - at.n) || (bt.s - at.s);
    });

    // Begin playing the soundscape for the dominant theme
    if ( !combat.getFlag("ember", "priorSoundscape") ) {
      await combat.setFlag("ember", "priorSoundscape", Maestro.sound.#overrides);
    }
    const soundscapeId = ranked[0][0];
    const arrangementIds = Object.keys(soundscapes[soundscapeId].arrangements);
    const arrangementId = arrangementIds[Math.floor(Math.random() * arrangementIds.length)];
    await Maestro.sound.setState({music: {soundscapeId, arrangementId}});
  }

  /* -------------------------------------------- */

  static async onDeleteCombat(combat) {
    if ( !game.users.activeGM?.isSelf ) return;
    const priorState = combat.getFlag("ember", "priorSoundscape");
    if ( priorState ) await game.settings.set("cavril-maestro", "state", priorState);
  }

  /* -------------------------------------------- */
  /*  Journal Text Enricher                       */
  /* -------------------------------------------- */

  /**
   * Construct an HTML element for a [[/soundscape]] enricher tag.
   * @param {RegExpMatchArray} match
   * @returns {HTMLSpanElement|""}
   */
  static enricherHTML(match) {
    const parts = match[1].split(" ");
    const dataset = {};
    const impliedKeys = ["channel", "soundscapeId", "arrangementId", "mood"];
    for ( const [i, p] of parts.entries() ) {
      let key = impliedKeys[i];
      let value = p;
      if ( p.includes("=") ) {
        const param = p.split("=");
        key = param[0];
        value = param[1];
      }
      dataset[key] = value;
    }
    let label;
    dataset.channel ||= "music";

    // Reset channel to default
    if ( dataset.soundscapeId === "reset" ) {
      label = `${dataset.channel.capitalize()}: Reset`;
      delete dataset.arrangementId;
      delete dataset.mood;
    }

    // Set channel to specific soundscape
    else if ( dataset.soundscapeId ) {
      const soundscape = soundscapes[dataset.soundscapeId];
      if ( !soundscape ) return "";
      dataset.arrangementId ||= Object.keys(soundscape.arrangements)[0];
      const arrangement = soundscape?.arrangements?.[dataset.arrangementId];
      label = `${dataset.channel.capitalize()}: ${arrangement.label}`;
      if ( dataset.mood ) label += ` (${dataset.mood.titleCase()})`;
    }

    // Specific mood
    else if ( dataset.mood ) label = `Music Mood: ${dataset.mood.titleCase()}`;
    if ( !label ) return "";

    // Create HTML element
    const tag = document.createElement("enriched-content");
    tag.classList.add("enriched-soundscape");
    Object.assign(tag.dataset, dataset);
    tag.innerHTML = `<i class="fa-solid fa-music"></i> ${label}`;
    return tag;
  }

  /* -------------------------------------------- */

  /**
   * Handle left click events on soundscape control enricher buttons.
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async enricherClick(event) {
    const {channel, soundscapeId, arrangementId, mood} = event.target.dataset;
    if ( !channel ) return;
    const update = {};
    if ( soundscapeId === "reset" ) Object.assign(update, {soundscapeId: null, arrangementId: null});
    if ( soundscapeId && arrangementId ) Object.assign(update, {soundscapeId, arrangementId});
    if ( mood ) update.mood = mood;
    if ( foundry.utils.isEmpty(update) ) return;
    await Maestro.sound.setState({[channel]: update});
  }
}

export {EmberSoundOrchestration, EmberAudioArrangement, EmberSoundscape};
