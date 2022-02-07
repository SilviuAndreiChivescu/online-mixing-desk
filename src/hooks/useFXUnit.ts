import { useReverb } from "./useReverb";
import { useGain } from "./useGain";
import { useEffect, useState } from "react";

const useFXUnit = (audioCtx: AudioContext, compressorOutput: GainNode) => {
  const [FXUnitOutput] = useGain(audioCtx);

  const [convolver, chooseImpulse] = useReverb(audioCtx);

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

  useEffect(() => {
    // Connect reverb to wetGainNode and to FXUnit output
    convolver.connect(wetGainNode).connect(FXUnitOutput);

    // Connect dryGainNode to FXUnit output
    dryGainNode.connect(FXUnitOutput);
  }, []);

  // Connect FX Unit
  const connectFXUnit = () => {
    compressorOutput.disconnect();

    compressorOutput.connect(convolver);
    compressorOutput.connect(dryGainNode);
  };

  // Disconnect FX Unit
  const disconnectFXUnit = () => {
    compressorOutput.disconnect();

    compressorOutput.connect(FXUnitOutput);
  };

  // Put everything to export into an object
  const [FXUnitFunctions] = useState({
    chooseImpulse: chooseImpulse,
    connectFXUnit: connectFXUnit,
    disconnectFXUnit: disconnectFXUnit,
    FXUnitOutput: FXUnitOutput,
    setDryWetKnob: setDryWetKnob,
  });

  return [FXUnitFunctions] as const;
};
export { useFXUnit };
