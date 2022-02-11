import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

interface CustomDropdownProps {
  controlWhichChannel: any;
}

function CustomDropdown({ controlWhichChannel }: CustomDropdownProps) {
  const [dropDownInfo, setDropDownInfo] = useState([
    { channel: 1, active: true },
    { channel: 2, active: false },
  ]);

  const handleActive = (channel: number) => {
    let items = [...dropDownInfo];
    // Make current true active, to false
    let missingItemIndex =
      items.filter((item: any) => item.active === true)[0].channel - 1;
    let itemTrue = { ...items[missingItemIndex] };
    itemTrue.active = false;
    items[missingItemIndex] = itemTrue;

    // Make selected one to true
    let item = { ...items[channel - 1] };
    item.active = true;
    items[channel - 1] = item;
    setDropDownInfo(items);
  };
  return (
    <Dropdown
      onSelect={(e: any) => {
        controlWhichChannel(e);
        handleActive(e);
      }}
    >
      <Dropdown.Toggle variant="success" id="dropdown-basic2">
        Channel
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {dropDownInfo.map((el: any) => (
          <Dropdown.Item
            active={el.active}
            key={el.channel}
            eventKey={el.channel}
          >
            {el.channel}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default CustomDropdown;
