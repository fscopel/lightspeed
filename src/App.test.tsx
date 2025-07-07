import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

// Mock the canvas context for testing
const mockCanvas = {
  getContext: () => ({
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    globalAlpha: 1,
    fillRect: () => {},
    clearRect: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    save: () => {},
    restore: () => {},
    translate: () => {},
    rotate: () => {},
    scale: () => {},
  }),
  width: 1280,
  height: 720,
};

// Mock HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: mockCanvas.getContext,
});

Object.defineProperty(HTMLCanvasElement.prototype, "width", {
  value: mockCanvas.width,
  writable: true,
});

Object.defineProperty(HTMLCanvasElement.prototype, "height", {
  value: mockCanvas.height,
  writable: true,
});

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(/FPS:/i)).toBeInTheDocument();
  });

  it("renders destination selector", () => {
    render(<App />);
    expect(screen.getByText(/Destination:/i)).toBeInTheDocument();
  });

  it("renders time simulation section", () => {
    render(<App />);
    expect(
      screen.getByText(/Relativistic Time Simulation/i)
    ).toBeInTheDocument();
  });
});
