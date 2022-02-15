import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useInit } from "./hooks/useInit";
import Compressor from "./components/Compressor";
import FXUnit from "./components/FXUnit";
import MasterFilter from "./components/MasterFilter";
import Master from "./components/Master";
import ChannelLine from "./components/ChannelLine";

import InputsAndOutputs from "./components/InputsAndOutputs";

// change the channels from channel 2 to what it should be (make new branch for this haha)

// background color to white or smthing, and to black only the "hardware"
// do the select input / output stuff (try with multiple bluetooth connections)
// create help modal?
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
            {/* className="m-0 p-0" */}
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
            <InputsAndOutputs play={play} pause={pause} replay={replay} />
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
