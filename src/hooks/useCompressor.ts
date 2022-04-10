import { useEffect, useRef, useState } from "react";
import { useGain } from "./useGain";

const useCompressor = (
  audioCtx: AudioContext,
  pannerNode: StereoPannerNode
) => {
  const [compressorOutput] = useGain(audioCtx);
  const [compressor] = useState(() => audioCtx.createDynamicsCompressor());
  const compressorControlThreshold = (
    value: number,
    setMain: any,
    main: any
  ) => {
    compressor["threshold"].value = value;
    setMain({
      ...main,
      compressorFunctions: {
        ...main.compressorFunctions,
        compressorUIStates: {
          ...main.compressorFunctions.compressorUIStates,
          threshold: value,
        },
      },
    });
  };

  const compressorControlKnee = (value: number, setMain: any, main: any) => {
    compressor["knee"].value = value;
    setMain({
      ...main,
      compressorFunctions: {
        ...main.compressorFunctions,
        compressorUIStates: {
          ...main.compressorFunctions.compressorUIStates,
          knee: value,
        },
      },
    });
  };

  const compressorControlRatio = (value: number, setMain: any, main: any) => {
    compressor["ratio"].value = value;
    setMain({
      ...main,
      compressorFunctions: {
        ...main.compressorFunctions,
        compressorUIStates: {
          ...main.compressorFunctions.compressorUIStates,
          ratio: value,
        },
      },
    });
  };

  const compressorControlAttack = (value: number, setMain: any, main: any) => {
    compressor["attack"].value = value;
    setMain({
      ...main,
      compressorFunctions: {
        ...main.compressorFunctions,
        compressorUIStates: {
          ...main.compressorFunctions.compressorUIStates,
          attack: value,
        },
      },
    });
  };

  const compressorControlRelease = (value: number, setMain: any, main: any) => {
    compressor["release"].value = value;
    setMain({
      ...main,
      compressorFunctions: {
        ...main.compressorFunctions,
        compressorUIStates: {
          ...main.compressorFunctions.compressorUIStates,
          release: value,
        },
      },
    });
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
  const setDryWetKnob = (value: number, setMain: any, main: any) => {
    setMain({
      ...main,
      compressorFunctions: {
        ...main.compressorFunctions,
        compressorUIStates: {
          ...main.compressorFunctions.compressorUIStates,
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
    compressorControlThreshold: compressorControlThreshold,
    compressorControlKnee: compressorControlKnee,
    compressorControlRatio: compressorControlRatio,
    compressorControlAttack: compressorControlAttack,
    compressorControlRelease: compressorControlRelease,
    compressorUIStates: compressorUIStates,
    connectCompressor: connectCompressor,
    disconnectCompressor: disconnectCompressor,
    setDryWetKnob: setDryWetKnob,
    compressorOutput: compressorOutput,
    compressor: compressor,
  });

  return [compressorFunctions] as const;
};

export { useCompressor };
