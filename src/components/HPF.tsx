import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Knob from "./Knob";
import OnOffButton from "./OnOffButton";

interface HPFProps {
  HPFFunctions: {
    controlHighPassCutOff: (cutOffValue: number) => void;
    connectHPF: () => void;
    disconnectHPF: () => void;
    HPFOutput: GainNode;
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

function HPF({ HPFFunctions, setChannelUI, channelUI, channelNo }: HPFProps) {
  const { controlHighPassCutOff } = HPFFunctions;
  return (
    <section className="border-top pt-3 mt-2 mb-2">
      <Row>
        <Col>
          <h3>HPF</h3>
        </Col>
      </Row>
      <Row className="mt-1 mb-3">
        <Col>
          <OnOffButton
            id={`hpfOnOff-${channelNo}`}
            onChange={() =>
              setChannelUI({ ...channelUI, hpfOn: !channelUI.hpfOn })
            }
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Knob
            leftLabel="20"
            rightLabel="1k"
            min={20}
            max={1000}
            defaultValue={(1000 - 20) / 2}
            step={1}
            onChangeFunction={controlHighPassCutOff}
          />
        </Col>
      </Row>
    </section>
  );
}
export default HPF;
