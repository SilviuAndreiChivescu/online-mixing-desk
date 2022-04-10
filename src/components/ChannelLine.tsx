import HPF from "./HPF";
import EQ from "./EQ";
import Panner from "./Panner";
import Gain from "./Gain";
import {
  Button,
  Col,
  Container,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import VolumeSlider from "./VolumeSlider";
import SoundMeter from "./SoundMeter";
import OnOffButton from "./OnOffButton";

interface ChannelLineProps {
  channelNo: number;
  channelFunctions: {
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
      compressorControlThreshold: (
        value: number,
        setMain: any,
        main: any
      ) => void;
      compressorControlRatio: (value: number, setMain: any, main: any) => void;
      compressorControlRelease: (
        value: number,
        setMain: any,
        main: any
      ) => void;
      compressorControlAttack: (value: number, setMain: any, main: any) => void;
      compressorControlKnee: (value: number, setMain: any, main: any) => void;
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
      setDryWetKnob: (value: number, setMain: any, main: any) => void;
      compressorOutput: GainNode;
      compressor: DynamicsCompressorNode;
    };
    FXUnitFunctions: {
      chooseImpulse: (impulseUrl: string) => Promise<void>;
      connectFXUnit: () => void;
      disconnectFXUnit: () => void;
      FXUnitOutput: GainNode;
      setDryWetKnob: (value: number, setMain: any, main: any) => void;
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
  channelNo,
}) => {
  const {
    EQFunctions,
    HPFFunctions,
    drawSoundLevel,
    controlChannelGainNode,
    controlPannerNode,
    controlSliderVolumeNode,
  } = channelFunctions;

  return (
    <section className="bg-black">
      <h3>{channelNo}</h3>
      <OnOffButton
        id={`onOffMic-${channelNo}`}
        isMic={true}
        onChange={() =>
          setChannelUI({ ...channelUI, channelOn: !channelUI.channelOn })
        }
      />

      <Gain controlChannelGainNode={controlChannelGainNode} />

      <EQ
        channelNo={channelNo}
        setChannelUI={setChannelUI}
        channelUI={channelUI}
        EQFunctions={EQFunctions}
      />
      <HPF
        channelNo={channelNo}
        setChannelUI={setChannelUI}
        channelUI={channelUI}
        HPFFunctions={HPFFunctions}
      />
      <Panner controlPannerNode={controlPannerNode} />
      <Row>
        <Col className="mb-2 mt-2">
          <ToggleButtonGroup
            type="checkbox"
            onChange={() =>
              setChannelUI({ ...channelUI, cueOn: !channelUI.cueOn })
            }
          >
            <ToggleButton
              style={{
                width: "70px",
                borderRadius: "15px",
              }}
              variant="outline-warning"
              size="sm"
              id={`cueOnOff-${channelNo}`}
              value="1"
            >
              Cue
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <section className="border-top border-bottom p-3 d-flex justify-content-center align-items-center mt-2 mb-2">
        <Row>
          <VolumeSlider controlSliderVolumeNode={controlSliderVolumeNode} />
          <SoundMeter draw={drawSoundLevel} />
        </Row>
      </section>
    </section>
  );
};

export default ChannelLine;
