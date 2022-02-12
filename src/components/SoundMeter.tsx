import React, { useRef, useEffect } from "react";
import { Col } from "react-bootstrap";

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

  return (
    <Col>
      <canvas height="305" width="5" ref={canvasRef} />
    </Col>
  );
}
export default SoundMeter;
