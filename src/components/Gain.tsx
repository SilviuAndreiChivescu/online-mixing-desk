import React from "react";
import { Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";
interface GainProps {
  controlChannelGainNode: (gainValue: number) => void;
}

function Gain({ controlChannelGainNode }: GainProps) {
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <MyRangeSlider
            onChangeFunction={controlChannelGainNode}
            label="Gain"
            min={0}
            max={2}
            defaultValue={1}
            step={0.1}
          />
        </Col>
      </Row>
    </section>
  );
}
export default Gain;
