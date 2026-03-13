import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";

// Gallery Data
const santosSections = [
  {
    id: "santos_row1",
    title: "Facing the Atlantic",
    subtitle: "RELEASE FROM THE CITY",
    text: "Santos opens toward the sea. The skyline stays low, shaped by wind and salt rather than ambition. Clouds gather and break quickly, changing the light without ceremony. For many Paulistanos, this coastline isn’t a destination — it’s where the city’s pressure loosens. You come here to breathe differently.",
    imageSmall: "/images/Santos/small/Santos1z.webp",
    imageFull: "/images/Santos/full/Santos1.jpg",
    expandedBg: "bg-[#bbf7d0]", // Darker Green (200)
    layout: "left",
    location: "Beachfront",
  },
  {
    id: "santos_row2",
    title: "Between Hills and Water",
    subtitle: "ROOM FOR PAUSE",
    text: "Beyond the beachfront, roads climb gently into green hills. Houses turn toward breeze rather than view. These quieter edges reveal a city that expands carefully, leaving room for shade, distance, and repetition. Santos doesn’t push outward. It settles.",
    imageSmall: "/images/Santos/small/Santos4z.webp",
    imageFull: "/images/Santos/full/Santos4.jpg",
    expandedBg: "bg-[#bbf7d0]", // Darker Green (200)
    layout: "right",
    location: "Hillside",
  },
  {
    id: "santos_row3",
    title: "Where Time Softens Things",
    subtitle: "UNHURRIED",
    text: "Older buildings sit half-reclaimed by trees and vines. Paint fades. Brick opens. Roots press patiently through stone. Nothing feels abandoned — only unhurried. Santos carries its age openly, allowing nature to return where pressure has eased. These corners aren’t preserved; they’re lived with.",
    imageSmall: "/images/Santos/small/Santos5z.webp",
    imageFull: "/images/Santos/full/Santos5.jpg",
    expandedBg: "bg-[#bbf7d0]", // Darker Green (200)
    layout: "left",
    location: "Historic Centre",
  },
  {
    id: "santos_row4",
    title: "Football as Inheritance",
    subtitle: "ASSUMED HISTORY",
    text: "Pelé’s presence in Santos isn’t monumental — it’s assumed. His museum stands quietly, murals appear without announcement, and the stories are told casually, as if everyone already knows them. Football here isn’t staged for visitors. It’s folded into daily life, carried forward as memory rather than performance. The city doesn’t point to its history; it lives beside it.",
    imageSmall: "/images/Santos/small/Santos2z.webp",
    imageFull: "/images/Santos/full/Santos2.jpg",
    expandedBg: "bg-[#bbf7d0]", // Darker Green (200)
    layout: "right",
    location: "Pelé Museum",
  },
  {
    id: "santos_row5",
    title: "Vila Belmiro, Still in Use",
    subtitle: "CONTINUITY",
    text: "Vila Belmiro doesn’t preserve history behind glass. Matches continue. Seats fill and empty. Pelé’s 1,000th goal lives in conversation rather than ceremony. The stadium remains active, and that continuity matters more than commemoration. In Santos, the past doesn’t interrupt the present — it moves alongside it.",
    imageSmall: "/images/Santos/small/Santos3z.webp",
    imageFull: "/images/Santos/full/Santos3.jpg",
    expandedBg: "bg-[#bbf7d0]", // Darker Green (200)
    layout: "left",
    location: "Vila Belmiro",
  },
];

