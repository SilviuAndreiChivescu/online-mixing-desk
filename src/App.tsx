import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useInit } from "./hooks/useInit";
import Compressor from "./components/Compressor";
import FXUnit from "./components/FXUnit";
import MasterFilter from "./components/MasterFilter";
import Master from "./components/Master";
import ChannelLine from "./components/ChannelLine";

//todo maybe change the reverb dropdown to radio inputs? Also the ch dropdown?
// change the channels from channel 2 to what it should be
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
              channelFunctions={channelTwoFunctions}
              channelUI={channelTwoUI}
              setChannelUI={setChannelTwoUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelNo={4}
              channelFunctions={channelTwoFunctions}
              channelUI={channelTwoUI}
              setChannelUI={setChannelTwoUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelNo={5}
              channelFunctions={channelTwoFunctions}
              channelUI={channelTwoUI}
              setChannelUI={setChannelTwoUI}
            />
          </Col>
          <Col>
            <ChannelLine
              channelNo={6}
              channelFunctions={channelTwoFunctions}
              channelUI={channelTwoUI}
              setChannelUI={setChannelTwoUI}
            />
          </Col>
          <Col lg={5}>
            <Compressor
              setMain={setMain}
              main={main}
              controlWhichChannel={controlWhichChannel}
              compressorFunctions={main.compressorFunctions}
            />
            <Row>
              <Col>
                <FXUnit
                  setMain={setMainFXUnit}
                  main={mainFXUnit}
                  controlWhichChannel={controlWhichFXUnit}
                  FXUnitFunctions={mainFXUnit.FXUnitFunctions}
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
