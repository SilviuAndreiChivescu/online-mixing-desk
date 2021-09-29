// audio worklet will be usefull later on when multiple channels are needed

// could not make the gain reduction appear and re render, maybe useRef will help. I will try in the future
import { useEffect, useState } from "react";
import { useCompressor } from "./components/CompressorLogic";
import { useBiquadFilter } from "./components/FilterLogic";
import { useOscilloscope } from "./components/OscilloscopeLogic";

const useInit = (audioElement: HTMLAudioElement) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const sourceNode = audioCtx.createMediaElementSource(audioElement);

  // Gain
  const gainNode = audioCtx.createGain();
  const volumeControl = (volumeValue: number) => {
    gainNode.gain.value = volumeValue / 100; // divided by 100 due to range slider's value that can not be small as 0.01
  };

  // Panning
  const pannerOptions = { pan: 0 };
  const panner = new StereoPannerNode(audioCtx, pannerOptions);
  const pannerControl = (pannerValue: number) => {
    panner.pan.value = pannerValue / 100; // divided by 100 due to range slider's value that can not be small as 0.01
  };

  // Oscilloscope
  const { analyserNode, draw } = useOscilloscope(audioCtx);

  // Compressor Logic
  const { compressorControl } = useCompressor(
    audioCtx,
    gainNode,
    panner,
    analyserNode
  );

  // Biquad Filter Logic
  const { biquadFilterControl } = useBiquadFilter(
    audioCtx,
    panner,
    analyserNode
  );

  // the signal flow is actually different, its source -> gain -> filter(s) -> effects? -> compression -> panning -> output
  // Connect everything
  sourceNode
    .connect(gainNode) // Volume
    .connect(panner) // Pan
    .connect(analyserNode) // Oscilloscope
    .connect(audioCtx.destination); // Output

  return {
    volumeControl,
    pannerControl,
    compressorControl,
    biquadFilterControl,
    draw,
    audioCtx,
  };
};

// Play / pause audio.
const useAudio = (audioPath: string) => {
  const audioElement = new Audio(audioPath);

  // Get the functions from useInit
  const {
    volumeControl,
    pannerControl,
    compressorControl,
    biquadFilterControl,
    draw,
    audioCtx,
  } = useInit(audioElement);

  const play = () => {
    if (audioCtx.state === "running") return;
    audioCtx.resume();

    audioElement.play();
  };

  const pause = async () => {
    await audioCtx.suspend();

    audioElement.pause();
  };

  return {
    play,
    pause,
    volumeControl,
    pannerControl,
    compressorControl,
    biquadFilterControl,
    draw,
  };
};

export { useAudio, useInit };
