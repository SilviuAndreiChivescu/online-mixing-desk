import React, { useRef, useEffect } from "react";
import { useCanvasRef } from "./CanvasLogic";

interface CanvasProps {
  draw: (
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D
  ) => void;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { draw } = props;
  const { canvasRef } = useCanvasRef(draw);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
