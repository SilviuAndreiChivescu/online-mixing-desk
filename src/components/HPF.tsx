import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";
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
}

function HPF({ HPFFunctions, setChannelUI, channelUI }: HPFProps) {
  const { controlHighPassCutOff } = HPFFunctions;
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Row>
        <Col>
          <h3>HPF</h3>
        </Col>
      </Row>
      <OnOffButton
        id="hpfOn"
        onChange={() => setChannelUI({ ...channelUI, hpfOn: !channelUI.hpfOn })}
      />
      <Row>
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
