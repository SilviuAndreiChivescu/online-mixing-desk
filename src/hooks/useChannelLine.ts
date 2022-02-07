import { useEffect, useState } from "react";
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
  //*** UI states
  // AM RAMAS AICI, DEGEABA AM FACUT ATATEA USE STATES AICI DACA EU LE BAG DUPA IN OBJ, PT CA GEN DUPA OBJ ALA TRE MODIFICAT CU SETSATTE U LUI
  //   FA CE AM FKT CU EQ ON USPR PT TOATE PROB
  const [channelOn, setChannelOn] = useState(false);

  // UI STATES
  const [UI, setUI] = useState({
    eqOn: false,
    hpfOn: false,
    compressorOn: false,
    fxUnitOn: false,
    cueOn: false,
    // aici am ramas, sa continui checku, prob fx unit acu si dupa master filter etc..

    // todo change these (and below and at gain and slider and at compressor UI and at master filter UI) to correspond to actual defaults
    channelOn: channelOn, //todo this and below needs to be rethinked when I put to live audio
    setChannelOn: setChannelOn,
  });
  //*** END UI states

  // todo change this to live audio after testing
  const audioElement = new Audio("/assets/outfoxing.mp3");

  const play = () => {
    if (audioCtx.state === "running") return;
    audioCtx.resume();
    audioElement.play();
  };

  const pause = async () => {
    await audioCtx.suspend();

    audioElement.pause();
  };

  const audioSourceNode = audioCtx.createMediaElementSource(audioElement);
  const [channelGainNode, controlChannelGainNode] = useGain(audioCtx);
  const [sliderVolumeNode, controlSliderVolumeNode] = useGain(audioCtx);
  // todo, this needs to be changed to actual analyser node after testing, also in useEQ file change the type
  const [analyserNode] = useGain(audioCtx);
  const [pannerNode, controlPannerNode] = usePanner(audioCtx);

  // rest of the nodes are already connected inside the custom hooks that have them (by passing the node in the args)
  const [EQFunctions] = useEQ(audioCtx, analyserNode);
  const [HPFFunctions] = useHPF(audioCtx, EQFunctions.EQOutput);

  const [compressorFunctions] = useCompressor(audioCtx, pannerNode);
  const [FXUnitFunctions] = useFXUnit(
    audioCtx,
    compressorFunctions.compressorOutput
  );

  // Connections
  // The connections below need to be made in a useEffect hook because needs to be rerendered only at mounting, otherwise it breaks when rerenders
  const [connectionNode] = useGain(audioCtx);
  useEffect(() => {
    audioSourceNode.connect(channelGainNode).connect(analyserNode);
    HPFFunctions.HPFOutput.connect(pannerNode);
    FXUnitFunctions.FXUnitOutput.connect(sliderVolumeNode);
    sliderVolumeNode.connect(connectionNode);
  }, []);

  // Cue On
  const connectCue = () => {
    FXUnitFunctions.FXUnitOutput.connect(cueNode);
    connectionNode.connect(withoutCueNode);
  };

  // Cue Off
  const disconnectCue = () => {
    FXUnitFunctions.FXUnitOutput.disconnect();
    connectionNode.disconnect();
    FXUnitFunctions.FXUnitOutput.connect(sliderVolumeNode);
  };
  // todo I don't know if I really need these or I can just connect it as I have it
  // and only pause and play? or even better, see how it is for live audio
  // because before I had in the first useEffect I did not have as connected the audioSourceNode, so I
  // could use the below
  // Channel ON
  const connectChannel = () => {
    audioSourceNode.connect(channelGainNode);
  };

  // Channel OFF
  const disconnectChannel = () => {
    audioSourceNode.disconnect();
  };

  // Put everything to export into an object
  const [channelLineFunctions] = useState({
    play: play,
    pause: pause,
    connectCue: connectCue,
    disconnectCue: disconnectCue,
    connectChannel: connectChannel,
    disconnectChannel: disconnectChannel,
    sliderVolumeNode: sliderVolumeNode,
    controlSliderVolumeNode: controlSliderVolumeNode,
    controlPannerNode: controlPannerNode,
    controlChannelGainNode: controlChannelGainNode,
    EQFunctions: EQFunctions,
    HPFFunctions: HPFFunctions,
    compressorFunctions: compressorFunctions,
    FXUnitFunctions: FXUnitFunctions,
  });
  return [channelLineFunctions, UI, setUI] as const;
};
export { useChannelLine };
