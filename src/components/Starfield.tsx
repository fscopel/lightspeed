import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

interface StarfieldProps {
  width?: number;
  height?: number;
  numStars?: number;
  speed?: number;
  onFpsUpdate?: (fps: number) => void;
}

function Starfield({
  width = 1280,
  height = 720,
  numStars = 800,
  speed = 0.5,
  onFpsUpdate,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(speed);
  const fpsRef = useRef({ lastTime: 0, frameCount: 0, fps: 0 });

  // Update speed ref when prop changes - this doesn't cause remount
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Main animation loop - speed is NOT in dependency array
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize stars
    starsRef.current = Array.from({ length: numStars }, () => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * 1000,
      prevX: 0,
      prevY: 0,
    }));

    const animate = (currentTime: number) => {
      // FPS calculation
      const fps = fpsRef.current;
      fps.frameCount++;

      if (currentTime - fps.lastTime >= 1000) {
        fps.fps = Math.round(
          (fps.frameCount * 1000) / (currentTime - fps.lastTime)
        );
        fps.frameCount = 0;
        fps.lastTime = currentTime;

        if (onFpsUpdate) {
          onFpsUpdate(fps.fps);
        }
      }

      // Clear canvas
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      // Center origin
      ctx.save();
      ctx.translate(width / 2, height / 2);

      starsRef.current.forEach((star) => {
        star.prevX = (star.x / star.z) * 100;
        star.prevY = (star.y / star.z) * 100;

        // Use speedRef.current here - this gets updated without remounting
        star.z -= speedRef.current;

        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = 1000;
        }

        const x = (star.x / star.z) * 100;
        const y = (star.y / star.z) * 100;
        const size = (1 - star.z / 1000) * 2;
        const opacity = 1 - star.z / 1000;

        // Draw star trail
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        ctx.lineWidth = size / 2;
        ctx.beginPath();
        ctx.moveTo(star.prevX, star.prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    fpsRef.current.lastTime = performance.now();
    animate(fpsRef.current.lastTime);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, numStars, onFpsUpdate]); // speed is NOT here!

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: "1px solid #333",
        backgroundColor: "black",
      }}
    />
  );
}

export default Starfield;
