import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropdown";
import MyCompressorSlider from "./MyCompressorSlider";
import MyDropdown from "./MyDropdown";
import { MyRangeSlider } from "./MyRangeSlider";
import OnOffButton from "./OnOffButton";
// todo change these from any to its own

interface FXUnitProps {
  FXUnitFunctions: any;
  controlWhichChannel: any;
  setMain: any;
  main: any;
}

function FXUnit({
  FXUnitFunctions,
  controlWhichChannel,
  setMain,
  main,
}: FXUnitProps) {
  return (
    <section className="border align-items-center mt-2 mb-2">
      <CustomDropdown controlWhichChannel={controlWhichChannel} />
      <OnOffButton
        checkedArray={main.channelUI.fxUnitOn ? [1] : []}
        id="fxUnitOn"
        onChange={() =>
          setMain({
            ...main,
            channelUI: {
              ...main.channelUI,
              fxUnitOn: !main.channelUI.fxUnitOn,
            },
          })
        }
      />
      <MyDropdown chooseImpulse={FXUnitFunctions.chooseImpulse} />
      <Row>
        <Col>
          <MyCompressorSlider
            label="Wet Dry"
            setMain={setMain}
            main={main}
            onChangeFunction={FXUnitFunctions.setDryWetKnob}
            min={0}
            max={1}
            defaultValue={FXUnitFunctions.FXUnitUIStates.dryWetKnob}
            step={0.1}
            className="mt-4 mb-4"
            id="wetDryFXUnit"
          />
        </Col>
      </Row>
    </section>
  );
}
export default FXUnit;
