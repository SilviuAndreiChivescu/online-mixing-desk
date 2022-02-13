import React, { useState } from "react";
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

interface OnOffButtonProps {
  id: string;
  onChange: () => void;
  checkedArray?: any[];
}

function OnOffButton({ id, onChange, checkedArray }: OnOffButtonProps) {
  return (
    <ToggleButtonGroup type="checkbox" value={checkedArray} onChange={onChange}>
      <ToggleButton variant="outline-dark" size="sm" id={id} value={1}>
        In
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
export default OnOffButton;
