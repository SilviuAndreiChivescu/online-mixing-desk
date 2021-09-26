import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./App.css";
import { useAudio } from "./AppLogic";
import Canvas from "./components/Canvas";

import { MyRangeSlider } from "./components/MyRangeSlider";

const App: React.FC = () => {
  const { play, pause, volumeControl, pannerControl, draw } = useAudio(
    "/assets/outfoxing.mp3"
  );

  return (
    <Container fluid className="App text-center">
      <p>This is the start of an awesome project</p>

      <Canvas draw={draw} />
      <Form style={{ width: "30%", margin: "0 auto" }}>
        <MyRangeSlider
          onChangeFunction={volumeControl}
          label="Volume"
          min={0}
          max={200}
          defaultValue={100}
          step={1}
        />
        <MyRangeSlider
          onChangeFunction={pannerControl}
          label="Pan"
          min={-100}
          max={100}
          defaultValue={0}
          step={1}
          className="mt-4 mb-4"
        />
        <Button onClick={play}>Play</Button>
        <Button className="ms-5" onClick={pause}>
          Pause
        </Button>
      </Form>
    </Container>
  );
};

export default App;
