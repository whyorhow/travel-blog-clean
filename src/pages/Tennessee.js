import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import destinations from "../assets/destinations.json";

function Tennessee() {
    const tennesseeCoords = destinations.find(d => d.id === "tennessee");

    // Key Experiences Data (Top 3)
    const top3 = [
        {
            title: "1. The Great Smoky Mountains",
            text: "The Smokies are defined by their ancient ridges and the blue-grey mist that clings to their valleys. From the dense canopy of old-growth forests to the rocky outcrops of the high peaks, these mountains offer a sense of scale and stillness that is both humbling and rejuvenating.",
            image: `${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Small/Panoramic Mountainsz.webp`,
            link: "/united-states/tennessee/mountains",
            alt: "Panoramic view of the Great Smoky Mountains in Tennessee",
        },
        {
            title: "2. The Rhythm of Music City",
            text: "Coming soon: A journey through the sounds of Nashville, where every street corner holds a melody and every stage tells a story. From the historic Ryman Auditorium to the neon lights of Broadway, we'll explore the heart of American music.",
            image: `${process.env.PUBLIC_URL}/images/SaoPauloLanding/small/Street2.webp`, // Placeholder image
            link: "/united-states/tennessee/nashville",
            alt: "Music City placeholder",
        },
        {
            title: "3. Southern Flavours & Traditions",
            text: "Coming soon: A taste of Tennessee, from slow-cooked barbecue to the refined notes of Lynchburg whiskey. We'll dive into the culinary traditions that have shaped the state's identity and the stories told across the dinner table.",
            image: `${process.env.PUBLIC_URL}/images/SaoPauloLanding/pizza.webp`, // Placeholder image
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
        <div className="relative flex flex-col font-sans text-[#e2e1dc]">
            <SEO
                title="Tennessee: Mountains, Music & Magic | Nomad Scribbles"
                description="From the misty peaks of the Smokies to the rhythmic pulse of Nashville, explore the diverse landscapes and rich culture of Tennessee."
                keywords="Tennessee travel guide, Great Smoky Mountains, Nashville, Gatlinburg, music city, Tennessee mountains"
                image="https://nomadscribbles.com/images/United States/Tennessee/Mountains/Panoramic Mountains.jpg"
                url="https://nomadscribbles.com/united-states/tennessee"
            />

            {/* 1. Hero / Header Section */}
            <section className="relative w-full h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Background image placeholder */}
                    <div className="w-full h-full bg-stone-900 flex items-center justify-center border-b border-white/10">
                        <span className="text-stone-700 text-6xl font-handwriting opacity-20">Tennessee-Hero.png</span>
                        {/* We could use process.env.PUBLIC_URL + "/images/United States/Tennessee/Mountains/Panoramic Mountains.jpg" as a fallback */}
                    </div>
                </div>
                <div className="relative z-10 max-w-screen-md mx-auto px-6 text-center">
                    <motion.h1
                        className="text-4xl md:text-7xl font-bold mb-8 text-[#edd98d] drop-shadow-2xl"
                        variants={fadeScale}
                    >
                        Mountains, Music and Magic
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl font-cormorant italic leading-relaxed text-[#e2e1dc]/90"
                        variants={fadeScale}
                    >
                        “Tennessee is a state of layers — layers of mist in the mountains, layers of history in its music, and layers of flavour in its food. From the quiet trails of the East to the rhythmic pulse of the West, the state reveals itself in fragments of sound, land, and story.”
                    </motion.p>
                </div>
            </section>

            {/* 2. Map Section with Spread Background */}
            <div className="relative w-full py-20 overflow-hidden">
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
                        className="w-full max-w-2xl aspect-[16/9] mb-8 bg-stone-800/20 rounded-xl flex items-center justify-center border border-black/10"
                        variants={fadeScale}
                    >
                        <span className="text-stone-500 text-2xl font-handwriting">TennesseeOutline.png</span>
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
                    <motion.div
                        className="flex flex-col md:flex-row items-center gap-12"
                        variants={fadeScale}
                        viewport={{ once: true }}
                    >
                        <div className="w-full md:w-1/2">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp`}
                                    alt="The Great Smoky Mountains"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-handwriting text-[#edd98d]">1.</span>
                                <h2 className="text-3xl font-bold font-cormorant text-[#e2e1dc]">The Great Smoky Mountains</h2>
                            </div>
                            <p className="text-lg text-[#e2e1dc]/80 leading-relaxed font-cormorant">
                                “The Smokies are defined by ancient ridges and blue-grey mist. Hiking trails, rivers, and small towns reveal both natural beauty and human history.”
                            </p>
                            <Link
                                to="/united-states/tennessee/mountains"
                                className="inline-block text-[#edd98d] font-bold uppercase tracking-[0.2em] text-sm border-b border-[#edd98d]/30 hover:border-[#edd98d] transition-all"
                            >
                                EXPLORE THE GREAT SMOKY MOUNTAINS →
                            </Link>
                        </div>
                    </motion.div>

                    {/* Experience 2: The Rhythm of Music City */}
                    <motion.div
                        className="flex flex-col md:flex-row-reverse items-center gap-12"
                        variants={fadeScale}
                        viewport={{ once: true }}
                    >
                        <div className="w-full md:w-1/2">
                            <div className="aspect-[4/3] bg-stone-800 rounded-lg flex items-center justify-center border border-white/5 shadow-2xl">
                                <span className="text-stone-600 font-handwriting italic">Nashville.png</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-handwriting text-[#edd98d]">2.</span>
                                <h2 className="text-3xl font-bold font-cormorant text-[#e2e1dc]">The Rhythm of Music City</h2>
                            </div>
                            <p className="text-lg text-[#e2e1dc]/80 leading-relaxed font-cormorant">
                                “Nashville hums with sound from historic venues to modern studios. Explore the roots of country, blues, and rock that shaped American music.”
                            </p>
                            <Link
                                to="/united-states/tennessee/nashville"
                                className="inline-block text-[#edd98d] font-bold uppercase tracking-[0.2em] text-sm border-b border-[#edd98d]/30 hover:border-[#edd98d] transition-all"
                            >
                                EXPLORE THE RHYTHM OF MUSIC CITY →
                            </Link>
                        </div>
                    </motion.div>

                    {/* Experience 3: Southern Flavours & Traditions */}
                    <motion.div
                        className="flex flex-col md:flex-row items-center gap-12"
                        variants={fadeScale}
                        viewport={{ once: true }}
                    >
                        <div className="w-full md:w-1/2">
                            <div className="aspect-[4/3] bg-stone-800 rounded-lg flex items-center justify-center border border-white/5 shadow-2xl">
                                <span className="text-stone-600 font-handwriting italic">Food.png</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-handwriting text-[#edd98d]">3.</span>
                                <h2 className="text-3xl font-bold font-cormorant text-[#e2e1dc]">Southern Flavours & Traditions</h2>
                            </div>
                            <p className="text-lg text-[#e2e1dc]/80 leading-relaxed font-cormorant">
                                “Tennessee cuisine blends barbecue, fresh produce, and local recipes. Discover how the land and its people are reflected on the plate.”
                            </p>
                            <Link
                                to="/united-states/tennessee/memphis"
                                className="inline-block text-[#edd98d] font-bold uppercase tracking-[0.2em] text-sm border-b border-[#edd98d]/30 hover:border-[#edd98d] transition-all"
                            >
                                EXPLORE SOUTHERN FLAVOURS & TRADITIONS →
                            </Link>
                        </div>
                    </motion.div>
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
