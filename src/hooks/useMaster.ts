import { useEffect, useState } from "react";
import { useGain } from "./useGain";

const useMaster = (audioCtx: AudioContext) => {
  const [withoutCueNode, withoutCueNodeControl] = useGain(audioCtx);
  const [cueNode, cueNodeControl] = useGain(audioCtx);
  const [boothNode, boothNodeControl] = useGain(audioCtx);
  const [masterNode, masterNodeControl] = useGain(audioCtx);
  const [headphonesNode, headphonesNodeControl] = useGain(audioCtx);

  // Cue Mix Controller Knob (100 means full master (without cue))
  const [cueMixKnob, setCueMixKnob] = useState(0.5);
  useEffect(() => {
    if (cueMixKnob > 0.5) {
      cueNodeControl(1 - 2 * (cueMixKnob - 0.5));
      withoutCueNodeControl(1);
    } else {
      withoutCueNodeControl(1 - 2 * (0.5 - cueMixKnob));
      cueNodeControl(1);
    }
  }, [cueMixKnob]);

  // Put everything to export into an object
  const [masterFunctions] = useState({
    withoutCueNode: withoutCueNode,
    cueNode: cueNode,
    booth: {
      node: boothNode,
      control: boothNodeControl,
    },
    master: {
      node: masterNode,
      control: masterNodeControl,
    },
    headphones: {
      node: headphonesNode,
      control: headphonesNodeControl,
    },
    cueMix: {
      cueMixKnob: cueMixKnob,
      setCueMixKnob: setCueMixKnob,
    },
  });
  return [masterFunctions] as const;
};
export { useMaster };
