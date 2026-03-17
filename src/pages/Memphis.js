import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Memphis({ openLightbox }) {
    const memphisImages = artImages.filter((img) => img.category === "Memphis");
    const getImage = (id) => memphisImages.find((i) => i.id === id);

    const getExpandedSrc = (img) => {
        if (!img) return "";
        // For Memphis: use Small folder without "z" for section expansion
        const smallPath = img.image || "";
        if (!smallPath) return "";
        // Remove "z" but stay in Small folder
        return smallPath.replace(/z(\.webp|\.jpg|\.png)?$/i, "$1");
    };

    const getFullSrc = (img) => {
        if (!img) return "";
        // For Memphis: use Full folder without "z" for lightbox
        const smallPath = img.image || "";
        if (!smallPath) return "";
        // Change from Small to Full folder and remove "z" before any extension
        const fullPath = smallPath
            .replace(/\/Small\//, "/Full/")
            .replace(/z(\.webp|\.jpg|\.png)?$/i, "$1");
        return fullPath;
    };

    const handleImageClick = (imageId) => {
        const index = memphisImages.findIndex((img) => img.id === imageId);
        if (index !== -1 && openLightbox) {
            // Create modified images array with correct Full paths for lightbox
            const modifiedImages = memphisImages.map(img => {
                const fullPath = getFullSrc(img);
                const fullPublicId = getFullSrc(img).replace('/images/', '');
                return {
                    ...img,
                    lightboxImage: fullPath,
                    lightboxImagePublicId: fullPublicId,
                    blogImagePublicId: fullPublicId
                };
            });
            openLightbox(index, modifiedImages);
        }
    };

    const sections = [
        {
            id: "crossing-mississippi",
            title: "Crossing the Mississippi",
            expandedBg: "bg-[#2e4d5c]/85",
            coverImage: "entering-tennessee",
            introText: "The Mississippi River has always been Memphis' front door, carrying travellers, traders, and musicians into the city. Even today, crossing the bridge feels like arriving somewhere with a story already playing.",
            content: [
                { type: "image", id: "paddlewheel" },
                { type: "image", id: "countess-riverboat" },
                { type: "image", id: "wc-handy-statue" },
                { type: "image", id: "history-mural" },
                { type: "image", id: "flagg-grove-school" },
                { type: "image", id: "inside-schoolhouse" },
            ],
        },
        {
            id: "sound-of-memphis",
            title: "The Sound of Memphis",
            expandedBg: "bg-[#5c4033]/85",
            coverImage: "sun-studio",
            introText: "Memphis helped shape the sound of modern music, from soul to early rock and roll. You can still feel that creative spark in the studios and instruments that changed everything.",
            content: [
                { type: "image", id: "stax-museum" },
                { type: "image", id: "recording-studio" },
                { type: "image", id: "vintage-equipment" },
                { type: "image", id: "guitars-collection" },
                { type: "image", id: "hanging-guitars" },
            ],
        },
        {
            id: "streets-of-music",
            title: "Streets of Music",
            expandedBg: "bg-[#4a3f5c]/85",
            coverImage: "guitar-art-installation1",
            introText: "Music spills far beyond the stages here, turning walls, sculptures, and city corners into tributes to legendary artists. Memphis doesn't just remember its musicians — it celebrates them in the open.",
            content: [
                { type: "image", id: "guitar-art-installation2" },
                { type: "image", id: "icon-tina-turner" },
                { type: "image", id: "gold-plated-cadillac" },
                { type: "image", id: "pink-cadillac" },
            ],
        },
        {
            id: "beale-street-begins",
            title: "Beale Street Begins",
            expandedBg: "bg-[#5c3d4a]/85",
            coverImage: "beale-street-arch",
            introText: "Beale Street is where Memphis turns up the volume, with neon lights and guitars guiding the way. Walk a few steps here and it feels like the whole street is part of the show. From the arch to the last bar, the city's musical heartbeat is impossible to miss.",
            content: [
                { type: "image", id: "beale-street-neon" },
                { type: "image", id: "neon-memphis" },
                { type: "image", id: "jerry-lawler-bar" },
                { type: "image", id: "venetian-blinds" },
            ],
        },
        {
            id: "live-blues",
            title: "Live Blues",
            expandedBg: "bg-[#2d3548]/90",
            coverImage: "bb-kings-blues-club-sign",
            introText: "Inside the clubs and bars, guitars, harmonicas, and voices keep the blues alive night after night. It's the kind of music that feels best when you're standing only a few feet from the stage.",
            content: [
                { type: "image", id: "bb-kings-blues-club-band" },
                { type: "image", id: "blues-city-cafe" },
                { type: "image", id: "blues-hall" },
                { type: "image", id: "musicians1" },
                { type: "image", id: "musicians2" },
                { type: "image", id: "musicians3" },
                { type: "image", id: "rustic-stage" },
                { type: "image", id: "cozy-club" },
            ],
        },
        {
            id: "memphis-after-dark",
            title: "Memphis After Dark",
            expandedBg: "bg-[#2a2438]/90",
            coverImage: "nightlife",
            introText: "When the sun sets, the city glows with neon signs, busy bars, and late-night diners. Nights like these remind you that Memphis has always known how to stay awake. The streets stay loud, the kitchens stay open, and the music doesn't stop.",
            content: [
                { type: "image", id: "illuminated-bar" },
                { type: "image", id: "fish-restaurant" },
                { type: "image", id: "arcade-restaurant" },
                { type: "image", id: "gumball-machine" },
            ],
        },
    ];

    return (
        <div className="bg-[#f4ede6]">
            <SEO
                title="Memphis | Nomad Scribbles"
                description="Explore Memphis — Beale Street, the Mississippi, Sun Studio, Stax, and the live blues that still define the city."
                keywords={["Memphis", "Tennessee", "Beale Street", "blues", "Sun Studio", "Stax", "Mississippi River"]}
            />

            {/* Hero — top image, not framed */}
            <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Memphis/Small/Illuminated Beale Street.webp", { width: 2000 })}
                        alt="Illuminated Beale Street"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#f4ede6]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-bold font-serif text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] mb-4 tracking-tight [text-shadow:0_0_40px_rgba(0,0,0,0.9)]">
                            Memphis
                        </h1>
                    </motion.div>
                </div>
            </div>

            <main className="px-4 py-12 max-w-screen-xl mx-auto space-y-16 flex flex-col items-center">
                {/* Opening blurb */}
                <article className="max-w-3xl mx-auto text-stone-800 space-y-6 px-4 mb-8">
                    <p className="text-xl leading-relaxed italic text-center font-serif opacity-90">
                        Memphis sits where the Mississippi meets the blues: Beale Street, Sun Studio, Stax, and the live music that still runs through the city after dark.
                    </p>
                </article>

                {sections.map((section) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                        getExpandedSrc={getExpandedSrc}
                    />
                ))}

                <div className="w-full flex flex-col items-center gap-6 mt-12 mb-20 relative z-20 px-4">
                    <Link
                        to="/united-states"
                        className="flex flex-row items-center justify-center bg-[#2e4d5c]/20 border-2 border-[#2e4d5c] text-[#2e4d5c] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#2e4d5c]/30 hover:text-[#2e4d5c] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]"
                    >
                        <span className="text-lg mr-2">←</span>
                        <span className="text-sm font-medium whitespace-nowrap">Return To USA</span>
                    </Link>

                    <Link
                        to="/united-states/tennessee/mountains"
                        className="flex flex-row items-center justify-center bg-[#2e4d5c]/20 border-2 border-[#2e4d5c] text-[#2e4d5c] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#2e4d5c]/30 hover:text-[#2e4d5c] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]"
                    >
                        <span className="text-sm font-medium whitespace-nowrap">Next: Smoky Mountains</span>
                        <span className="text-lg ml-2">→</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}

const sideFromId = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return hash % 2 === 0 ? "left" : "right";
};

