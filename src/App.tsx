import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import SoundMeter from "./components/SoundMeter";

// v2
import { useInit } from "./hooks/useInit";
import HPF from "./components/HPF";
import EQ from "./components/EQ";
import Panner from "./components/Panner";
import Gain from "./components/Gain";
import Compressor from "./components/Compressor";
import FXUnit from "./components/FXUnit";
import VolumeSlider from "./components/VolumeSlider";
import MasterFilter from "./components/MasterFilter";
import Master from "./components/Master";

//todo change all any types to actual types?

const App: React.FC = () => {
  const [
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
  ] = useInit();

  return (
    <div className="App text-center">
      <Container>
        <Row>
          <Col>
            <ChannelLine
              channelFunctions={channelOneFunctions}
              channelUI={channelOneUI}
              setChannelUI={setChannelOneUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelFunctions={channelTwoFunctions}
              channelUI={channelTwoUI}
              setChannelUI={setChannelTwoUI}
            />
          </Col>
        </Row>
        <Compressor
          setMain={setMain}
          main={main}
          controlWhichChannel={controlWhichChannel}
          compressorFunctions={main.compressorFunctions}
        />
        <FXUnit
          setMain={setMainFXUnit}
          main={mainFXUnit}
          controlWhichChannel={controlWhichFXUnit}
          FXUnitFunctions={mainFXUnit.FXUnitFunctions}
        />
        <MasterFilter masterFilterToExport={masterFilterToExport} />
        <Master masterFunctions={masterFunctions} />
      </Container>
    </div>
  );
};

interface ChannelLineProps {
  channelFunctions: any;
  channelUI: any;
  setChannelUI: any;
}

const ChannelLine: React.FC<ChannelLineProps> = ({
  channelFunctions,
  channelUI,
  setChannelUI,
}) => {
  const { play, pause, EQFunctions, HPFFunctions, drawSoundLevel } =
    channelFunctions;

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
      <Gain channelFunctions={channelFunctions} />

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
      <Panner channelFunctions={channelFunctions} />
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
      <VolumeSlider channelFunctions={channelFunctions} />
    </>
  );
};

export default App;
