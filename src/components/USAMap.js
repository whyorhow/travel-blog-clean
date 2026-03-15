import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import USAMapSVG from '../assets/images/USAMap3.svg';

const USAMap = ({ markers = [], onHoverMarker = null }) => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="relative w-full aspect-[4/3]">
            <svg viewBox="0 0 1000 667" className="w-full h-full drop-shadow-lg">
                {/* USA map as base layer */}
                <image
                    href={USAMapSVG}
                    x="0"
                    y="0"
                    width="1000"
                    height="667"
                />
                
                {/* Map markers */}
                {markers.map(marker => (
                    <g key={marker.id}>
                        {/* Animated ping circle */}
                        <motion.circle
                            cx={marker.x || 0}
                            cy={marker.y || 0}
                            r={18}
                            fill="#101E0E"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.8, 0, 0.8],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        
                        {/* Clickable marker */}
                        <Link to={marker.path || '#'}>
                            <motion.circle
                                cx={marker.x || 0}
                                cy={marker.y || 0}
                                r={10}
                                fill="#E5CF6B"
                                stroke="#101E0E"
                                strokeWidth="2"
                                whileHover={{ scale: 1.2 }}
                                onMouseEnter={() => {
                                    setHoveredId(marker.id);
                                    if (onHoverMarker) onHoverMarker(marker.id);
                                }}
                                onMouseLeave={() => {
                                    setHoveredId(null);
                                    if (onHoverMarker) onHoverMarker(null);
                                }}
                            />
                        </Link>
                        
                        {/* Hover label */}
                        {hoveredId === marker.id && (
                            <motion.g
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <rect
                                    x={(marker.x || 0) - 60}
                                    y={(marker.y || 0) - 40}
                                    width="120"
                                    height="25"
                                    rx="4"
                                    fill="#101E0E"
                                    fillOpacity="0.9"
                                />
                                <text
                                    x={marker.x || 0}
                                    y={(marker.y || 0) - 22}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="14"
                                    fontWeight="bold"
                                >
                                    {marker.name || marker.id}
                                </text>
                            </motion.g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default USAMap;
