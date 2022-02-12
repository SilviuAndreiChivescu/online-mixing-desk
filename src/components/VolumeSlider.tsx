import React from "react";
import { Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";
interface VolumeSliderProps {
  controlSliderVolumeNode: (gainValue: number) => void;
}

function VolumeSlider({ controlSliderVolumeNode }: VolumeSliderProps) {
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <MyRangeSlider
            onChangeFunction={controlSliderVolumeNode}
            label="Volume"
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
export default VolumeSlider;
