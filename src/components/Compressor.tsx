import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import MyCompressorSlider from "./MyCompressorSlider";
import { MyRangeSlider } from "./MyRangeSlider";

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
  const { threshold, knee, ratio, attack, release } =
    main.compressorFunctions.compressorUIStates;
  const [slidersInfo, setSlidersInfo] = useState([
    {
      id: "threshold",
      min: -100,
      max: 0,
      defaultValue: threshold,
      step: 1,
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
  // AM RAMAS AICI, AM FACUT ASTA SA MEARGA ORICAND SCHIMBI, ALL GOOD i LIKE IT.
  // ACU SA FAC PT WET DRY SLIDER CA GEN ACU NU MERGE DELOC PT CA TRE SA II FAC CEVA AICI SI PLM BFT HF U RE THE BEST
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
  //! AM RAMAS AICI, tre sa fac chestia de sub pentru fiecare knob + pt wet dry, si dupa e cam gata compressoru complet, le mai si testezi sa vezi daca se si aud lucrurile cum trebe
  // dupa FX UNIT BROOO
  useEffect(() => {
    changeAll();
  }, [main.compressorFunctions.compressorUIStates]);

  const [dropDownInfo] = useState([1, 2]);
  return (
    <section className="border align-items-center mt-2 mb-2">
      <Dropdown onSelect={(e: any) => controlWhichChannel(e)}>
        <Dropdown.Toggle variant="success" id="dropdown-basic2">
          Channel
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {dropDownInfo.map((el: any) => (
            <Dropdown.Item key={el} eventKey={el}>
              {el}
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
            defaultValue={0.5}
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
