var abyssalCombat = {
  id: "abyssalCombat",
  label: "Abyssal Combat",
  type: "music",
  src: "music/abyssal-combat",
  timing: {
    bpm: 149,
    bars: 16,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 32
    },
    {
      id: "main",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 2, max: 7}
    },
    {
      id: "long",
      interval: 16,
      fadeIn: 3,
      fadeOut: 3,
      randomLayers: {min: 0, max: 3}
    }
  ],
  segments: {
    bowedTransitions: {src: "bowed-transitions.ogg", group: "main"},
    brassLowClusterMelody: {src: "brass-low-cluster-melody.ogg", group: "main"},
    brassMidClusterMelody: {src: "brass-mid-cluster-melody.ogg", group: "main"},
    brassStabs: {src: "brass-stabs.ogg", group: "long"},
    breath: {src: "breath.ogg", group: "main"},
    celloCrescendo: {src: "cello-crescendo.ogg", group: "main"},
    celloScreechRhythm: {src: "cello-screech-rhythm.ogg", group: "main"},
    celloStabs: {src: "cello-stabs.ogg", group: "long"},
    choirDescendo: {src: "choir-descendo.ogg", group: "main"},
    choirFemaleChant: {src: "choir-female-chant.ogg", group: "main"},
    choirFemaleClusterRise: {src: "choir-female-cluster-rise.ogg", group: "main"},
    choirFemaleClusterSustain1: {src: "choir-female-cluster-sustain-1.ogg", group: "long"},
    choirFemaleClusterSustain2: {src: "choir-female-cluster-sustain-2.ogg", group: "main"},
    choirFemaleCrescendos: {src: "choir-female-crescendos.ogg", group: "main"},
    choirRhythm: {src: "choir-rhythm.ogg", group: "main"},
    choirWhispers: {src: "choir-whispers.ogg", group: "main"},
    darkHits: {src: "dark-hits.ogg", group: "long"},
    darkTransitions: {src: "dark-transitions.ogg", group: "main"},
    deepDrum: {src: "deep-drum.ogg", group: "main"},
    deepHits: {src: "deep-hits.ogg", group: "long"},
    deepVocalMelody: {src: "deep-vocal-melody.ogg", group: "main"},
    femaleVocalBend: {src: "female-vocal-bend.ogg", group: "main"},
    ghostStabs1: {src: "ghost-stabs-1.ogg", group: "main"},
    ghostStabs2: {src: "ghost-stabs-2.ogg", group: "long"},
    gongTransitions: {src: "gong-transitions.ogg", group: "long"},
    lowPulse1: {src: "low-pulse-1.ogg", group: "main"},
    lowPulse2: {src: "low-pulse-2.ogg", group: "main"},
    maleEvilChant1: {src: "male-evil-chant-1.ogg", group: "main"},
    maleEvilChant2: {src: "male-evil-chant-2.ogg", group: "main"},
    marchingDrum2: {src: "marching-drum-2.ogg", group: "main"},
    marchingDrums1: {src: "marching-drums-1.ogg", group: "main"},
    reverseTransitions: {src: "reverse-transitions.ogg", group: "long"},
    scaryTransitions: {src: "scary-transitions.ogg", group: "main"},
    soloVocalMelody: {src: "solo-vocal-melody.ogg", group: "main"},
    stringBend: {src: "string-bend.ogg", group: "main"},
    stringClusterRepetitions: {src: "string-cluster-repetitions.ogg", group: "long"},
    stringClusterRise: {src: "string-cluster-rise.ogg", group: "main"},
    stringCreepyRise: {src: "string-creepy-rise.ogg", group: "long"},
    stringsCrazy: {src: "strings-crazy.ogg", group: "main"},
    stringsHighClusterSustain: {src: "strings-high-cluster-sustain.ogg", group: "main"},
    stringsHighRhythm: {src: "strings-high-rhythm.ogg", group: "main"},
    stringsLowMelody: {src: "strings-low-melody.ogg", group: "main"},
    stringsLowRhythm: {src: "strings-low-rhythm.ogg", group: "main"},
    stringsMidMelody: {src: "strings-mid-melody.ogg", group: "main"},
    stringsMidRhythm: {src: "strings-mid-rhythm.ogg", group: "main"},
    synthBass: {src: "synth-bass.ogg", group: "main"},
    synthBendingOscillationHigh: {src: "synth-bending-oscillation-high.ogg", group: "main"},
    synthBendingOscillationLow: {src: "synth-bending-oscillation-low.ogg", group: "main"},
    synthSignatureSounds: {src: "synth-signature-sounds.ogg", group: "long"},
    tangelharpaSustain: {src: "tangelharpa-sustain.ogg", group: "main"},
    tremoloBends: {src: "tremolo-bends.ogg", group: "long"},
    vocalHighBends: {src: "vocal-high-bends.ogg", group: "long"},
    vocalHits: {src: "vocal-hits.ogg", group: "main"},
    vocalStab: {src: "vocal-stab.ogg", group: "main"},
    vocalWeirdPad: {src: "vocal-weird-pad.ogg", group: "long"},
    woodwindHighRip: {src: "woodwind-high-rip.ogg", group: "main"},
    woodwindLowRip: {src: "woodwind-low-rip.ogg", group: "main"},
    woodwindMidRip: {src: "woodwind-mid-rip.ogg", group: "main"}
  },
  arrangements: {
    abyssalFightMain: {
      label: "Abyssal Fight Main",
      layers: {
        deepDrum: 0.6,
        femaleVocalBend: 0.4,
        stringClusterRise: 0.6,
        stringsLowRhythm: 0.4,
        stringsMidRhythm: 0.4,
        stringsHighRhythm: 0.4,
        woodwindHighRip: 0.2,
        woodwindLowRip: 0.2,
        woodwindMidRip: 0.2,
        choirFemaleClusterSustain1: 0.4,
        stringsHighClusterSustain: 0.4,
        lowPulse1: 0.4,
        celloCrescendo: 0.2,
        choirFemaleClusterSustain2: 0.4,
        choirRhythm: 0.2,
        choirDescendo: 0.6,
        breath: 0.6,
        tangelharpaSustain: 0.4,
        marchingDrums1: 0.6,
        brassMidClusterMelody: 0.6,
        brassLowClusterMelody: 0.6,
        vocalHits: 0.6,
        celloScreechRhythm: 0.6,
        maleEvilChant1: 0.6,
        ghostStabs1: 0.6,
        stringBend: 0.6,
        scaryTransitions: 0.6,
        stringsLowMelody: 0.9,
        stringsMidMelody: 0.9,
        synthBass: 0.6,
        marchingDrum2: 0.6,
        soloVocalMelody: 1.0,
        gongTransitions: 0.6,
        deepVocalMelody: 1.0,
        stringsCrazy: 1.0
      }
    },
    abyssalFightRises: {
      label: "Abyssal Fight Rises",
      layers: {
        darkHits: 0.6,
        choirFemaleCrescendos: 0.6,
        synthSignatureSounds: 0.6,
        brassStabs: 0.6,
        stringCreepyRise: 0.6,
        maleEvilChant2: 0.6,
        choirFemaleClusterRise: 0.6,
        celloStabs: 0.6,
        choirFemaleChant: 0.6,
        choirWhispers: 0.6,
        darkTransitions: 0.6,
        reverseTransitions: 0.6,
        vocalHighBends: 0.6,
        tremoloBends: 0.6,
        ghostStabs2: 0.6,
        vocalWeirdPad: 0.6,
        deepHits: 0.6,
        synthBendingOscillationHigh: 0.6,
        synthBendingOscillationLow: 0.6,
        vocalStab: 0.6,
        stringClusterRepetitions: 0.6,
        bowedTransitions: 0.6,
        lowPulse2: 0.6
      }
    },
    abyssalFightInterlude: {
      label: "Abyssal Fight Interlude",
      layers: {
        darkTransitions: 0.6,
        scaryTransitions: 0.6,
        reverseTransitions: 0.6,
        gongTransitions: 0.6,
        breath: 0.6,
        vocalWeirdPad: 0.6,
        ghostStabs1: 0.6,
        ghostStabs2: 0.6,
        choirWhispers: 0.3,
        synthSignatureSounds: 0.6,
        lowPulse1: 0.4,
        lowPulse2: 0.6,
        stringsHighClusterSustain: 0.1,
        stringCreepyRise: 0.6,
        brassStabs: 0.6,
        darkHits: 0.6,
        deepHits: 0.6,
        vocalHits: 0.6,
        bowedTransitions: 0.6,
        vocalStab: 0.6,
        celloStabs: 0.6
      }
    }
  }
};var aedirTheme = {
  id: "aedirTheme",
  label: "Aedir Theme",
  type: "music",
  src: "music/aedir",
  timing: {
    bpm: 55,
    bars: 8,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 8,
      fadeIn: 12,
      fadeOut: 10,
      randomLayers: {min: 1, max: 5}
    }
  ],
  segments: {
    etherealHorns: {src: "ethereal-horns.ogg"},
    etherealCello: {src: "ethereal-cello.ogg"},
    etherealFlute: {src: "ethereal-flute.ogg"},
    etherealPad: {src: "ethereal-pad.ogg"},
    etherealStrings: {src: "ethereal-strings.ogg"},
    femaleHighAedir: {src: "female-high-aedir.ogg"},
    femaleLowAedir: {src: "female-low-aedir.ogg"},
    femaleMidAedir: {src: "female-mid-aedir.ogg"},
    harpArp: {src: "harp-arp.ogg"},
    pianoChords: {src: "piano-chords.ogg"}
  },
  arrangements: {
    aedirGarrisonExploration: {
      label: "Aedir Garrison Exploration",
      layers: {
        etherealHorns: 0.8,
        etherealCello: 0.8,
        etherealFlute: 0.8,
        etherealPad: 0.8,
        etherealStrings: 0.8,
        femaleHighAedir: 0.8,
        femaleLowAedir: 0.8,
        femaleMidAedir: 0.8,
        harpArp: 0.8,
        pianoChords: 0.8
      }
    }
  }
};var ancientRuins = {
  id: "ancientRuins",
  label: "Ancient Ruins",
  type: "music",
  src: "music/ancient-ruins",
  timing: {
    bpm: 120,
    bars: 24,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 24,
      fadeIn: 5,
      fadeOut: 5,
      randomLayers: {min: 2, max: 5}
    }
  ],
  segments: {
    cello1: {src: "cello-1.ogg"},
    deepRecorderFifths1: {src: "deep-recorder-fifths-1.ogg"},
    distantBrass1: {src: "distant-brass-1.ogg"},
    drippingSynth1: {src: "dripping-synth-1.ogg"},
    hummingManMelody1: {src: "humming-man-melody-1.ogg"},
    hybridFifths: {src: "hybrid-fifths.ogg"},
    lowMurmur1: {src: "low-murmur-1.ogg"},
    mechanicalSounds1: {src: "mechanical-sounds-1.ogg"},
    shiftingMetal1: {src: "shifting-metal-1.ogg"},
    softSynthDrone1: {src: "soft-synth-drone-1.ogg"},
    softVoices1: {src: "soft-voices-1.ogg"},
    soloViolinMelody1: {src: "solo-violin-melody-1.ogg"},
    stringMelody1: {src: "string-melody-1.ogg"},
    stringMelody2: {src: "string-melody-2.ogg"},
    stringTremolos1: {src: "string-tremolos-1.ogg"},
    synthArp1: {src: "synth-arp-1.ogg"},
    softVoices1Tension: {src: "soft-voices-1-tension.ogg"},
    soloViolinMelody1Tension: {src: "solo-violin-melody-1-tension.ogg"},
    stringMelody1Tension: {src: "string-melody-1-tension.ogg"},
    stringMelody2Tension: {src: "string-melody-2-tension.ogg"},
    stringTremolos1Tension: {src: "string-tremolos-1-tension.ogg"},
    synthArp1Tension: {src: "synth-arp-1-tension.ogg"},
    shiftingMetal1Tension: {src: "shifting-metal-1-tension.ogg"},
    hybridFifthsTension: {src: "hybrid-fifths-tension.ogg"},
    hummingManMelody1Tension: {src: "humming-man-melody-1-tension.ogg"},
    distantBrass1Tension: {src: "distant-brass-1-tension.ogg"},
    deepRecorderBends1Tension: {src: "deep-recorder-bends-1-tension.ogg"},
    cello1Tension: {src: "cello-1-tension.ogg"}
  },
  arrangements: {
    shentRuins: {
      label: "Shent Ruins",
      layers: {
        cello1: 0.7,
        deepRecorderFifths1: 0.7,
        distantBrass1: 0.7,
        drippingSynth1: 0.7,
        hummingManMelody1: 0.7,
        hybridFifths: 0.7,
        lowMurmur1: 0.7,
        mechanicalSounds1: 0.2,
        shiftingMetal1: 0.7,
        softSynthDrone1: 0.7,
        softVoices1: 0.7,
        soloViolinMelody1: 0.7,
        stringMelody1: 0.7,
        stringMelody2: 0.7,
        stringTremolos1: 0.7,
        synthArp1: 0.7
      }
    },
    shentRuinsTension: {
      label: "Shent Ruins Tension",
      layers: {
        cello1Tension: 0.7,
        deepRecorderBends1Tension: 0.7,
        distantBrass1Tension: 0.7,
        drippingSynth1: 0.7,
        hummingManMelody1Tension: 0.7,
        hybridFifthsTension: 0.7,
        lowMurmur1: 0.7,
        mechanicalSounds1: 0.3,
        shiftingMetal1Tension: 0.7,
        softSynthDrone1: 0.7,
        softVoices1Tension: 0.7,
        soloViolinMelody1Tension: 0.7,
        stringMelody1Tension: 0.7,
        stringMelody2Tension: 0.7,
        stringTremolos1Tension: 0.7,
        synthArp1Tension: 0.7
      }
    }
  }
};var ankaristTheme = {
  id: "ankaristTheme",
  label: "Ankarist Theme",
  type: "music",
  src: "music/ankarist-theme",
  timing: {
    bpm: 90,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 2,
      fadeOut: 4,
      randomLayers: {min: 4, max: 8}
    }
  ],
  segments: {
    bassEnsembleSwells: { src: "bass-ensemble-swells.ogg" },
    celloBasslineSwell: { src: "cello-bassline-swell.ogg" },
    celloMelody: { src: "cello-melody.ogg" },
    chappa: { src: "chappa.ogg" },
    cimbalomArpeggios: { src: "cimbalom-arpeggios.ogg" },
    distantDrums: { src: "distant-drums.ogg" },
    droneBassline: { src: "drone-bassline.ogg" },
    highViolinSwells: { src: "high-violin-swells.ogg" },
    pianoArpeggio: { src: "piano-arpeggio.ogg" },
    rhythmicStrings: { src: "rhythmic-strings.ogg" },
    violinMelody: { src: "violin-melody.ogg" }
  },
  arrangements: {
    ankaristTheme: {
      label: "Ankarist Theme",
      layers: {
        bassEnsembleSwells: 0.6,
        celloBasslineSwell: 0.6,
        celloMelody: 0.6,
        chappa: 0.6,
        cimbalomArpeggios: 0.6,
        distantDrums: 0.6,
        droneBassline: 0.6,
        highViolinSwells: 0.6,
        pianoArpeggio: 0.6,
        rhythmicStrings: 0.6,
        violinMelody: 0.6
      }
    }
  }
};var arcaneTheme = {
  id: "arcaneTheme",
  label: "Arcane Theme",
  type: "music",
  src: "music/arcane-theme",
  timing: {
    bpm: 65,
    bars: 12,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 4,
      fadeOut: 8,
      randomLayers: {min: 3, max: 6}
    }
  ],
  segments: {
    pluckingMotif: { src: "plucking-motif.ogg" },
    soloViolinMotif: { src: "solo-violin-motif.ogg" },
    warblingBass: { src: "warbling-bass.ogg" },
    slidingStrings1: { src: "sliding-strings-1.ogg" },
    slidingStrings2: { src: "sliding-strings-2.ogg" },
    bassDrone: { src: "bass-drone.ogg" },
    ambientPad: { src: "ambient-pad.ogg" },
    echoingStringChords: { src: "echoing-string-chords.ogg" },
    deepDrone: { src: "deep-drone.ogg" },
    atonalDrones: { src: "atonal-drones.ogg" },
    bowedStringPad: { src: "bowed-string-pad.ogg" },
    pluckedTensionMelody: { src: "plucked-tension-melody.ogg" },
    warblingBassTension: { src: "warbling-bass-tension.ogg" },
    repeatingPiano: { src: "repeating-piano.ogg" },
    synthDroneGrating: { src: "synth-drone-grating.ogg" },
    tensionMelodyBigSynth1: { src: "tension-melody-big-synth-1.ogg" },
    tensionMelodyBigSynth2: { src: "tension-melody-big-synth-2.ogg" },
    vocalStrangeness: { src: "vocal-strangeness.ogg" },
    weirdSynthMotif: { src: "weird-synth-motif.ogg" }
  },
  arrangements: {
    arcaneThemeCalm: {
      label: "Arcane Theme Calm",
      layers: {
        pluckingMotif: 0.6,
        soloViolinMotif: 0.6,
        warblingBass: 0.6,
        slidingStrings1: 0.6,
        slidingStrings2: 0.4,
        bassDrone: 0.6,
        ambientPad: 0.6,
        echoingStringChords: 0.6
      }
    },
    arcaneThemeTension: {
      label: "Arcane Theme Tension",
      layers: {
        deepDrone: 0.6,
        atonalDrones: 0.6,
        bowedStringPad: 0.6,
        pluckedTensionMelody: 0.6,
        warblingBassTension: 0.6,
        repeatingPiano: 0.6,
        synthDroneGrating: 0.6,
        tensionMelodyBigSynth1: 0.6,
        tensionMelodyBigSynth2: 0.6,
        vocalStrangeness: 0.6,
        weirdSynthMotif: 0.6,
        soloViolinMotif: 0.6
      }
    }
  }
};var arcturianFolk = {
  id: "arcturianFolk",
  label: "Arcturian Folk",
  type: "music",
  src: "music/arcturian-folk",
  timing: {
    bpm: 120,
    bars: 8,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 6, max: 8}
    }
  ],
  segments: {
    bigDrums: {src: "big-drums.ogg"},
    cello1: {src: "cello-1.ogg"},
    cello2: {src: "cello-2.ogg"},
    celloRepetition: {src: "cello-repetition.ogg"},
    claves: {src: "claves.ogg"},
    cymbals: {src: "cymbals.ogg"},
    drumGroove: {src: "drum-groove.ogg"},
    flute1: {src: "flute-1.ogg"},
    flute2: {src: "flute-2.ogg"},
    guitarRhythm1: {src: "guitar-rhythm-1.ogg"},
    guitarRhythm2: {src: "guitar-rhythm-2.ogg"},
    guitarRhythm3: {src: "guitar-rhythm-3.ogg"},
    guitarRhythm4: {src: "guitar-rhythm-4.ogg"},
    handPercussion1: {src: "hand-percussion-1.ogg"},
    handPercussion2: {src: "hand-percussion-2.ogg"},
    harp1: {src: "harp-1.ogg"},
    harp2: {src: "harp-2.ogg"},
    highConga: {src: "high-conga.ogg"},
    logDrum: {src: "log-drum.ogg"},
    marimba: {src: "marimba.ogg"},
    metalClack: {src: "metal-clack.ogg"},
    mountainDulcimer: {src: "mountain-dulcimer.ogg"},
    shaker: {src: "shaker.ogg"},
    soloCelloPizz: {src: "solo-cello-pizz.ogg"},
    soloViola: {src: "solo-viola.ogg"},
    soloViolin1: {src: "solo-violin-1.ogg"},
    soloViolin2: {src: "solo-violin-2.ogg"},
    timpani: {src: "timpani.ogg"},
    violDaGamba: {src: "viol-da-gamba.ogg"},
    woodStick: {src: "wood-stick.ogg"}
  },
  arrangements: {
    helkasFestival: {
      label: "Helkas Festival",
      layers: {
        bigDrums: 0.5,
        cello1: 0.6,
        cello2: 0.6,
        celloRepetition: 0.4,
        claves: 0.2,
        cymbals: 0.4,
        drumGroove: 0.4,
        flute1: 0.4,
        flute2: 0.4,
        guitarRhythm1: 0.2,
        guitarRhythm2: 0.2,
        guitarRhythm3: 0.2,
        guitarRhythm4: 0.4,
        handPercussion1: 0.4,
        handPercussion2: 0.4,
        harp1: 0.4,
        harp2: 0.4,
        highConga: 0.4,
        logDrum: 0.4,
        marimba: 0.4,
        metalClack: 0.4,
        mountainDulcimer: 0.4,
        shaker: 0.4,
        soloCelloPizz: 0.4,
        soloViola: 0.4,
        soloViolin1: 0.4,
        soloViolin2: 0.4,
        timpani: 0.4,
        violDaGamba: 0.4,
        woodStick: 0.3
      }
    }
  }
};var arcturianTown = {
  id: "arcturianTown",
  label: "Arcturian Town",
  type: "music",
  src: "music/arcturian-town",
  timing: {
    bpm: 110,
    bars: 12,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 12,
      fadeIn: 4,
      fadeOut: 5,
      randomLayers: {min: 3, max: 7}
    },
    {
      id: "less",
      interval: 12,
      fadeIn: 4,
      fadeOut: 5,
      randomLayers: {min: 0, max: 2}
    }
  ],
  segments: {
    anvil: {src: "anvil.ogg"},
    bowlMallet: {src: "bowl-mallet.ogg"},
    brassCall: {src: "brass-call.ogg"},
    dulcimer1: {src: "dulcimer-1.ogg"},
    dulcimer2: {src: "dulcimer-2.ogg"},
    dulcimerSad1: {src: "dulcimer-sad-1.ogg"},
    dulcimerSad2: {src: "dulcimer-sad-2.ogg"},
    dulcimerTension1: {src: "dulcimer-tension-1.ogg"},
    dulcimerTension2: {src: "dulcimer-tension-2.ogg"},
    femaleVocalSad: {src: "female-vocal-sad.ogg"},
    highStringSwell1: {src: "high-string-swell-1.ogg"},
    highStringSwell2: {src: "high-string-swell-2.ogg"},
    highStringSwellSad1: {src: "high-string-swell-sad-1.ogg"},
    highStringSwellSad2: {src: "high-string-swell-sad-2.ogg"},
    highStringSwellTension1: {src: "high-string-swell-tension-1.ogg"},
    highStringSwellTension2: {src: "high-string-swell-tension-2.ogg"},
    highStringsMelody: {src: "high-strings-melody.ogg"},
    lowBowedStrings: {src: "low-bowed-strings.ogg"},
    lowBowedStringsDrone: {src: "low-bowed-strings-drone.ogg"},
    lowStringsPizzicato: {src: "low-strings-pizzicato.ogg"},
    lowStringsPizzicatoTension: {src: "low-strings-pizzicato-tension.ogg"},
    malletRhythm1: {src: "mallet-rhythm-1.ogg"},
    malletRhythm2: {src: "mallet-rhythm-2.ogg"},
    midStringsMelody: {src: "mid-strings-melody.ogg"},
    steelPercussionTaps: {src: "steel-percussion-taps.ogg"},
    lowStringsOstinato: {src: "low-strings-ostinato.ogg"},
    midStringsOstinato: {src: "mid-strings-ostinato.ogg"},
    hurdyGurdy: {src: "hurdy-gurdy.ogg"},
    tremoloStringsHigh: {src: "tremolo-strings-high.ogg"},
    tremoloStringsMid: {src: "tremolo-strings-mid.ogg"},
    soloViolaMelody: {src: "solo-viola-melody.ogg"},
    highPizzicatoCounterMelody: {src: "high-pizzicato-counter-melody.ogg"},
    fluteCounterMelody: {src: "flute-counter-melody.ogg"},
    tremoloChords3: {src: "tremolo-chords-3.ogg"},
    tremoloChords2: {src: "tremolo-chords-2.ogg"},
    tremoloChords: {src: "tremolo-chords.ogg"},
    metalPercussion4: {src: "metal-percussion-4.ogg"},
    metalPercussion3: {src: "metal-percussion-3.ogg"},
    metalPercussion2: {src: "metal-percussion-2.ogg"},
    metalPercussion: {src: "metal-percussion.ogg"},
    marimbaSwells: {src: "marimba-swells.ogg"},
    hurdyChords: {src: "hurdy-chords.ogg"},
    tubaMelody: {src: "tuba-melody.ogg"},
    pizzicatoCounterMelody: {src: "pizzicato-countermelody.ogg"},
    doubleBassMelody: {src: "double-bass-melody.ogg"},
    contrabassoonMelody: {src: "contrabassoon-melody.ogg"},
    celloMelody: {src: "cello-melody.ogg"},
    bassoonMelody: {src: "bassoon-melody.ogg"},
    fastStringsLow1: {src: "fast-strings-low-1.ogg"},
    fastStringsLow2: {src: "fast-strings-low-2.ogg"},
    fastStringsHigh: {src: "fast-strings-high.ogg"},
    subDrone: {src: "sub-drone.ogg"},
    darkCelloMelody1: {src: "dark-cello-melody-1.ogg", group: "less"},
    darkCelloMelody2: {src: "dark-cello-melody-2.ogg", group: "less"},
    fluteMotif2: {src: "flute-motif-2.ogg", group: "less"},
    grainySwells: {src: "grainy-swells.ogg"},
    grainySwells2: {src: "grainy-swells-2.ogg"},
    creepyBends1: {src: "creepy-bends-1.ogg", group: "less"},
    darkCelloMelodyHarmony1: {src: "dark-cello-melody-harmony-1.ogg", group: "less"},
    darkCelloMelodyHarmony2: {src: "dark-cello-melody-harmony-2.ogg", group: "less"}
  },
  arrangements: {
    helkasDay: {
      label: "Helkas Day",
      layers: {
        anvil: 0.6,
        malletRhythm1: 0.6,
        malletRhythm2: 0.6,
        brassCall: 0.6,
        bowlMallet: 0.6,
        midStringsMelody: 0.6,
        dulcimer1: 0.6,
        dulcimer2: 0.6,
        steelPercussionTaps: 0.6,
        lowStringsOstinato: 0.6,
        midStringsOstinato: 0.6,
        hurdyGurdy: 0.3,
        tremoloStringsHigh: 0.6,
        tremoloStringsMid: 0.6,
        soloViolaMelody: 0.6,
        highPizzicatoCounterMelody: 1.0,
        fluteCounterMelody: 0.6
      }
    },
    helkasNight: {
      label: "Helkas Night",
      layers: {
        lowStringsPizzicato: 0.6,
        highStringSwell2: 0.6,
        highStringSwell1: 0.6,
        lowBowedStrings: 0.6,
        highStringsMelody: 0.4,
        dulcimer1: 0.6,
        dulcimer2: 0.6,
        bowlMallet: 0.6,
        highPizzicatoCounterMelody: 0.6,
        tremoloStringsHigh: 0.6,
        tremoloStringsMid: 0.6
      }
    },
    helkasTension: {
      label: "Helkas Tension",
      layers: {
        lowBowedStringsDrone: 0.4,
        lowStringsPizzicatoTension: 0.6,
        highStringSwellTension2: 0.6,
        highStringSwellTension1: 0.6,
        dulcimerTension1: 0.6,
        dulcimerTension2: 0.6,
        tremoloStringsHigh: 0.6,
        tremoloStringsMid: 0.6
      }
    },
    helkasSad: {
      label: "Helkas Sad",
      layers: {
        femaleVocalSad: 0.6,
        highStringSwellSad2: 0.6,
        highStringSwellSad1: 0.6,
        dulcimerSad1: 0.6,
        dulcimerSad2: 0.6,
        highStringsMelody: 0.6,
        lowBowedStringsDrone: 0.3,
        tremoloStringsHigh: 0.6,
        tremoloStringsMid: 0.6
      }
    },
    arcturelDay: {
      label: "Arcturel Day",
      layers: {
        anvil: 0.7,
        bowlMallet: 0.7,
        steelPercussionTaps: 1,
        tremoloStringsHigh: 0.7,
        tremoloStringsMid: 0.7,
        tremoloChords3: 0.9,
        tremoloChords2: 0.9,
        tremoloChords: 0.9,
        metalPercussion4: 1,
        metalPercussion3: 1,
        metalPercussion2: 1,
        metalPercussion: 1,
        marimbaSwells: 0.9,
        hurdyChords: 0.9,
        tubaMelody: 0.6,
        pizzicatoCounterMelody: 0.7,
        doubleBassMelody: 0.6,
        contrabassoonMelody: 0.6,
        celloMelody: 0.6,
        bassoonMelody: 0.6,
        fastStringsHigh: 0.5,
        fastStringsLow1: 0.5,
        fastStringsLow2: 0.5
      }
    },
    arcturelNight: {
      label: "Arcturel Night",
      layers: {
        bowlMallet: 0.7,
        tremoloStringsHigh: 0.7,
        tremoloStringsMid: 0.7,
        tremoloChords3: 0.9,
        tremoloChords2: 0.9,
        tremoloChords: 0.9,
        marimbaSwells: 0.9,
        hurdyChords: 0.9,
        pizzicatoCounterMelody: 0.7,
        highStringSwell2: 0.7,
        highStringSwell1: 0.7,
        lowBowedStrings: 0.7
      }
    },
    arcturelTension: {
      label: "Arcturel Tension",
      layers: {
        subDrone: 0.7,
        darkCelloMelody1: 0.7,
        darkCelloMelody2: 0.7,
        darkCelloMelodyHarmony1: 0.7,
        darkCelloMelodyHarmony2: 0.7,
        fluteMotif2: 0.8,
        grainySwells: 0.9,
        lowBowedStringsDrone: 0.9,
        highStringSwellTension2: 0.7,
        highStringSwellTension1: 0.7,
        tremoloStringsHigh: 0.4,
        tremoloStringsMid: 0.4,
        metalPercussion4: 1,
        metalPercussion3: 0.4,
        metalPercussion2: 1,
        metalPercussion: 1,
        anvil: 0.7,
        creepyBends1: 0.3,
        grainySwells2: 0.9
      }
    }
  }
};var arctusPlateauMusic = {
  id: "arctusPlateauMusic",
  label: "Arctus Plateau Music",
  type: "music",
  src: "music/arctus-plateau",
  timing: {
    bpm: 65,
    bars: 17,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 17,
      fadeIn: 12,
      fadeOut: 10,
      randomLayers: {min: 4, max: 10}
    }
  ],
  segments: {
    bassDrum: {src: "bass-drum.ogg"},
    bigPercussionEnsemble: {src: "big-percussion-ensemble.ogg"},
    cymbalSwell: {src: "cymbal-swell.ogg"},
    excitedStringMotif: {src: "excited-string-motif.ogg"},
    highBrassMotif: {src: "high-brass-motif.ogg"},
    lowBrassMotif: {src: "low-brass-motif.ogg"},
    risingStringPad: {src: "rising-string-pad.ogg"},
    rusticDrone: {src: "rustic-drone.ogg"},
    violDaGambaRhythm: {src: "viol-da-gamba-rhythm.ogg"},
    violinArpeggio: {src: "violin-arpeggio.ogg"},
    violinArpeggioSuspense: {src: "violin-arpeggio-suspense.ogg"},
    violinArpeggio2: {src: "violin-arpeggio-2.ogg"},
    risingStringPad1: {src: "rising-string-pad-1.ogg"},
    risingStringPad2: {src: "rising-string-pad-2.ogg"},
    risingStringPad3: {src: "rising-string-pad-3.ogg"},
    risingStringPad4: {src: "rising-string-pad-4.ogg"},
    risingStringPad1Suspense: {src: "rising-string-pad-1-suspense.ogg"},
    risingStringPad2Suspense: {src: "rising-string-pad-2-suspense.ogg"},
    risingStringPad3Suspense: {src: "rising-string-pad-3-suspense.ogg"},
    risingStringPad4Suspense: {src: "rising-string-pad-4-suspense.ogg"},
    violDaGambaRhythm1: {src: "viol-da-gamba-rhythm-1.ogg"},
    violDaGambaRhythm2: {src: "viol-da-gamba-rhythm-2.ogg"},
    altoFluteMelody: {src: "alto-flute-melody.ogg"},
    cimbalonTremolo1: {src: "cimbalon-tremolo-1.ogg"},
    cimbalonTremolo2: {src: "cimbalon-tremolo-2.ogg"},
    cimbalonTremolo3: {src: "cimbalon-tremolo-3.ogg"},
    cimbalonTremolo4: {src: "cimbalon-tremolo-4.ogg"},
    cimbalonTremolo1Suspense: {src: "cimbalon-tremolo-1-suspense.ogg"},
    cimbalonTremolo2Suspense: {src: "cimbalon-tremolo-2-suspense.ogg"},
    cimbalonTremolo3Suspense: {src: "cimbalon-tremolo-3-suspense.ogg"},
    cimbalonTremolo4Suspense: {src: "cimbalon-tremolo-4-suspense.ogg"},
    guitarRhythm: {src: "guitar-rhythm.ogg"},
    ronrocoMelody: {src: "ronroco-melody.ogg"},
    ronrocoMelodySuspense: {src: "ronroco-melody-suspense.ogg"},
    rusticDroneHigh: {src: "rustic-drone-high.ogg"},
    lowStringsAtonalRhythm: {src: "low-strings-atonal-rhythm.ogg"},
    midStringsAtonalRhythm: {src: "mid-strings-atonal-rhythm.ogg"},
    longGlissando: {src: "long-glissando.ogg"},
    ambientPad: {src: "ambient-pad.ogg"},
    cimbalonMotif: {src: "cimbalon-motif.ogg"},
    fluteMotif: {src: "flute-motif.ogg"},
    fluteMotif2: {src: "flute-motif-2.ogg"},
    guiro: {src: "guiro.ogg"},
    jungleFlute: {src: "jungle-flute.ogg"},
    logDrum: {src: "log-drum.ogg"},
    lowGrowl: {src: "low-growl.ogg"},
    strangePad1: {src: "strange-pad-1.ogg"},
    strangePad2: {src: "strange-pad-2.ogg"},
    strangeVocalSound: {src: "strange-vocal-sound.ogg"},
    tangelharpa: {src: "tangelharpa.ogg"},
    tangelharpa2: {src: "tangelharpa-2.ogg"},
    whisperingWood1: {src: "whispering-wood-1.ogg"},
    whisperingWood2: {src: "whispering-wood-2.ogg"},
    pluckedPianoMotif: {src: "plucked-piano-motif.ogg"},
    femaleVocal: {src: "female-vocal.ogg"},
    woodRhythm: {src: "wood-rhythm.ogg"},
    woodCresendo1: {src: "wood-cresendo-1.ogg"},
    woodCresendo2: {src: "wood-cresendo-2.ogg"},
    shaker: {src: "shaker.ogg"},
    mallets1: {src: "mallets-1.ogg"},
    mallets2: {src: "mallets-2.ogg"},
    cimbalonMotifTension: {src: "cimbalon-motif-tension.ogg"},
    fluteMotifTension: {src: "flute-motif-tension.ogg"},
    fluteMotifTension2: {src: "flute-motif-2-tension.ogg"},
    mallets1Tension: {src: "mallets-1-tension.ogg"},
    mallets2Tension: {src: "mallets-2-tension.ogg"},
    pluckedPianoMotifTension: {src: "plucked-piano-motif-tension.ogg"},
    strangePadTension1: {src: "strange-pad-1-tension.ogg"},
    strangePadTension2: {src: "strange-pad-2-tension.ogg"},
    cuatroMotif: {src: "cuatro-motif.ogg"},
    westAfricanPercussion: {src: "west-african-percussion.ogg"},
    woodPercussion: {src: "wood-percussion.ogg"},
    shaker2: {src: "shaker-2.ogg"},
    chamberStringPad1: {src: "chamber-string-pad-1.ogg"},
    chamberStringPad2: {src: "chamber-string-pad-2.ogg"},
    chamberStringPad3: {src: "chamber-string-pad-3.ogg"},
    chamberStringPad4: {src: "chamber-string-pad-4.ogg"},
    guitarMotif: {src: "guitar-motif.ogg"},
    harpMotif: {src: "harp-motif.ogg"},
    liuqinMotif: {src: "liuqin-motif.ogg"},
    soloViola1: {src: "solo-viola-1.ogg"},
    soloViola2: {src: "solo-viola-2.ogg"},
    soloCello: {src: "solo-cello.ogg"},
    soloFemaleVoice: {src: "solo-female-voice.ogg"},
    chamberStringMelody: {src: "chamber-string-melody.ogg"},
    didgeridoo: {src: "didgeridoo.ogg"},
    mountainDulcimer: {src: "mountain-dulcimer.ogg"},
    celloOctaves: {src: "cello-octaves.ogg"},
    chamberStringMelodyTension: {src: "chamber-string-melody-tension.ogg"},
    cuatroMotifTension: {src: "cuatro-motif-tension.ogg"},
    guitarMotifTension: {src: "guitar-motif-tension.ogg"},
    guitarRhythmBends: {src: "guitar-rhythm-bends.ogg"},
    gurdyBends: {src: "gurdy-bends.ogg"},
    harpMotifTension: {src: "harp-motif-tension.ogg"},
    highStringsArp: {src: "high-strings-arp.ogg"},
    liuqinMotifTension: {src: "liuqin-motif-tension.ogg"},
    midStringsArp: {src: "mid-strings-arp.ogg"},
    soloCelloTension: {src: "solo-cello-tension.ogg"},
    soloFemaleVoiceTension: {src: "solo-female-voice-tension.ogg"},
    soloViola1Tension: {src: "solo-viola-1-tension.ogg"},
    soloViola2Tension: {src: "solo-viola-2-tension.ogg"},
    stringDroneBends1: {src: "string-drone-bends-1.ogg"},
    stringDroneBends2: {src: "string-drone-bends-2.ogg"},
    tremoloString: {src: "tremolo-string.ogg"},
    violaOctaves: {src: "viola-octaves.ogg"},
    stringBends2Suspense: {src: "string-bends-2-suspense.ogg"},
    stringBends1Suspense: {src: "string-bends-1-suspense.ogg"},
    soloViolinMelodySuspense: {src: "solo-violin-melody-suspense.ogg"},
    soloViolin1: {src: "solo-violin-1.ogg"},
    soloCelloMelodySuspense: {src: "solo-cello-melody-suspense.ogg"},
    soloCelloMelody2: {src: "solo-cello-melody-2.ogg"},
    soloCelloMelody1: {src: "solo-cello-melody-1.ogg"},
    shortStringsLowSuspense: {src: "short-strings-low-suspense.ogg"},
    shortStringsLow: {src: "short-strings-low.ogg"},
    shortStringsHighSuspense: {src: "short-strings-high-suspense.ogg"},
    shortStringsHigh: {src: "short-strings-high.ogg"},
    shakuhachiSuspense: {src: "shakuhachi-suspense.ogg"},
    shakuhachi: {src: "shakuhachi.ogg"},
    recorderFifths2: {src: "recorder-fifths-2.ogg"},
    recorderFifths1: {src: "recorder-fifths-1.ogg"},
    recorder2Suspense: {src: "recorder-2-suspense.ogg"},
    recorder1Suspense: {src: "recorder-1-suspense.ogg"},
    panFluteSuspense: {src: "pan-flute-suspense.ogg"},
    panFlute: {src: "pan-flute.ogg"},
    metalPercussion: {src: "metal-percussion.ogg"},
    luteTremoloSuspense: {src: "lute-tremolo-suspense.ogg"},
    luteTremolo: {src: "lute-tremolo.ogg"},
    hornMelody: {src: "horn-melody.ogg"},
    guzheng: {src: "guzheng.ogg"},
    gamelanSuspense: {src: "gamelan-suspense.ogg"},
    gamelanGong: {src: "gamelan-gong.ogg"},
    gamelan: {src: "gamelan.ogg"},
    brassFifthsLow: {src: "brass-fifths-low.ogg"},
    brassFifthsHigh: {src: "brass-fifths-high.ogg"},
    brassBendsSuspense: {src: "brass-bends-suspense.ogg"},
    bassOboeFifths: {src: "bass-oboe-fifths.ogg"},
    celloCanyonMelody1: {src: "cello-canyon-melody-1.ogg"},
    celloCanyonMelody2: {src: "cello-canyon-melody-2.ogg"},
    evolvingRhythmicStrings2: {src: "evolving-rhythmic-strings-2.ogg"},
    guitarPlucksEchoing1: {src: "guitar-plucks-echoing-1.ogg"},
    guitarPlucksEchoing2: {src: "guitar-plucks-echoing-2.ogg"},
    guitarRandomPlucks: {src: "guitar-random-plucks.ogg"},
    hornCanyonMelody1: {src: "horn-canyon-melody-1.ogg"},
    evolvingRhythmicStrings1: {src: "evolving-rhythmic-strings-1.ogg"},
    highStringsTremoloBursts1: {src: "high-strings-tremolo-bursts-1.ogg"},
    hornCanyonMelody1Tension: {src: "horn-canyon-melody-1-tension.ogg"},
    highStringsTremoloBursts1Tension: {src: "high-strings-tremolo-bursts-1-tension.ogg"},
    guitarPlucksEchoing2Tension: {src: "guitar-plucks-echoing-2-tension.ogg"},
    guitarPlucksEchoing1Tension: {src: "guitar-plucks-echoing-1-tension.ogg"},
    fastStrings1: {src: "fast-strings-1.ogg"},
    fastStrings2: {src: "fast-strings-2.ogg"},
    celloCanyonMelody2Tension: {src: "cello-canyon-melody-2-tension.ogg"},
    celloCanyonMelody1Tension: {src: "cello-canyon-melody-1-tension.ogg"},
    hurdyGurdyMelody: {src: "hurdy-gurdy-melody.ogg"},
    luteTremoloMelody: {src: "lute-tremolo.ogg"},
    texturedDrone1: {src: "textured-drone-1.ogg"},
    hurdyFifths1: {src: "hurdy-fifths-1.ogg"},
    texturedDrone2: {src: "textured-drone-2.ogg"},
    hurdyFifths2: {src: "hurdy-fifths-2.ogg"},
    rusticStringSwells1: {src: "rustic-string-swells-1.ogg"},
    rusticStringSwells2: {src: "rustic-string-swells-2.ogg"},
    hurdyFifths1Suspense: {src: "hurdy-fifths-1-suspense.ogg"},
    hurdyFifths2Suspense: {src: "hurdy-fifths-2-suspense.ogg"},
    rusticStringArpeggio: {src: "rustic-string-arpeggio.ogg"},
    celloStrandCountermelody: { src: "cello-strand-countermelody.ogg" },
    celloStrandMelody: { src: "cello-strand-melody.ogg" },
    charangolinStrandMelody: { src: "charangolin-strand-melody.ogg" },
    doubleBassStrandCountermelody: { src: "double-bass-strand-countermelody.ogg" },
    doubleBassStrandMelody: { src: "double-bass-strand-melody.ogg" },
    drumsStrand: { src: "drums-strand.ogg" },
    guitarStrandMelody: { src: "guitar-strand-melody.ogg" },
    highPercussionStrand: { src: "high-percussion-strand.ogg" },
    violin2StrandCountermelody: { src: "violin-2-strand-countermelody.ogg" },
    violinStrandCountermelody: { src: "violin-strand-countermelody.ogg" },
    violinStrandMelody: { src: "violin-strand-melody.ogg" },
    zitherStrandMelody: { src: "zither-strand-melody.ogg" }
  },
  arrangements: {
    goldenFlatsDay: {
      label: "Golden Flats Day",
      layers: {
        bassDrum: 0.3,
        bigPercussionEnsemble: 0.3,
        cymbalSwell: 0.8,
        excitedStringMotif: 1.0,
        highBrassMotif: 1.0,
        lowBrassMotif: 1.0,
        risingStringPad1: 1.0,
        risingStringPad2: 1.0,
        risingStringPad3: 1.0,
        risingStringPad4: 1.0,
        rusticDrone: 1.0,
        violDaGambaRhythm1: 0.6,
        violDaGambaRhythm2: 0.6,
        violinArpeggio: 1.0,
        violinArpeggio2: 1.0,
        altoFluteMelody: 1.0,
        cimbalonTremolo1: 1.0,
        cimbalonTremolo2: 1.0,
        cimbalonTremolo3: 1.0,
        cimbalonTremolo4: 1.0,
        guitarRhythm: 1.0,
        ronrocoMelody: 1.0,
        rusticDroneHigh: 1.0
      }
    },
    goldenFlatsNight: {
      label: "Golden Flats Night",
      layers: {
        risingStringPad1: 1.0,
        risingStringPad2: 1.0,
        risingStringPad3: 1.0,
        risingStringPad4: 1.0,
        rusticDrone: 1.0,
        violinArpeggio: 0.6,
        violinArpeggio2: 0.6,
        altoFluteMelody: 1.0,
        ronrocoMelody: 1.0,
        rusticDroneHigh: 1.0
      }
    },
    goldenFlatsTension: {
      label: "Golden Flats Tension",
      layers: {
        risingStringPad1Suspense: 1.0,
        risingStringPad2Suspense: 1.0,
        risingStringPad3Suspense: 1.0,
        risingStringPad4Suspense: 1.0,
        rusticDrone: 1.0,
        violinArpeggioSuspense: 1.0,
        ronrocoMelodySuspense: 1.0,
        rusticDroneHigh: 1.0,
        bassDrum: 0.6,
        bigPercussionEnsemble: 0.6,
        cymbalSwell: 0.8,
        lowBrassMotif: 1.0,
        lowStringsAtonalRhythm: 1.0,
        midStringsAtonalRhythm: 1.0,
        longGlissando: 1.0
      }
    },
    bloodwoodsDay: {
      label: "Blood Woods Day",
      layers: {
        bassDrum: 0.6,
        risingStringPad1: 0.6,
        risingStringPad2: 0.6,
        risingStringPad3: 0.6,
        risingStringPad4: 0.6,
        rusticDrone: 1.0,
        ambientPad: 1.0,
        cimbalonMotif: 1.0,
        fluteMotif: 1.0,
        fluteMotif2: 1.0,
        guiro: 1.0,
        jungleFlute: 1.0,
        logDrum: 1.0,
        lowGrowl: 1.0,
        strangePad1: 1.0,
        strangePad2: 1.0,
        strangeVocalSound: 1.0,
        tangelharpa: 1.0,
        tangelharpa2: 1.0,
        whisperingWood1: 1.0,
        whisperingWood2: 1.0,
        rusticDroneHigh: 1.0,
        pluckedPianoMotif: 1.0,
        femaleVocal: 1.0,
        woodRhythm: 1.0,
        woodCresendo1: 1.0,
        woodCresendo2: 1.0,
        shaker: 1.0,
        mallets1: 1.0,
        mallets2: 1.0
      }
    },
    bloodwoodsNight: {
      label: "Blood Woods Night",
      layers: {
        risingStringPad1: 0.6,
        risingStringPad2: 0.6,
        risingStringPad3: 0.6,
        risingStringPad4: 0.6,
        rusticDrone: 1.0,
        ambientPad: 1.0,
        cimbalonMotif: 1.0,
        fluteMotif: 1.0,
        fluteMotif2: 1.0,
        jungleFlute: 1.0,
        lowGrowl: 1.0,
        strangePad1: 1.0,
        strangePad2: 1.0,
        strangeVocalSound: 1.0,
        whisperingWood1: 1.0,
        whisperingWood2: 1.0,
        rusticDroneHigh: 1.0,
        pluckedPianoMotif: 1.0,
        mallets1: 1.0,
        mallets2: 1.0
      }
    },
    bloodwoodsTension: {
      label: "Blood Woods Tension",
      layers: {
        risingStringPad1Suspense: 0.6,
        risingStringPad2Suspense: 0.6,
        risingStringPad3Suspense: 0.6,
        risingStringPad4Suspense: 0.6,
        rusticDrone: 1.0,
        rusticDroneHigh: 1.0,
        bassDrum: 0.6,
        lowStringsAtonalRhythm: 1.0,
        midStringsAtonalRhythm: 1.0,
        longGlissando: 1.0,
        guiro: 1.0,
        jungleFlute: 1.0,
        logDrum: 1.0,
        lowGrowl: 1.0,
        strangePad1: 1.0,
        strangePad2: 1.0,
        strangeVocalSound: 1.0,
        whisperingWood1: 1.0,
        whisperingWood2: 1.0,
        shaker: 1.0,
        woodRhythm: 1.0,
        woodCresendo1: 1.0,
        woodCresendo2: 1.0,
        cimbalonMotifTension: 1.0,
        fluteMotifTension: 1.0,
        fluteMotifTension2: 1.0,
        mallets1Tension: 1.0,
        mallets2Tension: 1.0,
        pluckedPianoMotifTension: 1.0,
        strangePadTension1: 1.0,
        strangePadTension2: 1.0
      }
    },
    redrakFieldsDay: {
      label: "Redrak Fields Day",
      layers: {
        cuatroMotif: 1.0,
        westAfricanPercussion: 1.0,
        woodPercussion: 1.0,
        shaker2: 1.0,
        chamberStringPad1: 1.0,
        chamberStringPad2: 1.0,
        chamberStringPad3: 1.0,
        chamberStringPad4: 1.0,
        guitarMotif: 1.0,
        harpMotif: 1.0,
        liuqinMotif: 1.0,
        soloViola1: 1.0,
        soloViola2: 1.0,
        soloCello: 1.0,
        soloFemaleVoice: 1.0,
        chamberStringMelody: 1.0,
        didgeridoo: 1.0,
        mountainDulcimer: 0.7,
        cimbalonTremolo1: 1.0,
        cimbalonTremolo2: 1.0,
        cimbalonTremolo3: 1.0,
        cimbalonTremolo4: 1.0,
        guitarRhythm: 1.0,
        rusticDrone: 1.0,
        rusticDroneHigh: 1.0,
        violDaGambaRhythm1: 0.6,
        violDaGambaRhythm2: 0.6,
        whisperingWood1: 1.0,
        whisperingWood2: 1.0,
        woodCresendo2: 0.4
      }
    },
    redrakFieldsNight: {
      label: "Redrak Fields Night",
      layers: {
        cuatroMotif: 1.0,
        chamberStringPad1: 1.0,
        chamberStringPad2: 1.0,
        chamberStringPad3: 1.0,
        chamberStringPad4: 1.0,
        guitarMotif: 1.0,
        harpMotif: 1.0,
        liuqinMotif: 1.0,
        soloViola1: 1.0,
        soloViola2: 1.0,
        soloCello: 1.0,
        soloFemaleVoice: 1.0,
        chamberStringMelody: 1.0,
        cimbalonTremolo1: 1.0,
        cimbalonTremolo2: 1.0,
        cimbalonTremolo3: 1.0,
        cimbalonTremolo4: 1.0,
        guitarRhythm: 1.0,
        rusticDrone: 1.0,
        rusticDroneHigh: 1.0,
        whisperingWood1: 1.0,
        whisperingWood2: 1.0
      }
    },
    redrakFieldsTension: {
      label: "Redrak Fields Tension",
      layers: {
        celloOctaves: 1.0,
        chamberStringMelodyTension: 1.0,
        cuatroMotifTension: 1.0,
        guitarMotifTension: 1.0,
        guitarRhythmBends: 1.0,
        gurdyBends: 1.0,
        harpMotifTension: 1.0,
        highStringsArp: 1.0,
        liuqinMotifTension: 1.0,
        midStringsArp: 1.0,
        soloCelloTension: 1.0,
        soloFemaleVoiceTension: 1.0,
        soloViola1Tension: 1.0,
        soloViola2Tension: 1.0,
        stringDroneBends1: 1.0,
        stringDroneBends2: 1.0,
        tremoloString: 1.0,
        violaOctaves: 1.0,
        cimbalonTremolo1: 1.0,
        rusticDrone: 1.0,
        rusticDroneHigh: 1.0,
        woodCresendo2: 1.0,
        violinArpeggioSuspense: 1.0
      }
    },
    rustvarValleyDay: {
      label: "Rustvar Valley Day",
      layers: {
        logDrum: 1.0,
        guitarRhythm: 0.6,
        rusticDrone: 0.6,
        rusticDroneHigh: 0.6,
        violaOctaves: 1.0,
        celloOctaves: 1.0,
        bassDrum: 0.3,
        soloViolin1: 0.4,
        soloCelloMelody1: 0.4,
        shortStringsLow: 0.4,
        shortStringsHigh: 0.4,
        shakuhachi: 0.4,
        recorderFifths1: 0.4,
        recorderFifths2: 0.4,
        panFlute: 0.4,
        metalPercussion: 0.4,
        luteTremolo: 0.4,
        guzheng: 0.4,
        gamelan: 0.4,
        gamelanGong: 0.4,
        brassFifthsLow: 0.4,
        brassFifthsHigh: 0.4,
        bassOboeFifths: 0.4,
        hornMelody: 0.4
      }
    },
    rustvarValleyNight: {
      label: "Rustvar Valley Night",
      layers: {
        rusticDrone: 0.6,
        rusticDroneHigh: 0.6,
        violaOctaves: 1.0,
        celloOctaves: 1.0,
        soloViolin1: 0.4,
        soloCelloMelody1: 0.4,
        shakuhachi: 0.4,
        recorderFifths1: 0.4,
        recorderFifths2: 0.4,
        panFlute: 0.4,
        luteTremolo: 0.4,
        guzheng: 0.4,
        gamelan: 0.4,
        gamelanGong: 0.4,
        brassFifthsLow: 0.4,
        brassFifthsHigh: 0.4,
        bassOboeFifths: 0.4,
        hornMelody: 0.4
      }
    },
    rustvarValleyTension: {
      label: "Rustvar Valley Tension",
      layers: {
        logDrum: 1.0,
        guitarRhythmBends: 1.0,
        bassDrum: 0.3,
        rusticDrone: 0.6,
        rusticDroneHigh: 0.6,
        violaOctaves: 1.0,
        celloOctaves: 1.0,
        stringBends2Suspense: 0.4,
        stringBends1Suspense: 0.4,
        soloViolinMelodySuspense: 0.4,
        soloCelloMelodySuspense: 0.4,
        shortStringsLowSuspense: 0.4,
        shortStringsHighSuspense: 0.4,
        shakuhachiSuspense: 0.4,
        recorder2Suspense: 0.4,
        recorder1Suspense: 0.4,
        panFluteSuspense: 0.4,
        luteTremoloSuspense: 0.4,
        gamelanSuspense: 0.4,
        brassBendsSuspense: 0.4,
        metalPercussion: 0.4
      }
    },
    splinterCanyonsDay: {
      label: "Splinter Canyons Day",
      layers: {
        celloCanyonMelody1: 0.6,
        celloCanyonMelody2: 0.6,
        evolvingRhythmicStrings2: 0.6,
        guitarPlucksEchoing1: 0.6,
        guitarPlucksEchoing2: 0.6,
        guitarRandomPlucks: 0.6,
        hornCanyonMelody1: 0.6,
        evolvingRhythmicStrings1: 0.6,
        highStringsTremoloBursts1: 0.6,
        strangePad1: 0.5,
        strangePad2: 0.5,
        violaOctaves: 0.6,
        bassDrum: 0.6,
        brassFifthsLow: 0.1,
        celloOctaves: 0.6,
        cimbalonTremolo1: 0.7,
        cimbalonTremolo2: 0.7,
        cimbalonTremolo3: 0.7,
        cimbalonTremolo4: 0.7,
        recorderFifths2: 0.3
      }
    },
    splinterCanyonsNight: {
      label: "Splinter Canyons Night",
      layers: {
        celloCanyonMelody1: 0.6,
        celloCanyonMelody2: 0.6,
        guitarPlucksEchoing1: 0.6,
        guitarPlucksEchoing2: 0.6,
        guitarRandomPlucks: 0.6,
        highStringsTremoloBursts1: 0.6,
        strangePad1: 0.5,
        strangePad2: 0.5,
        violaOctaves: 0.6,
        cimbalonTremolo1: 0.7,
        cimbalonTremolo2: 0.7,
        cimbalonTremolo3: 0.7,
        cimbalonTremolo4: 0.7,
        risingStringPad1: 0.6,
        risingStringPad2: 0.6,
        risingStringPad3: 0.6,
        risingStringPad4: 0.6,
        recorderFifths2: 0.3
      }
    },
    splinterCanyonsTension: {
      label: "Splinter Canyons Tension",
      layers: {
        hornCanyonMelody1Tension: 0.6,
        highStringsTremoloBursts1Tension: 0.6,
        guitarPlucksEchoing2Tension: 0.6,
        guitarPlucksEchoing1Tension: 0.6,
        fastStrings1: 0.3,
        fastStrings2: 0.3,
        celloCanyonMelody2Tension: 0.6,
        celloCanyonMelody1Tension: 0.6,
        violaOctaves: 0.6,
        bassDrum: 0.6,
        guitarRhythmBends: 1.0,
        lowStringsAtonalRhythm: 0.5,
        midStringsAtonalRhythm: 1.0,
        recorder1Suspense: 0.2,
        recorder2Suspense: 0.2,
        cymbalSwell: 1.0,
        cimbalonTremolo1: 0.7
      }
    },
    wedgelandsDay: {
      label: "Wedgelands Day",
      layers: {
        ambientPad: 0.2,
        celloOctaves: 0.5,
        cymbalSwell: 0.4,
        highStringsTremoloBursts1: 0.2,
        lowStringsAtonalRhythm: 0.3,
        recorderFifths2: 0.4,
        risingStringPad1: 0.3,
        risingStringPad2: 0.3,
        strangePad1: 0.4,
        strangePad2: 0.4,
        stringDroneBends1: 0.4,
        tangelharpa: 0.2,
        tangelharpa2: 0.5,
        violaOctaves: 0.5,
        whisperingWood1: 0.7,
        hurdyGurdyMelody: 0.7,
        luteTremoloMelody: 0.7,
        texturedDrone1: 0.7,
        hurdyFifths1: 0.7,
        texturedDrone2: 0.7,
        hurdyFifths2: 0.7,
        rusticStringSwells1: 0.7,
        rusticStringSwells2: 0.7
      }
    },
    wedgelandsNight: {
      label: "Wedgelands Night",
      layers: {
        ambientPad: 0.4,
        risingStringPad1: 0.4,
        risingStringPad2: 0.4,
        stringDroneBends1: 0.4,
        strangePad1: 0.5,
        strangePad2: 0.5,
        whisperingWood1: 0.7,
        luteTremoloMelody: 0.7,
        texturedDrone1: 0.7,
        texturedDrone2: 0.7,
        hurdyFifths1: 0.7,
        hurdyFifths2: 0.7,
        rusticStringSwells1: 0.7,
        rusticStringSwells2: 0.7
      }
    },
    wedgelandsTension: {
      label: "Wedgelands Tension",
      layers: {
        celloOctaves: 0.6,
        violaOctaves: 0.6,
        stringDroneBends1: 0.8,
        midStringsAtonalRhythm: 0.5,
        strangePadTension1: 0.6,
        strangePadTension2: 0.6,
        texturedDrone1: 0.7,
        texturedDrone2: 0.7,
        rusticStringArpeggio: 0.7,
        hurdyFifths1Suspense: 0.7,
        hurdyFifths2Suspense: 0.7,
        bassDrum: 0.3,
        recorder1Suspense: 0.2
      }
    },
    sarinStrandDay: {
      label: "Sarin Strand Day",
      layers: {
        celloStrandCountermelody: 0.3,
        celloStrandMelody: 0.3,
        charangolinStrandMelody: 0.35,
        doubleBassStrandCountermelody: 0.35,
        doubleBassStrandMelody: 0.35,
        drumsStrand: 0.35,
        guitarStrandMelody: 0.35,
        highPercussionStrand: 0.35,
        violin2StrandCountermelody: 0.35,
        violinStrandCountermelody: 0.35,
        violinStrandMelody: 0.35,
        zitherStrandMelody: 0.35,
        cimbalonTremolo1: 0.7,
        cimbalonTremolo3: 0.7,
        evolvingRhythmicStrings1: 0.6,
        guitarRandomPlucks: 0.6,
        hurdyFifths1: 0.7,
        logDrum: 1.0,
        bassDrum: 0.5,
        cymbalSwell: 0.7
      }
    },
    sarinStrandNight: {
      label: "Sarin Strand Night",
      layers: {
        charangolinStrandMelody: 0.35,
        doubleBassStrandCountermelody: 0.35,
        doubleBassStrandMelody: 0.35,
        guitarStrandMelody: 0.35,
        zitherStrandMelody: 0.35,
        cimbalonTremolo1: 0.7,
        cimbalonTremolo3: 0.7,
        evolvingRhythmicStrings1: 0.6,
        guitarRandomPlucks: 0.6,
        hurdyFifths1: 0.7,
        bassDrum: 0.5,
        risingStringPad1: 1.0,
        risingStringPad3: 1.0
      }
    },
    sarinStrandTension: {
      label: "Sarin Strand Tension",
      layers: {
        celloStrandCountermelody: 0.3,
        celloStrandMelody: 0.3,
        charangolinStrandMelody: 0.35,
        doubleBassStrandCountermelody: 0.35,
        doubleBassStrandMelody: 0.35,
        drumsStrand: 0.35,
        highPercussionStrand: 0.35,
        zitherStrandMelody: 0.35,
        cimbalonTremolo1Suspense: 0.7,
        cimbalonTremolo3Suspense: 0.7,
        highStringsTremoloBursts1Tension: 0.6,
        lowStringsAtonalRhythm: 0.5,
        midStringsAtonalRhythm: 1.0,
        guitarPlucksEchoing1Tension: 0.6,
        guitarPlucksEchoing2Tension: 0.6,
        bassDrum: 0.5,
        cymbalSwell: 0.7,
        hurdyFifths1Suspense: 0.7,
        hurdyFifths2Suspense: 0.7,
        rusticDrone: 1.0,
        rusticDroneHigh: 1.0,
        longGlissando: 0.6
      }
    }

  }
};var bardTroupe = {
  id: "bardTroupe",
  label: "Bard Troupe",
  type: "music",
  src: "music/bard-troupe",
  timing: {
    bpm: 100,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 3, max: 5}
    }
  ],
  segments: {
    brayHarpMelody: { src: "bray-harp-melody.ogg" },
    handDrum: { src: "hand-drum.ogg" },
    luteChords: { src: "lute-chords.ogg" },
    strummingHigh: { src: "strumming-high.ogg" },
    strummingLow: { src: "strumming-low.ogg" },
    strummingMid: { src: "strumming-mid.ogg" },
    violaMelody: { src: "viola-melody.ogg" }
  },
  arrangements: {
    ladyStonecraft: {
      label: "Lady Stonecraft",
      layers: {
        brayHarpMelody: 0.3,
        handDrum: 0.3,
        luteChords: 0.3,
        strummingHigh: 0.3,
        strummingLow: 0.3,
        strummingMid: 0.3,
        violaMelody: 0.3
      }
    }
  }
};var beastCombat = {
  id: "beastCombat",
  label: "Beast Combat",
  type: "music",
  src: "music/beast-combat",
  timing: {
    bpm: 115,
    bars: 16,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 24
    },
    {
      id: "main",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 2, max: 7}
    },
    {
      id: "driving",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 2, max: 5}
    }
  ],
  segments: {
    bassoonOstinato1: {src: "bassoon-ostinato-1.ogg", group: "main"},
    bassoonOstinato2: {src: "bassoon-ostinato-2.ogg", group: "main"},
    bigDrum1: {src: "big-drum-1.ogg", group: "driving"},
    bigDrum2: {src: "big-drum-2.ogg", group: "driving"},
    bigDrum3: {src: "big-drum-3.ogg", group: "driving"},
    celloAtonalHits: {src: "cello-atonal-hits.ogg", group: "driving"},
    celloBasslineLow1: {src: "cello-bassline-low-1.ogg", group: "driving"},
    celloBasslineLow2: {src: "cello-bassline-low-2.ogg", group: "driving"},
    celloBasslineMid1: {src: "cello-bassline-mid-1.ogg", group: "driving"},
    celloBasslineMid2: {src: "cello-bassline-mid-2.ogg", group: "driving"},
    celloOstinato1: {src: "cello-ostinato-1.ogg", group: "main"},
    celloOstinato2: {src: "cello-ostinato-2.ogg", group: "main"},
    celloRhythm1: {src: "cello-rhythm-1.ogg", group: "driving"},
    celloRhythm2: {src: "cello-rhythm-2.ogg", group: "driving"},
    closeDrum1: {src: "close-drum-1.ogg", group: "main"},
    closeDrum2: {src: "close-drum-2.ogg", group: "main"},
    colLegno1: {src: "col-legno-1.ogg", group: "main"},
    colLegno2: {src: "col-legno-2.ogg", group: "main"},
    cymbalSwell: {src: "cymbal-swell.ogg", group: "main"},
    didgeridoo: {src: "didgeridoo.ogg", group: "driving"},
    doubleBassOstinato1: {src: "double-bass-ostinato-1.ogg", group: "main"},
    doubleBassOstinato2: {src: "double-bass-ostinato-2.ogg", group: "main"},
    drumRolls1: {src: "drum-rolls-1.ogg", group: "main"},
    drumRolls2: {src: "drum-rolls-2.ogg", group: "main"},
    fluteCrescendo: {src: "flute-crescendo.ogg", group: "main"},
    hornsMelodyLow1: {src: "horns-melody-low-1.ogg", group: "main"},
    hornsMelodyLow2: {src: "horns-melody-low-2.ogg", group: "main"},
    hornsMelodyMid1: {src: "horns-melody-mid-1.ogg", group: "main"},
    hornsMelodyMid2: {src: "horns-melody-mid-2.ogg", group: "main"},
    huntHorn: {src: "hunt-horn.ogg", group: "main"},
    jungleFlute: {src: "jungle-flute.ogg", group: "main"},
    jungleFluteBends: {src: "jungle-flute-bends.ogg", group: "main"},
    lowDrum: {src: "low-drum.ogg", group: "driving"},
    mahlerHammerSwell: {src: "mahler-hammer-swell.ogg", group: "main"},
    marimbaMelody: {src: "marimba-melody.ogg", group: "main"},
    randomHighPercussion: {src: "random-high-percussion.ogg", group: "main"},
    risingTremoloHigh1: {src: "rising-tremolo-high-1.ogg", group: "main"},
    risingTremoloHigh2: {src: "rising-tremolo-high-2.ogg", group: "main"},
    risingTremoloMid1: {src: "rising-tremolo-mid-1.ogg", group: "main"},
    risingTremoloMid2: {src: "rising-tremolo-mid-2.ogg", group: "main"},
    risingViolaHigh: {src: "rising-viola-high.ogg", group: "main"},
    risingViolaMid: {src: "rising-viola-mid.ogg", group: "main"},
    risingViolinHigh: {src: "rising-violin-high.ogg", group: "main"},
    risingViolinLow: {src: "rising-violin-low.ogg", group: "main"},
    risingViolinMid: {src: "rising-violin-mid.ogg", group: "main"},
    shaker1: {src: "shaker-1.ogg", group: "main"},
    shaker2: {src: "shaker-2.ogg", group: "main"},
    shaker3: {src: "shaker-3.ogg", group: "main"},
    smallPercussionSwell: {src: "small-percussion-swell.ogg", group: "main"},
    sticks1: {src: "sticks-1.ogg", group: "driving"},
    sticks2: {src: "sticks-2.ogg", group: "driving"},
    stringsMelodyHigh1: {src: "strings-melody-high-1.ogg", group: "main"},
    stringsMelodyMid1: {src: "strings-melody-mid-1.ogg", group: "main"},
    timpani1: {src: "timpani-1.ogg", group: "driving"},
    timpani2: {src: "timpani-2.ogg", group: "driving"},
    trumpetMelodyHigh: {src: "trumpet-melody-high.ogg", group: "main"},
    trumpetMelodyMid: {src: "trumpet-melody-mid.ogg", group: "main"},
    violaOstinato1: {src: "viola-ostinato-1.ogg", group: "main"},
    violaOstinato2: {src: "viola-ostinato-2.ogg", group: "main"},
    violinTrills1: {src: "violin-trills-1.ogg", group: "main"},
    violinTrills2: {src: "violin-trills-2.ogg", group: "main"},
    warHorn: {src: "war-horn.ogg", group: "driving"},
    warHornReverse: {src: "war-horn-reverse.ogg", group: "main"},
    waterDrum: {src: "water-drum.ogg", group: "main"},
    woodPad: {src: "wood-pad.ogg", group: "main"}
  },
  arrangements: {
    beastFightMain: {
      label: "Beast Fight Main",
      layers: {
        violinTrills1: 0.4,
        violinTrills2: 0.4,
        bassoonOstinato1: 0.4,
        bigDrum1: 0.4,
        bigDrum2: 0.4,
        celloAtonalHits: 0.4,
        celloBasslineLow1: 0.4,
        celloBasslineMid1: 0.4,
        celloOstinato1: 0.4,
        violaOstinato1: 0.4,
        celloRhythm1: 0.4,
        celloRhythm2: 0.4,
        closeDrum1: 0.4,
        colLegno1: 0.4,
        didgeridoo: 0.4,
        doubleBassOstinato1: 0.4,
        drumRolls1: 0.4,
        fluteCrescendo: 0.4,
        hornsMelodyLow1: 0.4,
        hornsMelodyMid1: 0.4,
        huntHorn: 0.2,
        jungleFlute: 0.4,
        jungleFluteBends: 0.4,
        lowDrum: 0.4,
        mahlerHammerSwell: 0.4,
        randomHighPercussion: 0.4,
        shaker1: 0.4,
        shaker2: 0.4,
        shaker3: 0.4,
        smallPercussionSwell: 0.4,
        sticks1: 0.4,
        stringsMelodyHigh1: 0.4,
        stringsMelodyMid1: 0.4,
        timpani1: 0.4,
        warHorn: 0.4,
        warHornReverse: 0.4,
        waterDrum: 0.4,
        woodPad: 0.4
      }
    },
    beastFightHeroic: {
      label: "Beast Fight Heroic",
      layers: {
        waterDrum: 0.4,
        bigDrum1: 0.4,
        bigDrum2: 0.4,
        risingViolinLow: 0.53,
        risingViolinMid: 0.53,
        risingViolinHigh: 0.53,
        risingViolaHigh: 0.53,
        risingViolaMid: 0.53,
        risingTremoloMid1: 0.53,
        risingTremoloMid2: 0.53,
        risingTremoloHigh1: 0.53,
        risingTremoloHigh2: 0.53,
        trumpetMelodyMid: 0.4,
        trumpetMelodyHigh: 0.4,
        doubleBassOstinato2: 0.4,
        celloOstinato2: 0.4,
        violaOstinato2: 0.4,
        cymbalSwell: 0.4,
        timpani2: 0.4,
        closeDrum2: 0.4,
        marimbaMelody: 0.4,
        colLegno2: 0.4,
        hornsMelodyMid2: 0.4,
        hornsMelodyLow2: 0.4,
        celloBasslineMid2: 0.4,
        celloBasslineLow2: 0.4,
        drumRolls2: 0.4,
        bassoonOstinato2: 0.4,
        bigDrum3: 0.4,
        sticks2: 0.4,
        sticks1: 0.4,
        mahlerHammerSwell: 0.4,
        smallPercussionSwell: 0.4,
        lowDrum: 0.4,
        shaker3: 0.4,
        shaker2: 0.4,
        randomHighPercussion: 0.4,
        shaker1: 0.4
      }
    },
    beastFightInterval: {
      label: "Beast Fight Interval",
      layers: {
        bigDrum1: 0.4,
        bigDrum2: 0.4,
        bigDrum3: 0.4,
        closeDrum1: 0.4,
        closeDrum2: 0.4,
        cymbalSwell: 0.4,
        drumRolls1: 0.4,
        lowDrum: 0.4,
        mahlerHammerSwell: 0.4,
        randomHighPercussion: 0.4,
        shaker1: 0.4,
        shaker2: 0.4,
        shaker3: 0.4,
        smallPercussionSwell: 0.4,
        sticks1: 0.4,
        sticks2: 0.4,
        waterDrum: 0.4,
        celloAtonalHits: 0.4,
        colLegno1: 0.4,
        colLegno2: 0.4,
        didgeridoo: 0.4,
        warHornReverse: 0.4,
        warHorn: 0.4,
        woodPad: 0.4,
        jungleFlute: 0.4,
        jungleFluteBends: 0.4
      }
    }
  }
};var celestialCombat = {
  id: "celestialCombat",
  label: "Celestial Combat",
  type: "music",
  src: "music/celestial-combat",
  timing: {
    bpm: 140,
    bars: 14,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 14
    },
    {
      id: "main",
      interval: 7,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 2, max: 5}
    },
    {
      id: "melody",
      interval: 14,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 0, max: 4}
    },
    {
      id: "percussion",
      interval: 7,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 1, max: 4}
    }
  ],
  segments: {
    anvil: {src: "anvil.ogg", group: "percussion"},
    choirSwells: {src: "choir-swells.ogg", group: "main"},
    crazyBassline: {src: "crazy-bassline.ogg", group: "main"},
    distortedHits: {src: "distorted-hits.ogg", group: "main"},
    femaleChoirChantMelody1: {src: "female-choir-chant-melody-1.ogg", group: "melody"},
    highStringsMelody1: {src: "high-strings-melody-1.ogg", group: "melody"},
    hybridSwells: {src: "hybrid-swells.ogg", group: "main"},
    lowStringsMelody1: {src: "low-strings-melody-1.ogg", group: "melody"},
    maleChoirChantMelody1: {src: "male-choir-chant-melody-1.ogg", group: "melody"},
    metalHit: {src: "metal-hit.ogg", group: "percussion"},
    metalSwell: {src: "metal-swell.ogg", group: "main"},
    percussion1: {src: "percussion-1.ogg", group: "percussion"},
    percussion2: {src: "percussion-2.ogg", group: "percussion"},
    percussion3: {src: "percussion-3.ogg", group: "percussion"},
    tremoloCresendos: {src: "tremolo-cresendos.ogg", group: "main"},
    yalliTambur: {src: "yalli-tambur.ogg", group: "main"},
    gong: {src: "gong.ogg", group: "percussion"},
    fastWoodwinds1: {src: "fast-woodwinds-1.ogg", group: "percussion"},
    ghostlySynthMelody: {src: "ghostly-synth-melody.ogg", group: "melody"},
    fastWoodwinds2: {src: "fast-woodwinds-2.ogg", group: "percussion"},
    synthDrone: {src: "synth-drone.ogg", group: "main"},
    maleChoirChantMelody2: {src: "male-choir-chant-melody-2.ogg", group: "melody"},
    lowStringsMelody2: {src: "low-strings-melody-2.ogg", group: "melody"},
    hugeTonalHits: {src: "huge-tonal-hits.ogg", group: "main"},
    highStringsMelody2: {src: "high-strings-melody-2.ogg", group: "melody"},
    ghostlySynthMelody2: {src: "ghostly-synth-melody-2.ogg", group: "melody"},
    femaleChoirChantMelody2: {src: "female-choir-chant-melody-2.ogg", group: "melody"},
    fastMetalPercussion: {src: "fast-metal-percussion.ogg", group: "percussion"},
    bigBassHits: {src: "big-bass-hits.ogg", group: "main"},
    accentDrums: {src: "accent-drums.ogg", group: "percussion"},
    risingMetalScrape: {src: "rising-metal-scrape.ogg", group: "percussion"},
    riser2: {src: "riser-2.ogg", group: "main"},
    riser1: {src: "riser-1.ogg", group: "main"},
    pitchedDownChildrensChoir: {src: "pitched-down-childrens-choir.ogg", group: "melody"},
    femaleChoirChantWarped: {src: "female-choir-chant-warped.ogg", group: "melody"},
    downwardsChoir: {src: "downwards-choir.ogg", group: "melody"},
    choirSpookyRise2: {src: "choir-spooky-rise-2.ogg", group: "melody"},
    choirSpookyRise1: {src: "choir-spooky-rise-1.ogg", group: "melody"},
    childrensChoirWarped: {src: "childrens-choir-warped.ogg", group: "melody"},
    metalHit2: {src: "metal-hit-2.ogg", group: "percussion"},
    fastBreathing: {src: "fast-breathing.ogg", group: "main"},
    hugeTonalHits2: {src: "huge-tonal-hits-2.ogg", group: "main"},
    simpleBass: {src: "simple-bass.ogg", group: "main"},
    bigSynthDrum: {src: "big-synth-drum.ogg", group: "percussion"}

  },
  arrangements: {
    section1: {
      label: "Celestial Combat Section 1",
      layers: {
        anvil: 0.5,
        choirSwells: 0.5,
        crazyBassline: 0.5,
        distortedHits: 0.5,
        femaleChoirChantMelody1: 0.6,
        highStringsMelody1: 0.5,
        hybridSwells: 0.5,
        lowStringsMelody1: 0.5,
        maleChoirChantMelody1: 0.5,
        metalHit: 0.5,
        metalSwell: 0.5,
        percussion1: 0.5,
        percussion2: 0.5,
        percussion3: 0.5,
        tremoloCresendos: 0.5,
        yalliTambur: 0.5,
        gong: 0.5,
        fastWoodwinds1: 0.5,
        ghostlySynthMelody: 0.5,
        fastWoodwinds2: 0.5,
        synthDrone: 0.5
      }
    },
    section2: {
      label: "Celestial Combat Section 2",
      layers: {
        maleChoirChantMelody2: 0.5,
        lowStringsMelody2: 0.5,
        hugeTonalHits: 0.5,
        highStringsMelody2: 0.5,
        ghostlySynthMelody2: 0.5,
        femaleChoirChantMelody2: 0.5,
        fastMetalPercussion: 0.5,
        bigBassHits: 0.5,
        accentDrums: 0.5,
        metalHit: 0.5,
        percussion1: 0.5,
        percussion2: 0.5,
        percussion3: 0.5,
        choirSwells: 0.5,
        hybridSwells: 0.5,
        metalSwell: 0.5,
        anvil: 0.5,
        synthDrone: 0.5,
        fastWoodwinds1: 0.5
      }
    },
    section3: {
      label: "Celestial Combat Section 3",
      layers: {
        risingMetalScrape: 0.5,
        riser2: 0.5,
        riser1: 0.5,
        pitchedDownChildrensChoir: 0.5,
        femaleChoirChantWarped: 0.5,
        downwardsChoir: 0.5,
        choirSpookyRise2: 0.5,
        choirSpookyRise1: 0.5,
        childrensChoirWarped: 0.5,
        metalHit2: 0.5,
        fastBreathing: 0.5,
        hugeTonalHits2: 0.5,
        simpleBass: 0.5,
        bigSynthDrum: 0.5,
        fastMetalPercussion: 0.5
      }
    }
  }
};var constructCombat = {
  id: "constructCombat",
  label: "Construct Combat",
  type: "music",
  src: "music/construct-combat",
  timing: {
    bpm: 150,
    bars: 16,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "main",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 2, max: 5}
    },
    {
      id: "melody",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 0, max: 4}
    },
    {
      id: "percussion",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 1, max: 4}
    }
  ],
  segments: {
    clockTick1: {src: "clock-tick-1.ogg", group: "percussion"},
    clockTick2: {src: "clock-tick-2.ogg", group: "percussion"},
    darkBrass: {src: "dark-brass.ogg", group: "main"},
    highHybridDrums: {src: "high-hyrbid-drums.ogg", group: "percussion"},
    junkyardDrums: {src: "junkyard-drums.ogg", group: "percussion"},
    lowHybridDrums: {src: "low-hyrbid-drums.ogg", group: "percussion"},
    midHybridDrums: {src: "mid-hyrbid-drums.ogg", group: "percussion"},
    mmHornMelody: {src: "mm-horn-melody.ogg", group: "melody"},
    mmLowStringsMelody: {src: "mm-low-strings-melody.ogg", group: "melody"},
    mmMidStringsMelody: {src: "mm-mid-strings-melody.ogg", group: "melody"},
    mmTransition1: {src: "mm-transition-1.ogg", group: "percussion", timing: {delay: 15, pad: 11}},
    mmTransition2: {src: "mm-transition-2.ogg", group: "percussion", timing: {delay: 15, pad: 11}},
    mutedKeplerStringsHigh: {src: "muted-kepler-strings-high.ogg", group: "main"},
    mutedKeplerStringsMid: {src: "muted-kepler-strings-mid.ogg", group: "main"},
    repeatingStringsMotif: {src: "repeating-strings-motif.ogg", group: "melody"},
    repeatingStringsRising: {src: "repeating-strings-rising.ogg", group: "melody"},
    repeatingSynth: {src: "repeating-synth.ogg", group: "main"},
    synthKeysMotif: {src: "synth-keys-motif.ogg", group: "melody"},
    electricGuitarRepeats: {src: "electric-guitar-repeats.ogg", group: "main"},
    synthChords1: {src: "synth-chords-1.ogg", group: "main"},
    synthChords2: {src: "synth-chords-2.ogg", group: "main"},
    retroSynthArp1: {src: "retro-synth-arp-1.ogg", group: "main"},
    retroSynthArp2: {src: "retro-synth-arp-2.ogg", group: "main"},
    midStringsOstinato: {src: "mid-strings-ostinato.ogg", group: "main"},
    midStringsNewMelody1: {src: "mid-strings-new-melody-1.ogg", group: "melody"},
    midStringsNewMelody2: {src: "mid-strings-new-melody-2.ogg", group: "melody"},
    midStringsChords: {src: "mid-strings-chords.ogg", group: "main"},
    lowStringsOstinato: {src: "low-strings-ostinato.ogg", group: "main"},
    lowStringsChords: {src: "low-strings-chords.ogg", group: "main"},
    lowBrassChords: {src: "low-brass-chords.ogg", group: "main"},
    highStringsOstinato: {src: "high-strings-ostinato.ogg", group: "main"},
    highStringsNewMelody: {src: "high-strings-new-melody.ogg", group: "melody"},
    highStringsChords: {src: "high-strings-chords.ogg", group: "main"},
    bigLeadSynth1: {src: "big-lead-synth-1.ogg", group: "melody"},
    bigLeadSynth2: {src: "big-lead-synth-2.ogg", group: "melody"},
    reverseSounds: {src: "reverse-sounds.ogg", group: "main"},
    highWoodwindMomentumDrops: {src: "high-woodwind-momentum-drops.ogg", group: "main"},
    highStringMomentumDrops: {src: "high-string-momentum-drops.ogg", group: "main"},
    darkSynth1: {src: "dark-synth-1.ogg", group: "melody"},
    darkSynth2: {src: "dark-synth-2.ogg", group: "melody"},
    darkLead1: {src: "dark-lead-1.ogg", group: "melody"},
    darkBraams: {src: "dark-braams.ogg", group: "main"},
    synthyDeepDrum: {src: "synthy-deep-drum.ogg", group: "percussion"}
  },
  arrangements: {
    section1: {
      label: "Construct Combat Section 1",
      layers: {
        clockTick1: 1.0,
        clockTick2: 1.0,
        darkBrass: 1.0,
        highHybridDrums: 1.0,
        junkyardDrums: 1.0,
        lowHybridDrums: 1.0,
        midHybridDrums: 1.0,
        mmTransition1: 1.0,
        mmTransition2: 1.0,
        mutedKeplerStringsHigh: 1.0,
        mutedKeplerStringsMid: 1.0,
        repeatingSynth: 1.0,
        mmHornMelody: 0.8,
        mmLowStringsMelody: 0.8,
        mmMidStringsMelody: 0.8,
        repeatingStringsMotif: 0.8,
        repeatingStringsRising: 0.8,
        synthKeysMotif: 0.8
      }
    },
    section2: {
      label: "Construct Combat Section 2",
      layers: {
        synthChords1: 0.5,
        synthChords2: 0.5,
        retroSynthArp1: 0.5,
        retroSynthArp2: 0.5,
        midStringsOstinato: 0.5,
        midStringsNewMelody1: 0.5,
        midStringsNewMelody2: 0.5,
        midStringsChords: 0.5,
        lowStringsOstinato: 0.5,
        lowStringsChords: 0.5,
        lowBrassChords: 0.5,
        highStringsOstinato: 0.5,
        highStringsNewMelody: 0.5,
        highStringsChords: 0.5,
        bigLeadSynth1: 0.5,
        bigLeadSynth2: 0.5,
        clockTick1: 1.0,
        clockTick2: 1.0,
        highHybridDrums: 1.0,
        junkyardDrums: 1.0,
        lowHybridDrums: 1.0,
        midHybridDrums: 1.0,
        mmTransition1: 1.0,
        mmTransition2: 1.0,
        mutedKeplerStringsHigh: 1.0,
        mutedKeplerStringsMid: 1.0,
        repeatingSynth: 1.0
      }
    },
    section3: {
      label: "Construct Combat Section 3",
      layers: {
        clockTick1: 1.0,
        clockTick2: 1.0,
        highHybridDrums: 1.0,
        junkyardDrums: 1.0,
        lowHybridDrums: 1.0,
        midHybridDrums: 1.0,
        mmTransition1: 1.0,
        mmTransition2: 1.0,
        mutedKeplerStringsHigh: 1.0,
        mutedKeplerStringsMid: 1.0,
        repeatingStringsMotif: 0.8,
        synthKeysMotif: 0.8,
        reverseSounds: 0.7,
        highWoodwindMomentumDrops: 1.0,
        highStringMomentumDrops: 1.0,
        darkSynth1: 0.5,
        darkSynth2: 0.5,
        darkLead1: 0.5,
        darkBraams: 0.7,
        synthyDeepDrum: 0.7
      }
    }
  }
};var cosmos$1 = {
  id: "cosmosMusic",
  label: "Cosmos Music",
  type: "music",
  src: "music/cosmos",
  timing: {
    bpm: 70,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 8,
      fadeOut: 8,
      randomLayers: {min: 2, max: 4} // Only used for broken tower
    }
  ],
  segments: {
    auraFull: {src: "aura-full.ogg"},
    auraWaning: {src: "aura-waning.ogg"},
    auraWaxing: {src: "aura-waxing.ogg"},
    akonFull: {src: "akon-full.ogg"},
    akonWaning: {src: "akon-waning.ogg"},
    akonWaxing: {src: "akon-waxing.ogg"},
    coraFull: {src: "cora-full.ogg"},
    coraWaning: {src: "cora-waning.ogg"},
    coraWaxing: {src: "cora-waxing.ogg"},
    ragenFull: {src: "ragen-full.ogg"},
    ragenWaning: {src: "ragen-waning.ogg"},
    ragenWaxing: {src: "ragen-waxing.ogg"},
    orbisFull: {src: "orbis-full.ogg"},
    orbisWaning: {src: "orbis-waning.ogg"},
    orbisWaxing: {src: "orbis-waxing.ogg"},
    mayisFull: {src: "mayis-full.ogg"},
    mayisWaning: {src: "mayis-waning.ogg"},
    mayisWaxing: {src: "mayis-waxing.ogg"}
  },
  arrangements: {
    cosmos: {
      label: "Ember Cosmos",
      layers: {
        auraFull: 0,
        auraWaning: 0,
        auraWaxing: 0,
        akonFull: 0,
        akonWaning: 0,
        akonWaxing: 0,
        coraFull: 0,
        coraWaning: 0,
        coraWaxing: 0,
        ragenFull: 0,
        ragenWaning: 0,
        ragenWaxing: 0,
        orbisFull: 0,
        orbisWaning: 0,
        orbisWaxing: 0,
        mayisFull: 0,
        mayisWaning: 0,
        mayisWaxing: 0
      }
    },
    brokenTower: {
      label: "Broken Tower",
      layers: {
        auraWaning: 0.6,
        auraWaxing: 0.6,
        auraFull: 0.8,
        akonWaning: 0.6,
        akonWaxing: 0.6,
        akonFull: 0.8,
        coraWaning: 0.6,
        coraWaxing: 0.6,
        coraFull: 0.8,
        ragenWaning: 0.6,
        ragenWaxing: 0.6,
        ragenFull: 0.8,
        orbisWaning: 0.6,
        orbisWaxing: 0.6,
        orbisFull: 0.8,
        mayisWaning: 0.6,
        mayisWaxing: 0.6,
        mayisFull: 0.8
      }
    }
  }
};var elementalCombat = {
  id: "elementalCombat",
  label: "Elemental Combat",
  type: "music",
  src: "music/elemental-combat",
  timing: {
    bpm: 95,
    bars: 16,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "main",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 0, max: 5}
    },
    {
      id: "other",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 1, max: 5}
    },
    {
      id: "percussion",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 3, max: 5}
    }
  ],
  segments: {
    bubbleSynthCountermelody: {src: "bubble-synth-countermelody.ogg", group: "main"},
    darkBattleHorns: {src: "dark-battle-horns.ogg", group: "other"},
    fireDrum: {src: "fire-drum.ogg", group: "percussion"},
    fireDrum2: {src: "fire-drum-2.ogg", group: "percussion"},
    fireWhoosh: {src: "fire-whoosh.ogg", group: "percussion"},
    grittyCelloMelody: {src: "gritty-cello-melody.ogg", group: "main"},
    grittyViolinCountermelody: {src: "gritty-violin-countermelody.ogg", group: "main"},
    neoElectricViolin: {src: "neo-electric-violin.ogg", group: "other"},
    stormWhoosh: {src: "storm-whoosh.ogg", group: "percussion"},
    synthKick: {src: "synth-kick.ogg", group: "percussion"},
    synthRiseAndFall: {src: "synth-rise-and-fall.ogg", group: "other"},
    violaTexturePad: {src: "viola-texture-pad.ogg", group: "other"},
    waterDrum: {src: "water-drum.ogg", group: "percussion"},
    waterDrum2: {src: "water-drum-2.ogg", group: "percussion"},
    waterHorn: {src: "water-horn.ogg", group: "other"},
    waterMelody: {src: "water-melody.ogg", group: "main"},
    waterWhoosh: {src: "water-whoosh.ogg", group: "percussion"},
    wateryHit: {src: "watery-hit.ogg", group: "percussion"},
    deepWoodwindPulse: { src: "deep-woodwind-pulse.ogg", group: "other" },
    deepDrumSlowHit: { src: "deep-drum-slow-hit.ogg", group: "percussion" },
    electricGuitarLongBendsDeep: { src: "electric-guitar-long-bends-deep.ogg", group: "other" },
    highWoodwindsRhythm: { src: "high-woodwinds-rhythm.ogg", group: "other" },
    acceleratingViolaTexture: { src: "accelerating-viola-texture.ogg", group: "other" },
    electricGuitarLongBends: { src: "electric-guitar-long-bends.ogg", group: "other" },
    gong: { src: "gong.ogg", group: "percussion" },
    signatureSynthSounds: { src: "signature-synth-sounds.ogg", group: "other" },
    deepBooms: { src: "deep-booms.ogg", group: "percussion" },
    fireCrunchSlowHits: { src: "fire-crunch-slow-hits.ogg", group: "percussion" },
    metallicPad: { src: "metallic-pad.ogg", group: "other" },
    deepCelloPulse: { src: "deep-cello-pulse.ogg", group: "other" },
    violinRhythm: { src: "violin-rhythm.ogg", group: "other" }
  },
  arrangements: {
    elementalCombatFire1: {
      label: "Elemental Fire Combat Section 1",
      layers: {
        darkBattleHorns: 0.6,
        fireDrum: 0.6,
        fireDrum2: 0.6,
        fireWhoosh: 0.6,
        grittyCelloMelody: 0.6,
        grittyViolinCountermelody: 0.6,
        neoElectricViolin: 0.6,
        stormWhoosh: 0.6,
        synthKick: 0.6,
        synthRiseAndFall: 0.6,
        violaTexturePad: 0.6,
        deepBooms: 0.5,
        fireCrunchSlowHits: 0.5,
        metallicPad: 0.5,
        violinRhythm: 0.5,
        gong: 0.5,
        acceleratingViolaTexture: 0.5
      }
    },
    elementalCombatFire2: {
      label: "Elemental Fire Combat Section 2",
      layers: {
        fireWhoosh: 0.6,
        stormWhoosh: 0.6,
        synthRiseAndFall: 0.6,
        acceleratingViolaTexture: 0.5,
        electricGuitarLongBends: 0.5,
        gong: 0.5,
        signatureSynthSounds: 0.5,
        deepBooms: 0.5,
        fireCrunchSlowHits: 0.5,
        metallicPad: 0.5,
        deepCelloPulse: 0.5,
        violinRhythm: 0.5,
        darkBattleHorns: 0.6,
        fireDrum: 0.6,
        fireDrum2: 0.6,
        neoElectricViolin: 0.6,
        synthKick: 0.6
      }
    },
    elementalCombatWater1: {
      label: "Elemental Combat Water Section 1",
      layers: {
        bubbleSynthCountermelody: 0.6,
        stormWhoosh: 0.6,
        synthKick: 0.6,
        synthRiseAndFall: 0.6,
        violaTexturePad: 0.6,
        waterDrum: 0.6,
        waterDrum2: 0.6,
        waterHorn: 0.6,
        waterMelody: 0.6,
        waterWhoosh: 0.6,
        wateryHit: 0.6,
        deepBooms: 0.5,
        metallicPad: 0.5,
        acceleratingViolaTexture: 0.5,
        signatureSynthSounds: 0.5
      }
    },
    elementalCombatWater2: {
      label: "Elemental Combat Water Section 2",
      layers: {
        waterWhoosh: 0.6,
        stormWhoosh: 0.6,
        synthRiseAndFall: 0.6,
        acceleratingViolaTexture: 0.5,
        signatureSynthSounds: 0.5,
        deepBooms: 0.5,
        metallicPad: 0.5,
        deepWoodwindPulse: 0.5,
        deepDrumSlowHit: 0.5,
        electricGuitarLongBendsDeep: 0.5,
        highWoodwindsRhythm: 0.5,
        synthKick: 0.6,
        waterDrum: 0.6,
        waterDrum2: 0.6,
        wateryHit: 0.6
      }
    }
  }
};var emberEnvironment = {
  id: "emberEnvironment",
  label: "Ember Environment",
  type: "environment",
  src: "environment/",
  segments: {

    /* -------------------------------------------- */
    /*  Birds and Winged Creatures                  */
    /* -------------------------------------------- */

    // Loops
    flappingWings: {src: "birds-and-winged-creatures/loops/flapping-wings.ogg"},
    forestBirds: {src: "birds-and-winged-creatures/loops/forest-birds.ogg"},
    mountainBirds: {src: "birds-and-winged-creatures/loops/mountain-birds.ogg"},

    // One-Shots
    barnOwl: {src: "birds-and-winged-creatures/one-shots/barn-owl.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    creatureWings1: {
      src: "birds-and-winged-creatures/one-shots/creature-wings-1.ogg",
      timing: {randomDelay: {min: 20, max: 60}}
    },
    creatureWings2: {
      src: "birds-and-winged-creatures/one-shots/creature-wings-2.ogg",
      timing: {randomDelay: {min: 20, max: 60}}
    },
    creatureWings3: {
      src: "birds-and-winged-creatures/one-shots/creature-wings-3.ogg",
      timing: {randomDelay: {min: 20, max: 60}}
    },
    creatureWings4: {
      src: "birds-and-winged-creatures/one-shots/creature-wings-4.ogg",
      timing: {randomDelay: {min: 20, max: 60}}
    },
    flyingMonkey1: {
      src: "birds-and-winged-creatures/one-shots/flying-monkey-1.ogg",
      timing: {randomDelay: {min: 0, max: 60}}
    },
    flyingMonkey2: {
      src: "birds-and-winged-creatures/one-shots/flying-monkey-2.ogg",
      timing: {randomDelay: {min: 0, max: 60}}
    },
    gulls: {src: "birds-and-winged-creatures/one-shots/gulls.ogg", timing: {randomDelay: {min: 0, max: 60}}},
    jungleBirds1: {
      src: "birds-and-winged-creatures/one-shots/jungle-birds-1.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    jungleBirds2: {
      src: "birds-and-winged-creatures/one-shots/jungle-birds-2.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    eagleCry1: {
      src: "birds-and-winged-creatures/one-shots/eagle-cry-1.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    eagleCry2: {
      src: "birds-and-winged-creatures/one-shots/eagle-cry-2.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    eagleCry3: {
      src: "birds-and-winged-creatures/one-shots/eagle-cry-3.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    eagleCry4: {
      src: "birds-and-winged-creatures/one-shots/eagle-cry-4.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    eagleCry5: {
      src: "birds-and-winged-creatures/one-shots/eagle-cry-5.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    vulture: {
      src: "birds-and-winged-creatures/one-shots/vulture.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    crow: {
      src: "birds-and-winged-creatures/one-shots/crow.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    drake1: {
      src: "birds-and-winged-creatures/one-shots/drake-1.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake2: {
      src: "birds-and-winged-creatures/one-shots/drake-2.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake3: {
      src: "birds-and-winged-creatures/one-shots/drake-3.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake4: {
      src: "birds-and-winged-creatures/one-shots/drake-4.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake5: {
      src: "birds-and-winged-creatures/one-shots/drake-5.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake6: {
      src: "birds-and-winged-creatures/one-shots/drake-6.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake7: {
      src: "birds-and-winged-creatures/one-shots/drake-7.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake8: {
      src: "birds-and-winged-creatures/one-shots/drake-8.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake9: {
      src: "birds-and-winged-creatures/one-shots/drake-9.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake10: {
      src: "birds-and-winged-creatures/one-shots/drake-10.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake11: {
      src: "birds-and-winged-creatures/one-shots/drake-11.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },
    drake12: {
      src: "birds-and-winged-creatures/one-shots/drake-12.ogg",
      timing: {randomDelay: {min: 5, max: 70}, randomVolume: {min: 0.15, max: 0.6}}
    },

    /* -------------------------------------------- */
    /*  Crystals                                    */
    /* -------------------------------------------- */

    // Loops
    deepCrystalShimmer: {src: "crystal/loops/deep-crystalline-shimmer.ogg"},
    deepCrystalDrone: {src: "crystal/loops/deep-crystalline-drone.ogg"},

    // One-Shots
    crystalShimmer1: {src: "crystal/one-shots/crystal-shimmer-1.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    crystalShimmer2: {src: "crystal/one-shots/crystal-shimmer-2.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    reverseCrystalBreakEchoes1: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-1.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes2: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-2.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes3: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-3.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes4: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-4.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes5: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-5.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes6: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-6.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes7: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-7.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes8: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-8.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes9: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-9.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes10: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-10.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes11: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-11.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes12: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-12.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    reverseCrystalBreakEchoes13: {
      src: "crystal/one-shots/reverse-crystal-break-echoes-13.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },

    /* -------------------------------------------- */
    /*  Fire and Heat                               */
    /* -------------------------------------------- */

    // Loops
    campfire: {src: "fire-and-heat/loops/campfire.ogg"},
    flamethrower: {src: "fire-and-heat/loops/flamethrower.ogg"},
    bonfire: {src: "fire-and-heat/loops/bonfire.ogg"},
    furnace: {src: "fire-and-heat/loops/furnace.ogg"},
    lava: {src: "fire-and-heat/loops/lava.ogg"},

    // One-Shots
    heatSizzle1: {src: "fire-and-heat/one-shots/heat-sizzle-1.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    heatSizzle2: {src: "fire-and-heat/one-shots/heat-sizzle-2.ogg", timing: {randomDelay: {min: 30, max: 120}}},

    /* -------------------------------------------- */
    /*  Foley                                       */
    /* -------------------------------------------- */

    // Loops
    squishyFlesh: {src: "foley/loops/squishy-flesh.ogg"},
    roomTone: {src: "foley/loops/room-tone.ogg"},
    casinoSounds: {src: "foley/loops/casino-sounds.ogg"},

    // One-Shots
    campFoley1: {src: "foley/one-shots/camp-foley-1.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley2: {src: "foley/one-shots/camp-foley-2.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley3: {src: "foley/one-shots/camp-foley-3.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley4: {src: "foley/one-shots/camp-foley-4.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley5: {src: "foley/one-shots/camp-foley-5.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley6: {src: "foley/one-shots/camp-foley-6.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley7: {src: "foley/one-shots/camp-foley-7.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley8: {src: "foley/one-shots/camp-foley-8.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    campFoley9: {src: "foley/one-shots/camp-foley-9.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    genericInteract: {src: "foley/one-shots/generic-interact.ogg"},
    crossbowShoot: {src: "foley/one-shots/crossbow-shoot.ogg"},

    /* -------------------------------------------- */
    /*  Forest and Jungle                           */
    /* -------------------------------------------- */

    // Loops
    rainforest: {src: "forest-and-jungle/loops/rainforest.ogg"},
    rainforestNight: {src: "forest-and-jungle/loops/rainforest-night.ogg"},
    rainforestNight2: {src: "forest-and-jungle/loops/rainforest-night-2.ogg"},
    mangroveDay: {src: "forest-and-jungle/loops/rainforest-night-2.ogg"},

    // One-Shots
    leafRustle1: {src: "forest-and-jungle/one-shots/leaf-rustle-1.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    leafRustle2: {src: "forest-and-jungle/one-shots/leaf-rustle-2.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    leafRustle3: {src: "forest-and-jungle/one-shots/leaf-rustle-3.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    leafRustle4: {src: "forest-and-jungle/one-shots/leaf-rustle-4.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    leafRustle5: {src: "forest-and-jungle/one-shots/leaf-rustle-5.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    leafRustle6: {src: "forest-and-jungle/one-shots/leaf-rustle-6.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    deepTreeCreaking1: {src: "forest-and-jungle/one-shots/deep-tree-creaking-1.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    deepTreeCreaking2: {src: "forest-and-jungle/one-shots/deep-tree-creaking-2.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    deepTreeCreaking3: {src: "forest-and-jungle/one-shots/deep-tree-creaking-3.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    deepTreeCreaking4: {src: "forest-and-jungle/one-shots/deep-tree-creaking-4.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    deepTreeCreaking5: {src: "forest-and-jungle/one-shots/deep-tree-creaking-5.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    deepTreeCreaking6: {src: "forest-and-jungle/one-shots/deep-tree-creaking-6.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    deepTreeCreaking7: {src: "forest-and-jungle/one-shots/deep-tree-creaking-7.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    deepTreeCreaking8: {src: "forest-and-jungle/one-shots/deep-tree-creaking-8.ogg", timing: {randomDelay: {min: 20, max: 120}}},
    plantGrowth1: {
      src: "forest-and-jungle/one-shots/plant-growth-1.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth2: {
      src: "forest-and-jungle/one-shots/plant-growth-2.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth3: {
      src: "forest-and-jungle/one-shots/plant-growth-3.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth4: {
      src: "forest-and-jungle/one-shots/plant-growth-4.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth5: {
      src: "forest-and-jungle/one-shots/plant-growth-5.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth6: {
      src: "forest-and-jungle/one-shots/plant-growth-6.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth7: {
      src: "forest-and-jungle/one-shots/plant-growth-7.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth8: {
      src: "forest-and-jungle/one-shots/plant-growth-8.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    plantGrowth9: {
      src: "forest-and-jungle/one-shots/plant-growth-9.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },
    biggerPlantGrowth: {
      src: "forest-and-jungle/one-shots/bigger-plant-growth.ogg",
      timing: { randomDelay: { min: 15, max: 60 } }
    },

    /* -------------------------------------------- */
    /*  Grass                                       */
    /* -------------------------------------------- */

    // Loops
    tallGrass: {src: "grass/loops/tall-grass.ogg"},

    /* -------------------------------------------- */
    /*  Interiors                                   */
    /* -------------------------------------------- */

    // Loops
    churchInterior: {src: "interiors/loops/church-interior.ogg"},
    footstepsHall: {src: "interiors/loops/footsteps-hall.ogg"},
    drinksClinking1: {src: "interiors/loops/drinks-clinking-1.ogg"},
    drinksClinking2: {src: "interiors/loops/drinks-clinking-2.ogg"},

    /* -------------------------------------------- */
    /*  Insects and Minor Animals                   */
    /* -------------------------------------------- */

    // Loops
    flySwarm: {src: "insects-and-minor-animals/loops/fly-swarm.ogg"},
    crickets: {src: "insects-and-minor-animals/loops/crickets.ogg"},
    monsterWaspFlying: {src: "insects-and-minor-animals/loops/monster-wasp-flying.ogg"},
    spiderScuttlingSubtle: {src: "spider-scuttling-subtle.ogg"},
    spiderScuttlingActive: {src: "spider-scuttling-active.ogg"},

    //  One-Shots
    mosquitoSwarm: {
      src: "insects-and-minor-animals/one-shots/mosquito-swarm.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    strangeFrogs: {
      src: "insects-and-minor-animals/one-shots/strange-frogs.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    lakesideCrickets: {
      src: "insects-and-minor-animals/one-shots/lakeside-crickets.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    frogsAndBirds: {
      src: "insects-and-minor-animals/one-shots/frogs-and-birds.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    monsterWasp1: {
      src: "insects-and-minor-animals/one-shots/monster-wasp-1.ogg",
      timing: {randomDelay: {min: 20, max: 100}}
    },
    monsterWasp2: {
      src: "insects-and-minor-animals/one-shots/monster-wasp-2.ogg",
      timing: {randomDelay: {min: 20, max: 100}}
    },
    monsterWasp3: {
      src: "insects-and-minor-animals/one-shots/monster-wasp-3.ogg",
      timing: {randomDelay: {min: 20, max: 100}}
    },
    monsterWasp4: {
      src: "insects-and-minor-animals/one-shots/monster-wasp-4.ogg",
      timing: {randomDelay: {min: 20, max: 100}}
    },
    monsterWasp5: {
      src: "insects-and-minor-animals/one-shots/monster-wasp-5.ogg",
      timing: {randomDelay: {min: 20, max: 100}}
    },
    monsterWasp6: {
      src: "insects-and-minor-animals/one-shots/monster-wasp-6.ogg",
      timing: {randomDelay: {min: 20, max: 100}}
    },

    /* -------------------------------------------- */
    /*  Land Animals and Beasts                     */
    /* -------------------------------------------- */

    // One-Shots
    jungleAnimals1: {
      src: "land-animals-and-beasts/one-shots/jungle-animals-1.ogg",
      timing: {randomDelay: {min: 30, max: 120}}
    },
    jungleAnimals2: {
      src: "land-animals-and-beasts/one-shots/jungle-animals-2.ogg",
      timing: {randomDelay: {min: 30, max: 240}}
    },
    jungleAnimals3: {
      src: "land-animals-and-beasts/one-shots/jungle-animals-3.ogg",
      timing: {randomDelay: {min: 30, max: 120}}
    },
    jungleAnimals4: {
      src: "land-animals-and-beasts/one-shots/jungle-animals-4.ogg",
      timing: {randomDelay: {min: 30, max: 120}}
    },
    strangeBeast1: {
      src: "land-animals-and-beasts/one-shots/strange-beast-1.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    strangeBeast2: {
      src: "land-animals-and-beasts/one-shots/strange-beast-2.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    strangeBeast3: {
      src: "land-animals-and-beasts/one-shots/strange-beast-3.ogg",
      timing: {randomDelay: {min: 20, max: 120}}
    },
    strangeBeast4: {
      src: "land-animals-and-beasts/one-shots/strange-beast-4.ogg",
      timing: {randomDelay: {min: 20, max: 60}}
    },

    /* -------------------------------------------- */
    /*  Thunder                                     */
    /* -------------------------------------------- */

    // One-Shots
    thunderClose: {
      src: "thunder/one-shots/thunder-close.ogg"
    },
    thunderMedium: {
      src: "thunder/one-shots/thunder-medium.ogg"
    },
    thunderFar: {
      src: "thunder/one-shots/thunder-far.ogg"
    },

    /* -------------------------------------------- */
    /*  Machinery                                       */
    /* -------------------------------------------- */

    // Loops
    mineCart: {src: "machinery/loops/mine-cart.ogg"},
    spinningBlades: {src: "machinery/loops/spinning-blades.ogg"},
    steamLoop: {src: "machinery/loops/steam-loop.ogg"},
    stoneClockworkMachine: {src: "machinery/loops/stone-clockwork-machine.ogg"},
    waterWheel: {src: "machinery/loops/water-wheel.ogg"},
    factoryHum: {src: "machinery/loops/factory-hum.ogg"},
    electricityArc: {src: "machinery/loops/electricity-arc.ogg"},

    // One-Shots

    powerOff: {src: "machinery/one-shots/power-off.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    decontamination: {src: "machinery/one-shots/decontamination.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    powerOn: {src: "machinery/one-shots/power-on.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    steamTrapOn: {src: "machinery/one-shots/steam-trap-on.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    steamTrapOff: {src: "machinery/one-shots/steam-trap-off.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    pressurePlateEchoey: {src: "machinery/one-shots/pressure-plate-echoey.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    valveSqueak: {src: "machinery/one-shots/valve-squeak.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    bigMachineryRotation: {src: "machinery/one-shots/big-machinery-rotation.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    mirrorRotate1: {src: "machinery/one-shots/mirror-rotate-1.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    mirrorRotate2: {src: "machinery/one-shots/mirror-rotate-2.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    mirrorRotate3: {src: "machinery/one-shots/mirror-rotate-3.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    wallMove: {src: "machinery/one-shots/wall-move.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    highTicking: {src: "machinery/one-shots/high-ticking.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    midTicking: {src: "machinery/one-shots/mid-ticking.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    midTicking2: {src: "machinery/one-shots/mid-ticking-2.ogg", timing: {randomDelay: {min: 5, max: 60}}},
    deepTicking: {src: "machinery/one-shots/deep-ticking.ogg", timing: {randomDelay: {min: 5, max: 60}}},


    /* -------------------------------------------- */
    /*  Magic                                       */
    /* -------------------------------------------- */

    // Loops
    magicDrone: {src: "magic/loops/magic-drone.ogg"},
    ghostlyAura: {src: "magic/loops/ghostly-aura.ogg"},
    magicAuraLoop: {src: "magic/loops/magic-aura-loop.ogg"},
    forcefieldDrone: {src: "magic/loops/forcefield-drone.ogg"},
    electricityMagicLoop: {src: "magic/loops/electricity-magic-loop.ogg"},
    antiMagicDrone: {src: "magic/loops/anti-magic-drone.ogg"},


    // One-Shots
    darkSpellOff: {src: "magic/one-shots/dark-spell-off.ogg"},
    darkSpellOn: {src: "magic/one-shots/dark-spell-on.ogg"},
    magicPillarWake: {src: "magic/one-shots/magic-pillar-wake.ogg"},
    magicBigShatter: {src: "magic/one-shots/magic-big-shatter.ogg"},

    /* -------------------------------------------- */
    /*  Metal                                       */
    /* -------------------------------------------- */

    // Loops
    metalScrap: {src: "metal/loops/metal-scrap.ogg"},
    deepBellAlarmLoop: {src: "metal/loops/deep-bell-alarm-loop.ogg"},

    // One-Shots
    metalScrapes1: {src: "metal/one-shots/metal-scrapes-1.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalScrapes2: {src: "metal/one-shots/metal-scrapes-2.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalScrapes3: {src: "metal/one-shots/metal-scrapes-3.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalScrapes4: {src: "metal/one-shots/metal-scrapes-4.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalScrapes5: {src: "metal/one-shots/metal-scrapes-5.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalScrapes6: {src: "metal/one-shots/metal-scrapes-6.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalScrapes7: {src: "metal/one-shots/metal-scrapes-7.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalHollowHit1: {src: "metal/one-shots/metal-hollow-hit-1.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalHollowHit2: {src: "metal/one-shots/metal-hollow-hit-2.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalHollowHit3: {src: "metal/one-shots/metal-hollow-hit-3.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalHollowHit4: {src: "metal/one-shots/metal-hollow-hit-4.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    metalHollowHit5: {src: "metal/one-shots/metal-hollow-hit-5.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    chainMovement: {src: "metal/one-shots/chain-movement.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    deepBellAlarmSingle: {src: "metal/one-shots/deep-bell-alarm-single.ogg", timing: {randomDelay: {min: 20, max: 100}}},

    /* -------------------------------------------- */
    /*  Mining                                      */
    /* -------------------------------------------- */

    // One-Shots
    miningContainerMovement: {
      src: "mining/one-shots/mining-container-movement.ogg",
      timing: {randomDelay: {min: 0, max: 120}}
    },
    miningPickaxes: {
      src: "mining/one-shots/mining-pickaxes.ogg",
      timing: {randomDelay: {min: 0, max: 120}, fadeIn: 3, fadeOut: 3}
    },
    mineCartMoving: {src: "mining/one-shots/mine-cart-moving.ogg", timing: {randomDelay: {min: 20, max: 100}}},


    /* -------------------------------------------- */
    /*  Rock                                        */
    /* -------------------------------------------- */

    // One-Shots
    bigStones1: {src: "rock/one-shots/big-stones-1.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    bigStones2: {src: "rock/one-shots/big-stones-2.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    bigStones3: {src: "rock/one-shots/big-stones-3.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    bigStones4: {src: "rock/one-shots/big-stones-4.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    rockFall1: {src: "rock/one-shots/rock-fall-1.ogg", timing: {randomDelay: {min: 50, max: 100}}},
    rockFall2: {src: "rock/one-shots/rock-fall-2.ogg", timing: {randomDelay: {min: 50, max: 100}}},
    rockFall3: {src: "rock/one-shots/rock-fall-3.ogg", timing: {randomDelay: {min: 50, max: 100}}},
    rockMovement1: {src: "rock/one-shots/rock-movement-1.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    rockMovement2: {src: "rock/one-shots/rock-movement-2.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    rockMovement3: {src: "rock/one-shots/rock-movement-3.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    earthquakeTremor: {src: "rock/one-shots/earthquake-tremor.ogg", timing: {randomDelay: {min: 10, max: 200}}},
    rubbleClear: {src: "rock/one-shots/rubble-clear.ogg"},


    /* -------------------------------------------- */
    /*  Rural                                       */
    /* -------------------------------------------- */

    // Loops
    farmAmbience: {src: "rural/loops/farm-ambience.ogg"},

    // One-Shots
    farmOneShot: {
      src: "rural/loops/farm-ambience.ogg",
      timing: {randomDelay: {min: 40, max: 120}, fadeIn: 6, fadeOut: 6}
    },

    /* -------------------------------------------- */
    /*  Ship                                        */
    /* -------------------------------------------- */

    // Loops
    creakingIdleBoat: {src: "ship/loops/creaking-idle-boat.ogg"},

    /* -------------------------------------------- */
    /*  Swamp and Mud                               */
    /* -------------------------------------------- */

    // Loops
    mudSquish: {src: "swamp-and-mud/loops/mud-squish.ogg"},
    mudpotLoop: {src: "swamp-and-mud/loops/mudpot-loop.ogg"},

    // One-Shots
    mudSquish1: {src: "swamp-and-mud/one-shots/mud-squish-1.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    mudSquish2: {src: "swamp-and-mud/one-shots/mud-squish-2.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    ooze1: {src: "swamp-and-mud/one-shots/ooze-1.ogg", timing: {randomDelay: {min: 0, max: 30}}},
    ooze2: {src: "swamp-and-mud/one-shots/ooze-2.ogg", timing: {randomDelay: {min: 0, max: 30}}},
    ooze3: {src: "swamp-and-mud/one-shots/ooze-3.ogg", timing: {randomDelay: {min: 0, max: 30}}},
    ooze4: {src: "swamp-and-mud/one-shots/ooze-4.ogg", timing: {randomDelay: {min: 0, max: 30}}},
    ooze5: {src: "swamp-and-mud/one-shots/ooze-5.ogg", timing: {randomDelay: {min: 0, max: 30}}},
    swampBubbles: {
      src: "swamp-and-mud/one-shots/swamp-bubbles.ogg",
      timing: {randomDelay: {min: 0, max: 120}, fadeIn: 6, fadeOut: 6}
    },
    slosh1: {src: "swamp-and-mud/one-shots/slosh-1.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    slosh2: {src: "swamp-and-mud/one-shots/slosh-2.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    slosh3: {src: "swamp-and-mud/one-shots/slosh-3.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    slosh4: {src: "swamp-and-mud/one-shots/slosh-4.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    slosh5: {src: "swamp-and-mud/one-shots/slosh-5.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    slosh6: {src: "swamp-and-mud/one-shots/slosh-6.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    slosh7: {src: "swamp-and-mud/one-shots/slosh-7.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    mudpot: {
      src: "swamp-and-mud/one-shots/mudpot.ogg",
      timing: {randomDelay: {min: 0, max: 120}, fadeIn: 6, fadeOut: 6}
    },
    wetSavannahSwamp: {
      src: "swamp-and-mud/one-shots/wet-savannah-swamp.ogg",
      timing: {randomDelay: {min: 0, max: 120}, fadeIn: 6, fadeOut: 6}
    },

    /* -------------------------------------------- */
    /*  Underground                                 */
    /* -------------------------------------------- */

    // Loops
    cavernDrone: {src: "underground/loops/cavern-drone.ogg"},
    deepMovements: {src: "underground/loops/deep-movements.ogg"},

    // One-Shots
    horrorCaveSwell1: {src: "underground/one-shots/horror-cave-swell-1.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    horrorCaveSwell2: {src: "underground/one-shots/horror-cave-swell-2.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    horrorCaveSwell3: {src: "underground/one-shots/horror-cave-swell-3.ogg", timing: {randomDelay: {min: 0, max: 120}}},
    horrorCaveSwell4: {src: "underground/one-shots/horror-cave-swell-4.ogg", timing: {randomDelay: {min: 0, max: 120}}},

    /* -------------------------------------------- */
    /*  Urban                                       */
    /* -------------------------------------------- */

    // Loops
    docksSmall: {src: "urban/loops/docks-small.ogg"},

    // One-Shots
    bells: {src: "urban/one-shots/bells.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    alarmBell: {src: "urban/one-shots/alarm-bell.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    carriageHorseClose: {src: "urban/one-shots/carriage-horse-close.ogg", timing: {randomDelay: {min: 20, max: 100}}, randomVolume: {min: 0.2, max: 0.8}},
    carriageOnGravel1: {src: "urban/one-shots/carriage-on-gravel-1.ogg", timing: {randomDelay: {min: 20, max: 100}}, randomVolume: {min: 0.2, max: 0.8}},
    carriageOnGravel2: {src: "urban/one-shots/carriage-on-gravel-2.ogg", timing: {randomDelay: {min: 20, max: 100}}, randomVolume: {min: 0.2, max: 0.8}},

    /* -------------------------------------------- */
    /*  Voices                                      */
    /* -------------------------------------------- */

    // Loops
    maleGruntingWalla: {src: "voices/loops/male-grunting-walla.ogg"},
    townVoices: {src: "voices/loops/town-voices.ogg"},
    townVoicesMuffled: {src: "voices/loops/town-voices-muffled.ogg"},
    crowdMurmur: {src: "voices/loops/crowd-murmur.ogg"},
    crowdHallMurmur: {src: "voices/loops/crowd-hall-murmur.ogg"},
    crowdPanic1: {src: "voices/loops/crowd-panic-1.ogg"},
    festivalCrowd: {src: "voices/loops/festival-crowd.ogg"},
    fightingGroansAndSwords: {src: "voices/loops/fighting-groans-and-swords.ogg"},
    cityVoices: {src: "voices/loops/city-voices.ogg"},
    cityVoicesMuffled: {src: "voices/loops/city-voices-muffled.ogg"},
    crowdCheeringOnFight: {src: "voices/loops/crowd-cheering-on-fight.ogg"},
    distantWarpedVoices: {src: "voices/loops/distant-warped-voices.ogg"},
    echoingPartyVoices: { src: "voices/loops/echoing-party-voices.ogg" },


    // One-Shots
    crowdPanic2: {src: "voices/one-shots/crowd-panic-2.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    crowdPanic3: {src: "voices/one-shots/crowd-panic-3.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    crowdPanic4: {src: "voices/one-shots/crowd-panic-4.ogg", timing: {randomDelay: {min: 20, max: 100}}},
    childrenPlaying1: {src: "voices/one-shots/children-playing-1.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    childrenPlaying2: {src: "voices/one-shots/children-playing-2.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    childrenPlaying3: {src: "voices/one-shots/children-playing-3.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    childrenPlaying4: {src: "voices/one-shots/children-playing-4.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    crowdBattleCry1: {src: "voices/one-shots/crowd-battle-cry-1.ogg", timing: {randomDelay: {min: 20, max: 80}}},
    crowdBattleCry2: {src: "voices/one-shots/crowd-battle-cry-2.ogg", timing: {randomDelay: {min: 20, max: 80}}},
    crowdBattleCry3: {src: "voices/one-shots/crowd-battle-cry-3.ogg", timing: {randomDelay: {min: 20, max: 80}}},


    /* -------------------------------------------- */
    /*  Water                                       */
    /* -------------------------------------------- */

    // Loops
    waterDrip: {src: "water/loops/water-drip.ogg"},
    waterDripCaveLoud: {src: "water/loops/water-drip-cave-loud.ogg"},
    waterDripCave: {src: "water/loops/water-drip-cave.ogg"},
    waterDrippingOnRocks: {src: "water/loops/water-dripping-on-rocks.ogg"},
    oceanWaves: {src: "water/loops/ocean-waves.ogg"},
    tidePool: {src: "water/loops/tide-pool.ogg"},
    tidePoolNight: {src: "water/loops/tide-pool-night.ogg"},
    bubblesSparse: {src: "water/loops/bubbles-sparse.ogg"},
    bubblesSustained: {src: "water/loops/bubbles-sustained.ogg"},
    deepBubbles: {src: "water/loops/deep-bubbles.ogg"},
    caveRiver: {src: "water/loops/cave-river.ogg"},
    caveWaterfall: {src: "water/loops/cave-waterfall.ogg"},
    waterfall: {src: "water/loops/waterfall.ogg"},
    wideRiverWaves: {src: "water/loops/wide-river-waves.ogg"},
    waterGutterLoop: {src: "water/one-shots/water-gutter.ogg"},
    waterSpinning: {src: "water/loops/water-spinning.ogg"},
    waterFountainSmall: {src: "water/loops/water-fountain-small.ogg"},
    waterFountainLarge: {src: "water/loops/water-fountain-large.ogg"},


    // One-Shots
    waterGutter: {
      src: "water/one-shots/water-gutter.ogg",
      timing: {randomDelay: {min: 0, max: 120}, fadeIn: 6, fadeOut: 6}
    },
    bubblesSwell: {src: "water/one-shots/bubbles-swell.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    deepBelow1: {src: "water/one-shots/deep-below-1.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    deepBelow2: {src: "water/one-shots/deep-below-2.ogg", timing: {randomDelay: {min: 30, max: 120}}},
    deepBelow3: {src: "water/one-shots/deep-below-3.ogg", timing: {randomDelay: {min: 30, max: 120}}},

    /* -------------------------------------------- */
    /*  Wind                                        */
    /* -------------------------------------------- */

    // Loops
    howlingWind: {src: "wind/loops/howling-wind.ogg"},
    desolateFieldWind: {src: "wind/loops/desolate-field-wind.ogg"},
    whistlingWind: {src: "wind/loops/whistling-wind.ogg"},
    windThroughStone: {src: "wind/loops/wind-through-stone.ogg"},
    desertCanyonWind: {src: "wind/loops/desert-canyon-wind.ogg"},
    windTreeRustle: {src: "wind/loops/wind-tree-rustle.ogg"},
    whisperWind: {src: "wind/loops/whisper-wind.ogg"},

    // One-Shots
    windyFlag: {src: "wind/one-shots/windy-flag.ogg", timing: {randomDelay: {min: 0, max: 60}}},

    /* -------------------------------------------- */
    /*  Wood                                        */
    /* -------------------------------------------- */

    // One-Shots
    creakingWood1: {src: "wood/one-shots/creaking-wood-1.ogg", timing: {randomDelay: {min: 0, max: 60}}},
    creakingWood2: {src: "wood/one-shots/creaking-wood-2.ogg", timing: {randomDelay: {min: 0, max: 60}}}
  },

  /* -------------------------------------------- */
  /*  Arrangements                                */
  /* -------------------------------------------- */

  arrangements: {

    // Campsite Vista
    campVista: {
      label: "Camp Vista",
      layers: {
        campfire: 1.0,
        campFoley1: 0.6,
        campFoley2: 0.6,
        campFoley3: 0.6,
        campFoley4: 0.6,
        campFoley5: 0.6,
        campFoley6: 0.6,
        campFoley7: 0.6,
        campFoley8: 0.6,
        campFoley9: 0.6
      }
    },

    // KADISOS - BIOMES
    bluffsDay: {
      label: "Bluffs Day",
      layers: {
        mountainBirds: 2.0,
        howlingWind: 0.6,
        oceanWaves: 0.2,
        gulls: 0.8,
        windyFlag: 0.7
      }
    },
    bluffsNight: {
      label: "Bluffs Night",
      layers: {
        howlingWind: 0.6,
        oceanWaves: 0.2,
        barnOwl: 1.0
      }
    },
    cauldronDay: {
      label: "Cauldron Day",
      layers: {
        tidePool: 1.0,
        whistlingWind: 1.0,
        bubblesSparse: 0.4,
        mosquitoSwarm: 1.0
      }
    },
    cauldronNight: {
      label: "Cauldron Night",
      layers: {
        tidePool: 1.0,
        bubblesSparse: 0.4,
        mosquitoSwarm: 1.0
      }
    },
    jungleDay: {
      label: "Jungle Day",
      layers: {
        rainforest: 0.8,
        jungleAnimals1: 0.7,
        jungleAnimals2: 0.5,
        jungleAnimals3: 0.8,
        jungleAnimals4: 0.9,
        jungleBirds1: 0.6,
        jungleBirds2: 0.8
      }
    },
    jungleNight: {
      label: "Jungle Night",
      layers: {
        rainforestNight: 0.2,
        rainforestNight2: 0.8,
        jungleAnimals1: 0.8,
        mosquitoSwarm: 1.0,
        barnOwl: 1.0
      }
    },
    mountainsDay: {
      label: "Mountains Day",
      layers: {
        forestBirds: 0.8,
        mountainBirds: 1.0,
        whistlingWind: 1.0,
        rockFall1: 1.0,
        rockFall2: 1.0,
        rockFall3: 1.0
      }
    },
    mountainsNight: {
      label: "Mountains Night",
      layers: {
        crickets: 1.0,
        mosquitoSwarm: 1.0,
        whistlingWind: 1.0,
        barnOwl: 1.0,
        rockFall1: 1.0,
        rockFall2: 1.0,
        rockFall3: 1.0
      }
    },
    oceanDay: {
      label: "Ocean Day",
      layers: {
        oceanWaves: 0.4
      }
    },
    oceanNight: {
      label: "Ocean Night",
      layers: {
        oceanWaves: 0.4
      }
    },
    oceanShip: {
      label: "Ocean Ship",
      layers: {
        oceanWaves: 0.8,
        creakingIdleBoat: 1.0
      }
    },
    tidalPoolsDay: {
      label: "Tidal Pools Day",
      layers: {
        tidePool: 1.0,
        gulls: 0.8,
        mosquitoSwarm: 1.0
      }
    },
    tidalPoolsNight: {
      label: "Tidal Pools Night",
      layers: {
        tidePool: 1.0,
        tidePoolNight: 1.0,
        mosquitoSwarm: 1.0
      }
    },
    teethDay: {
      label: "The Teeth Day",
      layers: {
        oceanWaves: 0.4,
        howlingWind: 0.6,
        gulls: 0.7,
        creakingWood1: 0.4,
        creakingWood2: 0.4,
        windyFlag: 0.9
      }
    },
    teethNight: {
      label: "The Teeth Night",
      layers: {
        oceanWaves: 0.4,
        howlingWind: 0.6,
        creakingWood1: 0.4,
        creakingWood2: 0.4,
        windyFlag: 0.9
      }
    },

    // KADISOS - LOCATIONS
    gravensRestDay: {
      label: "Graven's Rest Day",
      layers: {
        // Loops
        docksSmall: 0.8,
        tidePool: 0.8,
        townVoices: 0.8,
        // Random
        bells: 0.3,
        creakingWood1: 0.3,
        creakingWood2: 0.3,
        gulls: 0.7,
        windyFlag: 0.8
      }
    },
    gravensRestNight: {
      label: "Graven's Rest Night",
      layers: {
        // Loops
        docksSmall: 0.8,
        tidePool: 0.8,
        // Random
        creakingWood1: 0.3,
        creakingWood2: 0.3
      }
    },
    raiderHideoutDay: {
      label: "Raiders' Hideout Day",
      layers: {
        mountainBirds: 2.0,
        howlingWind: 0.4,
        docksSmall: 0.8,
        gulls: 0.6,
        windyFlag: 0.5,
        creakingWood1: 0.3,
        creakingWood2: 0.3,
        maleGruntingWalla: 0.5
      }
    },
    raiderHideoutNight: {
      label: "Raiders' Hideout Night",
      layers: {
        howlingWind: 0.6,
        docksSmall: 0.8,
        barnOwl: 1.0,
        creakingWood1: 0.3,
        creakingWood2: 0.3
      }
    },
    sunkenRejarh: {
      label: "Sunken Rejarh",
      layers: {
        rockMovement1: 1.0,
        rockMovement2: 1.0,
        rockMovement3: 1.0,
        waterDrip: 1.0,
        bubblesSwell: 1.0,
        crystalShimmer1: 1.0,
        crystalShimmer2: 1.0,
        deepBelow1: 1.0,
        deepBelow2: 1.0,
        deepBelow3: 1.0,
        deepBubbles: 1.0,
        heatSizzle1: 1.0,
        heatSizzle2: 1.0,
        bubblesSustained: 0.2,
        bubblesSparse: 0.2
      }
    },
    ancientRuins: {
      label: "Ancient Ruins",
      layers: {
        metalScrapes1: 0.3,
        metalScrapes2: 0.3,
        metalScrapes3: 0.3,
        metalScrapes4: 0.3,
        metalScrapes5: 0.3,
        metalScrapes6: 0.3,
        metalScrapes7: 0.3,
        rockFall1: 0.3,
        rockFall2: 0.3,
        rockFall3: 0.3,
        deepMovements: 1.0,
        windThroughStone: 1.0
      }
    },
    ancientRuinsMagicDepths: {
      label: "Ancient Ruins Magic Depths",
      layers: {
        metalScrapes1: 0.3,
        metalScrapes2: 0.3,
        metalScrapes3: 0.3,
        metalScrapes4: 0.3,
        metalScrapes5: 0.3,
        metalScrapes6: 0.3,
        metalScrapes7: 0.3,
        magicDrone: 0.4,
        rockFall1: 0.3,
        rockFall2: 0.3,
        rockFall3: 0.3,
        deepMovements: 1.0,
        windThroughStone: 0.3
      }
    },
    bloodletterCave: {
      label: "Bloodletter Cave",
      layers: {
        caveRiver: 0.8,
        cavernDrone: 0.8,
        creatureWings1: 1.0,
        creatureWings2: 1.0,
        creatureWings3: 1.0,
        creatureWings4: 1.0,
        flappingWings: 0.6,
        flySwarm: 0.8,
        magicDrone: 0.8,
        mudSquish: 1.0,
        waterDripCave: 0.8,
        mosquitoSwarm: 0.8
      }
    },
    shipwreckDay: {
      label: "Shipwreck Day",
      layers: {
        oceanWaves: 0.4,
        howlingWind: 0.6,
        gulls: 0.7,
        creakingWood1: 0.9,
        creakingWood2: 0.9,
        windyFlag: 0.9
      }
    },
    shipwreckNight: {
      label: "Shipwreck Night",
      layers: {
        oceanWaves: 0.4,
        howlingWind: 0.6,
        creakingWood1: 0.9,
        creakingWood2: 0.9,
        windyFlag: 0.9
      }
    },
    noxiousCave: {
      label: "Noxious Cave",
      layers: {
        cavernDrone: 0.8,
        horrorCaveSwell1: 1.0,
        horrorCaveSwell2: 1.0,
        horrorCaveSwell3: 1.0,
        bubblesSwell: 0.4,
        mosquitoSwarm: 1.0,
        whistlingWind: 0.4,
        windThroughStone: 0.7,
        heatSizzle1: 1.0,
        heatSizzle2: 1.0
      }
    },

    // FOREST OF STONE - BIOMES
    forestStoneDay: {
      label: "Forest of Stone Day",
      layers: {
        bigStones1: 1.0,
        bigStones2: 1.0,
        bigStones3: 1.0,
        bigStones4: 1.0,
        strangeBeast1: 1.0,
        strangeBeast2: 1.0,
        strangeBeast3: 1.0,
        strangeBeast4: 1.0,
        frogsAndBirds: 1.0,
        strangeFrogs: 1.0,
        desertCanyonWind: 1.0,
        windTreeRustle: 1.0,
        mosquitoSwarm: 0.4,
        flyingMonkey1: 1.0,
        flyingMonkey2: 1.0,
        leafRustle1: 0.5,
        leafRustle2: 0.5
      }
    },
    forestStoneNight: {
      label: "Forest of Stone Night",
      layers: {
        bigStones1: 1.0,
        bigStones2: 1.0,
        bigStones3: 1.0,
        bigStones4: 1.0,
        strangeBeast1: 0.5,
        strangeBeast2: 0.5,
        strangeBeast3: 0.5,
        strangeBeast4: 0.5,
        frogsAndBirds: 0.7,
        strangeFrogs: 0.7,
        desertCanyonWind: 0.7,
        windTreeRustle: 0.7,
        lakesideCrickets: 1.0,
        leafRustle1: 0.5,
        leafRustle2: 0.5
      }
    },
    spiresDay: {
      label: "Rock Spires Day",
      layers: {
        bigStones1: 1.0,
        bigStones2: 1.0,
        bigStones3: 1.0,
        bigStones4: 1.0,
        strangeBeast1: 1.0,
        strangeBeast2: 1.0,
        strangeBeast3: 1.0,
        strangeBeast4: 1.0,
        desertCanyonWind: 1.0,
        windTreeRustle: 1.0,
        whistlingWind: 0.5
      }
    },
    spiresNight: {
      label: "Rock Spires Night",
      layers: {
        bigStones1: 1.0,
        bigStones2: 1.0,
        bigStones3: 1.0,
        bigStones4: 1.0,
        strangeBeast1: 0.7,
        strangeBeast2: 0.7,
        strangeBeast3: 0.7,
        strangeBeast4: 0.7,
        desertCanyonWind: 1.0,
        windTreeRustle: 1.0,
        whistlingWind: 0.5,
        lakesideCrickets: 1.0
      }
    },
    dripstonesDay: {
      label: "Dripstones Day",
      layers: {
        bigStones1: 0.8,
        bigStones2: 0.8,
        bigStones3: 0.8,
        bigStones4: 0.8,
        strangeFrogs: 0.7,
        swampBubbles: 0.6,
        waterGutter: 0.5,
        waterDrippingOnRocks: 0.5,
        desertCanyonWind: 0.4,
        lakesideCrickets: 0.3,
        mosquitoSwarm: 0.4,
        wetSavannahSwamp: 0.5,
        waterDripCaveLoud: 0.5,
        slosh1: 0.5,
        slosh2: 0.5,
        slosh3: 0.5,
        slosh4: 0.5,
        slosh5: 0.5,
        slosh6: 0.5,
        slosh7: 0.5,
        mudSquish1: 0.4,
        mudSquish2: 0.4,
        mudpot: 0.6,
        tidePool: 0.8
      }
    },
    dripstonesNight: {
      label: "Dripstones Night",
      layers: {
        bigStones1: 0.8,
        bigStones2: 0.8,
        bigStones3: 0.8,
        bigStones4: 0.8,
        strangeFrogs: 0.5,
        swampBubbles: 0.5,
        waterDrippingOnRocks: 0.6,
        ghostlyAura: 0.7,
        desertCanyonWind: 0.3,
        lakesideCrickets: 0.7,
        waterDripCaveLoud: 0.5,
        slosh1: 0.4,
        slosh2: 0.4,
        slosh3: 0.4,
        slosh4: 0.4,
        slosh5: 0.4,
        slosh6: 0.4,
        slosh7: 0.4,
        mudSquish1: 0.3,
        mudSquish2: 0.3,
        mudpot: 0.5,
        tidePool: 0.8
      }
    },
    YakoshtaNight: {
      label: "Yakoshta Night",
      layers: {
        bigStones1: 0.8,
        bigStones2: 0.8,
        bigStones3: 0.8,
        bigStones4: 0.8,
        strangeFrogs: 0.3,
        waterDrippingOnRocks: 0.6,
        ghostlyAura: 0.7,
        lakesideCrickets: 0.7,
        waterDripCaveLoud: 0.5,
        slosh1: 0.4,
        slosh2: 0.4,
        slosh3: 0.4,
        slosh4: 0.4,
        slosh5: 0.4,
        slosh6: 0.4,
        slosh7: 0.4,
        mudSquish1: 0.3,
        mudSquish2: 0.3,
        farmAmbience: 0.4,
        miningContainerMovement: 0.4,
        miningPickaxes: 0.3,
        mineCartMoving: 0.3,
        townVoices: 0.6,
        reverseCrystalBreakEchoes1: 0.6,
        reverseCrystalBreakEchoes2: 0.6,
        reverseCrystalBreakEchoes3: 0.6,
        reverseCrystalBreakEchoes4: 0.6
      }
    },
    YakoshtaDay: {
      label: "Yakoshta Day",
      layers: {
        bigStones1: 0.8,
        bigStones2: 0.8,
        bigStones3: 0.8,
        bigStones4: 0.8,
        strangeFrogs: 0.4,
        waterDrippingOnRocks: 0.5,
        lakesideCrickets: 0.3,
        mosquitoSwarm: 0.4,
        wetSavannahSwamp: 0.5,
        waterDripCaveLoud: 0.5,
        slosh1: 0.5,
        slosh2: 0.5,
        slosh3: 0.5,
        slosh4: 0.5,
        slosh5: 0.5,
        slosh6: 0.5,
        slosh7: 0.5,
        mudSquish1: 0.4,
        mudSquish2: 0.4,
        farmAmbience: 0.6,
        miningContainerMovement: 0.6,
        miningPickaxes: 0.6,
        mineCartMoving: 0.9,
        townVoices: 0.8,
        reverseCrystalBreakEchoes1: 0.6,
        reverseCrystalBreakEchoes2: 0.6,
        reverseCrystalBreakEchoes3: 0.6,
        reverseCrystalBreakEchoes4: 0.6
      }
    },
    shentWaterTempleDay: {
      label: "Shent Water Temple Day",
      layers: {
        waterGutter: 0.5,
        waterDrippingOnRocks: 0.5,
        ghostlyAura: 0.7,
        desertCanyonWind: 0.4,
        lakesideCrickets: 0.3,
        mosquitoSwarm: 0.4,
        waterDripCaveLoud: 0.5,
        slosh1: 0.5,
        slosh2: 0.5,
        slosh3: 0.5,
        slosh4: 0.5,
        slosh5: 0.5,
        slosh6: 0.5,
        slosh7: 0.5,
        tidePool: 1.0,
        wideRiverWaves: 0.3
      }
    },
    shentWaterTempleNight: {
      label: "Shent Water Temple Night",
      layers: {
        waterGutter: 0.5,
        waterDrippingOnRocks: 0.6,
        ghostlyAura: 0.7,
        desertCanyonWind: 0.4,
        lakesideCrickets: 0.7,
        waterDripCaveLoud: 0.5,
        slosh1: 0.5,
        slosh2: 0.5,
        slosh3: 0.5,
        slosh4: 0.5,
        slosh5: 0.5,
        slosh6: 0.5,
        slosh7: 0.5,
        tidePool: 1.0,
        crickets: 0.5,
        wideRiverWaves: 0.3
      }
    },
    kaleidoscopeCaverns: {
      label: "Kaleidoscope Caverns",
      layers: {
        deepCrystalShimmer: 1.0,
        deepCrystalDrone: 1.0,
        horrorCaveSwell1: 1.0,
        horrorCaveSwell2: 1.0,
        horrorCaveSwell3: 1.0,
        horrorCaveSwell4: 1.0,
        reverseCrystalBreakEchoes1: 1.0,
        reverseCrystalBreakEchoes2: 1.0,
        reverseCrystalBreakEchoes3: 1.0,
        reverseCrystalBreakEchoes4: 1.0,
        reverseCrystalBreakEchoes5: 1.0,
        reverseCrystalBreakEchoes6: 1.0,
        reverseCrystalBreakEchoes7: 1.0,
        reverseCrystalBreakEchoes8: 1.0,
        reverseCrystalBreakEchoes9: 1.0,
        reverseCrystalBreakEchoes10: 1.0,
        reverseCrystalBreakEchoes11: 1.0,
        reverseCrystalBreakEchoes12: 1.0,
        reverseCrystalBreakEchoes13: 1.0,
        whisperWind: 0.3
      }
    },
    kaleidoscopeGrave: {
      label: "Kaleidoscope Grave",
      layers: {
        deepCrystalShimmer: 1.0,
        deepCrystalDrone: 1.0,
        horrorCaveSwell1: 1.0,
        horrorCaveSwell2: 1.0,
        horrorCaveSwell3: 1.0,
        horrorCaveSwell4: 1.0,
        reverseCrystalBreakEchoes1: 1.0,
        reverseCrystalBreakEchoes2: 1.0,
        reverseCrystalBreakEchoes3: 1.0,
        reverseCrystalBreakEchoes4: 1.0,
        reverseCrystalBreakEchoes5: 1.0,
        reverseCrystalBreakEchoes6: 1.0,
        reverseCrystalBreakEchoes7: 1.0,
        reverseCrystalBreakEchoes8: 1.0,
        reverseCrystalBreakEchoes9: 1.0,
        reverseCrystalBreakEchoes10: 1.0,
        reverseCrystalBreakEchoes11: 1.0,
        reverseCrystalBreakEchoes12: 1.0,
        reverseCrystalBreakEchoes13: 1.0,
        whisperWind: 1.0,
        waterDripCave: 0.7,
        ghostlyAura: 1.0,
        cavernDrone: 0.6
      }
    },
    helkasDay: {
      label: "Helkas Day",
      layers: {
        farmAmbience: 0.6,
        miningContainerMovement: 0.6,
        miningPickaxes: 0.6,
        mineCartMoving: 0.9,
        crickets: 0.5,
        townVoices: 0.8,
        bells: 0.1,
        metalScrapes1: 0.2,
        metalScrapes2: 0.2,
        metalScrapes3: 0.2,
        metalScrapes4: 0.2,
        metalScrapes5: 0.2,
        metalScrapes6: 0.2,
        metalScrapes7: 0.2,
        rockMovement1: 0.7,
        rockMovement2: 0.7,
        rockMovement3: 0.7,
        mosquitoSwarm: 0.4,
        rockFall1: 1.0,
        rockFall2: 1.0,
        rockFall3: 1.0,
        frogsAndBirds: 0.5,
        strangeFrogs: 0.5,
        rainforest: 0.2
      }
    },
    helkasNight: {
      label: "Helkas Night",
      layers: {
        crickets: 1.0,
        townVoices: 0.1,
        farmAmbience: 0.5,
        rockFall1: 0.3,
        rockFall2: 0.3,
        rockFall3: 0.3,
        mosquitoSwarm: 0.4,
        rainforestNight: 0.2,
        strangeFrogs: 0.4
      }
    },
    helkasFestival: {
      label: "Helkas Festival",
      layers: {
        farmAmbience: 0.6,
        crickets: 0.2,
        townVoices: 0.6,
        bells: 0.3,
        festivalCrowd: 0.5,
        rockMovement1: 0.4,
        rockMovement2: 0.4,
        rockMovement3: 0.4,
        rockFall1: 0.5,
        rockFall2: 0.5,
        rockFall3: 0.5,
        frogsAndBirds: 0.4,
        strangeFrogs: 0.3,
        rainforest: 0.1,
        childrenPlaying1: 0.4,
        childrenPlaying2: 0.4,
        childrenPlaying3: 0.4,
        childrenPlaying4: 0.4

      }
    },
    helkasAttackDrakes: {
      label: "Helkas Attack (Drakes)",
      layers: {
        crickets: 0.2,
        bells: 0.4,
        rockMovement1: 0.7,
        rockMovement2: 0.7,
        rockMovement3: 0.7,
        mosquitoSwarm: 0.3,
        rockFall1: 1.0,
        rockFall2: 1.0,
        rockFall3: 1.0,
        townVoices: 0.2,
        frogsAndBirds: 0.1,
        strangeFrogs: 0.1,
        rainforest: 0.1,
        crowdPanic1: 0.1,
        crowdPanic2: 0.2,
        crowdPanic3: 0.4,
        crowdPanic4: 0.6,
        drake1: 1.0,
        drake2: 1.0,
        drake3: 1.0,
        drake4: 1.0,
        drake5: 1.0,
        drake6: 1.0,
        drake7: 1.0,
        drake8: 1.0,
        drake9: 1.0,
        drake10: 1.0,
        drake11: 1.0,
        drake12: 1.0,
        creakingWood1: 0.1,
        creakingWood2: 0.1,
        heatSizzle1: 1.0,
        heatSizzle2: 1.0
      }
    },
    helkasAttackRaiders: {
      label: "Helkas Attack (Raiders)",
      layers: {
        crickets: 0.2,
        bells: 0.4,
        rockMovement1: 0.7,
        rockMovement2: 0.7,
        rockMovement3: 0.7,
        mosquitoSwarm: 0.3,
        rockFall1: 1.0,
        rockFall2: 1.0,
        rockFall3: 1.0,
        townVoices: 0.2,
        frogsAndBirds: 0.1,
        strangeFrogs: 0.1,
        rainforest: 0.1,
        crowdPanic1: 0.1,
        crowdPanic2: 0.6,
        crowdPanic3: 0.6,
        crowdPanic4: 0.6,
        creakingWood1: 0.1,
        creakingWood2: 0.1,
        fightingGroansAndSwords: 0.4,
        crowdBattleCry1: 0.3,
        crowdBattleCry2: 0.3,
        crowdBattleCry3: 0.3
      }
    },
    helkasAttack: {
      label: "Helkas Attack",
      layers: {
        crickets: 0.2,
        bells: 0.4,
        rockMovement1: 0.7,
        rockMovement2: 0.7,
        rockMovement3: 0.7,
        mosquitoSwarm: 0.3,
        rockFall1: 1.0,
        rockFall2: 1.0,
        rockFall3: 1.0,
        townVoices: 0.2,
        frogsAndBirds: 0.1,
        strangeFrogs: 0.1,
        rainforest: 0.1,
        crowdPanic1: 0.1,
        crowdPanic2: 0.6,
        crowdPanic3: 0.6,
        crowdPanic4: 0.6,
        creakingWood1: 0.1,
        creakingWood2: 0.1,
        fightingGroansAndSwords: 0.2,
        crowdBattleCry1: 0.3,
        crowdBattleCry2: 0.3,
        crowdBattleCry3: 0.3
      }
    },
    oozeFarmDay: {
      label: "Ooze Farm Day",
      layers: {
        bigStones1: 0.4,
        bigStones2: 0.4,
        bigStones3: 0.4,
        bigStones4: 0.4,
        swampBubbles: 1.0,
        waterGutter: 0.5,
        waterDrippingOnRocks: 0.5,
        desertCanyonWind: 0.4,
        lakesideCrickets: 0.3,
        mosquitoSwarm: 0.5,
        wetSavannahSwamp: 0.8,
        waterDripCaveLoud: 0.5,
        slosh1: 1.0,
        slosh2: 1.0,
        slosh3: 1.0,
        slosh4: 1.0,
        slosh5: 1.0,
        slosh6: 1.0,
        slosh7: 1.0,
        mudSquish1: 1.0,
        mudSquish2: 1.0,
        mudpot: 1.0,
        farmAmbience: 1.0,
        bubblesSwell: 1.0,
        deepBubbles: 1.0,
        ooze1: 1.0,
        ooze2: 1.0,
        ooze3: 1.0,
        ooze4: 1.0,
        ooze5: 1.0
      }
    },
    oozeFarmNight: {
      label: "Ooze Farm Night",
      layers: {
        bigStones1: 0.4,
        bigStones2: 0.4,
        bigStones3: 0.4,
        bigStones4: 0.4,
        swampBubbles: 1.0,
        waterDrippingOnRocks: 0.6,
        ghostlyAura: 0.7,
        desertCanyonWind: 0.3,
        lakesideCrickets: 0.7,
        waterDripCaveLoud: 0.5,
        slosh1: 1.0,
        slosh2: 1.0,
        slosh3: 1.0,
        slosh4: 1.0,
        slosh5: 1.0,
        slosh6: 1.0,
        slosh7: 1.0,
        mudSquish1: 1.0,
        mudSquish2: 1.0,
        mudpot: 1.0,
        mosquitoSwarm: 0.5,
        bubblesSwell: 1.0,
        deepBubbles: 1.0,
        ooze1: 1.0,
        ooze2: 1.0,
        ooze3: 1.0,
        ooze4: 1.0,
        ooze5: 1.0
      }
    },
    yakoshtaMine: {
      label: "Yakoshta Mine",
      layers: {
        miningPickaxes: 0.3,
        waterDripCaveLoud: 0.6,
        bigStones1: 0.8,
        bigStones2: 0.8,
        bigStones3: 0.8,
        bigStones4: 0.8,
        rockMovement1: 0.7,
        rockMovement2: 0.7,
        rockMovement3: 0.7,
        cavernDrone: 1.0,
        miningContainerMovement: 0.5,
        deepMovements: 1.0,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        reverseCrystalBreakEchoes4: 0.2,
        reverseCrystalBreakEchoes5: 0.2,
        reverseCrystalBreakEchoes6: 0.2,
        reverseCrystalBreakEchoes7: 0.2,
        reverseCrystalBreakEchoes8: 0.2,
        horrorCaveSwell1: 1.0,
        horrorCaveSwell2: 1.0,
        horrorCaveSwell3: 1.0,
        horrorCaveSwell4: 1.0,
        ooze1: 0.5,
        ooze2: 0.5,
        ooze3: 0.5,
        ooze4: 0.5,
        ooze5: 0.5,
        metalScrapes1: 0.5,
        metalScrapes2: 0.5,
        metalScrapes3: 0.5,
        metalScrapes4: 0.5,
        metalScrapes5: 0.5,
        metalScrapes6: 0.5,
        metalScrapes7: 0.5,
        creakingWood1: 0.5,
        creakingWood2: 0.5,
        rockFall1: 0.7,
        rockFall2: 0.7,
        rockFall3: 0.7,
        earthquakeTremor: 0.7
      }
    },

    // ARCTUS PLATEAU - BIOMES
    goldenFlatsDay: {
      label: "Golden Flats Day",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        earthquakeTremor: 0.5,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        eagleCry1: 0.1,
        eagleCry2: 0.1,
        eagleCry3: 0.1,
        eagleCry4: 0.1,
        eagleCry5: 0.1
      }
    },
    goldenFlatsNight: {
      label: "Golden Flats Night",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        earthquakeTremor: 0.5,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        crickets: 1.0
      }
    },
    goldenFlatsWaterDay: {
      label: "Golden Flats Water Day",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        earthquakeTremor: 0.5,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        eagleCry1: 0.1,
        eagleCry2: 0.1,
        eagleCry3: 0.1,
        eagleCry4: 0.1,
        eagleCry5: 0.1,
        wideRiverWaves: 0.6
      }
    },
    goldenFlatsWaterNight: {
      label: "Golden Flats Water Night",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        earthquakeTremor: 0.5,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        crickets: 1.0,
        wideRiverWaves: 0.6
      }
    },
    rustvarValleysDay: {
      label: "Rustvar Valleys Day",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        mountainBirds: 1.0,
        crickets: 0.2,
        eagleCry1: 0.1,
        eagleCry2: 0.1,
        eagleCry3: 0.1,
        eagleCry4: 0.1,
        eagleCry5: 0.1,
        desertCanyonWind: 0.8
      }
    },
    rustvarValleysNight: {
      label: "Rustvar Valleys Night",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        crickets: 1.0,
        desertCanyonWind: 0.8
      }
    },
    corpinSanctuaryDay: {
      label: "Corpin Sanctuary Day",
      layers: {
        tallGrass: 0.1,
        desolateFieldWind: 0.8,
        earthquakeTremor: 0.5,
        rockMovement1: 0.1,
        rockMovement2: 0.1,
        rockMovement3: 0.1,
        eagleCry1: 0.05,
        eagleCry2: 0.05,
        eagleCry3: 0.05,
        eagleCry4: 0.05,
        eagleCry5: 0.05
      }
    },
    corpinSanctuaryNight: {
      label: "Corpin Sanctuary Night",
      layers: {
        tallGrass: 0.1,
        desolateFieldWind: 0.8,
        earthquakeTremor: 0.3,
        rockMovement1: 0.1,
        rockMovement2: 0.1,
        rockMovement3: 0.1,
        crickets: 0.6
      }
    },
    bloodwoodsDay: {
      label: "Blood Woods Day",
      layers: {
        windTreeRustle: 1.0,
        mangroveDay: 1.0,
        deepTreeCreaking1: 1.0,
        deepTreeCreaking2: 1.0,
        deepTreeCreaking3: 1.0,
        deepTreeCreaking4: 1.0,
        deepTreeCreaking5: 1.0,
        deepTreeCreaking6: 1.0,
        deepTreeCreaking7: 1.0,
        deepTreeCreaking8: 1.0,
        leafRustle1: 1.0,
        leafRustle2: 1.0,
        leafRustle3: 1.0,
        leafRustle4: 1.0,
        leafRustle5: 1.0,
        leafRustle6: 1.0,
        vulture: 1.0,
        crow: 1.0
      }
    },
    bloodwoodsNight: {
      label: "Blood Woods Night",
      layers: {
        windTreeRustle: 1.0,
        lakesideCrickets: 1.0,
        leafRustle1: 1.0,
        leafRustle2: 1.0,
        leafRustle3: 1.0,
        leafRustle4: 1.0,
        leafRustle5: 1.0,
        leafRustle6: 1.0,
        deepTreeCreaking1: 1.0,
        deepTreeCreaking2: 1.0,
        deepTreeCreaking3: 1.0,
        deepTreeCreaking4: 1.0,
        deepTreeCreaking5: 1.0,
        deepTreeCreaking6: 1.0,
        deepTreeCreaking7: 1.0,
        deepTreeCreaking8: 1.0
      }
    },
    ameraspGroveDay: {
      label: "Amerasp Grove Day",
      layers: {
        windTreeRustle: 1.0,
        mangroveDay: 1.0,
        deepTreeCreaking1: 1.0,
        deepTreeCreaking2: 1.0,
        deepTreeCreaking3: 1.0,
        deepTreeCreaking4: 1.0,
        deepTreeCreaking5: 1.0,
        deepTreeCreaking6: 1.0,
        deepTreeCreaking7: 1.0,
        deepTreeCreaking8: 1.0,
        leafRustle1: 1.0,
        leafRustle2: 1.0,
        leafRustle3: 1.0,
        leafRustle4: 1.0,
        leafRustle5: 1.0,
        leafRustle6: 1.0,
        vulture: 1.0,
        crow: 1.0,
        creatureWings1: 1.0,
        creatureWings2: 1.0,
        creatureWings3: 1.0,
        creatureWings4: 1.0,
        flySwarm: 0.8,
        monsterWasp1: 0.7,
        monsterWasp2: 0.7,
        monsterWasp3: 0.7,
        monsterWasp4: 0.7,
        monsterWasp5: 0.7,
        monsterWasp6: 0.7,
        flappingWings: 1.0,
        monsterWaspFlying: 0.3
      }
    },
    ameraspGroveNight: {
      label: "Amerasp Grove Night",
      layers: {
        windTreeRustle: 1.0,
        lakesideCrickets: 1.0,
        leafRustle1: 1.0,
        leafRustle2: 1.0,
        leafRustle3: 1.0,
        leafRustle4: 1.0,
        leafRustle5: 1.0,
        leafRustle6: 1.0,
        deepTreeCreaking1: 1.0,
        deepTreeCreaking2: 1.0,
        deepTreeCreaking3: 1.0,
        deepTreeCreaking4: 1.0,
        deepTreeCreaking5: 1.0,
        deepTreeCreaking6: 1.0,
        deepTreeCreaking7: 1.0,
        deepTreeCreaking8: 1.0,
        creatureWings1: 1.0,
        creatureWings2: 1.0,
        creatureWings3: 1.0,
        creatureWings4: 1.0,
        flySwarm: 0.8,
        monsterWasp1: 0.7,
        monsterWasp2: 0.7,
        monsterWasp3: 0.7,
        monsterWasp4: 0.7,
        monsterWasp5: 0.7,
        monsterWasp6: 0.7,
        flappingWings: 1.0,
        monsterWaspFlying: 0.3
      }
    },
    bleakArchive: {
      label: "Bleak Archive",
      layers: {
        deepCrystalShimmer: 0.3,
        deepCrystalDrone: 0.3,
        reverseCrystalBreakEchoes1: 0.4,
        reverseCrystalBreakEchoes2: 0.4,
        reverseCrystalBreakEchoes3: 0.4,
        reverseCrystalBreakEchoes4: 0.4,
        reverseCrystalBreakEchoes5: 0.4,
        reverseCrystalBreakEchoes6: 0.4,
        reverseCrystalBreakEchoes7: 0.4,
        reverseCrystalBreakEchoes8: 0.4,
        reverseCrystalBreakEchoes9: 0.4,
        reverseCrystalBreakEchoes10: 0.4,
        reverseCrystalBreakEchoes11: 0.4,
        reverseCrystalBreakEchoes12: 0.4,
        reverseCrystalBreakEchoes13: 0.4,
        ghostlyAura: 0.1,
        magicDrone: 0.3,
        metalScrapes1: 0.3,
        metalScrapes2: 0.3,
        metalScrapes3: 0.3,
        metalScrapes4: 0.3,
        metalScrapes5: 0.3,
        metalScrapes6: 0.3,
        metalScrapes7: 0.3,
        deepMovements: 1.0,
        cavernDrone: 0.6
      }
    },
    signara: {
      label: "Signara",
      layers: {
        deepCrystalShimmer: 0.1,
        deepCrystalDrone: 0.1,
        crystalShimmer1: 0.8,
        crystalShimmer2: 0.8,
        metalScrapes1: 0.2,
        metalScrapes2: 0.2,
        metalScrapes3: 0.2,
        metalScrapes4: 0.2,
        metalScrapes5: 0.2,
        metalScrapes6: 0.2,
        metalScrapes7: 0.2,
        ghostlyAura: 0.4,
        magicDrone: 0.2,
        deepBubbles: 0.3,
        rainforestNight2: 0.1,
        horrorCaveSwell1: 1.0,
        horrorCaveSwell2: 1.0,
        horrorCaveSwell3: 1.0,
        horrorCaveSwell4: 1.0
      }
    },
    redrakFieldsDay: {
      label: "Redrak Fields Day",
      layers: {
        farmAmbience: 1.0,
        leafRustle1: 1.0,
        leafRustle2: 1.0,
        leafRustle3: 1.0,
        leafRustle4: 1.0,
        leafRustle5: 1.0,
        leafRustle6: 1.0,
        windTreeRustle: 0.3,
        tallGrass: 0.1
      }
    },
    redrakFieldsNight: {
      label: "Redrak Fields Night",
      layers: {
        crickets: 1.0,
        farmAmbience: 0.5,
        leafRustle1: 1.0,
        leafRustle2: 1.0,
        leafRustle3: 1.0,
        leafRustle4: 1.0,
        leafRustle5: 1.0,
        leafRustle6: 1.0,
        windTreeRustle: 0.3,
        tallGrass: 0.1
      }
    },
    skybrushDay: {
      label: "Skybrush Day",
      layers: {
        tallGrass: 0.1,
        mountainBirds: 0.6,
        desolateFieldWind: 0.7,
        crickets: 0.2,
        eagleCry1: 0.05,
        eagleCry2: 0.05,
        eagleCry3: 0.05,
        eagleCry4: 0.05,
        eagleCry5: 0.05,
        desertCanyonWind: 0.7,
        townVoices: 0.8,
        creakingWood1: 0.2,
        creakingWood2: 0.2,
        deepTreeCreaking1: 0.6,
        deepTreeCreaking2: 0.6,
        deepTreeCreaking3: 0.6,
        deepTreeCreaking4: 0.6,
        whistlingWind: 0.6,
        windyFlag: 0.5,
        leafRustle1: 0.5,
        leafRustle2: 0.5,
        leafRustle3: 0.5,
        leafRustle4: 0.5,
        leafRustle5: 0.5,
        leafRustle6: 0.5
      }
    },
    skybrushNight: {
      label: "Skybrush Night",
      layers: {
        tallGrass: 0.1,
        mountainBirds: 0.6,
        desolateFieldWind: 0.7,
        crickets: 1.0,
        desertCanyonWind: 0.7,
        townVoices: 0.2,
        creakingWood1: 0.2,
        creakingWood2: 0.2,
        deepTreeCreaking1: 0.6,
        deepTreeCreaking2: 0.6,
        deepTreeCreaking3: 0.6,
        deepTreeCreaking4: 0.6,
        whistlingWind: 0.6,
        windyFlag: 0.5,
        leafRustle1: 0.5,
        leafRustle2: 0.5,
        leafRustle3: 0.5,
        leafRustle4: 0.5,
        leafRustle5: 0.5,
        leafRustle6: 0.5
      }
    },
    steedsPointDay: {
      label: "Steed's Point Day",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        earthquakeTremor: 0.5,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        eagleCry1: 0.1,
        eagleCry2: 0.1,
        eagleCry3: 0.1,
        eagleCry4: 0.1,
        eagleCry5: 0.1,
        creatureWings1: 1.0,
        creatureWings2: 1.0,
        creatureWings3: 1.0,
        creatureWings4: 1.0,
        deepTreeCreaking1: 1.0,
        deepTreeCreaking2: 1.0,
        deepTreeCreaking3: 1.0,
        deepTreeCreaking4: 1.0,
        deepTreeCreaking5: 1.0,
        deepTreeCreaking6: 1.0,
        deepTreeCreaking7: 1.0,
        deepTreeCreaking8: 1.0,
        plantGrowth1: 1.0,
        plantGrowth2: 1.0,
        plantGrowth3: 1.0,
        plantGrowth4: 1.0,
        plantGrowth5: 1.0,
        plantGrowth6: 1.0,
        plantGrowth7: 1.0,
        plantGrowth8: 1.0,
        plantGrowth9: 1.0,
        flySwarm: 0.4,
        forestBirds: 1.0,
        mudSquish: 0.5,
        vulture: 1.0,
        crow: 1.0,
        deepMovements: 0.4,
        howlingWind: 0.2
      }
    },
    steedsPointNight: {
      label: "Steed's Point Day",
      layers: {
        tallGrass: 0.2,
        desolateFieldWind: 1.0,
        earthquakeTremor: 0.5,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        eagleCry1: 0.1,
        eagleCry2: 0.1,
        eagleCry3: 0.1,
        eagleCry4: 0.1,
        eagleCry5: 0.1,
        crickets: 1.0,
        barnOwl: 1.0,
        creatureWings1: 1.0,
        creatureWings2: 1.0,
        creatureWings3: 1.0,
        creatureWings4: 1.0,
        deepTreeCreaking1: 1.0,
        deepTreeCreaking2: 1.0,
        deepTreeCreaking3: 1.0,
        deepTreeCreaking4: 1.0,
        deepTreeCreaking5: 1.0,
        deepTreeCreaking6: 1.0,
        deepTreeCreaking7: 1.0,
        deepTreeCreaking8: 1.0,
        plantGrowth1: 1.0,
        plantGrowth2: 1.0,
        plantGrowth3: 1.0,
        plantGrowth4: 1.0,
        plantGrowth5: 1.0,
        plantGrowth6: 1.0,
        plantGrowth7: 1.0,
        plantGrowth8: 1.0,
        plantGrowth9: 1.0,
        flySwarm: 0.4,
        forestBirds: 0.4,
        mudSquish: 0.5,
        vulture: 1.0,
        crow: 1.0,
        deepMovements: 0.4,
        howlingWind: 0.2
      }
    },
    marlstoneGala: {
      label: "Marlstone Gala",
      layers: {
        crowdHallMurmur: 0.7,
        crowdMurmur: 0.7,
        drinksClinking1: 0.5,
        drinksClinking2: 0.5,
        footstepsHall: 0.7,
        campfire: 0.5
      }
    },
    pathways: {
      label: "Pathways",
      layers: {
        cavernDrone: 0.6,
        deepMovements: 0.8,
        windThroughStone: 0.5,
        forestBirds: 0.4,
        creatureWings1: 0.3,
        creatureWings2: 0.3,
        jungleAnimals3: 0.4,
        crickets: 0.5,
        crystalShimmer1: 0.3,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        waterDripCave: 0.3,
        waterDripCaveLoud: 0.2,
        caveRiver: 0.1,
        leafRustle1: 0.6,
        leafRustle2: 0.6,
        leafRustle3: 0.6,
        leafRustle4: 0.6,
        deepTreeCreaking1: 0.5,
        deepTreeCreaking2: 0.5,
        deepTreeCreaking3: 0.5,
        deepTreeCreaking4: 0.5,
        horrorCaveSwell1: 0.3
      }
    },
    scrapyard: {
      label: "Scrapyard",
      layers: {
        cavernDrone: 0.6,
        deepMovements: 0.8,
        windThroughStone: 0.5,
        forestBirds: 0.4,
        creatureWings1: 0.3,
        creatureWings2: 0.3,
        jungleAnimals3: 0.4,
        crickets: 0.5,
        crystalShimmer1: 0.3,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        waterDripCave: 0.3,
        waterDripCaveLoud: 0.2,
        caveRiver: 0.1,
        leafRustle1: 0.6,
        leafRustle2: 0.6,
        leafRustle3: 0.6,
        leafRustle4: 0.6,
        deepTreeCreaking1: 0.5,
        deepTreeCreaking2: 0.5,
        deepTreeCreaking3: 0.5,
        deepTreeCreaking4: 0.5,
        horrorCaveSwell1: 0.3,
        metalScrapes1: 0.8,
        metalScrapes2: 0.8,
        metalScrapes3: 0.8,
        metalScrapes4: 0.8,
        metalScrapes5: 0.8,
        metalScrapes6: 0.8,
        metalScrapes7: 0.8,
        chainMovement: 0.4,
        pressurePlateEchoey: 0.5,
        miningContainerMovement: 0.8,
        rockFall1: 1,
        rockFall2: 1,
        rockFall3: 1,
        metalHollowHit1: 0.4,
        metalHollowHit2: 0.4,
        metalHollowHit3: 0.4,
        metalHollowHit4: 0.4,
        metalHollowHit5: 0.4,
        metalScrap: 0.4
      }
    },
    inkaroPools: {
      label: "Inkaro Pools",
      layers: {
        cavernDrone: 0.6,
        deepMovements: 0.8,
        windThroughStone: 0.5,
        forestBirds: 0.4,
        creatureWings1: 0.3,
        creatureWings2: 0.3,
        jungleAnimals3: 0.4,
        crickets: 0.5,
        crystalShimmer1: 0.3,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        waterDripCave: 0.3,
        waterDripCaveLoud: 0.2,
        caveRiver: 0.1,
        leafRustle1: 0.6,
        leafRustle2: 0.6,
        leafRustle3: 0.6,
        leafRustle4: 0.6,
        deepTreeCreaking1: 0.5,
        deepTreeCreaking2: 0.5,
        deepTreeCreaking3: 0.5,
        deepTreeCreaking4: 0.5,
        horrorCaveSwell1: 0.3,
        tidePool: 1.0,
        pressurePlateEchoey: 0.4,
        steamTrapOn: 0.5,
        steamTrapOff: 0.5,
        powerOn: 0.3,
        powerOff: 0.3,
        deepBubbles: 0.6,
        heatSizzle1: 0.7,
        heatSizzle2: 0.7

      }
    },
    mycelianExpanse: {
      label: "Mycelian Expanse",
      layers: {
        cavernDrone: 0.6,
        deepMovements: 0.8,
        windThroughStone: 0.5,
        forestBirds: 0.4,
        creatureWings1: 0.3,
        creatureWings2: 0.3,
        jungleAnimals3: 0.4,
        crickets: 0.5,
        crystalShimmer1: 0.3,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        waterDripCave: 0.6,
        waterDripCaveLoud: 0.4,
        caveRiver: 0.2,
        leafRustle1: 0.6,
        leafRustle2: 0.6,
        leafRustle3: 0.6,
        leafRustle4: 0.6,
        deepTreeCreaking1: 0.5,
        deepTreeCreaking2: 0.5,
        deepTreeCreaking3: 0.5,
        deepTreeCreaking4: 0.5,
        horrorCaveSwell1: 0.3
      }
    },
    fogboundCaverns: {
      label: "Fogbound Caverns",
      layers: {
        cavernDrone: 0.7,
        windThroughStone: 0.6,
        horrorCaveSwell1: 1,
        horrorCaveSwell2: 1,
        horrorCaveSwell3: 1,
        horrorCaveSwell4: 1,
        whisperWind: 0.2
      }
    },
    primordialBastion: {
      label: "Primordial Bastion",
      layers: {
        cavernDrone: 0.7,
        windThroughStone: 0.6,
        horrorCaveSwell1: 1,
        horrorCaveSwell2: 1,
        horrorCaveSwell3: 1,
        horrorCaveSwell4: 1,
        deepMovements: 1.0,
        whisperWind: 0.2,
        deepCrystalDrone: 0.5
      }
    },
    quarryLabChaos: {
      label: "Mutagist Laboratory Chaos",
      layers: {
        cavernDrone: 0.8,
        deepMovements: 0.7,
        metalScrapes1: 0.4,
        metalScrapes2: 0.4,
        metalScrapes3: 0.4,
        metalScrapes4: 0.4,
        metalScrapes5: 0.4,
        metalScrapes6: 0.4,
        metalScrapes7: 0.4,
        miningContainerMovement: 1.0,
        mineCartMoving: 0.6,
        caveWaterfall: 0.4,
        bubblesSparse: 0.4,
        bubblesSwell: 0.5,
        deepBubbles: 0.6,
        heatSizzle1: 0.7,
        heatSizzle2: 0.7,
        horrorCaveSwell1: 0.3,
        horrorCaveSwell2: 0.3,
        horrorCaveSwell3: 0.3,
        horrorCaveSwell4: 0.3,
        deepCrystalDrone: 0.2,
        rockFall1: 0.3,
        rockFall2: 0.3,
        rockFall3: 0.3,
        crowdPanic1: 0.3,
        crowdPanic2: 0.3,
        crowdPanic3: 0.4,
        crowdPanic4: 0.5,
        drake1: 0.8,
        drake2: 0.8,
        drake3: 0.8,
        drake4: 0.8,
        drake5: 0.8,
        drake6: 0.8,
        drake7: 0.8,
        drake8: 0.8,
        powerOff: 0.3,
        decontamination: 0.5,
        powerOn: 0.3,
        steamTrapOn: 0.5,
        steamTrapOff: 0.5,
        pressurePlateEchoey: 0.6,
        valveSqueak: 0.2,
        bigMachineryRotation: 0.4,
        mirrorRotate1: 0.2,
        mirrorRotate2: 0.2,
        mirrorRotate3: 0.2,
        wallMove: 0.5
      }
    },
    quarryLab: {
      label: "Mutagist Laboratory Quiet",
      layers: {
        cavernDrone: 0.8,
        deepMovements: 0.7,
        metalScrapes1: 0.3,
        metalScrapes2: 0.3,
        miningContainerMovement: 0.2,
        mineCartMoving: 0.2,
        caveWaterfall: 0.3,
        bubblesSparse: 0.2,
        bubblesSwell: 0.2,
        deepBubbles: 0.3,
        heatSizzle1: 0.3,
        horrorCaveSwell1: 0.4,
        horrorCaveSwell2: 0.4,
        deepCrystalDrone: 0.2,
        rockFall1: 0.2,
        drake1: 0.2,
        powerOff: 0.1,
        decontamination: 0.2,
        steamTrapOff: 0.1,
        pressurePlateEchoey: 0.1
      }
    },
    splinterCanyonsDay: {
      label: "Splinter Canyons Day",
      layers: {
        desertCanyonWind: 0.8,
        windThroughStone: 0.5,
        eagleCry1: 0.1,
        vulture: 0.3,
        creatureWings1: 0.2,
        creatureWings2: 0.2,
        waterDripCave: 0.1,
        tidePool: 0.2,
        rockFall1: 0.3,
        rockFall2: 0.3,
        rockFall3: 0.3,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        leafRustle1: 0.5,
        leafRustle2: 0.5
      }
    },
    splinterCanyonsNight: {
      label: "Splinter Canyons Night",
      layers: {
        desertCanyonWind: 0.8,
        windThroughStone: 0.5,
        crickets: 0.1,
        waterDripCave: 0.1,
        tidePool: 0.2,
        rockFall1: 0.3,
        rockFall2: 0.3,
        rockFall3: 0.3,
        rockMovement1: 0.3,
        rockMovement2: 0.3,
        rockMovement3: 0.3,
        leafRustle1: 0.5,
        leafRustle2: 0.5
      }
    },
    wedgelandsDay: {
      label: "Wedgelands Day",
      layers: {
        howlingWind: 1.0,
        desolateFieldWind: 0.7,
        windThroughStone: 0.5,
        vulture: 1.0,
        crow: 1.0,
        rockFall1: 0.1,
        rockFall2: 0.1,
        rockMovement1: 0.2,
        rockMovement2: 0.2,
        earthquakeTremor: 0.6,
        windTreeRustle: 0.3,
        deepTreeCreaking1: 0.3,
        deepTreeCreaking2: 0.3,
        deepMovements: 0.3
      }
    },
    wedgelandsNight: {
      label: "Wedgelands Night",
      layers: {
        howlingWind: 0.8,
        desolateFieldWind: 0.6,
        whistlingWind: 0.5,
        barnOwl: 0.3,
        rockFall1: 0.1,
        rockFall2: 0.1,
        rockMovement1: 0.2,
        earthquakeTremor: 0.6,
        deepMovements: 0.3
      }
    },
    seawallDay: {
      label: "Seawall Day",
      layers: {
        oceanWaves: 0.2,
        docksSmall: 0.8,
        townVoices: 0.5,
        gulls: 0.7,
        creakingWood1: 0.1,
        creakingWood2: 0.1,
        crickets: 0.2,
        farmAmbience: 0.6
      }
    },
    seawallNight: {
      label: "Seawall Night",
      layers: {
        oceanWaves: 0.2,
        docksSmall: 0.5,
        townVoices: 0.2,
        barnOwl: 0.3,
        creakingWood1: 0.1,
        creakingWood2: 0.1,
        crickets: 0.7,
        farmAmbience: 0.4,
        desolateFieldWind: 0.3,
        windThroughStone: 0.2
      }
    },
    nainDay: {
      label: "Nain Day",
      layers: {
        wideRiverWaves: 0.3,
        docksSmall: 0.5,
        bigMachineryRotation: 0.4,
        mineCartMoving: 0.9,
        wallMove: 0.2,
        gulls: 0.3,
        creakingWood1: 0.2,
        creakingWood2: 0.2,
        townVoices: 0.8,
        whistlingWind: 0.2,
        waterWheel: 0.4
      }
    },
    nainNight: {
      label: "Nain Night",
      layers: {
        wideRiverWaves: 0.3,
        docksSmall: 0.3,
        creakingWood1: 0.2,
        creakingWood2: 0.2,
        townVoices: 0.3,
        whistlingWind: 0.2,
        crickets: 0.6,
        waterWheel: 0.4
      }
    },
    ordainDocksDay: {
      label: "Ordain Docks Day",
      layers: {
        docksSmall: 0.6,
        cityVoices: 0.5,
        gulls: 0.7,
        creakingWood1: 0.1,
        creakingWood2: 0.1,
        crickets: 0.2,
        farmAmbience: 0.6,
        bells: 0.2,
        townVoices: 0.6,
        mineCartMoving: 0.5,
        windyFlag: 1,
        creakingIdleBoat: 0.5,
        maleGruntingWalla: 0.4,
        carriageOnGravel1: 0.4,
        carriageOnGravel2: 0.4,
        carriageHorseClose: 1,
        festivalCrowd: 0.5,
        chainMovement: 0.6,
        oceanWaves: 0.2
      }
    },
    ordainDocksNight: {
      label: "Ordain Docks Night",
      layers: {
        oceanWaves: 0.2,
        docksSmall: 0.5,
        townVoices: 0.4,
        barnOwl: 0.3,
        creakingWood1: 0.2,
        creakingWood2: 0.2,
        crickets: 0.8,
        farmAmbience: 0.3,
        desolateFieldWind: 0.3,
        windThroughStone: 0.3,
        creakingIdleBoat: 0.4,
        mineCartMoving: 0.3,
        carriageOnGravel1: 0.4,
        carriageOnGravel2: 0.4,
        carriageHorseClose: 0.5,
        chainMovement: 0.5,
        windyFlag: 0.6
      }
    },
    ordainFlatsDay: {
      label: "Ordain Flats Day",
      layers: {
        townVoices: 1.0,
        cityVoices: 0.5,
        childrenPlaying2: 0.2,
        childrenPlaying4: 0.2,
        footstepsHall: 0.6,
        carriageHorseClose: 0.5,
        carriageOnGravel1: 0.4,
        carriageOnGravel2: 0.4,
        forestBirds: 0.3,
        drinksClinking1: 0.3,
        drinksClinking2: 0.3
      }
    },
    ordainFlatsNight: {
      label: "Ordain Flats Night",
      layers: {
        townVoices: 0.3,
        cityVoices: 0.2,
        footstepsHall: 0.3,
        crickets: 0.6,
        barnOwl: 0.3
      }
    },
    ordainSpiresDay: {
      label: "Ordain Spires Day",
      layers: {
        windThroughStone: 0.7,
        windyFlag: 0.2,
        townVoices: 0.4,
        cityVoices: 0.5,
        forestBirds: 0.3,
        footstepsHall: 0.4,
        eagleCry1: 0.2,
        eagleCry2: 0.2,
        eagleCry3: 0.2,
        carriageHorseClose: 0.2,
        carriageOnGravel1: 0.2,
        crowdMurmur: 0.3,
        drinksClinking1: 0.2,
        howlingWind: 0.5
      }
    },
    ordainSpiresNight: {
      label: "Ordain Spires Night",
      layers: {
        windThroughStone: 0.8,
        windyFlag: 0.1,
        townVoices: 0.3,
        footstepsHall: 0.2,
        barnOwl: 0.3,
        crickets: 0.5,
        howlingWind: 0.5
      }
    },
    upperArcturelDay: {
      label: "Upper Arcturel Day",
      layers: {
        townVoices: 0.7,
        crowdMurmur: 0.5,
        footstepsHall: 0.4,
        tallGrass: 0.2,
        desolateFieldWind: 0.7,
        earthquakeTremor: 0.4,
        rockMovement1: 0.2,
        rockMovement2: 0.2,
        rockMovement3: 0.2,
        eagleCry1: 0.1,
        eagleCry2: 0.1,
        eagleCry3: 0.1,
        eagleCry4: 0.1,
        eagleCry5: 0.1,
        cavernDrone: 0.3
      }
    },
    upperArcturelNight: {
      label: "Upper Arcturel Night",
      layers: {
        townVoices: 0.4,
        barnOwl: 0.8,
        howlingWind: 0.2,
        tallGrass: 0.2,
        desolateFieldWind: 0.7,
        earthquakeTremor: 0.3,
        rockMovement1: 0.2,
        rockMovement2: 0.2,
        rockMovement3: 0.2,
        crickets: 0.6,
        cavernDrone: 0.3
      }
    },
    lowerArcturelDay: {
      label: "Lower Arcturel Day",
      layers: {
        miningPickaxes: 0.5,
        miningContainerMovement: 0.6,
        mineCartMoving: 0.7,
        metalScrapes1: 0.2,
        metalScrapes2: 0.2,
        townVoices: 0.7,
        cavernDrone: 0.6,
        deepMovements: 0.8,
        windThroughStone: 0.5,
        forestBirds: 0.2,
        crickets: 0.5,
        crystalShimmer1: 0.3,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        waterDripCave: 0.3,
        waterDripCaveLoud: 0.2,
        caveRiver: 0.1,
        horrorCaveSwell1: 0.3,
        desertCanyonWind: 0.4
      }
    },
    lowerArcturelNight: {
      label: "Lower Arcturel Night",
      layers: {
        metalScrapes1: 0.2,
        metalScrapes2: 0.2,
        townVoices: 0.4,
        cavernDrone: 0.6,
        deepMovements: 0.8,
        windThroughStone: 0.5,
        forestBirds: 0.2,
        crickets: 0.5,
        crystalShimmer1: 0.3,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        waterDripCave: 0.3,
        waterDripCaveLoud: 0.2,
        caveRiver: 0.1,
        horrorCaveSwell1: 0.3,
        desertCanyonWind: 0.4
      }
    },
    ArcturelDay: {
      label: "Arcturel Day",
      layers: {
        barnOwl: 0.8,
        bells: 0.2,
        cavernDrone: 1,
        chainMovement: 0.4,
        cityVoices: 0.6,
        crystalShimmer1: 0.3,
        deepMovements: 1.0,
        desertCanyonWind: 0.4,
        desolateFieldWind: 0.7,
        docksSmall: 0.4,
        earthquakeTremor: 0.4,
        footstepsHall: 0.8,
        forestBirds: 0.2,
        horrorCaveSwell1: 0.3,
        howlingWind: 0.2,
        metalHollowHit1: 0.4,
        metalHollowHit2: 0.4,
        metalHollowHit3: 0.4,
        metalHollowHit4: 0.4,
        metalHollowHit5: 0.4,
        metalScrapes1: 0.5,
        metalScrapes2: 0.5,
        metalScrapes3: 0.5,
        metalScrapes4: 0.5,
        metalScrapes5: 0.5,
        mineCartMoving: 0.9,
        miningContainerMovement: 0.6,
        miningPickaxes: 0.5,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        rockFall1: 1,
        rockFall2: 1,
        rockFall3: 1,
        rockMovement1: 0.2,
        rockMovement2: 0.2,
        rockMovement3: 0.2,
        tallGrass: 0.2,
        townVoices: 0.7,
        valveSqueak: 0.1,
        waterDripCave: 0.3,
        waterDripCaveLoud: 0.2,
        windThroughStone: 0.5,
        windyFlag: 0.3
      }
    },
    ArcturelNight: {
      label: "Arcturel Night",
      layers: {
        barnOwl: 0.8,
        cavernDrone: 1,
        chainMovement: 0.4,
        crickets: 0.5,
        crystalShimmer1: 0.3,
        deepMovements: 1.0,
        desertCanyonWind: 0.4,
        desolateFieldWind: 0.7,
        docksSmall: 0.2,
        earthquakeTremor: 0.4,
        footstepsHall: 0.8,
        forestBirds: 0.2,
        horrorCaveSwell1: 0.3,
        howlingWind: 0.2,
        metalHollowHit1: 0.4,
        metalHollowHit2: 0.4,
        metalScrapes1: 0.5,
        metalScrapes2: 0.5,
        mineCartMoving: 0.9,
        miningContainerMovement: 0.6,
        reverseCrystalBreakEchoes1: 0.2,
        reverseCrystalBreakEchoes2: 0.2,
        reverseCrystalBreakEchoes3: 0.2,
        rockFall1: 1,
        rockFall2: 1,
        rockFall3: 1,
        rockMovement1: 0.2,
        rockMovement2: 0.2,
        rockMovement3: 0.2,
        tallGrass: 0.2,
        townVoices: 0.4,
        valveSqueak: 0.1,
        waterDripCave: 0.3,
        waterDripCaveLoud: 0.2,
        windThroughStone: 0.5,
        windyFlag: 0.3
      }
    },
    waterworks: {
      label: "Waterworks",
      layers: {
        caveRiver: 0.3,
        waterDrippingOnRocks: 0.45,
        waterDripCave: 1.5,
        bubblesSparse: 0.15,
        deepBubbles: 0.3,
        waterWheel: 0.3,
        steamLoop: 0.3,
        metalScrapes1: 0.45,
        metalScrapes3: 0.45,
        cavernDrone: 0.9,
        deepMovements: 1.5,
        windThroughStone: 0.6,
        // DocksSmall: 0.6,
        creakingWood1: 0.15,
        creakingWood2: 0.15,
        horrorCaveSwell1: 0.3,
        horrorCaveSwell2: 0.3,
        horrorCaveSwell3: 0.3,
        horrorCaveSwell4: 0.3,
        steamTrapOn: 0.15,
        steamTrapOff: 0.15,
        bigMachineryRotation: 0.15,
        wallMove: 0.15
      }
    },
    clockworkDungeon: {
      label: "Clockwork Dungeon",
      layers: {
        horrorCaveSwell2: 0.3,
        deepMovements: 0.6,
        cavernDrone: 0.45,
        mineCartMoving: 0.6,
        miningContainerMovement: 0.6,
        powerOff: 0.075,
        decontamination: 0.45,
        powerOn: 0.075,
        steamTrapOn: 0.15,
        steamTrapOff: 0.15,
        pressurePlateEchoey: 0.15,
        bigMachineryRotation: 0.075,
        mirrorRotate1: 0.15,
        mirrorRotate2: 0.15,
        mirrorRotate3: 0.15,
        wallMove: 0.075,
        metalScrapes1: 0.45,
        metalScrapes2: 0.45,
        metalScrapes3: 0.45,
        metalScrapes4: 0.45,
        metalScrapes5: 0.45,
        metalScrapes6: 0.45,
        metalScrapes7: 0.45,
        metalHollowHit1: 0.15,
        metalHollowHit2: 0.15,
        metalHollowHit3: 0.15,
        metalHollowHit4: 0.15,
        metalHollowHit5: 0.15,
        factoryHum: 0.75,
        highTicking: 0.6,
        midTicking: 0.6,
        midTicking2: 0.6,
        deepTicking: 0.6
      }
    },
    burialGrounds: {
      label: "Burial Grounds",
      layers: {
        ghostlyAura: 0.8,
        whisperWind: 0.1,
        squishyFlesh: 0.1,
        mudSquish: 0.1,
        vulture: 1,
        crow: 1,
        deepTreeCreaking1: 0.3,
        deepTreeCreaking2: 0.3,
        slosh3: 0.4,
        leafRustle1: 0.3,
        leafRustle2: 0.3,
        leafRustle3: 0.3,
        leafRustle4: 0.3,
        thunderFar: 0.1,
        tallGrass: 0.1,
        windTreeRustle: 0.3,
        howlingWind: 0.4,
        eagleCry1: 0.3,
        eagleCry2: 0.3
      }
    },
    spellbreakerTower: {
      label: "Spellbreaker Tower",
      layers: {
        windThroughStone: 0.7,
        cavernDrone: 0.4,
        metalScrapes1: 0.2,
        metalScrapes2: 0.2,
        metalScrapes3: 0.2,
        metalScrapes4: 0.2,
        earthquakeTremor: 0.1,
        distantWarpedVoices: 0.3,
        pressurePlateEchoey: 0.1
      }
    },
    embersBountyDay: {
      label: "Ember's Bounty Day",
      layers: {
        oceanWaves: 0.6,
        docksSmall: 0.8,
        creakingIdleBoat: 1.0,
        creakingWood1: 0.7,
        creakingWood2: 0.7,
        windyFlag: 0.9,
        howlingWind: 0.3,
        gulls: 0.8,
        townVoices: 0.7,
        crowdMurmur: 0.9,
        festivalCrowd: 0.8,
        maleGruntingWalla: 0.6,
        drinksClinking1: 0.7,
        drinksClinking2: 0.5,
        bells: 0.3
      }
    },
    embersBountyNight: {
      label: "Ember's Bounty Night",
      layers: {
        oceanWaves: 0.6,
        docksSmall: 0.5,
        creakingIdleBoat: 1.0,
        creakingWood1: 0.6,
        creakingWood2: 0.6,
        windyFlag: 1.0,
        howlingWind: 0.4,
        townVoices: 0.5,
        crowdMurmur: 0.9,
        festivalCrowd: 0.8,
        maleGruntingWalla: 0.6,
        drinksClinking1: 0.7,
        drinksClinking2: 0.5,
        crickets: 0.2
      }
    },
    pitTrap: {
      label: "The Pit Trap",
      layers: {
        maleGruntingWalla: 1.0,
        drinksClinking1: 0.4,
        drinksClinking2: 0.4,
        factoryHum: 1.0,
        deepMovements: 0.15,
        echoingPartyVoices: 0.3,
        distantWarpedVoices: 0.3,
        cavernDrone: 0.45,
        crowdPanic1: 0.1,
        crowdPanic2: 0.2,
        crowdPanic3: 0.4,
        crowdPanic4: 0.6,
        metalScrapes1: 0.45,
        metalScrapes2: 0.45,
        metalScrapes3: 0.45,
        metalScrapes4: 0.45,
        metalScrapes5: 0.45,
        metalScrapes6: 0.45,
        metalScrapes7: 0.45,
        metalHollowHit1: 0.15,
        metalHollowHit2: 0.15,
        metalHollowHit3: 0.15,
        metalHollowHit4: 0.15,
        metalHollowHit5: 0.15
      }
    },
    sarinStrandDay: {
      label: "Sarin Strand Day",
      layers: {
        oceanWaves: 0.5,
        howlingWind: 0.7,
        whistlingWind: 0.4,
        mountainBirds: 1.0,
        gulls: 0.8,
        windyFlag: 0.6,
        rockFall1: 0.3,
        rockFall2: 0.3
      }
    },
    sarinStrandNight: {
      label: "Sarin Strand Night",
      layers: {
        oceanWaves: 0.4,
        howlingWind: 0.6,
        whisperWind: 0.4,
        barnOwl: 1.0,
        crickets: 0.5,
        rockMovement1: 0.3,
        rockMovement2: 0.3
      }
    },
    ordainTemple: {
      label: "Ordain Temple",
      layers: {
        churchInterior: 1,
        // CrowdHallMurmur: 0.4,
        cityVoices: 0.1,
        footstepsHall: 0.3,
        bonfire: 0.05
      }
    },
    ordainInteriorDay: {
      label: "Ordain Interior Day",
      layers: {
        roomTone: 0.3,
        cityVoicesMuffled: 1
      }
    },
    ordainInteriorNight: {
      label: "Ordain Interior Night",
      layers: {
        townVoicesMuffled: 1,
        crickets: 0.05,
        barnOwl: 0.2,
        roomTone: 0.3
      }
    },
    stadiumUnderworks: {
      label: "Stadium Underworks",
      layers: {
        factoryHum: 0.5,
        deepMovements: 0.6,
        cavernDrone: 0.4,
        churchInterior: 1,
        windThroughStone: 0.45,
        ghostlyAura: 0.35,
        horrorCaveSwell1: 0.2,
        horrorCaveSwell2: 0.2,
        horrorCaveSwell3: 0.2,
        pressurePlateEchoey: 0.15
      }
    }
  },
  randomLayers: false,
  timing: {
    sync: false
  }
};var events$8 = {
  id: "events",
  label: "Ember Events",
  type: "events",
  src: "effects/notifications.ogg",
  randomLayers: false,
  oneShot: true,
  segments: {
    combat1: {timing: {loop: false, loopStart: 0, loopEnd: 3}},
    combat2: {timing: {loop: false, loopStart: 3, loopEnd: 6}},
    combat3: {timing: {loop: false, loopStart: 6, loopEnd: 9}},
    discovery1: {timing: {loop: false, loopStart: 9, loopEnd: 12}},
    discovery2: {timing: {loop: false, loopStart: 12, loopEnd: 15}},
    discovery3: {timing: {loop: false, loopStart: 15, loopEnd: 18}},
    exploration1: {timing: {loop: false, loopStart: 18, loopEnd: 21}},
    exploration2: {timing: {loop: false, loopStart: 21, loopEnd: 24}},
    exploration3: {timing: {loop: false, loopStart: 24, loopEnd: 27}},
    social1: {timing: {loop: false, loopStart: 27, loopEnd: 30}},
    social2: {timing: {loop: false, loopStart: 30, loopEnd: 33}},
    social3: {timing: {loop: false, loopStart: 33, loopEnd: 36}}
  },
  arrangements: {
    events: {
      label: "Events",
      layers: {
        combat1: {},
        combat2: {},
        combat3: {},
        discovery1: {},
        discovery2: {},
        discovery3: {},
        exploration1: {},
        exploration2: {},
        exploration3: {},
        social1: {},
        social2: {},
        social3: {}
      }
    }
  },
  timing: {
    sync: false
  }
};var forestOfStoneExploration = {
  id: "forestOfStoneExploration",
  label: "Forest of Stone Exploration",
  type: "music",
  src: "music/forest-of-stone/exploration",
  timing: {
    bpm: 98,
    bars: 32,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 32,
      fadeIn: 5,
      fadeOut: 5,
      randomLayers: {min: 3, max: 8}
    }
  ],
  segments: {
    fluteDrone: {src: "flute-drone.ogg"},
    firstViolinsSwellTemp: {src: "first-violins-swell.ogg"},
    choirSwellTemp: {src: "choir-swell.ogg"},
    bassSwellTemp: {src: "bass-swell.ogg"},
    celloSwellTemp: {src: "cello-swell.ogg"},
    secondViolinSwell1Temp: {src: "second-violin-swell-1.ogg"},
    secondViolinSwell2Temp: {src: "second-violin-swell-2.ogg"},
    secondViolinSwell3Temp: {src: "second-violin-swell-3.ogg"},
    violaSwell1Temp: {src: "viola-swell-1.ogg"},
    violaSwell2Temp: {src: "viola-swell-2.ogg"},
    trillFluteDrone: {src: "trill-flute-drone.ogg"},
    jungleFluteDrone: {src: "jungle-flute-drone.ogg"},
    jawboneDrum: {src: "jawbone-drum.ogg"},
    lowTaikoDrum: {src: "low-taiko-drum.ogg"},
    deepMarimba: {src: "deep-marimba.ogg", timing: {pad: 8}},
    rootDrum: {src: "root-drum.ogg"},
    branchShaker: {src: "branch-shaker.ogg"},
    jungleFluteMelody: {src: "jungle-flute-melody.ogg"},
    repeatingSticksLeft: {src: "repeating-sticks-left.ogg", timing: {pad: 8}},
    repeatingSticksRight: {src: "repeating-sticks-right.ogg", timing: {pad: 8}},
    didgeridooCreepy: {src: "didgeridoo-creepy.ogg"},
    deepCelloEvil: {src: "deep-cello-evil.ogg"},
    creepyFlute: {src: "creepy-flute.ogg"},
    celesta: {src: "celesta.ogg"},
    glockenspiel: {src: "glockenspiel.ogg"},
    maleChoirChanting: {src: "male-choir-chanting.ogg"},
    marimba: {src: "marimba.ogg"},
    orchestralSynthPad: {src: "orchestral-synth-pad.ogg"},
    slowTremoloStrings: {src: "slow-tremolo-strings.ogg"},
    vibraphone: {src: "vibraphone.ogg"},
    xylophone: {src: "xylophone.ogg"},
    slowTremoloStringsHarmony: {src: "slow-tremolo-strings-harmony.ogg"},
    darkWhisper: {src: "dark-whisper.ogg"},
    lowStringsStuttering: {src: "low-strings-stuttering.ogg"},
    marimbaSuspense: {src: "marimba-suspense.ogg"},
    vibraphoneSuspense: {src: "vibraphone-suspense.ogg"},
    xylophoneSuspense: {src: "xylophone-suspense.ogg"},
    celestaSuspense: {src: "celesta-suspense.ogg"},
    glockenspielSuspense: {src: "glockenspiel-suspense.ogg"},
    lowStringsTremoloBursts: {src: "low-strings-tremolo-bursts.ogg"},
    midStringsTremoloBursts: {src: "mid-strings-tremolo-bursts.ogg"},
    dulcimerMountainOstinato: {src: "dulcimer-mountain-ostinato.ogg"},
    highStringsMountainOstinato: {src: "high-strings-mountain-ostinato.ogg"},
    midStringsMountainOstinato: {src: "mid-strings-mountain-ostinato.ogg"},
    lowStringsMountainOstinato: {src: "low-strings-mountain-ostinato.ogg"},
    highStringsMountainOstinatoPizz: {src: "high-strings-mountain-ostinato-pizz.ogg"},
    midStringsMountainOstinatoPizz: {src: "mid-strings-mountain-ostinato-pizz.ogg"},
    lowStringsMountainOstinatoPizz: {src: "low-strings-mountain-ostinato-pizz.ogg"}
  },
  arrangements: {
    forestStoneDay: {
      label: "Verdant Paths Day",
      layers: {
        fluteDrone: 0.8,
        firstViolinsSwellTemp: 0.8,
        choirSwellTemp: 0.8,
        bassSwellTemp: 0.8,
        celloSwellTemp: 0.8,
        secondViolinSwell1Temp: 0.8,
        secondViolinSwell2Temp: 0.8,
        secondViolinSwell3Temp: 0.8,
        violaSwell1Temp: 0.8,
        violaSwell2Temp: 0.8,
        trillFluteDrone: 0.8,
        jungleFluteDrone: 0.8,
        jawboneDrum: 0.8,
        lowTaikoDrum: 0.5,
        deepMarimba: 0.8,
        rootDrum: 0.8,
        branchShaker: 0.8,
        jungleFluteMelody: 0.8,
        repeatingSticksLeft: 0.8,
        repeatingSticksRight: 0.8
      }
    },
    forestStoneNight: {
      label: "Verdant Paths Night",
      layers: {
        fluteDrone: 0.8,
        firstViolinsSwellTemp: 0.8,
        choirSwellTemp: 0.8,
        bassSwellTemp: 0.8,
        celloSwellTemp: 0.8,
        secondViolinSwell1Temp: 0.8,
        secondViolinSwell2Temp: 0.8,
        secondViolinSwell3Temp: 0.8,
        violaSwell1Temp: 0.8,
        violaSwell2Temp: 0.8,
        trillFluteDrone: 0.8,
        jungleFluteDrone: 0.8,
        lowTaikoDrum: 0.8,
        jungleFluteMelody: 0.8
      }
    },
    forestStoneTension: {
      label: "Verdant Paths Tension",
      layers: {
        branchShaker: 0.8,
        jawboneDrum: 0.8,
        lowTaikoDrum: 0.5,
        repeatingSticksLeft: 0.8,
        repeatingSticksRight: 0.8,
        rootDrum: 0.8,
        trillFluteDrone: 0.8,
        didgeridooCreepy: 0.8,
        deepCelloEvil: 0.8,
        creepyFlute: 0.8
      }
    },
    dripstonesDay: {
      label: "Dripstones Day",
      layers: {
        branchShaker: 0.8,
        fluteDrone: 0.8,
        jawboneDrum: 0.8,
        jungleFluteDrone: 0.8,
        lowTaikoDrum: 0.5,
        repeatingSticksLeft: 0.8,
        repeatingSticksRight: 0.8,
        rootDrum: 0.8,
        trillFluteDrone: 0.8,
        celesta: 0.8,
        glockenspiel: 0.8,
        maleChoirChanting: 0.8,
        marimba: 0.8,
        orchestralSynthPad: 0.8,
        slowTremoloStrings: 0.8,
        slowTremoloStringsHarmony: 0.8,
        vibraphone: 0.8,
        xylophone: 0.8
      }
    },
    dripstonesNight: {
      label: "Dripstones Night",
      layers: {
        branchShaker: 0.8,
        fluteDrone: 0.8,
        jungleFluteDrone: 0.8,
        trillFluteDrone: 0.8,
        celesta: 0.8,
        glockenspiel: 0.8,
        marimba: 0.8,
        orchestralSynthPad: 0.8,
        slowTremoloStrings: 0.8,
        slowTremoloStringsHarmony: 0.8,
        vibraphone: 0.8,
        xylophone: 0.8
      }
    },
    dripstonesTension: {
      label: "Dripstones Tension",
      layers: {
        branchShaker: 0.8,
        fluteDrone: 0.8,
        jawboneDrum: 0.8,
        lowTaikoDrum: 0.5,
        repeatingSticksLeft: 0.8,
        repeatingSticksRight: 0.8,
        rootDrum: 0.8,
        trillFluteDrone: 0.8,
        deepCelloEvil: 0.8,
        darkWhisper: 0.8,
        lowStringsStuttering: 0.8,
        marimbaSuspense: 0.8,
        vibraphoneSuspense: 0.8,
        xylophoneSuspense: 0.8,
        celestaSuspense: 0.8,
        glockenspielSuspense: 0.8
      }
    },
    spiresDay: {
      label: "Rock Spires Day",
      layers: {
        branchShaker: 0.8,
        repeatingSticksLeft: 0.8,
        repeatingSticksRight: 0.8,
        rootDrum: 0.8,
        lowStringsTremoloBursts: 0.8,
        midStringsTremoloBursts: 0.8,
        dulcimerMountainOstinato: 0.8,
        highStringsMountainOstinato: 0.8,
        midStringsMountainOstinato: 0.8,
        lowStringsMountainOstinato: 0.8,
        celloSwellTemp: 0.8,
        choirSwellTemp: 0.8,
        firstViolinsSwellTemp: 0.8,
        jawboneDrum: 0.8,
        lowTaikoDrum: 0.5,
        secondViolinSwell1Temp: 0.8,
        secondViolinSwell2Temp: 0.8,
        secondViolinSwell3Temp: 0.8,
        violaSwell1Temp: 0.8,
        violaSwell2Temp: 0.8
      }
    },
    spiresNight: {
      label: "Rock Spires Night",
      layers: {
        lowStringsTremoloBursts: 0.8,
        midStringsTremoloBursts: 0.8,
        highStringsMountainOstinatoPizz: 0.8,
        midStringsMountainOstinatoPizz: 0.8,
        lowStringsMountainOstinatoPizz: 0.8,
        celloSwellTemp: 0.8,
        choirSwellTemp: 0.8,
        firstViolinsSwellTemp: 0.8,
        lowTaikoDrum: 0.5,
        secondViolinSwell1Temp: 0.8,
        secondViolinSwell2Temp: 0.8,
        secondViolinSwell3Temp: 0.8,
        violaSwell1Temp: 0.8,
        violaSwell2Temp: 0.8
      }
    },
    spiresTension: {
      label: "Rock Spires Tension",
      layers: {
        lowStringsTremoloBursts: 0.8,
        midStringsTremoloBursts: 0.8,
        highStringsMountainOstinatoPizz: 0.8,
        midStringsMountainOstinatoPizz: 0.8,
        lowStringsMountainOstinatoPizz: 0.8,
        jawboneDrum: 0.8,
        lowTaikoDrum: 0.5,
        rootDrum: 0.8,
        didgeridooCreepy: 0.8,
        deepCelloEvil: 0.8,
        creepyFlute: 0.8,
        repeatingSticksLeft: 0.8,
        repeatingSticksRight: 0.8,
        branchShaker: 0.8
      }
    }
  }
};var gravensRestMusic = {
  id: "gravensRestMusic",
  label: "Graven's Rest Music",
  type: "music",
  src: "music/kadisos/gravens-rest",
  timing: {
    bpm: 90,
    bars: 32,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 32,
      fadeIn: 12,
      fadeOut: 15,
      randomLayers: {min: 2, max: 8}
    },
    {
      id: "tavern",
      interval: 8,
      fadeIn: 1,
      fadeOut: 1,
      randomLayers: {min: 6, max: 10}
    }
  ],
  segments: {
    acousticGuitar: {src: "acoustic-guitar.ogg", group: "main"},
    acousticGuitarCreepy: {src: "acoustic-guitar-creepy.ogg", group: "main"},
    celloLeft: {src: "cello-left.ogg", group: "main"},
    celloPlucked: {src: "cello-plucked.ogg", group: "main"},
    celloRight: {src: "cello-right.ogg", group: "main"},
    darkCelloRhythm: {src: "dark-cello-rhythm.ogg", group: "main"},
    mandolin: {src: "mandolin.ogg", group: "main"},
    mandolinCreepy: {src: "mandolin-creepy.ogg", group: "main"},
    midStringsCreepy: {src: "mid-strings-creepy.ogg", group: "main"},
    orchestralPad: {src: "orchestral-pad.ogg", group: "main"},
    percussion1: {src: "percussion-1.ogg", group: "main"},
    percussion2: {src: "percussion-2.ogg", group: "main"},
    quartetCello: {src: "quartet-cello.ogg", group: "main"},
    quartetViola: {src: "quartet-viola.ogg", group: "main"},
    quartetViolin1: {src: "quartet-violin-1.ogg", group: "main"},
    quartetViolin2: {src: "quartet-violin-2.ogg", group: "main"},
    throatSinging: {src: "throat-singing.ogg", group: "main"},
    violDrone: {src: "viol-drone.ogg", group: "main"},
    violinLeft: {src: "violin-left.ogg", group: "main"},
    violinRight: {src: "violin-right.ogg", group: "main"},
    claps: {src: "claps.ogg", group: "tavern", timing: {delay: 4}},
    tambourine: {src: "tambourine.ogg", group: "tavern"},
    guitarBass: {src: "guitar-bass.ogg", group: "tavern"},
    zither: {src: "zither.ogg", group: "tavern"},
    luteChords: {src: "lute-chords.ogg", group: "tavern"},
    smallFrameDrum: {src: "small-frame-drum.ogg", group: "tavern"},
    hurdyGurdy: {src: "hurdy-gurdy.ogg", group: "tavern"},
    recorder1: {src: "recorder-1.ogg", group: "tavern"},
    recorder2: {src: "recorder-2.ogg", group: "tavern"},
    djembe: {src: "djembe.ogg", group: "tavern"},
    dulcimer: {src: "dulcimer.ogg", group: "tavern"},
    mountainDulcimerStrum: {src: "mountain-dulcimer-strum.ogg", group: "tavern"}
  },
  arrangements: {
    gravensRestDay: {
      label: "Graven's Rest Day",
      layers: {
        percussion2: 0.6,
        percussion1: 0.6,
        celloLeft: 0.6,
        violinRight: 0.6,
        throatSinging: 0.6,
        celloRight: 0.6,
        violinLeft: 0.6,
        celloPlucked: 0.6,
        acousticGuitar: 0.6,
        mandolin: 0.5,
        quartetViolin1: 0.6,
        quartetViolin2: 0.6,
        quartetViola: 0.6,
        quartetCello: 0.6
      }
    },
    gravensRestNight: {
      label: "Graven's Rest Night",
      layers: {
        celloLeft: 0.6,
        throatSinging: 0.6,
        celloRight: 0.6,
        acousticGuitar: 0.6,
        mandolin: 0.5,
        orchestralPad: 0.6,
        quartetViolin1: 0.6,
        quartetViolin2: 0.6,
        quartetViola: 0.6,
        quartetCello: 0.6
      }
    },
    gravensRestTension: {
      label: "Graven's Rest Tension",
      layers: {
        acousticGuitarCreepy: 0.7,
        darkCelloRhythm: 0.6,
        throatSinging: 0.5,
        mandolinCreepy: 0.7,
        midStringsCreepy: 0.6,
        percussion1: 0.5,
        percussion2: 0.5,
        violDrone: 0.6
      }
    },
    sevenSails: {
      label: "Seven Sails",
      layers: {
        claps: 0.6,
        tambourine: 0.6,
        guitarBass: 0.6,
        zither: 0.6,
        luteChords: 0.6,
        smallFrameDrum: 0.6,
        hurdyGurdy: 0.6,
        recorder1: 0.6,
        recorder2: 0.6,
        djembe: 0.6,
        dulcimer: 0.6,
        mountainDulcimerStrum: 0.6,
        percussion2: 0.6,
        percussion1: 0.6,
        celloPlucked: 0.6,
        acousticGuitar: 0.6,
        mandolin: 0.5
      }
    },
    gravensRestTest: {
      label: "Graven's Rest test",
      layers: {
        djembe: 0.6,
        claps: 0.6
      }
    }
  }
};var houseBastilla = {
  id: "houseBastilla",
  label: "House Bastilla",
  type: "music",
  src: "music/house-bastilla",
  timing: {
    bpm: 91,
    bars: 8,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 4, max: 8}
    }
  ],
  segments: {
    violinArpeggios: { src: "violin-arpeggios.ogg" },
    pluckedMelody: { src: "plucked-melody.ogg" },
    coinPercussion: { src: "coin-percussion.ogg" },
    bassDrum: { src: "bass-drum.ogg" },
    tremoloStringAccent: { src: "tremolo-string-accent.ogg" },
    strummedChords1: { src: "strummed-chords-1.ogg" },
    accordian: { src: "accordian.ogg" },
    soloViolinMelody1: { src: "solo-violin-melody-1.ogg" },
    soloViolinMelody2: { src: "solo-violin-melody-2.ogg" },
    violinRepetitions: { src: "violin-repetitions.ogg" },
    claps: { src: "claps.ogg" },
    stringsMelody: { src: "strings-melody.ogg" },
    stringsMelody2: { src: "strings-melody-2.ogg" },
    strummedBassline: { src: "strummed-bassline.ogg" },
    uprightBassBassline: { src: "upright-bass-bassline.ogg" },
    grandPiano: { src: "grand-piano.ogg" },
    strummedChords2: { src: "strummed-chords-2.ogg" },
    soloViolinMelody3: { src: "solo-violin-melody-3.ogg" },
    violaArpeggios: { src: "viola-arpeggios.ogg" },
    tagelharpa: { src: "tagelharpa.ogg" },
    pluckedMelodyTension: { src: "plucked-melody-tension.ogg" },
    strummedChordsTension1: { src: "strummed-chords-tension-1.ogg" },
    strummedChordsTension2: { src: "strummed-chords-tension-2.ogg" },
    strummedBasslineTension: { src: "strummed-bassline-tension.ogg" },
    uprightBassBasslineTension: { src: "upright-bass-bassline-tension.ogg" },
    grandPianoTension: { src: "grand-piano-tension.ogg" },
    accordianTension: { src: "accordian-tension.ogg" },
    soloViolinMelodyTension1: { src: "solo-violin-melody-tension-1.ogg" },
    soloViolinMelodyTension2: { src: "solo-violin-melody-tension-2.ogg" },
    violinRepetitionsTension: { src: "violin-repetitions-tension.ogg" },
    pizzicatoMelodyTension1: { src: "pizzicato-melody-tension-1.ogg" },
    pizzicatoMelodyTension2: { src: "pizzicato-melody-tension-2.ogg" },
    fluteTensionPad: { src: "flute-tension-pad.ogg" },
    stringTensionPad: { src: "string-tension-pad.ogg" },
    whistleTension: { src: "whistle-tension.ogg" },
    pluckedStringRepetitionsTension: { src: "plucked-string-repetitions-tension.ogg" }
  },
  arrangements: {
    embersBounty: {
      label: "Ember's Bounty Calm",
      layers: {
        violinArpeggios: 0.3,
        pluckedMelody: 0.3,
        coinPercussion: 0.3,
        bassDrum: 0.3,
        tremoloStringAccent: 0.3,
        strummedChords1: 0.3,
        accordian: 0.3,
        soloViolinMelody1: 0.3,
        soloViolinMelody2: 0.3,
        violinRepetitions: 0.3,
        claps: 0.3,
        stringsMelody: 0.3,
        stringsMelody2: 0.3,
        strummedBassline: 0.3,
        uprightBassBassline: 0.3,
        grandPiano: 0.3,
        strummedChords2: 0.3,
        soloViolinMelody3: 0.3,
        violaArpeggios: 0.3,
        tagelharpa: 0.3
      }
    },
    embersBountyTension: {
      label: "Ember's Bounty Tension",
      layers: {
        pluckedMelodyTension: 0.3,
        strummedChordsTension1: 0.3,
        strummedChordsTension2: 0.3,
        strummedBasslineTension: 0.3,
        uprightBassBasslineTension: 0.3,
        grandPianoTension: 0.3,
        accordianTension: 0.3,
        soloViolinMelodyTension1: 0.3,
        soloViolinMelodyTension2: 0.3,
        violinRepetitionsTension: 0.3,
        pizzicatoMelodyTension1: 0.3,
        pizzicatoMelodyTension2: 0.3,
        fluteTensionPad: 0.3,
        stringTensionPad: 0.3,
        whistleTension: 0.3,
        pluckedStringRepetitionsTension: 0.3,
        violaArpeggios: 0.3,
        bassDrum: 0.2
      }
    }
  }
};var illusoryCombat = {
  id: "illusoryCombat",
  label: "Illusory Combat",
  type: "music",
  src: "music/illusory-combat",
  timing: {
    bpm: 120,
    bars: 8,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "percussive",
      interval: 16,
      fadeIn: 0.2,
      fadeOut: 2.5,
      randomLayers: {min: 0, max: 3}
    },
    {
      id: "melodic",
      interval: 8,
      fadeIn: 0.3,
      fadeOut: 3,
      randomLayers: {min: 0, max: 3}
    },
    {
      id: "ambient",
      interval: 16,
      fadeOut: 3.5,
      randomLayers: {min: 0, max: 3}
    },
    {
      id: "transitions",
      interval: 16,
      fadeIn: 2,
      fadeOut: 5,
      randomLayers: {min: 0, max: 2}
    }
  ],
  segments: {
    atonalCelloRhythm: {src: "atonal-cello-rhythm.ogg", group: "ambient"},
    atonalStabs1: {src: "atonal-stabs-1.ogg", group: "ambient"},
    atonalStabs2: {src: "atonal-stabs-2.ogg", group: "ambient"},
    chimes1: {src: "chimes-1.ogg", group: "ambient"},
    clockLoop1: {src: "clock-loop-1.ogg", group: "ambient"},
    creepyBends1: {src: "creepy-bends-1.ogg", group: "ambient"},
    creepyBends2: {src: "creepy-bends-2.ogg", group: "ambient"},
    creepySynthRhythm1: {src: "creepy-synth-rhythm-1.ogg", group: "ambient"},
    darkPlucks1: {src: "dark-plucks-1.ogg", group: "ambient"},
    deepDrum1: {src: "deep-drum-1.ogg", group: "percussive"},
    descendingStrings1: {src: "descending-strings-1.ogg", group: "melodic"},
    descendingStrings2: {src: "descending-strings-2.ogg", group: "melodic"},
    distortedDrums1: {src: "distorted-drums-1.ogg", group: "percussive"},
    distortedSynthArp1: {src: "distorted-synth-arp-1.ogg", group: "melodic"},
    distortedSynthRhythm1: {src: "distorted-synth-rhythm-1.ogg", group: "ambient"},
    fastAtonalStrings1: {src: "fast-atonal-strings-1.ogg", group: "melodic"},
    fireTransition1: {src: "fire-transition-1.ogg", group: "transitions"},
    metalTransition1: {src: "metal-transition-1.ogg", group: "transitions"},
    metalTransition2: {src: "metal-transition-2.ogg", group: "transitions"},
    rhythmicVocals1: {src: "rhythmic-vocals-1.ogg", group: "ambient"},
    sticks1: {src: "sticks-1.ogg", group: "percussive"},
    sticks2: {src: "sticks-2.ogg", group: "percussive"},
    stringBends1: {src: "string-bends-1.ogg", group: "melodic"},
    stringBends2: {src: "string-bends-2.ogg", group: "melodic"},
    synthBooms1: {src: "synth-booms-1.ogg", group: "percussive"},
    synthLeadArp1: {src: "synth-lead-arp-1.ogg", group: "melodic"},
    synthLeadArp2: {src: "synth-lead-arp-2.ogg", group: "melodic"},
    synthLeadArp3: {src: "synth-lead-arp-3.ogg", group: "melodic"},
    synthLeadArp4: {src: "synth-lead-arp-4.ogg", group: "melodic"},
    synthMelody1: {src: "synth-melody-1.ogg", group: "melodic"},
    synthMelody2: {src: "synth-melody-2.ogg", group: "melodic"},
    synthPad1: {src: "synth-pad-1.ogg", group: "ambient"},
    synthPad2: {src: "synth-pad-2.ogg", group: "ambient"},
    violinArp1: {src: "violin-arp-1.ogg", group: "melodic"},
    violinMelody1: {src: "violin-melody-1.ogg", group: "melodic"},
    violinMelody2: {src: "violin-melody-2.ogg", group: "melodic"},
    vocalBreathing1: {src: "vocal-breathing-1.ogg", group: "ambient"},
    vocalTransitions1: {src: "vocal-transitions-1.ogg", group: "transitions"},
    waterTransition1: {src: "water-transition-1.ogg", group: "transitions"},
    waterTransition2: {src: "water-transition-2.ogg", group: "transitions"},
    weirdVoice1: {src: "weird-voice-1.ogg", group: "ambient"}
  },
  arrangements: {
    illusoryFightMain: {
      label: "Illusory Fight Main",
      layers: {
        chimes1: 0.6,
        clockLoop1: 0.6,
        creepyBends1: 0.6,
        creepyBends2: 0.6,
        deepDrum1: 0.6,
        distortedDrums1: 0.6,
        distortedSynthArp1: 0.6,
        fireTransition1: 0.6,
        sticks1: 0.6,
        sticks2: 0.6,
        synthBooms1: 0.6,
        synthLeadArp1: 0.6,
        synthLeadArp2: 0.6,
        synthMelody1: 0.6,
        synthMelody2: 0.6,
        violinArp1: 0.6,
        violinMelody1: 0.6,
        violinMelody2: 0.6,
        vocalBreathing1: 0.6,
        vocalTransitions1: 0.6,
        waterTransition1: 0.6,
        waterTransition2: 0.6,
        weirdVoice1: 0.6
      }
    },
    illusoryFightAtonal: {
      label: "Illusory Fight Atonal",
      layers: {
        atonalCelloRhythm: 0.6,
        atonalStabs1: 0.6,
        atonalStabs2: 0.6,
        creepySynthRhythm1: 0.6,
        darkPlucks1: 0.6,
        descendingStrings1: 0.6,
        descendingStrings2: 0.6,
        distortedSynthRhythm1: 0.6,
        fastAtonalStrings1: 0.6,
        metalTransition1: 0.6,
        metalTransition2: 0.6,
        rhythmicVocals1: 0.6,
        stringBends1: 0.6,
        stringBends2: 0.6,
        synthLeadArp3: 0.6,
        synthLeadArp4: 0.6,
        synthPad1: 0.6,
        synthPad2: 0.6,
        distortedDrums1: 0.6,
        vocalBreathing1: 0.6,
        sticks2: 0.6,
        sticks1: 0.6,
        waterTransition1: 0.6,
        waterTransition2: 0.6
      }
    }
  }
};var innerRealmsMusic = {
  id: "innerRealmsMusic",
  label: "Inner Realms Music",
  type: "music",
  src: "music/inner-realms",
  timing: {
    bpm: 120,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 8,
      fadeOut: 9,
      randomLayers: {min: 2, max: 7}
    }
  ],
  segments: {
    chromaticPad1: {src: "chromatic-pad-1.ogg"},
    chromaticPad2: {src: "chromatic-pad-2.ogg"},
    deepDrum: {src: "deep-drum.ogg"},
    stringWaves: {src: "string-waves.ogg"},
    synthArp1: {src: "synth-arp-1.ogg"},
    synthArp2: {src: "synth-arp-2.ogg"},
    synthLead: {src: "synth-lead.ogg"},
    synthLeadArp: {src: "synth-lead-arp.ogg"},
    warblingSynth: {src: "warbling-synth.ogg"},
    weirdVoice: {src: "weird-voice.ogg"},
    highStringPad: {src: "high-string-pad.ogg"},
    highSynthPad: {src: "high-synth-pad.ogg"},
    synthBass: {src: "synth-bass.ogg"},
    synthLeadArp2: {src: "synth-lead-arp-2.ogg"},
    bassRhythm: {src: "bass-rhythm.ogg"},
    stringFifths: {src: "string-fifths.ogg"},
    throatSinging: {src: "throat-singing.ogg"},
    stringWaves2: {src: "string-waves-2.ogg"},
    choirFifths: {src: "choir-fifths.ogg"},
    chaoticSynthArp: {src: "chaotic-synth-arp.ogg"},
    creepyDrone: {src: "creepy-drone.ogg"},
    highStringPadTension: {src: "high-string-pad-tension.ogg"},
    highSynthPadTension: {src: "high-synth-pad-tension.ogg"},
    stringWavesTension: {src: "string-waves-tension.ogg"},
    stringWavesTension2: {src: "string-waves-tension-2.ogg"},
    synthArp1Tension: {src: "synth-arp-1-tension.ogg"},
    synthArp2Tension: {src: "synth-arp-2-tension.ogg"},
    synthLeadArp2Tension: {src: "synth-lead-arp-2-tension.ogg"},
    synthLeadArpTension: {src: "synth-lead-arp-tension.ogg"},
    throatSingingTension: {src: "throat-singing-tension.ogg"}
  },
  arrangements: {
    signaraCalm: {
      label: "Signara Calm",
      layers: {
        chromaticPad1: 1.0,
        chromaticPad2: 1.0,
        deepDrum: 1.0,
        stringWaves: 1.0,
        synthArp1: 1.0,
        synthArp2: 1.0,
        synthLead: 1.0,
        synthLeadArp: 1.0,
        warblingSynth: 1.0,
        weirdVoice: 1.0,
        highStringPad: 1.0,
        highSynthPad: 1.0,
        synthBass: 1.0,
        synthLeadArp2: 1.0,
        bassRhythm: 1.0,
        stringFifths: 1.0,
        throatSinging: 1.0,
        stringWaves2: 1.0,
        choirFifths: 1.0
      }
    },
    signaraTension: {
      label: "Signara Tension",
      layers: {
        chromaticPad1: 1.0,
        chromaticPad2: 1.0,
        deepDrum: 1.0,
        stringWavesTension: 1.0,
        synthArp1Tension: 1.0,
        synthArp2Tension: 1.0,
        synthLead: 1.0,
        synthLeadArpTension: 1.0,
        warblingSynth: 1.0,
        weirdVoice: 1.0,
        highStringPadTension: 1.0,
        highSynthPadTension: 1.0,
        synthLeadArp2Tension: 1.0,
        bassRhythm: 1.0,
        throatSingingTension: 1.0,
        stringWavesTension2: 1.0,
        chaoticSynthArp: 1.0,
        creepyDrone: 1.0
      }
    }
  }
};var kadisosExploration = {
  id: "kadisosExploration",
  label: "Kadisos Exploration",
  type: "music",
  src: "music/kadisos/exploration",
  timing: {
    bpm: 70,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 32,
      fadeIn: 12,
      fadeOut: 15,
      randomLayers: {min: 2, max: 8}
    }
  ],
  segments: {
    atmosphericPad: {src: "atmospheric-pad.ogg"},
    balafonLeft: {src: "balafon-left.ogg"},
    balafonRight: {src: "balafon-right.ogg"},
    beatingDrum: {src: "beating-drum.ogg"},
    bolon: {src: "bolon.ogg"},
    brassMomentumSwells: {src: "brass-momentum-swells.ogg"},
    celloMomentumSwells: {src: "cello-momentum-swells.ogg"},
    creepyFluteRhythms: {src: "creepy-flute-rhythms.ogg"},
    creepyHighStringRhythms: {src: "creepy-high-string-rhythms.ogg"},
    creepyJungleFlute: {src: "creepy-jungle-flute.ogg"},
    creepyMarimba: {src: "creepy-marimba.ogg"},
    creepyPizzicato: {src: "creepy-pizzicato.ogg"},
    creepyStrings1: {src: "creepy-strings-1.ogg"},
    creepyStrings2: {src: "creepy-strings-2.ogg"},
    cymbolSwells: {src: "cymbol-swells.ogg"},
    darkHorns: {src: "dark-horns.ogg"},
    deepCelloRhythm: {src: "deep-cello-rhythm.ogg"},
    deepDrum: {src: "deep-drum.ogg"},
    deepTaiko1: {src: "deep-taiko-1.ogg"},
    deepTaiko2: {src: "deep-taiko-2.ogg"},
    didgeridooDrone: {src: "didgeridoo-drone.ogg"},
    djembe1: {src: "djembe-1.ogg"},
    djembe2: {src: "djembe-2.ogg"},
    doubleBassPizzicato: {src: "double-bass-pizzicato.ogg"},
    doubleFlute: {src: "double-flute.ogg"},
    drumSwells: {src: "drum-swells.ogg", timing: {delay: 3, pad: 2}},
    dununba: {src: "dununba.ogg"},
    fiddle: {src: "fiddle.ogg"},
    filteredFiddle: {src: "filtered-fiddle.ogg"},
    godDrone: {src: "god-drone.ogg"},
    handBellSwells: {src: "hand-bell-swells.ogg"},
    harmonicHighStrings: {src: "harmonic-high-strings.ogg"},
    harp: {src: "harp.ogg"},
    harpCelesteFifthDrops: {src: "harp-celeste-fifth-drops.ogg"},
    highStringsMelody: {src: "high-strings-melody.ogg"},
    highStringsTremoloSwell: {src: "high-strings-tremolo-swell.ogg"},
    hummingManLeft: {src: "humming-man-left.ogg"},
    hummingManRight: {src: "humming-man-right.ogg"},
    jingle: {src: "jingle.ogg"},
    kalimba: {src: "kalimba.ogg"},
    kenkeni: {src: "kenkeni.ogg"},
    lowStringTremolo: {src: "low-string-tremolo.ogg"},
    lowStringsOstinato: {src: "low-strings-ostinato.ogg"},
    lowStringsOstinatoColLegno: {src: "low-strings-ostinato-col-legno.ogg"},
    lowStringsTremoloSwell: {src: "low-strings-tremolo-swell.ogg"},
    maleChoirAmename: {src: "male-choir-amename.ogg"},
    maleChoirClockworkNana: {src: "male-choir-clockwork-nana.ogg"},
    mandolinMelody: {src: "mandolin-melody.ogg"},
    midStringsMelody: {src: "mid-strings-melody.ogg"},
    midStringsOstinato: {src: "mid-strings-ostinato.ogg"},
    mountainDulcimar: {src: "mountain-dulcimar.ogg"},
    mysticalDrone2: {src: "mystical-drone-2.ogg"},
    mysticalDrone: {src: "mystical-drone.ogg"},
    mysticalFlute: {src: "mystical-flute.ogg"},
    phanamSwell: {src: "pantam-swell.ogg"},
    repeatingStringsMelodyLeft: {src: "repeating-strings-melody-left.ogg"},
    repeatingStringsMelodyRight: {src: "repeating-strings-melody-right.ogg"},
    sangba: {src: "sangba.ogg"},
    shakerEchoes: {src: "shaker-echoes.ogg"},
    shakerLeft: {src: "shaker-left.ogg"},
    shakerRight: {src: "shaker-right.ogg"},
    shamanDrumLeft: {src: "shaman-drum-left.ogg"},
    shamanDrumRight: {src: "shaman-drum-right.ogg"},
    shiveringStrings: {src: "shivering-strings.ogg"},
    skinDrum: {src: "skin-drum.ogg"},
    stringTremoloWaves: {src: "string-tremolo-waves.ogg"},
    synthBass: {src: "synth-bass.ogg"},
    taikoLeft: {src: "taiko-left.ogg"},
    taikoRight: {src: "taiko-right.ogg"},
    throatSinging: {src: "throat-singing.ogg"},
    tribalDrums: {src: "tribal-drums.ogg"},
    tribalSticks: {src: "tribal-sticks.ogg"},
    ukuleleMelody: {src: "ukulele-melody.ogg"},
    violOstinato: {src: "viol-ostinato.ogg"},
    violScratchDrone: {src: "viol-scratch-drone.ogg"},
    violSwell: {src: "viol-swell.ogg"},
    violTremoloSwell: {src: "viol-tremolo-swell.ogg"},
    wagnerTubasMelody: {src: "wagner-tubas-melody.ogg"},
    waterDrum: {src: "water-drum.ogg"},
    waterDrumSwells: {src: "water-drum-swells.ogg"},
    waterharpPad: {src: "waterharp-pad.ogg"},
    waterphoneFX: {src: "waterphone-fx.ogg"},
    womensChoirFifthDrops: {src: "womens-choir-fifth-drops.ogg"}
  },
  arrangements: {
    mountainsDay: {
      label: "Mountains Day",
      layers: {
        wagnerTubasMelody: 1.0,
        womensChoirFifthDrops: 1.0,
        cymbolSwells: 1.0,
        deepDrum: 1.0,
        highStringsMelody: 1.0,
        midStringsMelody: 1.0,
        lowStringsOstinato: 1.0,
        lowStringsOstinatoColLegno: 1.0,
        maleChoirAmename: 1.0,
        midStringsOstinato: 1.0,
        mountainDulcimar: 1.0,
        shiveringStrings: 1.0,
        stringTremoloWaves: 1.0,
        jingle: 1.0,
        deepTaiko1: 1.0,
        deepTaiko2: 1.0
      }
    },
    mountainsNight: {
      label: "Mountains Night",
      layers: {
        cymbolSwells: 1.0,
        deepDrum: 1.0,
        doubleFlute: 1.0,
        harp: 1.0,
        harpCelesteFifthDrops: 1.0,
        highStringsMelody: 1.0,
        maleChoirAmename: 1.0,
        maleChoirClockworkNana: 1.0,
        midStringsMelody: 1.0,
        mysticalDrone: 1.0,
        shiveringStrings: 1.0,
        stringTremoloWaves: 1.0,
        womensChoirFifthDrops: 1.0
      }
    },
    mountainsTension: {
      label: "Mountains Tension",
      layers: {
        brassMomentumSwells: 1.0,
        celloMomentumSwells: 1.0,
        creepyMarimba: 1.0,
        creepyStrings1: 1.0,
        creepyStrings2: 1.0,
        cymbolSwells: 1.0,
        deepDrum: 1.0,
        deepTaiko1: 1.0,
        deepTaiko2: 1.0,
        godDrone: 1.0,
        jingle: 1.0,
        lowStringsOstinato: 1.0,
        lowStringsOstinatoColLegno: 1.0,
        midStringsOstinato: 1.0,
        shiveringStrings: 1.0,
        violOstinato: 1.0,
        violScratchDrone: 1.0
      }
    },
    jungleDay: {
      label: "Jungle Day",
      layers: {
        balafonLeft: 1.0,
        balafonRight: 1.0,
        beatingDrum: 1.0,
        bolon: 1.0,
        deepDrum: 1.0,
        didgeridooDrone: 1.0,
        djembe1: 1.0,
        djembe2: 1.0,
        doubleFlute: 1.0,
        dununba: 1.0,
        kenkeni: 1.0,
        mysticalDrone: 1.0,
        mysticalDrone2: 1.0,
        sangba: 1.0,
        shakerEchoes: 1.0,
        shamanDrumLeft: 1.0,
        shamanDrumRight: 1.0
      }
    },
    jungleNight: {
      label: "Jungle Night",
      layers: {
        deepDrum: 1.0,
        didgeridooDrone: 1.0,
        doubleFlute: 1.0,
        dununba: 1.0,
        harp: 1.0,
        kalimba: 1.0,
        mysticalDrone: 1.0,
        mysticalDrone2: 1.0,
        mysticalFlute: 1.0,
        sangba: 1.0,
        shakerEchoes: 1.0,
        shiveringStrings: 1.0
      }
    },
    jungleTension: {
      label: "Jungle Tension",
      layers: {
        creepyFluteRhythms: 1.0,
        creepyHighStringRhythms: 1.0,
        creepyJungleFlute: 1.0,
        creepyMarimba: 1.0,
        creepyPizzicato: 1.0,
        creepyStrings1: 1.0,
        creepyStrings2: 1.0,
        darkHorns: 1.0,
        deepCelloRhythm: 1.0,
        deepDrum: 1.0,
        didgeridooDrone: 1.0,
        doubleFlute: 1.0,
        hummingManLeft: 1.0,
        hummingManRight: 1.0,
        shakerEchoes: 1.0,
        taikoLeft: 1.0,
        taikoRight: 1.0
      }
    },
    bluffsDay: {
      label: "Bluffs Day",
      layers: {
        cymbolSwells: 1.0,
        fiddle: 1.0,
        harp: 1.0,
        mountainDulcimar: 1.0,
        stringTremoloWaves: 1.0,
        jingle: 1.0,
        doubleBassPizzicato: 1.0,
        skinDrum: 1.0,
        mandolinMelody: 1.0,
        ukuleleMelody: 1.0,
        shiveringStrings: 1.0
      }
    },
    bluffsNight: {
      label: "Bluffs Night",
      layers: {
        harp: 1.0,
        stringTremoloWaves: 1.0,
        mandolinMelody: 1.0,
        ukuleleMelody: 1.0,
        shiveringStrings: 1.0,
        womensChoirFifthDrops: 1.0,
        atmosphericPad: 1.0
      }
    },
    bluffsTension: {
      label: "Bluffs Tension",
      layers: {
        cymbolSwells: 1.0,
        filteredFiddle: 1.0,
        jingle: 1.0,
        mandolinMelody: 1.0,
        ukuleleMelody: 1.0,
        deepDrum: 1.0,
        creepyStrings2: 1.0,
        creepyStrings1: 1.0,
        creepyPizzicato: 1.0,
        deepCelloRhythm: 1.0,
        violScratchDrone: 1.0
      }
    },
    tidalPoolsDay: {
      label: "Tidal Pools Day",
      layers: {
        womensChoirFifthDrops: 1.0,
        balafonLeft: 1.0,
        balafonRight: 1.0,
        godDrone: 1.0,
        kalimba: 1.0,
        kenkeni: 1.0,
        mysticalFlute: 1.0,
        sangba: 1.0,
        mysticalDrone: 1.0,
        waterDrumSwells: 1.0,
        waterharpPad: 1.0,
        deepDrum: 1.0,
        synthBass: 1.0,
        waterphoneFX: 1.0
      }
    },
    tidalPoolsNight: {
      label: "Tidal Pools Night",
      layers: {
        womensChoirFifthDrops: 1.0,
        godDrone: 1.0,
        kalimba: 1.0,
        kenkeni: 1.0,
        mysticalFlute: 1.0,
        sangba: 1.0,
        stringTremoloWaves: 1.0,
        mysticalDrone: 1.0,
        waterDrumSwells: 1.0,
        waterharpPad: 1.0,
        harpCelesteFifthDrops: 1.0
      }
    },
    tidalPoolsTension: {
      label: "Tidal Pools Tension",
      layers: {
        womensChoirFifthDrops: 1.0,
        balafonLeft: 1.0,
        balafonRight: 1.0,
        godDrone: 1.0,
        kalimba: 1.0,
        kenkeni: 1.0,
        mysticalFlute: 1.0,
        sangba: 1.0,
        mysticalDrone: 1.0,
        waterDrumSwells: 1.0,
        waterharpPad: 1.0,
        creepyFluteRhythms: 1.0,
        creepyMarimba: 1.0,
        darkHorns: 1.0,
        deepDrum: 1.0,
        synthBass: 1.0,
        waterphoneFX: 1.0
      }
    },
    oceanDay: {
      label: "Ocean Day",
      layers: {
        atmosphericPad: 1.0,
        beatingDrum: 1.0,
        cymbolSwells: 1.0,
        deepDrum: 1.0,
        fiddle: 1.0,
        harpCelesteFifthDrops: 1.0,
        maleChoirAmename: 1.0,
        maleChoirClockworkNana: 1.0,
        mandolinMelody: 1.0,
        midStringsMelody: 1.0,
        shiveringStrings: 1.0,
        ukuleleMelody: 1.0,
        wagnerTubasMelody: 1.0,
        highStringsMelody: 1.0,
        repeatingStringsMelodyLeft: 1.0,
        repeatingStringsMelodyRight: 1.0
      }
    },
    oceanNight: {
      label: "Ocean Night",
      layers: {
        atmosphericPad: 1.0,
        cymbolSwells: 1.0,
        deepDrum: 1.0,
        harpCelesteFifthDrops: 1.0,
        maleChoirAmename: 1.0,
        maleChoirClockworkNana: 1.0,
        mandolinMelody: 1.0,
        midStringsMelody: 1.0,
        shiveringStrings: 1.0,
        ukuleleMelody: 1.0,
        wagnerTubasMelody: 1.0
      }
    },
    oceanTension: {
      label: "Ocean Tension",
      layers: {
        cymbolSwells: 1.0,
        deepDrum: 1.0,
        filteredFiddle: 1.0,
        shiveringStrings: 1.0,
        ukuleleMelody: 1.0,
        brassMomentumSwells: 1.0,
        celloMomentumSwells: 1.0,
        creepyStrings1: 1.0,
        creepyStrings2: 1.0,
        waterphoneFX: 1.0
      }
    },
    teethDay: {
      label: "Teeth Day",
      layers: {
        cymbolSwells: 1.0,
        filteredFiddle: 1.0,
        lowStringsOstinatoColLegno: 1.0,
        lowStringsOstinato: 1.0,
        mountainDulcimar: 1.0,
        repeatingStringsMelodyLeft: 1.0,
        repeatingStringsMelodyRight: 1.0,
        shakerEchoes: 1.0,
        stringTremoloWaves: 1.0,
        taikoLeft: 1.0,
        taikoRight: 1.0,
        harmonicHighStrings: 1.0,
        highStringsTremoloSwell: 1.0,
        lowStringsTremoloSwell: 1.0,
        pantamSwell: 1.0,
        violSwell: 1.0,
        violTremoloSwell: 1.0
      }
    },
    teethNight: {
      label: "Teeth Night",
      layers: {
        cymbolSwells: 1.0,
        repeatingStringsMelodyLeft: 1.0,
        shakerEchoes: 1.0,
        stringTremoloWaves: 1.0,
        harmonicHighStrings: 1.0,
        highStringsTremoloSwell: 1.0,
        lowStringsTremoloSwell: 1.0,
        pantamSwell: 1.0,
        violSwell: 1.0,
        violTremoloSwell: 1.0
      }
    },
    teethTension: {
      label: "Teeth Tension",
      layers: {
        brassMomentumSwells: 1.0,
        celloMomentumSwells: 1.0,
        cymbolSwells: 1.0,
        darkHorns: 1.0,
        filteredFiddle: 1.0,
        lowStringsOstinatoColLegno: 1.0,
        lowStringsOstinato: 1.0,
        lowStringTremolo: 1.0,
        shakerEchoes: 1.0,
        taikoLeft: 1.0,
        taikoRight: 1.0,
        violScratchDrone: 1.0,
        harmonicHighStrings: 1.0,
        highStringsTremoloSwell: 1.0,
        lowStringsTremoloSwell: 1.0,
        pantamSwell: 1.0,
        violSwell: 1.0,
        violTremoloSwell: 1.0,
        handBellSwells: 1.0
      }
    },
    cauldronDay: {
      label: "Cauldron Day",
      layers: {
        atmosphericPad: 1.0,
        waterDrum: 1.0,
        waterDrumSwells: 1.0,
        waterharpPad: 1.0,
        waterphoneFX: 1.0,
        godDrone: 1.0,
        harpCelesteFifthDrops: 1.0,
        kalimba: 1.0,
        mysticalDrone: 1.0,
        shakerEchoes: 1.0,
        deepDrum: 1.0
      }
    },
    cauldronNight: {
      label: "Cauldron Night",
      layers: {
        atmosphericPad: 1.0,
        waterharpPad: 1.0,
        waterphoneFX: 1.0,
        godDrone: 1.0,
        harpCelesteFifthDrops: 1.0,
        mysticalDrone: 1.0,
        shakerEchoes: 1.0,
        deepDrum: 1.0
      }
    },
    cauldronTension: {
      label: "Cauldron Tension",
      layers: {
        atmosphericPad: 1.0,
        waterDrumSwells: 1.0,
        waterharpPad: 1.0,
        waterphoneFX: 1.0,
        godDrone: 1.0,
        harpCelesteFifthDrops: 1.0,
        kalimba: 1.0,
        mysticalDrone: 1.0,
        shakerEchoes: 1.0,
        creepyMarimba: 1.0,
        creepyJungleFlute: 1.0,
        darkHorns: 1.0,
        creepyStrings1: 1.0,
        creepyStrings2: 1.0,
        deepDrum: 1.0,
        brassMomentumSwells: 1.0
      }
    }
  }
};var lylaTheme = {
  id: "lylaTheme",
  label: "Lyla Theme",
  type: "music",
  src: "music/lyla-theme",
  timing: {
    bpm: 116,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 2,
      fadeOut: 4,
      randomLayers: {min: 4, max: 6}
    }
  ],
  segments: {
    bassFluteChords: { src: "bass-flute-chords.ogg" },
    bigMelody: { src: "big-melody.ogg" },
    dulcimerCountermelody: { src: "dulcimer-countermelody.ogg" },
    folkBassline: { src: "folk-bassline.ogg" },
    highFolkGroove: { src: "high-folk-groove.ogg" },
    lowFolkGroove: { src: "low-folk-groove.ogg" },
    noirChords: { src: "noir-chords.ogg" },
    pluckedStringRepetitions: { src: "plucked-string-repetitions.ogg" },
    soloViolinMelody: { src: "solo-violin-melody.ogg" },
    tickingPercussion: { src: "ticking-percussion.ogg" },
    trumpetCountermelody: { src: "trumpet-countermelody.ogg" },
    uprightBassBassline: { src: "upright-bass-bassline.ogg" },
    violDaGambaBassline: { src: "viol-da-gamba-bassline.ogg" }
  },
  arrangements: {
    lylaTheme: {
      label: "Lyla Theme",
      layers: {
        bassFluteChords: 0.4,
        bigMelody: 0.3,
        dulcimerCountermelody: 0.4,
        folkBassline: 0.4,
        highFolkGroove: 0.4,
        lowFolkGroove: 0.4,
        noirChords: 0.4,
        pluckedStringRepetitions: 0.4,
        soloViolinMelody: 0.4,
        tickingPercussion: 0.4,
        trumpetCountermelody: 0.3,
        uprightBassBassline: 0.4,
        violDaGambaBassline: 0.4
      }
    }
  }
};var marlstoneGala$1 = {
  id: "marlstoneGala",
  label: "Marlstone Gala",
  type: "music",
  src: "music/gala",
  timing: {
    bpm: 45,
    bars: 4,
    sync: true
  },
  groups: [
    {
      id: "violin",
      interval: 4,
      fadeIn: 0.01,
      fadeOut: 0.01,
      randomLayers: {min: 0, max: 1}
    },
    {
      id: "cello",
      interval: 4,
      fadeIn: 0.01,
      fadeOut: 0.01,
      randomLayers: {min: 0, max: 1}
    },
    {
      id: "dulcimer",
      interval: 4,
      fadeIn: 0.01,
      fadeOut: 0.01,
      randomLayers: {min: 0, max: 1}
    },
    {
      id: "mandolin",
      interval: 4,
      fadeIn: 0.01,
      fadeOut: 0.01,
      randomLayers: {min: 1, max: 1}
    },
    {
      id: "oboe",
      interval: 4,
      fadeIn: 0.01,
      fadeOut: 0.01,
      randomLayers: {min: 0, max: 1}
    },
    {
      id: "background",
      interval: 4,
      fadeIn: 0.1,
      fadeOut: 2,
      randomLayers: {min: 1, max: 4}
    }
  ],
  segments: {
    celloPart1Tension: {src: "cello-part-1-tension.ogg", group: "cello"},
    celloPart2Tension: {src: "cello-part-2-tension.ogg", group: "cello"},
    celloPart3Tension: {src: "cello-part-3-tension.ogg", group: "cello"},
    dulcimerPart1Tension: {src: "dulcimer-part-1-tension.ogg", group: "dulcimer"},
    dulcimerPart2Tension: {src: "dulcimer-part-2-tension.ogg", group: "dulcimer"},
    dulcimerPart3Tension: {src: "dulcimer-part-3-tension.ogg", group: "dulcimer"},
    mandolinPart1Tension: {src: "mandolin-part-1-tension.ogg", group: "mandolin"},
    mandolinPart2Tension: {src: "mandolin-part-2-tension.ogg", group: "mandolin"},
    mandolinPart3Tension: {src: "mandolin-part-3-tension.ogg", group: "mandolin"},
    oboePart1Tension: {src: "oboe-part-1-tension.ogg", group: "oboe"},
    oboePart2Tension: {src: "oboe-part-2-tension.ogg", group: "oboe"},
    oboePart3Tension: {src: "oboe-part-3-tension.ogg", group: "oboe"},
    violinPart1Tension: {src: "violin-part-1-tension.ogg", group: "violin"},
    violinPart2Tension: {src: "violin-part-2-tension.ogg", group: "violin"},
    violinPart3Tension: {src: "violin-part-3-tension.ogg", group: "violin"},
    warpedPlucks1: {src: "warped-plucks-1.ogg", group: "background"},
    warpedPlucks2: {src: "warped-plucks-2.ogg", group: "background"},
    warpedPlucks3: {src: "warped-plucks-3.ogg", group: "background"},
    creepyDrone: {src: "creepy-drone.ogg", group: "background"},
    creepyStringMotion: {src: "creepy-string-motion.ogg", group: "background"},
    creepyBends1: {src: "creepy-bends-1.ogg", group: "background"},
    creepyBends2: {src: "creepy-bends-2.ogg", group: "background"},
    celloBass: {src: "cello-bass.ogg", group: "background"},
    celloBassPizzicato: {src: "cello-bass-pizzicato.ogg", group: "background"},
    deepSynthBass: {src: "deep-synth-bass.ogg", group: "background"},
    cymbalSwellDrone: {src: "cymbal-swell-drone.ogg", group: "background"},
    highStringsShortTension: {src: "high-strings-short-tension.ogg", group: "background"},
    longTremoloTension: {src: "long-tremolo-tension.ogg", group: "background"},
    celloPart1: {src: "cello-part-1.ogg", group: "cello"},
    celloPart2: {src: "cello-part-2.ogg", group: "cello"},
    celloPart3: {src: "cello-part-3.ogg", group: "cello"},
    dulcimerPart1: {src: "dulcimer-part-1.ogg", group: "dulcimer"},
    dulcimerPart2: {src: "dulcimer-part-2.ogg", group: "dulcimer"},
    dulcimerPart3: {src: "dulcimer-part-3.ogg", group: "dulcimer"},
    mandolinPart1: {src: "mandolin-part-1.ogg", group: "mandolin"},
    mandolinPart2: {src: "mandolin-part-2.ogg", group: "mandolin"},
    mandolinPart3: {src: "mandolin-part-3.ogg", group: "mandolin"},
    oboePart1: {src: "oboe-part-1.ogg", group: "oboe"},
    oboePart2: {src: "oboe-part-2.ogg", group: "oboe"},
    oboePart3: {src: "oboe-part-3.ogg", group: "oboe"},
    violinPart1: {src: "violin-part-1.ogg", group: "violin"},
    violinPart2: {src: "violin-part-2.ogg", group: "violin"},
    violinPart3: {src: "violin-part-3.ogg", group: "violin"}
  },
  arrangements: {
    marlstoneGala: {
      label: "Marlstone Gala",
      layers: {
        celloPart1: 0.3,
        celloPart2: 0.3,
        celloPart3: 0.3,
        dulcimerPart1: 0.3,
        dulcimerPart2: 0.3,
        dulcimerPart3: 0.3,
        mandolinPart1: 0.3,
        mandolinPart2: 0.3,
        mandolinPart3: 0.3,
        oboePart1: 0.3,
        oboePart2: 0.3,
        oboePart3: 0.3,
        violinPart1: 0.3,
        violinPart2: 0.3,
        violinPart3: 0.3
      }
    },
    marlstoneGalaTension: {
      label: "Marlstone Gala Tension",
      layers: {
        celloPart1Tension: 0.3,
        celloPart2Tension: 0.3,
        celloPart3Tension: 0.3,
        dulcimerPart1Tension: 0.3,
        dulcimerPart2Tension: 0.3,
        dulcimerPart3Tension: 0.3,
        mandolinPart1Tension: 0.3,
        mandolinPart2Tension: 0.3,
        mandolinPart3Tension: 0.3,
        oboePart1Tension: 0.3,
        oboePart2Tension: 0.3,
        oboePart3Tension: 0.3,
        violinPart1Tension: 0.3,
        violinPart2Tension: 0.3,
        violinPart3Tension: 0.3,
        warpedPlucks1: 0.3,
        warpedPlucks2: 0.3,
        warpedPlucks3: 0.3,
        creepyDrone: 0.3,
        creepyStringMotion: 0.3,
        creepyBends1: 0.3,
        creepyBends2: 0.3,
        celloBass: 0.3,
        celloBassPizzicato: 0.3,
        deepSynthBass: 0.3,
        highStringsShortTension: 0.3,
        longTremoloTension: 0.3
      }
    }
  }
};var monstrosityCombat = {
  id: "monstrosityCombat",
  label: "Monstrosity Combat",
  type: "music",
  src: "music/monstrosity-combat",
  timing: {
    bpm: 140,
    bars: 16,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "main",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 1, max: 3}
    },
    {
      id: "fast-strings",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 0, max: 3}
    },
    {
      id: "melody",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 0, max: 2}
    },
    {
      id: "percussion",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 1, max: 2}
    },
    {
      id: "transition",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 1, max: 1}
    }
  ],
  segments: {
    warHorn2: {src: "war-horn-2.ogg", group: "main"},
    warHorn: {src: "war-horn.ogg", group: "main"},
    violinTrumpetMelody: {src: "violin-trumpet-melody.ogg", group: "melody"},
    violinsShepardTone: {src: "violins-shepard-tone.ogg", group: "main"},
    transitionSwells: {src: "transition-swells.ogg", group: "transition"},
    synthySwell2: {src: "synthy-swell-2.ogg", group: "main"},
    synthySwell1: {src: "synthy-swell-1.ogg", group: "main"},
    synthMelody: {src: "synth-melody.ogg", group: "melody"},
    raspingBows: {src: "rasping-bows.ogg", group: "main"},
    marchingPercussion2: {src: "marching-percussion-2.ogg", group: "percussion"},
    glassSynth: {src: "glass-synth.ogg", group: "main"},
    fluteSynth1: {src: "flute-synth-1.ogg", group: "main"},
    deepSynthHits: {src: "deep-synth-hits.ogg", group: "main"},
    deepBowedStrings: {src: "deep-bowed-strings.ogg", group: "main"},
    brassStabs: {src: "brass-stabs.ogg", group: "main"},
    bigSynthBass: {src: "big-synth-bass.ogg", group: "main"},
    bigHornMelody: {src: "big-horn-melody.ogg", group: "melody"},
    atonalHighStrings: {src: "atonal-high-strings.ogg", group: "main"},
    atonalBrass: {src: "atonal-brass.ogg", group: "main"},
    marchingPercussion: {src: "marching-percussion.ogg", group: "percussion"},
    tribalDrums: {src: "tribal-drums.ogg", group: "percussion"},
    lowStringsBassline: {src: "low-strings-bassline.ogg", group: "main"},
    lowBrassBassline: {src: "low-brass-bassline.ogg", group: "main"},
    horrorStringsOstinato: {src: "horror-strings-ostinato.ogg", group: "main"},
    warblingDrone2: {src: "warbling-drone-2.ogg", group: "main"},
    warblingDrone1: {src: "warbling-drone-1.ogg", group: "main"},
    synthBassPattern: {src: "synth-bass-pattern.ogg", group: "main"},
    sticks: {src: "sticks.ogg", group: "percussion"},
    shadowStrings: {src: "shadow-strings.ogg", group: "main"},
    scarySwells: {src: "scary-swells.ogg", group: "transition"},
    fastViolin1: {src: "fast-violin-2.ogg", group: "fast-strings"},
    fastViolin2: {src: "fast-violin-2.ogg", group: "fast-strings"},
    fastViola2: {src: "fast-viola-2.ogg", group: "fast-strings"},
    fastViola1: {src: "fast-viola-1.ogg", group: "fast-strings"},
    fastCello2: {src: "fast-cello-2.ogg", group: "fast-strings"},
    fastCello1: {src: "fast-cello-1.ogg", group: "fast-strings"},
    distortedSynth: {src: "distorted-synth.ogg", group: "main"},
    bigDrums2: {src: "big-drums-2.ogg", group: "percussion"},
    bigDrums1: {src: "big-drums-1.ogg", group: "percussion"},
    bendingViolinOstinato: {src: "bending-violin-ostinato.ogg", group: "main"},
    alienSynth: {src: "alien-synth.ogg", group: "main"}
  },
  arrangements: {
    section1: {
      label: "Monstrosity Combat Section 1",
      layers: {
        fastCello1: 0.4,
        fastCello2: 0.4,
        fastViola1: 0.5,
        fastViola2: 0.5,
        fastViolin1: 0.5,
        fastViolin2: 0.5,
        warblingDrone1: 0.3,
        warblingDrone2: 0.3,
        tribalDrums: 0.5,
        sticks: 0.5,
        raspingBows: 0.5,
        synthySwell1: 0.5,
        synthySwell2: 0.5,
        fluteSynth1: 0.5,
        scarySwells: 0.5,
        bigDrums2: 0.3,
        shadowStrings: 0.3,
        brassStabs: 0.5,
        deepBowedStrings: 0.4,
        bigSynthBass: 0.5,
        violinTrumpetMelody: 0.5,
        synthMelody: 0.5,
        transitionSwells: 0.5
      }
    },
    section2: {
      label: "Monstrosity Combat Section 2",
      layers: {
        fastCello1: 0.4,
        fastCello2: 0.4,
        fastViola1: 0.5,
        fastViola2: 0.5,
        fastViolin1: 0.5,
        fastViolin2: 0.5,
        scarySwells: 0.5,
        bigHornMelody: 0.5,
        lowStringsBassline: 0.6,
        lowBrassBassline: 0.6,
        marchingPercussion: 0.5,
        distortedSynth: 0.6,
        bendingViolinOstinato: 0.6,
        violinsShepardTone: 0.6,
        sticks: 0.5,
        tribalDrums: 0.5,
        bigDrums2: 0.3
      }
    },
    section3: {
      label: "Monstrosity Combat Section 3",
      layers: {
        fastCello1: 0.4,
        fastCello2: 0.4,
        fastViola1: 0.5,
        fastViola2: 0.5,
        fastViolin1: 0.5,
        fastViolin2: 0.5,
        scarySwells: 0.5,
        bigDrums1: 0.4,
        alienSynth: 0.3,
        deepSynthHits: 0.3,
        glassSynth: 0.5,
        horrorStringsOstinato: 0.5,
        synthBassPattern: 0.4,
        warHorn: 0.5,
        atonalBrass: 0.4,
        atonalHighStrings: 0.4,
        marchingPercussion2: 0.4,
        warHorn2: 0.3,
        sticks: 0.5,
        tribalDrums: 0.5
      }
    }
  }
};var mutagenicCombat = {
  id: "mutagenicCombat",
  label: "Mutagenic Combat",
  type: "music",
  src: "music/mutagenic-combat",
  timing: {
    bpm: 125,
    bars: 8,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "bass",
      interval: 8,
      fadeIn: 1,
      fadeOut: 3,
      randomLayers: { min: 1, max: 2 },
      sync: true
    },
    {
      id: "main",
      interval: 8,
      fadeIn: 1,
      fadeOut: 3,
      randomLayers: {min: 4, max: 8}
    }
  ],
  segments: {
    synthBass1: {src: "synth-bass-1.ogg", group: "bass"},
    grittyCello1: {src: "gritty-cello-1.ogg", group: "main"},
    grittyCello2: {src: "gritty-cello-2.ogg", group: "main"},
    grittyViola1: {src: "gritty-viola-1.ogg", group: "main"},
    grittyViola2: {src: "gritty-viola-2.ogg", group: "main"},
    organ1: {src: "organ-1.ogg", group: "main"},
    organ2: {src: "organ-2.ogg", group: "main"},
    piano1: {src: "piano-1.ogg", group: "main"},
    piano2: {src: "piano-2.ogg", group: "main"},
    synthArp1: {src: "synth-arp-1.ogg", group: "main"},
    organBass1: {src: "organ-bass-1.ogg", group: "bass"},
    soloViolin1: {src: "solo-violin-1.ogg", group: "main"},
    soloViolin2: {src: "solo-violin-2.ogg", group: "main"},
    synthBooms1: {src: "synth-booms-1.ogg", group: "bass"},
    bigDrums1: {src: "big-drums-1.ogg", group: "main"},
    bigDrums2: {src: "big-drums-2.ogg", group: "main"},
    grittyStrings1: {src: "gritty-strings-1.ogg", group: "main"},
    harpsichord1: {src: "harpsichord-1.ogg", group: "main"},
    creepyBends1: {src: "creepy-bends-1.ogg", group: "main"},
    luteSwells1: {src: "lute-swells-1.ogg", group: "main"},
    deepDrum1: {src: "deep-drum-1.ogg", group: "bass"},
    deepDrum2: {src: "deep-drum-1.ogg", group: "bass"},
    synthLead1: {src: "synth-lead-1.ogg", group: "main"},
    boldCello1: {src: "bold-cello-1.ogg", group: "main"},
    sticks1: {src: "sticks-1.ogg", group: "main"},
    tremoloBends1: {src: "tremolo-bends-1.ogg", group: "main"},
    tremoloBends2: {src: "tremolo-bends-2.ogg", group: "main"},
    organ4: {src: "organ-4.ogg", group: "main"},
    grittyViola3: {src: "gritty-viola-3.ogg", group: "main"},
    grittyCello3: {src: "gritty-cello-3.ogg", group: "main"},
    boldCello2: {src: "bold-cello-2.ogg", group: "main"},
    colLegno1: {src: "col-legno-1.ogg", group: "main"},
    atonalStringsStab1: {src: "atonal-strings-stab-1.ogg", group: "main"},
    atonalSynthHits1: {src: "atonal-synth-hits-1.ogg", group: "main"},
    organ3: {src: "organ-3.ogg", group: "main"},
    lowBrass1: {src: "low-brass-1.ogg", group: "bass"},
    timpani1: {src: "timpani-1.ogg", group: "bass"},
    synthKeys1: {src: "synth-keys-1.ogg", group: "main"},
    atonalStringsStab2: {src: "atonal-strings-stab-2.ogg", group: "main"},
    synthBass2: {src: "synth-bass-2.ogg", group: "bass"},
    hornsMelody2: {src: "horns-melody-2.ogg", group: "main"},
    synthArp2: {src: "synth-arp-2.ogg", group: "main"},
    electricGuitarMelody1: {src: "electric-guitar-melody-1.ogg", group: "main"},
    hornsMelody1: {src: "horns-melody-1.ogg", group: "main"},
    violinMelody2: {src: "violin-melody-2.ogg", group: "main"},
    grittyCello4: {src: "gritty-cello-4.ogg", group: "main"},
    violinMelody1: {src: "violin-melody-1.ogg", group: "main"},
    grittyCello5: {src: "gritty-cello-5.ogg", group: "main"},
    bigSynth1: {src: "big-synth-1.ogg", group: "bass"},
    trumpets1: {src: "trumpets-1.ogg", group: "main"},
    piano3: {src: "piano-3.ogg", group: "main"},
    piano4: {src: "piano-4.ogg", group: "main"}
  },
  arrangements: {
    mutagenicFightMain: {
      label: "Mutagenic Fight Main",
      layers: {
        synthBass1: 0.5,
        grittyCello1: 0.5,
        grittyCello2: 0.5,
        grittyViola1: 0.5,
        grittyViola2: 0.5,
        organ1: 0.5,
        organ2: 0.5,
        piano1: 0.5,
        piano2: 0.5,
        synthArp1: 0.5,
        organBass1: 0.5,
        soloViolin1: 0.5,
        soloViolin2: 0.5,
        synthBooms1: 0.5,
        bigDrums1: 0.5,
        grittyStrings1: 0.5,
        harpsichord1: 0.5,
        creepyBends1: 0.5,
        luteSwells1: 0.5,
        deepDrum1: 0.5,
        synthLead1: 0.5,
        boldCello1: 0.5,
        sticks1: 0.5,
        tremoloBends1: 0.5,
        tremoloBends2: 0.5
      }
    },
    mutagenicFightMelody: {
      label: "Mutagenic Fight Melody",
      layers: {
        bigDrums2: 0.5,
        deepDrum2: 0.5,
        organ4: 0.83,
        grittyViola3: 0.5,
        grittyCello3: 0.5,
        boldCello2: 0.5,
        colLegno1: 0.5,
        atonalStringsStab1: 0.5,
        atonalSynthHits1: 0.5,
        organ3: 0.83,
        lowBrass1: 0.5,
        timpani1: 0.5,
        synthKeys1: 0.5,
        atonalStringsStab2: 0.5,
        synthBass2: 0.5,
        hornsMelody2: 0.5,
        synthArp2: 0.5,
        electricGuitarMelody1: 0.5,
        hornsMelody1: 0.5,
        violinMelody2: 0.83,
        grittyCello4: 0.5,
        violinMelody1: 0.83,
        grittyCello5: 0.5,
        bigSynth1: 0.5,
        trumpets1: 0.5,
        piano3: 0.5,
        piano4: 0.5,
        creepyBends1: 0.5,
        sticks1: 0.5,
        tremoloBends1: 0.5,
        tremoloBends2: 0.5
      }
    },
    mutagenicFightBreak: {
      label: "Mutagenic Fight Rhythm",
      layers: {
        bigDrums2: 0.5,
        deepDrum2: 0.5,
        sticks1: 0.5,
        timpani1: 0.5,
        creepyBends1: 0.5,
        tremoloBends1: 0.5,
        tremoloBends2: 0.5,
        atonalStringsStab1: 0.5,
        atonalStringsStab2: 0.5,
        atonalSynthHits1: 0.5,
        colLegno1: 0.5,
        luteSwells1: 0.5
      }
    }
  }
};var mysticalDungeon = {
  id: "mysticalDungeon",
  label: "Mystical Dungeon",
  type: "music",
  src: "music/mystical-dungeon",
  timing: {
    bpm: 72,
    bars: 23,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 23,
      fadeIn: 5,
      fadeOut: 7,
      randomLayers: {min: 3, max: 9}
    },
    {
      id: "extra",
      interval: 16,
      fadeIn: 5,
      fadeOut: 7,
      randomLayers: {min: 1, max: 2}
    }
  ],
  segments: {
    celestaSecondMelody: {src: "celesta-second-melody.ogg"},
    chimesDrone: {src: "chimes-drone.ogg"},
    etherealFirstMelodyPad: {src: "ethereal-first-melody-pad.ogg"},
    etherealFirstMelodyShimmerCello: {src: "ethereal-first-melody-shimmer-cello.ogg"},
    femaleChoirLongSwell: {src: "female-choir-long-swell.ogg"},
    femaleChoirSecondMelodyBottom: {src: "female-choir-second-melody-bottom.ogg"},
    femaleChoirSecondMelodyTop: {src: "female-choir-second-melody-top.ogg"},
    marimbaSecondMelody: {src: "marimba-second-melody.ogg"},
    slowDeepBowsDrone: {src: "slow-deep-bows-drone.ogg"},
    vibraphone1SecondMelody: {src: "vibraphone-1-second-melody.ogg"},
    vibraphone2SecondMelody: {src: "vibraphone-2-second-melody.ogg"},
    xylophoneSecondMelody: {src: "xylophone-second-melody.ogg"},
    creepySwell1: {src: "creepy-swell-1.ogg"},
    creepySwell2: {src: "creepy-swell-2.ogg"},
    creepyChoirSwell: {src: "creepy-choir-swell.ogg"},
    deepDrumDrone: {src: "deep-drum-drone.ogg"},
    fluteMelody: {src: "flute-melody.ogg"},
    fluteMotif2: {src: "flute-motif-2.ogg"},
    hauntingVoice: {src: "haunting-voice.ogg"},
    fluteMotif: {src: "flute-motif.ogg"},
    pluckedPianoMotif: {src: "plucked-piano-motif.ogg"},
    strangePad1: {src: "strange-pad-1.ogg"},
    ambientPad: {src: "ambient-pad.ogg"},
    strangePad2: {src: "strange-pad-2.ogg"},
    didgeridoo: {src: "didgeridoo.ogg"},
    bigDrumSwells: {src: "big-drum-swells.ogg"},
    taikos: {src: "taikos.ogg"},
    lowGrowl: {src: "low-growl.ogg"},
    subDrone: {src: "sub-drone.ogg"},
    creepyBends1: {src: "creepy-bends-1.ogg"},
    hornDidgeridooTension: {src: "horn-didgeridoo-tension.ogg"},
    creepyBends2: {src: "creepy-bends-2.ogg"},
    whispers: {src: "whispers.ogg"},
    fallingStrings: {src: "falling-strings.ogg"},
    femaleChoirSecondMelodyWarped2: {src: "female-choir-second-melody-warped-2.ogg"},
    femaleChoirSecondMelodyWarped1: {src: "female-choir-second-melody-warped-1.ogg"},
    risingBows: {src: "rising-bows.ogg"},
    fallingSynth: {src: "falling-synth.ogg"},
    darkBreathing: {src: "dark-breathing.ogg"},
    throatSingingLow: {src: "throat-singing-low.ogg"},
    throatSingingHigh: {src: "throat-singing-high.ogg"},
    tonalReverses: {src: "tonal-reverses.ogg"},
    hornChordSwells: {src: "horn-chord-swells.ogg"},
    lowBrassChordSwells: {src: "low-brass-chord-swells.ogg"},
    stringsChordSwells: {src: "strings-chord-swells.ogg"},
    flutesChordSwells: {src: "flutes-chord-swells.ogg"},
    lowStringsShepardTone: {src: "low-strings-shepard-tone.ogg", group: "extra"},
    lowSynthShepardTone: {src: "low-synth-shepard-tone.ogg", group: "extra"},
    highSynthShepardTone: {src: "high-synth-shepard-tone.ogg", group: "extra"}
  },
  arrangements: {
    kaleidoscopeCaverns: {
      label: "Kaleidoscope Caverns",
      layers: {
        celestaSecondMelody: 0.6,
        chimesDrone: 0.6,
        etherealFirstMelodyPad: 0.6,
        etherealFirstMelodyShimmerCello: 0.6,
        marimbaSecondMelody: 0.6,
        slowDeepBowsDrone: 0.6,
        vibraphone1SecondMelody: 0.6,
        vibraphone2SecondMelody: 0.6,
        xylophoneSecondMelody: 0.6
      }
    },
    kaleidoscopeCavernsTension: {
      label: "Kaleidoscope Caverns Tension",
      layers: {
        celestaSecondMelody: 0.6,
        chimesDrone: 0.6,
        marimbaSecondMelody: 0.6,
        slowDeepBowsDrone: 0.6,
        vibraphone1SecondMelody: 0.6,
        vibraphone2SecondMelody: 0.6,
        xylophoneSecondMelody: 0.6,
        creepySwell1: 0.6,
        creepySwell2: 0.6,
        creepyChoirSwell: 0.6
      }
    },
    pathways: {
      label: "Pathways",
      layers: {
        deepDrumDrone: 0.4,
        fluteMelody: 0.4,
        fluteMotif2: 0.4,
        hauntingVoice: 0.4,
        fluteMotif: 0.4,
        pluckedPianoMotif: 0.4,
        strangePad1: 0.4,
        ambientPad: 0.4,
        strangePad2: 0.4,
        didgeridoo: 0.4,
        bigDrumSwells: 0.4,
        taikos: 0.3,
        etherealFirstMelodyPad: 0.6,
        etherealFirstMelodyShimmerCello: 0.6,
        marimbaSecondMelody: 0.6,
        slowDeepBowsDrone: 0.6,
        vibraphone1SecondMelody: 0.6,
        vibraphone2SecondMelody: 0.6,
        xylophoneSecondMelody: 0.6,
        lowGrowl: 0.6,
        subDrone: 0.4
      }
    },
    pathwaysTension: {
      label: "Pathways Tension",
      layers: {
        deepDrumDrone: 0.4,
        hauntingVoice: 0.4,
        pluckedPianoMotif: 0.4,
        ambientPad: 0.4,
        strangePad2: 0.4,
        didgeridoo: 0.4,
        bigDrumSwells: 0.4,
        slowDeepBowsDrone: 0.6,
        lowGrowl: 0.6,
        subDrone: 0.4,
        creepyBends1: 0.4,
        creepyBends2: 0.4,
        whispers: 0.4,
        hornDidgeridooTension: 0.4
      }
    },
    fogboundCaverns: {
      label: "Fogbound Caverns",
      layers: {
        fallingStrings: 0.3,
        femaleChoirSecondMelodyWarped2: 0.3,
        femaleChoirSecondMelodyWarped1: 0.3,
        risingBows: 0.3,
        fallingSynth: 0.3,
        darkBreathing: 0.3,
        lowGrowl: 0.5,
        whispers: 0.2,
        deepDrumDrone: 0.5,
        subDrone: 0.5,
        slowDeepBowsDrone: 0.6,
        hauntingVoice: 0.5,
        femaleChoirLongSwell: 0.4
      }
    },
    fogboundCavernsTension: {
      label: "Fogbound Caverns Tension",
      layers: {
        bigDrumSwells: 0.4,
        deepDrumDrone: 0.5,
        creepyBends1: 0.3,
        creepyBends2: 0.3,
        creepyChoirSwell: 0.5,
        creepySwell1: 0.5,
        creepySwell2: 0.5,
        femaleChoirLongSwell: 0.5,
        hauntingVoice: 0.5,
        lowGrowl: 0.7,
        slowDeepBowsDrone: 0.7,
        subDrone: 0.5,
        whispers: 0.5,
        femaleChoirSecondMelodyWarped2: 0.3,
        femaleChoirSecondMelodyWarped1: 0.3,
        darkBreathing: 0.3
      }
    },
    ancientGiants: {
      label: "Ancient Giants",
      layers: {
        throatSingingLow: 0.8,
        throatSingingHigh: 0.8,
        tonalReverses: 0.6,
        hornChordSwells: 0.6,
        lowBrassChordSwells: 0.6,
        stringsChordSwells: 0.6,
        flutesChordSwells: 0.6,
        bigDrumSwells: 0.6,
        darkBreathing: 0.3,
        deepDrumDrone: 0.5,
        hornDidgeridooTension: 0.4,
        lowGrowl: 0.7,
        slowDeepBowsDrone: 0.7,
        subDrone: 0.5
      }
    },
    ancientGiantsTension: {
      label: "Ancient Giants Tension",
      layers: {
        throatSingingLow: 0.8,
        throatSingingHigh: 0.8,
        tonalReverses: 0.6,
        lowStringsShepardTone: 0.9,
        lowSynthShepardTone: 0.9,
        highSynthShepardTone: 0.9,
        bigDrumSwells: 0.6,
        darkBreathing: 0.3,
        deepDrumDrone: 0.5,
        hornDidgeridooTension: 0.6,
        lowGrowl: 0.7,
        slowDeepBowsDrone: 0.7,
        subDrone: 0.5
      }
    },
    genericDungeon: {
      label: "Dungeon Calm",
      layers: {
        slowDeepBowsDrone: 0.6,
        deepDrumDrone: 0.5,
        strangePad1: 0.4,
        ambientPad: 0.4,
        strangePad2: 0.4,
        bigDrumSwells: 0.3,
        lowGrowl: 0.6,
        subDrone: 0.5,
        fallingStrings: 0.3,
        risingBows: 0.3,
        fallingSynth: 0.3,
        tonalReverses: 0.3
      }
    },
    genericDungeonTension: {
      label: "Dungeon Tension",
      layers: {
        slowDeepBowsDrone: 0.7,
        deepDrumDrone: 0.5,
        subDrone: 0.5,
        bigDrumSwells: 0.4,
        lowGrowl: 0.7,
        creepySwell1: 0.5,
        creepySwell2: 0.5,
        creepyChoirSwell: 0.5,
        whispers: 0.4,
        darkBreathing: 0.3,
        hornDidgeridooTension: 0.5,
        creepyBends1: 0.4,
        creepyBends2: 0.4,
        tonalReverses: 0.3
      }
    }
  }
};var oozeCombat = {
  id: "oozeCombat",
  label: "Ooze Combat",
  type: "music",
  src: "music/ooze-combat",
  timing: {
    bpm: 120,
    bars: 8,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "main",
      interval: 8,
      fadeIn: 0.3,
      fadeOut: 0.5,
      randomLayers: {min: 4, max: 8}
    },


    //    {
    //      id: "bass",
    //      interval: 16,
    //      fadeIn: 0.1,
    //      fadeOut: 3,
    //      randomLayers: {min: 1, max: 2},
    //    },
    //    {
    //      id: "ostinato",
    //      interval: 8,
    //      fadeIn: 0.1,
    //      fadeOut: 3,
    //      randomLayers: {min: 0, max: 3},
    //    },
    {
      id: "percussion",
      interval: 8,
      fadeIn: 0.3,
      fadeOut: 0.5,
      randomLayers: {min: 2, max: 4}
    }
  ],
  segments: {
    bassFlute: { src: "bass-flute.ogg", group: "main" },
    clarinet1: { src: "clarinet-1.ogg", group: "main" },
    clarinet2: { src: "clarinet-2.ogg", group: "main" },
    colLegnoStrings2: { src: "col-legno-strings-2.ogg", group: "main" },
    colLegnoStrings: { src: "col-legno-strings.ogg", group: "main" },
    cymbal: { src: "cymbal.ogg", group: "percussion" },
    deepDrums1: { src: "deep-drums-1.ogg", group: "percussion" },
    deepDrums2: { src: "deep-drums-2.ogg", group: "percussion" },
    deepDrums3: { src: "deep-drums-3.ogg", group: "percussion" },
    deepSynthSwell: { src: "deep-synth-swell.ogg", group: "main" },
    digeridoo2: { src: "digeridoo-2.ogg", group: "main" },
    digeridoo: { src: "digeridoo.ogg", group: "main" },
    distortedPizzicato: { src: "distorted-pizzicato.ogg", group: "main" },
    doubleReedsBend: { src: "double-reeds-bend.ogg", group: "main" },
    dropletSynthBends: { src: "droplet-synth-bends.ogg", group: "main" },
    fastPercussion: { src: "fast-percussion.ogg", group: "percussion" },
    gongDrum: { src: "gong-drum.ogg", group: "percussion" },
    highStringsCountermelody: { src: "high-strings-countermelody.ogg", group: "main" },
    highStringsMelody2: { src: "high-strings-melody-2.ogg", group: "main" },
    highWoodwindsCountermelody: { src: "high-woodwinds-countermelody.ogg", group: "main" },
    highWoodwindsMelody2: { src: "high-woodwinds-melody-2.ogg", group: "main" },
    lowBrassFallAndRise1: { src: "low-brass-fall-and-rise-1.ogg", group: "main" },
    lowBrassFallAndRise2: { src: "low-brass-fall-and-rise-2.ogg", group: "main" },
    lowPiano: { src: "low-piano.ogg", group: "main" },
    lowStringsCountermelody: { src: "low-strings-countermelody.ogg", group: "main" },
    lowStringsFallAndRise1: { src: "low-strings-fall-and-rise-1.ogg", group: "main" },
    lowStringsFallAndRise2: { src: "low-strings-fall-and-rise-2.ogg", group: "main" },
    lowStringsBass: { src: "low-strings-melody-2.ogg", group: "main" },
    lowWoodwindBends: { src: "low-woodwind-bends.ogg", group: "main" },
    lowWoodwindsCountermelody: { src: "low-woodwinds-countermelody.ogg", group: "main" },
    lowWoodwindsBass: { src: "low-woodwinds-melody-2.ogg", group: "main" },
    marimba2: { src: "marimba-2.ogg", group: "main" },
    marimbaMelody: { src: "marimba-melody.ogg", group: "main" },
    oscillatingBrass1: { src: "oscillating-brass-1.ogg", group: "main" },
    oscillatingWoodwinds1: { src: "oscillating-woodwinds-1.ogg", group: "main" },
    oscillatingWoodwinds2: { src: "oscillating-woodwinds-2.ogg", group: "main" },
    pizzicatoCello: { src: "pizzicato-cello.ogg", group: "main" },
    romanPercussion: { src: "roman-percussion.ogg", group: "main" },
    steelDrum: { src: "steel-drum.ogg", group: "percussion" },
    synthPluckMelody1: { src: "synth-pluck-melody-1.ogg", group: "main" },
    synthPluckMelody2: { src: "synth-pluck-melody-2.ogg", group: "main" },
    synthPluckMelody3: { src: "synth-pluck-melody-3.ogg", group: "main" },
    synthPluckMelody4: { src: "synth-pluck-melody-4.ogg", group: "main" },
    tabla: { src: "tabla.ogg", group: "percussion" },
    tombak: { src: "tombak.ogg", group: "percussion" },
    tremoloStringsBend2: { src: "tremolo-strings-bend-2.ogg", group: "main" },
    tremoloStringsBend3: { src: "tremolo-strings-bend-3.ogg", group: "main" },
    tremoloStringsBend: { src: "tremolo-strings-bend.ogg", group: "main" },
    warHorn: { src: "war-horn.ogg", group: "main" },
    waterRhythm1: { src: "water-rhythm-1.ogg", group: "percussion" },
    waterRhythm2: { src: "water-rhythm-2.ogg", group: "percussion" },
    waterRhythm3: { src: "water-rhythm-3.ogg", group: "percussion" },
    waterphone: { src: "waterphone.ogg", group: "main" },
    weirdSynthMelody: { src: "weird-synth-melody.ogg", group: "main" },
    wobblySynthBend: { src: "wobbly-synth-bend.ogg", group: "main" },
    woodwindEchoOstinato: { src: "woodwind-echo-ostinato.ogg", group: "main" }
  },
  arrangements: {
    weird: {
      label: "Ooze Fight - Weird",
      layers: {
        bassFlute: 0.5,
        clarinet1: 0.5,
        clarinet2: 0.5,
        colLegnoStrings: 0.5,
        cymbal: 0.5,
        digeridoo: 0.5,
        distortedPizzicato: 0.5,
        doubleReedsBend: 0.5,
        dropletSynthBends: 0.5,
        fastPercussion: 0.5,
        gongDrum: 0.5,
        highStringsCountermelody: 0.7,
        highWoodwindsCountermelody: 0.7,
        lowBrassFallAndRise1: 0.5,
        lowBrassFallAndRise2: 0.5,
        lowStringsCountermelody: 0.7,
        lowStringsFallAndRise1: 0.5,
        lowStringsFallAndRise2: 0.5,
        lowWoodwindBends: 0.5,
        lowWoodwindsCountermelody: 0.7,
        marimbaMelody: 0.5,
        romanPercussion: 0.5,
        synthPluckMelody1: 0.5,
        synthPluckMelody2: 0.5,
        tabla: 0.5,
        tombak: 0.5,
        tremoloStringsBend2: 0.5,
        tremoloStringsBend: 0.5,
        waterRhythm1: 0.5,
        waterRhythm2: 0.5,
        waterRhythm3: 0.5,
        weirdSynthMelody: 0.5,
        wobblySynthBend: 0.5
      }
    },
    dramatic: {
      label: "Ooze Fight - Dramatic",
      layers: {
        colLegnoStrings2: 0.5,
        deepDrums1: 0.5,
        deepDrums2: 0.5,
        deepDrums3: 0.5,
        deepSynthSwell: 0.5,
        digeridoo2: 0.5,
        highStringsMelody2: 0.6,
        highWoodwindsMelody2: 0.6,
        lowPiano: 0.5,
        lowStringsBass: 0.6,
        lowWoodwindsBass: 0.6,
        marimba2: 0.5,
        oscillatingBrass1: 0.5,
        oscillatingWoodwinds1: 0.5,
        oscillatingWoodwinds2: 0.5,
        pizzicatoCello: 0.5,
        steelDrum: 0.5,
        synthPluckMelody3: 0.5,
        synthPluckMelody4: 0.5,
        tremoloStringsBend3: 0.5,
        warHorn: 0.5,
        waterphone: 0.5,
        woodwindEchoOstinato: 0.5,
        cymbal: 0.5,
        fastPercussion: 0.5,
        gongDrum: 0.5,
        romanPercussion: 0.5,
        tabla: 0.5,
        tombak: 0.5,
        waterRhythm1: 0.5,
        waterRhythm2: 0.5,
        waterRhythm3: 0.5
      }
    }
  }
};var ordain$1 = {
  id: "ordain",
  label: "Ordain",
  type: "music",
  src: "music/ordain",
  timing: {
    bpm: 145,
    bars: 32,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 2,
      fadeOut: 4,
      randomLayers: {min: 4, max: 8}
    }
  ],
  segments: {
    gitternStrums: {src: "gittern-strums.ogg"},
    deepBass: {src: "deep-bass.ogg"},
    cymbal: {src: "cymbal.ogg"},
    celloPhrase: {src: "cello-phrase.ogg"},
    bigDrumSwell: {src: "big-drum-swell.ogg"},
    violinsMelody: {src: "violins-melody.ogg"},
    violaCelloMelody: {src: "viola-cello-melody.ogg"},
    trumpetOstinato: {src: "trumpet-ostinato.ogg"},
    timpani: {src: "timpani.ogg"},
    repeatingStringsMid: {src: "repeating-strings-mid.ogg"},
    repeatingStringsHigh: {src: "repeating-strings-high.ogg"},
    mysticalPlucksMelody: {src: "mystical-plucks-melody.ogg"},
    mysticalFluteMelody: {src: "mystical-flute-melody.ogg"},
    midShimmeringStrings: {src: "mid-shimmering-strings.ogg"},
    hornsMelody: {src: "horns-melody.ogg"},
    highShimmeringStrings: {src: "high-shimmering-strings.ogg"},
    fiddleGroove: {src: "fiddle-groove.ogg"},
    fastPercussion2: {src: "fast-percussion-2.ogg"},
    fastPercussion1: {src: "fast-percussion-1.ogg"},
    lowPercussion1: {src: "low-percussion-1.ogg"},
    hugeDrumsRight: {src: "huge-drums-right.ogg"},
    hugeDrumsLeft: {src: "huge-drums-left.ogg"},
    highPercussion2: {src: "high-percussion-2.ogg"},
    highPercussion1: {src: "high-percussion-1.ogg"},
    bigDrumsRight: {src: "big-drums-right.ogg"},
    woodwindArp2: {src: "woodwind-arp-2.ogg"},
    woodwindArp1: {src: "woodwind-arp-1.ogg"},
    stringsArp2: {src: "strings-arp-2.ogg"},
    stringsArp1: {src: "strings-arp-1.ogg"},
    stickDrumsLeft: {src: "stick-drums-left.ogg"},
    bangdiMelody: {src: "bangdi-melody.ogg"},
    cimbalon: {src: "cimbalon.ogg"},
    highRecorderMelody: {src: "high-recorder-melody.ogg"},
    pluckedMelody1: {src: "plucked-melody-1.ogg"},
    pluckedMelody2: {src: "plucked-melody-2.ogg"},
    recorderChords: {src: "recorder-chords.ogg"},
    tangelharpaBassline: {src: "tangelharpa-bassline.ogg"},
    repeatingStringBowedPattern: {src: "repeating-string-bowed-pattern.ogg"},
    stacattoBassline: {src: "stacatto-bassline.ogg"},
    risingChords: {src: "rising-chords.ogg"},
    childrensChoirRising: {src: "childrens-choir-rising.ogg"},
    childrensChoirStatic: {src: "childrens-choir-static.ogg"},
    bassoContinuoLongBassline: {src: "basso-continuo-long-bassline.ogg"},
    bassoContinuoShortBassline: {src: "basso-continuo-short-bassline.ogg"},
    fluteOboeShorterMelody1: {src: "flute-oboe-shorter-melody-1.ogg"},
    fluteOboeShorterMelody2: {src: "flute-oboe-shorter-melody-2.ogg"},
    fluteShortTrills: {src: "flute-short-trills.ogg"},
    harpArpeggio: {src: "harp-arpeggio.ogg"},
    harpsichord: {src: "harpsichord.ogg"},
    highStringTrillsTremolo1: {src: "high-string-trills-tremolo-1.ogg"},
    highStringTrillsTremolo2: {src: "high-string-trills-tremolo-2.ogg"},
    lowStringsShortBassline: {src: "low-strings-short-bassline.ogg"},
    violaShorterMelody: {src: "viola-shorter-melody.ogg"},
    violDaGamba1: {src: "viol-da-gamba-1.ogg"},
    violDaGamba2: {src: "viol-da-gamba-2.ogg"},
    violinShorterMelody: {src: "violin-shorter-melody.ogg"},
    dulcimerCountermelody1: {src: "dulcimer-countermelody-1.ogg"},
    dulcimerCountermelody2: {src: "dulcimer-countermelody-2.ogg"},
    yangqinCountermelody: {src: "yangqin-countermelody.ogg"},
    mountainDulcimerCountermelody: {src: "mountain-dulcimer-countermelody.ogg"},
    tremoloPluckedStringsPad: {src: "tremolo-plucked-strings-pad.ogg"},
    tremoloPluckedStrings: {src: "tremolo-plucked-strings.ogg"},
    softBrassPad: {src: "soft-brass-pad.ogg"},
    floatingChoirPad: {src: "floating-choir-pad.ogg"},
    spookyStringRepetitions: {src: "spooky-string-repetitions.ogg"},
    soloViolinTensionMelody2: {src: "solo-violin-tension-melody-2.ogg"},
    soloViolinTensionMelody1: {src: "solo-violin-tension-melody-1.ogg"},
    dulcimerTensionMelody: {src: "dulcimer-tension-melody.ogg"},
    dulcimerTensionCountermelody: {src: "dulcimer-tension-countermelody.ogg"},
    deepPianoRepetitions: {src: "deep-piano-repetitions.ogg"},
    darkPianoHits: {src: "dark-piano-hits.ogg"},
    harpsichordStaccatoFx: {src: "harpsichord-staccato-fx.ogg"},
    heartbeatTension: {src: "heartbeat-tension.ogg"},
    deepCelloRhythm: {src: "deep-cello-rhythm.ogg"},
    tremoloScary: {src: "tremolo-scary.ogg"},
    tubaSwells: {src: "tuba-swells.ogg"},
    churchOrganTension: {src: "church-organ-tension.ogg"},
    fastViolinChordsTension: {src: "fast-violin-chords-tension.ogg"},
    recorderSwellsTension: {src: "recorder-swells-tension.ogg"},
    darkRepeatingDoublebass: {src: "dark-repeating-doublebass.ogg"},
    dulcimerChordsTension: {src: "dulcimer-chords-tension.ogg"},
    hurdyGurdyViolinMelodyTension: {src: "hurdy-gurdy-violin-melody-tension.ogg"},
    luteHarmonicsMelodyTension: {src: "lute-harmonics-melody-tension.ogg"},
    luteMelodyTension: {src: "lute-melody-tension.ogg"},
    atonalCelloStaccato: {src: "atonal-cello-staccato.ogg"},
    dulcimerDocksMelodyTension: {src: "dulcimer-docks-melody-tension.ogg"},
    stringSwellsTension: {src: "string-swells-tension.ogg"},
    repeatingStringBowedPatternTension1: {src: "repeating-string-bowed-pattern-tension-1.ogg"},
    repeatingStringBowedPatternTension2: {src: "repeating-string-bowed-pattern-tension-2.ogg"},
    dulcimerCountermelodyTension1: {src: "dulcimer-countermelody-tension-1.ogg"},
    pluckedMotifTension1: {src: "plucked-motif-tension-1.ogg"},
    soloViolinMelodyTension1: {src: "solo-violin-melody-tension-1.ogg"},
    frenchHornMelodyTension1: {src: "french-horn-melody-tension-1.ogg"},
    pluckedMotifTension2: {src: "plucked-motif-tension-2.ogg"}
  },
  arrangements: {
    ordain: {
      label: "Ordain",
      layers: {
        gitternStrums: 0.6,
        deepBass: 0.6,
        cymbal: 0.6,
        celloPhrase: 0.6,
        bigDrumSwell: 0.6,
        violinsMelody: 0.6,
        violaCelloMelody: 0.6,
        trumpetOstinato: 0.6,
        timpani: 0.6,
        repeatingStringsMid: 0.3,
        repeatingStringsHigh: 0.3,
        mysticalPlucksMelody: 0.6,
        mysticalFluteMelody: 0.6,
        midShimmeringStrings: 0.6,
        hornsMelody: 0.6,
        highShimmeringStrings: 0.6,
        fiddleGroove: 0.6,
        fastPercussion2: 0.6,
        fastPercussion1: 0.6,
        lowPercussion1: 0.6,
        hugeDrumsRight: 0.4,
        hugeDrumsLeft: 0.4,
        highPercussion2: 0.6,
        highPercussion1: 0.6,
        bigDrumsRight: 0.6,
        woodwindArp2: 0.4,
        woodwindArp1: 0.4,
        stringsArp2: 0.4,
        stringsArp1: 0.4,
        stickDrumsLeft: 0.6
      }
    },
    ordainDocksDay: {
      label: "Ordain Docks Day",
      layers: {
        bangdiMelody: 0.6,
        cimbalon: 0.6,
        highRecorderMelody: 0.6,
        pluckedMelody1: 0.6,
        pluckedMelody2: 0.6,
        recorderChords: 0.6,
        tangelharpaBassline: 0.6,
        fiddleGroove: 0.4,
        gitternStrums: 0.6,
        highPercussion1: 0.6,
        highPercussion2: 0.6,
        lowPercussion1: 0.6,
        stickDrumsLeft: 0.6,
        stringsArp1: 0.4,
        stringsArp2: 0.4,
        timpani: 0.5,
        highShimmeringStrings: 0.3,
        repeatingStringBowedPattern: 0.6,
        stacattoBassline: 0.6
      }
    },
    ordainDocksNight: {
      label: "Ordain Docks Night",
      layers: {
        tremoloPluckedStringsPad: 0.6,
        tremoloPluckedStrings: 0.6,
        mysticalFluteMelody: 0.5,
        mysticalPlucksMelody: 0.5,
        highShimmeringStrings: 0.4,
        midShimmeringStrings: 0.6,
        highRecorderMelody: 0.2,
        pluckedMelody1: 0.5,
        pluckedMelody2: 0.6,
        recorderChords: 0.5,
        bangdiMelody: 0.5,
        cimbalon: 0.6
      }
    },
    ordainDocksTension: {
      label: "Ordain Docks Tension",
      layers: {
        fastViolinChordsTension: 0.2,
        recorderSwellsTension: 0.2,
        darkRepeatingDoublebass: 0.2,
        dulcimerChordsTension: 0.3,
        hurdyGurdyViolinMelodyTension: 0.15,
        luteHarmonicsMelodyTension: 0.2,
        luteMelodyTension: 0.15,
        atonalCelloStaccato: 0.2,
        dulcimerDocksMelodyTension: 0.2,
        stringSwellsTension: 0.2,
        highPercussion1: 0.6,
        highPercussion2: 0.6,
        lowPercussion1: 0.6,
        stickDrumsLeft: 0.3,
        timpani: 0.3,
        heartbeatTension: 0.6,
        spookyStringRepetitions: 0.6,
        tremoloScary: 0.6,
        tubaSwells: 0.2,
        darkPianoHits: 0.6,
        deepCelloRhythm: 0.6,
        tangelharpaBassline: 0.6,
        repeatingStringBowedPatternTension1: 0.2,
        repeatingStringBowedPatternTension2: 0.2
      }
    },
    ordainSpiresDay: {
      label: "Ordain Spires Day",
      layers: {
        deepBass: 0.6,
        cymbal: 0.6,
        celloPhrase: 0.6,
        bigDrumSwell: 0.3,
        violinsMelody: 0.6,
        violaCelloMelody: 0.6,
        trumpetOstinato: 0.6,
        timpani: 0.3,
        repeatingStringsMid: 0.3,
        repeatingStringsHigh: 0.3,
        midShimmeringStrings: 0.6,
        hornsMelody: 0.6,
        highShimmeringStrings: 0.6,
        woodwindArp2: 0.4,
        woodwindArp1: 0.4,
        stringsArp2: 0.4,
        stringsArp1: 0.4,
        childrensChoirRising: 0.4,
        childrensChoirStatic: 0.4,
        bassoContinuoLongBassline: 0.5,
        bassoContinuoShortBassline: 0.3,
        fluteOboeShorterMelody1: 0.5,
        fluteOboeShorterMelody2: 0.5,
        fluteShortTrills: 0.5,
        harpArpeggio: 0.5,
        harpsichord: 0.4,
        highStringTrillsTremolo1: 0.5,
        highStringTrillsTremolo2: 0.5,
        lowStringsShortBassline: 0.5,
        violaShorterMelody: 0.5,
        violDaGamba1: 0.5,
        violDaGamba2: 0.5,
        violinShorterMelody: 0.5
      }
    },
    ordainSpiresTension: {
      label: "Ordain Spires Tension",
      layers: {
        deepBass: 0.6,
        timpani: 0.3,
        violDaGamba1: 0.5,
        childrensChoirStatic: 0.4,
        soloViolinTensionMelody1: 0.3,
        soloViolinTensionMelody2: 0.3,
        deepPianoRepetitions: 0.6,
        spookyStringRepetitions: 0.6,
        darkPianoHits: 0.6,
        dulcimerTensionCountermelody: 0.6,
        dulcimerTensionMelody: 0.6,
        harpsichordStaccatoFx: 0.6,
        heartbeatTension: 0.6,
        deepCelloRhythm: 0.6,
        tremoloScary: 0.6,
        tubaSwells: 0.6,
        churchOrganTension: 0.6
      }
    },
    ordainSpiresNight: {
      label: "Ordain Spires Night",
      layers: {
        hornsMelody: 0.3,
        highShimmeringStrings: 0.4,
        deepBass: 0.4,
        mysticalFluteMelody: 0.5,
        midShimmeringStrings: 0.6,
        highStringTrillsTremolo1: 0.3,
        highStringTrillsTremolo2: 0.3,
        mysticalPlucksMelody: 0.5,
        childrensChoirRising: 0.4,
        childrensChoirStatic: 0.4,
        violinsMelody: 0.5,
        violaCelloMelody: 0.5,
        violinShorterMelody: 0.5,
        violaShorterMelody: 0.5,
        bassoContinuoLongBassline: 0.5,
        fluteOboeShorterMelody1: 0.4,
        fluteOboeShorterMelody2: 0.4,
        harpArpeggio: 0.5,
        harpsichord: 0.4,
        floatingChoirPad: 0.6
      }
    },
    ordainFlatsDay: {
      label: "Ordain Flats Day",
      layers: {
        violaCelloMelody: 1.0,
        violinsMelody: 0.6,
        hornsMelody: 0.6,
        trumpetOstinato: 0.6,
        woodwindArp1: 0.4,
        woodwindArp2: 0.4,
        stringsArp1: 0.4,
        stringsArp2: 0.4,
        timpani: 0.4,
        stickDrumsLeft: 0.4,
        hugeDrumsLeft: 0.2,
        hugeDrumsRight: 0.2,
        lowPercussion1: 0.3,
        fastPercussion1: 0.2,
        fastPercussion2: 0.2,
        repeatingStringsMid: 0.5,
        highShimmeringStrings: 0.4,
        highStringTrillsTremolo1: 0.3,
        highStringTrillsTremolo2: 0.3,
        deepBass: 0.6,
        tangelharpaBassline: 0.6,
        cymbal: 0.6,
        gitternStrums: 0.5,
        dulcimerCountermelody1: 0.6,
        dulcimerCountermelody2: 0.6,
        yangqinCountermelody: 0.6,
        mountainDulcimerCountermelody: 0.6
      }
    },
    ordainFlatsNight: {
      label: "Ordain Flats Night",
      layers: {
        hornsMelody: 0.3,
        highShimmeringStrings: 0.4,
        deepBass: 0.6,
        gitternStrums: 0.3,
        dulcimerCountermelody1: 0.4,
        dulcimerCountermelody2: 0.4,
        yangqinCountermelody: 0.4,
        mountainDulcimerCountermelody: 0.4,
        tremoloPluckedStringsPad: 0.6,
        tremoloPluckedStrings: 0.6,
        softBrassPad: 0.6,
        mysticalFluteMelody: 0.5,
        midShimmeringStrings: 0.6,
        highStringTrillsTremolo1: 0.3,
        highStringTrillsTremolo2: 0.3,
        mysticalPlucksMelody: 0.5
      }
    },
    ordainFlatsTension: {
      label: "Ordain Flats Tension",
      layers: {
        atonalCelloStaccato: 0.2,
        stringSwellsTension: 0.2,
        darkRepeatingDoublebass: 0.2,
        fastViolinChordsTension: 0.2,
        cymbal: 0.6,
        tangelharpaBassline: 0.6,
        fastPercussion1: 0.2,
        fastPercussion2: 0.2,
        timpani: 0.4,
        dulcimerCountermelodyTension1: 0.3,
        pluckedMotifTension1: 0.4,
        soloViolinMelodyTension1: 0.4,
        frenchHornMelodyTension1: 0.4,
        pluckedMotifTension2: 0.4,
        deepCelloRhythm: 0.6,
        tubaSwells: 0.2,
        heartbeatTension: 0.6,
        darkPianoHits: 0.6,
        spookyStringRepetitions: 0.6
      }
    }
  }
};var ordaniFolk = {
  id: "ordaniFolk",
  label: "Ordani Folk",
  type: "music",
  src: "music/ordani-folk",
  timing: {
    bpm: 135,
    bars: 12,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 12,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 5, max: 7}
    }
  ],
  segments: {
    bassOboeOctaveRips: {src: "bass-oboe-octave-rips.ogg"},
    bassoContinuo: {src: "basso-continuo.ogg"},
    bassoonHorn: {src: "bassoon-horn.ogg"},
    dunun: {src: "dunun.ogg"},
    fluteShortTrills: {src: "flute-short-trills.ogg"},
    harp: {src: "harp.ogg"},
    harpArpeggio: {src: "harp-arpeggio.ogg"},
    harpsichord1: {src: "harpsichord-1.ogg"},
    harpsichord2: {src: "harpsichord-2.ogg"},
    harpsichord3: {src: "harpsichord-3.ogg"},
    highStrings: {src: "high-strings.ogg"},
    highStringTrillsTremolo1: {src: "high-string-trills-tremolo-1.ogg"},
    highStringTrillsTremolo2: {src: "high-string-trills-tremolo-2.ogg"},
    huaPenGu: {src: "hua-pen-gu.ogg"},
    lowPizzicato: {src: "low-pizzicato.ogg"},
    lowStrings: {src: "low-strings.ogg"},
    mallets: {src: "mallets.ogg"},
    midStrings: {src: "mid-strings.ogg"},
    recorder1: {src: "recorder-1.ogg"},
    recorder2: {src: "recorder-2.ogg"},
    stringShortTrills: {src: "string-short-trills.ogg"},
    tangelharpa: {src: "tangelharpa.ogg"},
    triangle: {src: "triangle.ogg"},
    violDaGamba1: {src: "viol-da-gamba-1.ogg"},
    violDaGamba2: {src: "viol-da-gamba-2.ogg"},
    sticks: {src: "sticks.ogg"},
    fluteOboeMelody1: {src: "flute-oboe-melody-1.ogg"},
    fluteOboeMelody2: {src: "flute-oboe-melody-2.ogg"},
    violaMelody: {src: "viola-melody.ogg"},
    violinMelody: {src: "violin-melody.ogg"},
    celloMelody: {src: "cello-melody.ogg"},
    horn: {src: "horn.ogg"}
  },
  arrangements: {
    ordainFolk: {
      label: "Ordain Folk",
      layers: {
        bassOboeOctaveRips: 0.4,
        bassoContinuo: 0.4,
        bassoonHorn: 0.4,
        dunun: 0.4,
        fluteShortTrills: 0.4,
        harp: 0.6,
        harpArpeggio: 0.5,
        harpsichord1: 0.4,
        harpsichord2: 0.4,
        harpsichord3: 0.4,
        highStrings: 0.4,
        highStringTrillsTremolo1: 0.4,
        highStringTrillsTremolo2: 0.4,
        huaPenGu: 0.4,
        lowPizzicato: 0.4,
        lowStrings: 0.4,
        mallets: 0.4,
        midStrings: 0.4,
        recorder1: 0.4,
        recorder2: 0.4,
        stringShortTrills: 0.4,
        tangelharpa: 0.4,
        triangle: 0.4,
        violDaGamba1: 0.4,
        violDaGamba2: 0.4,
        sticks: 0.4,
        fluteOboeMelody1: 0.4,
        fluteOboeMelody2: 0.4,
        violaMelody: 0.4,
        violinMelody: 0.4,
        celloMelody: 0.4,
        horn: 0.3
      }
    }
  }
};var pirateCombat = {
  id: "pirateCombat",
  label: "Pirate Combat",
  type: "music",
  src: "music/pirate-combat",
  timing: {
    bpm: 146,
    bars: 16,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 32
    },
    {
      id: "transitions",
      interval: 16,
      fadeIn: 0.3,
      fadeOut: 1,
      randomLayers: {min: 1, max: 1}
    },
    {
      id: "percussion",
      interval: 8,
      fadeIn: 0.3,
      fadeOut: 1,
      randomLayers: {min: 2, max: 6}
    },
    {
      id: "main",
      interval: 16,
      fadeIn: 0.3,
      fadeOut: 1,
      randomLayers: {min: 2, max: 6}
    }
  ],
  segments: {
    bumbacSection1: {src: "bumbac-section-1.ogg", group: "percussion"},
    bumbacSection2: {src: "bumbac-section-2.ogg", group: "percussion"},
    bumbacSection3: {src: "bumbac-section-3.ogg", group: "percussion"},
    darbukasSection1: {src: "darbukas-section-1.ogg", group: "percussion"},
    darbukasSection2: {src: "darbukas-section-2.ogg", group: "percussion"},
    darbukasSection3: {src: "darbukas-section-3.ogg", group: "percussion"},
    djembe1Section1: {src: "djembe-1-section-1.ogg", group: "percussion"},
    djembe1Section2: {src: "djembe-1-section-2.ogg", group: "percussion"},
    djembe1Section3: {src: "djembe-1-section-3.ogg", group: "percussion"},
    djembe2Section1: {src: "djembe-2-section-1.ogg", group: "percussion"},
    djembe2Section2: {src: "djembe-2-section-2.ogg", group: "percussion"},
    djembe2Section3: {src: "djembe-2-section-3.ogg", group: "percussion"},
    dulcimerSection1: {src: "dulcimer-section-1.ogg", group: "main"},
    dulcimerSection2: {src: "dulcimer-section-2.ogg", group: "main"},
    dulcimerSection3: {src: "dulcimer-section-3.ogg", group: "main"},
    dununbaSection1: {src: "dununba-section-1.ogg", group: "percussion"},
    dununbaSection2: {src: "dununba-section-2.ogg", group: "percussion"},
    dununbaSection3: {src: "dununba-section-3.ogg", group: "percussion"},
    frameDrumSection1: {src: "frame-drum-section-1.ogg", group: "percussion"},
    frameDrumSection2: {src: "frame-drum-section-2.ogg", group: "percussion"},
    frameDrumSection3: {src: "frame-drum-section-3.ogg", group: "percussion"},
    guitarPercussionSection123: {src: "guitar-percussion-section-1-2-3.ogg", group: "percussion"},
    guitarSection1: {src: "guitar-section-1.ogg", group: "main"},
    guitarSection2: {src: "guitar-section-2.ogg", group: "main"},
    guitarSection3: {src: "guitar-section-3.ogg", group: "main"},
    highBrassSection2: {src: "high-brass-section-2.ogg", group: "main"},
    highBrassSection3: {src: "high-brass-section-3.ogg", group: "main"},
    highStringsSection1: {src: "high-strings-section-1.ogg", group: "main"},
    highStringsSection2: {src: "high-strings-section-2.ogg", group: "main"},
    highStringsSection3: {src: "high-strings-section-3.ogg", group: "main"},
    kenkeniSection1: {src: "kenkeni-section-1.ogg", group: "percussion"},
    kenkeniSection2: {src: "kenkeni-section-2.ogg", group: "percussion"},
    kenkeniSection3: {src: "kenkeni-section-3.ogg", group: "percussion"},
    lowBrassSection2: {src: "low-brass-section-2.ogg", group: "main"},
    lowBrassSection3: {src: "low-brass-section-3.ogg", group: "main"},
    lowStringsSection1: {src: "low-strings-section-1.ogg", group: "main"},
    lowStringsSection2: {src: "low-strings-section-2.ogg", group: "main"},
    lowStringsSection3: {src: "low-strings-section-3.ogg", group: "main"},
    lowWoodwindSection1: {src: "low-woodwind-rhythm-section-1.ogg", group: "main"},
    lowWoodwindSection3: {src: "low-woodwind-rhythm-section-3.ogg", group: "main"},
    midBrassSection2: {src: "mid-brass-section-2.ogg", group: "main"},
    midBrassSection3: {src: "mid-brass-section-3.ogg", group: "main"},
    midStringsSection1: {src: "mid-strings-section-1.ogg", group: "main"},
    midStringsSection2: {src: "mid-strings-section-2.ogg", group: "main"},
    midStringsSection3: {src: "mid-strings-section-3.ogg", group: "main"},
    mountainDulcimerSection1: {src: "mountain-dulcimer-rhythm-section-1.ogg", group: "main"},
    mountainDulcimerSection2: {src: "mountain-dulcimer-rhythm-section-2.ogg", group: "main"},
    mountainDulcimerSection3: {src: "mountain-dulcimer-rhythm-section-3.ogg", group: "main"},
    pizzicatoBassSection1: {src: "pizzicato-bass-section-1.ogg", group: "main"},
    pizzicatoBassSection2: {src: "pizzicato-bass-section-2.ogg", group: "main"},
    pizzicatoBassSection3: {src: "pizzicato-bass-section-3.ogg", group: "main"},
    sangbaSection1: {src: "sangba-section-1.ogg", group: "percussion"},
    sangbaSection2: {src: "sangba-section-2.ogg", group: "percussion"},
    sangbaSection3: {src: "sangba-section-3.ogg", group: "percussion"},
    shoutsLeftSection123: {src: "shouts-left-section-1.ogg", group: "percussion"},
    shoutsRightSection1: {src: "shouts-right-section-1.ogg", group: "percussion"},
    shoutsRightSection2: {src: "shouts-right-section-2.ogg", group: "percussion"},
    smallPercussionTransitionSection1: {src: "small-percussion-transition-section-1.ogg", group: "transitions"},
    soloViolinSection1: {src: "solo-violin-section-1.ogg", group: "main"},
    sticks1Section12: {src: "sticks-1-section-1-2.ogg", group: "percussion"},
    sticks1Section3: {src: "sticks-1-section-3.ogg", group: "percussion"},
    sticks2Section123: {src: "sticks-2-section-1-2-3.ogg", group: "percussion"},
    violinLeftSection123: {src: "violin-left-section-1-2-3.ogg", group: "main"},
    violinRightSection123: {src: "violin-right-section-1-2-3.ogg", group: "main"}
  },
  arrangements: {
    banditFightVerse: {
      label: "Bandit Fight Verse",
      layers: {
        bumbacSection1: 1.0,
        darbukasSection1: 1.0,
        djembe1Section1: 1.0,
        djembe2Section1: 1.0,
        dununbaSection1: 1.0,
        frameDrumSection1: 1.0,
        guitarPercussionSection123: 1.0,
        kenkeniSection1: 1.0,
        sangbaSection1: 1.0,
        shoutsLeftSection123: 1.0,
        shoutsRightSection1: 1.0,
        sticks1Section12: 1.0,
        sticks2Section123: 1.0,
        smallPercussionTransitionSection1: 1.0,
        dulcimerSection1: 1.0,
        guitarSection1: 1.0,
        highStringsSection1: 1.0,
        lowStringsSection1: 1.0,
        lowWoodwindSection1: 1.0,
        midStringsSection1: 1.0,
        mountainDulcimerSection1: 1.0,
        pizzicatoBassSection1: 1.0,
        soloViolinSection1: 1.0,
        violinLeftSection123: 1.0,
        violinRightSection123: 1.0
      }
    },
    banditFightChorus: {
      label: "Bandit Fight Chorus",
      layers: {
        bumbacSection2: 1.0,
        darbukasSection2: 1.0,
        djembe1Section2: 1.0,
        djembe2Section2: 1.0,
        dununbaSection2: 1.0,
        frameDrumSection2: 1.0,
        guitarPercussionSection123: 1.0,
        kenkeniSection2: 1.0,
        sangbaSection2: 1.0,
        sticks1Section12: 1.0,
        sticks2Section123: 1.0,
        smallPercussionTransitionSection1: 1.0,
        dulcimerSection2: 1.0,
        guitarSection2: 1.0,
        highBrassSection2: 1.0,
        highStringsSection2: 1.0,
        lowBrassSection2: 1.0,
        lowStringsSection2: 1.0,
        midBrassSection2: 1.0,
        midStringsSection2: 1.0,
        mountainDulcimerSection2: 1.0,
        pizzicatoBassSection2: 1.0,
        shoutsLeftSection123: 1.0,
        shoutsRightSection2: 1.0,
        violinLeftSection123: 1.0,
        violinRightSection123: 1.0
      }
    },
    banditFightBridge: {
      label: "Bandit Fight Bridge",
      layers: {
        bumbacSection3: 1.0,
        darbukasSection3: 1.0,
        djembe1Section3: 1.0,
        djembe2Section3: 1.0,
        dununbaSection3: 1.0,
        frameDrumSection3: 1.0,
        guitarPercussionSection123: 1.0,
        kenkeniSection3: 1.0,
        sangbaSection3: 1.0,
        sticks1Section3: 1.0,
        sticks2Section123: 1.0,
        smallPercussionTransitionSection1: 1.0,
        dulcimerSection3: 1.0,
        guitarSection3: 1.0,
        highBrassSection3: 1.0,
        highStringsSection3: 1.0,
        lowBrassSection3: 1.0,
        lowStringsSection3: 1.0,
        lowWoodwindSection3: 1.0,
        midBrassSection3: 1.0,
        midStringsSection3: 1.0,
        mountainDulcimerSection3: 1.0,
        pizzicatoBassSection3: 1.0,
        shoutsLeftSection123: 1.0,
        violinLeftSection123: 1.0,
        violinRightSection123: 1.0
      }
    }
  }
};var pitTrap$1 = {
  id: "pitTrap",
  label: "The Pit Trap",
  type: "music",
  src: "music/pit-trap",
  timing: {
    bpm: 150,
    bars: 8,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 3, max: 6}
    },
    {
      id: "beat",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 3, max: 4}
    },
    {
      id: "relaxed",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 3, max: 5}
    }
  ],
  segments: {
    bigDrum: { src: "big-drum.ogg", group: "beat"},
    celloBassline: { src: "cello-bassline.ogg" },
    doubleBassBassline: { src: "double-bass-bassline.ogg" },
    fantasyDrumKit: { src: "fantasy-drum-kit.ogg", group: "beat"},
    fastGuitar: { src: "fast-guitar.ogg" },
    folkEnsembleMelody1: { src: "folk-ensemble-melody-1.ogg" },
    folkEnsembleMelody2: { src: "folk-ensemble-melody-2.ogg" },
    highViolinRhythm: { src: "high-violin-rhythm.ogg" },
    hiHatWoods: { src: "hi-hat-woods.ogg" },
    hugeHitsAndSwells: { src: "huge-hits-and-swells.ogg", group: "beat"},
    kick: { src: "kick.ogg", group: "beat"},
    metalHit: { src: "metal-hit.ogg", group: "beat"},
    pitchyBassline: { src: "pitchy-bassline.ogg" },
    snareDrum: { src: "snare-drum.ogg", group: "beat"},
    stringPad: { src: "string-pad.ogg" },
    tangelharpaBigChords: { src: "tangelharpa-big-chords.ogg" },
    tangelharpaPhrases: { src: "tangelharpa-phrases.ogg" },
    violinLick: { src: "violin-lick.ogg" },
    zither: { src: "zither.ogg" },
    bigStringChords2: { src: "big-string-chords-2.ogg" },
    bigStringChords1: { src: "big-string-chords-1.ogg" },
    kitharaRhythm: { src: "kithara-rhythm.ogg", group: "beat" },
    midSticks: { src: "mid-sticks.ogg", group: "beat" },
    highSticks: { src: "high-sticks.ogg", group: "beat" },
    zitherMelody: { src: "zither-melody.ogg" },
    tangelharpaPhrases2: { src: "tangelharpa-phrases-2.ogg" },
    doubleBassBasslineRelaxed: { src: "double-bass-bassline.ogg", group: "relaxed" },
    fastGuitarRelaxed: { src: "fast-guitar.ogg", group: "relaxed" },
    folkEnsembleMelody1Relaxed: { src: "folk-ensemble-melody-1.ogg", group: "relaxed" },
    folkEnsembleMelody2Relaxed: { src: "folk-ensemble-melody-2.ogg", group: "relaxed" },
    stringPadRelaxed: { src: "string-pad.ogg", group: "relaxed" },
    tangelharpaPhraseRelaxed: { src: "tangelharpa-phrases.ogg", group: "relaxed" },
    tangelharpaPhrases2Relaxed: { src: "tangelharpa-phrases-2.ogg", group: "relaxed" },
    violinLickRelaxed: { src: "violin-lick.ogg", group: "relaxed" },
    zitherRelaxed: { src: "zither.ogg", group: "relaxed" },
    bigStringChords2Relaxed: { src: "big-string-chords-2.ogg", group: "relaxed" },
    bigStringChords1Relaxed: { src: "big-string-chords-1.ogg", group: "relaxed" },
    highSticksRelaxed: { src: "high-sticks.ogg", group: "relaxed" },
    kitharaRhythmRelaxed: { src: "kithara-rhythm.ogg", group: "relaxed" },
    midSticksRelaxed: { src: "mid-sticks.ogg", group: "relaxed" },
    zitherMelodyRelaxed: { src: "zither-melody.ogg", group: "relaxed" }
  },
  arrangements: {
    intense: {
      label: "The Pit Trap - Intense",
      layers: {
        bigDrum: 0.3,
        bigStringChords2: 0.48,
        bigStringChords1: 0.48,
        celloBassline: 0.3,
        doubleBassBassline: 0.3,
        fantasyDrumKit: 0.3,
        fastGuitar: 0.3,
        folkEnsembleMelody1: 0.6,
        folkEnsembleMelody2: 0.6,
        highSticks: 0.48,
        highViolinRhythm: 0.3,
        hiHatWoods: 0.3,
        // HugeHitsAndSwells: 0.3,
        kick: 0.3,
        kitharaRhythm: 0.48,
        metalHit: 0.3,
        midSticks: 0.48,
        pitchyBassline: 0.3,
        snareDrum: 0.3,
        stringPad: 0.3,
        tangelharpaBigChords: 0.3,
        tangelharpaPhrases: 0.3,
        violinLick: 0.3,
        zither: 0.3,
        zitherMelody: 0.6,
        tangelharpaPhrases2: 0.48
      }
    },
    relaxed: {
      label: "The Pit Trap - Relaxed",
      layers: {
        doubleBassBasslineRelaxed: 0.3,
        fastGuitarRelaxed: 0.3,
        folkEnsembleMelody1Relaxed: 0.3,
        folkEnsembleMelody2Relaxed: 0.3,
        stringPadRelaxed: 0.3,
        tangelharpaPhraseRelaxed: 0.2,
        tangelharpaPhrases2Relaxed: 0.24,
        violinLickRelaxed: 0.3,
        zitherRelaxed: 0.3,
        bigStringChords2Relaxed: 0.3,
        bigStringChords1Relaxed: 0.3,
        highSticksRelaxed: 0.24,
        kitharaRhythmRelaxed: 0.48,
        midSticksRelaxed: 0.24,
        zitherMelodyRelaxed: 0.5
      }
    }
  }
};var raiderCombat = {
  id: "raiderCombat",
  label: "Raider Combat",
  type: "music",
  src: "music/raider-combat",
  timing: {
    bpm: 140,
    bars: 16,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "melody",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 0, max: 4}
    },
    {
      id: "bass",
      interval: 16,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 1, max: 2}
    },
    {
      id: "ostinato",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 0, max: 3}
    },
    {
      id: "percussion",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 2, max: 4}
    }
  ],
  segments: {
    bowedGuitar1: { src: "bowed-guitar-1.ogg", group: "melody" },
    deepHorn1: { src: "deep-horn-1.ogg", group: "melody" },
    deepHorn2: { src: "deep-horn-2.ogg", group: "melody" },
    electricGuitarSlowMelody1: { src: "electric-guitar-slow-melody-1.ogg", group: "melody" },
    highStringsFastMelody1: { src: "high-strings-fast-melody-1.ogg", group: "melody" },
    highStringsSlowMelody1: { src: "high-strings-slow-melody-1.ogg", group: "melody" },
    highStringsSlowMelody2: { src: "high-strings-slow-melody-2.ogg", group: "melody" },
    midStringsFastMelody1: { src: "mid-strings-fast-melody-1.ogg", group: "melody" },
    soloViolaFastMelody1: { src: "solo-viola-fast-melody-1.ogg", group: "melody" },
    soloViolinFastMelody1: { src: "solo-violin-fast-melody-1.ogg", group: "melody" },
    trumpetsDarkMelody1: { src: "trumpets-dark-melody-1.ogg", group: "melody" },
    tromboneDarkMelody1: { src: "trombone-dark-melody-1.ogg", group: "melody" },
    timpaniDarkMelody1: { src: "timpani-dark-melody-1.ogg", group: "melody" },
    stringsDarkMelody1: { src: "strings-dark-melody-1.ogg", group: "melody" },
    stringsDarkMelody2: { src: "strings-dark-melody-2.ogg", group: "melody" },
    stringsDarkMelody3: { src: "strings-dark-melody-3.ogg", group: "melody" },
    hornsDarkMelody1: { src: "horns-dark-melody-1.ogg", group: "melody" },
    pluckedDarkMelody1: { src: "plucked-dark-melody-1.ogg", group: "melody" },
    pluckedDarkMelody2: { src: "plucked-dark-melody-2.ogg", group: "melody" },
    darkGuitar1: { src: "dark-guitar-1.ogg", group: "ostinato" },
    tangelharpa1: { src: "tangelharpa-1.ogg", group: "ostinato" },
    soloViolinCreepy1: { src: "solo-violin-creepy-1.ogg", group: "ostinato" },
    soloViolinCreepy2: { src: "solo-violin-creepy-2.ogg", group: "ostinato" },
    soloViolinCreepy3: { src: "solo-violin-creepy-3.ogg", group: "ostinato" },
    lowStringsBassline1: { src: "low-strings-bassline-1.ogg", group: "bass" },
    soloCelloBassline1: { src: "solo-cello-bassline-1.ogg", group: "bass" },
    synthBass2: { src: "synth-bass-2.ogg", group: "bass" },
    synthBassline1: { src: "synth-bassline-1.ogg", group: "bass" },
    synthBasslineShort1: { src: "synth-bassline-short-1.ogg", group: "bass" },
    lowStringsStacattoBass1: { src: "low-strings-stacatto-bass-1.ogg", group: "bass" },
    lowStringsStacattoBass2: { src: "low-strings-stacatto-bass-2.ogg", group: "bass" },
    lowBrassStacattoBass1: { src: "low-brass-stacatto-bass-1.ogg", group: "bass" },
    fluteOstinato1: { src: "flute-ostinato-1.ogg", group: "ostinato" },
    fluteOstinato2: { src: "flute-ostinato-2.ogg", group: "ostinato" },
    fluteOstinatoSecond1: { src: "flute-ostinato-second-1.ogg", group: "ostinato" },
    fluteOstinatoSecond2: { src: "flute-ostinato-second-2.ogg", group: "ostinato" },
    repeatingStrings1: { src: "repeating-strings-1.ogg", group: "ostinato" },
    repeatingStrings2: { src: "repeating-strings-2.ogg", group: "ostinato" },
    soloCelloOstinato1: { src: "solo-cello-ostinato-1.ogg", group: "ostinato" },
    pluckedRepetitionsRising1: { src: "plucked-repetitions-rising-1.ogg", group: "ostinato" },
    midStringsOstinato1: { src: "mid-strings-ostinato-1.ogg", group: "ostinato" },
    lowStringsOstinato1: { src: "low-strings-ostinato-1.ogg", group: "ostinato" },
    hornsOstinsto1: { src: "horns-ostinsto-1.ogg", group: "ostinato" },
    atonalRepetitions1: { src: "atonal-repetitions-1.ogg", group: "ostinato" },
    celloWarpingRepetitions1: { src: "cello-warping-repetitions-1.ogg", group: "ostinato" },
    lowBrassRepetitions1: { src: "low-brass-repetitions-1.ogg", group: "ostinato" },
    mutedStringsRising1: { src: "muted-strings-rising-1.ogg", group: "ostinato" },
    tagelharpaRising1: { src: "tagelharpa-rising-1.ogg", group: "ostinato" },
    lowWoodwindsOstinato1: { src: "low-woodwinds-ostinato-1.ogg", group: "ostinato" },
    celloRhythm1: { src: "cello-rhythm-1.ogg", group: "percussion" },
    guitarStrummingLeft1: { src: "guitar-strumming-left-1.ogg", group: "percussion" },
    guitarStrummingRight1: { src: "guitar-strumming-right-1.ogg", group: "percussion" },
    marchingDrums1: { src: "marching-drums-1.ogg", group: "percussion" },
    marchingDrums2: { src: "marching-drums-2.ogg", group: "percussion" },
    marchingDrumsExtra1: { src: "marching-drums-extra-1.ogg", group: "percussion" },
    marchingDrumsSecond1: { src: "marching-drums-second-1.ogg", group: "percussion" },
    highPercussion1: { src: "high-percussion-1.ogg", group: "percussion" },
    woodPercussion1: { src: "wood-percussion-1.ogg", group: "percussion" },
    woodPercussion2: { src: "wood-percussion-2.ogg", group: "percussion" },
    woodPercussionSecond1: { src: "wood-percussion-second-1.ogg", group: "percussion" },
    woodPercussionSecond2: { src: "wood-percussion-second-2.ogg", group: "percussion" },
    skinDrums1: { src: "skin-drums-1.ogg", group: "percussion" },
    armyMarchDrums1: { src: "army-march-drums-1.ogg", group: "percussion" },
    preparedPianoRhythm1: { src: "prepared-piano-rhythm-1.ogg", group: "percussion" },
    bigDrumHits1: { src: "big-drum-hits-1.ogg", group: "percussion" },
    weirdVocalHit1: { src: "weird-vocal-hit-1.ogg", group: "percussion" },
    darkUnderscore1: { src: "dark-underscore-1.ogg", group: "percussion" }
  },
  arrangements: {
    main: {
      label: "Raider Fight - Main",
      layers: {
        bowedGuitar1: 0.5,
        celloRhythm1: 0.5,
        deepHorn1: 0.3,
        deepHorn2: 0.3,
        electricGuitarSlowMelody1: 0.5,
        fluteOstinato1: 0.5,
        fluteOstinato2: 0.5,
        guitarStrummingLeft1: 0.5,
        guitarStrummingRight1: 0.5,
        highPercussion1: 0.5,
        highStringsFastMelody1: 0.5,
        highStringsSlowMelody1: 0.5,
        highStringsSlowMelody2: 0.5,
        lowBrassRepetitions1: 0.5,
        lowStringsBassline1: 0.5,
        marchingDrums1: 0.5,
        marchingDrums2: 0.5,
        marchingDrumsExtra1: 0.5,
        midStringsFastMelody1: 0.5,
        preparedPianoRhythm1: 0.5,
        repeatingStrings1: 0.5,
        repeatingStrings2: 0.5,
        skinDrums1: 0.5,
        soloCelloBassline1: 0.5,
        soloViolaFastMelody1: 0.7,
        soloViolinFastMelody1: 0.7,
        synthBass2: 0.5,
        synthBassline1: 0.5,
        tangelharpa1: 0.5,
        woodPercussion1: 0.5,
        woodPercussion2: 0.5
      }
    },
    intense: {
      label: "Raider Fight - Intense",
      layers: {
        woodPercussionSecond2: 0.4,
        woodPercussionSecond1: 0.4,
        weirdVocalHit1: 0.4,
        trumpetsDarkMelody1: 0.5,
        tromboneDarkMelody1: 0.5,
        timpaniDarkMelody1: 0.5,
        tagelharpaRising1: 0.4,
        synthBasslineShort1: 0.4,
        stringsDarkMelody3: 0.5,
        stringsDarkMelody2: 0.5,
        stringsDarkMelody1: 0.5,
        soloViolinCreepy3: 0.4,
        soloViolinCreepy2: 0.4,
        soloViolinCreepy1: 0.4,
        soloCelloOstinato1: 0.4,
        pluckedRepetitionsRising1: 0.4,
        pluckedDarkMelody2: 0.5,
        pluckedDarkMelody1: 0.5,
        mutedStringsRising1: 0.4,
        midStringsOstinato1: 0.4,
        marchingDrumsSecond1: 0.4,
        lowWoodwindsOstinato1: 0.4,
        lowStringsStacattoBass2: 0.4,
        lowStringsStacattoBass1: 0.4,
        lowStringsOstinato1: 0.4,
        lowBrassStacattoBass1: 0.4,
        hornsOstinsto1: 0.4,
        hornsDarkMelody1: 0.5,
        fluteOstinatoSecond2: 0.4,
        fluteOstinatoSecond1: 0.4,
        darkUnderscore1: 0.4,
        darkGuitar1: 0.4,
        celloWarpingRepetitions1: 0.4,
        bigDrumHits1: 0.4,
        atonalRepetitions1: 0.2,
        armyMarchDrums1: 0.4
      }
    }
  }
};var seawall$1 = {
  id: "seawall",
  label: "Seawall",
  type: "music",
  src: "music/seawall",
  timing: {
    bpm: 110,
    bars: 24,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 24,
      fadeIn: 1,
      fadeOut: 3,
      randomLayers: {min: 0, max: 3}
    },
    {
      id: "melody",
      interval: 24,
      fadeIn: 1,
      fadeOut: 3,
      randomLayers: {min: 1, max: 4}
    },
    {
      id: "counterMelody",
      interval: 24,
      fadeIn: 1,
      fadeOut: 3,
      randomLayers: {min: 1, max: 3}
    },
    {
      id: "rhythm",
      interval: 24,
      fadeIn: 1,
      fadeOut: 3,
      randomLayers: {min: 1, max: 4}
    }
  ],
  segments: {
    africanPercussion1: {src: "african-percussion-1.ogg", group: "rhythm"},
    bassoContinuoMelody1: {src: "basso-continuo-melody-1.ogg", group: "melody"},
    bassoonCountermelody1: {src: "bassoon-countermelody-1.ogg", group: "counterMelody"},
    bigDrum1: {src: "big-drum-1.ogg", group: "rhythm"},
    bowedStringPad: {src: "bowed-string-pad.ogg", group: "main"},
    cimbalonMelody: {src: "cimbalon-melody.ogg", group: "melody"},
    cimbalonPad1: {src: "cimbalon-pad-1.ogg", group: "main"},
    contrabassoonCountermelody1: {src: "contrabassoon-countermelody-1.ogg", group: "counterMelody"},
    deepDrum1: {src: "deep-drum-1.ogg", group: "rhythm"},
    fluteMelody1: {src: "flute-melody-1.ogg", group: "melody"},
    harpStringsMotif1: {src: "harp-strings-motif-1.ogg", group: "main"},
    highPercussion1: {src: "high-percussion-1.ogg", group: "rhythm"},
    highPercussion2: {src: "high-percussion-2.ogg", group: "rhythm"},
    highStringPad1: {src: "high-string-pad-1.ogg", group: "main"},
    highStringsArp1: {src: "high-strings-arp-1.ogg", group: "main"},
    highStringsMelody1: {src: "high-strings-melody-1.ogg", group: "melody"},
    hornMelody1: {src: "horn-melody-1.ogg", group: "melody"},
    hornRhythm1: {src: "horn-rhythm-1.ogg", group: "rhythm"},
    hornsCountermelody1: {src: "horns-countermelody-1.ogg", group: "counterMelody"},
    hornsCountermelody2: {src: "horns-countermelody-2.ogg", group: "counterMelody"},
    hurdyGurdyPad1: {src: "hurdy-gurdy-pad-1.ogg", group: "main"},
    lowPercussion1: {src: "low-percussion-1.ogg", group: "rhythm"},
    lowPercussion2: {src: "low-percussion-2.ogg", group: "rhythm"},
    lowStringsAccents1: {src: "low-strings-accents-1.ogg", group: "main"},
    lowStringsCountermelody1: {src: "low-strings-countermelody-1.ogg", group: "counterMelody"},
    lowStringsCountermelody2: {src: "low-strings-countermelody-2.ogg", group: "counterMelody"},
    luteCountermelody1: {src: "lute-countermelody-1.ogg", group: "counterMelody"},
    luteCountermelody2: {src: "lute-countermelody-2.ogg", group: "counterMelody"},
    luteMelody1: {src: "lute-melody-1.ogg", group: "melody"},
    pluckedMotif1: {src: "plucked-motif-1.ogg", group: "main"},
    pluckedMotif2: {src: "plucked-motif-2.ogg", group: "main"},
    recorderMelody1: {src: "recorder-melody-1.ogg", group: "melody"},
    recorderMelody2: {src: "recorder-melody-2.ogg", group: "melody"},
    sackputPad1: {src: "sackput-pad-1.ogg", group: "main"},
    stringDrone1: {src: "string-drone-1.ogg", group: "main"},
    stringQuartetMelody1: {src: "string-quartet-melody-1.ogg", group: "melody"},
    strummedRhythm1: {src: "strummed-rhythm-1.ogg", group: "rhythm"},
    strummedRhythm2: {src: "strummed-rhythm-2.ogg", group: "rhythm"},
    tangelharpaAccents1: {src: "tangelharpa-accents-1.ogg", group: "main"},
    timpaniCountermelody1: {src: "timpani-countermelody-1.ogg", group: "counterMelody"},
    tremoloLute1: {src: "tremolo-lute-1.ogg", group: "main"},
    tremoloPlucks1: {src: "tremolo-plucks-1.ogg", group: "main"},
    tremoloStrings1: {src: "tremolo-strings-1.ogg", group: "main"},
    trumpetMelody1: {src: "trumpet-melody-1.ogg", group: "melody"},
    tubaMelody1: {src: "tuba-melody-1.ogg", group: "melody"},
    violinRhythm1: {src: "violin-rhythm-1.ogg", group: "rhythm"},
    hurdyGurdyPadTension1: {src: "hurdy-gurdy-pad-tension-1.ogg", group: "main"},
    tremoloStringsTension1: {src: "tremolo-strings-tension-1.ogg", group: "main"},
    tremoloPlucksTension1: {src: "tremolo-plucks-tension-1.ogg", group: "main"},
    bassoonCountermelodyTension1: {src: "bassoon-countermelody-tension-1.ogg", group: "counterMelody"},
    contrabassoonCountermelodyTension1: {src: "contrabassoon-countermelody-tension-1.ogg", group: "counterMelody"},
    hornsCountermelodyTension1: {src: "horns-countermelody-tension-1.ogg", group: "counterMelody"},
    hornsCountermelodyTension2: {src: "horns-countermelody-tension-2.ogg", group: "counterMelody"},
    lowStringsCountermelodyTension1: {src: "low-strings-countermelody-tension-1.ogg", group: "counterMelody"},
    lowStringsCountermelodyTension2: {src: "low-strings-countermelody-tension-2.ogg", group: "counterMelody"},
    luteCountermelodyTension1: {src: "lute-countermelody-tension-1.ogg", group: "counterMelody"},
    luteCountermelodyTension2: {src: "lute-countermelody-tension-2.ogg", group: "counterMelody"},
    cimbalonTremoloTension: {src: "cimbalon-tremolo-tension.ogg", group: "main"},
    highStringPadTension1: {src: "high-string-pad-tension-1.ogg", group: "main"},
    luteMelodyTension1: {src: "lute-melody-tension-1.ogg", group: "melody"},
    bassoContinuoMelodyTension1: {src: "basso-continuo-melody-tension-1.ogg", group: "melody"},
    tubaMelodyTension1: {src: "tuba-melody-tension-1.ogg", group: "melody"},
    cimbalonTensionMelody: {src: "cimbalon-tension-melody.ogg", group: "melody"}
  },
  arrangements: {
    seawallDay: {
      label: "Seawall Day",
      layers: {
        africanPercussion1: 0.4,
        bassoContinuoMelody1: 0.4,
        bassoonCountermelody1: 0.4,
        bigDrum1: 0.4,
        bowedStringPad: 0.4,
        cimbalonMelody: 0.4,
        cimbalonPad1: 0.4,
        contrabassoonCountermelody1: 0.4,
        deepDrum1: 0.4,
        fluteMelody1: 0.4,
        harpStringsMotif1: 0.4,
        highPercussion1: 0.4,
        highPercussion2: 0.4,
        highStringPad1: 0.4,
        highStringsArp1: 0.4,
        highStringsMelody1: 0.4,
        hornMelody1: 0.4,
        hornRhythm1: 0.4,
        hornsCountermelody1: 0.4,
        hornsCountermelody2: 0.4,
        hurdyGurdyPad1: 0.4,
        lowPercussion1: 0.4,
        lowPercussion2: 0.4,
        lowStringsAccents1: 0.4,
        lowStringsCountermelody1: 0.4,
        lowStringsCountermelody2: 0.4,
        luteCountermelody1: 0.4,
        luteCountermelody2: 0.4,
        luteMelody1: 0.4,
        pluckedMotif1: 0.4,
        pluckedMotif2: 0.4,
        recorderMelody1: 0.4,
        recorderMelody2: 0.4,
        sackputPad1: 0.4,
        stringDrone1: 0.4,
        stringQuartetMelody1: 0.4,
        strummedRhythm1: 0.4,
        strummedRhythm2: 0.4,
        tangelharpaAccents1: 0.4,
        timpaniCountermelody1: 0.3,
        tremoloLute1: 0.4,
        tremoloPlucks1: 0.4,
        tremoloStrings1: 0.4,
        trumpetMelody1: 0.4,
        tubaMelody1: 0.4,
        violinRhythm1: 0.4
      }
    },
    seawallNight: {
      label: "Seawall Night",
      layers: {
        bassoContinuoMelody1: 0.4,
        bassoonCountermelody1: 0.4,
        bowedStringPad: 0.5,
        cimbalonMelody: 0.4,
        cimbalonPad1: 0.5,
        contrabassoonCountermelody1: 0.4,
        deepDrum1: 0.2,
        fluteMelody1: 0.4,
        harpStringsMotif1: 0.4,
        highPercussion1: 0.2,
        highPercussion2: 0.2,
        highStringPad1: 0.5,
        highStringsArp1: 0.4,
        highStringsMelody1: 0.4,
        lowPercussion1: 0.2,
        lowPercussion2: 0.2,
        luteCountermelody1: 0.4,
        luteCountermelody2: 0.4,
        luteMelody1: 0.4,
        pluckedMotif1: 0.4,
        pluckedMotif2: 0.4,
        recorderMelody1: 0.4,
        recorderMelody2: 0.4,
        sackputPad1: 0.5,
        stringDrone1: 0.5,
        stringQuartetMelody1: 0.4,
        strummedRhythm1: 0.2,
        strummedRhythm2: 0.2,
        tremoloLute1: 0.4,
        tremoloPlucks1: 0.4,
        tremoloStrings1: 0.5,
        violinRhythm1: 0.2

      }
    },
    seawallTension: {
      label: "Seawall Tension",
      layers: {
        hurdyGurdyPadTension1: 0.4,
        tremoloStringsTension1: 0.5,
        tremoloPlucksTension1: 0.5,
        bassoonCountermelodyTension1: 0.4,
        contrabassoonCountermelodyTension1: 0.4,
        hornsCountermelodyTension1: 0.4,
        hornsCountermelodyTension2: 0.4,
        lowStringsCountermelodyTension1: 0.4,
        lowStringsCountermelodyTension2: 0.4,
        luteCountermelodyTension1: 0.4,
        luteCountermelodyTension2: 0.4,
        cimbalonTremoloTension: 0.5,
        highStringPadTension1: 0.5,
        luteMelodyTension1: 0.4,
        bassoContinuoMelodyTension1: 0.4,
        tubaMelodyTension1: 0.4,
        cimbalonTensionMelody: 0.4,
        deepDrum1: 0.4,
        harpStringsMotif1: 0.4,
        pluckedMotif1: 0.4,
        pluckedMotif2: 0.4,
        stringDrone1: 0.4
      }
    }
  }
};var seydiriTheme = {
  id: "seydiriTheme",
  label: "Seydiri Theme",
  type: "music",
  src: "music/seydiri",
  timing: {
    bpm: 85,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 8,
      fadeIn: 12,
      fadeOut: 10,
      randomLayers: {min: 3, max: 6}
    },
    {
      id: "drone",
      interval: 16,
      fadeIn: 12,
      fadeOut: 12,
      randomLayers: {min: 0, max: 1}
    }
  ],
  segments: {
    aztecFlute: {src: "aztec-flute.ogg", group: "main"},
    deepDrums: {src: "deep-drums.ogg", group: "main"},
    drone: {src: "drone.ogg", group: "drone"},
    marimba: {src: "marimba.ogg", group: "main"},
    midStringsTrill: {src: "mid-strings-trill.ogg", group: "main"},
    mosenoFlute: {src: "moseno-flute.ogg", group: "main"},
    pizzicatoStrings: {src: "pizzicato-strings.ogg", group: "main"},
    smallMetalPercussion: {src: "small-metal-percussion.ogg", group: "main"},
    timpani: {src: "timpani.ogg", group: "main"},
    waterharpPercussion: {src: "waterharp-percussion.ogg", group: "main"},
    waterphoneScrapes: {src: "waterphone-scrapes.ogg", group: "main"},
    chimesSwell: { src: "chimes-swell.ogg", group: "main" },
    lowStringsSwell: { src: "low-strings-swell.ogg", group: "main" },
    highStringsTremoloSwell: { src: "high-strings-tremolo-swell.ogg", group: "main" },
    femaleSoloVocal: { src: "female-solo-vocal.ogg", group: "main" },
    deepDrone: { src: "deep-drone.ogg", group: "drone" },
    hurdyGurdyViolinMelody1: { src: "hurdy-gurdy-violin-melody-1.ogg", group: "main" },
    hurdyGurdyViolinMelody2: { src: "hurdy-gurdy-violin-melody-2.ogg", group: "main" },
    recorderFifths: { src: "recorder-fifths.ogg", group: "main" },
    marimbaCloud: { src: "marimba-cloud.ogg", group: "main" },
    recorderMelody: { src: "recorder-melody.ogg", group: "main" },
    luteCloud: { src: "lute-cloud.ogg", group: "main" },
    dulcimerCountermelody: { src: "dulcimer-countermelody.ogg", group: "main" },
    vibesCountermelody: { src: "vibes-countermelody.ogg", group: "main" },
    fluteCountermelody: { src: "flute-countermelody.ogg", group: "main" },
    highStringsCountermelody: { src: "high-strings-countermelody.ogg", group: "main" },
    rusticDrone: { src: "rustic-drone.ogg", group: "drone" },
    aztecFluteTension: { src: "aztec-flute-tension.ogg", group: "main" },
    mosenoFluteTension: { src: "moseno-flute-tension.ogg", group: "main" },
    hurdyGurdyViolinMelody1Tension: { src: "hurdy-gurdy-violin-melody-1-tension.ogg", group: "main" },
    hurdyGurdyViolinMelody2Tension: { src: "hurdy-gurdy-violin-melody-2-tension.ogg", group: "main" },
    recorderMelodyTension: { src: "recorder-melody-tension.ogg", group: "main" },
    darkOctaves: { src: "dark-octaves.ogg", group: "main" },
    distortedHighBends: { src: "distorted-high-bends.ogg", group: "main" },
    dulcimerCountermelodyTension: { src: "dulcimer-countermelody-tension.ogg", group: "main" },
    vibesCountermelodyTension: { src: "vibes-countermelody-tension.ogg", group: "main" },
    highStringsCountermelodyTension: { src: "high-strings-countermelody-tension.ogg", group: "main" },
    distortedWhispers: { src: "distorted-whispers.ogg", group: "main" },
    veryDeepDrums: { src: "very-deep-drums.ogg", group: "main" },
    distortedBass: { src: "distorted-bass.ogg", group: "main" },
    hurdyGurdyStringsPitchSlides: { src: "hurdy-gurdy-strings-pitch-slides.ogg", group: "main" }
  },
  arrangements: {
    sunkenRejarh: {
      label: "Sunken Rejarh",
      layers: {
        aztecFlute: 0.8,
        deepDrums: 0.8,
        drone: 0.8,
        marimba: 0.8,
        midStringsTrill: 0.8,
        mosenoFlute: 0.8,
        pizzicatoStrings: 0.8,
        smallMetalPercussion: 0.8,
        timpani: 0.8,
        waterharpPercussion: 0.8,
        waterphoneScrapes: 0.8
      }
    },
    seydiriCalm: {
      label: "Seydiri Calm",
      layers: {
        chimesSwell: 0.5,
        lowStringsSwell: 0.5,
        highStringsTremoloSwell: 0.5,
        femaleSoloVocal: 0.3,
        deepDrone: 0.3,
        hurdyGurdyViolinMelody1: 0.5,
        hurdyGurdyViolinMelody2: 0.5,
        recorderFifths: 0.3,
        marimbaCloud: 0.3,
        recorderMelody: 0.5,
        luteCloud: 0.3,
        dulcimerCountermelody: 0.5,
        vibesCountermelody: 0.5,
        fluteCountermelody: 0.5,
        highStringsCountermelody: 0.5,
        rusticDrone: 0.5,
        aztecFlute: 0.8,
        deepDrums: 0.8,
        drone: 0.8,
        mosenoFlute: 0.8,
        smallMetalPercussion: 0.8
      }
    },
    seydiriTension: {
      label: "Seydiri Tension",
      layers: {
        aztecFluteTension: 0.8,
        mosenoFluteTension: 0.8,
        hurdyGurdyViolinMelody1Tension: 0.5,
        hurdyGurdyViolinMelody2Tension: 0.5,
        recorderMelodyTension: 0.5,
        darkOctaves: 0.5,
        distortedHighBends: 0.3,
        dulcimerCountermelodyTension: 0.3,
        vibesCountermelodyTension: 0.5,
        highStringsCountermelodyTension: 0.5,
        distortedWhispers: 0.5,
        veryDeepDrums: 0.5,
        distortedBass: 0.5,
        hurdyGurdyStringsPitchSlides: 0.5,
        deepDrums: 0.8,
        drone: 0.8,
        marimba: 0.8,
        midStringsTrill: 0.8,
        pizzicatoStrings: 0.8,
        timpani: 0.8,
        waterphoneScrapes: 0.8
      }
    }
  }
};var sinTheme = {
  id: "sinTheme",
  label: "Sin Theme",
  type: "music",
  src: "music/sin-theme",
  timing: {
    bpm: 90,
    bars: 16,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 16,
      fadeIn: 2,
      fadeOut: 4,
      randomLayers: {min: 4, max: 8}
    }
  ],
  segments: {
    clarinet3rdMelodySin: { src: "clarinet-3rd-melody-sin.ogg" },
    fastPizzicato: { src: "fast-pizzicato.ogg" },
    fluteMelodySin: { src: "flute-melody-sin.ogg" },
    glockenspielMelodySin: { src: "glockenspiel-melody-sin.ogg" },
    harp3rdMelodySin: { src: "harp-3rd-melody-sin.ogg" },
    highStringPad: { src: "high-string-pad.ogg" },
    pianoArp: { src: "piano-arp.ogg" },
    pianoMelodySin: { src: "piano-melody-sin.ogg" },
    piccoloFlute2ndMelodySin: { src: "piccolo-flute-2nd-melody-sin.ogg" },
    pizzicatoBassline: { src: "pizzicato-bassline.ogg" },
    soloViolin2ndMelodySin: { src: "solo-violin-2nd-melody-sin.ogg" },
    stringSparklePad: { src: "string-sparkle-pad.ogg" },
    toyPianoArp: { src: "toy-piano-arp.ogg" },
    violaMelodySin: { src: "viola-melody-sin.ogg" },
    violinMelodySin: { src: "violin-melody-sin.ogg" },
    woodwindOstinatos: { src: "woodwind-ostinatos.ogg" }
  },
  arrangements: {
    sinTheme: {
      label: "Sin Theme",
      layers: {
        clarinet3rdMelodySin: 0.5,
        fastPizzicato: 0.5,
        fluteMelodySin: 0.5,
        glockenspielMelodySin: 0.5,
        harp3rdMelodySin: 0.5,
        highStringPad: 0.5,
        pianoArp: 0.35,
        pianoMelodySin: 0.5,
        piccoloFlute2ndMelodySin: 0.5,
        pizzicatoBassline: 0.5,
        soloViolin2ndMelodySin: 0.35,
        stringSparklePad: 0.5,
        toyPianoArp: 0.5,
        violaMelodySin: 0.25,
        violinMelodySin: 0.25,
        woodwindOstinatos: 0.5
      }
    }
  }
};var solemnFolk = {
  id: "solemnFolk",
  label: "Solemn Folk",
  type: "music",
  src: "music/solemn-folk",
  timing: {
    bpm: 100,
    bars: 12,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 12,
      fadeIn: 0.1,
      fadeOut: 1,
      randomLayers: {min: 3, max: 5}
    }
  ],
  segments: {
    folkEnsemblePlucked1: { src: "folk-ensemble-plucked-1.ogg" },
    pluckedBassline: { src: "plucked-bassline.ogg" },
    soloFlute: { src: "solo-flute.ogg" },
    hurdyGurdyViolinMelody: { src: "hurdy-gurdy-violin-melody.ogg" },
    recorderEnsembleMelody: { src: "recorder-ensemble-melody.ogg" },
    violDaGambaDroneBassline: { src: "viol-da-gamba-drone-bassline.ogg" },
    tremoloViolin: { src: "tremolo-violin.ogg" },
    harpaRhythm1: { src: "harpa-rhythm-1.ogg" },
    pluckedMelody2: { src: "plucked-melody-2.ogg" },
    pluckedMelody1: { src: "plucked-melody-1.ogg" },
    harpaRhythm2: { src: "harpa-rhythm-2.ogg" },
    pluckedRhythm1: { src: "plucked-rhythm-1.ogg" },
    pluckedRhythm2: { src: "plucked-rhythm-2.ogg" },
    folkEnsemblePlucked2: { src: "folk-ensemble-plucked-2.ogg" }
  },
  arrangements: {
    derethErekos: {
      label: "The Ballad of Dereth Erekos",
      layers: {
        folkEnsemblePlucked1: 0.2,
        pluckedBassline: 0.2,
        soloFlute: 0.2,
        hurdyGurdyViolinMelody: 0.2,
        recorderEnsembleMelody: 0.2,
        violDaGambaDroneBassline: 0.2,
        tremoloViolin: 0.2,
        harpaRhythm1: 0.1,
        pluckedMelody2: 0.2,
        pluckedMelody1: 0.2,
        harpaRhythm2: 0.1,
        pluckedRhythm1: 0.2,
        pluckedRhythm2: 0.2,
        folkEnsemblePlucked2: 0.2
      }
    }
  }
};var templeCindaric = {
  id: "templeCindaric",
  label: "Cindaric Temple",
  type: "music",
  src: "music/temple/cindaric",
  timing: {
    bpm: 60,
    bars: 8,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 8,
      fadeIn: 12,
      fadeOut: 15,
      randomLayers: {min: 2, max: 6}
    }
  ],
  segments: {
    deepDrum: {src: "deep-drum.ogg"},
    etherealPad1: {src: "ethereal-pad-1.ogg"},
    etherealPad2: {src: "ethereal-pad-2.ogg"},
    etherealPad1Tension: {src: "ethereal-pad-1-tension.ogg"},
    etherealPad2Tension: {src: "ethereal-pad-2-tension.ogg"},
    flutePad1: {src: "flute-pad-1.ogg"},
    flutePad2: {src: "flute-pad-2.ogg"},
    flutePad1Tension: {src: "flute-pad-1-tension.ogg"},
    flutePad2Tension: {src: "flute-pad-2-tension.ogg"},
    highFlute: {src: "high-flute.ogg"},
    highGamelan1: {src: "high-gamelan-1.ogg"},
    highGamelan2: {src: "high-gamelan-2.ogg"},
    highGamelan3: {src: "high-gamelan-3.ogg"},
    midGamelan1: {src: "mid-gamelan-1.ogg"},
    midGamelan2: {src: "mid-gamelan-2.ogg"},
    midGamelan3: {src: "mid-gamelan-3.ogg"},
    hummingMan: {src: "humming-man.ogg"},
    hummingManTension: {src: "humming-man-tension.ogg"},
    midFlute: {src: "mid-flute.ogg"},
    singingBowl: {src: "singing-bowl.ogg"},
    singingBowlTension: {src: "singing-bowl-tension.ogg"},
    nordicPad: {src: "nordic-pad.ogg"},
    nordicPadTension: {src: "nordic-pad-tension.ogg"},
    steelToungueDrums: {src: "steel-tongue-drums.ogg"},
    steelToungueDrumsTension: {src: "steel-tongue-drums-tension.ogg"},
    highWoodDrum: {src: "high-wood-drum.ogg"},
    marimba: {src: "marimba.ogg"},
    marimbaTension: {src: "marimba-tension.ogg"},
    kamanche: {src: "kamanche.ogg"},
    shakuhanchi: {src: "shakuhanchi.ogg"}
  },
  arrangements: {
    calm: {
      label: "Cindaric Temple Calm",
      layers: {
        deepDrum: 0.3,
        etherealPad1: 0.3,
        etherealPad2: 0.3,
        flutePad1: 0.3,
        flutePad2: 0.3,
        highFlute: 0.3,
        highGamelan1: 0.3,
        highGamelan2: 0.3,
        highGamelan3: 0.3,
        hummingMan: 0.3,
        midFlute: 0.3,
        singingBowl: 0.3,
        nordicPad: 0.3,
        steelToungueDrums: 0.3,
        highWoodDrum: 0.2,
        marimba: 0.3,
        kamanche: 0.3,
        shakuhanchi: 0.3
      }
    },
    tension: {
      label: "Cindaric Temple Tension",
      layers: {
        deepDrum: 0.3,
        etherealPad1Tension: 0.3,
        etherealPad2Tension: 0.3,
        flutePad1Tension: 0.3,
        flutePad2Tension: 0.3,
        midGamelan1: 0.3,
        midGamelan2: 0.3,
        midGamelan3: 0.3,
        hummingManTension: 0.3,
        singingBowlTension: 0.3,
        nordicPadTension: 0.3,
        steelToungueDrumsTension: 0.3,
        highWoodDrum: 0.2,
        marimbaTension: 0.3
      }
    }
  }
};var templeWater = {
  id: "templeWater",
  label: "Water Temple",
  type: "music",
  src: "music/temple/water",
  timing: {
    bpm: 120,
    bars: 32,
    sync: true
  },
  groups: [
    {
      id: "main",
      interval: 32,
      fadeIn: 12,
      fadeOut: 15,
      randomLayers: {min: 2, max: 8}
    }
  ],
  segments: {
    darkDrum: {src: "dark-drum.ogg"},
    doubleBassDrone: {src: "double-bass-drone.ogg"},
    dulcimer: {src: "dulcimer.ogg"},
    highDrone: {src: "high-drone.ogg"},
    lowDrone: {src: "low-drone.ogg"},
    midDrone: {src: "mid-drone.ogg"},
    subHit: {src: "sub-hit.ogg"},
    tamTamRoll: {src: "tam-tam-roll.ogg"},
    thundersheet: {src: "thundersheet.ogg"},
    tremoloStrings1: {src: "tremolo-strings-1.ogg"},
    tremoloStrings2: {src: "tremolo-strings-2.ogg"},
    celloRicochet: {src: "cello-ricochet.ogg"},
    doplerBrass: {src: "dopler-brass.ogg"},
    lowChoir: {src: "low-choir.ogg"},
    rhythmicPulse: {src: "rhythmic-pulse.ogg"},
    thunderDrum: {src: "thunder-drum.ogg"},
    creepyChoir: {src: "creepy-choir.ogg"}
  },
  arrangements: {
    shrineOfNiteCalm: {
      label: "Shrine of Nite Calm",
      layers: {
        darkDrum: 1.5,
        doubleBassDrone: 1.5,
        dulcimer: 1.5,
        highDrone: 1.5,
        lowDrone: 1.5,
        midDrone: 1.5,
        subHit: 1.5,
        tamTamRoll: 1.5,
        thundersheet: 1.5,
        tremoloStrings1: 1.5,
        tremoloStrings2: 1.5
      }
    },
    shrineOfNiteTension: {
      label: "Shrine of Nite Tension",
      layers: {
        darkDrum: 1.5,
        highDrone: 1.5,
        lowDrone: 1.5,
        subHit: 1.5,
        tamTamRoll: 1.5,
        thundersheet: 1.5,
        celloRicochet: 1.5,
        doplerBrass: 1.5,
        lowChoir: 1.6,
        rhythmicPulse: 1.5,
        thunderDrum: 1.5,
        creepyChoir: 1.5
      }
    }
  }
};var undeadCombat = {
  id: "undeadCombat",
  label: "Undead Combat",
  type: "music",
  src: "music/undead-combat",
  timing: {
    bpm: 90,
    bars: 8,
    sync: true,
    cycleGroup: "cycle"
  },
  groups: [
    {
      id: "cycle",
      interval: 16
    },
    {
      id: "main",
      interval: 4,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 2, max: 5}
    },
    {
      id: "melody",
      interval: 8,
      fadeIn: 1,
      fadeOut: 3,
      randomLayers: {min: -3, max: 3}
    },
    {
      id: "bass",
      interval: 8,
      fadeIn: 0.1,
      fadeOut: 3,
      randomLayers: {min: 0, max: 1}
    }
  ],
  segments: {
    atonalBrass1: {src: "atonal-brass-1.ogg", group: "main"},
    atonalFastViolins1: {src: "atonal-fast-violins-1.ogg", group: "main"},
    atonalFastViolins2: {src: "atonal-fast-violins-2.ogg", group: "main"},
    atonalStringsRhythm1: {src: "atonal-strings-rhythm-1.ogg", group: "main"},
    atonalStringsRhythm2: {src: "atonal-strings-rhythm-2.ogg", group: "main"},
    bigDrum1: {src: "big-drum-1.ogg", group: "main"},
    bigToms: {src: "big-toms.ogg", group: "main"},
    bowedMetals1: {src: "bowed-metals-1.ogg", group: "main"},
    celloMelody1: {src: "cello-melody-1.ogg", group: "melody"},
    celloMelody2: {src: "cello-melody-2.ogg", group: "melody"},
    celloSfxRhythm1: {src: "cello-sfx-rhythm-1.ogg", group: "main"},
    celloSfxRhythm2: {src: "cello-sfx-rhythm-2.ogg", group: "main"},
    cinematicSwell1: {src: "cinematic-swell-1.ogg", group: "main"},
    cinematicSwell2: {src: "cinematic-swell-2.ogg", group: "main"},
    colLegnoMelody1: {src: "col-legno-melody-1.ogg", group: "melody"},
    creepyStringSwells1: {src: "creepy-string-swells-1.ogg", group: "main"},
    creepyStringSwells2: {src: "creepy-string-swells-2.ogg", group: "main"},
    electricGuitarMelody: {src: "electric-guitar-melody.ogg", group: "melody"},
    gruntVocals: {src: "grunt-vocals.ogg", group: "main"},
    halfNoteDownStrings1: {src: "half-note-down-strings-1.ogg", group: "main"},
    halfNoteDownStrings2: {src: "half-note-down-strings-2.ogg", group: "main"},
    highPercussion1: {src: "high-percussion-1.ogg", group: "main"},
    hornMelody1: {src: "horn-melody-1.ogg", group: "melody"},
    hornMelody2: {src: "horn-melody-2.ogg", group: "melody"},
    marchingHits: {src: "marching-hits.ogg", group: "main"},
    marchingPercussion1: {src: "marching-percussion-1.ogg", group: "main"},
    metalReverse1: {src: "metal-reverse-1.ogg", group: "main"},
    metalReverse2: {src: "metal-reverse-2.ogg", group: "main"},
    metalSounds1: {src: "metal-sounds-1.ogg", group: "main"},
    percussionSwells: {src: "percussion-swells.ogg", group: "main"},
    pianoDrone1: {src: "piano-drone-1.ogg", group: "main"},
    pianoHits: {src: "piano-hits.ogg", group: "main"},
    pianoOstinato1: {src: "piano-ostinato-1.ogg", group: "main"},
    pianoOstinato2: {src: "piano-ostinato-2.ogg", group: "main"},
    pianoOstinato3: {src: "piano-ostinato-3.ogg", group: "main"},
    spookyFastStringsMelody1: {src: "spooky-fast-strings-melody-1.ogg", group: "melody"},
    spookyFastStringsMelody2: {src: "spooky-fast-strings-melody-2.ogg", group: "melody"},
    spookyPiano1: {src: "spooky-piano-1.ogg", group: "main"},
    spookyPiano2: {src: "spooky-piano-2.ogg", group: "main"},
    spookySynthMelody1: {src: "spooky-synth-melody-1.ogg", group: "melody"},
    spookySynthMelody2: {src: "spooky-synth-melody-2.ogg", group: "melody"},
    spookyViolinMelody1: {src: "spooky-violin-melody-1.ogg", group: "melody"},
    spookyViolinMelody2: {src: "spooky-violin-melody-2.ogg", group: "melody"},
    subHit1: {src: "sub-hit-1.ogg", group: "main"},
    synthBass1: {src: "synth-bass-1.ogg", group: "bass"},
    synthBass2: {src: "synth-bass-2.ogg", group: "bass"},
    synthBass3: {src: "synth-bass-3.ogg", group: "bass"},
    synthBass4: {src: "synth-bass-4.ogg", group: "bass"},
    synthBass5: {src: "synth-bass-5.ogg", group: "bass"},
    unusualBrassDrone1: {src: "unusual-brass-drone-1.ogg", group: "main"},
    unusualStringDrone1: {src: "unusual-string-drone-1.ogg", group: "main"}
  },
  arrangements: {
    main: {
      label: "Undead Fight - Main",
      layers: {
        hornMelody2: 0.5,
        celloMelody1: 0.5,
        celloMelody2: 0.5,
        atonalFastViolins2: 0.5,
        atonalFastViolins1: 0.5,
        marchingPercussion1: 0.5,
        highPercussion1: 0.5,
        bigDrum1: 0.5,
        cinematicSwell1: 0.5,
        electricGuitarMelody: 0.5,
        atonalBrass1: 0.5,
        percussionSwells: 0.5,
        synthBass3: 0.5,
        halfNoteDownStrings2: 0.5,
        halfNoteDownStrings1: 0.5,
        creepyStringSwells2: 0.5,
        creepyStringSwells1: 0.5,
        gruntVocals: 0.5,
        synthBass2: 0.5,
        synthBass1: 0.5,
        celloSfxRhythm2: 0.5,
        celloSfxRhythm1: 0.5,
        bigToms: 0.5,
        colLegnoMelody1: 0.5,
        hornMelody1: 0.5
      }
    },
    spooky: {
      label: "Undead Fight - Spooky",
      layers: {
        celloMelody1: 0.5,
        celloMelody2: 0.5,
        marchingPercussion1: 0.5,
        highPercussion1: 0.5,
        bigDrum1: 0.5,
        cinematicSwell1: 0.5,
        percussionSwells: 0.5,
        synthBass3: 0.5,
        halfNoteDownStrings2: 0.5,
        halfNoteDownStrings1: 0.5,
        creepyStringSwells2: 0.5,
        creepyStringSwells1: 0.5,
        gruntVocals: 0.5,
        synthBass2: 0.5,
        synthBass1: 0.5,
        celloSfxRhythm2: 0.5,
        celloSfxRhythm1: 0.5,
        bigToms: 0.5,
        colLegnoMelody1: 0.5,
        spookySynthMelody1: 0.5,
        spookySynthMelody2: 0.5,
        spookyViolinMelody1: 0.5,
        spookyViolinMelody2: 0.5,
        spookyPiano1: 0.5,
        spookyPiano2: 0.5,
        spookyFastStringsMelody1: 0.5,
        spookyFastStringsMelody2: 0.5
      }
    },
    atonal: {
      label: "Undead Fight - Atonal",
      layers: {
        metalReverse1: 0.5,
        metalReverse2: 0.5,
        bowedMetals1: 0.5,
        subHit1: 0.5,
        unusualStringDrone1: 0.5,
        unusualBrassDrone1: 0.5,
        pianoOstinato1: 0.5,
        pianoOstinato2: 0.5,
        synthBass4: 0.5,
        pianoOstinato3: 0.5,
        atonalStringsRhythm1: 0.5,
        atonalStringsRhythm2: 0.5,
        cinematicSwell2: 0.5,
        marchingHits: 0.5,
        synthBass5: 0.5,
        metalSounds1: 0.5
      }
    }
  }
};var weather$2 = {
  id: "weather",
  label: "Ember Weather",
  type: "weather",
  src: "weather",
  randomLayers: false,
  segments: {
    rainLight: {src: "rain-light.ogg", timing: {randomOffset: true, fadeIn: 6, fadeOut: 6}},
    rainNormal: {src: "rain-normal.ogg", timing: {randomOffset: true, fadeIn: 6, fadeOut: 6}},
    rainStorm: {src: "rain-thunderstorm.ogg", timing: {randomOffset: true, fadeIn: 6, fadeOut: 6}},
    whisperFog: {src: "whisper-wind.ogg", timing: {randomOffset: true, fadeIn: 6, fadeOut: 6}},
    magicStorm: {src: "magic-storm.ogg", timing: {randomOffset: true, fadeIn: 6, fadeOut: 6}}
  },
  arrangements: {
    clear: {
      label: "Clear",
      layers: {}
    },
    rainLight: {
      label: "Drizzle",
      layers: {
        rainLight: 0.7
      }
    },
    rainNormal: {
      label: "Rain",
      layers: {
        rainNormal: 0.4
      }
    },
    rainStorm: {
      label: "Thunderstorm",
      layers: {
        rainStorm: 0.5
      }
    },
    arcaneFog: {
      label: "Arcane Fog",
      layers: {
        whisperFog: 0.8
      }
    },
    mayisStorm: {
      label: "Mayis Storm",
      layers: {
        magicStorm: 0.7
      }
    }
  },
  timing: {
    sync: false
  }
};
export const soundscapes=/*#__PURE__*/Object.freeze({__proto__:null,abyssalCombat:abyssalCombat,aedirTheme:aedirTheme,ancientRuins:ancientRuins,ankaristTheme:ankaristTheme,arcaneTheme:arcaneTheme,arcturianFolk:arcturianFolk,arcturianTown:arcturianTown,arctusPlateauMusic:arctusPlateauMusic,bardTroupe:bardTroupe,beastCombat:beastCombat,celestialCombat:celestialCombat,constructCombat:constructCombat,cosmosMusic:cosmos$1,elementalCombat:elementalCombat,emberEnvironment:emberEnvironment,events:events$8,forestOfStoneExploration:forestOfStoneExploration,gravensRestMusic:gravensRestMusic,houseBastilla:houseBastilla,illusoryCombat:illusoryCombat,innerRealmsMusic:innerRealmsMusic,kadisosExploration:kadisosExploration,lylaTheme:lylaTheme,marlstoneGala:marlstoneGala$1,monstrosityCombat:monstrosityCombat,mutagenicCombat:mutagenicCombat,mysticalDungeon:mysticalDungeon,oozeCombat:oozeCombat,ordain:ordain$1,ordaniFolk:ordaniFolk,pirateCombat:pirateCombat,pitTrap:pitTrap$1,raiderCombat:raiderCombat,seawall:seawall$1,seydiriTheme:seydiriTheme,sinTheme:sinTheme,solemnFolk:solemnFolk,templeCindaric:templeCindaric,templeWater:templeWater,undeadCombat:undeadCombat,weather:weather$2});