import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

function Parks({ openLightbox }) {
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [expandedCardBg, setExpandedCardBg] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const heroRef = useRef(null);
  const parksImages = artImages.filter(img => img.category === "Parks");

  // Auto-collapse when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isHeroExpanded) {
          setIsHeroExpanded(false);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [isHeroExpanded]);

  // Define the visual order of images for Lightbox navigation
  const imageOrder = [
    "park1", "park2", "park3", "park4", "park5", "park6", "park7"
  ];

  const getImage = (id) => parksImages.find(i => i.id === id);

  // Derived list of images sorted by their appearance
  const sortedImages = imageOrder.map(id => getImage(id)).filter(Boolean);

  // Helper to open lightbox with correct index
  const handleImageClick = (imageId) => {
    const index = sortedImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      openLightbox(index, sortedImages);
    } else {
      const img = getImage(imageId);
      if (img) openLightbox(0, [img]);
    }
  };

  const sections = [
    {
      id: "park2",
      title: "Learning to Slow Down",
      expandedBg: "bg-[#dcfce7]",
      coverImage: "park2",
      coverCaption: "A caterpillar crosses stone warmed by the sun.",
      layout: "right", // Text Left | Image Right
      content: [
        { type: "text", text: "People don’t come to São Paulo’s parks looking for spectacle. They come to reset their attention. A caterpillar crossing warm stone, a leaf turning in the light, a child crouched low to watch something small. These moments matter because they interrupt urgency. The park allows time to stretch just enough to notice again." }
      ]
    },
    {
      id: "park1",
      title: "Ibirapuera, Held Open",
      expandedBg: "bg-[#dcfce7]",
      coverImage: "park1",
      coverCaption: "Families arrive early with food and folding chairs.",
      layout: "left", // Image Left | Text Right
      content: [
        { type: "text", text: "Ibirapuera is rarely quiet, but it offers a different tempo. Families arrive early with food and folding chairs. Runners trace familiar loops. Musicians test melodies beneath trees. For many Paulistanos, this park is not an escape from the city — it’s where the city exhales." }
      ]
    },
    {
      id: "park3",
      title: "Roots and Memory",
      expandedBg: "bg-[#dcfce7]",
      coverImage: "park3",
      coverCaption: "The land’s older rhythms remain visible.",
      layout: "right",
      content: [
        { type: "text", text: "Ibirapuera means “rotting tree” in Tupi, a reminder that this space was once wetland. What stands here now is carefully designed, but the land’s older rhythms remain visible — in waterlogged roots, dense canopy, and native growth. For residents, the park holds memory as much as greenery: a place shaped by history, reclaimed without being erased." }
      ]
    },
    {
      id: "park4",
      title: "Shared Territory",
      expandedBg: "bg-[#dcfce7]",
      coverImage: "park4",
      coverCaption: "In the canopy, a monkey pauses above the paths.",
      layout: "left",
      content: [
        { type: "text", text: "In the canopy, a monkey pauses above the paths. Below, walkers slow instinctively, phones lowered, conversations softened. Wildlife here isn’t staged — it’s negotiated. The park becomes shared ground, where human presence adjusts rather than dominates." }
      ]
    },
    {
      id: "park5",
      title: "What Grows When You Stop",
      expandedBg: "bg-[#dcfce7]",
      coverImage: "park5",
      coverCaption: "Tree stumps gather moss, fungi, insects.",
      layout: "right",
      content: [
        { type: "text", text: "Tree stumps gather moss, fungi, insects — entire systems built quietly in shade. They reward those willing to pause and look closely. In a city focused on scale and speed, these small ecosystems offer a different lesson: persistence without urgency." }
      ]
    },
    {
      id: "park6",
      title: "Change Without Noise",
      expandedBg: "bg-[#dcfce7]",
      coverImage: "park6",
      coverCaption: "Light shifts across decaying wood.",
      layout: "left",
      content: [
        { type: "text", text: "Light shifts across decaying wood. Growth replaces what has fallen. Nothing announces itself, yet everything evolves. For regular visitors, these changes become familiar markers — proof that time moves differently here." }
      ]
    },
    {
      id: "park7",
      title: "Designed to Be Lived In",
      expandedBg: "bg-[#dcfce7]",
      coverImage: "park7",
      coverCaption: "Paths sweep instead of cut. Water reflects instead of divides.",
      layout: "right",
      content: [
        { type: "text", text: "Landscape architect Burle Marx shaped Ibirapuera with curves that echo movement rather than control it. Paths sweep instead of cut. Water reflects instead of divides. The result is a park designed for use, not display — shaped into daily habit by the people who move through it." }
      ]
    }
  ];

  const pageBackgroundStyle = {
    backgroundColor: expandedCardBg || "#f5f5f4",
    opacity: 1,
    transition: "background-color 0.5s ease-in-out"
  };

  return (
    <div className="transition-colors duration-500" style={pageBackgroundStyle}>
      <SEO
        title="Parks of São Paulo — Green Sanctuaries | Nomad Scribbles"
        description="Discover São Paulo’s parks — from Ibirapuera’s stillness to the echoes of Burle Marx’s design."
        image={cloudinaryUrlFromLegacyPath("/images/SP-Parks/ParksBackground.webp", { width: 1200 })}
        slug="/parks"
      />

      <div className="relative w-full overflow-hidden">
        {/* Title Section */}
        <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#2e5c31] tracking-tight text-center drop-shadow-sm">Parks</h1>
        </div>

        {/* Magazine Style Hero Section */}
        <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">

          {/* Main Hero Image - Large & Cinematic */}
          <div
            className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-700 ease-in-out ${isHeroExpanded ? 'aspect-auto' : 'aspect-[16/10] md:aspect-[16/9]'}`}
            onClick={() => {
              if (!isHeroExpanded) setIsHeroExpanded(true);
              else handleImageClick("park1");
            }}
          >
            <img
              src={isHeroExpanded ? cloudinaryUrlFromLegacyPath("/images/SP-Parks/full/Park1.jpg", { width: 2000 }) : cloudinaryUrlFromLegacyPath("/images/SP-Parks/small/Park1new.webp", { width: 1200 })}
              alt="Ibirapuera Park Hero"
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${!isHeroExpanded ? 'transform scale-100 group-hover:scale-105' : ''}`}
            />
            {/* Overlay Gradient for contrast if needed, but keeping it clean for 'magazine' feel */}
          </div>

          {/* Overlapping Text Card - "Newspaper" Style */}
          <div className="relative md:absolute md:-bottom-12 md:left-12 lg:left-20 w-full md:max-w-xl bg-[#f5f5f4] p-8 md:p-10 shadow-xl rounded-lg border-t-4 border-[#2e5c31] mt-[-3rem] md:mt-0 z-20">
            {/* Decorative 'Issue' or 'Date' line */}
            <div className="flex items-center gap-3 mb-4 opacity-60">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#2e5c31]">Feature</span>
              <div className="h-[1px] w-12 bg-stone-400"></div>
              <span className="text-xs font-serif italic text-stone-500">São Paulo</span>
            </div>

            <p className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed">
              <span className="text-5xl float-left mr-3 mt-[-10px] font-bold text-[#2e5c31] font-handwriting">I</span>
              n a city defined by movement and density, São Paulo’s parks offer something essential rather than decorative. They are places to slow down, recover, gather, and breathe. For many residents, these green spaces aren’t destinations — they’re part of daily life, woven quietly into routine.
            </p>
          </div>
        </div>

        {/* Main Content with Interactive Sections */}
        <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24 mt-12">
          {sections.map((section) => (
            <StoryCard
              key={section.id}
              section={section}
              getImage={getImage}
              handleImageClick={handleImageClick}
              onExpand={(bgColor) => {
                setExpandedCardBg(bgColor);
                setExpandedCardId(section.id);
              }}
              onCollapse={() => {
                setExpandedCardBg(null);
                setExpandedCardId(null);
              }}
              isCurrentlyExpanded={expandedCardId === section.id}
            />
          ))}

          {/* Closing Note */}
          <div className="w-full max-w-3xl mx-auto mt-16 mb-8 text-center px-6">
            <p className="text-xl md:text-2xl font-serif text-stone-600 italic leading-relaxed">
              "For many Paulistanos, parks are not destinations marked on a map. They are places returned to quietly and repeatedly — spaces that absorb the city's pressure and give something steadier back."
            </p>
          </div>
        </main>

        {/* Navigation - Outside main container */}
        <div className="w-full flex flex-col items-center gap-6 mt-12 mb-12 relative z-20 px-4">
          <Link to="/brazil/saopaulo" className="flex flex-row items-center justify-center bg-[#2e5c31]/20 border-2 border-[#2e5c31] text-[#2e5c31] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#2e5c31]/30 hover:text-[#2e5c31] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
            <span className="text-lg mr-2">←</span>
            <span className="text-sm font-medium">Return To São Paulo</span>
          </Link>
          <Link to="/brazil/saopaulo/museums" className="flex flex-row items-center justify-center bg-[#2e5c31]/20 border-2 border-[#2e5c31] text-[#2e5c31] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#2e5c31]/30 hover:text-[#2e5c31] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
            <span className="text-sm font-medium">Next: Art Galleries</span>
            <span className="text-lg ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Interactive StoryCard Component (Zig-Zag Style)
