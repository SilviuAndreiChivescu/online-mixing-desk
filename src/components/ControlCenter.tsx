import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
// @ts-ignore
import {
  faPlay,
  faPause,
  faStop,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyModal from "./MyModal";
interface ControlCenterProps {
  play: () => void;
  pause: () => void;
  replay: () => void;
}
function ControlCenter({ play, pause, replay }: ControlCenterProps) {
  const [showModal, setShowModal] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let showValue = localStorage.getItem("showModal");
    if (showValue) {
      setShowModal(JSON.parse(showValue));
      setIsChecked(!JSON.parse(showValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showModal", JSON.stringify(!isChecked));
  }, [showModal]);

  return (
    <section className="bg-black p-2">
      <MyModal
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        show={showModal}
        closeModal={() => setShowModal(false)}
      />
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
        <Col lg={1}>
          <Button variant="outline-warning" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faInfo} />
          </Button>
        </Col>
      </Row>
    </section>
  );
}
export default ControlCenter;
