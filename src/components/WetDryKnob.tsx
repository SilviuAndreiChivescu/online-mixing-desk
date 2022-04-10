import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
//@ts-ignore
import CircularSlider from "@fseehawer/react-circular-slider";

interface WetDryKnobProps {
  min: number;
  max: number;
  defaultValue: number;
  onChangeFunction: any;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  label?: string;
  setMain: any;
  main: any;
}

function WetDryKnob({
  min,
  max,
  defaultValue,
  onChangeFunction,
  step = 1,
  leftLabel,
  rightLabel,
  label,
  setMain,
  main,
}: WetDryKnobProps) {
  const getDataForKnob = () => {
    let data = [];
    for (let i = min; i <= max; i = i + step) {
      data.push(i);
    }
    return data;
  };

  const [dataForKnob] = useState<number[]>(() => getDataForKnob());
  return (
    <section className="mt-2 mb-2">
      <Row className="mb-3">
        <Col>{label}</Col>
      </Row>
      <Row className="align-items-end justify-content-center mb-2">
        <Col lg={1}>{leftLabel}</Col>
        <Col lg={3}>
          <CircularSlider
            hideLabelValue={true}
            width={80}
            knobSize={22}
            progressSize={10}
            knobPosition="bottom"
            knobColor="#FFFAF0"
            progressColorFrom="#808080"
            progressColorTo="#696969"
            trackColor="#eeeeee"
            trackSize={10}
            data={dataForKnob}
            dataIndex={dataForKnob.indexOf(defaultValue)}
            onChange={(value: number) => onChangeFunction(value, setMain, main)}
          />
        </Col>
        <Col lg={1}>{rightLabel}</Col>
      </Row>
    </section>
  );
}
export default WetDryKnob;
