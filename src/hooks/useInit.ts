import { useEffect, useState } from "react";
import { useChannelLine } from "./useChannelLine";
import { useMaster } from "./useMaster";
import { useMasterFilter } from "./useMasterFilter";

const useInit = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const [masterFunctions] = useMaster(audioCtx);

  // todo - 6 channels of these connected accordingly after testing
  const [channelOneFunctions, channelOneUI] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode
  );
  // todo I need some main states here for UI for compressor and fx unit
  const [masterFilterFunctions] = useMasterFilter(
    audioCtx,
    channelOneFunctions.sliderVolumeNode
  );

  const [masterFilterCueFunctions] = useMasterFilter(
    audioCtx,
    masterFunctions.cueNodesCombined
  );

  const [masterFilterOn, setMasterFilterOn] = useState(false);
  const [masterFilterValues, setMasterFilterValues] = useState({
    hpf: 0.5,
    lpf: 0.5,
  }); // todo change these AND BELOW AT BOOTH (and below and at gain and slider and at compressor UI) to correspond to actual defaults

  const [boothValue, setBoothValue] = useState(1);
  const [masterValue, setMasterValue] = useState(1);
  const [headphonesValue, setHeadphonesValue] = useState(1);

  // These connections will be made based on the value of the buttons (for now I need it to make it first on render so I can test - delete this () late)
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
    if (masterFilterOn) masterFilterFunctions.connectMasterFilter();
    else masterFilterFunctions.disconnectMasterFilter();
  }, [masterFilterOn]);

  //* Connections
  //todo check here for back / front / headphones stuff
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

  return [channelOneFunctions];
};
export { useInit };
