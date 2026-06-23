import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import austriaMap from "../assets/images/Austria-Map.webp";

const VIEWBOX_WIDTH = 400;
/** Radii in viewBox units — 1/5 of the original 18 / 14 / 10 px markers. */
const PING_RADIUS = VIEWBOX_WIDTH * 0.009;
const CORE_RADIUS = VIEWBOX_WIDTH * 0.005;
const CORE_RADIUS_HOVER = VIEWBOX_WIDTH * 0.007;
/** Invisible tap/click target — keeps pins usable without growing the visible dot. */
const HIT_RADIUS = VIEWBOX_WIDTH * 0.025;

const AustriaMap = ({ markers = [], onHoverMarker = null, hoveredId: externalHoveredId = null }) => {
  const [internalHoveredId, setInternalHoveredId] = useState(null);
  const hoveredId = externalHoveredId ?? internalHoveredId;

  const setHover = (id) => {
    setInternalHoveredId(id);
    if (onHoverMarker) onHoverMarker(id);
  };

  return (
    <div className="relative w-full h-full aspect-[4/3]">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full drop-shadow-lg"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
      >
        <image href={austriaMap} x="0" y="0" width="400" height="300" />

        {markers.map((marker, index) => {
          const isHovered = hoveredId === marker.id;
          const siteCharcoal = "#101E0E";
          const activeCharcoal = "#040804";

          return (
            <g
              key={marker.id || index}
              className={`cursor-${marker.path ? "pointer" : "default"} touch-manipulation`}
              onMouseEnter={() => setHover(marker.id)}
              onMouseLeave={() => setHover(null)}
            >
              <motion.circle
                cx={marker.x}
                cy={marker.y}
                r={PING_RADIUS}
                fill={siteCharcoal}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.5, 0.35, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {marker.path ? (
                <Link to={marker.path}>
                  <circle cx={marker.x} cy={marker.y} r={HIT_RADIUS} fill="transparent" aria-hidden="true" />
                  <motion.circle
                    cx={marker.x}
                    cy={marker.y}
                    r={isHovered ? CORE_RADIUS_HOVER : CORE_RADIUS}
                    fill={isHovered ? activeCharcoal : siteCharcoal}
                    whileHover={{ scale: 1.35 }}
                    style={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                </Link>
              ) : (
                <motion.circle
                  cx={marker.x}
                  cy={marker.y}
                  r={isHovered ? CORE_RADIUS_HOVER : CORE_RADIUS}
                  fill={isHovered ? activeCharcoal : siteCharcoal}
                  style={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              )}

            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AustriaMap;
