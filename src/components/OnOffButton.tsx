import React from "react";
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

interface OnOffButtonProps {
  id: string;
  onChange: () => void;
}

function OnOffButton({ id, onChange }: OnOffButtonProps) {
  return (
    <Row>
      <Col className="mt-2 mb-2">
        <ToggleButtonGroup type="checkbox" onChange={onChange}>
          <ToggleButton variant="outline-dark" id={id} value="1">
            IN
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
    </Row>
  );
}
export default OnOffButton;
