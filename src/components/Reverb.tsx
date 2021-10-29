import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface ReverbProps {
  chooseImpulse: (impulseUrl: string) => void;
}

const Reverb: React.FC<ReverbProps> = ({ chooseImpulse }) => {
  const impulsesArray = ["LargeHall.mp3", "MediumHall.mp3"];
  const CustomDropdown: React.FC = () => {
    const [selectValue, setSelectValue] = useState<string>("LargeHall.mp3");
    return (
      <FormControl>
        <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="RoomType"
          value={selectValue}
          onChange={(event) => {
            chooseImpulse(event.target.value);
            setSelectValue(event.target.value);
          }}
        >
          {impulsesArray.map((impulse) => {
            var impulseDisplay = impulse.replace(".mp3", "");
            return (
              <MenuItem key={impulse} value={impulse}>
                {impulseDisplay}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  return <CustomDropdown />;
};

export default Reverb;