export default function Santos({ openLightbox }) {
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const heroRef = useRef(null);

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

  // Construct image list for Lightbox (Hero + Cards)
  const allImages = useMemo(() => {
    const list = [{
      id: "santos_hero",
      lightboxImage: `${process.env.PUBLIC_URL}/images/Santos/full/Santos5Drawn.jpg`,
      title: "Santos Sketch",
    }];
    santosSections.forEach(s => {
      list.push({
        id: s.id,
        lightboxImage: `${process.env.PUBLIC_URL}${s.imageFull}`,
        title: s.title
      });
    });
    return list;
  }, []);

  const handleImageClick = (id) => {
    const index = allImages.findIndex(img => img.id === id);
    if (index !== -1 && openLightbox) {
      openLightbox(index, allImages);
    }
  };

  return (
    <div className="bg-[#f5f5f4] min-h-screen pb-16 transition-colors duration-500 pt-20 md:pt-0">
      <SEO
        title="Santos — Port City of Legends | Nomad Scribbles"
        description="Santos isn’t a city people discover by accident. It offers air, space, and a slower rhythm, without ever trying to impress."
        image="/images/Santos/small/Santos5Drawnnew.webp"
        slug="/brazil/saopaulo/santos"
      />

      <div className="relative w-full overflow-hidden">
        {/* Title Section */}
        <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Santos</h1>
        </div>

        {/* Magazine Style Hero Section - Interactive & Overlapping */}
        <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">

          {/* Main Hero Image - Expandable */}
          <div
            className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-700 ease-in-out ${isHeroExpanded ? 'aspect-auto' : 'aspect-[16/10] md:aspect-[21/9]'}`}
            onClick={() => {
              if (!isHeroExpanded) setIsHeroExpanded(true);
              else handleImageClick("santos_hero");
            }}
          >
            <img
              src={isHeroExpanded ? process.env.PUBLIC_URL + "/images/Santos/full/Santos5Drawn.jpg" : process.env.PUBLIC_URL + "/images/Santos/small/Santos5Drawnnew.webp"}
              alt="Santos Sketch Hero"
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${!isHeroExpanded ? 'transform scale-100 group-hover:scale-105' : ''}`}
            />
          </div>

          {/* Overlapping Text Card - "Newspaper" Style */}
          <div className="relative md:absolute md:-bottom-12 md:left-12 lg:left-20 w-full md:max-w-xl bg-[#f5f5f4] p-8 md:p-10 shadow-xl rounded-lg border-t-4 border-[#e9d5ff] mt-[-3rem] md:mt-0 z-20">
            {/* Decorative Feature line */}
            <div className="flex items-center gap-3 mb-4 opacity-60">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b21a8]">Feature</span>
              <div className="h-[1px] w-12 bg-stone-400"></div>
              <span className="text-xs font-serif italic text-stone-500">São Paulo Coast</span>
            </div>

            <div className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed">
              <span className="text-5xl float-left mr-3 mt-[-10px] font-bold text-[#6b21a8] font-handwriting">S</span>
              <p className="inline">
                antos is a place people return to rather than discover. Its presence lingers quietly — in softened buildings, familiar streets, and the steady pull of the sea nearby. For many who live close, Santos isn’t a destination. It’s a pause, a habit, a remembered rhythm that doesn’t need explanation.
              </p>
            </div>
          </div>
        </div>


        {/* 2. Expanding Cards Sequence */}
        <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
          {santosSections.map((section) => (
            <StoryCard
              key={section.id}
              section={section}
              onImageClick={() => handleImageClick(section.id)}
            />
          ))}

          {/* Closing Note */}
          <div className="max-w-2xl mx-auto text-center mt-16 px-6">
            <p className="text-lg md:text-xl font-serif text-stone-700 italic leading-relaxed opacity-90">
              “Santos doesn’t compete for attention. It waits. For those who return — again and again — that familiarity is the point.”
            </p>
          </div>

        </main>

        <div className="w-full flex flex-col items-center gap-6 mt-12 mb-12 relative z-10">
          <Link
            to="/brazil/saopaulo"
            className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]"
          >
            <span className="text-xl mr-3 pb-1">←</span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">
              Return to São Paulo
            </span>
          </Link>
          <Link
            to="/brazil/florianopolis"
            className="flex flex-row items-center justify-center text-[#ceb752] hover:text-[#e8eac7] transition-colors drop-shadow-sm bg-[#ceb752]/20 backdrop-blur-md rounded-full px-8 py-3 border border-[#ceb752]/50 shadow-md hover:bg-[#ceb752]/30 w-fit min-w-[240px]"
          >
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">
              Next: Florianópolis
            </span>
            <span className="text-xl ml-3 pb-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


