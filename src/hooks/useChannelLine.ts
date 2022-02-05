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
  //*** UI states
  const [channelOn, setChannelOn] = useState(false);
  const [eqOn, setEqOn] = useState(false);
  const [eqValues, setEqValues] = useState({ hi: 0.5, mid: 0.5, low: 0.5 }); // todo change these (and below and at gain and slider and at compressor UI and at master filter UI) to correspond to actual defaults
  const [hpfOn, setHpfOn] = useState(false);
  const [hpfValue, setHpfValue] = useState(0);
  const [cueOn, setCueOn] = useState(false);
  const [gainValue, setGainValue] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  // ** Compressor UI
  // dry wet knob state is already comning from compressor hook
  const [compressorOn, setCompressorOn] = useState(false);
  const [thresholdValue, setThresholdValue] = useState(0);
  const [ratioValue, setRatioValue] = useState(0);
  const [releaseValue, setReleaseValue] = useState(0);
  const [attackValue, setAttackValue] = useState(0);
  // ** END Compressor UI

  // ** FXUnit UI todo delete later
  // dry wet knob state is already comning from FXUnit hook
  const [fxUnitOn, setFxUnitOn] = useState(false);
  // ** END FXUnit UI

  // EXPORT ALL UI STATES IN AN OBJ
  const [UI] = useState({
    channelOn: channelOn,
    setChannelOn: setChannelOn,
    eqOn: eqOn,
    setEqOn: setEqOn,
    eqValues: eqValues,
    setEqValues: eqValues,
    hpfOn: hpfOn,
    setHpfOn: setHpfOn,
    hpfValue: hpfValue,
    setHpfValue: setHpfValue,
    cueOn: cueOn,
    setCueOn: setCueOn,
    gainValue: gainValue,
    setGainValue: setGainValue,
    sliderValue: sliderValue,
    setSliderValue: setSliderValue,
    compressorOn: compressorOn,
    setCompressorOn: setCompressorOn,
    fxUnitOn: fxUnitOn,
    setFxUnitOn: setFxUnitOn,
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
  // audioSource works, try with different connections, if u connect master filter etc
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

  // todo I don't know if I really need these or I can just connect it as I have it
  // and only pause and play? or even better, see how it is for live audio

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
  return [channelLineFunctions, UI] as const;
};
export { useChannelLine };
