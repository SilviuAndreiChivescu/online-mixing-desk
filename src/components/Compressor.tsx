import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import MyCompressorSlider from "./MyCompressorSlider";
import { MyRangeSlider } from "./MyRangeSlider";

interface CompressorProps {
  setChannelOneUI: any;
  channelOneUI: any;
  compressorFunctions: any;
}

// am ramas aici, faceam compressor component si sa il testez, vezi cum e cu alea de le controlezi
// poate te inspiri din old compressor si logica lui
function Compressor({
  setChannelOneUI,
  channelOneUI,
  compressorFunctions,
}: CompressorProps) {
  const [slidersInfo] = useState([
    { id: "threshold", min: -100, max: 0, defaultValue: -24, step: 1 },
    { id: "knee", min: 0, max: 40, defaultValue: 32, step: 1 },
    { id: "ratio", min: 1, max: 19.8, defaultValue: 10.4, step: 1 },
    { id: "attack", min: 0, max: 1, defaultValue: 0.003, step: 0.1 },
    { id: "release", min: 0, max: 1, defaultValue: 0.3, step: 0.1 },
  ]);
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              setChannelOneUI({
                ...channelOneUI,
                compressorOn: !channelOneUI.compressorOn,
              })
            }
          >
            Compressor On / Off
          </Button>
        </Col>
      </Row>
      <Row>
        {slidersInfo.map((elem: any) => (
          <Col key={elem.id}>
            <MyCompressorSlider
              onChangeFunction={compressorFunctions.compressorControl}
              id={elem.id}
              label={elem.id.toUpperCase()}
              min={elem.min}
              max={elem.max}
              defaultValue={elem.defaultValue}
              step={elem.step}
              className="mt-4 mb-4"
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <MyRangeSlider
            label="Wet Dry"
            onChangeFunction={compressorFunctions.setDryWetKnob}
            min={0}
            max={1}
            defaultValue={0.5}
            step={0.1}
          />
        </Col>
      </Row>
    </section>
  );
}
export default Compressor;
