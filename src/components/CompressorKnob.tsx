import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
//@ts-ignore
import CircularSlider from "@fseehawer/react-circular-slider";

interface CompressorKnobProps {
  min: number;
  max: number;
  defaultValue: number;
  onChangeFunction: any;
  onChangeOptional?: any;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  label?: string;
  setMain: any;
  main: any;
}

function CompressorKnob({
  min,
  max,
  defaultValue,
  onChangeFunction,
  step = 1,
  leftLabel,
  rightLabel,
  label,
  onChangeOptional,
  setMain,
  main,
}: CompressorKnobProps) {
  const getDataForKnob = () => {
    let data = [];
    for (let i = min; i <= max; i = i + step) {
      data.push(i);
    }
    return data;
  };

  const [dataForKnob] = useState<number[]>(() => getDataForKnob());
  return (
    <>
      <Row className="mb-3">
        <Col>{label}</Col>
      </Row>
      <Row className="align-items-end justify-content-center mb-2">
        <Col>{leftLabel}</Col>
        <Col>
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
        <Col>{rightLabel}</Col>
      </Row>
    </>
  );
}
export default CompressorKnob;