function RevealImage({ idForLayout, smallSrc, fullSrc, alt, onClick, caption, expanded, onToggle, autoCollapse, title }) {
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

        const observer = new IntersectionObserver(entry => {
            if (!entry[0].isIntersecting) {
                setVisuallyExpanded(false);
            }
        }, { threshold: 0 });

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
    const side = idForLayout ? sideFromId(idForLayout) : "left";
    const isRight = side === "right";

    const layoutClass = visuallyExpanded
        ? isRight
            ? "flex flex-col md:flex-row-reverse gap-8 items-start"
            : "flex flex-col md:flex-row gap-8 items-start"
        : "flex justify-center items-center";

    return (
        <motion.div
            layout
            ref={containerRef}
            className={`relative mx-auto transition-all duration-700 ease-in-out my-8 ${
                visuallyExpanded ? "w-full max-w-[98vw] md:max-w-screen-2xl" : "w-full md:w-1/2 max-w-5xl"
            }`}
        >
            <div className={`relative w-full ${layoutClass}`}>
                <div className="relative w-full flex justify-center items-center md:flex-[2]">
                    <img
                        src={smallSrc}
                        alt={alt}
                        onClick={handleClick}
                        loading="lazy"
                        className={`rounded-sm shadow-sm transition-all duration-500 cursor-pointer w-full h-auto ${
                            visuallyExpanded ? "max-h-[45vh] md:max-h-[70vh]" : "max-h-[38vh]"
                        } object-contain ${showFullAsDriver ? "absolute inset-0 opacity-0" : "relative z-10 opacity-100"}`}
                    />

                    {!imgError && visuallyExpanded && (
                        <img
                            src={fullSrc}
                            alt={alt}
                            onClick={handleClick}
                            onLoad={() => setFullLoaded(true)}
                            onError={() => setImgError(true)}
                            className={`rounded-sm transition-all duration-700 ease-out cursor-pointer w-full h-auto max-h-[90vh] object-contain ${
                                showFullAsDriver ? "relative z-20 opacity-100 scale-100" : "absolute inset-0 z-20 opacity-0 scale-95"
                            }`}
                            loading="lazy"
                        />
                    )}
                </div>

                {visuallyExpanded && (title || caption) && (
                    <motion.aside
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full bg-white/70 backdrop-blur-md border border-stone-200 shadow-lg rounded-2xl p-6 md:p-8 md:flex-[1]"
                    >
                        {title && <h4 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mb-3">{title}</h4>}
                        {caption && <p className="text-base md:text-lg leading-relaxed font-serif italic text-stone-700">{caption}</p>}
                        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">Tap image to open</p>
                    </motion.aside>
                )}
            </div>
        </motion.div>
    );
}

function StoryCard({ section, getImage, handleImageClick, getExpandedSrc }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedGridId, setExpandedGridId] = useState(null);
    const activeBg = section.expandedBg || "bg-stone-200/40";

    const cover = getImage(section.coverImage);

    return (
        <motion.div
            layout
            className={`w-full transition-all duration-700 rounded-3xl overflow-hidden shadow-sm cursor-pointer border border-stone-200/50 ${isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : "bg-white max-w-5xl"}`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="relative p-8 md:p-12 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2 className={`text-3xl md:text-5xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 pb-2 ${isExpanded ? "text-white" : "text-[#2d4a53]"}`}>
                        {section.title}
                    </h2>
                </div>

                {section.introText && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-2xl mx-auto text-center mb-10 px-4 ${isExpanded ? "text-white" : "text-stone-700"}`}
                    >
                        <p
                            className={`leading-relaxed font-serif italic opacity-90 ${
                                isExpanded
                                    ? "text-xl md:text-2xl border-b border-white/20 pb-8"
                                    : "text-sm md:text-base line-clamp-3"
                            }`}
                        >
                            {section.introText}
                        </p>
                    </motion.div>
                )}

                <RevealImage
                    idForLayout={section.coverImage}
                    smallSrc={cloudinaryUrlFromLegacyPath(cover?.image, { width: 1200 })}
                    fullSrc={cloudinaryUrlFromLegacyPath(getExpandedSrc(cover), { width: 2000 })}
                    alt={section.title}
                    caption={cover?.description}
                    title={cover?.title}
                    onClick={(e) => { e.stopPropagation(); handleImageClick(section.coverImage); }}
                />

                {!isExpanded && (
                    <motion.div className="flex flex-col items-center h-8 opacity-40">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500">Explore Story</p>
                        <div className="w-px h-4 bg-stone-300 mt-1"></div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-8 pb-16 md:px-20 md:pb-24 flex flex-col items-center space-y-12">
                            {section.content.map((item, idx) => {
                                if (item.type === "image") {
                                    const img = getImage(item.id);
                                    return (
                                        <div key={idx} className="w-full">
                                            <RevealImage
                                                idForLayout={item.id}
                                                smallSrc={cloudinaryUrlFromLegacyPath(img?.image, { width: 1200 })}
                                                fullSrc={cloudinaryUrlFromLegacyPath(getExpandedSrc(img), { width: 2000 })}
                                                alt={img?.title || ""}
                                                caption={img?.description || item.caption}
                                                title={img?.title}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleImageClick(item.id);
                                                }}
                                            />
                                        </div>
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

export default Memphis;
