import { useState } from "react";

const usePanner = (audioCtx: AudioContext) => {
  const [panner] = useState(() => new StereoPannerNode(audioCtx, { pan: 0 }));
  const pannerControl = (pannerValue: number) => {
    panner.pan.value = pannerValue;
  };
  return [panner, pannerControl] as const;
};
export { usePanner };
