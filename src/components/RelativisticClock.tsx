import { useState, useEffect, useRef } from "react";

interface RelativisticClockProps {
  timeDilationFactor: number;
  velocityFraction: number;
}

export default function RelativisticClock({
  timeDilationFactor,
  velocityFraction,
}: RelativisticClockProps) {
  const [spacecraftTime, setSpacecraftTime] = useState(0); // seconds elapsed
  const [earthTime, setEarthTime] = useState(0); // seconds elapsed
  const intervalRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());
  const currentTimeDilationRef = useRef<number>(timeDilationFactor);

  // Update the current time dilation factor when props change
  useEffect(() => {
    currentTimeDilationRef.current = timeDilationFactor;
  }, [timeDilationFactor]);

  // Start the clock automatically and keep it running
  useEffect(() => {
    lastUpdateRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 1000; // Convert to seconds

      setSpacecraftTime((prev) => prev + deltaTime);

      // Earth time progresses faster by the current time dilation factor
      // For the spacecraft: 1 second passes
      // For Earth: timeDilationFactor seconds pass
      setEarthTime((prev) => prev + deltaTime * currentTimeDilationRef.current);

      lastUpdateRef.current = now;
    }, 100); // Update every 100ms for smooth display

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Only run once on mount

  // Reset the clocks
  const resetClocks = () => {
    setSpacecraftTime(0);
    setEarthTime(0);
    lastUpdateRef.current = Date.now();
  };

  // Format spacecraft time as HH:MM:SS with milliseconds for short durations
  const formatSpacecraftTime = (seconds: number) => {
    if (seconds < 60) {
      // Show seconds with 1 decimal place for times under 1 minute
      return `${seconds.toFixed(1)}s`;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  };

  // Format Earth time with years, months, days, hours, minutes, and seconds
  const formatEarthTime = (totalSeconds: number) => {
    if (totalSeconds < 1) {
      return `${totalSeconds.toFixed(2)}s`;
    }

    // Time constants
    const secondsPerMinute = 60;
    const secondsPerHour = 3600;
    const secondsPerDay = 86400;
    const secondsPerMonth = 2629746; // Average month (365.25 / 12 * 24 * 3600)
    const secondsPerYear = 31557600; // 365.25 * 24 * 3600

    let remaining = totalSeconds;

    const years = Math.floor(remaining / secondsPerYear);
    remaining %= secondsPerYear;

    const months = Math.floor(remaining / secondsPerMonth);
    remaining %= secondsPerMonth;

    const days = Math.floor(remaining / secondsPerDay);
    remaining %= secondsPerDay;

    const hours = Math.floor(remaining / secondsPerHour);
    remaining %= secondsPerHour;

    const minutes = Math.floor(remaining / secondsPerMinute);
    const seconds = Math.floor(remaining % secondsPerMinute);

    const parts = [];

    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}mo`);
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);

    // Always include minutes
    parts.push(`${minutes}m`);

    // Only include seconds if the total time is less than 1 day
    if (totalSeconds < secondsPerDay) {
      parts.push(`${seconds}s`);
    }

    return parts.join(" ");
  };

  // Calculate time ratio for display
  const accumulatedTimeRatio = earthTime > 0 ? earthTime / spacecraftTime : 1;
  const currentTimeRatio = timeDilationFactor; // This updates instantly with speed changes

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        fontFamily: "monospace",
        color: "white",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          color: "#00ffff",
          textAlign: "center",
        }}
      >
        ⏱️ Relativistic Time Simulation
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "10px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{ color: "#FFB6C1", fontSize: "14px", marginBottom: "5px" }}
          >
            🚀 Spacecraft Time
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "rgba(255, 182, 193, 0.1)",
              padding: "8px",
              borderRadius: "4px",
              height: "50px",
            }}
          >
            {formatSpacecraftTime(spacecraftTime)}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{ color: "#90EE90", fontSize: "14px", marginBottom: "5px" }}
          >
            🌍 Earth Time
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "rgba(144, 238, 144, 0.1)",
              padding: "8px",
              borderRadius: "4px",
              height: "50px",
            }}
          >
            {formatEarthTime(earthTime)}
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#ffff00",
          marginBottom: "10px",
        }}
      >
        <div>
          Current Rate: {currentTimeRatio.toFixed(2)}:1
          {velocityFraction > 0.01 && (
            <span style={{ color: "#ff9999" }}>
              {" "}
              (Earth time {currentTimeRatio.toFixed(1)}x faster)
            </span>
          )}
        </div>
        <div style={{ fontSize: "11px", color: "#cccccc", marginTop: "3px" }}>
          Average Ratio: {accumulatedTimeRatio.toFixed(2)}:1
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={resetClocks}
          style={{
            padding: "8px 16px",
            backgroundColor: "rgba(128, 128, 128, 0.7)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontFamily: "monospace",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          🔄 Reset
        </button>
      </div>

      {velocityFraction < 0.01 && (
        <div
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#888",
            marginTop: "8px",
            fontStyle: "italic",
          }}
        >
          Increase speed to see significant time dilation effects
        </div>
      )}
    </div>
  );
}
