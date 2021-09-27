import React, { useRef, useEffect } from "react";
import { useCanvasRef } from "./CanvasLogic";

interface OscilloscopeProps {
  draw: (
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D
  ) => void;
}

export const Oscilloscope: React.FC<OscilloscopeProps> = (props) => {
  const { draw } = props;
  const { canvasRef } = useCanvasRef(draw);

  return <canvas ref={canvasRef} {...props} />;
};
