import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Mountains({ openLightbox }) {
    const mountainImages = artImages.filter(img => img.category === "Mountains");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    const getImage = (id) => mountainImages.find(i => i.id === id);

    const handleImageClick = (imageId) => {
        const index = mountainImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            // Create modified images array with correct Full paths for lightbox
            const modifiedImages = mountainImages.map(img => ({
                ...img,
                lightboxImage: img.lightboxImage
            }));
            openLightbox(index, modifiedImages);
        }
    };

    const sections = [
        {
            id: "arrival",
            title: "Arrival",
            subtitle: "ENTERING THE SMOKIES",
            expandedBg: "bg-[#4a5d4e]/60",
            coverImage: "mount-sign",
            introText: "The mountains roll in like they own the place. You just drive along and let them set the pace.",
            content: [
                { type: "image", id: "mount-panoramic" },
                { type: "image", id: "mount-vista" },
                { type: "image", id: "mount-hills" }
            ]
        },
        {
            id: "forest",
            title: "Forest Immersion",
            subtitle: "DETAILS IN THE DENSE TREE",
            expandedBg: "bg-[#2d3a2f]/70",
            coverImage: "mount-dense",
            introText: "The trees take over your view. Step in and notice the small details that make the forest feel alive.",
            content: [
                { type: "image", id: "mount-branches" },
                { type: "image", id: "mount-roots" },
                { type: "image", id: "mount-woodland" },
                { type: "image", id: "mount-stretching" },
                { type: "image", id: "mount-towering" },
                { type: "image", id: "mount-pine" },
                { type: "image", id: "mount-redbud" },
                { type: "image", id: "mount-fleabane" }
            ]
        },
        {
            id: "water",
            title: "Water Through the Mountains",
            expandedBg: "bg-[#3e4c59]/60",
            coverImage: "mount-peaceful-river",
            introText: "Rivers and streams are everywhere, moving at their own speed. Follow them and you’ll see the land’s natural flow.",
            content: [
                { type: "image", id: "mount-serene-river" },
                { type: "image", id: "mount-rushing-river" },
                { type: "image", id: "mount-moss-rocks" },
                { type: "image", id: "mount-river-view" }
            ]
        },
        {
            id: "traces",
            title: "Human Traces",
            subtitle: "CABINS, CHURCHES AND SPLIT RAIL FENCES",
            expandedBg: "bg-[#5d544a]/60",
            coverImage: "mount-church",
            introText: "Cabins, churches, and fences show how people figured it out here. Nothing fancy — just practical, clever, and quietly interesting.",
            content: [
                { type: "image", id: "mount-cabin" },
                { type: "image", id: "mount-wooden-cabin" },
                { type: "image", id: "mount-perched-house" },
                { type: "image", id: "mount-chairs" },
                { type: "image", id: "mount-scenic-valley" },
                { type: "image", id: "mount-horses" },
                { type: "image", id: "mount-firetrack" }
            ]
        },
        {
            id: "wildlife",
            title: "Wildlife & Quiet Encounters",
            expandedBg: "bg-[#4a453f]/60",
            coverImage: "mount-alert-deer",
            introText: "Eyes open, ears alert — something might peek at you. Deer, groundhogs, and birds pop up when you least expect it.",
            content: [
                { type: "image", id: "mount-wild-deer" },
                { type: "image", id: "mount-groundhog" }
            ]
        },
        {
            id: "twilight",
            title: "Valley Perspective & Twilight",
            expandedBg: "bg-[#3a352f]/70",
            coverImage: "mount-valley-view",
            introText: "Ridges, valleys, and fading light change the view fast. It’s a place to notice the big picture and the little things at the same time.",
            content: [
                { type: "image", id: "mount-twilight" },
                { type: "image", id: "mount-breakfast" }
            ]
        }
    ];

    return (
        <div className="bg-[#f2f0e9]">
            <SEO
                title="Great Smoky Mountains | Nomad Scribbles"
                description="Explore the layers of the Great Smoky Mountains through arrival, forest immersion, water, human traces, and twilight perspective."
                keywords={["Smoky Mountains", "Tennessee", "Appalachian range", "Great Smoky Mountains National Park", "Mountain photography"]}
            />

            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            {/* Cinematic Hero */}
            <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/United States/Tennessee/Mountains/Small/Panoramic Mountains2.webp", { width: 2000 })}
                        alt="Great Smoky Mountains Panorama"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#f2f0e9]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-bold font-serif text-white drop-shadow-2xl mb-4 tracking-tight">
                            The Great Smoky Mountains
                        </h1>
                    </motion.div>
                </div>
            </div>

            <main className="px-4 py-12 max-w-screen-xl mx-auto space-y-16 flex flex-col items-center">
                {/* Introduction Prose */}
                <article className="max-w-3xl mx-auto text-stone-800 space-y-6 px-4 mb-8">
                    <p className="text-xl leading-relaxed italic text-center font-serif opacity-90">
                        "The Smokies are defined by ancient ridges and blue-grey mist. Hiking trails, rivers, and small towns reveal both the scale of the land and the history of those who lived within it."
                    </p>
                </article>

                {sections.map((section, idx) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                    />
                ))}

                <div className="w-full flex flex-col items-center gap-6 mt-12 mb-20 relative z-10">
                    <Link to="/united-states/tennessee" className="flex flex-row items-center justify-center text-stone-600 hover:text-stone-900 transition-colors drop-shadow-md bg-white/60 backdrop-blur-md rounded-full px-8 py-3 border border-stone-200 shadow-lg hover:bg-white/80 w-fit min-w-[240px]">
                        <span className="text-xl mr-3 pb-1">←</span>
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight font-serif">Return to Tennessee</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}

