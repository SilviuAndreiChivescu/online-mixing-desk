import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface HPFProps {
  HPFFunctions: any;
  setChannelUI: any;
  channelUI: any;
}

function HPF({ HPFFunctions, setChannelUI, channelUI }: HPFProps) {
  const { controlHighPassCutOff } = HPFFunctions;
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <Button
            className=""
            onClick={() =>
              setChannelUI({ ...channelUI, hpfOn: !channelUI.hpfOn })
            }
          >
            HPF On / Off
          </Button>
        </Col>
        <Col>
          <MyRangeSlider
            onChangeFunction={controlHighPassCutOff}
            label="Cut Off"
            min={20}
            max={1000}
            defaultValue={(1000 - 20) / 2}
            step={1}
          />
        </Col>
      </Row>
    </section>
  );
}
export default HPF;
