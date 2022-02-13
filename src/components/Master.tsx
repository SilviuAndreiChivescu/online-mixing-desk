import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Knob from "./Knob";
import { MyRangeSlider } from "./MyRangeSlider";

interface MasterProps {
  masterFunctions: any;
}

function Master({ masterFunctions }: MasterProps) {
  const [slidersInfo] = useState([
    {
      label: "Booth",
      onChangeFunction: masterFunctions.booth.control,
      min: 0,
      max: 2,
      defaultValue: 1,
      step: 0.1,
      formatFunction: (label: string) => {
        if (label === "0") return `-\u221e`;
        if (label === "2") return `0`;
      },
    },
    {
      label: "Master",
      onChangeFunction: masterFunctions.master.control,
      min: 0,
      max: 2,
      defaultValue: 1,
      step: 0.1,
      formatFunction: (label: string) => {
        if (label === "0") return `-\u221e`;
        if (label === "2") return `0`;
      },
    },
    {
      label: "Headphones",
      onChangeFunction: masterFunctions.headphones.control,
      min: 0,
      max: 2,
      defaultValue: 1,
      step: 0.1,
      formatFunction: (label: string) => {
        if (label === "0") return `-\u221e`;
        if (label === "2") return `0`;
      },
    },
    {
      label: "Cue Mix",
      onChangeFunction: masterFunctions.setCueMixKnob,
      min: 0,
      max: 1,
      defaultValue: 0.5,
      step: 0.1,
      formatFunction: (label: string) => {
        if (label === "1") return `M`;
        if (label === "0") return `C`;
      },
    },
  ]);
  return (
    <Row>
      {slidersInfo.map((el: any) => (
        <Col>
          <main key={el.label}>
            <Row>
              <Col>
                <h5>{el.label}</h5>
              </Col>
            </Row>
            <Row>
              <Col key={el.label} className="d-flex justify-content-center">
                <Knob
                  formatFunction={el.formatFunction}
                  min={el.min}
                  max={el.max}
                  defaultValue={el.defaultValue}
                  step={el.step}
                  onChangeFunction={el.onChangeFunction}
                />
              </Col>
            </Row>
          </main>
        </Col>
      ))}
    </Row>
  );
}
export default Master;
