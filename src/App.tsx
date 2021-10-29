import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import "./App.css";
import { useAudio } from "./AppLogic";
import { Oscilloscope } from "./components/Oscilloscope";

import { MyRangeSlider } from "./components/MyRangeSlider";
import { Compressor } from "./components/Compressor";
import { Filter } from "./components/Filter";

import Reverb from "./components/Reverb";

const App: React.FC = () => {
  const {
    play,
    pause,
    gainControl,
    pannerControl,
    compressorControl,
    biquadFilterControl,
    draw,
    chooseImpulse,
  } = useAudio("/assets/outfoxing.mp3");

  return (
    <Container fluid className="App text-center">
      <Oscilloscope draw={draw} />
      <Container>
        <Row>
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
      </Container>
      <section
        style={{ width: "30%", margin: "0 auto" }}
        className="text-start"
      >
        {/* Reverb */}
        {/* <Reverb chooseImpulse={chooseImpulse} /> */}

        {/* Gain and Panning */}
        {/* <MyRangeSlider
          onChangeFunction={(e) => gainControl(e)}
          label="Gain"
          min={0}
          max={2}
          defaultValue={1}
          step={0.1}
        />
        <MyRangeSlider
          onChangeFunction={(e) => pannerControl(e)}
          label="Pan"
          min={-1}
          max={1}
          defaultValue={0}
          step={0.01}
          className="mt-4 mb-4"
        /> */}
        {/* END Gain and Panning */}

        {/* Commented below to test FX unit to finish 'internal chain design' */}
        {/* <Compressor compressorControl={compressorControl} />
        <Filter biquadFilterControl={biquadFilterControl} /> */}
      </section>
    </Container>
  );
};

export default App;
