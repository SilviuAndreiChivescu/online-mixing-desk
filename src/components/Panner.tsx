import React from "react";
import { Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface PannerProps {
  channelFunctions: any;
}

function Panner({ channelFunctions }: PannerProps) {
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <MyRangeSlider
            onChangeFunction={channelFunctions.controlPannerNode}
            label="Panner"
            min={-1}
            max={1}
            defaultValue={0}
            step={0.1}
          />
        </Col>
      </Row>
    </section>
  );
}
export default Panner;
