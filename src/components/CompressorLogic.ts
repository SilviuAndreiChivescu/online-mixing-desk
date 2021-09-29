import { useState } from "react";

const useCompressor = (
  audioCtx: AudioContext,
  gainNode: GainNode,
  panner: StereoPannerNode,
  analyserNode: AnalyserNode
) => {
  const compressor = audioCtx.createDynamicsCompressor();
  // Compressor control
  const compressorThreshold = (thresholdValue: number) => {
    compressor.threshold.value = thresholdValue;
  };
  const compressorKnee = (kneeValue: number) => {
    compressor.knee.value = kneeValue;
  };
  const compressorRatio = (ratioValue: number) => {
    compressor.ratio.value = ratioValue;
  };
  const compressorAttack = (attackValue: number) => {
    compressor.attack.value = attackValue;
  };
  const compressorRelease = (releaseValue: number) => {
    compressor.release.value = releaseValue;
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
    compressorThreshold: compressorThreshold,
    compressorKnee: compressorKnee,
    compressorRatio: compressorRatio,
    compressorAttack: compressorAttack,
    compressorRelease: compressorRelease,
    connectCompressor: connectCompressor,
    disconnectCompressor: disconnectCompressor,
  });

  return { compressorControl };
};

export { useCompressor };
