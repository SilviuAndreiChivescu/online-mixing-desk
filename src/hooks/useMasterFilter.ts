import { useState } from "react";
import { useBiquadFilterResonant } from "./useBiquadFilter";
import { useGain } from "./useGain";

const useMasterFilter = (
  audioCtx: AudioContext,
  sliderVolumeNode: GainNode
) => {
  const [masterFilterOutput] = useGain(audioCtx);
  const [highPass, controlHighPassCutOff] = useBiquadFilterResonant(
    audioCtx,
    "highpass"
  );
  const [lowPass, controlLowPassCutOff] = useBiquadFilterResonant(
    audioCtx,
    "lowpass"
  );

  highPass.connect(lowPass).connect(masterFilterOutput);

  // Connect Master Filter
  const connectMasterFilter = () => {
    sliderVolumeNode.disconnect();

    sliderVolumeNode.connect(highPass);
  };

  // Disconnect Master Filter
  const disconnectMasterFilter = () => {
    sliderVolumeNode.disconnect();

    sliderVolumeNode.connect(masterFilterOutput);
  };

  // Put everything to export into an object
  const [masterFilterFunctions] = useState({
    masterFilterOutput: masterFilterOutput,
    controlHighPassCutOff: controlHighPassCutOff,
    controlLowPassCutOff: controlLowPassCutOff,
    connectMasterFilter: connectMasterFilter,
    disconnectMasterFilter: disconnectMasterFilter,
  });

  return [masterFilterFunctions] as const;
};
export { useMasterFilter };
