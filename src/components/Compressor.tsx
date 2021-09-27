import React from "react";
import { Form } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface CompressorProps {
  compressorControl: {
    disconnectCompressor: () => void;
    connectCompressor: () => void;
    compressorThreshold: (threholdValue: number) => void;
    compressorKnee: (kneeValue: number) => void;
    compressorRatio: (ratioValue: number) => void;
    compressorAttack: (attackValue: number) => void;
    compressorRelease: (releaseValue: number) => void;
  };
}

export const Compressor: React.FC<CompressorProps> = ({
  compressorControl,
}) => {
  return (
    <>
      <Form.Group className="text-start">
        <p>Compressor</p>
        <Form.Check
          name="compression"
          type="radio"
          label="NO compression"
          aria-label="compression-radio"
          onChange={() => compressorControl.disconnectCompressor()}
          defaultChecked
        />
        <Form.Check
          name="compression"
          type="radio"
          label="Compression"
          aria-label="compression-radio"
          onChange={() => compressorControl.connectCompressor()}
        />
      </Form.Group>
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorThreshold(e)}
        label="Threshold"
        min={-10000}
        max={0}
        defaultValue={-2400}
        step={1000}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorKnee(e)}
        label="Knee"
        min={0}
        max={4000}
        defaultValue={3200}
        step={400}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorRatio(e)}
        label="Ratio"
        min={100}
        max={1996}
        defaultValue={1048}
        step={237}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorAttack(e)}
        label="Attack"
        min={0}
        max={100}
        defaultValue={0}
        step={10}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorRelease(e)}
        label="Release"
        min={0}
        max={100}
        defaultValue={30}
        step={10}
        className="mt-4 mb-4"
      />
    </>
  );
};
