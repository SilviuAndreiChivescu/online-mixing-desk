import React from "react";

import {Col, Form, Row} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

interface MyRangeSliderProps {
    label: string;
}

export const MyRangeSlider: React.FC<MyRangeSliderProps> = ({label}) => {

    const [ value, setValue ] = React.useState(25);
  
    return (
      <Form>
        <Form.Group as={Row}>
            <Col> {label} </Col>
          <Col xs="6">
            <RangeSlider
              value={value}
              onChange={e => setValue(parseInt(e.target.value))}
            />
          </Col>
          <Col xs="3">
            <Form.Control value={value}/>
          </Col>
        </Form.Group>
      </Form>
    );
  
  };
