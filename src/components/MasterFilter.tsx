import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface MasterFilterProps {
  masterFilterToExport: any;
}

function MasterFilter({ masterFilterToExport }: MasterFilterProps) {
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              masterFilterToExport.setMasterFilterOn(
                (currValue: boolean) => !currValue
              )
            }
          >
            Master Filter On / Off
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <MyRangeSlider
            label="HPF"
            onChangeFunction={
              masterFilterToExport.masterFilterFunctions.controlHighPassCutOff
            }
            onChangeOptional={
              masterFilterToExport.masterFilterCueFunctions
                .controlHighPassCutOff
            }
            min={20}
            max={1000}
            defaultValue={500}
            step={10}
          />
        </Col>
        <Col>
          <MyRangeSlider
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
