import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

interface ChannelDropdownProps {
  controlWhichChannel: any;
}

function ChannelDropdown({ controlWhichChannel }: ChannelDropdownProps) {
  const [dropDownInfo, setDropDownInfo] = useState([
    { channel: 1, active: true },
    { channel: 2, active: false },
    { channel: 3, active: false },
    { channel: 4, active: false },
    { channel: 5, active: false },
    { channel: 6, active: false },
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
      className="mb-2 mt-2"
      onSelect={(e: any) => {
        controlWhichChannel(e);
        handleActive(e);
      }}
    >
      <Dropdown.Toggle variant="outline-warning" id="dropdown-basic2">
        Ch
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
export default ChannelDropdown;
