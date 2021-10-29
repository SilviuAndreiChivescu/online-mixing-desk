const useReverb = (audioCtx: AudioContext) => {
  const getImpulseBuffer = (audioCtx: AudioContext, impulseUrl: string) => {
    return fetch(impulseUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer));
  };

  const convolver = audioCtx.createConvolver();

  const chooseImpulse = async (impulseUrl: string) => {
    try {
      convolver.buffer = await getImpulseBuffer(audioCtx, impulseUrl);
      console.log(`using ${impulseUrl}`);
    } catch (err) {
      console.log(err);
    }
  };

  chooseImpulse("LargeHall.mp3");

  return { convolver, chooseImpulse };
};

export { useReverb };
