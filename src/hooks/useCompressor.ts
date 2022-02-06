import { useEffect, useState } from "react";
import { useGain } from "./useGain";

const useCompressor = (
  audioCtx: AudioContext,
  pannerNode: StereoPannerNode
) => {
  const [compressorOutput] = useGain(audioCtx);
  const compressor = audioCtx.createDynamicsCompressor();
  // Control Compressor's Params: Threshold, Knee, Ratio, Attack, Release
  const compressorControl = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const [dryGainNode, dryGainControl] = useGain(audioCtx);
  const [wetGainNode, wetGainControl] = useGain(audioCtx);

  // Dry Wet Mix Controller Knob (1 means full wet)
  const setDryWetKnob = (dryWetKnob: number) => {
    if (dryWetKnob > 0.5) {
      dryGainControl(1 - 2 * (dryWetKnob - 0.5));
      wetGainControl(1);
    } else {
      wetGainControl(1 - 2 * (0.5 - dryWetKnob));
      dryGainControl(1);
    }
  };

  // Connect compressor to wetGainNode and to compressor output
  //todo check later - If this doesn't work, it should not be on the same line the two connects
  useEffect(() => {
    compressor.connect(wetGainNode).connect(compressorOutput);

    // Connect dryGainNode to compressor output
    dryGainNode.connect(compressorOutput);
  }, []);

  // Connect compressor
  const connectCompressor = () => {
    pannerNode.disconnect(); // Disconnect from gainNode so other effects can be chained as well and work independently or with each other

    pannerNode.connect(compressor);
    pannerNode.connect(dryGainNode);
  };

  // Disconnect compressor
  const disconnectCompressor = () => {
    pannerNode.disconnect();

    pannerNode.connect(compressorOutput);
  };

  // Put everything to export into an object
  const [compressorFunctions] = useState({
    compressorControl: compressorControl,
    connectCompressor: connectCompressor,
    disconnectCompressor: disconnectCompressor,
    setDryWetKnob: setDryWetKnob,
    compressorOutput: compressorOutput,
  });

  return [compressorFunctions] as const;
};

export { useCompressor };
