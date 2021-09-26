// for cross browser ( '|| window.webkitAudioContext' has been deleted from below due to ts error)

const useInit = () => {
  const AudioContext = window.AudioContext;
  const audioCtx = new AudioContext();

  // volume
  const gainNode = audioCtx.createGain();
  const volumeControl = (volumeValue: number) => {
    gainNode.gain.value = volumeValue / 100; // divided by 100 due to range slider's value that can not be small as 0.01
  };

  // panning
  const pannerOptions = { pan: 0 };
  const panner = new StereoPannerNode(audioCtx, pannerOptions);
  const pannerControl = (pannerValue: number) => {
    panner.pan.value = pannerValue / 100; // divided by 100 due to range slider's value that can not be small as 0.01
  };

  // Init function
  const init = (audioElement: HTMLAudioElement) => {
    const track = audioCtx.createMediaElementSource(audioElement);
    track.connect(gainNode).connect(panner).connect(audioCtx.destination);

    return { audioCtx };
  };

  return { volumeControl, pannerControl, init };
};

const useAudio = (audioPath: string) => {
  const audioElement = new Audio(audioPath);

  const { volumeControl, pannerControl, init } = useInit();
  const { audioCtx } = init(audioElement);

  const play = () => {
    if (audioCtx.state === "suspended") audioCtx.resume();
    audioElement.play();
  };

  const pause = () => {
    audioElement.pause();
  };

  return { play, pause, volumeControl, pannerControl };
};

export { useAudio, useInit };
