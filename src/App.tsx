import { useCallback, useRef, useState } from "react";
import "./App.css";
import RelativisticClock from "./components/RelativisticClock";
import Starfield from "./components/Starfield";
import {
  ASTRONOMICAL_DISTANCES,
  calculateAllEffectsWithDistance,
  LIGHT_YEAR_IN_KM,
} from "./utils/relativity";

function App() {
  const [speed, setSpeed] = useState(0.0);
  const [selectedDestination, setSelectedDestination] =
    useState<keyof typeof ASTRONOMICAL_DISTANCES>("PROXIMA_CENTAURI");
  const fpsRef = useRef<HTMLSpanElement>(null);

  // Calculate relativistic effects for current speed
  let speedFraction = speed / 2;
  speedFraction = speedFraction >= 1 ? 0.999999999999 : speedFraction;

  const journey = calculateAllEffectsWithDistance(
    speedFraction,
    ASTRONOMICAL_DISTANCES[selectedDestination]
  );

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(event.target.value));
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDestination(
      event.target.value as keyof typeof ASTRONOMICAL_DISTANCES
    );
  };

  // Create a human-readable name mapping
  const destinationNames: Record<keyof typeof ASTRONOMICAL_DISTANCES, string> =
    {
      PROXIMA_CENTAURI: "Proxima Centauri",
      GALACTIC_CENTER: "Galactic Center",
      ANDROMEDA_GALAXY: "Andromeda Galaxy",
      OBSERVABLE_UNIVERSE: "Observable Universe",
      ALPHA_CENTAURI: "Alpha Centauri",
      SIRIUS: "Sirius",
      VEGA: "Vega",
      POLARIS: "Polaris",
    };

  const handleFpsUpdate = useCallback((newFps: number) => {
    if (fpsRef.current) {
      fpsRef.current.textContent = newFps.toString();
    }
  }, []);

  // Function to format contracted distance with appropriate units
  const formatContractedDistance = (distanceLy: number) => {
    if (distanceLy < 1) {
      const distanceKm = distanceLy * LIGHT_YEAR_IN_KM;
      const distanceMiles = distanceKm * 0.621371; // km to miles conversion

      if (distanceKm < 1) {
        const distanceM = distanceKm * 1000;
        return `${distanceM.toFixed(0)} m (${(distanceMiles * 1609.34).toFixed(
          0
        )} ft)`;
      } else {
        return `${distanceKm.toFixed(2)} km (${distanceMiles.toFixed(2)} mi)`;
      }
    } else {
      return `${distanceLy.toFixed(2)} ly`;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          fontFamily: "monospace",
          fontSize: "16px",
          zIndex: 10,
        }}
      >
        <div>
          FPS: <span ref={fpsRef}>0</span>
        </div>
      </div>
      <Starfield speed={speed} numStars={800} onFpsUpdate={handleFpsUpdate} />

      {/* Relativistic Journey Information */}
      <div
        style={{
          width: "90%",
          color: "white",
          fontFamily: "monospace",
          fontSize: "14px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 10,

          overflowY: "auto",
        }}
      >
        <div
          style={{ marginBottom: "10px", fontSize: "16px", color: "#00ffff" }}
        >
          Journey to {destinationNames[selectedDestination]} (
          {ASTRONOMICAL_DISTANCES[selectedDestination]} light years)
        </div>
        <div style={{ marginBottom: "8px", color: "#ffff00" }}>
          <div>At {(speedFraction * 100).toFixed(10)}% light speed:</div>

          <div>({(speedFraction * 186282.397).toFixed(2)} miles/sec):</div>
          <div>({(speedFraction * 299792.458).toFixed(2)} km/s)</div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            textAlign: "center",
          }}
        >
          <div>
            <div>
              Distance contracted to:{" "}
              {formatContractedDistance(journey.contractedDistance)}
            </div>
            <div>
              Time dilation factor: {journey.timeDilationFactor.toFixed(2)}x
            </div>
            <div style={{ color: "#90EE90" }}>
              Coordinate time: {journey.coordinateTimeFormatted.formatted}
            </div>
            <div style={{ color: "#FFB6C1" }}>
              Proper time: {journey.properTimeFormatted.formatted}
            </div>
            <div>
              Length contraction:{" "}
              {(journey.lengthContractionFactor * 100).toFixed(10)}%
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                marginTop: "15px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <input
                  type="range"
                  min="0.00"
                  max="2"
                  step="0.00001"
                  value={speed}
                  onChange={handleRangeChange}
                  className="futuristic-slider"
                  data-speed={speed > 1.5 ? "high" : "normal"}
                  style={{
                    display: "block",
                    marginTop: "5px",
                    width: "200px",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                Destination:
                <select
                  value={selectedDestination}
                  onChange={handleDestinationChange}
                  style={{
                    display: "block",
                    marginTop: "5px",
                    width: "200px",
                    padding: "5px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "3px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                  }}
                >
                  {Object.entries(destinationNames).map(([key, name]) => (
                    <option
                      key={key}
                      value={key}
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      {name} (
                      {
                        ASTRONOMICAL_DISTANCES[
                          key as keyof typeof ASTRONOMICAL_DISTANCES
                        ]
                      }{" "}
                      ly)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <RelativisticClock
              timeDilationFactor={journey.timeDilationFactor}
              velocityFraction={speedFraction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
