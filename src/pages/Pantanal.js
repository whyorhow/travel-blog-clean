import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Pantanal({ openLightbox }) {
    const pantanalCoords = destinations.find(d => d.id === "pantanal");
    const pantanalImages = artImages.filter(img => img.category === "Pantanal");


    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "pantanal1", "pantanal2", "pantanal3", "pantanal4", "pantanal5", "pantanal6", "pantanal7"
    ];

    const sortedImages = imageOrder.map(id => pantanalImages.find(img => img.id === id)).filter(Boolean);

    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => pantanalImages.find(i => i.id === id);

    const sections = [
        {
            id: "intro",
            title: "The Pantanal",
            subtitle: "Shaped by Water — Not by Us",
            expandedBg: "bg-[#262626]/95",
            coverImage: "pantanal6",
            coverCaption: "As the sun drops, water reflects light and cloud in equal measure.",
            content: [
                { type: "text", text: "The Pantanal is one of the largest tropical wetlands on Earth, stretching across Brazil, Bolivia, and Paraguay. Unlike places defined by roads, borders, or permanent landmarks, this landscape is governed almost entirely by water." },
                { type: "text", text: "Seasonal flooding reshapes everything. Grasslands turn into shallow lakes, rivers spill into forests, and familiar paths vanish for months at a time. Life here is built around movement and return. The land doesn’t settle — it breathes." }
            ]
        },
        {
            id: "flooding",
            title: "Water That Moves the World",
            subtitle: "Seasonal Flooding Reshapes Everything",
            expandedBg: "bg-[#0c4a6e]/95",
            coverImage: "pantanal1",
            coverCaption: "A caiman pauses where water meets land.",
            content: [
                { type: "text", text: "What you experience in the Pantanal depends entirely on when you arrive. During the dry season, animals gather around shrinking water sources. When the rains return, the land opens outward and life disperses. There is no single, fixed version of this place." },
                { type: "header", text: "Pantanal and Amazon: Different Kinds of Wild" },
                { type: "text", text: "The Pantanal is often mentioned alongside the Amazon, but the experience of each is very different." },
                { type: "text", text: "The Amazon is dense and vertical. Much of its life is hidden within layers of forest, and encounters are often brief or indirect. Travel there tends to focus on immersion — being surrounded by vastness, humidity, and sound." },
                { type: "text", text: "The Pantanal is open and horizontal. Seasonal flooding spreads water across plains, creating long sightlines and clear edges between land and water. Wildlife is easier to observe not because it is tamer, but because the landscape offers fewer places to disappear." },
                { type: "text", text: "Neither is better. They simply ask for different kinds of attention." }
            ]
        },
        {
            id: "brazil-context",
            title: "If You’ve Never Been to Brazil",
            subtitle: "Travel Here Is Slower and More Deliberate",
            expandedBg: "bg-[#1c1917]/95",
            coverImage: "pantanal5",
            coverCaption: "Traces like this often say more about presence than any direct encounter.",
            content: [
                { type: "text", text: "Brazil is vast, varied, and often misrepresented as a single experience. Regions differ as much as countries do in Europe — in climate, culture, pace, and daily life." },
                { type: "text", text: "Travel here tends to be slower and more deliberate. Days are shaped by light, heat, and movement rather than tight schedules. The adjustment for many visitors isn’t about comfort or safety — it’s about learning to observe rather than to rush." }
            ]
        },
        {
            id: "caimans",
            title: "Ancient Survivors",
            subtitle: "Caimans: Quiet Engineers of the Ecosystem",
            expandedBg: "bg-[#1a2e05]/95",
            coverImage: "pantanal4",
            coverCaption: "Much of the Pantanal’s activity unfolds slowly.",
            content: [
                { type: "text", text: "Caimans are among the Pantanal’s most recognisable residents, descendants of lineages that have survived millions of years of environmental change. Perfectly adapted to wetland life, they are both predators and quiet engineers of the ecosystem." },
                { type: "text", text: "Their movement through shallow water creates channels used by fish, birds, and smaller animals. Often still and watchful, they reflect the rhythm of the Pantanal itself. Survival here depends less on speed than on balance." }
            ]
        },
        {
            id: "canopy",
            title: "Voices of the Canopy",
            subtitle: "Macaws and Toucans Are More Than Spectacle",
            expandedBg: "bg-[#3f6212]/95",
            coverImage: "pantanal2",
            coverCaption: "Sightings here feel incidental rather than orchestrated.",
            content: [
                { type: "text", text: "Macaws and toucans bring colour and sound to the Pantanal’s upper layers, but their role goes far beyond spectacle. Feeding on fruit across wide distances, they disperse seeds that help regenerate forests after floods or fires." },
                { type: "image", id: "pantanal3", caption: "Elevation offers perspective as much as safety." },
                { type: "text", text: "In a landscape where water and foliage blur visibility, sound becomes a way of mapping space. Calls carry presence, warning, and territory — reminders that not everything here is meant to be seen." }
            ]
        },
        {
            id: "seasons",
            title: "A Wetland of Extremes",
            subtitle: "Shifting Dramatically Between Dust and Flood",
            expandedBg: "bg-[#451a03]/95",
            coverImage: "pantanal6",
            coverCaption: "Evening arrives gently here, without urgency or spectacle.",
            content: [
                { type: "text", text: "The Pantanal shifts dramatically between seasons. During the dry months, animals gather around limited water sources, creating dense pockets of life where predator and prey exist side by side." },
                { type: "text", text: "When the rains return, competition eases. Water spreads outward, animals disperse, and the landscape resets. These cycles have repeated for centuries, shaping behaviour, movement, and even the timing of birth and growth." }
            ]
        },
        {
            id: "balance",
            title: "A Delicate Balance",
            subtitle: "Preserving the Natural Rhythms",
            expandedBg: "bg-[#0f172a]/95",
            coverImage: "pantanal7",
            coverCaption: "The Pantanal briefly holds still.",
            content: [
                { type: "text", text: "Despite its vastness, the Pantanal is fragile. Fires, deforestation, and changes to upstream rivers threaten the flooding cycles that sustain everything here. Because water connects the entire region, disruption in one area can ripple across hundreds of kilometres." },
                { type: "text", text: "Conservation in the Pantanal isn’t about freezing it in time. It’s about allowing its natural rhythms — rise, retreat, return — to continue uninterrupted." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#84935c",
        opacity: 1,
    };

    return (
        <div className="transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Pantanal | Nomad Scribbles"
                description="The Pantanal is one of the largest tropical wetlands on Earth, governed almost entirely by water and seasonal rhythms."
                keywords={["Pantanal", "Brazil Wetlands", "Wildlife", "Travel Brazil", "Nature Photography"]}
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
                        src={cloudinaryUrlFromLegacyPath("/images/Pantanal/full/PantanalW7.webp", { width: 2000 })}
                        alt="Pantanal Wetlands Landscape Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#84935c]/40 via-transparent to-[#84935c]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4 mt-[-15vh] md:mt-[-25vh]">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-black font-handwriting text-[#D4AF37] drop-shadow-2xl mb-4">
                            The Pantanal
                        </h1>
                        <p className="text-xl md:text-3xl font-bold tracking-[0.2em] uppercase text-stone-200 opacity-90">
                            Shaped by Water
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
                            markers={[pantanalCoords].filter(Boolean)}
                            zoomToId="pantanal"
                            title="Where is the Pantanal?"
                            geography={pantanalCoords?.geography}
                            transparent={true}
                        />
                    </div>

                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-8 flex flex-col items-center pb-24">
                {sections.map((section) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                    />
                ))}

                <div className="w-full flex flex-col items-center gap-6 mt-20 mb-12 relative z-20 px-4">
                    <Link to="/brazil" className="flex flex-row items-center justify-center bg-[#84935c]/60 border-2 border-stone-200 text-stone-200 backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#84935c]/70 hover:text-stone-100 transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
                        <span className="text-lg mr-2">←</span>
                        <span className="text-sm font-medium">Return To Brazil</span>
                    </Link>
                    <Link to="/brazil/foz" className="flex flex-row items-center justify-center bg-[#84935c]/60 border-2 border-stone-200 text-stone-200 backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#84935c]/70 hover:text-stone-100 transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
                        <span className="text-sm font-medium">Next: Foz do Iguaçu</span>
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
                    className={`rounded-sm shadow-sm transition-opacity duration-500 cursor-pointer w-full h-auto max-h-[85vh] object-contain ${showFullAsDriver ? "absolute inset-0 opacity-0" : "relative z-10 opacity-100"}`}
                />

                {!imgError && visuallyExpanded && (
                    <img
                        src={fullSrc}
                        alt={alt}
                        onClick={handleClick}
                        onLoad={() => setFullLoaded(true)}
                        onError={() => setImgError(true)}
                        className={`rounded-sm transition-all duration-700 cursor-pointer w-full h-auto max-h-[85vh] object-contain ${showFullAsDriver ? "relative z-20 opacity-100 scale-100" : "absolute inset-0 z-20 opacity-0 scale-95"}`}
                        loading="lazy"
                    />
                )}

                {/* Floating Metadata Card - Anchored and Constrained */}
                {(title || caption) && visuallyExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: fullLoaded ? 1 : 0, y: fullLoaded ? 0 : 10 }}
                        className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-[#1a2e05]/85 backdrop-blur-md p-6 md:p-8 border border-[#D4AF37]/30 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/80 z-30"
                    >
                        <div className="max-w-2xl px-2">
                            {title && (
                                <h4 className="text-[#c6ac8f] text-2xl md:text-3xl font-bold font-handwriting mb-3 tracking-wide drop-shadow-sm">
                                    {title}
                                </h4>
                            )}
                            {caption && (
                                <p className="text-[#ede0d4] text-lg leading-relaxed font-serif italic opacity-95">
                                    {caption}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Collapsed Label - Minimal Gallery style */}
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
            className={`w-full max-w-6xl bg-stone-900/50 backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Header / Cover State */}
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-stone-100" : "text-[#D4AF37]"}`}>
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <h3 className={`text-lg md:text-xl font-light tracking-wide mt-2 transition-colors duration-500 ${isExpanded ? "text-stone-300" : "text-stone-300"}`}>
                            {section.subtitle}
                        </h3>
                    )}
                </div>

                {/* Reused Reveal Animation for Cover */}
                <RevealImage
                    smallSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.image, { width: 1200 })}
                    fullSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.lightboxImage, { width: 2000 })}
                    alt={section.title}
                    caption={section.coverCaption}
                    title={getImage(section.coverImage)?.title}
                    onClick={() => handleImageClick(section.coverImage)}
                    expanded={isExpanded}
                    onToggle={() => setIsExpanded(!isExpanded)}
                />

                {/* Indication to expand */}
                <motion.div
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
                    className="flex flex-col items-center h-8"
                >
                    <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-semibold text-stone-400">Explore Section</p>
                    <div className="w-px h-4 bg-stone-400/30 mt-1"></div>
                </motion.div>
            </div>

            {/* Expanded Content */}
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
                                        caption={item.caption}
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
                                        return (
                                            <div key={id} className="flex flex-col items-center w-full">
                                                <RevealImage
                                                    smallSrc={cloudinaryUrlFromLegacyPath(img.image, { width: 1200 })}
                                                    fullSrc={cloudinaryUrlFromLegacyPath(img.lightboxImage, { width: 2000 })}
                                                    alt={id}
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
                                <blockquote key={idx} className="border-l-4 border-[#D4AF37] pl-6 italic my-6 text-xl opacity-90 max-w-xl md:text-left text-stone-300 mx-auto">
                                    {item.text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                                    {item.source && <span className="text-base not-italic block mt-2 font-bold text-stone-400">{item.source}</span>}
                                </blockquote>
                            );
                        }
                        if (item.type === "header") {
                            return <h3 key={idx} className="text-2xl md:text-3xl font-bold font-handwriting mt-4 text-center text-stone-100 max-w-2xl mx-auto">{item.text}</h3>;
                        }
                        if (item.type === "list") {
                            return (
                                <ul key={idx} className="list-disc pl-5 space-y-4 text-lg max-w-2xl text-left text-stone-300">
                                    {item.items.map((li, i) => <li key={i}>{li}</li>)}
                                </ul>
                            );
                        }
                        return null;
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Pantanal;
