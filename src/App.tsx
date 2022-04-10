import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useInit } from "./hooks/useInit";
import Compressor from "./components/Compressor";
import FXUnit from "./components/FXUnit";
import MasterFilter from "./components/MasterFilter";
import Master from "./components/Master";
import ChannelLine from "./components/ChannelLine";
import "./App.css";

import ControlCenter from "./components/ControlCenter";

const App: React.FC = () => {
  const [
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
  ] = useInit();

  return (
    <div className="App text-center">
      <Container fluid>
        <Row className="p-2 align-items-end">
          <Col>
            <ChannelLine
              channelNo={1}
              channelFunctions={channelOneFunctions}
              channelUI={channelOneUI}
              setChannelUI={setChannelOneUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelNo={2}
              channelFunctions={channelTwoFunctions}
              channelUI={channelTwoUI}
              setChannelUI={setChannelTwoUI}
            />
          </Col>

          <Col>
            <ChannelLine
              channelNo={3}
              channelFunctions={channelThreeFunctions}
              channelUI={channelThreeUI}
              setChannelUI={setChannelThreeUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelNo={4}
              channelFunctions={channelFourFunctions}
              channelUI={channelFourUI}
              setChannelUI={setChannelFourUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelNo={5}
              channelFunctions={channelFiveFunctions}
              channelUI={channelFiveUI}
              setChannelUI={setChannelFiveUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelNo={6}
              channelFunctions={channelSixFunctions}
              channelUI={channelSixUI}
              setChannelUI={setChannelSixUI}
            />
          </Col>
          <Col lg={5}>
            <ControlCenter play={play} pause={pause} replay={replay} />
            <Compressor
              setMain={setMain}
              main={main}
              controlWhichChannel={controlWhichChannel}
            />
            <Row>
              <Col>
                <FXUnit
                  setMain={setMainFXUnit}
                  main={mainFXUnit}
                  controlWhichChannel={controlWhichFXUnit}
                />
              </Col>
              <Col>
                <MasterFilter masterFilterToExport={masterFilterToExport} />
              </Col>
            </Row>
            <Master masterFunctions={masterFunctions} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
