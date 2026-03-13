import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import artImages from "../assets/artImages.json";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';

function Manaus({ openLightbox }) {
    const manausCoords = destinations.find(d => d.id === "manaus");
    const manausImages = artImages.filter(img => img.category === "Manaus");

    const spreadBackgroundStyle = {
        backgroundImage: `url(${paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "url(#torn-paper-filter)",
        opacity: 0.95,
    };

    // Define the visual order of images for Lightbox navigation
    const imageOrder = Array.from({ length: 22 }, (_, i) => `manaus${i + 1}`);

    const sortedImages = imageOrder.map(id => manausImages.find(img => img.id === id)).filter(Boolean);

    const handleImageClick = (imageId) => {
        const index = sortedImages.findIndex(img => img.id === imageId);
        if (index !== -1) {
            openLightbox(index, sortedImages);
        }
    };

    const getImage = (id) => manausImages.find(i => i.id === id);

    // Section definitions based on streamlined structure
    const sections = [
        {
            id: "access-proximity-opportunity",
            title: "Access, Proximity, Opportunity",
            expandedBg: "bg-[#9c6644]/60",
            coverImage: "manaus3",
            content: [
                { type: "grid", ids: ["manaus10", "manaus7", "manaus1"], caption: "Daily life is shaped by the market and the forest." }
            ]
        },
        {
            id: "city-scale-pressure",
            title: "City, Scale, Pressure",
            expandedBg: "bg-[#8b5a3c]/60",
            coverImage: "manaus6",
            content: [
                { type: "text", text: "Manaus grows outward as well as upward. Streets stretch, neighbourhoods densify, and infrastructure follows the river’s edge deeper into the forest. For many residents, this growth brings work, stability, and connection to the wider country. But expansion here is never neutral. Every new road, warehouse, or housing block sits in direct conversation with what it replaces. The city’s scale is felt not through skylines, but through the quiet accumulation of pressure on the land around it." },
                { type: "grid", ids: ["manaus8", "manaus4"], caption: "Lived-in walls and surfacing dreams." }
            ]
        },
        {
            id: "the-forest-itself",
            title: "The Forest Itself",
            expandedBg: "bg-[#6d4731]/60",
            coverImage: "manaus12",
            content: [
                { type: "text", text: "That is what makes Manaus so uneasy and so important. The benefits and the risks exist side by side, often for the same people, often through the same systems. Tourism can help keep land standing while increasing demand for access. Industry provides work while expanding the city’s footprint. Choices are rarely clean, and rarely made from a place of certainty." },
                { type: "grid", ids: ["manaus15", "manaus18"], caption: "Scale and encounter in the green." }
            ]
        },
        {
            id: "quiet-consequences",
            title: "Quiet Consequences",
            expandedBg: "bg-[#9c6644]/60",
            coverImage: "manaus19",
            content: [
                { type: "image", id: "manaus22", caption: "Life revealing itself quietly." }
            ]
        }
    ];

    const pageBackgroundStyle = {
        backgroundColor: "#fffbeb",
        opacity: 1,
    };

    return (
        <div className="transition-colors duration-500" style={pageBackgroundStyle}>
            <SEO
                title="Manaus | Nomad Scribbles"
                description="Deep in the heart of the Amazon, Manaus is a city shaped by its riverside urbanism and the vast forest that surrounds it."
                keywords={["Manaus", "Amazon Rainforest", "Teatro Amazonas", "Travel Brazil", "Nature Photography"]}
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
                        src={`${process.env.PUBLIC_URL}/images/Manaus/Manaus13.jpg`}
                        alt="Manaus Rainforest Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#9c6644]/40 via-transparent to-[#fffbeb]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-bold font-handwriting text-[#9c6644] drop-shadow-2xl mb-4">
                            Manaus
                        </h1>
                        <p className="text-xl md:text-3xl font-bold tracking-[0.2em] uppercase text-stone-100 opacity-90">
                            Gateway to the Amazon
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
                            markers={[manausCoords].filter(Boolean)}
                            zoomToId="manaus"
                            title="Where is Manaus?"
                            geography={manausCoords?.geography}
                            transparent={true}
                        />
                    </div>

                </div>
            </div>

            <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
                {/* Introduction Prose */}
                <article className="max-w-3xl mx-auto text-amber-950 space-y-6 px-4 mb-12">
                    <h2 className="text-2xl md:text-3xl font-handwriting text-[#9c6644]">Manaus is both an extraordinary place and a difficult one.</h2>
                    <p className="text-lg leading-relaxed">
                        It is a city of more than two million people, located thousands of kilometres from Brazil’s coast and accessible mainly by river and air. It is one of the largest urban centres on Earth embedded so deeply within tropical rainforest. Here, the Amazon isn’t a distant idea, but a daily presence. Rivers, trees, animals, and people intersect in ways that feel unusually close and unusually exposed.
                    </p>
                    <p className="text-lg leading-relaxed">
                        That closeness creates opportunity. Wildlife remains visible even at the city’s edges. Forest products shape everyday life, from food and medicine to craft and trade. Tourism brings income and connection, particularly for Indigenous communities who use the city as a base while maintaining strong ties to the forest. Manaus makes the Amazon accessible — not as a myth or a backdrop, but as something lived with and worked through.
                    </p>
                </article>

                {/* Section 1 */}
                <StoryCard
                    section={sections[0]}
                    getImage={getImage}
                    handleImageClick={handleImageClick}
                />

                {/* Transition 1 */}
                <article className="max-w-3xl mx-auto text-amber-950 space-y-6 px-4 py-12 border-y border-white/5">
                    <h2 className="text-2xl md:text-3xl font-handwriting text-[#9c6644]">But access brings pressure too.</h2>
                    <p className="text-lg leading-relaxed">
                        Manaus is also an industrial hub, home to one of Brazil’s largest free trade zones. Factories, ports, and supply chains support hundreds of thousands of jobs, drawing people inward from across the region. Economic growth offers stability for many, but it also pulls constantly at the forest that sustains the city. Land becomes something to sell. Trees become resources. Farming, logging, and development arrive not as abstract threats, but as practical responses to immediate needs.
                    </p>
                    <p className="text-xl font-bold text-center italic text-[#9c6644]">
                        None of this happens at a distance.<br />
                        The forest is right there.
                    </p>
                </article>

                {/* Section 2 */}
                <StoryCard
                    section={sections[1]}
                    getImage={getImage}
                    handleImageClick={handleImageClick}
                />

                {/* Section 3 */}
                <StoryCard
                    section={sections[2]}
                    getImage={getImage}
                    handleImageClick={handleImageClick}
                />

                {/* Closing Prose */}
                <article className="max-w-3xl mx-auto text-amber-950 space-y-6 px-4 py-12">
                    <h2 className="text-2xl md:text-3xl font-handwriting text-[#9c6644]">Manaus doesn’t give you a neat ending.</h2>
                    <p className="text-lg leading-relaxed">
                        It is a place where the Amazon is still present and powerful, shaping daily life rather than sitting safely beyond reach. People work with the forest, learn from it, and rely on it in ways that are practical and immediate. For many, the city offers a way to stay close to the land while still engaging with the wider world.
                    </p>
                    <p className="text-lg leading-relaxed">
                        At the same time, Manaus shows how fragile that balance is. Growth brings real benefits, but it also brings tension, and not every decision protects what surrounds the city. This isn’t a story of simple loss or easy solutions. It’s a story of people negotiating their future in real time.
                    </p>
                    <p className="text-lg leading-relaxed">
                        To leave Manaus is to leave with that complexity intact. Not a warning, and not a celebration either — just an understanding that the Amazon’s future is being shaped in places like this, by ordinary decisions made every day.
                    </p>
                </article>

                {/* Section 4 */}
                <StoryCard
                    section={sections[3]}
                    getImage={getImage}
                    handleImageClick={handleImageClick}
                />

                {/* Final Visual Exhale */}
                <div className="w-full max-w-6xl mx-auto px-4 mt-16 group">
                    <h3 className="text-xl font-handwriting text-[#9c6644] mb-6 text-center">Shifting light over the canopy</h3>
                    <RevealImage
                        smallSrc={process.env.PUBLIC_URL + "/images/Manaus/Small/Manaus14.webp"}
                        fullSrc={process.env.PUBLIC_URL + "/images/Manaus/Full/Manaus14.webp"}
                        alt="Shifting light over the canopy"
                        title={getImage("manaus14")?.title}
                        caption={getImage("manaus14")?.description}
                        onClick={() => handleImageClick("manaus14")}
                    />
                </div>

                <div className="w-full flex flex-col items-center gap-6 mt-20 mb-12 relative z-10">
                    <Link to="/brazil" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/60 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/80 w-fit min-w-[240px]">
                        <span className="text-xl mr-3 pb-1">←</span>
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Brazil</span>
                    </Link>
                    <Link to="/brazil/ilha-grande" className="flex flex-row items-center justify-center text-[#eeda8d] hover:text-white transition-colors drop-shadow-sm bg-[#ceb752]/20 backdrop-blur-md rounded-full px-8 py-3 border border-[#ceb752]/40 shadow-md hover:bg-[#ceb752]/30 w-fit min-w-[240px]">
                        <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Next: Ilha Grande</span>
                        <span className="text-xl ml-3 pb-1">→</span>
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
                            className="absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl bg-[#25180f]/80 backdrop-blur-md p-6 md:p-8 border border-[#9c6644]/40 text-left pointer-events-none rounded-xl shadow-2xl shadow-black/50"
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
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function StoryCard({ section, getImage, handleImageClick }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedGridId, setExpandedGridId] = useState(null);
    const activeBg = section.expandedBg || "bg-[#9c6644]/60";

    return (
        <motion.div
            layout
            className={`w-full transition-all duration-500 rounded-xl overflow-hidden shadow-lg cursor-pointer ${isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : "bg-[#b08968]/30 backdrop-blur-md max-w-6xl"}`}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? "text-[#ede0d4]" : "text-[#9c6644]"}`}>
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <h3 className={`text-lg md:text-xl font-light tracking-wide mt-2 transition-colors duration-500 ${isExpanded ? "text-[#ede0d4]" : "text-[#ede0d4]"}`}>
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
                    <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-semibold text-[#b08968]">Explore Section</p>
                    <div className="w-px h-4 bg-[#b08968]/30 mt-1"></div>
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
                            return <p key={idx} className="text-xl leading-relaxed max-w-3xl text-center md:text-left text-[#ede0d4] font-medium mx-auto">{item.text}</p>;
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
                                                    smallSrc={`${process.env.PUBLIC_URL}${img.image}`}
                                                    fullSrc={`${process.env.PUBLIC_URL}${img.lightboxImage}`}
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
                        if (item.type === "quote") {
                            return (
                                <blockquote key={idx} className="border-l-4 border-[#9c6644] pl-6 italic my-6 text-xl opacity-90 max-w-xl md:text-left text-[#3c2a21] mx-auto">
                                    {item.text.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                                    {item.source && <span className="text-base not-italic block mt-2 font-bold text-[#b08968]">{item.source}</span>}
                                </blockquote>
                            );
                        }
                        if (item.type === "header") {
                            return <h3 key={idx} className="text-2xl md:text-3xl font-bold font-handwriting mt-4 text-center text-[#ede0d4] max-w-2xl mx-auto">{item.text}</h3>;
                        }
                        return null;
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Manaus;
