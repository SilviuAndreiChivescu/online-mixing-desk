import React from "react";
import { Col, Row } from "react-bootstrap";
import Knob from "./Knob";

interface GainProps {
  controlChannelGainNode: (gainValue: number) => void;
}

function Gain({ controlChannelGainNode }: GainProps) {
  return (
    <section className="border-top border-bottom mt-2 pt-3 mb-0">
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Knob
            leftLabel={"-10"}
            rightLabel={"+40"}
            min={0}
            max={2}
            step={0.1}
            defaultValue={1}
            onChangeFunction={controlChannelGainNode}
          />
        </Col>
      </Row>
    </section>
  );
}
export default Gain;
