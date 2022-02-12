import React from "react";
import { Col, Row } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
interface VolumeSliderProps {
  controlSliderVolumeNode: (gainValue: number) => void;
}

function VolumeSlider({ controlSliderVolumeNode }: VolumeSliderProps) {
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 0.2,
      label: "1",
    },
    {
      value: 0.4,
      label: "2",
    },
    {
      value: 0.6,
      label: "3",
    },
    {
      value: 0.8,
      label: "4",
    },
    {
      value: 1,
      label: "5",
    },
    {
      value: 1.2,
      label: "6",
    },
    {
      value: 1.4,
      label: "7",
    },
    {
      value: 1.6,
      label: "8",
    },
    {
      value: 1.8,
      label: "9",
    },
    {
      value: 2,
      label: "10",
    },
  ];

  return (
    <Col>
      <Stack sx={{ height: 200 }} spacing={1} direction="row">
        <Slider
          // @ts-ignore
          onChange={(e) => controlSliderVolumeNode(e.target.value)}
          style={{ color: "gray" }}
          min={0}
          max={2}
          step={0.2}
          defaultValue={1}
          marks={marks}
          aria-label="Volume Slider"
          orientation="vertical"
        />
      </Stack>
    </Col>
  );
}
export default VolumeSlider;
