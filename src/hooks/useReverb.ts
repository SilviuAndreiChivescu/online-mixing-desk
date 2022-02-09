import { useEffect, useState } from "react";

const useReverb = (audioCtx: AudioContext) => {
  const getImpulseBuffer = (audioCtx: AudioContext, impulseUrl: string) => {
    return fetch(impulseUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer));
  };

  const [convolver] = useState(() => audioCtx.createConvolver());

  const chooseImpulse = async (impulseUrl: string) => {
    try {
      convolver.buffer = await getImpulseBuffer(
        audioCtx,
        `/assets/impulses/${impulseUrl}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    chooseImpulse("LargeHall.wav");
  }, []);

  return [convolver, chooseImpulse] as const;
};

export { useReverb };
