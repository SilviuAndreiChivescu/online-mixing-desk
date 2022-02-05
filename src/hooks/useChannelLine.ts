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
  // TESTEAZA ACU EQ CA MERGE SIGURO
  const [channelOn, setChannelOn] = useState(false);
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

  // UI STATES
  const [UI, setUI] = useState({
    eqOn: false,
    // AM RAMAS AICI, AM REALIZAT CA TRE SA FAC STATE U AICI, NU SA FAC UN USESTATE ABOVE SI SA INCERC SA PUN STATU AICI DUPA HAHA
    // SI ACU AM TERMINAT DE VERIFICAT EQ SI MERGE BLANA BOMBA, CONTINUA DE AICI CU VERIFICATU SI FA CLEAN UP SI MODIFICARI AS NEEDED
    // GL HF, BE PROUD!
    // I had here eqValues, but I found out that I can use the state inside the myrangeslider with ease
    // todo change these (and below and at gain and slider and at compressor UI and at master filter UI) to correspond to actual defaults
    channelOn: channelOn,
    setChannelOn: setChannelOn,
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
  useEffect(() => {
    audioSourceNode.connect(channelGainNode).connect(analyserNode);
    HPFFunctions.HPFOutput.connect(pannerNode);
    FXUnitFunctions.FXUnitOutput.connect(sliderVolumeNode);
  }, []);

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
  return [channelLineFunctions, UI, setUI] as const;
};
export { useChannelLine };
