import { useChannelLine } from "./useChannelLine";
import { useMaster } from "./useMaster";
import { useMasterFilter } from "./useMasterFilter";

const useInit = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const [masterFunctions] = useMaster(audioCtx);

  // todo - 6 channels of these connected accordingly after testing
  const [channelOneFunctions] = useChannelLine(
    audioCtx,
    masterFunctions.cueNode,
    masterFunctions.withoutCueNode
  );

  const [masterFilterFunctions] = useMasterFilter(
    audioCtx,
    channelOneFunctions.sliderVolumeNode
  );

  const [masterFilterCueFunctions] = useMasterFilter(
    audioCtx,
    masterFunctions.cueNodesCombined
  );

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
};
export { useInit };