// StoryCard Component 
function StoryCard({ section, onImageClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeBg = section.expandedBg || "bg-[#E6EFF5]";
  const isReverse = section.layout === "right";

  return (
    <motion.div
      layout
      className={`w-full max-w-6xl bg-[#f5f5f4] border border-stone-200 rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-500 ${isExpanded ? `shadow-2xl ${activeBg} border-transparent` : "hover:shadow-md"}`}
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`p-6 md:p-10 flex flex-col ${isReverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-start md:items-center`}>

        {/* Image Side */}
        <div className="w-full md:w-1/2 flex justify-center sticky top-0">
          <RevealImage
            smallSrc={`${process.env.PUBLIC_URL}${section.imageSmall}`}
            fullSrc={`${process.env.PUBLIC_URL}${section.imageFull}`}
            alt={section.title}
            expanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            onClick={() => { }}
            autoCollapse={true}
          />
        </div>

        {/* Text Side */}
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
                <div className={`flex items-center gap-3 mb-6 opacity-100`}>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">Feature</span>
                  <div className="h-[1px] w-8 bg-stone-400"></div>
                  <span className="text-[10px] font-serif italic text-stone-500">{section.location}</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold font-handwriting drop-shadow-sm text-[#2e1065] mb-2 leading-tight">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#ceb752] mb-4">
                    {section.subtitle}
                  </h3>
                )}
                <div className="w-12 h-[2px] bg-[#2e1065]/20 mb-6"></div>
                <p className="text-lg leading-relaxed text-stone-800 font-medium">
                  {section.text}
                </p>
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
                <div className="max-w-[280px] p-4 bg-white/60 backdrop-blur-md border-l-2 border-[#ceb752] shadow-sm group">
                  <h4 className="text-[#2e1065] text-sm font-bold uppercase tracking-widest mb-1 font-cormorant leading-tight">
                    {section.title}
                  </h4>
                  <p className="text-stone-500 text-[11px] italic font-serif leading-tight">
                    {section.location}
                  </p>

                  {/* Interactive Arrow Cue */}
                  <div className="mt-4 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                    <span className="text-[10px] uppercase tracking-widest text-[#2e1065] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
                    <div className="w-6 h-6 rounded-full border border-[#2e1065]/30 flex items-center justify-center group-hover:bg-[#2e1065] group-hover:border-[#2e1065] transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2e1065] group-hover:text-white transition-colors duration-300">
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

// RevealImage Component
function RevealImage({ smallSrc, fullSrc, alt, expanded, onToggle, onClick, autoCollapse }) {
  const [imgError, setImgError] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const containerRef = useRef(null);

  const isControlled = expanded !== undefined;
  const initialExpanded = isControlled ? expanded : false;
  const [visuallyExpanded, setVisuallyExpanded] = useState(initialExpanded);

  useEffect(() => {
    if (isControlled) setVisuallyExpanded(expanded);
  }, [expanded, isControlled]);

  // Auto-collapse logic
  const shouldAutoCollapse = autoCollapse !== undefined ? autoCollapse : true;
  useEffect(() => {
    if (!shouldAutoCollapse || !visuallyExpanded) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setVisuallyExpanded(false);
        if (isControlled && onToggle && expanded) {
          onToggle();
        }
      }
    }, { threshold: 0 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldAutoCollapse, visuallyExpanded, isControlled, onToggle, expanded]);


  const handleClick = (e) => {
    e.stopPropagation();

    if (visuallyExpanded) {
      if (onClick) onClick();
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
      className={`relative transition-all duration-700 ease-in-out cursor-pointer group ${visuallyExpanded ? "w-full" : "w-[80%] md:w-[80%]"}`}
      onClick={handleClick}
    >
      <div className="relative w-full rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
        <img
          src={smallSrc}
          alt={alt}
          loading="lazy"
          className={`transition-all duration-500 
                ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"}
                ${!visuallyExpanded ? "scale-95 group-hover:scale-100 transition-transform duration-500" : "scale-100"}
            `}
        />

        {!imgError && visuallyExpanded && (
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
    </div>
  );
}
