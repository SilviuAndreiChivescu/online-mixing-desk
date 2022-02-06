import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface EQProps {
  EQFunctions: any;
  setChannelOneUI: any;
  channelOneUI: any;
}

function EQ({ EQFunctions, setChannelOneUI, channelOneUI }: EQProps) {
  const { controlHigh, controlMid, controlLow } = EQFunctions.EQControl;

  const [slidersInfo] = useState([
    { label: "Hi", onChangeFunction: controlHigh },
    { label: "Mid", onChangeFunction: controlMid },
    { label: "Low", onChangeFunction: controlLow },
  ]);
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              setChannelOneUI({ ...channelOneUI, eqOn: !channelOneUI.eqOn })
            }
          >
            EQ On / Off
          </Button>
        </Col>
      </Row>
      <Row>
        {slidersInfo.map((e: any) => (
          <Col key={e.label}>
            <MyRangeSlider
              onChangeFunction={e.onChangeFunction}
              label={e.label}
              min={-40}
              max={40}
              defaultValue={0}
              step={1}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}
export default EQ;
