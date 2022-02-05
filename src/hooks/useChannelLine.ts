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
  const [eqValues, setEqValues] = useState({ hi: 0.5, mid: 0.5, low: 0.5 }); // todo change these (and below and at gain and slider) to correspond to actual defaults
  const [hpfValue, setHpfValue] = useState(0);
  const [sendsValue, setSendsValue] = useState({
    compressor: false,
    fxUnit: false,
  });
  const [cueOn, setCueOn] = useState(false);
  const [gainValue, setGainValue] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  // EXPORT ALL UI STATES IN AN OBJ
  const [UI] = useState({
    channelOn: channelOn,
    setChannelOn: setChannelOn,
    eqOn: eqOn,
    setEqOn: setEqOn,
    eqValues: eqValues,
    setEqValues: eqValues,
    hpfValue: hpfValue,
    setHpfValue: setHpfValue,
    sendsValue: sendsValue,
    setSendsValue: setSendsValue,
    cueOn: cueOn,
    setCueOn: setCueOn,
    gainValue: gainValue,
    setGainValue: setGainValue,
    sliderValue: sliderValue,
    setSliderValue: setSliderValue,
  });
  //*** END UI states

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
  channelGainNode.connect(analyserNode);

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
    connectCue: connectCue,
    disconnectCue: disconnectCue,
    connectChannel: connectChannel,
    disconnectChannel: disconnectChannel,
    sliderVolumeNode: sliderVolumeNode,
    controlSliderVolumeNode: controlSliderVolumeNode,
    controlPannerNode: controlPannerNode,
    controlChannelGainNode: controlChannelGainNode,
  });
  return [channelLineFunctions, UI] as const;
};
export { useChannelLine };
