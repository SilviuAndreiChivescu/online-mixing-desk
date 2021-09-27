// for cross browser ( '|| window.webkitAudioContext' has been deleted from below due to ts error)
// audio worklet will be usefull later on when multiple channels are needed
// I have thought about: all this volume, pan, compression, controlers can be custom hooks, TBC

// could not make the gain reduction appear and re render, maybe useRef will help. I will try in the future
import { useEffect, useState } from "react";

const useInit = (audioElement: HTMLAudioElement) => {
  const AudioContext = window.AudioContext;
  const audioCtx = new AudioContext();

  // Volume
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

  // Compressor
  const compressor = audioCtx.createDynamicsCompressor();
  // Compressor control
  const compressorThreshold = (thresholdValue: number) => {
    compressor.threshold.value = thresholdValue / 100;
  };
  const compressorKnee = (kneeValue: number) => {
    compressor.knee.value = kneeValue / 100;
  };
  const compressorRatio = (ratioValue: number) => {
    compressor.ratio.value = ratioValue / 100;
  };
  const compressorAttack = (attackValue: number) => {
    compressor.attack.value = attackValue / 100;
  };
  const compressorRelease = (releaseValue: number) => {
    compressor.release.value = releaseValue / 100;
  };
  // Connect compressor
  const connectCompressor = () => {
    panner.disconnect(analyserNode);
    panner.connect(compressor);
    compressor.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
  };
  // Disconnect compressor
  const disconnectCompressor = () => {
    panner.disconnect(compressor);
    panner.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
  };
  const [compressorControl] = useState({
    compressorThreshold: compressorThreshold,
    compressorKnee: compressorKnee,
    compressorRatio: compressorRatio,
    compressorAttack: compressorAttack,
    compressorRelease: compressorRelease,
    connectCompressor: connectCompressor,
    disconnectCompressor: disconnectCompressor,
  });
  // END Compressor

  // Oscilloscope
  const analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 2048;
  var bufferLength = analyserNode.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyserNode.getByteTimeDomainData(dataArray);
  // Draw an oscilloscope of the current audio source
  const draw = (
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D
  ) => {
    analyserNode.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    var sliceWidth = (canvas.width * 1.0) / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 256;
      var y = canvas.height - v * canvas.height - 1;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  };

  const sourceNode = audioCtx.createMediaElementSource(audioElement);

  // Connect everything
  sourceNode.connect(gainNode); // Volume
  gainNode.connect(panner); // Pan
  panner.connect(analyserNode); // Oscilloscope
  analyserNode.connect(audioCtx.destination); // Output

  return {
    volumeControl,
    pannerControl,
    compressorControl,
    draw,

    audioCtx,
  };
};

// Play / pause audio.
const useAudio = (audioPath: string) => {
  const audioElement = new Audio(audioPath);

  // Get the functions from useInit
  const { volumeControl, pannerControl, compressorControl, draw, audioCtx } =
    useInit(audioElement);

  const play = async () => {
    if (audioCtx.state === "running") return;
    await audioCtx.resume();

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
    draw,
  };
};

export { useAudio, useInit };
