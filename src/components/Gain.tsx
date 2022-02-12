import React from "react";
import { Col, Row } from "react-bootstrap";
import Knob from "./Knob";

interface GainProps {
  controlChannelGainNode: (gainValue: number) => void;
}

function Gain({ controlChannelGainNode }: GainProps) {
  return (
    <section className="border mt-2 pt-3 mb-0">
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Knob
            formatFunction={(label: string) => {
              if (label === "0") return `-10`;
              if (label === "2") return "+40";
            }}
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
