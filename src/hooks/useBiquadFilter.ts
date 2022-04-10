import { useState } from "react";

// highpass, lowpass
const useBiquadFilterResonant = (
  audioCtx: AudioContext,
  typeValue: BiquadFilterType
) => {
  const [biquadFilter] = useState(() => audioCtx.createBiquadFilter());
  biquadFilter.type = typeValue;

  const biquadFilterCutOffFreqControl = (cutOffValue: number) => {
    biquadFilter["frequency"].value = cutOffValue;
  };

  return [biquadFilter, biquadFilterCutOffFreqControl] as const;
};

// highshelf, peaking, lowshelf
const useBiquadFilterNonResonant = (
  audioCtx: AudioContext,
  frequencyValue: number,
  typeValue: BiquadFilterType
) => {
  const [biquadFilter] = useState(() => audioCtx.createBiquadFilter());
  biquadFilter.type = typeValue;
  biquadFilter["frequency"].value = frequencyValue;

  const biquadFilterGainControl = (gainValue: number) => {
    biquadFilter["gain"].value = gainValue;
  };

  return [biquadFilter, biquadFilterGainControl] as const;
};

export { useBiquadFilterResonant, useBiquadFilterNonResonant };
