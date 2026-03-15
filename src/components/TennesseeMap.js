import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TennesseeMapSVG from '../assets/images/TennesseeMap2.svg';

const TennesseeMap = ({ markers = [], onHoverMarker = null }) => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="relative w-full aspect-[2382/1582]">
            <svg
                viewBox="0 0 2382.14 1582.12"
                className="w-full h-full drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                {/* New filled Tennessee map as base layer */}
                <image
                    href={TennesseeMapSVG}
                    x="0"
                    y="0"
                    width="2382.14"
                    height="1582.12"
                />

                {/* State Name Label */}
                <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    transition={{ duration: 1.5 }}
                    x="1080"
                    y="900"
                    textAnchor="middle"
                    className="pointer-events-none"
                    style={{
                        fill: '#2d3d22',
                        fontSize: '100px',
                        fontFamily: 'Cormorant Garamond, Cormorant, serif',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        userSelect: 'none',
                    }}
                >
                    TENNESSEE
                </motion.text>

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

                            {/* Hover Label */}
                            {isHovered && (
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
                                            fontSize: '56px',
                                            filter: 'drop-shadow(0px 4px 8px rgba(255,255,255,0.9)) drop-shadow(0px -4px 8px rgba(255,255,255,0.9)) drop-shadow(4px 0px 8px rgba(255,255,255,0.9)) drop-shadow(-4px 0px 8px rgba(255,255,255,0.9))'
                                        }}
                                    >
                                        {marker.name}
                                    </text>
                                </motion.g>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default TennesseeMap;
