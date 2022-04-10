import { Button, Col, Dropdown, Row } from "react-bootstrap";
import CompressorKnob from "./CompressorKnob";
import ChannelDropdown from "./ChannelDropdown";
import OnOffButton from "./OnOffButton";
import WetDryKnob from "./WetDryKnob";
import { useCompressorLogic } from "./CompressorLogic";

interface CompressorProps {
  controlWhichChannel: any;
  setMain: any;
  main: any;
}

function Compressor({ controlWhichChannel, setMain, main }: CompressorProps) {
  const { gainReduction, slidersInfo } = useCompressorLogic(main);

  return (
    <section className="p-2 mt-2 bg-black">
      <h3>Compressor</h3>
      <Row className="justify-content-center align-items-center">
        <Col lg={2}>
          <ChannelDropdown controlWhichChannel={controlWhichChannel} />
        </Col>
        <Col lg={2}>
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
        <Col lg={2}>
          Reduction: {Math.abs(gainReduction) > 0.11 ? gainReduction : 0} dB
        </Col>
      </Row>
      <Row>
        {slidersInfo.map((elem: any, index: number) => (
          <Col key={elem.id}>
            <CompressorKnob
              setMain={setMain}
              main={main}
              onChangeFunction={elem.onChangeFunction}
              label={elem.id.toUpperCase()}
              min={elem.min}
              max={elem.max}
              defaultValue={elem.defaultValue}
              step={elem.step}
              leftLabel={elem.leftLabel}
              rightLabel={elem.rightLabel}
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
            onChangeFunction={main.compressorFunctions.setDryWetKnob}
            min={0}
            max={1}
            defaultValue={
              main.compressorFunctions.compressorUIStates.dryWetKnob
            }
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
