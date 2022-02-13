import React, { useEffect, useRef, useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

interface MyCompressorSliderProps {
  id?: string;
  label: string;
  className?: string;
  min?: number;
  max?: number;
  defaultValue: number;
  step?: number;
  onChangeFunction: any;
  setMain: any;
  main: any;
  leftLabel?: string;
  rightLabel?: string;
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
  leftLabel,
  rightLabel,
}: MyCompressorSliderProps) {
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
            value={defaultValue}
            onChange={(e) => {
              onChangeFunction(e, setMain, main);
            }}
          />
        </Col>
        <Col className="d-flex align-items-end justify-content-center" lg={3}>
          <p>{rightLabel}</p>
        </Col>
      </Form.Group>
    </>
  );
}
export default MyCompressorSlider;
