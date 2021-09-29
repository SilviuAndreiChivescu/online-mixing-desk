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
  const gainControl = (gainValue: number) => {
    gainNode.gain.value = gainValue;
  };

  // Panning
  const panner = new StereoPannerNode(audioCtx, { pan: 0 });
  const pannerControl = (pannerValue: number) => {
    panner.pan.value = pannerValue;
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
    gainControl,
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
    gainControl,
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
    gainControl,
    pannerControl,
    compressorControl,
    biquadFilterControl,
    draw,
  };
};

export { useAudio, useInit };
