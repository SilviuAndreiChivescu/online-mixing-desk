import { useReverb } from "./useReverb";
import { useGain } from "./useGain";
import { useEffect, useState } from "react";

const useFXUnit = (audioCtx: AudioContext, compressorOutput: GainNode) => {
  const [FXUnitOutput] = useGain(audioCtx);

  const [convolver, chooseImpulse] = useReverb(audioCtx);

  // States to use for changing between channels
  const [FXUnitUIStates] = useState({
    reverb: "LargeHall",
    dryWetKnob: 0.5,
  });
  // Control reverb showing reverb used
  const [dropDownInfo, setDropDownInfo] = useState([
    { impulse: "Large Hall", active: true, index: 1 },
    { impulse: "Medium Hall", active: false, index: 2 },
    { impulse: "Small Hall", active: false, index: 3 },
    { impulse: "Plate 1", active: false, index: 4 },
    { impulse: "Plate 2", active: false, index: 5 },
    { impulse: "Plate 3", active: false, index: 6 },
    { impulse: "Large Room", active: false, index: 7 },
    { impulse: "Medium Room", active: false, index: 8 },
    { impulse: "Small Room", active: false, index: 9 },
    { impulse: "Large Chamber", active: false, index: 10 },
    { impulse: "Medium Chamber", active: false, index: 11 },
    { impulse: "Small Chamber", active: false, index: 12 },
    { impulse: "Stage 1", active: false, index: 13 },
    { impulse: "Stage 2", active: false, index: 14 },
  ]);

  const [dryGainNode, dryGainControl] = useGain(audioCtx);
  const [wetGainNode, wetGainControl] = useGain(audioCtx);

  // Dry Wet Mix Controller Knob (1 means full wet)
  const setDryWetKnob = (value: number, setMain: any, main: any) => {
    setMain({
      ...main,
      FXUnitFunctions: {
        ...main.FXUnitFunctions,
        FXUnitUIStates: {
          ...main.FXUnitFunctions.FXUnitUIStates,
          dryWetKnob: value,
        },
      },
    });

    if (value > 0.5) {
      dryGainControl(1 - 2 * (value - 0.5));
      wetGainControl(1);
    } else {
      wetGainControl(1 - 2 * (0.5 - value));
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
    dropDownInfo: dropDownInfo,
    setDropDownInfo: setDropDownInfo,
  });

  return [FXUnitFunctions] as const;
};
export { useFXUnit };
