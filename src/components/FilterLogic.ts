import { useState } from "react";

const useBiquadFilter = (
  audioCtx: AudioContext,
  panner: StereoPannerNode,
  analyserNode: AnalyserNode
) => {
  const biquadFilter = audioCtx.createBiquadFilter();
  const biquadFilterFreq = (value: number) => {
    biquadFilter.frequency.value = value;
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
  });

  return { biquadFilterControl };
};

export { useBiquadFilter };
