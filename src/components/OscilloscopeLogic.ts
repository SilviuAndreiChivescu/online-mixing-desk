const useOscilloscope = (audioCtx: AudioContext) => {
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
  return { analyserNode, draw };
};

export { useOscilloscope };
