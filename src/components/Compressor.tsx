import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import CustomDropdown from "./CustomDropdown";
import MyCompressorSlider from "./MyCompressorSlider";
import OnOffButton from "./OnOffButton";
import WetDryKnob from "./WetDryKnob";

// todo change these from any to its own
interface CompressorProps {
  compressorFunctions: any;
  controlWhichChannel: any;
  setMain: any;
  main: any;
}

function Compressor({
  compressorFunctions,
  controlWhichChannel,
  setMain,
  main,
}: CompressorProps) {
  const { threshold, knee, ratio, attack, release, dryWetKnob } =
    main.compressorFunctions.compressorUIStates;
  const [slidersInfo, setSlidersInfo] = useState([
    {
      id: "threshold",
      min: -100,
      max: 0,
      defaultValue: threshold,
      step: 10,
      leftLabel: "\u221e : 1",
      rightLabel: "1 : 1",
    },
    {
      id: "knee",
      min: 0,
      max: 40,
      defaultValue: knee,
      step: 1,
      leftLabel: "0",
      rightLabel: "1",
    },
    {
      id: "ratio",
      min: 1,
      max: 19.8,
      defaultValue: ratio,
      step: 1,
      leftLabel: "2",
      rightLabel: "10",
    },
    {
      id: "attack",
      min: 0.1,
      max: 1,
      defaultValue: attack,
      step: 0.1,
      leftLabel: "0.1",
      rightLabel: "30",
    },
    {
      id: "release",
      min: 0.1,
      max: 1,
      defaultValue: release,
      step: 0.1,
      leftLabel: "0.1",
      rightLabel: "1",
    },
  ]);
  // This function changes all the values of a channel compressor whenever it changes
  const changeAll = () => {
    // 1. Make a shallow copy of the items
    let items = [...slidersInfo];
    // 2. Make a shallow copy of the item you want to mutate
    let thresholdItem = { ...items[0] };
    let kneeItem = { ...items[1] };
    let ratioItem = { ...items[2] };
    let attackItem = { ...items[3] };
    let releaseItem = { ...items[4] };
    // 3. Replace the property you're intested in
    thresholdItem.defaultValue = threshold;
    kneeItem.defaultValue = knee;
    ratioItem.defaultValue = ratio;
    attackItem.defaultValue = attack;
    releaseItem.defaultValue = release;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[0] = thresholdItem;
    items[1] = kneeItem;
    items[2] = ratioItem;
    items[3] = attackItem;
    items[4] = releaseItem;
    // 5. Set the state to our new copy
    setSlidersInfo(items);
  };

  useEffect(() => {
    changeAll();
  }, [main.compressorFunctions.compressorUIStates]);

  return (
    <section className="border p-2 mt-2">
      <h3>Compressor</h3>
      <Row className="justify-content-center align-items-center">
        <Col lg={1}>
          <CustomDropdown controlWhichChannel={controlWhichChannel} />
        </Col>
        <Col lg={1}>
          <OnOffButton
            checkedArray={main.channelUI.compressorOn ? [1] : []}
            id="compressorOn"
            onChange={() =>
              setMain({
                ...main,
                channelUI: {
                  ...main.channelUI,
                  compressorOn: !main.channelUI.compressorOn,
                },
              })
            }
          />
        </Col>
      </Row>
      <Row>
        {slidersInfo.map((elem: any, index: number) => (
          <Col key={elem.id}>
            <MyCompressorSlider
              setMain={setMain}
              main={main}
              onChangeFunction={compressorFunctions.compressorControl}
              id={elem.id}
              label={elem.id.toUpperCase()}
              min={elem.min}
              max={elem.max}
              defaultValue={elem.defaultValue}
              step={elem.step}
              leftLabel={elem.leftLabel}
              rightLabel={elem.rightLabel}
              className="mt-2 mb-4"
            />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Col lg={5}>
          <WetDryKnob
            label="Wet Dry"
            setMain={setMain}
            main={main}
            onChangeFunction={compressorFunctions.setDryWetKnob}
            min={0}
            max={1}
            defaultValue={dryWetKnob}
            step={0.1}
            leftLabel={"Dry"}
            rightLabel={"Wet"}
          />
        </Col>
      </Row>
    </section>
  );
}
export default Compressor;