function StoryCard({ section, getImage, handleImageClick, onExpand, onCollapse, isCurrentlyExpanded }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeBg = section.expandedBg || "bg-[#e8f5e9]";
  const isReverse = section.layout === "right";
  const coverImg = getImage(section.coverImage);

  // Handle expand/collapse with background change
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (newExpanded) {
      // Convert Tailwind class to actual color
      const bgColor = activeBg.replace('bg-[', '').replace(']', '');
      onExpand(bgColor);
    } else {
      onCollapse();
    }
  };

  // Handle external collapse when another card expands
  useEffect(() => {
    if (isCurrentlyExpanded === false && isExpanded) {
      setIsExpanded(false);
    }
  }, [isCurrentlyExpanded, isExpanded]);

  if (!coverImg) return null;

  return (
    <motion.div
      layout
      className={`w-full max-w-6xl border border-stone-200 rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-500 ${
        isExpanded 
          ? `shadow-2xl ${activeBg} border-transparent` 
          : "bg-[#f5f5f4] hover:shadow-md"
      }`}
      onClick={handleToggle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`p-6 md:p-10 flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-start md:items-center`}>

        {/* Image Side */}
        <div className="w-full md:w-1/2 flex justify-center sticky top-0">
          <RevealImage
            smallSrc={cloudinaryUrlFromLegacyPath(coverImg.image, { width: 1200 })}
            fullSrc={cloudinaryUrlFromLegacyPath(coverImg.blogimage, { width: 2000 })}
            alt={section.title}
            caption={section.coverCaption}
            expanded={isExpanded}
            onToggle={handleToggle}
            onClick={() => handleImageClick(section.coverImage)}
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left min-h-[150px]">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              // Expanded: Full Content
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-left w-full"
              >
                <h2 className="text-3xl md:text-5xl font-bold font-handwriting drop-shadow-sm text-[#2e5c31] mb-2 leading-tight">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-md md:text-lg font-light tracking-wide mb-4 text-stone-700">
                    {section.subtitle}
                  </h3>
                )}
                <div className="w-12 h-[2px] bg-[#2e5c31]/20 mb-6"></div>

                {/* Simple text content mapping for Parks */}
                <div className="space-y-6">
                  {section.content.map((item, idx) => {
                    if (item.type === "text") {
                      return <p key={idx} className="text-lg leading-relaxed text-stone-800 font-medium">{item.text}</p>;
                    }
                    return null;
                  })}
                </div>

              </motion.div>
            ) : (
              // Collapsed: Gallery Label Only
              <motion.div
                key="collapsed-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col ${isReverse ? "items-start md:items-end md:text-right" : "items-start md:text-left"} w-full`}
              >
                {/* Museum Label Style */}
                <div className="max-w-[280px] p-4 bg-white/60 backdrop-blur-md border-l-2 border-[#2e5c31]/50 shadow-sm group">
                  <h4 className="text-[#2e5c31] text-sm font-bold uppercase tracking-widest mb-1 font-cormorant leading-tight">
                    {section.title}
                  </h4>
                  <p className="text-stone-500 text-[11px] italic font-serif leading-tight">
                    São Paulo Parks
                  </p>

                  {/* Interactive Arrow Cue */}
                  <div className="mt-4 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                    <span className="text-[10px] uppercase tracking-widest text-[#2e5c31] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
                    <div className="w-6 h-6 rounded-full border border-[#2e5c31]/30 flex items-center justify-center group-hover:bg-[#2e5c31] group-hover:border-[#2e5c31] transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2e5c31] group-hover:text-white transition-colors duration-300">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}


// Shared RevealImage Component (Same as Carnival/Murals)
function RevealImage({ smallSrc, fullSrc, alt, onClick, caption, expanded, onToggle, autoCollapse, title }) {
  const isControlled = expanded !== undefined;
  const initialExpanded = isControlled ? expanded : false;
  const [visuallyExpanded, setVisuallyExpanded] = useState(initialExpanded);
  const [imgError, setImgError] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isControlled) setVisuallyExpanded(expanded);
  }, [expanded, isControlled]);

  const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;

  useEffect(() => {
    if (!shouldAutoCollapse || !visuallyExpanded) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVisuallyExpanded(false);
          if (isControlled && onToggle && expanded) {
            onToggle();
          }
        }
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldAutoCollapse, visuallyExpanded, isControlled, onToggle, expanded]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (visuallyExpanded) {
      if (onClick) onClick(e);
    } else {
      if (isControlled && onToggle) {
        onToggle();
      } else {
        setVisuallyExpanded(true);
      }
    }
  };

  const showFullAsDriver = visuallyExpanded && fullLoaded && !imgError;

  return (
    <div
      ref={containerRef}
      className={`relative max-w-5xl mx-auto transition-all duration-700 ease-in-out my-4 ${visuallyExpanded ? "w-full" : "w-[80%] md:w-[80%]"}`}
      onClick={handleClick}
    >
      <div className="relative w-full rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow cursor-pointer">
        <img
          src={smallSrc}
          alt={alt}
          className={`transition-all duration-500 
              ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"}
              ${!visuallyExpanded ? "scale-95 group-hover:scale-100 transition-transform duration-500" : "scale-100"}
          `}
        />

        {!imgError && (
          <img
            src={fullSrc}
            alt={alt}
            onLoad={() => setFullLoaded(true)}
            onError={() => setImgError(true)}
            className={`transition-all duration-700 ease-out 
                ${showFullAsDriver ? "relative w-full h-auto z-20 opacity-100 scale-100" : "absolute inset-0 w-full h-full object-cover z-20 opacity-0 scale-95"}
            `}
            loading="lazy"
          />
        )}
      </div>

      {/* Optional Caption inside Image */}
      {(title || caption) && visuallyExpanded && (
        <div className="mt-4 text-center px-4">
          {title && <p className="text-xs font-bold uppercase tracking-widest text-[#2e5c31]">{title}</p>}
          {caption && <p className="text-sm italic text-stone-600 mt-1">{caption}</p>}
        </div>
      )}
    </div>
  );
}

export default Parks;
