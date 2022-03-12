import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Knob from "./Knob";
import OnOffButton from "./OnOffButton";

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
  channelNo: number;
}

function EQ({ EQFunctions, setChannelUI, channelUI, channelNo }: EQProps) {
  const { controlHigh, controlMid, controlLow } = EQFunctions.EQControl;

  const [slidersInfo] = useState([
    { label: "Hi", onChangeFunction: controlHigh },
    { label: "Mid", onChangeFunction: controlMid },
    { label: "Low", onChangeFunction: controlLow },
  ]);
  return (
    <section className="pt-3 mt-2 mb-2">
      <Row>
        <Col>
          <h3>EQ</h3>
        </Col>
      </Row>
      <Row className="mt-1 mb-2">
        <Col>
          <OnOffButton
            id={`eqOnOff-${channelNo}`}
            onChange={() =>
              setChannelUI({ ...channelUI, eqOn: !channelUI.eqOn })
            }
          />
        </Col>
      </Row>
      {slidersInfo.map((e: any) => (
        <main key={e.label}>
          <Row>
            <Col>
              <h5>{e.label}</h5>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Knob
                leftLabel={`-\u221e`}
                rightLabel="+6"
                min={-40}
                max={40}
                defaultValue={0}
                onChangeFunction={e.onChangeFunction}
              />
            </Col>
          </Row>
        </main>
      ))}
    </section>
  );
}
export default EQ;
