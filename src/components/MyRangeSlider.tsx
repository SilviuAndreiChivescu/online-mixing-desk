import React, { useEffect, useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

interface MyRangeSliderProps {
  id?: string;
  label: string;
  className?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  onChangeFunction: (e: number) => void;
}

export const MyRangeSlider: React.FC<MyRangeSliderProps> = ({
  id,
  label,
  className,
  min,
  max,
  defaultValue,
  step,
  onChangeFunction,
}) => {
  const [value, setValue] = useState(defaultValue || 0);
  useEffect(() => {
    onChangeFunction(value);
  }, [value]);
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
          onChange={(e) => setValue(parseFloat(e.target.value))}
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
};
