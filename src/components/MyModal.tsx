import React, { useEffect, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";

interface MyModalProps {
  show: boolean;
  closeModal: () => void;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
}

function MyModal({ show, closeModal, isChecked, setIsChecked }: MyModalProps) {
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title id="contained-modal-title-vcenter">
          Web Audio API Mixer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-center mb-3">
          Depending on your screen resolution, you might have to adjust the zoom
          of the browser page. The mixer should look similar to this:
        </h5>
        <section className="d-flex justify-content-center">
          <Image width="1200" src="assets/images/mixer-front-end.png" />
        </section>
        <h5 className="text-center mb-3">
          The "Play", "Pause", "Stop" buttons control audio samples that are
          embeded on each audio channel. The "Info" button will open this page.
        </h5>
        <h5 className="text-center mb-3">
          At the moment, the 3 master controlers "Master", "Booth" and
          "Headphones" control the same output since the browser do not yet
          support multiple channels from an external audio interface.
        </h5>
        <section className="d-flex justify-content-center fs-4">
          <Form>
            <Form.Check
              type="checkbox"
              id="showModal"
              label="Check this box to not display the modal next time you open the mixer"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          </Form>
        </section>
        <section className="d-flex justify-content-center">
          <Button variant="outline-dark" onClick={closeModal}>
            Close
          </Button>
        </section>
      </Modal.Body>
    </Modal>
  );
}
export default MyModal;
