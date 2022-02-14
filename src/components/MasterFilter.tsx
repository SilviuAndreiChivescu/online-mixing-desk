import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Knob from "./Knob";
import { MyRangeSlider } from "./MyRangeSlider";
import OnOffButton from "./OnOffButton";

interface MasterFilterProps {
  masterFilterToExport: any;
}

function MasterFilter({ masterFilterToExport }: MasterFilterProps) {
  return (
    <section className="border align-items-center mt-2 mb-2 pt-3 pb-2">
      <Row className="mb-2">
        <Col>
          <h3>MASTER FILTER</h3>
        </Col>
      </Row>
      <OnOffButton
        id="masterFilterOn"
        onChange={() =>
          masterFilterToExport.setMasterFilterOn(
            (currValue: boolean) => !currValue
          )
        }
      />
      <Row className="justify-content-center mt-4">
        <Col>
          <Knob
            label="HPF"
            leftLabel={"20"}
            rightLabel={"1k"}
            min={20}
            max={1000}
            step={1}
            defaultValue={500}
            onChangeFunction={
              masterFilterToExport.masterFilterFunctions.controlHighPassCutOff
            }
            onChangeOptional={
              masterFilterToExport.masterFilterCueFunctions
                .controlHighPassCutOff
            }
          />
        </Col>
        <Col>
          <Knob
            leftLabel="500"
            rightLabel="20k"
            label="LPF"
            onChangeFunction={
              masterFilterToExport.masterFilterFunctions.controlLowPassCutOff
            }
            onChangeOptional={
              masterFilterToExport.masterFilterCueFunctions.controlLowPassCutOff
            }
            min={500}
            max={20000}
            defaultValue={1500}
            step={10}
          />
        </Col>
      </Row>
    </section>
  );
}
export default MasterFilter;
