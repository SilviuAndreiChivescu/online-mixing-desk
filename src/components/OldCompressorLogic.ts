import { useState } from "react";

const useCompressor = (
  audioCtx: AudioContext,
  gainNode: GainNode,
  panner: StereoPannerNode,
  analyserNode: AnalyserNode
) => {
  // Create compressor
  const compressor = audioCtx.createDynamicsCompressor();

  // Set Compressor's Params: Threshold, Knee, Ratio, Attack, Release
  const compressorParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Take the id and value
    const { id, value } = e.target;
    // Make type of proprieties to please Typescript
    type compressorProperties =
      | "threshold"
      | "knee"
      | "ratio"
      | "attack"
      | "release";
    // Change the particular property taken from id to the value taken from the slider
    compressor[id as compressorProperties].value = parseFloat(value);
  };

  // Connect compressor
  const connectCompressor = () => {
    gainNode.disconnect(); // Disconnect from gainNode so other effects can be chained as well and work independently or with each other
    gainNode
      .connect(compressor) // Connect compressor
      .connect(panner) // Connect to panner
      .connect(analyserNode) // Oscilloscope
      .connect(audioCtx.destination); // Output
  };
  // Disconnect compressor
  const disconnectCompressor = () => {
    gainNode.disconnect();
    gainNode
      .connect(panner)
      .connect(analyserNode)
      .connect(audioCtx.destination);
  };
  const [compressorControl] = useState({
    compressorParams: compressorParams,
    connectCompressor: connectCompressor,
    disconnectCompressor: disconnectCompressor,
  });

  return { compressorControl };
};

export { useCompressor };
