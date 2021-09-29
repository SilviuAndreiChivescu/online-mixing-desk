import React, { useRef, useEffect } from "react";

interface OscilloscopeProps {
  draw: (
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D
  ) => void;
}

export const Oscilloscope: React.FC<OscilloscopeProps> = (props) => {
  const { draw } = props;

  // Get canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let animationFrameId: any;
    const canvas = canvasRef.current;

    const render = () => {
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context !== null) {
          draw(canvas, context);
          animationFrameId = window.requestAnimationFrame(render);
        }
      }
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};
