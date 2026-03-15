import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Nashville({ openLightbox }) {
    const nashvilleImages = artImages.filter((img) => img.category === "Nashville");
    const getImage = (id) => nashvilleImages.find((i) => i.id === id);

    const getExpandedSrc = (img) => {
        if (!img) return "";
        // For Nashville: use Small folder without "z" for section expansion
        const baseSmall = img.image || "";
        if (!baseSmall) return "";
        // Remove "z" but stay in Small folder
        return baseSmall.replace(/z(\.webp|\.jpg|\.png)?$/i, "$1");
    };

    const getFullSrc = (img) => {
        if (!img) return "";
        // For Nashville: use Full folder without "z" for lightbox
        const baseSmall = img.image || "";
        if (!baseSmall) return "";
        // Change from Small to Full folder and remove "z"
        return baseSmall
            .replace(/\/Small\//, "/Full/")
            .replace(/z(\.webp|\.jpg|\.png)?$/i, "$1");
    };

    const handleImageClick = (imageId) => {
        const index = nashvilleImages.findIndex((img) => img.id === imageId);
        if (index !== -1 && openLightbox) {
            // Create modified images array with correct Full paths for lightbox
            const modifiedImages = nashvilleImages.map(img => {
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
            id: "music-city-roots",
            title: "Music City Roots",
            expandedBg: "bg-[#2f3d4f]/80",
            coverImage: "esteemed-musicians",
            introText:
                "Music isn’t just entertainment in Nashville — it’s part of the city’s identity. Legends were shaped here, and the history of country music is preserved in museums, murals, and stages across town.",
            content: [
                { type: "image", id: "hall-of-fame" },
                { type: "image", id: "golden-records" },
                { type: "image", id: "hank-williams-guitar" },
                { type: "image", id: "jukebox" },
            ],
        },
        {
            id: "streets-of-broadway",
            title: "Streets of Broadway",
            expandedBg: "bg-[#4b3142]/80",
            coverImage: "broadway",
            introText:
                "Broadway is Nashville at full volume. Neon signs flash, music spills from open doors, and the street hums with energy from morning until long after sunset.",
            content: [
                { type: "image", id: "bustling-street" },
                { type: "image", id: "neon-signs" },
                { type: "image", id: "tin-roof-club" },
                { type: "image", id: "tootsies-bar" },
            ],
        },
        {
            id: "songwriters-and-performers",
            title: "Songwriters and Performers",
            expandedBg: "bg-[#343652]/80",
            coverImage: "bluebird-cafe",
            introText:
                "Behind the neon lights are the musicians themselves. Nashville is a city where aspiring songwriters share the same stages and stories as established stars.",
            content: [
                { type: "image", id: "musical-bar" },
                { type: "image", id: "iconic-mural" },
            ],
        },
        {
            id: "nashville-character",
            title: "Nashville Character",
            expandedBg: "bg-[#4b3b32]/85",
            coverImage: "cowboy-boots",
            introText:
                "Beyond the music, Nashville has a playful personality. Shops, decorations, and street details add a layer of humour and Americana charm to the city.",
            content: [
                { type: "image", id: "amusing-sign" },
                { type: "image", id: "americana-decoration" },
                { type: "image", id: "old-artifacts" },
            ],
        },
        {
            id: "nashville-after-dark",
            title: "Nashville After Dark",
            expandedBg: "bg-[#26263a]/85",
            coverImage: "dolly",
            introText:
                "When night falls, the city shifts into another gear. Rooftops sparkle, music drifts through the streets, and Nashville’s famous nightlife comes alive.",
            content: [
                { type: "image", id: "rooftop-decoration" },
                { type: "image", id: "lounge-club" },
                { type: "image", id: "walk-of-fame" },
            ],
        },
    ];

    return (
        <div className="bg-[#f2f0e9]">
            <SEO
                title="Nashville | Nomad Scribbles"
                description="Explore Nashville — skyline views, Broadway’s neon, quiet songwriter corners, and the character that keeps Music City moving after dark."
                keywords={["Nashville", "Tennessee", "Broadway", "Music City", "country music", "Bluebird Cafe"]}
            />

            {/* Hero */}
            <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Nashville/Small/Nashville Skyline2.webp", { width: 2000 })}
                        alt="Nashville Skyline"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-[#f2f0e9]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4 -mt-36">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-bold font-serif text-white drop-shadow-[0_2px_20px_rgba(30,58,138,0.65)] mb-4 tracking-tight [text-shadow:0_0_40px_rgba(30,58,138,0.75)]">
                            Nashville
                        </h1>
                    </motion.div>
                </div>
            </div>

            <main className="px-4 py-12 max-w-screen-xl mx-auto space-y-16 flex flex-col items-center">
                {/* Intro blurb */}
                <article className="max-w-3xl mx-auto text-stone-800 space-y-6 px-4 mb-8">
                    <p className="text-xl leading-relaxed italic text-center font-serif opacity-90">
                        Nashville blends polished skyscrapers with a deep musical past that still echoes through its streets. From the
                        banks of the Cumberland River to the neon glow of Broadway, this is a city built on rhythm, stories, and a good
                        dose of Southern personality.
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

                <div className="w-full flex flex-col items-center gap-4 mt-12 mb-20 relative z-10">
                    <Link
                        to="/united-states/tennessee"
                        className="flex flex-row items-center justify-center text-stone-600 hover:text-stone-900 transition-colors drop-shadow-md bg-white/60 backdrop-blur-md rounded-full px-8 py-3 border border-stone-200 shadow-lg hover:bg-white/80 w-fit min-w-[240px]"
                    >
                        <span className="text-xl mr-3 pb-1">←</span>
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight font-serif">
                            Return to Tennessee
                        </span>
                    </Link>

                    <Link
                        to="/united-states/tennessee/memphis"
                        className="flex flex-row items-center justify-center text-stone-600 hover:text-stone-900 transition-colors drop-shadow-md bg-white/60 backdrop-blur-md rounded-full px-8 py-3 border border-stone-200 shadow-lg hover:bg-white/80 w-fit min-w-[240px]"
                    >
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight font-serif">
                            Visit Memphis
                        </span>
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

        const observer = new IntersectionObserver(
            (entry) => {
                if (!entry[0].isIntersecting) {
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
            } else if (onClick) {
                onClick(e);
            }
        } else {
            if (!visuallyExpanded) {
                setVisuallyExpanded(true);
            } else if (onClick) {
                onClick(e);
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
                {/* Image */}
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

                {/* Text */}
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
            className={`w-full transition-all duration-700 rounded-3xl overflow-hidden shadow-sm cursor-pointer border border-stone-200/50 ${
                isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : "bg-white max-w-5xl"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="relative p-8 md:p-12 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2
                        className={`text-3xl md:text-5xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 pb-2 ${
                            isExpanded ? "text-white" : "text-[#2d4a53]"
                        }`}
                    >
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
                                isExpanded ? "text-xl md:text-2xl border-b border-white/20 pb-8" : "text-sm md:text-base line-clamp-3"
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
                        <div className="w-px h-4 bg-stone-300 mt-1" />
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

export default Nashville;

