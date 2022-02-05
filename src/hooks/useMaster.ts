import { useEffect, useState } from "react";
import { useGain } from "./useGain";

const useMaster = (audioCtx: AudioContext) => {
  const [withoutCueNode, withoutCueNodeControl] = useGain(audioCtx);
  const [cueNode, cueNodeControl] = useGain(audioCtx);

  // Combine both withoutCueNode and cueNode into one so it's easier to connect & disconnect
  const [cueNodesCombined] = useGain(audioCtx);
  withoutCueNode.connect(cueNodesCombined);
  cueNode.connect(cueNodesCombined);

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

  const [boothNode, boothNodeControl] = useGain(audioCtx);
  const [masterNode, masterNodeControl] = useGain(audioCtx);
  const [headphonesNode, headphonesNodeControl] = useGain(audioCtx);

  // Put everything to export into an object
  const [masterFunctions] = useState({
    cueNode: cueNode,
    withoutCueNode: withoutCueNode,
    cueNodesCombined: cueNodesCombined,
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
