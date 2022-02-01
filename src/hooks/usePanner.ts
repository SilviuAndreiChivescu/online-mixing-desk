const usePanner = (audioCtx: AudioContext) => {
  const panner = new StereoPannerNode(audioCtx, { pan: 0 });
  const pannerControl = (pannerValue: number) => {
    panner.pan.value = pannerValue;
  };
  return [panner, pannerControl];
};
export { usePanner };
