import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
//@ts-ignore
import CircularSlider from "@fseehawer/react-circular-slider";

interface KnobProps {
  min: number;
  max: number;
  defaultValue: number;
  onChangeFunction: any;
  onChangeOptional?: any;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  label?: string;
}

function Knob({
  min,
  max,
  defaultValue,
  onChangeFunction,
  step = 1,
  leftLabel,
  rightLabel,
  label,
  onChangeOptional,
}: KnobProps) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(defaultValue);
  }, []);
  useEffect(() => {
    onChangeFunction(value);
    if (onChangeOptional) onChangeOptional(value);
  }, [value]);

  const getDataForKnob = () => {
    let data = [];
    for (let i = min; i <= max; i = i + step) data.push(i);
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
            dataIndex={dataForKnob.length / 2}
            onChange={(value: number) => setValue(value)}
          />
        </Col>
        <Col>{rightLabel}</Col>
      </Row>
    </>
  );
}
export default Knob;
