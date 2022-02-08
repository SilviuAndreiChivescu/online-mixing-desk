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
// I have an idea about the below, I can make an state obj above the compressor component
// which will have all the functions to control the compressor + the values of the thingies
// coming from their .value, and the "dropdown" to change channel will change value of the state obj default to use that one and so on
// todo, aici cand o sa fac cu multiple compressors pe un singur ala poate o sa fie mai fucked up
// ca ai vaz cu rerenderingu si alea, sper ca nu
function Compressor({
  setCompressorStates,
  compressorStates,
  compressorFunctions,
  controlWhichChannel,
  setMain,
  main,
}: CompressorProps) {
  const [slidersInfo, setSlidersInfo] = useState([
    {
      id: "threshold",
      min: -100,
      max: 0,
      defaultValue: main.compressorFunctions.compressorUIStates.threshold,
      step: 1,
    },
    { id: "knee", min: 0, max: 40, defaultValue: 32, step: 1 },
    { id: "ratio", min: 1, max: 19.8, defaultValue: 10.4, step: 1 },
    { id: "attack", min: 0, max: 1, defaultValue: 0.003, step: 0.1 },
    { id: "release", min: 0, max: 1, defaultValue: 0.3, step: 0.1 },
  ]);
  const handleChange = (index: number, newValue: number) => {
    // 1. Make a shallow copy of the items
    let items = [...slidersInfo];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    item.defaultValue = newValue;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    setSlidersInfo(items);
  };
  // am ramas aici, tre sa fac chestia de sub pentru fiecare knob + pt wet dry, si dupa e cam gata compressoru complet, le mai si testezi sa vezi daca se si aud lucrurile cum trebe
  // dupa FX UNIT BROOO
  useEffect(() => {
    handleChange(0, main.compressorFunctions.compressorUIStates.threshold);
  }, [main.compressorFunctions.compressorUIStates.threshold]);

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
