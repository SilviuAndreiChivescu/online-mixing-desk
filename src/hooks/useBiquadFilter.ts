// highpass, lowpass
const useBiquadFilterResonant = (
  audioCtx: AudioContext,
  typeValue: BiquadFilterType
) => {
  const biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = typeValue;

  const biquadFilterCutOffFreqControl = (cutOffValue: number) => {
    biquadFilter["frequency"].value = cutOffValue;
  };

  return [biquadFilter, biquadFilterCutOffFreqControl];
};

// highshelf, peaking, lowshelf
const useBiquadFilterNonResonant = (
  audioCtx: AudioContext,
  frequencyValue: number,
  typeValue: BiquadFilterType
) => {
  const biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = typeValue;
  biquadFilter["frequency"].value = frequencyValue;

  const biquadFilterGainControl = (gainValue: number) => {
    biquadFilter["gain"].value = gainValue;
  };

  return [biquadFilter, biquadFilterGainControl];
};

export { useBiquadFilterResonant, useBiquadFilterNonResonant };
