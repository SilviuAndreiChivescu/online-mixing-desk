import React, { useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
// todo change the name of this
interface MyDropdownProps {
  chooseImpulse: any;
  setMain: any;
  main: any;
}
function MyDropdown({ chooseImpulse, setMain, main }: MyDropdownProps) {
  const { dropDownInfo } = main.FXUnitFunctions;
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
    setMain({
      ...main,
      FXUnitFunctions: { ...main.FXUnitFunctions, dropDownInfo: items },
    });
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
