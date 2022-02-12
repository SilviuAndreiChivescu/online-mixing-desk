import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useInit } from "./hooks/useInit";
import Compressor from "./components/Compressor";
import FXUnit from "./components/FXUnit";
import MasterFilter from "./components/MasterFilter";
import Master from "./components/Master";
import ChannelLine from "./components/ChannelLine";

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

export default App;
