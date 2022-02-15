import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useInit } from "./hooks/useInit";
import Compressor from "./components/Compressor";
import FXUnit from "./components/FXUnit";
import MasterFilter from "./components/MasterFilter";
import Master from "./components/Master";
import ChannelLine from "./components/ChannelLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";

// gain reduction? make another branch

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
          {/* <Col>
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
          </Col> */}
          <Col lg={5}>
            <Row className="justify-content-center">
              <Col lg={1}>
                <Button variant="outline-warning" onClick={play}>
                  <FontAwesomeIcon icon={faPlay} />
                </Button>
              </Col>
              <Col lg={1}>
                <Button variant="outline-warning" onClick={pause}>
                  <FontAwesomeIcon icon={faPause} />
                </Button>
              </Col>
              <Col lg={1}>
                <Button variant="outline-warning" onClick={replay}>
                  <FontAwesomeIcon icon={faStop} />
                </Button>
              </Col>
            </Row>
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
