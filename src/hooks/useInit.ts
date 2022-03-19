import { useEffect, useState } from "react";
import { useChannelLine } from "./useChannelLine";
import { useGain } from "./useGain";
import { useMaster } from "./useMaster";
import { useMasterFilter } from "./useMasterFilter";
// dupa prob testing la scl despre cue and booth singal and stuff? (test first on my pc to get my audio etc)
const useInit = () => {
  const [AudioContext] = useState(
    () => window.AudioContext || window.webkitAudioContext
  );
  const [audioCtx] = useState(() => new AudioContext());

  const [masterFunctions] = useMaster(audioCtx);

  const [channelOneFunctions, channelOneUI, setChannelOneUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode,
    "awayPad.wav"
  );

  const [channelTwoFunctions, channelTwoUI, setChannelTwoUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode,
    "bass.wav"
  );

  const [channelThreeFunctions, channelThreeUI, setChannelThreeUI] =
    useChannelLine(
      audioCtx,
      masterFunctions.cueNode,
      masterFunctions.withoutCueNode,
      "hiHat.wav"
    );

  const [channelFourFunctions, channelFourUI, setChannelFourUI] =
    useChannelLine(
      audioCtx,
      masterFunctions.cueNode,
      masterFunctions.withoutCueNode,
      "kick.wav"
    );

  const [channelFiveFunctions, channelFiveUI, setChannelFiveUI] =
    useChannelLine(
      audioCtx,
      masterFunctions.cueNode,
      masterFunctions.withoutCueNode,
      "synth.wav"
    );

  const [channelSixFunctions, channelSixUI, setChannelSixUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode,
    "vocal.wav"
  );

  // Combine all audio signal coming from each channel to pass to masterFilter as one
  const [sliderVolumeNodesCombined] = useGain(audioCtx);
  useEffect(() => {
    channelOneFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
    channelTwoFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
    channelThreeFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
    channelFourFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
    channelFiveFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
    channelSixFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
  }, []);

  const [masterFilterFunctions] = useMasterFilter(
    audioCtx,
    sliderVolumeNodesCombined
  );

  const [masterFilterCueFunctions] = useMasterFilter(
    audioCtx,
    masterFunctions.cueNodesCombined
  );

  const [masterFilterOn, setMasterFilterOn] = useState(false);
  const [masterFilterToExport] = useState({
    masterFilterFunctions: masterFilterFunctions,
    masterFilterCueFunctions: masterFilterCueFunctions,
    setMasterFilterOn: setMasterFilterOn,
  });

  // Control "Play / Pause / Stop"
  const play = () => {
    audioCtx.resume();
    // channelOneFunctions.audioElement.start(0);
    // channelTwoFunctions.audioElement.start(0);
    // channelThreeFunctions.audioElement.start(0);
    // channelFourFunctions.audioElement.start(0);
    // channelFiveFunctions.audioElement.start(0);
    // channelSixFunctions.audioElement.start(0);
  };

  const pause = () => {
    audioCtx.suspend();
    // channelOneFunctions.audioElement.stop();
    // channelTwoFunctions.audioElement.stop();
    // channelThreeFunctions.audioElement.stop();
    // channelFourFunctions.audioElement.stop();
    // channelFiveFunctions.audioElement.stop();
    // channelSixFunctions.audioElement.stop();
  };

  const replay = () => {
    audioCtx.close();
    // channelOneFunctions.audioElement.load();
    // channelTwoFunctions.audioElement.load();
    // channelThreeFunctions.audioElement.load();
    // channelFourFunctions.audioElement.load();
    // channelFiveFunctions.audioElement.load();
    // channelSixFunctions.audioElement.load();
  };

  // Below states are used to control all compressors
  const [main, setMain] = useState({
    setChannelUI: setChannelOneUI,
    channelUI: channelOneUI,
    compressorFunctions: channelOneFunctions.compressorFunctions,
  });

  const [channel1, setChannel1] = useState({
    setChannelUI: setChannelOneUI,
    channelUI: channelOneUI,
    compressorFunctions: channelOneFunctions.compressorFunctions,
  });

  const [channel2, setChannel2] = useState({
    setChannelUI: setChannelTwoUI,
    channelUI: channelTwoUI,
    compressorFunctions: channelTwoFunctions.compressorFunctions,
  });

  const [channel3, setChannel3] = useState({
    setChannelUI: setChannelThreeUI,
    channelUI: channelThreeUI,
    compressorFunctions: channelThreeFunctions.compressorFunctions,
  });

  const [channel4, setChannel4] = useState({
    setChannelUI: setChannelFourUI,
    channelUI: channelFourUI,
    compressorFunctions: channelFourFunctions.compressorFunctions,
  });

  const [channel5, setChannel5] = useState({
    setChannelUI: setChannelFiveUI,
    channelUI: channelFiveUI,
    compressorFunctions: channelFiveFunctions.compressorFunctions,
  });

  const [channel6, setChannel6] = useState({
    setChannelUI: setChannelSixUI,
    channelUI: channelSixUI,
    compressorFunctions: channelSixFunctions.compressorFunctions,
  });

  // The state below is used to change values of compressors in between channels
  const [whichCompressor, setWhichCompressor] = useState(1);
  useEffect(() => {
    switch (whichCompressor) {
      case 1:
        setChannel1(main);
        break;

      case 2:
        setChannel2(main);
        break;

      case 3:
        setChannel3(main);
        break;

      case 4:
        setChannel4(main);
        break;

      case 5:
        setChannel5(main);
        break;

      case 6:
        setChannel6(main);
        break;
    }
  }, [
    main.channelUI.compressorOn,
    main.compressorFunctions.compressorUIStates,
  ]);
  const controlWhichChannel = (channel: string) => {
    switch (parseInt(channel)) {
      case 1:
        setMain(channel1);
        setWhichCompressor(1);
        break;

      case 2:
        setMain(channel2);
        setWhichCompressor(2);
        break;

      case 3:
        setMain(channel3);
        setWhichCompressor(3);
        break;

      case 4:
        setMain(channel4);
        setWhichCompressor(4);
        break;

      case 5:
        setMain(channel5);
        setWhichCompressor(5);
        break;

      case 6:
        setMain(channel6);
        setWhichCompressor(6);
        break;
    }
  };

  // The state below is used to change values of FXUnits in between channels
  const [mainFXUnit, setMainFXUnit] = useState({
    setChannelUI: setChannelOneUI,
    channelUI: channelOneUI,
    FXUnitFunctions: channelOneFunctions.FXUnitFunctions,
  });

  const [channel1FX, setChannel1FX] = useState({
    setChannelUI: setChannelOneUI,
    channelUI: channelOneUI,
    FXUnitFunctions: channelOneFunctions.FXUnitFunctions,
  });

  const [channel2FX, setChannel2FX] = useState({
    setChannelUI: setChannelTwoUI,
    channelUI: channelTwoUI,
    FXUnitFunctions: channelTwoFunctions.FXUnitFunctions,
  });

  const [channel3FX, setChannel3FX] = useState({
    setChannelUI: setChannelThreeUI,
    channelUI: channelThreeUI,
    FXUnitFunctions: channelThreeFunctions.FXUnitFunctions,
  });

  const [channel4FX, setChannel4FX] = useState({
    setChannelUI: setChannelFourUI,
    channelUI: channelFourUI,
    FXUnitFunctions: channelFourFunctions.FXUnitFunctions,
  });

  const [channel5FX, setChannel5FX] = useState({
    setChannelUI: setChannelFiveUI,
    channelUI: channelFiveUI,
    FXUnitFunctions: channelFiveFunctions.FXUnitFunctions,
  });

  const [channel6FX, setChannel6FX] = useState({
    setChannelUI: setChannelSixUI,
    channelUI: channelSixUI,
    FXUnitFunctions: channelSixFunctions.FXUnitFunctions,
  });

  const [whichFXUnit, setWhichFXUnit] = useState(1);
  useEffect(() => {
    switch (whichFXUnit) {
      case 1:
        setChannel1FX(mainFXUnit);
        break;

      case 2:
        setChannel2FX(mainFXUnit);
        break;

      case 3:
        setChannel3FX(mainFXUnit);
        break;

      case 4:
        setChannel4FX(mainFXUnit);
        break;

      case 5:
        setChannel5FX(mainFXUnit);
        break;

      case 6:
        setChannel6FX(mainFXUnit);
        break;
    }
  }, [
    mainFXUnit.channelUI.fxUnitOn,
    mainFXUnit.FXUnitFunctions.FXUnitUIStates,
    ...mainFXUnit.FXUnitFunctions.dropDownInfo,
  ]);

  const controlWhichFXUnit = (channel: string) => {
    switch (parseInt(channel)) {
      case 1:
        setMainFXUnit(channel1FX);
        setWhichFXUnit(1);
        break;

      case 2:
        setMainFXUnit(channel2FX);
        setWhichFXUnit(2);
        break;

      case 3:
        setMainFXUnit(channel3FX);
        setWhichFXUnit(3);
        break;

      case 4:
        setMainFXUnit(channel4FX);
        setWhichFXUnit(4);
        break;

      case 5:
        setMainFXUnit(channel5FX);
        setWhichFXUnit(5);
        break;

      case 6:
        setMainFXUnit(channel6FX);
        setWhichFXUnit(6);
        break;
    }
  };

  // am ramas aici cu inputs, merge sa selectez se pare.
  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then((response) => {
  //     //@ts-ignore
  //     let inputs = response.filter((e: any) => e.kind === "audioinput");

  //     if (navigator.mediaDevices) {
  //       navigator.mediaDevices
  //         .getUserMedia({
  //           audio: {
  //             deviceId: "default",
  //           },
  //         })
  //         .then((stream) => {
  //           // console.log(stream);
  //           const microphone = audioCtx.createMediaStreamSource(stream);
  //         })
  //         .catch((err) => {
  //           // browser unable to access microphone
  //           // (check to see if microphone is attached)
  //           console.log(err);
  //         });
  //     } else {
  //       // browser unable to access media devices
  //       // (update your browser)
  //       console.log("browser unable to access media devices");
  //     }

  //     let outputs = response.filter((e: any) => e.kind === "audiooutput");
  //     if (navigator.mediaDevices) {
  //       navigator.mediaDevices
  //         .getUserMedia({
  //           audio: {
  //             deviceId:
  //               "877c0886383787355b6185c26ab18264da17a5acbb894f40fc5e1f2f7b96d3ba",
  //           },
  //         })
  //         .then((stream) => {
  //           // console.log(stream);
  //           // const destination = audioCtx.createMediaStreamDestination();
  //           var audioCtxDestination = audioCtx.destination
  //           audioCtxDestination.channelCount = 1;
  //           console.log(audioCtxDestination);
  //           // console.log(destination);
  //           // console.log(audioCtx.destination);
  //           // Booth
  //           masterFilterFunctions.masterFilterOutput
  //             .connect(masterFunctions.booth.node)
  //             .connect(audioCtx.destination); // destination (back left and right) - todo
  //           // const microphone = audioCtx.createMediaStreamSource(stream);
  //         })
  //         .catch((err) => {
  //           // browser unable to access microphone
  //           // (check to see if microphone is attached)
  //           console.log(err);
  //         });
  //     } else {
  //       // browser unable to access media devices
  //       // (update your browser)
  //       console.log("browser unable to access media devices");
  //     }

  //     console.log(outputs);
  //   });
  //   // MediaDevices.selectAudioOutput()
  // }, []);

  // These connections will be made based on the value of the buttons
  // It only needs to change the FXUnit and Compressor here in the useInit because these have the same interface for multiple chs
  // Channel 1
  useEffect(() => {
    if (channel1.channelUI.compressorOn)
      channelOneFunctions.compressorFunctions.connectCompressor();
    else channelOneFunctions.compressorFunctions.disconnectCompressor();
  }, [channel1.channelUI.compressorOn]);

  useEffect(() => {
    if (channel1FX.channelUI.fxUnitOn)
      channelOneFunctions.FXUnitFunctions.connectFXUnit();
    else channelOneFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channel1FX.channelUI.fxUnitOn]);

  // Channel 2
  useEffect(() => {
    if (channel2.channelUI.compressorOn)
      channelTwoFunctions.compressorFunctions.connectCompressor();
    else channelTwoFunctions.compressorFunctions.disconnectCompressor();
  }, [channel2.channelUI.compressorOn]);

  useEffect(() => {
    if (channel2FX.channelUI.fxUnitOn)
      channelTwoFunctions.FXUnitFunctions.connectFXUnit();
    else channelTwoFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channel2FX.channelUI.fxUnitOn]);

  // Channel 3
  useEffect(() => {
    if (channel3.channelUI.compressorOn)
      channelThreeFunctions.compressorFunctions.connectCompressor();
    else channelThreeFunctions.compressorFunctions.disconnectCompressor();
  }, [channel3.channelUI.compressorOn]);

  useEffect(() => {
    if (channel3FX.channelUI.fxUnitOn)
      channelThreeFunctions.FXUnitFunctions.connectFXUnit();
    else channelThreeFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channel3FX.channelUI.fxUnitOn]);

  // Channel 4
  useEffect(() => {
    if (channel4.channelUI.compressorOn)
      channelFourFunctions.compressorFunctions.connectCompressor();
    else channelFourFunctions.compressorFunctions.disconnectCompressor();
  }, [channel4.channelUI.compressorOn]);

  useEffect(() => {
    if (channel4FX.channelUI.fxUnitOn)
      channelFourFunctions.FXUnitFunctions.connectFXUnit();
    else channelFourFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channel4FX.channelUI.fxUnitOn]);

  // Channel 5
  useEffect(() => {
    if (channel5.channelUI.compressorOn)
      channelFiveFunctions.compressorFunctions.connectCompressor();
    else channelFiveFunctions.compressorFunctions.disconnectCompressor();
  }, [channel5.channelUI.compressorOn]);

  useEffect(() => {
    if (channel5FX.channelUI.fxUnitOn)
      channelFiveFunctions.FXUnitFunctions.connectFXUnit();
    else channelFiveFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channel5FX.channelUI.fxUnitOn]);

  // Channel 6
  useEffect(() => {
    if (channel6.channelUI.compressorOn)
      channelSixFunctions.compressorFunctions.connectCompressor();
    else channelSixFunctions.compressorFunctions.disconnectCompressor();
  }, [channel6.channelUI.compressorOn]);

  useEffect(() => {
    if (channel6FX.channelUI.fxUnitOn)
      channelSixFunctions.FXUnitFunctions.connectFXUnit();
    else channelSixFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channel6FX.channelUI.fxUnitOn]);

  // Master Filter
  useEffect(() => {
    if (masterFilterOn) {
      masterFilterFunctions.connectMasterFilter();
      masterFilterCueFunctions.connectMasterFilter();
    } else {
      masterFilterFunctions.disconnectMasterFilter();
      masterFilterCueFunctions.disconnectMasterFilter();
    }
  }, [masterFilterOn]);

  //* Connections
  // The connections below need to be made in a useEffect hook otherwise it breaks when rerenders
  useEffect(() => {
    // // Booth
    // masterFilterFunctions.masterFilterOutput
    //   .connect(masterFunctions.booth.node)
    //   .connect(audioCtx.destination); // destination (back left and right) - todo
    // Master
    // am ramas aici, a mers asta sa coneectez doar la un output, gen la un left, si ma gandesc ca asa o sa fie cu cate outputs are soundcard
    // la fel cred ca e si cu input, nu e pe device, habar n-am, vezi cf la dragos
    var splitter = audioCtx.createChannelSplitter(2);
    var merger = audioCtx.createChannelMerger(2);
    masterFilterFunctions.masterFilterOutput
      .connect(masterFunctions.master.node)
      .connect(splitter)
      .connect(merger, 0, 0)
      .connect(audioCtx.destination);

    // masterFilterFunctions.masterFilterOutput
    // .connect(masterFunctions.master.node)
    // .connect(audioCtx.destination); // destination (front left and right) - todo
    // // HeadPhones
    // masterFilterCueFunctions.masterFilterOutput
    //   .connect(masterFunctions.headphones.node)
    //   .connect(audioCtx.destination); // destination headhpones L and R
  }, []);

  return [
    channelOneFunctions,
    channelOneUI,
    setChannelOneUI,
    channelTwoFunctions,
    channelTwoUI,
    setChannelTwoUI,
    channelThreeFunctions,
    channelThreeUI,
    setChannelThreeUI,
    channelFourFunctions,
    channelFourUI,
    setChannelFourUI,
    channelFiveFunctions,
    channelFiveUI,
    setChannelFiveUI,
    channelSixFunctions,
    channelSixUI,
    setChannelSixUI,
    masterFilterToExport,
    masterFunctions,
    controlWhichChannel,
    controlWhichFXUnit,
    setMain,
    main,
    setMainFXUnit,
    mainFXUnit,
    play,
    pause,
    replay,
  ] as const;
};
export { useInit };
