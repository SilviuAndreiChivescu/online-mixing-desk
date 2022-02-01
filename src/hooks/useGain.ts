const useGain = (audioCtx: AudioContext) => {
  // Create Gain Node
  const gainNode = audioCtx.createGain();
  const gainControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    gainNode.gain.value = parseFloat(value);
  };
  return [gainNode, gainControl];
};
export { useGain };
