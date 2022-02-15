import { useEffect, useState } from "react";
import { useChannelLine } from "./useChannelLine";
import { useGain } from "./useGain";
import { useMaster } from "./useMaster";
import { useMasterFilter } from "./useMasterFilter";
// prob acu tre sa fac design -ul si sa le connectez gen 6 chanale, momentan am doar 2 dar o sa le conectez dupa ce gasesc / fac un ui frumos
// dupa prob testing la scl despre cue and booth singal and stuff? (test first on my pc to get my audio etc)
//todo test compressor and others, sometimes they produce a weird sound when turned on and stuff, see if I can prevent that
const useInit = () => {
  const [AudioContext] = useState(
    () => window.AudioContext || window.webkitAudioContext
  );
  const [audioCtx] = useState(() => new AudioContext());

  const [masterFunctions] = useMaster(audioCtx);

  // todo - 6 channels of these connected accordingly after testing
  const [channelOneFunctions, channelOneUI, setChannelOneUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode,
    "outfoxing.mp3"
  );
  const [channelTwoFunctions, channelTwoUI, setChannelTwoUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode,
    "outfoxing.mp3"
  );

  // Combine all audio signal coming from each channel to pass to masterFilter as one
  const [sliderVolumeNodesCombined] = useGain(audioCtx);
  useEffect(() => {
    channelOneFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
    channelTwoFunctions.sliderVolumeNode.connect(sliderVolumeNodesCombined);
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
    channelOneFunctions.audioElement.play();
    channelTwoFunctions.audioElement.play();
  };

  const pause = () => {
    channelOneFunctions.audioElement.pause();
    channelTwoFunctions.audioElement.pause();
  };

  const replay = () => {
    channelOneFunctions.audioElement.load();
    channelTwoFunctions.audioElement.load();
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
  const [whichFXUnit, setWhichFXUnit] = useState(1);
  useEffect(() => {
    switch (whichFXUnit) {
      case 1:
        setChannel1FX(mainFXUnit);
        break;

      case 2:
        setChannel2FX(mainFXUnit);
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
    }
  };

  // These connections will be made based on the value of the buttons
  // Channel 1
  useEffect(() => {
    if (channelOneUI.channelOn) channelOneFunctions.connectChannel();
    else channelOneFunctions.disconnectChannel();
  }, [channelOneUI.channelOn]);
  useEffect(() => {
    if (channelOneUI.eqOn) channelOneFunctions.EQFunctions.connectEQ();
    else channelOneFunctions.EQFunctions.disconnectEQ();
  }, [channelOneUI.eqOn]);

  useEffect(() => {
    if (channelOneUI.hpfOn) channelOneFunctions.HPFFunctions.connectHPF();
    else channelOneFunctions.HPFFunctions.disconnectHPF();
  }, [channelOneUI.hpfOn]);

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

  useEffect(() => {
    if (channelOneUI.cueOn) channelOneFunctions.connectCue();
    else channelOneFunctions.disconnectCue();
  }, [channelOneUI.cueOn]);

  // Channel 2
  useEffect(() => {
    if (channelTwoUI.channelOn) channelTwoFunctions.connectChannel();
    else channelTwoFunctions.disconnectChannel();
  }, [channelTwoUI.channelOn]);
  useEffect(() => {
    if (channelTwoUI.eqOn) channelTwoFunctions.EQFunctions.connectEQ();
    else channelTwoFunctions.EQFunctions.disconnectEQ();
  }, [channelTwoUI.eqOn]);

  useEffect(() => {
    if (channelTwoUI.hpfOn) channelTwoFunctions.HPFFunctions.connectHPF();
    else channelTwoFunctions.HPFFunctions.disconnectHPF();
  }, [channelTwoUI.hpfOn]);

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

  useEffect(() => {
    if (channelTwoUI.cueOn) channelTwoFunctions.connectCue();
    else channelTwoFunctions.disconnectCue();
  }, [channelTwoUI.cueOn]);

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
  //todo check here for back / front / headphones stuff
  useEffect(() => {
    // Booth
    masterFilterFunctions.masterFilterOutput
      .connect(masterFunctions.booth.node)
      .connect(audioCtx.destination); // destination (back left and right) - todo
    // Master
    masterFilterFunctions.masterFilterOutput
      .connect(masterFunctions.master.node)
      .connect(audioCtx.destination); // destination (front left and right) - todo

    // HeadPhones
    masterFilterCueFunctions.masterFilterOutput
      .connect(masterFunctions.headphones.node)
      .connect(audioCtx.destination); // destination headhpones L and R
  }, []);

  return [
    channelOneFunctions,
    channelOneUI,
    setChannelOneUI,
    channelTwoFunctions,
    channelTwoUI,
    setChannelTwoUI,
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
