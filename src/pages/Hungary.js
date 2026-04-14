import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { fadeScale, staggerContainer } from "../utils/animations";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import HungaryMap from "../components/HungaryMap";
import CountryIntro from "../components/CountryIntro";
import hungaryTitle from "../assets/images/Hungary Title.webp";

function Hungary({ openLightbox }) {
    const navigate = useNavigate();
    const [expandedGridId, setExpandedGridId] = useState(null);
    const [hoveredDestId, setHoveredDestId] = useState(null);

    // Map markers for Hungary locations
    const mapMarkers = [
        { id: "budapest", name: "Budapest", x: 400, y: 300, path: "/hungary/budapest" }
    ];

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "HungaryFlag"
    ];

    const handleImageClick = (imageId) => {
        if (openLightbox) {
            const index = imageOrder.indexOf(imageId);
            if (index !== -1) {
                openLightbox(index, imageOrder.map(id => getImage(id)));
            }
        }
    };

    const getImage = (id) => ({
        id: id,
        image: `/images/Adventures/${id}.webp`,
        lightboxImage: `/images/Adventures/${id}.webp`,
        expandedImage: `/images/Adventures/${id}.webp`,
        title: "Hungary",
        description: "Hungary flag"
    });

    const pageBackgroundStyle = {
        background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d, #1f1f1f)",
        opacity: 1,
    };

    return (
        <div className="transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Hungary: History, Culture & Architecture | Nomad Scribbles"
                description="A land where history meets modernity. Hungary offers a unique blend of grand architecture, thermal baths, and vibrant culture. Budapest stands as the jewel in this Central European crown."
                keywords="Hungary travel guide, Budapest, Hungarian culture, history, architecture, Europe travel"
                image="/images/Adventures/HungaryFlag.webp"
                slug="/hungary"
            />

            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            {/* Country Intro Component */}
            <CountryIntro
                title="Hungary"
                titleImage={hungaryTitle}
                heroImage="/images/Hungary/Budapest/Small/Széchenyi Thermal Baths.webp"
                heroAlt="Széchenyi Thermal Baths"
                intro="Hungary feels like a story that's still being written - where imperial grandeur meets everyday life. Budapest is where this narrative unfolds most beautifully, along the Danube's gentle curve."
                guideLine="Begin in Budapest, and let the city guide you."
            />

            {/* Map and Feature Card Section */}
            <div className="relative w-full py-32">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={spreadBackgroundStyle}
                />
                <div className="relative z-10 px-2">
                    <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-48 aspect-auto lg:aspect-auto">
                        {/* Feature Image - Top on mobile, Left on desktop */}
                        <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[352px] aspect-[3/4] lg:aspect-[3/4] flex items-center justify-center lg:justify-start lg:-translate-x-16 -mt-20 lg:mt-0">
                            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={cloudinaryUrlFromLegacyPath("/images/Hungary/Budapest/Small/Outside Széchenyi Baths.webp", { width: 1200 })}
                                    alt="Budapest"
                                    className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
                                    onClick={() => navigate('/hungary/budapest')}
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 pt-10">
                                    <h3 className="text-white text-xl font-bold font-cormorant tracking-tight">Budapest</h3>
                                    <p className="text-[#FFD700] text-xs italic font-cormorant mt-1">Click to explore</p>
                                </div>
                            </div>
                        </div>

                        {/* Map - Bottom on mobile, Right on desktop */}
                        <div className="flex-shrink-0 w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[400px] aspect-square lg:aspect-auto flex items-center justify-center mt-0 lg:mt-0">
                            <div className="w-full h-full" style={{ transform: 'scale(1.8)', transformOrigin: 'center' }}>
                                <HungaryMap
                                    markers={mapMarkers}
                                    onHoverMarker={setHoveredDestId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
                {/* Cultural Quote */}
                <div className="relative z-10 text-center pb-6">
                    <p className="text-lg font-cormorant italic text-white max-w-2xl mx-auto">
                        "Budapest is a pearl of the Danube." 
                        <span className="block text-sm mt-2 text-[#FFD700]"> Franz Liszt</span>
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="w-full flex flex-col items-center gap-6 mt-12 mb-20 relative z-10">
                    <Link
                        to="/adventures"
                        className="flex flex-row items-center justify-center text-[#FFD700] hover:text-white transition-colors drop-shadow-md bg-black/50 backdrop-blur-md rounded-full px-8 py-3 border-2 border-[#FFD700] shadow-lg hover:bg-[#FFD700] hover:text-black w-fit min-w-[240px]"
                    >
                        <span className="text-xl mr-3 pb-1">-</span>
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Adventures</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}

// Optimized Reusable Image Component
function RevealImage({ smallSrc, fullSrc, alt, onClick, caption, expanded, onToggle, autoCollapse, title }) {
    const isControlled = expanded !== undefined;
    const [visuallyExpanded, setVisuallyExpanded] = useState(isControlled ? expanded : false);
    const [imgError, setImgError] = useState(false);
    const [fullLoaded, setFullLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isControlled) {
            setVisuallyExpanded(expanded);
        }
    }, [expanded, isControlled]);

    const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;

    useEffect(() => {
        if (!shouldAutoCollapse || !visuallyExpanded) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setVisuallyExpanded(false);
                }
            },
            { threshold: 0 }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [shouldAutoCollapse, visuallyExpanded]);

    const handleClick = (e) => {
        e.stopPropagation();

        if (isControlled && onToggle) {
            if (!visuallyExpanded) {
                setVisuallyExpanded(true);
                if (!expanded) onToggle();
            } else {
                if (onClick) onClick(e);
            }
        } else {
            if (!visuallyExpanded) {
                setVisuallyExpanded(true);
            } else {
                if (onClick) onClick(e);
            }
        }
    };

    const showFullAsDriver = visuallyExpanded && fullLoaded && !imgError;

    return (
        <motion.div
            layout
            ref={containerRef}
            className={`relative mx-auto transition-all duration-700 ease-in-out my-8 ${visuallyExpanded ? "w-full max-w-[98vw] md:max-w-screen-2xl" : "w-full md:w-1/2 max-w-5xl"}`}
        >
            <div className="relative w-full flex justify-center items-center">
                <img
                    src={smallSrc}
                    alt={alt}
                    onClick={handleClick}
                    loading="lazy"
                    className={`rounded-sm shadow-sm transition-all duration-500 cursor-pointer ${showFullAsDriver ? "absolute opacity-0" : "relative"} w-full h-auto max-h-[85vh] object-contain z-10`}
                />

                {!imgError && visuallyExpanded && (
                    <div className={`z-20 ${showFullAsDriver ? "relative w-full" : "absolute inset-0 opacity-0"}`}>
                        <img
                            src={fullSrc}
                            alt={alt}
                            onClick={handleClick}
                            onLoad={() => setFullLoaded(true)}
                            onError={() => setImgError(true)}
                            loading="lazy"
                            className={`rounded-sm transition-all duration-700 cursor-pointer w-full h-auto max-h-[85vh] object-contain ${showFullAsDriver ? "opacity-100 scale-100" : "scale-95"}`}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-black/80 backdrop-blur-md p-6 md:p-8 border border-[#FFD700]/30 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/50"
                        >
                            <div className="max-w-2xl px-2">
                                {title && (
                                    <h4 className="text-[#FFD700] text-2xl md:text-3xl font-bold font-handwriting mb-3 tracking-wide drop-shadow-sm">
                                        {title}
                                    </h4>
                                )}
                                {caption && (
                                    <p className="text-white text-lg leading-relaxed font-serif italic opacity-95">
                                        {caption}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default Hungary;
