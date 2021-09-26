// for cross browser ( '|| window.webkitAudioContext' has been deleted from below due to ts error)

const useInit = () => {
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

  // Init function
  const init = (audioElement: HTMLAudioElement) => {
    const sourceNode = audioCtx.createMediaElementSource(audioElement);

    // Connect everything
    sourceNode
      .connect(gainNode) // Volume
      .connect(panner) // Pan
      .connect(analyserNode) // Oscilloscope
      .connect(audioCtx.destination); // Destionation

    return { audioCtx };
  };

  return { volumeControl, pannerControl, draw, init };
};

// Play / pause audio.
const useAudio = (audioPath: string) => {
  const audioElement = new Audio(audioPath);

  // Get the functions from useInit
  const { volumeControl, pannerControl, draw, init } = useInit();
  // Init the audio source
  const { audioCtx } = init(audioElement);

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
    draw,
  };
};

export { useAudio, useInit };
