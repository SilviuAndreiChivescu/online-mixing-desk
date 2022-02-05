import { useState } from "react";
import { useBiquadFilterResonant } from "./useBiquadFilter";
import { useGain } from "./useGain";

const useHPF = (audioCtx: AudioContext, EQOutput: GainNode) => {
  const [HPFOutput] = useGain(audioCtx);
  const [highPass, controlHighPassCutOff] = useBiquadFilterResonant(
    audioCtx,
    "highpass"
  );

  // Connect HPF
  const connectHPF = () => {
    EQOutput.connect(highPass).connect(HPFOutput);
  };

  // Disconnect HPF
  const disconnectHPF = () => {
    EQOutput.disconnect();

    EQOutput.connect(HPFOutput);
  };

  // Put everything to export into an object
  const [HPFFunctions] = useState({
    controlHighPassCutOff: controlHighPassCutOff,
    connectHPF: connectHPF,
    disconnectHPF: disconnectHPF,
    HPFOutput: HPFOutput,
  });
  return [HPFFunctions] as const;
};
export { useHPF };
