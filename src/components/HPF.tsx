import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface HPFProps {
  HPFFunctions: any;
  setChannelOneUI: any;
  channelOneUI: any;
}

function HPF({ HPFFunctions, setChannelOneUI, channelOneUI }: HPFProps) {
  const { controlHighPassCutOff } = HPFFunctions;
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <Button
            className=""
            onClick={() =>
              setChannelOneUI({ ...channelOneUI, hpfOn: !channelOneUI.hpfOn })
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
