import { useEffect } from "react";

//TODO delete below where cmomented
const useReverb = (audioCtx: AudioContext) => {
  const getImpulseBuffer = (audioCtx: AudioContext, impulseUrl: string) => {
    return fetch(impulseUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer));
  };

  const convolver = audioCtx.createConvolver();

  const chooseImpulse = async (impulseUrl: string) => {
    try {
      convolver.buffer = await getImpulseBuffer(
        audioCtx,
        `/assets/impulses/${impulseUrl}`
      );
      console.log(`using ${impulseUrl}`); // this probably needs deleted
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    chooseImpulse("LargeHall.wav"); // this probably needs deleted or changed (needs to be the value from the checkbox on UI)
  }, []);

  return [convolver, chooseImpulse] as const;
};

export { useReverb };
