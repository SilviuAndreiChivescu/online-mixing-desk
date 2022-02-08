import React, { useEffect, useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

interface MyCompressorSliderProps {
  id?: string;
  label: string;
  className?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  onChangeFunction: any; // (e: React.ChangeEvent<HTMLInputElement>) => void;
  setMain: any;
  main: any;
}
function MyCompressorSlider({
  id,
  label,
  className,
  min,
  max,
  defaultValue,
  step,
  setMain,
  main,
  onChangeFunction,
}: MyCompressorSliderProps) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);
  return (
    <Form.Group className={className} as={Row}>
      <Col xs="3"> {label} </Col>
      <Col xs="7">
        <RangeSlider
          id={id}
          tooltip="off"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            onChangeFunction(e, setMain, main);
            setValue(parseFloat(e.target.value));
          }}
        />
      </Col>
      <Col
        className="border d-flex justify-content-center align-items-center"
        xs="2"
      >
        {value}
      </Col>
    </Form.Group>
  );
}
export default MyCompressorSlider;
