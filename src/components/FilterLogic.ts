import { useState } from "react";

const useBiquadFilter = (
  audioCtx: AudioContext,
  panner: StereoPannerNode,
  analyserNode: AnalyserNode
) => {
  const biquadFilter = audioCtx.createBiquadFilter();

  // Set freq
  const biquadFilterFreq = (value: number) => {
    biquadFilter.frequency.value = value / 100;
  };

  // Set detune
  const biquadFilterDetune = (value: number) => {
    biquadFilter.detune.value = value / 100;
  };

  // Set Q
  const biquadFilterQ = (value: number) => {
    biquadFilter.Q.value = value / 100;
  };

  // Set gain
  const biquadFilterGain = (value: number) => {
    biquadFilter.gain.value = value / 100;
  };

  // Function to set type of filter
  const biquadFilterType = (value: BiquadFilterType) => {
    biquadFilter.type = value;
  };

  const connectBiquadFilter = () => {
    panner.disconnect();
    panner
      .connect(biquadFilter) // Biquad Filter
      .connect(analyserNode)
      .connect(audioCtx.destination);
  };

  const disconnectBiquadFilter = () => {
    panner.disconnect();
    panner.connect(analyserNode).connect(audioCtx.destination);
  };

  const [biquadFilterControl] = useState({
    connectBiquadFilter: connectBiquadFilter,
    disconnectBiquadFilter: disconnectBiquadFilter,
    biquadFilterType: biquadFilterType,
    biquadFilterFreq: biquadFilterFreq,
    biquadFilterDetune: biquadFilterDetune,
    biquadFilterQ: biquadFilterQ,
    biquadFilterGain: biquadFilterGain,
  });

  return { biquadFilterControl };
};

export { useBiquadFilter };
