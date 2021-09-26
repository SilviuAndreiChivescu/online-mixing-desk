import { useEffect, useRef } from "react";

const useCanvasRef = (
  draw: (canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D) => void
) => {
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
  return { canvasRef };
};

export { useCanvasRef };
