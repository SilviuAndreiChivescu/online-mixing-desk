import React, { useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import MyCompressorSlider from "./MyCompressorSlider";
import { MyRangeSlider } from "./MyRangeSlider";

interface CompressorProps {
  setCompressorStates: any;
  compressorStates: any;
  compressorFunctions: any;
  controlWhichChannel: any;
}
// I have an idea about the below, I can make an state obj above the compressor component
// which will have all the functions to control the compressor + the values of the thingies
// coming from their .value, and the "dropdown" to change channel will change value of the state obj default to use that one and so on
// todo, aici cand o sa fac cu multiple compressors pe un singur ala poate o sa fie mai fucked up
// ca ai vaz cu rerenderingu si alea, sper ca nu
function Compressor({
  setCompressorStates,
  compressorStates,
  compressorFunctions,
  controlWhichChannel,
}: CompressorProps) {
  const [slidersInfo] = useState([
    { id: "threshold", min: -100, max: 0, defaultValue: -24, step: 1 },
    { id: "knee", min: 0, max: 40, defaultValue: 32, step: 1 },
    { id: "ratio", min: 1, max: 19.8, defaultValue: 10.4, step: 1 },
    { id: "attack", min: 0, max: 1, defaultValue: 0.003, step: 0.1 },
    { id: "release", min: 0, max: 1, defaultValue: 0.3, step: 0.1 },
  ]);
  const [dropDownInfo] = useState([1, 2]);
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Dropdown onSelect={(e: any) => controlWhichChannel(e)}>
        <Dropdown.Toggle variant="success" id="dropdown-basic2">
          Channel
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {dropDownInfo.map((el: any) => (
            <Dropdown.Item key={el} eventKey={el}>
              {el}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              setCompressorStates({
                ...compressorStates,
                channelUI: {
                  ...compressorStates.channelUI,
                  compressorOn: !compressorStates.channelUI.compressorOn,
                },
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
