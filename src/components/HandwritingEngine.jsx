import React, { useRef, useEffect, useState } from "react";
import "./handwritingEngine.css";

export default function HandwritingEngine({
  d,
  stroke = "#e5d48f",
  strokeWidth = 2,
  duration = 3,
  delay = 0,
  width = "100%",
  height,
  viewBox = "0 0 300 100",
  pressure = "medium",
}) {
  const pathRef = useRef(null);
  const [length, setLength] = useState(0);
  const [ready, setReady] = useState(false);
  const svgHeight = height && height !== "auto" ? height : undefined;

  // Map pressure to stroke width multiplier (subtle)
  const pressureMultiplier = {
    light: 1.1,
    medium: 1.2,
    realistic: 1.3,
  }[pressure] || 1.2;

  useEffect(() => {
    if (!pathRef.current) return;

    const total = pathRef.current.getTotalLength();
    setLength(total);

    // ensures correct initial render before animation
    requestAnimationFrame(() => setReady(true));
  }, [d]);

  return (
    <svg
      viewBox={viewBox}
      width={width}
      {...(svgHeight ? { height: svgHeight } : {})}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...(height === "auto" ? { height: "auto" } : {}) }}
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`handwriting-path ${ready ? "animate" : ""}`}
        style={{
          strokeDasharray: length,
          "--dash": length,
          "--duration": `${duration}s`,
          "--delay": `${delay}s`,
          "--stroke-width-start": strokeWidth,
          "--stroke-width-end": strokeWidth * pressureMultiplier,
        }}
      />
    </svg>
  );
}
