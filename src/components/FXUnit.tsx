import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ChannelDropdown from "./ChannelDropdown";
import ReverbDropdown from "./ReverbDropdown";
import OnOffButton from "./OnOffButton";
import WetDryKnob from "./WetDryKnob";

interface FXUnitProps {
  controlWhichChannel: any;
  setMain: any;
  main: any;
}

function FXUnit({ controlWhichChannel, setMain, main }: FXUnitProps) {
  const { FXUnitFunctions } = main;
  return (
    <section className="bg-black align-items-center mt-2 mb-2 pt-3 pb-2">
      <h3>FX Unit</h3>
      <Row className="justify-content-center align-items-center mb-2">
        <Col lg={2}>
          <ChannelDropdown controlWhichChannel={controlWhichChannel} />
        </Col>
        <Col lg={2}>
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
        </Col>{" "}
        <Col lg={2}>
          <ReverbDropdown
            setMain={setMain}
            main={main}
            chooseImpulse={FXUnitFunctions.chooseImpulse}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={10}>
          <WetDryKnob
            label="Wet Dry"
            setMain={setMain}
            main={main}
            onChangeFunction={FXUnitFunctions.setDryWetKnob}
            min={0}
            max={1}
            defaultValue={FXUnitFunctions.FXUnitUIStates.dryWetKnob}
            step={0.1}
            leftLabel={"Dry"}
            rightLabel={"Wet"}
          />
        </Col>
      </Row>
    </section>
  );
}
export default FXUnit;
