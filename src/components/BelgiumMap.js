import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BelgiumMapSVG from '../assets/images/Belgium Map.svg';

const BelgiumMap = ({ markers = [], onHoverMarker = null }) => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="relative w-full h-full">
            <svg
                viewBox="0 0 400 300"
                className="w-full h-full drop-shadow-lg"
                style={{ width: '100%', height: '100%' }}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Belgium Map as base layer */}
                <image
                    href={BelgiumMapSVG}
                    x="0"
                    y="0"
                    width="400"
                    height="300"
                />

                {/* Interactive Markers */}
                {markers.map((marker, index) => {
                    const isHovered = hoveredId === marker.id;
                    const siteCharcoal = "#101E0E";
                    const activeCharcoal = "#040804";

                    return (
                        <g
                            key={marker.id || index}
                            className={`cursor-${marker.path ? 'pointer' : 'default'} touch-manipulation`}
                            onMouseEnter={() => {
                                setHoveredId(marker.id);
                                if (onHoverMarker) onHoverMarker(marker.id);
                            }}
                            onMouseLeave={() => {
                                setHoveredId(null);
                                if (onHoverMarker) onHoverMarker(null);
                            }}
                        >
                            {/* Ping Animation */}
                            <motion.circle
                                cx={marker.x}
                                cy={marker.y}
                                r={18}
                                fill={siteCharcoal}
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{
                                    scale: [0.8, 1.8, 0.8],
                                    opacity: [0.5, 0.2, 0.5]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Solid Marker Core */}
                            {marker.path ? (
                                <Link to={marker.path}>
                                    <motion.circle
                                        cx={marker.x}
                                        cy={marker.y}
                                        r={isHovered ? 14 : 10}
                                        fill={isHovered ? activeCharcoal : siteCharcoal}
                                        whileHover={{ scale: 1.5 }}
                                        style={{ opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    />
                                </Link>
                            ) : (
                                <motion.circle
                                    cx={marker.x}
                                    cy={marker.y}
                                    r={isHovered ? 14 : 10}
                                    fill={isHovered ? activeCharcoal : siteCharcoal}
                                    style={{ opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                />
                            )}

                            {/* Permanent Label */}
                            <motion.g
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pointer-events-none"
                                transition={{ duration: 0.2 }}
                            >
                                <text
                                    x={marker.x}
                                    y={marker.y - 45}
                                    textAnchor="middle"
                                    className="font-cormorant font-bold uppercase tracking-widest leading-none drop-shadow-xl"
                                    style={{
                                        fill: siteCharcoal,
                                        fontSize: '36px',
                                        filter: 'drop-shadow(0px 4px 8px rgba(255,255,255,0.9)) drop-shadow(0px -4px 8px rgba(255,255,255,0.9)) drop-shadow(4px 0px 8px rgba(255,255,255,0.9)) drop-shadow(-4px 0px 8px rgba(255,255,255,0.9))'
                                    }}
                                >
                                    {marker.name}
                                </text>
                            </motion.g>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default BelgiumMap;
