import React, { useState } from "react";
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

interface OnOffButtonProps {
  id: string;
  onChange: () => void;
  checkedArray?: any[];
  isMic?: boolean;
}

function OnOffButton({ id, onChange, checkedArray, isMic }: OnOffButtonProps) {
  return (
    <ToggleButtonGroup type="checkbox" value={checkedArray} onChange={onChange}>
      <ToggleButton variant="outline-warning" id={id} value={1}>
        In
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
export default OnOffButton;
