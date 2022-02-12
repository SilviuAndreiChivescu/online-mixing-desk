import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface EQProps {
  EQFunctions: {
    EQControl: {
      controlHigh: (gainValue: number) => void;
      controlMid: (gainValue: number) => void;
      controlLow: (gainValue: number) => void;
    };
    connectEQ: () => void;
    disconnectEQ: () => void;
    EQOutput: GainNode;
  };
  setChannelUI: React.Dispatch<
    React.SetStateAction<{
      eqOn: boolean;
      hpfOn: boolean;
      compressorOn: boolean;
      fxUnitOn: boolean;
      cueOn: boolean;
      channelOn: boolean;
    }>
  >;
  channelUI: {
    eqOn: boolean;
    hpfOn: boolean;
    compressorOn: boolean;
    fxUnitOn: boolean;
    cueOn: boolean;
    channelOn: boolean;
  };
}

function EQ({ EQFunctions, setChannelUI, channelUI }: EQProps) {
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
              setChannelUI({ ...channelUI, eqOn: !channelUI.eqOn })
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
