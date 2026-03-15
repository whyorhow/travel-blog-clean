import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, staggerContainer } from "../utils/animations";
import USAMap from "../components/USAMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

// Swiper for locations carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function UnitedStates() {
    // Destinations for the carousel/grid (States)
    const usDestinations = destinations.filter(d => d.country === 'USA');
    const activeUSDestinations = usDestinations.filter(d => d.active);
    const placeholderUSDestinations = usDestinations.filter(d => !d.active);

    // Featured destinations for the carousel
    const featuredDestinations = [
        { id: "tennessee", name: "Tennessee", img: "/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp", path: "/united-states/tennessee" }
    ];

    // Map markers - empty for now since only Tennessee is active
    const mapMarkers = [];

    const [showOverlay, setShowOverlay] = useState(false);
    const [hoveredDestId, setHoveredDestId] = useState(null);
    const swiperRef = useRef(null);

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Programmatically slide swiper when map pin is hovered
    useEffect(() => {
        if (swiperRef.current && hoveredDestId) {
            const index = featuredDestinations.findIndex(d => d.id === hoveredDestId);
            if (index !== -1) {
                swiperRef.current.slideToLoop(index);
            }
        }
    }, [hoveredDestId, featuredDestinations]);

    return (
        <motion.div
            className="relative pb-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <SEO
                title="Travel Adventures in the United States | Nomad Scribbles"
                description="Explore the diverse landscapes of the United States — starting with the misty peaks and musical rhythms of Tennessee."
                image="/images/Adventures/USAFlag.webp"
                slug="/united-states"
            />

            <h1 className="sr-only">Nomad Scribbles | Travel Adventures in the United States</h1>

            {/* Hero Image with Overlay */}
            <motion.div
                className="relative w-full max-w-2xl mx-auto mt-20 mb-4 px-4"
                variants={fadeScale}
            >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#eeda8d]/20">
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/Adventures/USAFlag.webp", { width: 1600 })}
                        alt="United States Adventures"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h2 className="text-5xl md:text-7xl font-handwriting drop-shadow-2xl mb-2">United States</h2>
                        <span className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-[#eeda8d] opacity-80">Explore Stories</span>
                    </div>
                </div>
            </motion.div>

            {/* Full-Width USA Map */}
            <div className="relative w-full mb-8 lg:mt-8 overflow-hidden">
                {/* Background spread for map */}
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={spreadBackgroundStyle}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
                    <motion.div variants={fadeScale} className="w-full flex justify-center">
                        <div className="w-full max-w-4xl overflow-visible">
                            <USAMap
                                markers={mapMarkers}
                                onHoverMarker={setHoveredDestId}
                            />
                        </div>
                    </motion.div>

                    {/* Tennessee Feature Section Below Map */}
                    <motion.div
                        className="w-full max-w-2xl text-center flex flex-col items-center gap-2 mt-12"
                        variants={fadeScale}
                    >
                        <h3 className="text-xl font-bold font-cormorant text-[#101E0E] tracking-tight mb-0">From the Appalachians to the Deep South</h3>
                        <p className="text-base sm:text-lg font-cormorant text-[#101E0E]/90 leading-relaxed italic">
                            "The Smokies are defined by ancient ridges and blue-grey mist. Hiking trails, rivers, and small towns reveal both the scale of the land and the history of those who lived within it."
                        </p>
                    </motion.div>

                    {/* Tennessee Carousel */}
                    <motion.div
                        className="w-full flex justify-center mt-8"
                        variants={fadeScale}
                    >
                        <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                            <Swiper
                                modules={[Navigation, Autoplay, Pagination]}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: true }}
                                loop={true}
                                className="w-full h-full"
                            >
                                {featuredDestinations.map((city, index) => (
                                    <SwiperSlide key={city.id}>
                                        {city.placeholder ? (
                                            <div className="w-full h-full bg-stone-900 flex flex-col justify-end p-8 pt-20">
                                                <h3 className="text-stone-500 text-3xl font-bold font-cormorant tracking-tight">{city.name}</h3>
                                                <p className="text-stone-600 text-sm italic font-cormorant mt-1">Coming Soon</p>
                                            </div>
                                        ) : (
                                            <Link to={city.path} className="block w-full h-full group relative">
                                                <img
                                                    src={cloudinaryUrlFromLegacyPath(city.img, { width: 1600 })}
                                                    alt={city.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 pt-20">
                                                    <h3 className="text-white text-3xl font-bold font-cormorant tracking-tight">{city.name}</h3>
                                                    <p className="text-[#E5CF6B] text-sm italic font-cormorant mt-1">View Full Story &rarr;</p>
                                                </div>
                                            </Link>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* States Grid */}
            <div className="max-w-4xl mx-auto px-4 mt-12 mb-20">
                <h2 className="text-lg font-bold font-cormorant text-[#E5CF6B]/60 mb-6 text-center uppercase tracking-widest">Explore the States</h2>
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    variants={staggerContainer}
                >
                    {activeUSDestinations.map((state) => (
                        <motion.div
                            key={state.id}
                            variants={fadeScale}
                        >
                            <Link
                                to={state.path}
                                className="block w-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md rounded-lg py-3 text-center hover:bg-white/10 hover:text-white transition duration-300 text-sm font-medium"
                            >
                                {state.name}
                            </Link>
                        </motion.div>
                    ))}
                    {placeholderUSDestinations.map((state) => (
                        <motion.div
                            key={state.id}
                            variants={fadeScale}
                            className="opacity-40 grayscale pointer-events-none"
                        >
                            <div
                                className="block w-full bg-white/5 border border-white/10 text-white/40 backdrop-blur-md rounded-lg py-3 text-center text-sm font-medium"
                            >
                                {state.name}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
                <Link to="/adventures" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
                    <span className="text-xl mr-3 pb-1">←</span>
                    <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Back to Adventures</span>
                </Link>
            </div>
        </motion.div>
    );
}

export default UnitedStates;
