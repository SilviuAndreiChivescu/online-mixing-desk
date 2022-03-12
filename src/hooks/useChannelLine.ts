import { useEffect, useState } from "react";
import { useCompressor } from "./useCompressor";
import { useEQ } from "./useEQ";
import { useFXUnit } from "./useFXUnit";
import { useGain } from "./useGain";
import { useHPF } from "./useHPF";
import { usePanner } from "./usePanner";
import { useSoundMeter } from "./useSoundMeter";

const useChannelLine = (
  audioCtx: AudioContext,
  cueNode: GainNode,
  withoutCueNode: GainNode,
  sampleName: string
) => {
  const [UI, setUI] = useState({
    eqOn: false,
    hpfOn: false,
    compressorOn: false,
    fxUnitOn: false,
    cueOn: false,
    channelOn: false,
  });

  // These connections will be made based on the value of the buttons
  useEffect(() => {
    console.log("s");
    if (UI.eqOn) EQFunctions.connectEQ();
    else EQFunctions.disconnectEQ();
  }, [UI.eqOn]);

  useEffect(() => {
    if (UI.channelOn) connectChannel();
    else disconnectChannel();
  }, [UI.channelOn]);

  useEffect(() => {
    if (UI.hpfOn) HPFFunctions.connectHPF();
    else HPFFunctions.disconnectHPF();
  }, [UI.hpfOn]);

  useEffect(() => {
    if (UI.cueOn) connectCue();
    else disconnectCue();
  }, [UI.cueOn]);

  const [audioElement] = useState(
    () => new Audio(`/assets/samples/${sampleName}`)
  );
  const [audioSourceNode] = useState(() =>
    audioCtx.createMediaElementSource(audioElement)
  );

  const [analyserNode] = useState(() => audioCtx.createAnalyser());
  const { drawSoundLevel } = useSoundMeter(analyserNode);

  const [channelGainNode, controlChannelGainNode] = useGain(audioCtx);
  const [sliderVolumeNode, controlSliderVolumeNode] = useGain(audioCtx);
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
    channelGainNode.connect(analyserNode);
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

  const [inputConnectionNode] = useGain(audioCtx);
  // Channel ON
  const connectChannel = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          const microphone = audioCtx.createMediaStreamSource(stream);
          audioCtx.resume();
          microphone.connect(inputConnectionNode).connect(channelGainNode);
        })
        .catch((err) => {
          // browser unable to access microphone
          // (check to see if microphone is attached)
          console.log(err);
        });
    } else {
      // browser unable to access media devices
      // (update your browser)
      console.log("browser unable to access media devices");
    }
  };

  // Channel OFF
  const disconnectChannel = () => {
    inputConnectionNode.disconnect();
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
    EQFunctions: EQFunctions,
    HPFFunctions: HPFFunctions,
    compressorFunctions: compressorFunctions,
    FXUnitFunctions: FXUnitFunctions,
    drawSoundLevel: drawSoundLevel,
    audioElement: audioElement,
  });
  return [channelLineFunctions, UI, setUI] as const;
};
export { useChannelLine };
