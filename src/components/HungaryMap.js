import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HungaryMapSVG from '../assets/images/Hungary-Map.svg';

const HungaryMap = ({ markers = [], onHoverMarker = null }) => {
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
                {/* Hungary Map as base layer */}
                <image
                    href={HungaryMapSVG}
                    x="0"
                    y="0"
                    width="400"
                    height="300"
                />

                            </svg>
        </div>
    );
};

export default HungaryMap;
