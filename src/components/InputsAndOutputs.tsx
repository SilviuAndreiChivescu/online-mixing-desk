import React from "react";
import { Button, Col, Row } from "react-bootstrap";
// @ts-ignore
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
interface InputsAndOutputsProps {
  play: () => void;
  pause: () => void;
  replay: () => void;
}

function InputsAndOutputs({ play, pause, replay }: InputsAndOutputsProps) {
  return (
    <section className="bg-black p-2">
      <Row className="justify-content-center">
        <Col lg={1}>
          <Button variant="outline-warning" onClick={play}>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </Col>
        <Col lg={1}>
          <Button variant="outline-warning" onClick={pause}>
            <FontAwesomeIcon icon={faPause} />
          </Button>
        </Col>
        <Col lg={1}>
          <Button variant="outline-warning" onClick={replay}>
            <FontAwesomeIcon icon={faStop} />
          </Button>
        </Col>
      </Row>
    </section>
  );
}
export default InputsAndOutputs;
