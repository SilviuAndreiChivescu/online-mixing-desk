const useGain = (audioCtx: AudioContext) => {
  // Create Gain Node
  const gainNode = audioCtx.createGain();
  const gainControl = (gainValue: number) => {
    gainNode.gain.value = gainValue;
  };
  return [gainNode, gainControl];
};
export { useGain };