function RevealImage({ smallSrc, fullSrc, alt, onClick, caption, expanded, onToggle, title }) {
    const isControlled = expanded !== undefined;
    const [visuallyExpanded, setVisuallyExpanded] = useState(isControlled ? expanded : false);
    const [fullLoaded, setFullLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isControlled) {
            setVisuallyExpanded(expanded);
        }
    }, [expanded, isControlled]);

    useEffect(() => {
        if (!visuallyExpanded) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (!entry.isIntersecting) setVisuallyExpanded(false); },
            { threshold: 0 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [visuallyExpanded]);

    const handleClick = (e) => {
        e.stopPropagation();
        if (visuallyExpanded) {
            if (onClick) onClick(e);
        } else {
            setVisuallyExpanded(true);
            if (isControlled && onToggle) onToggle();
        }
    };

    return (
        <motion.div
            layout
            ref={containerRef}
            className={`relative mx-auto transition-all duration-700 ease-in-out my-6 ${visuallyExpanded ? "w-full max-w-[98vw] md:max-w-screen-2xl" : "w-full md:w-3/4 max-w-4xl"}`}
        >
            <div className="relative w-full flex justify-center items-center">
                <img
                    src={smallSrc}
                    alt={alt}
                    onClick={handleClick}
                    loading="lazy"
                    className={`rounded-sm shadow-sm transition-all duration-500 cursor-pointer ${visuallyExpanded && fullLoaded ? "absolute opacity-0" : "relative"} w-full h-auto max-h-[85vh] object-contain z-10`}
                />

                {visuallyExpanded && (
                    <div className={`z-20 ${fullLoaded ? "relative w-full" : "absolute inset-0 opacity-0"}`}>
                        <img
                            src={fullSrc}
                            alt={alt}
                            onClick={handleClick}
                            onLoad={() => setFullLoaded(true)}
                            loading="lazy"
                            className={`rounded-sm transition-all duration-700 cursor-pointer w-full h-auto max-h-[85vh] object-contain ${fullLoaded ? "opacity-100 scale-100" : "scale-95"}`}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-6 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-black/60 backdrop-blur-md p-6 border border-white/10 text-left pointer-events-none rounded-xl shadow-2xl"
                        >
                            <div className="max-w-2xl px-2 text-white">
                                {title && <h4 className="text-xl md:text-2xl font-bold font-serif mb-2">{title}</h4>}
                                {caption && <p className="text-sm md:text-base leading-relaxed font-serif italic opacity-90">{caption}</p>}
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
                    {section.subtitle && (
                        <p className={`text-xs md:text-sm tracking-[0.3em] font-bold uppercase transition-colors duration-500 ${isExpanded ? "text-white/70" : "text-[#2d4a53]/60"}`}>
                            {section.subtitle}
                        </p>
                    )}
                </div>

                {isExpanded && section.introText && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto text-white text-center mb-10 px-4"
                    >
                        <p className="text-xl md:text-2xl leading-relaxed font-serif italic opacity-90 border-b border-white/20 pb-8">
                            {section.introText}
                        </p>
                    </motion.div>
                )}

                <RevealImage
                    smallSrc={cloudinaryUrlFromLegacyPath(cover?.image, { width: 1200 })}
                    fullSrc={cloudinaryUrlFromLegacyPath(cover?.blogimage, { width: 2000 })}
                    alt={section.title}
                    caption={cover?.description}
                    title={cover?.title}
                    onClick={() => handleImageClick(section.coverImage)}
                    expanded={isExpanded}
                    onToggle={() => setIsExpanded(!isExpanded)}
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
                                                smallSrc={cloudinaryUrlFromLegacyPath(img?.image, { width: 1200 })}
                                                fullSrc={cloudinaryUrlFromLegacyPath(img?.blogimage, { width: 2000 })}
                                                alt={img?.title || ""}
                                                caption={img?.description || item.caption}
                                                title={img?.title}
                                                onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                                            />
                                        </div>
                                    );
                                }
                                if (item.type === "grid") {
                                    return (
                                        <div key={idx} className={`grid grid-cols-1 md:grid-cols-${item.ids.length > 3 ? '2' : item.ids.length} gap-8 w-full max-w-screen-xl`}>
                                            {item.ids.map((id, gIdx) => {
                                                const img = getImage(id);
                                                const isEx = expandedGridId === id;
                                                return (
                                                    <div key={id} className={`flex flex-col items-center w-full transition-all duration-700 ${isEx ? "md:col-span-full z-30" : "z-10"}`}>
                                                        <RevealImage
                                                            smallSrc={cloudinaryUrlFromLegacyPath(img?.image, { width: 1200 })}
                                                            fullSrc={cloudinaryUrlFromLegacyPath(img?.blogimage, { width: 2000 })}
                                                            alt={id}
                                                            title={img?.title}
                                                            caption={item.captions ? item.captions[gIdx] : img?.description}
                                                            expanded={isEx}
                                                            onToggle={() => setExpandedGridId(isEx ? null : id)}
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
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Mountains;
