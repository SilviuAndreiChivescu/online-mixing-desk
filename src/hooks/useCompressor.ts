import { useEffect, useState } from "react";
import { useGain } from "./useGain";

const useCompressor = (
  audioCtx: AudioContext,
  pannerNode: StereoPannerNode
) => {
  const [compressorOutput] = useGain(audioCtx);
  const [compressor] = useState(() => audioCtx.createDynamicsCompressor());
  // Control Compressor's Params: Threshold, Knee, Ratio, Attack, Release
  const compressorControl = (
    e: React.ChangeEvent<HTMLInputElement>,
    setMain: any,
    main: any
  ) => {
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

    switch (id) {
      case "threshold":
        setMain({
          ...main,
          compressorFunctions: {
            ...main.compressorFunctions,
            compressorUIStates: {
              ...main.compressorFunctions.compressorUIStates,
              threshold: parseFloat(value),
            },
          },
        });
        break;
      case "knee":
        setMain({
          ...main,
          compressorFunctions: {
            ...main.compressorFunctions,
            compressorUIStates: {
              ...main.compressorFunctions.compressorUIStates,
              knee: parseFloat(value),
            },
          },
        });
        break;
      case "ratio":
        setMain({
          ...main,
          compressorFunctions: {
            ...main.compressorFunctions,
            compressorUIStates: {
              ...main.compressorFunctions.compressorUIStates,
              ratio: parseFloat(value),
            },
          },
        });
        break;
      case "release":
        setMain({
          ...main,
          compressorFunctions: {
            ...main.compressorFunctions,
            compressorUIStates: {
              ...main.compressorFunctions.compressorUIStates,
              release: parseFloat(value),
            },
          },
        });
        break;
      case "attack":
        setMain({
          ...main,
          compressorFunctions: {
            ...main.compressorFunctions,
            compressorUIStates: {
              ...main.compressorFunctions.compressorUIStates,
              attack: parseFloat(value),
            },
          },
        });
        break;
    }
  };

  // States to use for changing compressor
  const [compressorUIStates] = useState({
    threshold: compressor.threshold.value,
    knee: compressor.knee.value,
    ratio: compressor.ratio.value,
    attack: 0.1,
    release: compressor.release.value,
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
      compressorFunctions: {
        ...main.compressorFunctions,
        compressorUIStates: {
          ...main.compressorFunctions.compressorUIStates,
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
    compressor.connect(wetGainNode).connect(compressorOutput);

    dryGainNode.connect(compressorOutput);
  }, []);

  // Connect compressor
  const connectCompressor = () => {
    pannerNode.disconnect();

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
    compressorUIStates: compressorUIStates,
    connectCompressor: connectCompressor,
    disconnectCompressor: disconnectCompressor,
    setDryWetKnob: setDryWetKnob,
    compressorOutput: compressorOutput,
  });

  return [compressorFunctions] as const;
};

export { useCompressor };
