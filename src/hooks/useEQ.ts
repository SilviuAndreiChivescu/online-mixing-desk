import { useEffect, useState } from "react";
import { useBiquadFilterNonResonant } from "./useBiquadFilter";
import { useGain } from "./useGain";

// todo AnalyserNode as type for below where any after testing
const useEQ = (audioCtx: AudioContext, analyserNode: any) => {
  const [EQOutput] = useGain(audioCtx);
  const [high, controlHigh] = useBiquadFilterNonResonant(
    audioCtx,
    3200,
    "highshelf"
  );
  const [mid, controlMid] = useBiquadFilterNonResonant(
    audioCtx,
    1000,
    "peaking"
  );
  const [low, controlLow] = useBiquadFilterNonResonant(
    audioCtx,
    320,
    "lowshelf"
  );

  useEffect(() => {
    // Connections
    high.connect(mid).connect(low).connect(EQOutput);
  }, []);

  // Connect EQ
  const connectEQ = () => {
    analyserNode.connect(high);
  };

  // Disconnect EQ
  const disconnectEQ = () => {
    analyserNode.disconnect();

    analyserNode.connect(EQOutput);
  };

  // Put everything to export into an object
  const [EQFunctions] = useState({
    EQControl: {
      controlHigh: controlHigh,
      controlMid: controlMid,
      controlLow: controlLow,
    },
    connectEQ: connectEQ,
    disconnectEQ: disconnectEQ,
    EQOutput: EQOutput,
  });

  return [EQFunctions] as const;
};
export { useEQ };
