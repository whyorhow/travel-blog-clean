import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import artImages from "../assets/artImages.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Iguazu() {
    const [destination, setDestination] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const found = destinations.find((d) => d.id === "foz");
        setDestination(found);
    }, []);

    const getImage = (id) => artImages.find((img) => img.id === id);

    const handleImageClick = (id) => {
        const img = getImage(id);
        if (img) {
            setActiveImage(img);
        }
    };

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    const sections = useMemo(() => [
        {
            id: "buildup",
            title: "The Build-Up",
            subtitle: "Views from above, through the trees",
            expandedBg: "bg-[#1e3a8a]/80",
            coverImage: "iguazu16",
            coverCaption: "Water and forest on a scale that’s difficult to absorb all at once.",
            content: [
                { type: "text", text: "Long before you see the water, you hear it.\n\nAt first it’s distant, almost atmospheric — a low, continuous presence that sits beneath the forest sounds. The path moves through dense greenery, opening and closing again, offering brief glimpses of river far below. From above, Iguazu feels wide rather than tall, the water spreading out in multiple directions, broken by islands of rock and vegetation." },
                { type: "grid", ids: ["iguazu1", "iguazu2"] },
                { type: "text", text: "The noise grows gradually, building with each step. It doesn’t rise and fall — it accumulates." },
                { type: "image", id: "iguazu4", caption: "Water and forest on a scale that’s difficult to absorb all at once." },
                { type: "image", id: "iguazu3", caption: "Iguazu reveals itself gradually, never all at once." }
            ]
        },
        {
            id: "impact",
            title: "The Impact",
            subtitle: "Noise, proximity, overload",
            expandedBg: "bg-[#1e40af]/90",
            coverImage: "iguazu6",
            coverCaption: "Up close, Iguazu is overwhelming.",
            content: [
                { type: "text", text: "Up close, Iguazu is overwhelming.\n\nThe sound becomes physical — a deep, relentless roar that presses into your chest and flattens conversation into gestures and half-smiles. Water crashes past at eye level, folding over itself again and again, throwing spray into the air so thick it feels like rain. The ground vibrates underfoot. Everything else recedes." },
                { type: "image", id: "iguazu8", caption: "This isn’t a single waterfall. It’s a system repeating itself across a vast arc of rock." },
                { type: "image", id: "iguazu5", caption: "Spray hangs in the air, catching the light." }
            ]
        },
        {
            id: "distance",
            title: "Distance and Life",
            subtitle: "Perspectives from the triple frontier",
            expandedBg: "bg-[#101b4c]/95",
            coverImage: "iguazu9",
            coverCaption: "Crossing to the Argentinian side, the tone changes.",
            content: [
                { type: "text", text: "Crossing to the Argentinian side, the tone changes.\n\nThe falls are still vast, still loud, but they feel more distant, framed by forest and open sky. From here, Iguazu reveals its full width and the way it spills across borders without regard for them. Brazil and Argentina sit neatly marked on signs and platforms, while the river continues uninterrupted below." },
                { type: "grid", ids: ["iguazu7", "iguazu10"] },
                { type: "grid", ids: ["iguazu12", "iguazu13"] },
                { type: "grid", ids: ["iguazu17", "iguazu18"] },
                { type: "text", text: "Away from the main viewpoints, attention shifts. Wildlife appears at the edges — birds in the canopy, coatis along the railings, butterflies pausing wherever the noise briefly softens. Upstream, the river looks almost calm, spreading wide and unhurried, giving no hint of what lies just metres ahead." }
            ]
        },
        {
            id: "closing",
            title: "The Lingering Memory",
            subtitle: "The memory of scale",
            expandedBg: "bg-[#0f172a]/98",
            coverImage: "iguazu11",
            coverCaption: "Iguazu doesn’t end with a final image.",
            content: [
                { type: "text", text: "Iguazu doesn’t end with a final image.\n\nIt lingers instead as sound, pressure, and memory — the sense of having stood briefly inside something too large to fully absorb. Whether you arrive knowing only its reputation, or return already familiar with its force, the experience resists simplification." },
                { type: "grid", ids: ["iguazu14", "iguazu15"] },
                { type: "quote", text: "This is a place people come to witness. What stays with you is how completely it surrounds you while you’re there." }
            ]
        }
    ], []);

    if (!destination) return null;

    return (
        <div className="min-h-screen bg-[#1e3a8a] text-stone-100 font-serif selection:bg-[#eeda8d] selection:text-[#1e3a8a]">
            <SEO
                title="Iguazu Falls: A Force of Nature"
                description="Iguazu is a landscape of falling water and dense subtropical forest, where the river ignores borders and life thrives in the spray."
                image={cloudinaryUrlFromLegacyPath("/images/destinations/iguazu/hero-small.jpg", { width: 1200 })}
                slug="brazil/iguazu"
            />

            {/* Cinematic Hero Section */}
            <div className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={cloudinaryUrlFromLegacyPath("/images/Iguazu/full/Iguazu16.webp", { width: 2000 })}
                        alt="Iguazu Falls Landscape"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/40 via-transparent to-[#1e3a8a]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4 mt-[-20vh] md:mt-[-40vh]">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-bold font-handwriting text-[#eeda8d] drop-shadow-2xl mb-4">
                            Iguazu
                        </h1>
                        <p className="text-xl md:text-3xl font-bold tracking-[0.2em] uppercase text-stone-200 opacity-90">
                            The Great Waters
                        </p>
                    </motion.div>
                </div>
            </div>

            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                    </filter>
                </defs>
            </svg>

            <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-8">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold font-handwriting text-[#eeda8d]">
                        Into the Mist
                    </h2>
                    <p className="text-xl leading-relaxed text-stone-300">
                        Iguazu is not a single fall, but a system of 275 cascades that spread across nearly three kilometres. It is a place of profound noise and overwhelming proximity, where the Atlantic Forest meets the river in a relentless display of power and life.
                    </p>
                </div>
            </div>

            <div className="relative w-full mb-16 overflow-hidden">
                <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
                    style={spreadBackgroundStyle}
                />

                <div className="relative z-20 max-w-5xl mx-auto px-4 pt-0 pb-4 md:pt-2 md:pb-8 flex flex-col items-center mt-[-10px]">
                    <div className="max-w-6xl mx-auto mb-16 px-4">
                        <ContextMap
                            markers={[{ id: 'iguazu', name: 'Iguazu Falls', lat: -25.6953, lng: -54.4367 }]}
                            zoomToId="iguazu"
                            title="Where is Iguazu?"
                            geography={destination?.geography}
                            transparent={true}
                        />
                    </div>

                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24 mt-24">
                {sections.map((section) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                    />
                ))}

                <div className="w-full flex flex-col items-center justify-center gap-6 mt-20 mb-12 relative z-10">
                    <Link to="/brazil" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/60 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/80 w-fit min-w-[240px]">
                        <span className="text-xl mr-3 pb-1">←</span>
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Brazil</span>
                    </Link>
                    <Link to="/brazil/manaus" className="flex flex-row items-center justify-center text-[#eeda8d] hover:text-white transition-colors drop-shadow-sm bg-[#ceb752]/20 backdrop-blur-md rounded-full px-8 py-3 border border-[#ceb752]/40 shadow-md hover:bg-[#ceb752]/30 w-fit min-w-[240px]">
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Next: Manaus</span>
                        <span className="text-xl ml-3 pb-1">→</span>
                    </Link>
                </div>
            </main>

            {/* Lightbox placeholder if needed */}
            {activeImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setActiveImage(null)}
                >
                    <img
                        src={cloudinaryUrlFromLegacyPath(activeImage.lightboxImage, { width: 2000 })}
                        alt={activeImage.title}
                        className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                    />
                    <div className="absolute bottom-10 left-0 right-0 text-center text-white px-6">
                        <h4 className="text-2xl font-handwriting text-[#D4AF37] mb-2">{activeImage.title}</h4>
                        <p className="text-stone-300 italic max-w-2xl mx-auto">{activeImage.description}</p>
                    </div>
                </div>
            )}
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
                        className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-[#064e3b]/85 backdrop-blur-md p-6 md:p-8 border border-white/20 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/60 z-30"
                    >
                        <div className="max-w-2xl px-2">
                            {title && <h4 className="text-[#D4AF37] text-2xl md:text-3xl font-bold font-handwriting mb-3 tracking-wide drop-shadow-sm">{title}</h4>}
                            {caption && <p className="text-white text-lg leading-relaxed font-serif italic opacity-95">{caption}</p>}
                        </div>
                    </motion.div>
                )}
            </div>

            {!visuallyExpanded && title && (
                <div className="mt-6 flex justify-center">
                    <div className="max-w-[200px] p-3 bg-white/5 backdrop-blur-sm border-l border-[#D4AF37]/50 text-center shadow-sm">
                        <h4 className="text-stone-200 text-xs font-bold uppercase tracking-widest mb-1 font-cormorant">{title}</h4>
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

export default Iguazu;
