import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import MyCompressorSlider from "./MyCompressorSlider";
import MyDropdown from "./MyDropdown";
import { MyRangeSlider } from "./MyRangeSlider";
interface FXUnitProps {
  setChannelUI: any;
  channelUI: any;
  FXUnitFunctions: any;
}

function FXUnit({ setChannelUI, channelUI, FXUnitFunctions }: FXUnitProps) {
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              setChannelUI({
                ...channelUI,
                fxUnitOn: !channelUI.fxUnitOn,
              })
            }
          >
            FXUnit On / Off
          </Button>
        </Col>
      </Row>
      <MyDropdown chooseImpulse={FXUnitFunctions.chooseImpulse} />
      <Row>
        <Col>
          <MyRangeSlider
            label="Wet Dry"
            onChangeFunction={FXUnitFunctions.setDryWetKnob}
            min={0}
            max={1}
            defaultValue={0.5}
            step={0.1}
          />
        </Col>
      </Row>
    </section>
  );
}
export default FXUnit;
