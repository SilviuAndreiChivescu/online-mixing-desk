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
    <section className="border">
      <h3>{channelNo}</h3>
      <OnOffButton
        id="eqOn"
        onChange={() =>
          setChannelUI({ ...channelUI, channelOn: !channelUI.channelOn })
        }
      />
      <Row>
        <Col>
          <Button onClick={play}>Play</Button>
        </Col>
        <Col>
          <Button onClick={pause}>Pause</Button>
        </Col>
      </Row>
      <Gain controlChannelGainNode={controlChannelGainNode} />

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
              id="cueOn"
              value="1"
            >
              Cue
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <section className="border p-3 d-flex justify-content-center align-items-center mt-2 mb-2">
        <Row>
          <VolumeSlider controlSliderVolumeNode={controlSliderVolumeNode} />
          <SoundMeter draw={drawSoundLevel} />
        </Row>
      </section>
    </section>
  );
};

export default ChannelLine;
