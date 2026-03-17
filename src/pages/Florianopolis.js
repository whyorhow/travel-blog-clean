import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Florianopolis({ openLightbox }) {
    const florianopolisCoords = destinations.find(d => d.id === "florianopolis");
    const floripaImages = artImages.filter(img => img.category === "Florianopolis");


    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "floripa14", "floripa18", "floripa2", "floripa5", "floripa3",
        "floripa12", "floripa4", "floripa17", "floripa10", "floripa8",
        "floripa11", "floripa7", "floripa6", "floripa15", "floripa16",
        "floripa19", "floripa22", "floripa13", "floripa21", "floripa20",
        "floripa25", "floripa24", "floripa9", "floripa1", "floripa23"
    ];

    const sortedImages = imageOrder.map(id => floripaImages.find(img => img.id === id)).filter(Boolean);

    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => floripaImages.find(i => i.id === id);

    const sections = [
        {
            id: "intro",
            title: "The Island",
            subtitle: "Florianópolis Is a Brazilian Holiday Island — and That Matters",
            expandedBg: "bg-[#262626]/95",
            coverImage: "floripa18",
            coverCaption: "The coastline stretches wide, busy at one end and thinning into distance at the other.",
            content: [
                { type: "text", text: "Florianópolis reveals itself slowly. Footsteps fade into the tide, coastlines widen and narrow again, and the island shifts gently between city, beach, and forest." },
                { type: "text", text: "The built details feel like suggestions rather than instructions — staircases, lifeguard towers, paths that guide without insisting. Nothing holds your attention for long. There’s a sense of shared space rather than consumption. Beaches are used all day, towns feel lived-in, and care for the environment is quietly embedded in daily routines. Wildlife appears without ceremony. Observation feels mutual." },
                { type: "text", text: "This is partly because Florianópolis isn’t shaped primarily for international visitors. It’s a holiday island for Brazilians, and that context sets the tone. Families return year after year, cities empty toward the coast in summer, and daily life stretches outward into sand, water, and green space." },
                { type: "text", text: "For European travellers, that difference matters. Floripa isn’t loud or demanding. It feels safe, relaxed, and easy to move through, with an emphasis on being outdoors rather than being entertained." },
                { type: "text", text: "You don’t come here to collect highlights. You come to settle into something that already works." },
                { type: "image", id: "floripa2", caption: "At the centre of the city, the fig tree anchors daily life to something far older." }
            ]
        },
        {
            id: "campeche",
            title: "Campeche",
            subtitle: "Space, Not Spectacle",
            expandedBg: "bg-[#0f172a]/90",
            coverImage: "floripa5",
            coverCaption: "Campeche opens wide, where green edges soften into sand and the sea settles into an easy rhythm.",
            content: [
                { type: "text", text: "If the island’s pace is defined by space and repetition, Campeche is where that becomes most visible." },
                { type: "image", id: "floripa3" },
                { type: "text", text: "The beach runs broad and uninterrupted, backed by hills rather than dense development. The horizon stays open. People arrive with coolers, towels, and time, and tend to stay put." },
                { type: "text", text: "For Brazilians, Campeche is about familiarity — long days, repeated visits, and a rhythm that doesn’t need reinvention. For visitors, it’s often where the island’s logic clicks into place." },
                { type: "text", text: "Nothing competes for attention, and that absence becomes the appeal. Even Campeche Island offshore feels vivid without being overworked, visited calmly rather than framed as an event." },
                { type: "quote", text: "Pé na areia, água de coco, beira do mar.\nFeet in the sand, coconut water, by the sea.", source: "— Diogo Nogueira" }
            ]
        },
        {
            id: "santo-antonio",
            title: "Santo Antônio",
            subtitle: "Daily Life by the Water",
            expandedBg: "bg-[#27272a]/95",
            coverImage: "floripa12",
            coverCaption: "The shoreline curves softly, where hills, boats, and shallow water settle into an easy balance.",
            content: [
                { type: "text", text: "On the quieter, bay-facing side of the island, the rhythm turns inward." },
                { type: "image", id: "floripa4" },
                { type: "text", text: "Santo Antônio de Lisboa sits where the water stays calm and the light softens toward evening. The geography shapes how the town is used — less about the open ocean, more about staying close." },
                { type: "text", text: "It’s one of the island’s older settled areas, formed by routine rather than reinvention. Boats rest near shore, restaurants fill gradually, workshops and homes sit side by side." },
                { type: "grid", ids: ["floripa17", "floripa10"] },
                { type: "text", text: "Handwritten notes, handmade objects, and unhurried meals aren’t arranged for visitors. They’re simply part of how the place functions. For travellers, Santo Antônio offers Florianópolis as somewhere people live, not perform." },
                { type: "image", id: "floripa8", caption: "Handwritten notes accumulate over time, turning the restaurant into a record of passing lives." },
                { type: "image", id: "floripa11", caption: "Small workshops remain part of daily life, not attractions." },
                { type: "grid", ids: ["floripa7", "floripa6", "floripa15"] },
                { type: "image", id: "floripa16", caption: "Seen from above, the beach feels held rather than exposed." },
                { type: "image", id: "floripa19" }
            ]
        },
        {
            id: "praia-do-forte",
            title: "Praia do Forte",
            subtitle: "Letting the Landscape Lead",
            expandedBg: "bg-[#292524]/95",
            coverImage: "floripa22",
            coverCaption: "Dark stones sit low in the surf, shaped smooth by repetition rather than force.",
            content: [
                { type: "text", text: "Where Campeche opens wide, Praia do Forte interrupts." },
                { type: "text", text: "Rocks break the sand, waves arrive unevenly, and the coastline resists being smoothed out. It’s not dramatic, but it’s active — shaped continuously by wind, water, and tide." },
                { type: "grid", ids: ["floripa13", "floripa21"] },
                { type: "text", text: "Here, the island’s relationship with nature becomes clearest. Plants lean into salt air, stones accept the water again and again, and people adjust their pace without thinking about it. The landscape sets the terms. Life follows." },
                { type: "image", id: "floripa20" }
            ]
        },
        {
            id: "conclusion",
            title: "The Traveller",
            subtitle: "Who Is This Trip For?",
            expandedBg: "bg-[#141c14]/95",
            coverImage: "floripa25",
            coverCaption: "Access is simple, and the pace remains unhurried.",
            content: [
                { type: "text", text: "This island suits travellers who enjoy beaches that feel lived-in rather than staged, and days that don’t require much planning. If you’re happy walking, swimming, sitting, and repeating the same small pleasures, Florianópolis fits easily. An interest in how Brazilians travel within their own country — and a preference for space, greenery, and everyday rhythm over constant activity — helps." },
                { type: "image", id: "floripa24" },
                { type: "text", text: "It may frustrate those looking for a dense city experience or a tightly structured itinerary. If you prefer destinations built around landmarks, nightlife, or urgency, or want spectacle at every turn, this island may feel too understated. Florianópolis tends to reward patience and repetition more than novelty." },
                { type: "text", text: "It isn’t a place to be decoded all at once. It’s better understood gradually, through small differences between beaches, towns, and days." },
                { type: "grid", ids: ["floripa9", "floripa1"] },
                { type: "text", text: "The bare-faced curassow paused long enough to watch back — a reminder that here, observation often goes both ways." },
                { type: "text", text: "If the island’s pace resonates — the space, the calm, the way nature and daily life overlap — it’s worth exploring further in your own way. Maps, conversations, and “things to do” lists can come later. This page is simply the starting point." },
                { type: "image", id: "floripa23" }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#0f172a", // Deeper, more high-fidelity navy/teal
        opacity: 1,
    };

    return (
        <div className="relative pt-2">
            <SEO
                title="Florianópolis | Nomad Scribbles"
                description="Florianópolis: An island city where lush hills meet over 40 distinct beaches. Discover the diverse geography of Brazil's southern coast."
                image={cloudinaryUrlFromLegacyPath("/images/Floripa/small/Floripa1z.webp", { width: 1200 })}
                slug="/brazil/florianopolis"
            />

            <svg className="absolute w-0 h-0 invisible" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="torn-paper-filter" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={pageBackgroundStyle}
            />

            <h1 className="sr-only">Florianópolis | Nomad Scribbles</h1>

            {/* Cinematic Hero Section */}
            <div className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/Floripa/full/Floripa14.webp", { width: 2000 })}
                        alt="Florianopolis Beach Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-bold font-handwriting text-[#D4AF37] drop-shadow-2xl mb-4">
                            Florianópolis
                        </h1>
                        <p className="text-xl md:text-3xl font-light tracking-[0.2em] uppercase text-stone-200 opacity-90">
                            The Magic Island
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="relative w-full mb-16 overflow-hidden">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={spreadBackgroundStyle}
                />

                <div className="relative z-20 max-w-5xl mx-auto px-4 pt-0 pb-4 md:pt-2 md:pb-8 flex flex-col items-center mt-[-10px]">
                    <div className="w-full max-w-4xl overflow-visible mb-[-10px]">
                        <ContextMap
                            markers={[florianopolisCoords].filter(Boolean)}
                            zoomToId="florianopolis"
                            title="Where is Florianópolis?"
                            geography={florianopolisCoords?.geography}
                            transparent={true}
                        />
                    </div>

                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
                {sections.map((section) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                    />
                ))}

                <div className="w-full flex flex-col items-center justify-center gap-6 mt-20 mb-12 relative z-20 px-4">
                    <Link to="/brazil" className="flex flex-row items-center justify-center bg-[#0f172a]/20 border-2 border-[#D4AF37] text-[#D4AF37] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#0f172a]/30 hover:text-[#D4AF37] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
                        <span className="text-lg mr-2">←</span>
                        <span className="text-sm font-medium">Return To Brazil</span>
                    </Link>
                    <Link to="/brazil/rio" className="flex flex-row items-center justify-center bg-[#0f172a]/20 border-2 border-[#D4AF37] text-[#D4AF37] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#0f172a]/30 hover:text-[#D4AF37] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
                        <span className="text-sm font-medium">Next: Rio de Janeiro</span>
                        <span className="text-lg ml-2">→</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}

// Refined Reusable Image Component
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
                    className={`rounded-sm shadow-sm transition-all duration-500 cursor-pointer w-full h-auto max-h-[85vh] object-contain ${showFullAsDriver ? "absolute inset-0 opacity-0" : "relative z-10 opacity-100"}`}
                />

                {!imgError && visuallyExpanded && (
                    <img
                        src={fullSrc}
                        alt={alt}
                        onClick={handleClick}
                        onLoad={() => setFullLoaded(true)}
                        onError={() => setImgError(true)}
                        className={`rounded-sm transition-all duration-700 ease-out cursor-pointer w-full h-auto max-h-[85vh] object-contain ${showFullAsDriver ? "relative z-20 opacity-100 scale-100" : "absolute inset-0 z-20 opacity-0 scale-95"}`}
                        loading="lazy"
                    />
                )}

                {(title || caption) && visuallyExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: fullLoaded ? 1 : 0, y: fullLoaded ? 0 : 10 }}
                        className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-[#0f172a]/85 backdrop-blur-md p-6 md:p-8 border border-white/20 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/60 z-30"
                    >
                        <div className="max-w-2xl px-2">
                            {title && (
                                <h4 className="text-[#D4AF37] text-2xl md:text-3xl font-bold font-handwriting mb-3 tracking-wide drop-shadow-sm">
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
                )}
            </div>

            {!visuallyExpanded && title && (
                <div className="mt-6 flex justify-center">
                    <div className="max-w-[200px] p-3 bg-white/5 backdrop-blur-sm border-l border-[#D4AF37]/50 text-center shadow-sm">
                        <h4 className="text-stone-200 text-xs font-bold uppercase tracking-widest mb-1 font-cormorant">
                            {title}
                        </h4>
                        <div className="mx-auto mt-2 w-4 h-[1px] bg-[#D4AF37]/50" />
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function StoryCard({ section, getImage, handleImageClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const activeBg = section.expandedBg || "bg-stone-900/80";

    return (
        <motion.div
            layout
            className={`w-full max-w-6xl bg-stone-900/40 backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-stone-100" : "text-[#D4AF37]"}`}>
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <h3 className={`text-lg md:text-xl font-light tracking-wide mt-2 transition-colors duration-500 ${isExpanded ? "text-stone-300" : "text-stone-400"}`}>
                            {section.subtitle}
                        </h3>
                    )}
                </div>

                <RevealImage
                    smallSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.image, { width: 1200 })}
                    fullSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.lightboxImage, { width: 2000 })}
                    alt={section.title}
                    caption={section.coverCaption || getImage(section.coverImage)?.description}
                    title={getImage(section.coverImage)?.title}
                    onClick={() => handleImageClick(section.coverImage)}
                    expanded={isExpanded}
                    onToggle={() => setIsExpanded(!isExpanded)}
                />

                <motion.div
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
                    className="flex flex-col items-center h-8"
                >
                    <p className="text-xs uppercase tracking-widest opacity-40 mt-2 font-semibold text-stone-400">Explore Section</p>
                    <div className="w-px h-4 bg-stone-400/20 mt-1"></div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden bg-transparent"
                    >
                        <div className="px-6 pb-12 md:px-20 md:pb-24 flex flex-col items-center space-y-12">
                            {section.content.map((item, idx) => {
                                if (item.type === "text") {
                                    return <p key={idx} className="text-xl leading-relaxed max-w-3xl text-center md:text-left text-stone-300 font-medium mx-auto">{item.text}</p>;
                                }
                                if (item.type === "image") {
                                    const img = getImage(item.id);
                                    if (!img) return null;
                                    return (
                                        <div key={idx} className="w-full">
                                            <RevealImage
                                                smallSrc={cloudinaryUrlFromLegacyPath(img.image, { width: 1200 })}
                                                fullSrc={cloudinaryUrlFromLegacyPath(img.lightboxImage, { width: 2000 })}
                                                alt={img.title || ""}
                                                caption={item.caption || img.description}
                                                title={img.title}
                                                onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                                            />
                                        </div>
                                    );
                                }
                                if (item.type === "grid") {
                                    return (
                                        <div key={idx} className={`grid grid-cols-1 md:grid-cols-${item.ids.length > 2 ? '3' : '2'} gap-8 md:gap-12 w-full max-w-7xl`}>
                                            {item.ids.map(id => {
                                                const img = getImage(id);
                                                if (!img) return null;
                                                return (
                                                    <div key={id} className="flex flex-col items-center w-full">
                                                        <RevealImage
                                                            smallSrc={cloudinaryUrlFromLegacyPath(img.image, { width: 1200 })}
                                                            fullSrc={cloudinaryUrlFromLegacyPath(img.lightboxImage, { width: 2000 })}
                                                            alt={id}
                                                            caption={img.description}
                                                            title={img.title}
                                                            onClick={(e) => { e.stopPropagation(); handleImageClick(id); }}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                }
                                if (item.type === "quote") {
                                    return (
                                        <blockquote key={idx} className="border-l-4 border-[#D4AF37] pl-8 italic my-10 text-2xl opacity-90 max-w-2xl md:text-left text-stone-300 mx-auto">
                                            {item.text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                                            {item.source && <span className="text-base not-italic block mt-3 font-bold text-stone-400 tracking-wider uppercase">{item.source}</span>}
                                        </blockquote>
                                    );
                                }
                                if (item.type === "header") {
                                    return <h3 key={idx} className="text-3xl md:text-4xl font-bold font-handwriting mt-8 text-center text-stone-100 max-w-2xl mx-auto">{item.text}</h3>;
                                }
                                if (item.type === "list") {
                                    return (
                                        <ul key={idx} className="list-disc pl-8 space-y-6 text-xl max-w-2xl text-left text-stone-300">
                                            {item.items.map((li, i) => <li key={i}>{li}</li>)}
                                        </ul>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Florianopolis;
