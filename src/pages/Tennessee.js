import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import TennesseeMap from "../components/TennesseeMap";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import destinations from "../assets/destinations.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Tennessee() {
    // Actual coords picked by user via click
    const mapMarkers = [
        { id: "memphis", name: "Memphis", x: 453, y: 1038, path: "/united-states/tennessee/memphis" },
        { id: "nashville", name: "Nashville", x: 1116, y: 775, path: "/united-states/tennessee/nashville" },
        { id: "smoky-mountains", name: "Smoky Mountains", x: 1701, y: 800, path: "/united-states/tennessee/mountains" }
    ];

    // Key Experiences Data (Top 3)
    const top3 = [
        {
            title: "1. The Great Smoky Mountains",
            text: "The Smokies are defined by their ancient ridges and the blue-grey mist that clings to their valleys. From the dense canopy of old-growth forests to the rocky outcrops of the high peaks, these mountains offer a sense of scale and stillness that is both humbling and rejuvenating.",
            image: cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Mountains/Small/Panoramic Mountainsz.webp", { width: 1200 }),
            link: "/united-states/tennessee/mountains",
            alt: "Panoramic view of the Great Smoky Mountains in Tennessee",
        },
        {
            title: "2. The Rhythm of Music City",
            text: "Coming soon: A journey through the sounds of Nashville, where every street corner holds a melody and every stage tells a story. From the historic Ryman Auditorium to the neon lights of Broadway, we'll explore the heart of American music.",
            image: cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/small/Street2.webp", { width: 1200 }), // Placeholder image
            link: "/united-states/tennessee/nashville",
            alt: "Music City placeholder",
        },
        {
            title: "3. Southern Flavours & Traditions",
            text: "Coming soon: A taste of Tennessee, from slow-cooked barbecue to the refined notes of Lynchburg whiskey. We'll dive into the culinary traditions that have shaped the state's identity and the stories told across the dinner table.",
            image: cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/pizza.webp", { width: 1200 }), // Placeholder image
            link: "/united-states/tennessee/memphis",
            alt: "Southern food placeholder",
        },
    ];

    const top3BgColors = [
        "bg-[#F5E8C7]/50",
        "bg-[#C7E8F5]/50",
        "bg-[#E8C7F5]/50",
    ];

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter) drop-shadow(0 0 3px rgba(0,0,0,0.15))",
        opacity: 1,
    };

    return (
        <div className="relative flex flex-col font-sans text-[#0f172a] bg-gradient-to-b from-[#0b1220] via-[#102a43] to-[#f3f4f6]">
            <SEO
                title="Tennessee: Mountains, Music & Magic | Nomad Scribbles"
                description="From the misty peaks of the Smokies to the rhythmic pulse of Nashville, explore the diverse landscapes and rich culture of Tennessee."
                keywords="Tennessee travel guide, Great Smoky Mountains, Nashville, Gatlinburg, music city, Tennessee mountains"
                image={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Mountains/Panoramic Mountains.jpg", { width: 1200 })}
                url="https://nomadscribbles.com/united-states/tennessee"
            />

            <svg className="absolute w-0 h-0 invisible" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="torn-paper-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            {/* 1. Hero / Header Section */}
            <section className="relative w-full h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Mountains/Small/Panoramic Mountains2.webp", { width: 2000 })}
                        alt="Great Smoky Mountains panorama in Tennessee"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#1b2833]" />
                </div>
                <div className="relative z-10 max-w-screen-md mx-auto px-6 text-center">
                    <motion.h1
                        className="text-4xl md:text-7xl font-bold mb-4 text-[#fef3c7] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
                        variants={fadeScale}
                    >
                        Tennessee
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-2xl font-cormorant italic leading-relaxed text-[#e5e7eb]"
                        variants={fadeScale}
                    >
                        Mountains, music and magic running from the blue-grey ridges of the Smokies to the bright stages of Memphis and Nashville.
                    </motion.p>
                </div>
            </section>

            {/* 2. Map Section with Spread Background */}
            <div className="relative w-full py-12 md:py-14 overflow-hidden">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={{
                        ...spreadBackgroundStyle,
                        filter: "url(#torn-paper-filter) drop-shadow(0 0 12px rgba(0,0,0,0.4))",
                        opacity: 1
                    }}
                />
                <div className="relative z-10 max-w-screen-lg mx-auto px-6 flex flex-col items-center">
                    <motion.div
                        className="w-full max-w-2xl mb-8 flex items-center justify-center"
                        variants={fadeScale}
                    >
                        <TennesseeMap markers={mapMarkers} />
                    </motion.div>
                    <motion.p
                        className="max-w-2xl text-center text-lg md:text-xl font-cormorant italic text-[#1c1c1c]"
                        variants={fadeScale}
                    >
                        “Tennessee stretches from the rugged Great Smoky Mountains in the east, through the rolling hills of the Nashville Basin, to the fertile plains of the Mississippi River in the west.”
                    </motion.p>
                </div>
            </div>

            {/* 3. Key Experiences Section */}
            <section className="max-w-screen-lg mx-auto px-6 py-20">
                <div className="grid grid-cols-1 gap-24">
                    {/* Experience 1: The Great Smoky Mountains */}
                    <Link to="/united-states/tennessee/mountains" className="group block">
                        <motion.div
                            className="flex flex-col md:flex-row items-center gap-12"
                            variants={fadeScale}
                            viewport={{ once: true }}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                                    <img
                                        src={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Mountains/Small/Panoramic Mountains2.webp", { width: 1200 })}
                                        alt="The Great Smoky Mountains"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-handwriting text-[#fbbf24]">1.</span>
                                    <h2 className="text-3xl font-bold font-cormorant text-[#f9fafb]">The Great Smoky Mountains</h2>
                                </div>
                                <p className="text-lg text-[#e5e7eb]/85 leading-relaxed font-cormorant">
                                    “The Smokies are defined by ancient ridges and blue-grey mist. Hiking trails, rivers, and small towns reveal both natural beauty and human history.”
                                </p>
                                <span className="inline-block text-[#fbbf24] font-bold uppercase tracking-[0.2em] text-xs md:text-sm border-b border-[#fbbf24]/40 group-hover:border-[#fbbf24]">
                                    Explore the Great Smoky Mountains →
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Experience 2: Nashville */}
                    <Link to="/united-states/tennessee/nashville" className="group block">
                        <motion.div
                            className="flex flex-col md:flex-row-reverse items-center gap-12"
                            variants={fadeScale}
                            viewport={{ once: true }}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="aspect-[4/3] bg-stone-800 rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                                    <img
                                        src={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Nashville/Small/Nashville Skyline2.webp", { width: 1200 })}
                                        alt="Nashville skyline at dusk"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-handwriting text-[#fbbf24]">2.</span>
                                    <h2 className="text-3xl font-bold font-cormorant text-[#f9fafb]">Nashville</h2>
                                </div>
                                <p className="text-lg text-[#e5e7eb]/85 leading-relaxed font-cormorant">
                                    “Nashville hums with sound from historic venues to modern studios. Explore the roots of country, blues, and rock that shaped American music.”
                                </p>
                                <span className="inline-block text-[#fbbf24] font-bold uppercase tracking-[0.2em] text-xs md:text-sm border-b border-[#fbbf24]/40 group-hover:border-[#fbbf24]">
                                    Explore Nashville →
                                </span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Experience 3: Memphis */}
                    <Link to="/united-states/tennessee/memphis" className="group block">
                        <motion.div
                            className="flex flex-col md:flex-row items-center gap-12"
                            variants={fadeScale}
                            viewport={{ once: true }}
                        >
                            <div className="w-full md:w-1/2">
                                <div className="aspect-[4/3] bg-stone-800 rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                                    <img
                                        src={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Memphis/Small/Illuminated Beale Street.webp", { width: 1200 })}
                                        alt="Illuminated Beale Street in Memphis"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-handwriting text-[#fbbf24]">3.</span>
                                    <h2 className="text-3xl font-bold font-cormorant text-[#f9fafb]">Memphis</h2>
                                </div>
                                <p className="text-lg text-[#e5e7eb]/85 leading-relaxed font-cormorant">
                                    “Barbecue smoke, neon streets, and live blues pouring from doorways: Memphis mixes river history with nights that run late.”
                                </p>
                                <span className="inline-block text-[#fbbf24] font-bold uppercase tracking-[0.2em] text-xs md:text-sm border-b border-[#fbbf24]/40 group-hover:border-[#fbbf24]">
                                    Explore Memphis →
                                </span>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </section>

            {/* 4. Footer / Pull-Quote Section */}
            <section className="relative w-full py-24 bg-stone-900/50 backdrop-blur-sm border-y border-white/5">
                <div className="max-w-screen-md mx-auto px-6 text-center">
                    <motion.p
                        className="text-2xl md:text-3xl font-cormorant italic text-stone-300 leading-relaxed"
                        variants={fadeScale}
                    >
                        “Tennessee is a song that hasn’t finished being sung. It is a place where the mountains hold the past and the music holds the future.”
                    </motion.p>
                </div>
            </section>

            {/* Navigation Links */}
            <div className="w-full flex flex-col items-center gap-6 mt-12 mb-20 relative z-10">
                <Link
                    to="/united-states"
                    className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]"
                >
                    <span className="text-xl mr-3 pb-1">←</span>
                    <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to US Overview</span>
                </Link>
            </div>
        </div>
    );
}

export default Tennessee;
