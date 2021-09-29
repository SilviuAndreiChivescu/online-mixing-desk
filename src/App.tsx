import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./App.css";
import { useAudio } from "./AppLogic";
import { Oscilloscope } from "./components/Oscilloscope";

import { MyRangeSlider } from "./components/MyRangeSlider";
import { Compressor } from "./components/Compressor";
import { Filter } from "./components/Filter";

const App: React.FC = () => {
  const {
    play,
    pause,
    gainControl,
    pannerControl,
    compressorControl,
    biquadFilterControl,
    draw,
  } = useAudio("/assets/outfoxing.mp3");

  const [compressor, setCompressor] = useState(false);
  const [filter, setFilter] = useState(false);

  return (
    <Container fluid className="App text-center">
      <p>This is the start of an awesome project</p>

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
        <MyRangeSlider
          onChangeFunction={gainControl}
          label="Gain"
          min={0}
          max={2}
          defaultValue={1}
          step={0.1}
        />
        <MyRangeSlider
          onChangeFunction={pannerControl}
          label="Pan"
          min={-1}
          max={1}
          defaultValue={0}
          step={0.01}
          className="mt-4 mb-4"
        />
        <Row>
          <Col>
            <Form.Check
              name="compressor"
              type="checkbox"
              label="Compressor"
              aria-label="Compressor"
              onChange={() => setCompressor((currValue) => !currValue)}
            />
          </Col>
          <Col>
            <Form.Check
              name="filter"
              type="checkbox"
              label="Filter"
              aria-label="Filter"
              onChange={() => setFilter((currValue) => !currValue)}
            />
          </Col>
        </Row>

        {compressor ? (
          <Compressor compressorControl={compressorControl} />
        ) : null}

        {filter ? <Filter biquadFilterControl={biquadFilterControl} /> : null}
      </section>
    </Container>
  );
};

export default App;
