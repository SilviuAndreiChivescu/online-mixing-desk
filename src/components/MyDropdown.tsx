import React, { useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";

interface MyDropdownProps {
  chooseImpulse: any;
}
function MyDropdown({ chooseImpulse }: MyDropdownProps) {
  const [dropDownInfo, setDropDownInfo] = useState([
    { impulse: "Large Hall", active: true, index: 1 },
    { impulse: "Medium Hall", active: false, index: 2 },
    { impulse: "Small Hall", active: false, index: 3 },
    { impulse: "Plate 1", active: false, index: 4 },
    { impulse: "Plate 2", active: false, index: 5 },
    { impulse: "Plate 3", active: false, index: 6 },
    { impulse: "Large Room", active: false, index: 7 },
    { impulse: "Medium Room", active: false, index: 8 },
    { impulse: "Small Room", active: false, index: 9 },
    { impulse: "Large Chamber", active: false, index: 10 },
    { impulse: "Medium Chamber", active: false, index: 11 },
    { impulse: "Small Chamber", active: false, index: 12 },
    { impulse: "Stage 1", active: false, index: 13 },
    { impulse: "Stage 2", active: false, index: 14 },
  ]);
  const handleActive = (impulseWav: string) => {
    let items = [...dropDownInfo];
    // Make current true active, to false
    let missingItemIndex =
      items.filter((item: any) => item.active === true)[0].index - 1;
    let itemTrue = { ...items[missingItemIndex] };
    itemTrue.active = false;
    items[missingItemIndex] = itemTrue;

    // Make selected one to true
    // First, get its index based on its name
    let indexItemToChange = -1;
    const impulse = impulseWav.split(".wav")[0];
    const impulsesToSearch = dropDownInfo.map((e: any) => {
      return [e.impulse.replace(" ", ""), e.index];
    });
    for (let i = 0; i < impulsesToSearch.length; i++) {
      if (impulse === impulsesToSearch[i][0]) {
        indexItemToChange = impulsesToSearch[i][1];
      }
    }

    let item = { ...items[indexItemToChange - 1] };
    item.active = true;
    items[indexItemToChange - 1] = item;
    setDropDownInfo(items);
  };

  return (
    <Dropdown
      onSelect={(e: any) => {
        chooseImpulse(e);
        handleActive(e);
      }}
    >
      <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
        Reberb
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {dropDownInfo.map((el: any) => (
          <Dropdown.Item
            active={el.active}
            key={el.impulse}
            eventKey={`${el.impulse.replaceAll(" ", "")}.wav`}
          >
            {el.impulse}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default MyDropdown;
