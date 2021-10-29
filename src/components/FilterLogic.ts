import { useState } from "react";

const useBiquadFilter = (
  audioCtx: AudioContext,
  panner: StereoPannerNode,
  analyserNode: AnalyserNode
) => {
  const biquadFilter = audioCtx.createBiquadFilter();

  // Set Biquad Filter's Params: Frequency, Q, Gain
  const biquadFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Take the id and value
    const { id, value } = e.target;
    // Make type of proprieties to please Typescript
    type biquadFilterProperties = "frequency" | "Q" | "gain";
    // Change the particular property taken from id to the value taken from the slider
    biquadFilter[id as biquadFilterProperties].value = parseFloat(value);
  };

  // Function to set type of filter
  const biquadFilterType = (value: BiquadFilterType) => {
    biquadFilter.type = value;
  };
  // It needs an output, so that if prev connection in the chain gets decconnected, then it does not break the chain
  const connectBiquadFilter = () => {
    panner.disconnect();
    panner.connect(biquadFilter).connect(analyserNode);
  };

  const disconnectBiquadFilter = () => {
    panner.disconnect();
    panner.connect(analyserNode);
  };

  // Object with all filter's functions
  const [biquadFilterControl] = useState({
    connectBiquadFilter: connectBiquadFilter,
    disconnectBiquadFilter: disconnectBiquadFilter,
    biquadFilterType: biquadFilterType,
    biquadFilterParams: biquadFilterParams,
  });

  return { biquadFilterControl };
};

export { useBiquadFilter };
