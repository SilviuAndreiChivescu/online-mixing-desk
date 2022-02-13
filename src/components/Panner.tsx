import React from "react";
import { Col, Row } from "react-bootstrap";
import Knob from "./Knob";

interface PannerProps {
  controlPannerNode: (pannerValue: number) => void;
}

function Panner({ controlPannerNode }: PannerProps) {
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col className="d-flex justify-content-center">
          <Knob
            formatFunction={(label: string) => {
              if (label === "-1") return `L`;
              if (label === "1") return "R";
            }}
            min={-1}
            max={1}
            step={0.1}
            defaultValue={0}
            onChangeFunction={controlPannerNode}
          />
        </Col>
      </Row>
    </section>
  );
}
export default Panner;
