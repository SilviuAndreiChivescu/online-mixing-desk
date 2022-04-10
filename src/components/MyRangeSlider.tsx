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
  onChangeOptional?: (e: number) => void;
  leftLabel?: string;
  rightLabel?: string;
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
  onChangeOptional,
  leftLabel,
  rightLabel,
}) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, []);
  useEffect(() => {
    onChangeFunction(value);
    if (onChangeOptional) onChangeOptional(value);
  }, [value]);
  return (
    <>
      <Row className="mt-2">
        <Col> {label} </Col>
      </Row>
      <Form.Group className={className} as={Row}>
        <Col className="d-flex align-items-end justify-content-center" lg={3}>
          <p>{leftLabel}</p>
        </Col>
        <Col>
          <RangeSlider
            variant="secondary"
            size="lg"
            id={id}
            tooltip="off"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
          />
        </Col>
        <Col className="d-flex align-items-end justify-content-center" lg={3}>
          <p>{rightLabel}</p>
        </Col>
      </Form.Group>
    </>
  );
};
