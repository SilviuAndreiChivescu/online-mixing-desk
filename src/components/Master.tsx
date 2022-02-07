import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
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
    },
    {
      label: "Master",
      onChangeFunction: masterFunctions.master.control,
      min: 0,
      max: 2,
      defaultValue: 1,
      step: 0.1,
    },
    {
      label: "Headphones",
      onChangeFunction: masterFunctions.headphones.control,
      min: 0,
      max: 2,
      defaultValue: 1,
      step: 0.1,
    },
    {
      label: "Cue Mix",
      onChangeFunction: masterFunctions.setCueMixKnob,
      min: 0,
      max: 1,
      defaultValue: 0.5,
      step: 0.1,
    },
  ]);
  return (
    <Row>
      {slidersInfo.map((el: any) => (
        <Col key={el.label}>
          <MyRangeSlider
            label={el.label}
            onChangeFunction={el.onChangeFunction}
            min={el.min}
            max={el.max}
            defaultValue={el.defaultValue}
            step={el.step}
          />
        </Col>
      ))}
    </Row>
  );
}
export default Master;
