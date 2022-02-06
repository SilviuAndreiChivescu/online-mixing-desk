import React from "react";
import { Form } from "react-bootstrap";
import { MyRangeSlider } from "./MyRangeSlider";

interface CompressorProps {
  compressorControl: {
    disconnectCompressor: () => void;
    connectCompressor: () => void;
    compressorParams: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      {/* <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorParams(e)}
        id="threshold"
        label="Threshold"
        min={-100}
        max={0}
        defaultValue={-24}
        step={10}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorParams(e)}
        id="knee"
        label="Knee"
        min={0}
        max={40}
        defaultValue={32}
        step={4}
        className="mt-4 mb-4"
      /> */}
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorParams(e)}
        id="ratio"
        label="Ratio"
        min={1}
        max={19.8}
        defaultValue={10.4}
        step={4.7}
        className="mt-4 mb-4"
      />

      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorParams(e)}
        id="attack"
        label="Attack"
        min={0}
        max={1}
        defaultValue={0.003}
        step={0.1}
        className="mt-4 mb-4"
      />
      <MyRangeSlider
        onChangeFunction={(e) => compressorControl.compressorParams(e)}
        id="release"
        label="Release"
        min={0}
        max={1}
        defaultValue={0.3}
        step={0.1}
        className="mt-4 mb-4"
      />
    </>
  );
};
