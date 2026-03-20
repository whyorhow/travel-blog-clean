import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Antwerp({ openLightbox }) {
    const [expandedGridId, setExpandedGridId] = useState(null);

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = [
        "zGrote Markt", "zBrabo Statue", "zCathedral of Our Lady", "zHistoric Brick Buildings", "zCobblestone Street",
        "zHet Steen Castle", "zMedieval Tower", "zHistoric Stone Bridge", "zBustling Quay",
        "zChocolate Shop", "zConfectionery Shop", "zOutdoor Market", "zFlower Market",
        "zCentraal Railway Station", "zRustic Restaurant", "zSeafood Restaurant",
        "zLange Wapper Statue", "zStreet Mural", "zEvening Glow", "zZaha Hadid Port House"
    ];

    const handleImageClick = (imageId) => {
        if (openLightbox) {
            const index = imageOrder.indexOf(imageId);
            if (index !== -1) {
                openLightbox(index, imageOrder.map(id => getImage(id)));
            }
        }
    };

    const getImage = (id) => ({
        id: id,
        image: `/images/Belgium/Antwerp/Small/${id}.webp`,
        lightboxImage: `/images/Belgium/Antwerp/Full/${id.replace('z', '')}.webp`,
        expandedImage: `/images/Belgium/Antwerp/Small/${id.replace('z', '')}.webp`,
        title: id.replace('z', '').replace(/([A-Z])/g, ' $1').trim(),
        description: `Antwerp ${id.replace('z', '').replace(/([A-Z])/g, ' $1').trim()}`
    });

    const sections = [
        {
            id: "first-impressions",
            title: "First Impressions",
            expandedBg: "bg-[#FF0000]/40",
            coverImage: "zGrote Markt",
            content: [
                { type: "text", text: "It doesn't take long before something pulls your eye upward. A Gothic tower climbs into the sky, its details almost impossibly delicate at that height. The golden clock catches the light in quiet flashes, watching over everything below. Antwerp begins here, whether you realise it or not.\n\nAt the heart of it all, the square feels almost theatrical. Guildhalls line the edges, each façade rich with detail, telling quiet stories of trade and craft. A cyclist crosses the cobblestones without hesitation — everyday life moving through something extraordinary." },
                { type: "image", id: "zBrabo Statue", caption: "Brabo stands as both sculpture and story, framed by intricate architecture and open sky." },
                { type: "text", text: "In the centre, a figure is caught mid-motion. Brabo stands as both sculpture and story, framed by intricate architecture and open sky. Antwerp has a way of turning even a quick glance upward into something dramatic.\n\nLook up and the skyline shifts into pattern and form. Stepped gables, spires, and rows of windows build a sense of rhythm across the rooftops. Nothing feels accidental here." },
                { type: "image", id: "zCathedral of Our Lady", caption: "The Cathedral of Our Lady towers above the city, its Gothic spire a testament to centuries of faith and craftsmanship." },
                { type: "grid", ids: ["zHistoric Brick Buildings", "zCobblestone Street"], caption: "Stepped gables and narrow streets where the city reveals itself gradually." },
                { type: "text", text: "Away from the square, the city softens. Streets narrow slightly, shops feel more personal, and the pace slows. Antwerp reveals itself gradually — one turn at a time." }
            ]
        },
        {
            id: "layers-of-the-past",
            title: "Layers of the Past",
            expandedBg: "bg-[#FF0000]/40",
            coverImage: "zHet Steen Castle",
            content: [
                { type: "text", text: "By the river, the past sits closer to the surface. Het Steen feels compact but grounded, its stone walls holding centuries of history. Framed through a modern sculpture, the view becomes layered — old and new, stillness and movement.\n\nFurther in, quieter structures begin to appear. A stone tower rises from an older part of the city, marked with crests and subtle ornament. Less grand, but deeply rooted." },
                { type: "image", id: "zMedieval Tower", caption: "A stone tower rises from an older part of the city, marked with crests and subtle ornament." },
                { type: "text", text: "From the bridge, the city connects in every direction. Below, streets move with quiet energy, while the cathedral rises once more in the distance, anchoring the skyline." },
                { type: "grid", ids: ["zHistoric Stone Bridge", "zBustling Quay"], caption: "Connections across water and time — bridges and bustling quays." },
                { type: "text", text: "Down by the Scheldt, Antwerp opens up. Water buses move steadily across the river while people drift along the edge. In the distance, wind turbines turn slowly — a reminder that this is still a working port, not just a historic backdrop." }
            ]
        },
        {
            id: "taste-and-texture",
            title: "Taste & Texture",
            expandedBg: "bg-[#FF0000]/40",
            coverImage: "zChocolate Shop",
            content: [
                { type: "text", text: "Step inside and the focus shifts to detail. Glass counters are filled with pralines, each one carefully crafted. There's a quiet rhythm behind the counter — selection, wrapping, conversation.\n\nAnother display, just as precise. Rows of chocolates sit in perfect formation, colours shifting subtly from tray to tray. It feels closer to art than food." },
                { type: "image", id: "zConfectionery Shop", caption: "Rows of chocolates sit in perfect formation, colours shifting subtly from tray to tray." },
                { type: "text", text: "Back outside, things become more lively. Cheese stalls glow in warm tones, stacked high and full of character. Conversations overlap, people browse — it's busy in the best way.\n\nA burst of colour cuts through the streets. Proteas and tulips spill across the stall in bold combinations, slightly imperfect and full of life." },
                { type: "grid", ids: ["zOutdoor Market", "zFlower Market"], caption: "Market stalls glowing with warm tones and bold floral combinations." },
                { type: "text", text: "Then the scale shifts again. Light pours through a vast arched window onto sweeping staircases and polished stone. It feels less like a station, more like a pause in the journey." },
                { type: "image", id: "zCentraal Railway Station", caption: "Light pours through vast arched windows onto sweeping staircases and polished stone." },
                { type: "text", text: "Later, the pace softens. Brick walls, stained glass, and warm light create something intimate. Time stretches here.\n\nNot far away, the energy builds again. An open kitchen moves with precision — chefs plating, flames rising briefly. It's part craft, part performance." },
                { type: "grid", ids: ["zRustic Restaurant", "zSeafood Restaurant"], caption: "Intimate dining spaces and the precision of open kitchens." }
            ]
        },
        {
            id: "contrast-and-character",
            title: "Contrast & Character",
            expandedBg: "bg-[#FF0000]/40",
            coverImage: "zLange Wapper Statue",
            content: [
                { type: "text", text: "A different kind of presence stands tall. Playful and slightly surreal, the Lange Wapper towers above smaller figures below. Antwerp keeps its folklore alive alongside its history.\n\nTurn a corner and everything changes. A wall bursts into colour — chaotic, modern, unapologetic. The city isn't frozen in time, it keeps evolving." },
                { type: "image", id: "zStreet Mural", caption: "A wall bursts into colour — chaotic, modern, unapologetic." },
                { type: "text", text: "As the day fades, Antwerp softens. Rain catches the light from street lamps and windows, stretching reflections across the ground. The city feels quieter, but more alive." },
                { type: "image", id: "zEvening Glow", caption: "Rain catches the light from street lamps and windows, stretching reflections across the ground." },
                { type: "text", text: "And finally, the contrast becomes clear. Glass and steel cut across the skyline above historic streets. The old city doesn't disappear — it adapts. Antwerp moves forward without letting go of what came before." },
                { type: "image", id: "zZaha Hadid Port House", caption: "Glass and steel cut across the skyline above historic streets." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d, #1f1f1f)",
        opacity: 1,
    };

    return (
        <div className="transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Antwerp: Layers of History & Craft | Nomad Scribbles"
                description="Explore Antwerp's Gothic cathedral, historic guildhalls, medieval castle, and modern architecture. A city where history meets contemporary life in perfect balance."
                keywords="Antwerp travel guide, Belgium, Gothic architecture, medieval history, chocolate, diamond district, Zaha Hadid"
                image="/images/Adventures/BelgiumFlag.webp"
                slug="/belgium/antwerp"
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
                        src={cloudinaryUrlFromLegacyPath("/images/Belgium/Antwerp/Small/Antwerp Cathedral2.webp", { width: 2000 })}
                        alt="Antwerp Cathedral"
                        className="w-full h-full object-cover object-center"
                        style={{ objectPosition: 'center 35%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4 mt-[-15vh] md:mt-[-35vh]">
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <h1 className="text-7xl md:text-9xl font-bold font-handwriting text-white drop-shadow-2xl mb-4">
                                Antwerp
                            </h1>
                            <p className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white opacity-95 max-w-2xl mx-auto leading-relaxed">
                                Layers of history, craft, and quiet contrast
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
                {sections.map((section, idx) => (
                    <StoryCard
                        key={section.id}
                        section={section}
                        getImage={getImage}
                        handleImageClick={handleImageClick}
                        expandedGridId={expandedGridId}
                        setExpandedGridId={setExpandedGridId}
                    />
                ))}

                <div className="w-full flex flex-col items-center gap-6 mt-16 mb-12 relative z-10">
                    <Link to="/belgium" className="flex flex-row items-center justify-center bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition duration-300 text-sm font-medium uppercase tracking-wide">
                        <span className="text-lg mr-2">←</span>
                        <span className="text-sm font-medium">Return To Belgium</span>
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
                            className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-black/80 backdrop-blur-md p-6 md:p-8 border border-[#FFD700]/30 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/50"
                        >
                            <div className="max-w-2xl px-2">
                                {title && (
                                    <h4 className="text-[#FFD700] text-2xl md:text-3xl font-bold font-handwriting mb-3 tracking-wide drop-shadow-sm">
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

function StoryCard({ section, getImage, handleImageClick, expandedGridId, setExpandedGridId }) {
    const activeBg = section.expandedBg || "bg-[#fbbf24]/60";
    const isExpanded = expandedGridId === section.id;

    const handleClick = () => {
        if (isExpanded) {
            setExpandedGridId(null);
        } else {
            setExpandedGridId(section.id);
        }
    };

    return (
        <motion.div
            layout
            className={`w-full transition-all duration-500 rounded-xl overflow-hidden shadow-lg cursor-pointer ${isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : "bg-black/60 backdrop-blur-md max-w-6xl"}`}
            onClick={handleClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-white" : "text-[#FFD700]"}`}>
                        {section.title}
                    </h2>
                </div>

                <RevealImage
                    smallSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.image, { width: 1200 })}
                    fullSrc={cloudinaryUrlFromLegacyPath(getImage(section.coverImage)?.expandedImage, { width: 2000 })}
                    alt={section.title}
                    caption={getImage(section.coverImage)?.description}
                    title={getImage(section.coverImage)?.title}
                    onClick={() => handleImageClick(section.coverImage)}
                    expanded={isExpanded}
                    onToggle={isExpanded ? null : handleClick}
                />

                <motion.div
                    initial={{ opacity: 1, height: "auto" }}
                    animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
                    className="flex flex-col items-center h-8"
                >
                    <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-semibold text-[#FFD700]">Explore Section</p>
                    <div className="w-px h-4 bg-[#FF0000] mt-1"></div>
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
                                        fullSrc={cloudinaryUrlFromLegacyPath(img.expandedImage, { width: 2000 })}
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
                                                    fullSrc={cloudinaryUrlFromLegacyPath(img.expandedImage, { width: 2000 })}
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

export default Antwerp;
