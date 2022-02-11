import { useEffect, useState } from "react";

const useSoundMeter = (audioCtx: AudioContext, analyserNode: AnalyserNode) => {
  const [bufferLength] = useState(() => analyserNode.frequencyBinCount);
  const [dataArray] = useState(() => new Uint8Array(bufferLength));
  useEffect(() => {
    analyserNode.fftSize = 1024;
    analyserNode.smoothingTimeConstant = 0.85;
    analyserNode.getByteTimeDomainData(dataArray);
  }, []);

  // Draw a sound level meter
  const drawSoundLevel = (
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D
  ) => {
    analyserNode.getByteTimeDomainData(dataArray);
    // @ts-ignore
    const max = Math.max.apply(null, dataArray);
    // @ts-ignore
    const min = Math.min.apply(null, dataArray);
    let amp = max - min;
    amp /= 240;

    const colors = {
      accent: "#ff5500",
      fill: "#eeeeee",
      border: "#e3e3e3",
      mid: "#1af",
      black: "#000000",
      white: "#FFFFFF",
    };
    const bars = 8;
    const bar = {
      x: 0,
      y: 0,
      w: canvas.width,
      h: canvas.height / bars,
    };
    //converts amps to db
    const db = 20 * (Math.log(amp) / Math.log(10));
    if (canvasCtx !== null && canvasCtx) {
      canvasCtx.fillStyle = colors.fill;
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    }
    //scales: -40 to +10 db range => a number of bars
    const dboffset = Math.floor((db + 40) / (50 / bars));

    for (let i = 0; i < bars; i++) {
      // 0+ db is red
      if (i >= bars * 0.8) {
        canvasCtx.fillStyle = "#ff0000";
        // -5 to 0 db is yellow
      } else if (i < bars * 0.8 && i >= bars * 0.69) {
        canvasCtx.fillStyle = "#ffff00";
        // -40 to -5 db is green
      } else if (i < bars * 0.69) {
        canvasCtx.fillStyle = "#10ff00";
      }
      // draw bar
      if (i <= dboffset + 1) {
        canvasCtx.fillRect(
          1,
          canvas.height - bar.h * i,
          canvas.width - 2,
          bar.h - 2
        );
      }
    }
  };
  return { drawSoundLevel };
};

export { useSoundMeter };
