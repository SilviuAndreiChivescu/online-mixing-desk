import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import MyCompressorSlider from "./MyCompressorSlider";

interface CompressorProps {
  setCompressorStates: any;
  compressorStates: any;
  compressorFunctions: any;
  controlWhichChannel: any;
  setMain: any;
  main: any;
}

function Compressor({
  setCompressorStates,
  compressorStates,
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
    },
    {
      id: "knee",
      min: 0,
      max: 40,
      defaultValue: knee,
      step: 1,
    },
    {
      id: "ratio",
      min: 1,
      max: 19.8,
      defaultValue: ratio,
      step: 1,
    },
    {
      id: "attack",
      min: 0,
      max: 1,
      defaultValue: attack,
      step: 0.1,
    },
    {
      id: "release",
      min: 0,
      max: 1,
      defaultValue: release,
      step: 0.1,
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

  const [dropDownInfo, setDropDownInfo] = useState([
    { channel: 1, active: true },
    { channel: 2, active: false },
  ]);

  const handleActive = (channel: number) => {
    let items = [...dropDownInfo];
    let missingItemIndex =
      items.filter((item: any) => item.active === true)[0].channel - 1;
    let itemTrue = { ...items[missingItemIndex] };
    itemTrue.active = false;
    items[missingItemIndex] = itemTrue;
    let item = { ...items[channel - 1] };
    item.active = true;
    items[channel - 1] = item;
    setDropDownInfo(items);
  };

  return (
    <section className="border align-items-center mt-2 mb-2">
      <Dropdown
        onSelect={(e: any) => {
          controlWhichChannel(e);
          handleActive(e);
        }}
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic2">
          Channel
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {dropDownInfo.map((el: any) => (
            <Dropdown.Item
              active={el.active}
              key={el.channel}
              eventKey={el.channel}
            >
              {el.channel}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        <Col>
          <Button
            className="mt-2 mb-2"
            onClick={() =>
              setCompressorStates({
                ...compressorStates,
                channelUI: {
                  ...compressorStates.channelUI,
                  compressorOn: !compressorStates.channelUI.compressorOn,
                },
              })
            }
          >
            Compressor On / Off
          </Button>
        </Col>
      </Row>
      <Row>
        {slidersInfo.map((elem: any) => (
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
              className="mt-4 mb-4"
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <MyCompressorSlider
            label="Wet Dry"
            setMain={setMain}
            main={main}
            onChangeFunction={compressorFunctions.setDryWetKnob}
            min={0}
            max={1}
            defaultValue={dryWetKnob}
            step={0.1}
            className="mt-4 mb-4"
            id="wetDryCompressor"
          />
        </Col>
      </Row>
    </section>
  );
}
export default Compressor;
