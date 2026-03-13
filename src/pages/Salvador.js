import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import artImages from "../assets/artImages.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';

function Salvador() {
    const [destination, setDestination] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const found = destinations.find((d) => d.id === "salvador");
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
            id: "intro",
            title: "Salvador Is a City That Meets You Head-On",
            subtitle: "Salvador doesn’t ease you in.",
            expandedBg: "bg-[#262626]/95",
            coverImage: "salvador2",
            coverCaption: "Much of what defines Salvador today is designed to be encountered.",
            content: [
                { type: "text", text: "Salvador announces itself immediately — through colour, sound, movement, and ritual. This is one of Brazil’s most historically layered cities, and it doesn’t hide that history behind distance or subtlety." },
                { type: "text", text: "Much of what defines Salvador today is designed to be encountered. The streets invite observation. The food is offered openly. Music spills outward. Tradition is worn, carried, and performed in public space." },
                { type: "grid", ids: ["salvador1", "salvador2"] },
                { type: "text", text: "This isn’t a city that pretends not to be watched — it has learned how to meet attention directly." }
            ]
        },
        {
            id: "history",
            title: "History That Stays Visible",
            subtitle: "The Past Here Isn’t Separated from Daily Use",
            expandedBg: "bg-[#451a03]/90",
            coverImage: "salvador10",
            coverCaption: "History doesn’t unfold chronologically. It stacks.",
            content: [
                { type: "text", text: "Salvador’s historic centre isn’t preserved behind glass. Colonial buildings are still walked past, leaned against, adapted, and repainted. Churches sit beside homes, museums beside markets. The past here isn’t separated from daily use." },
                { type: "text", text: "The city’s elevation shapes how it’s experienced. Streets rise and fall sharply, revealing new views in fragments — ocean glimpses, rooftops, courtyards, towers." },
                { type: "image", id: "salvador12", caption: "An alleyway narrows the city to footsteps and echoes." },
                { type: "text", text: "History doesn’t unfold chronologically. It stacks." }
            ]
        },
        {
            id: "ritual",
            title: "Ritual in Public Space",
            subtitle: "Observation Is Part of the Exchange",
            expandedBg: "bg-[#5e2121]/95",
            coverImage: "salvador11",
            coverCaption: "These aren’t private customs briefly revealed. They are public rituals.",
            content: [
                { type: "text", text: "Many of Salvador’s most recognisable traditions exist where visitors can see them — and that visibility is intentional. Baianas in traditional dress offer food shaped by religious and cultural practice. Coloured ribbons collect wishes without explanation. Music and dance move through streets without requiring a ticket." },
                { type: "text", text: "These aren’t private customs briefly revealed. They are public rituals that continue regardless of who is watching." },
                { type: "grid", ids: ["salvador6", "salvador3"] },
                { type: "text", text: "Observation is part of the exchange." }
            ]
        },
        {
            id: "performance",
            title: "Performance Without Illusion",
            subtitle: "The Spectacle Is Real, But It Doesn’t Pretend to Be Effortless",
            expandedBg: "bg-[#333333]/95",
            coverImage: "salvador13",
            coverCaption: "Performers move with intent — not to impress, but to hold rhythm.",
            content: [
                { type: "text", text: "Salvador’s relationship with performance is unusually direct. Dance, music, and Carnival are not presented as spontaneous miracles, but as practiced, physical disciplines shaped by repetition and strength." },
                { type: "text", text: "In theatres and open spaces, performers move with intent — not to impress, but to hold rhythm, timing, and presence." },
                { type: "grid", ids: ["salvador14", "salvador7"] },
                { type: "text", text: "The spectacle is real, but it doesn’t pretend to be effortless." }
            ]
        },
        {
            id: "rest",
            title: "The City at Rest",
            subtitle: "Part of How the City Balances Itself",
            expandedBg: "bg-[#5e3a34]/95",
            coverImage: "salvador9",
            coverCaption: "The coastline opens outward. The city loosens its grip.",
            content: [
                { type: "text", text: "Away from the density of the historic centre, the pace shifts. The coastline opens outward. The city loosens its grip. Boats drift just offshore, beaches fill gradually, shade structures appear and disappear with the sun." },
                { type: "grid", ids: ["salvador17", "salvador19"] },
                { type: "text", text: "This isn’t escape from Salvador — it’s part of how the city balances itself." }
            ]
        },
        {
            id: "evening",
            title: "Evening Layers",
            subtitle: "The City Reveals Itself in Fragments Again",
            expandedBg: "bg-[#1c1c1c]/98",
            coverImage: "salvador8",
            coverCaption: "As daylight fades, Salvador doesn’t quieten — it rearranges.",
            content: [
                { type: "text", text: "As daylight fades, Salvador doesn’t quieten — it rearranges. Buildings hold colour after dark. Light becomes uneven. Rooftops offer distance from the street below. The city reveals itself in fragments again, slower this time." },
                { type: "grid", ids: ["salvador15", "salvador21"] }
            ]
        },
        {
            id: "closing",
            title: "What Salvador Offers",
            subtitle: "A Place to Pay Attention",
            expandedBg: "bg-[#3b2a2a]/95",
            coverImage: "salvador22",
            coverCaption: "Much of what defines the city is meant to be shared openly.",
            content: [
                { type: "text", text: "Salvador is well suited to travellers who want to engage directly with Brazil’s visible culture — music, food, ceremony, history — without needing to decode it first. Much of what defines the city is meant to be shared openly." },
                { type: "text", text: "It may feel intense, layered, and busy. That’s not a flaw — it’s the point." },
                { type: "text", text: "This isn’t a place to disappear into. It’s a place to pay attention." }
            ]
        }
    ], []);

    if (!destination) return null;

    return (
        <div className="min-h-screen bg-[#451a03] text-stone-100 font-serif selection:bg-[#eeda8d] selection:text-[#451a03]">
            <SEO
                title="Salvador: The Soul of Bahia"
                description="Salvador: A city where history moves, sings, resists, and remembers."
                image="/images/destinations/salvador/hero-small.jpg"
                slug="brazil/salvador"
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
                        src={`${process.env.PUBLIC_URL}/images/Salvador/full/SalvadorW1.webp`}
                        alt="Salvador Pelourinho"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#451a03]/40 via-transparent to-[#451a03]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4 mt-[-20vh] md:mt-[-40vh]">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-bold font-handwriting text-[#eeda8d] drop-shadow-2xl mb-4">
                            Salvador
                        </h1>
                        <p className="text-xl md:text-3xl font-light tracking-[0.2em] uppercase text-stone-200 opacity-90">
                            The Soul of Bahia
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

            {/* Context Map & Intro */}
            <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-8">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold font-handwriting text-[#eeda8d]">
                        Where History Moves
                    </h2>
                    <p className="text-xl leading-relaxed text-stone-300">
                        Salvador is more than a city; it is a living ritual. In the cobblestone streets of Pelourinho, the past and present are inseparable. It is here that Brazil's African heart beats strongest, expressed through the rhythm of the drums, the grace of capoeira, and the vibrant colours of colonial architecture.
                    </p>
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
                            markers={[{ id: 'salvador', name: 'Salvador', lat: -12.9714, lng: -38.5014 }]}
                            zoomToId="salvador"
                            title="Where is Salvador?"
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
                    <Link to="/brazil/pantanal" className="flex flex-row items-center justify-center text-[#eeda8d] hover:text-white transition-colors drop-shadow-sm bg-[#ceb752]/20 backdrop-blur-md rounded-full px-8 py-3 border border-[#ceb752]/40 shadow-md hover:bg-[#ceb752]/30 w-fit min-w-[240px]">
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Next: The Pantanal</span>
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
                        src={`${process.env.PUBLIC_URL}${activeImage.lightboxImage}`}
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
                        className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-[#451a03]/85 backdrop-blur-md p-6 md:p-8 border border-white/20 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/60 z-30"
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
                    smallSrc={`${process.env.PUBLIC_URL}${getImage(section.coverImage)?.image}`}
                    fullSrc={`${process.env.PUBLIC_URL}${getImage(section.coverImage)?.lightboxImage}`}
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
                                                smallSrc={`${process.env.PUBLIC_URL}${img.image}`}
                                                fullSrc={`${process.env.PUBLIC_URL}${img.lightboxImage}`}
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
                                                            smallSrc={`${process.env.PUBLIC_URL}${img.image}`}
                                                            fullSrc={`${process.env.PUBLIC_URL}${img.lightboxImage}`}
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

export default Salvador;
