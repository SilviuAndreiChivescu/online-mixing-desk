import { useEffect, useState } from "react";
import { useChannelLine } from "./useChannelLine";
import { useGain } from "./useGain";
import { useMaster } from "./useMaster";
import { useMasterFilter } from "./useMasterFilter";

const useInit = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const [masterFunctions] = useMaster(audioCtx);

  // todo - 6 channels of these connected accordingly after testing
  const [channelOneFunctions, channelOneUI, setChannelOneUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode
  );
  const [channelTwoFunctions, channelTwoUI, setChannelTwoUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode
  );
  // todo I need some main states here for UI for compressor and fx unit
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
  // These connections will be made based on the value of the buttons (for now I need it to make it first on render so I can test - delete this () late)
  // Channel 1
  useEffect(() => {
    if (channelOneUI.eqOn) channelOneFunctions.EQFunctions.connectEQ();
    else channelOneFunctions.EQFunctions.disconnectEQ();
  }, [channelOneUI.eqOn]);

  useEffect(() => {
    if (channelOneUI.hpfOn) channelOneFunctions.HPFFunctions.connectHPF();
    else channelOneFunctions.HPFFunctions.disconnectHPF();
  }, [channelOneUI.hpfOn]);

  useEffect(() => {
    if (channelOneUI.compressorOn)
      channelOneFunctions.compressorFunctions.connectCompressor();
    else channelOneFunctions.compressorFunctions.disconnectCompressor();
  }, [channelOneUI.compressorOn]);

  useEffect(() => {
    if (channelOneUI.fxUnitOn)
      channelOneFunctions.FXUnitFunctions.connectFXUnit();
    else channelOneFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channelOneUI.fxUnitOn]);

  useEffect(() => {
    if (channelOneUI.cueOn) channelOneFunctions.connectCue();
    else channelOneFunctions.disconnectCue();
  }, [channelOneUI.cueOn]);

  // Channel 2
  useEffect(() => {
    if (channelTwoUI.eqOn) channelTwoFunctions.EQFunctions.connectEQ();
    else channelTwoFunctions.EQFunctions.disconnectEQ();
  }, [channelTwoUI.eqOn]);

  useEffect(() => {
    if (channelTwoUI.hpfOn) channelTwoFunctions.HPFFunctions.connectHPF();
    else channelTwoFunctions.HPFFunctions.disconnectHPF();
  }, [channelTwoUI.hpfOn]);

  useEffect(() => {
    if (channelTwoUI.compressorOn)
      channelTwoFunctions.compressorFunctions.connectCompressor();
    else channelTwoFunctions.compressorFunctions.disconnectCompressor();
  }, [channelTwoUI.compressorOn]);

  useEffect(() => {
    if (channelTwoUI.fxUnitOn)
      channelTwoFunctions.FXUnitFunctions.connectFXUnit();
    else channelTwoFunctions.FXUnitFunctions.disconnectFXUnit();
  }, [channelTwoUI.fxUnitOn]);

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
  ] as const;
};
export { useInit };
