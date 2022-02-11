import { useReverb } from "./useReverb";
import { useGain } from "./useGain";
import { useEffect, useState } from "react";

const useFXUnit = (audioCtx: AudioContext, compressorOutput: GainNode) => {
  const [FXUnitOutput] = useGain(audioCtx);

  const [convolver, chooseImpulse] = useReverb(audioCtx);

  // States to use for changing between channels
  const [FXUnitUIStates] = useState({
    reverb: "LargeHall", // this will only help if I want to show as active the reverb used
    dryWetKnob: 0.5,
  });

  const [dryGainNode, dryGainControl] = useGain(audioCtx);
  const [wetGainNode, wetGainControl] = useGain(audioCtx);

  // Dry Wet Mix Controller Knob (1 means full wet)
  const setDryWetKnob = (
    e: React.ChangeEvent<HTMLInputElement>,
    setMain: any,
    main: any
  ) => {
    const { value } = e.target;

    setMain({
      ...main,
      FXUnitFunctions: {
        ...main.FXUnitFunctions,
        FXUnitUIStates: {
          ...main.FXUnitFunctions.FXUnitUIStates,
          dryWetKnob: parseFloat(value),
        },
      },
    });

    if (parseFloat(value) > 0.5) {
      dryGainControl(1 - 2 * (parseFloat(value) - 0.5));
      wetGainControl(1);
    } else {
      wetGainControl(1 - 2 * (0.5 - parseFloat(value)));
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
    FXUnitUIStates: FXUnitUIStates,
  });

  return [FXUnitFunctions] as const;
};
export { useFXUnit };
