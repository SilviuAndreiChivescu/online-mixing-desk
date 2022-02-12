import HPF from "./HPF";
import EQ from "./EQ";
import Panner from "./Panner";
import Gain from "./Gain";
import { Button, Col, Container, Row } from "react-bootstrap";
import VolumeSlider from "./VolumeSlider";
import SoundMeter from "./SoundMeter";

interface ChannelLineProps {
  channelFunctions: {
    play: () => void;
    pause: () => Promise<void>;
    connectCue: () => void;
    disconnectCue: () => void;
    connectChannel: () => void;
    disconnectChannel: () => void;
    sliderVolumeNode: GainNode;
    controlSliderVolumeNode: (gainValue: number) => void;
    controlPannerNode: (pannerValue: number) => void;
    controlChannelGainNode: (gainValue: number) => void;
    EQFunctions: {
      EQControl: {
        controlHigh: (gainValue: number) => void;
        controlMid: (gainValue: number) => void;
        controlLow: (gainValue: number) => void;
      };
      connectEQ: () => void;
      disconnectEQ: () => void;
      EQOutput: GainNode;
    };
    HPFFunctions: {
      controlHighPassCutOff: (cutOffValue: number) => void;
      connectHPF: () => void;
      disconnectHPF: () => void;
      HPFOutput: GainNode;
    };
    compressorFunctions: {
      compressorControl: (
        e: React.ChangeEvent<HTMLInputElement>,
        setMain: any,
        main: any
      ) => void;
      compressorUIStates: {
        threshold: number;
        knee: number;
        ratio: number;
        attack: number;
        release: number;
        dryWetKnob: number;
      };
      connectCompressor: () => void;
      disconnectCompressor: () => void;
      setDryWetKnob: (
        e: React.ChangeEvent<HTMLInputElement>,
        setMain: any,
        main: any
      ) => void;
      compressorOutput: GainNode;
    };
    FXUnitFunctions: {
      chooseImpulse: (impulseUrl: string) => Promise<void>;
      connectFXUnit: () => void;
      disconnectFXUnit: () => void;
      FXUnitOutput: GainNode;
      setDryWetKnob: (
        e: React.ChangeEvent<HTMLInputElement>,
        setMain: any,
        main: any
      ) => void;
      FXUnitUIStates: {
        reverb: string;
        dryWetKnob: number;
      };
    };
    drawSoundLevel: (
      canvas: HTMLCanvasElement,
      canvasCtx: CanvasRenderingContext2D
    ) => void;
  };
  channelUI: {
    eqOn: boolean;
    hpfOn: boolean;
    compressorOn: boolean;
    fxUnitOn: boolean;
    cueOn: boolean;
    channelOn: boolean;
  };
  setChannelUI: React.Dispatch<
    React.SetStateAction<{
      eqOn: boolean;
      hpfOn: boolean;
      compressorOn: boolean;
      fxUnitOn: boolean;
      cueOn: boolean;
      channelOn: boolean;
    }>
  >;
}

const ChannelLine: React.FC<ChannelLineProps> = ({
  channelFunctions,
  channelUI,
  setChannelUI,
}) => {
  const {
    play,
    pause,
    EQFunctions,
    HPFFunctions,
    drawSoundLevel,
    controlChannelGainNode,
    controlPannerNode,
    controlSliderVolumeNode,
  } = channelFunctions;

  return (
    <>
      <Row>
        <Col>
          <Button
            className="mt-5"
            onClick={() =>
              setChannelUI({ ...channelUI, channelOn: !channelUI.channelOn })
            }
          >
            Mic Input
          </Button>
        </Col>
        <Col>
          <Button className="mt-5" onClick={play}>
            Play
          </Button>
        </Col>
        <Col>
          <Button className=" mt-5" onClick={pause}>
            Pause
          </Button>
        </Col>
      </Row>
      <Gain controlChannelGainNode={controlChannelGainNode} />

      <SoundMeter draw={drawSoundLevel} />

      <EQ
        setChannelUI={setChannelUI}
        channelUI={channelUI}
        EQFunctions={EQFunctions}
      />
      <HPF
        setChannelUI={setChannelUI}
        channelUI={channelUI}
        HPFFunctions={HPFFunctions}
      />
      <Panner controlPannerNode={controlPannerNode} />
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              setChannelUI({ ...channelUI, cueOn: !channelUI.cueOn })
            }
          >
            Cue On / Off
          </Button>
        </Col>
      </Row>
      <VolumeSlider controlSliderVolumeNode={controlSliderVolumeNode} />
    </>
  );
};

export default ChannelLine;
