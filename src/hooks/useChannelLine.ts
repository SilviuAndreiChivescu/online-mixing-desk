import { useState } from "react";
import { useCompressor } from "./useCompressor";
import { useEQ } from "./useEQ";
import { useFXUnit } from "./useFXUnit";
import { useGain } from "./useGain";
import { useHPF } from "./useHPF";
import { usePanner } from "./usePanner";

const useChannelLine = (
  audioCtx: AudioContext,
  cueNode: GainNode,
  withoutCueNode: GainNode
) => {
  // todo change this to live audio after testing
  const audioElement = new Audio("/assets/outfoxing.mp3");
  const audioSourceNode = audioCtx.createMediaElementSource(audioElement);
  const [channelGainNode, controlChannelGainNode] = useGain(audioCtx);
  const [sliderVolumeNode, controlSliderVolumeNode] = useGain(audioCtx);

  // todo, this needs to be changed to actual analyser node after testing, also in useEQ file change the type
  const [analyserNode] = useGain(audioCtx);
  const [pannerNode, controlPannerNode] = usePanner(audioCtx);
  const [compressorFunctions] = useCompressor(audioCtx, pannerNode);
  const [EQFunctions] = useEQ(audioCtx, analyserNode);
  const [HPFFunctions] = useHPF(audioCtx, EQFunctions.EQOutput);
  const [FXUnitFunctions] = useFXUnit(
    audioCtx,
    compressorFunctions.compressorOutput
  );

  // Connections
  // rest of the nodes are already connected inside the custom hooks that have them
  audioSourceNode.connect(channelGainNode).connect(analyserNode);

  HPFFunctions.HPFOutput.connect(pannerNode);

  FXUnitFunctions.FXUnitOutput.connect(sliderVolumeNode);

  // Cue On
  const connectCue = () => {
    FXUnitFunctions.FXUnitOutput.connect(cueNode);
    sliderVolumeNode.connect(withoutCueNode);
  };

  // Cue Off
  const disconnectCue = () => {
    FXUnitFunctions.FXUnitOutput.disconnect(cueNode);
    sliderVolumeNode.disconnect(withoutCueNode);
  };

  // Put everything to export into an object
  const [channelLineFunctions] = useState({
    connectCue: connectCue,
    disconnectCue: disconnectCue,
    sliderVolumeNode: sliderVolumeNode,
    controlSliderVolumeNode: controlSliderVolumeNode,
    controlPannerNode: controlPannerNode,
    controlChannelGainNode: controlChannelGainNode,
  });
  return [channelLineFunctions] as const;
};
export { useChannelLine };
