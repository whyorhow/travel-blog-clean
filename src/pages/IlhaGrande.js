import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function IlhaGrande({ openLightbox }) {
    const ilhaCoords = destinations.find(d => d.id === "ilha-grande");
    const ilhaImages = artImages.filter(img => img.category === "Ilha Grande");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "ilha20", "ilha17", "ilha8", "ilha11", "ilha3",
        "ilha4", "ilha7", "ilha15", "ilha5",
        "ilha9", "ilha14", "ilha18", "ilha16",
        "ilha13", "ilha21", "ilha19"
    ];

    const sortedImages = imageOrder.map(id => ilhaImages.find(img => img.id === id)).filter(Boolean);

    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => ilhaImages.find(i => i.id === id);

    const sections = [
        {
            id: "arrival-and-release",
            title: "Arrival and Release",
            expandedBg: "bg-[#2d4a53]/60", // Muted sea teal
            coverImage: "ilha20",
            content: [
                { type: "text", text: "Ilha Grande feels less like a destination and more like a release.\n\nFor many people in Rio, the island isn’t an upgrade or a highlight — it’s a pause. A place to step out of the city’s volume without travelling far, where movement slows almost immediately because it has to. You arrive by boat. There are no roads across the island. Whatever pace you brought with you begins to loosen before you reach the shore." },
                { type: "image", id: "ilha17", caption: "Where Shade Meets the Tide" }
            ]
        },
        {
            id: "forest-first",
            title: "Forest First",
            expandedBg: "bg-[#3a5a40]/60", // Forest green
            coverImage: "ilha8",
            content: [
                { type: "text", text: "At first glance, Ilha Grande can feel familiar. There’s a hint of southern Brazil in the colours of the water and the shape of the beaches, and something of Thailand in the way jungle presses right up to the sand. Forest doesn’t sit behind the beach here — it leans over it, shades it, interrupts it. Paths disappear quickly. Clearings feel temporary.\n\nFresh water slips quietly over rock beneath dense canopy. Small details begin to matter more than landmarks." },
                { type: "grid", ids: ["ilha11", "ilha3"], caption: "Water sliding through stone and hibiscus in the shade." }
            ]
        },
        {
            id: "lived-in-quiet",
            title: "Lived-in Quiet",
            expandedBg: "bg-[#588157]/60", // Lighter forest green
            coverImage: "ilha4",
            content: [
                { type: "text", text: "Most days settle into a simple rhythm. Short walks through dense green. Dogs resting in the shade. Signs pointing to hostels, kitchens, and places you don’t need to rush toward. Boats anchored and waiting rather than arriving.\n\nThere are traces of history here, but they’re quiet ones. Stone structures reclaimed by vegetation. Old routes softened by leaves and roots. Nothing is framed or restored for emphasis. The island isn’t interested in telling its story loudly — it lets time do most of the work." },
                { type: "grid", ids: ["ilha7", "ilha15", "ilha5"], caption: "Island regulars and lived-in details." }
            ]
        },
        {
            id: "beaches-without-performance",
            title: "Beaches Without Performance",
            expandedBg: "bg-[#a3b18a]/60", // Pale sage
            coverImage: "ilha9",
            content: [
                { type: "text", text: "Beaches stretch gently rather than dramatically. Some curve long and open, others hide behind trees and narrow paths. The water stays close to the forest edge, and the forest never fully retreats. Shade is always nearby. Silence too, if you want it.\n\nIlha Grande isn’t about doing less for the sake of it. It’s about removing friction. No traffic. No urgency. No need to choose between nature and comfort — both exist in modest, unpolished ways." },
                { type: "grid", ids: ["ilha14", "ilha18", "ilha16"], caption: "Quiet curves and small wonders." }
            ]
        },
        {
            id: "departure",
            title: "Departure",
            expandedBg: "bg-[#344e41]/60", // Dark hunter green
            coverImage: "ilha13",
            content: [
                { type: "text", text: "You don’t come here to collect experiences. You come to let the city fall away.\n\nWhen you leave, it happens the same way you arrived — by water. The island recedes slowly, green folding back into blue, and only then do you realise how much quieter everything has become." },
                { type: "grid", ids: ["ilha21", "ilha19"], caption: "Receding shorelines and soft edges." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#f5f5f4", // Stone-100/50 for a light, natural feel
        opacity: 1,
    };

    return (
        <div className="transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Ilha Grande | Nomad Scribbles"
                description="A roadless island where the Atlantic Forest meets the sea. Ilha Grande is a place of quiet trails, clear water, and unhurried rhythms."
                keywords={["Ilha Grande", "Brazil Travel", "Island Life", "Atlantic Forest", "Abraão", "Hiking Brazil"]}
            />

            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            {/* Cinematic Hero Section */}
            <div className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/IlhaGrande/Small/Ilha20new.webp", { width: 2000 })}
                        alt="Ilha Grande Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2d4a53]/30 via-transparent to-[#f5f5f4]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4 mt-[-25vh] md:mt-[-45vh]">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-bold font-handwriting text-[#9c6644] drop-shadow-2xl mb-4">
                            Ilha Grande
                        </h1>
                        <p className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-black opacity-90 max-w-2xl mx-auto leading-relaxed">
                            Ilha Grande is reached by water, and it changes the pace before you even arrive.
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
                            markers={[ilhaCoords].filter(Boolean)}
                            zoomToId="ilha-grande"
                            title="Where is Ilha Grande?"
                            geography={ilhaCoords?.geography}
                            transparent={true}
                        />
                    </div>

                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
                {/* Introduction Prose can be skipped if hero text is enough, but user provided specific text for Section 1 */}

                {sections.map((section, idx) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                    />
                ))}

                <div className="w-full flex flex-col items-center gap-6 mt-16 mb-12 relative z-10">
                    <Link to="/brazil" className="flex flex-row items-center justify-center bg-[#E5CF6B]/10 border border-[#E5CF6B]/30 text-[#E5CF6B] backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-[#E5CF6B]/20 hover:text-[#E5CF6B] transition duration-300 text-sm font-medium uppercase tracking-wide">
                        <span className="text-lg mr-2">←</span>
                        <span className="text-sm font-medium">Return To Brazil</span>
                    </Link>
                    <Link to="/brazil/saopaulo" className="flex flex-row items-center justify-center bg-white/5 border border-white/10 text-white/80 backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-white/10 hover:text-white transition duration-300 text-sm font-medium">
                        <span className="text-sm font-medium">Next: São Paulo</span>
                        <span className="text-lg ml-2">→</span>
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
                            className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-[#2d4a53]/80 backdrop-blur-md p-6 md:p-8 border border-white/20 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/50"
                        >
                            <div className="max-w-2xl px-2">
                                {title && (
                                    <h4 className="text-[#a3b18a] text-2xl md:text-3xl font-bold font-handwriting mb-3 tracking-wide drop-shadow-sm">
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

function StoryCard({ section, getImage, handleImageClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedGridId, setExpandedGridId] = useState(null);
    const activeBg = section.expandedBg || "bg-[#3a5a40]/60";

    return (
        <motion.div
            layout
            className={`w-full transition-all duration-500 rounded-xl overflow-hidden shadow-lg cursor-pointer ${isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : "bg-white/40 backdrop-blur-md max-w-6xl"}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-white" : "text-[#2d4a53]"}`}>
                        {section.title}
                    </h2>
                </div>

                <RevealImage
                    smallSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.image, { width: 1200 })}
                    fullSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.lightboxImage, { width: 2000 })}
                    alt={section.title}
                    caption={getImage(section.coverImage)?.description}
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
                    <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-semibold text-stone-600">Explore Section</p>
                    <div className="w-px h-4 bg-stone-300 mt-1"></div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isExpanded ? 1 : 0,
                    height: isExpanded ? "auto" : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden bg-transparent"
            >
                <div className="px-6 pb-12 md:px-16 md:pb-20 flex flex-col items-center space-y-10">
                    {section.content.map((item, idx) => {
                        if (item.type === "text") {
                            return <p key={idx} className="text-xl leading-relaxed max-w-3xl text-center md:text-left text-white font-medium mx-auto whitespace-pre-wrap">{item.text}</p>;
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
                                        caption={img.description || item.caption}
                                        title={img.title}
                                        onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                                    />
                                </div>
                            );
                        }
                        if (item.type === "grid") {
                            return (
                                <div key={idx} className={`grid grid-cols-1 md:grid-cols-${item.ids.length > 2 ? '3' : '2'} gap-6 md:gap-10 w-full max-w-6xl`}>
                                    {item.ids.map(id => {
                                        const img = getImage(id);
                                        if (!img) return null;
                                        const isGridItemExpanded = expandedGridId === id;
                                        return (
                                            <div key={id} className={`flex flex-col items-center w-full transition-all duration-700 ${isGridItemExpanded ? "md:col-span-full z-30" : "z-10"}`}>
                                                <RevealImage
                                                    smallSrc={cloudinaryUrlFromLegacyPath(img.image, { width: 1200 })}
                                                    fullSrc={cloudinaryUrlFromLegacyPath(img.lightboxImage, { width: 2000 })}
                                                    alt={id}
                                                    title={img.title}
                                                    caption={img.description}
                                                    expanded={isGridItemExpanded}
                                                    onToggle={() => setExpandedGridId(isGridItemExpanded ? null : id)}
                                                    onClick={(e) => { e.stopPropagation(); handleImageClick(id); }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default IlhaGrande;
