import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface FilterProps {
  biquadFilterControl: {
    connectBiquadFilter: () => void;
    disconnectBiquadFilter: () => void;
    biquadFilterType: (e: any) => void; // takes e of type any because with the correct type 'BiquadFilterType', can't take string from radio buttons, even if 'BiquadFilterType' is string of name 'lowpass', still can not
    biquadFilterParams: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export const Filter: React.FC<FilterProps> = ({ biquadFilterControl }) => {
  const [freqRowCount, setFreqRowCount] = useState([1]);

  return (
    <Form.Group className="text-start">
      <p>Biquad Filter</p>
      <Row>
        <Col>
          <Form.Check
            name="filter"
            type="radio"
            label="NO filter"
            aria-label="filter-radio"
            onChange={() => biquadFilterControl.disconnectBiquadFilter()}
            defaultChecked
          />
        </Col>
        <Col>
          <Form.Check
            name="filter"
            type="radio"
            label="Filter"
            aria-label="filter-radio"
            onChange={() => biquadFilterControl.connectBiquadFilter()}
          />
        </Col>
      </Row>
      {/* <Button
        onClick={() =>
          setFreqRowCount([
            ...freqRowCount,
            freqRowCount[freqRowCount.length - 1] + 1,
          ])
        }
      >
        Add another frequency
      </Button> */}
      {freqRowCount.map((e) => {
        return (
          <FrequencyRow
            key={e}
            e={e}
            biquadFilterControl={biquadFilterControl}
          />
        );
      })}
    </Form.Group>
  );
};

interface FrequencyRowProps {
  e: number;
  biquadFilterControl: {
    biquadFilterType: (e: any) => void; // takes e of type any because with the correct type 'BiquadFilterType', can't take string from radio buttons, even if 'BiquadFilterType' is string of name 'lowpass', still can not
    biquadFilterParams: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
const FrequencyRow: React.FC<FrequencyRowProps> = ({
  e,
  biquadFilterControl,
}) => {
  return (
    <section>
      <p>Type of filter: </p>
      <Form>
        <Row xs={4} lg={4} xl={4}>
          <Col>
            <Form.Check
              value="lowpass"
              name={`typeNo${e}`}
              type="radio"
              label="lowpass"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
              defaultChecked
            />
          </Col>
          <Col>
            <Form.Check
              value="highpass"
              name={`typeNo${e}`}
              type="radio"
              label="highpass"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Check
              value="bandpass"
              name={`typeNo${e}`}
              type="radio"
              label="bandpass"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Check
              value="lowshelf"
              name={`typeNo${e}`}
              type="radio"
              label="lowshelf"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Check
              value="highshelf"
              name={`typeNo${e}`}
              type="radio"
              label="highshelf"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Check
              value="peaking"
              name={`typeNo${e}`}
              type="radio"
              label="peaking"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Check
              value="notch"
              name={`typeNo${e}`}
              type="radio"
              label="notch"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Check
              value="allpass"
              name={`typeNo${e}`}
              type="radio"
              label="allpass"
              aria-label="type-radio"
              onChange={(e) =>
                biquadFilterControl.biquadFilterType(e.target.value)
              }
            />
          </Col>
        </Row>
      </Form>
      {/* END Type of Filter */}
      <MyRangeSlider
        onChangeFunction={(e) => biquadFilterControl.biquadFilterParams(e)}
        id="frequency"
        label="Frequency"
        min={10}
        max={22050}
        defaultValue={350}
        step={1}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => biquadFilterControl.biquadFilterParams(e)}
        id="Q"
        label="Q"
        min={0}
        max={1000}
        defaultValue={1}
        step={100}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => biquadFilterControl.biquadFilterParams(e)}
        id="gain"
        label="Gain"
        min={-40}
        max={40}
        defaultValue={0}
        step={10}
        className="mt-4 mb-4"
      />
    </section>
  );
};
