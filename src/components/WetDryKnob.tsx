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
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(defaultValue);
  }, []);
  useEffect(() => {
    onChangeFunction(value, setMain, main);
  }, [value]);

  const getDataForKnob = () => {
    let data = [];
    for (let i = min; i <= max; i = i + step) {
      data.push(i);
    }
    console.log(data);
    return data;
  };

  const [dataForKnob] = useState<number[]>(() => getDataForKnob());
  return (
    <section className="mt-2 mb-2">
      <Row>
        <Col>{label}</Col>
      </Row>
      <Row className="align-items-end justify-content-center mb-2 mt-2">
        <Col lg={1}>{leftLabel}</Col>
        <Col lg={3}>
          <CircularSlider
            hideLabelValue={true}
            width={80}
            knobSize={22}
            progressSize={10}
            // verticalOffset="50rem"
            // renderLabelValue={null}
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
        <Col lg={1}>{rightLabel}</Col>
      </Row>
    </section>
  );
}
export default WetDryKnob;
