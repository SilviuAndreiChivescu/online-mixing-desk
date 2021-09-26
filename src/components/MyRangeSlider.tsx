import React, { useEffect } from "react";

import { Col, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

interface MyRangeSliderProps {
  label: string;
  className?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  onChangeFunction: (value: number) => void;
}

export const MyRangeSlider: React.FC<MyRangeSliderProps> = ({
  label,
  className,
  min,
  max,
  defaultValue,
  step,
  onChangeFunction,
}) => {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, []);

  return (
    <Form.Group className={className} as={Row}>
      <Col xs="3"> {label} </Col>
      <Col xs="7">
        <RangeSlider
          tooltip="off"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            setValue(parseInt(e.target.value));
            onChangeFunction(parseInt(e.target.value));
          }}
        />
      </Col>
      <Col xs="2">
        <Form.Control className="text-center" disabled value={value / 100} />
      </Col>
    </Form.Group>
  );
};
