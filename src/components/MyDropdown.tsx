import React, { useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";

interface MyDropdownProps {
  chooseImpulse: any;
}
function MyDropdown({ chooseImpulse }: MyDropdownProps) {
  const [dropDownInfo] = useState([
    "Large Hall",
    "Medium Hall",
    "Small Hall",
    "Plate 1",
    "Plate 2",
    "Plate 3",
    "Large Room",
    "Medium Room",
    "Small Room",
    "Large Chamber",
    "Medium Chamber",
    "Small Chamber",
    "Stage 1",
    "Stage 2",
  ]);
  return (
    <Dropdown onSelect={(e: any) => chooseImpulse(e)}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Reberb
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {dropDownInfo.map((el: any) => (
          <Dropdown.Item key={el} eventKey={`${el.replaceAll(" ", "")}.wav`}>
            {el}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default MyDropdown;
