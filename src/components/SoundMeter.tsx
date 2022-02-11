import React, { useRef, useEffect } from "react";

interface SoundMeterProps {
  draw: (
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D
  ) => void;
}

function SoundMeter({ draw }: SoundMeterProps) {
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

  return <canvas height="300" width="10" ref={canvasRef} />;
}
export default SoundMeter;
