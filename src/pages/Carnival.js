import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import Lightbox from "../components/Lightbox";
import artImages from "../assets/artImages.json";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

// Carnival page component

function Carnival({ openLightbox }) {
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [expandedCardBg, setExpandedCardBg] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const heroRef = useRef(null);
  const carnivalImages = artImages.filter(img => img.category === "Carnival");

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

  const imageOrder = [
    "carnival10", "carnival1", "carnival3", "carnival6", "carnival13", "carnival9", "carnival14", "carnival11", "carnival12"
  ];

  const getImage = (id) => carnivalImages.find(i => i.id === id);
  const sortedImages = imageOrder.map(id => getImage(id)).filter(Boolean);

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
      id: "preparation",
      title: "Carnival Is Built, Not Arrived At",
      subtitle: "Collective Labour Before the Spectacle",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival1",
      coverCaption: "This isn’t background activity — it’s collective labour.",
      layout: "right",
      content: [
        { type: "text", text: "In São Paulo, Carnival begins long before the streets fill. Samba schools rehearse late into the night, costumes are sewn after workdays end, and floats are constructed piece by piece over months. This isn’t background activity — it’s collective labour. Carnival belongs to the people who make it, and its meaning is rooted in shared effort long before it becomes spectacle." }
      ]
    },
    {
      id: "representation",
      title: "Representing a Neighbourhood",
      subtitle: "History and Identity on the Avenue",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival3",
      coverCaption: "Each performance represents a neighbourhood.",
      layout: "left",
      content: [
        { type: "text", text: "When samba schools enter the Sambódromo, they carry more than choreography. Each performance represents a neighbourhood — its history, identity, and internal pride. The scale may feel overwhelming from the stands, but for those involved it remains personal. Families, friends, and rivals watch closely, recognising the work behind every movement." }
      ]
    },
    {
      id: "discipline",
      title: "Precision Holds It Together",
      subtitle: "Visual Excess Held in Place",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival6",
      coverCaption: "What looks effortless is the result of sustained coordination.",
      layout: "right",
      content: [
        { type: "text", text: "Carnival’s visual excess is held in place by discipline. Dancers move in strict formation, floats advance at measured pace, and musicians maintain relentless rhythm. Individual expression only works because everyone else holds their position. What looks effortless is the result of sustained coordination and trust." }
      ]
    },
    {
      id: "physical",
      title: "Hands, Weight, Repetition",
      subtitle: "The Work Beneath the Colour",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival13",
      coverCaption: "Rhythm is felt in the body.",
      layout: "left",
      content: [
        { type: "text", text: "Up close, Carnival becomes physical rather than symbolic. Drum skins wear thin, hands ache, and repetition replaces performance. This is the work beneath the colour — where rhythm is felt in the body and sound becomes something carried, not just heard." }
      ]
    },
    {
      id: "loosens",
      title: "The City Loosens",
      subtitle: "Beyond the Sambódromo Structure",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival9",
      coverCaption: "Participation replaces performance.",
      layout: "right",
      content: [
        { type: "text", text: "Outside the Sambódromo, Carnival releases its structure. Blocos form in streets and alleyways, gathering whoever happens to be there. These moments aren’t rehearsed, but they’re deeply familiar. Neighbourhoods recognise their own rhythms, and participation replaces performance. Rain falls, sound continues, and the city moves without needing direction." }
      ]
    },
    {
      id: "spills",
      title: "Sound Spills Out",
      subtitle: "Where the Edge Breaks",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival14",
      coverCaption: "Music escapes its routes and schedules.",
      layout: "left",
      content: [
        { type: "text", text: "Music escapes its routes and schedules, spilling into side streets and unexpected corners. Brass cuts through percussion, crowds gather and dissolve, and Carnival briefly reorganises how the city moves. These moments feel unscripted, but they’re part of a shared understanding — Carnival goes where people carry it." }
      ]
    },
    {
      id: "transition_beat",
      title: "Between Beats",
      subtitle: "The Rhythm Changes Hands",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival12",
      coverCaption: "Between beats, the rhythm doesn't stop — it simply changes hands.",
      layout: "left",
      content: [
        { type: "text", text: "Drummers pause, adjust straps, and exchange glances while the rhythm carries on around them. Even in the brief gaps, the street stays charged — the sound never fully stops, it just shifts hands. These moments of pause are part of the performance, where the rhythm briefly transfers from one set of hands to another." }
      ]
    },
    {
      id: "remains",
      title: "What Remains",
      subtitle: "The Shared Aftermath",
      expandedBg: "bg-[#edd7f7]",
      coverImage: "carnival11",
      coverCaption: "A city returning to itself slightly altered.",
      layout: "right",
      content: [
        { type: "text", text: "As Carnival settles into parks and open spaces, it slows. Music drifts, crowds thin, and celebration blends back into daily life. For many Paulistanos, this is the true centre of Carnival — not the height of spectacle, but the shared aftermath. A city briefly aligned around rhythm and movement, returning to itself slightly altered." }
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
        title="Carnival in São Paulo | Nomad Scribbles"
        description="Experience São Paulo's Carnival — the rhythm, colors, and energy of Brazil's world-famous festival."
        image="/images/CarnivalSP/CarnivalBackground.png"
        slug="/brazil/saopaulo/carnival"
      />
      <div className="relative w-full overflow-hidden">
        {/* Title Section */}
        <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Carnival</h1>
        </div>

        {/* Magazine Style Hero Section */}
        <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">
          <div
            className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-700 ease-in-out ${isHeroExpanded ? 'aspect-auto' : 'aspect-[16/10] md:aspect-[16/9]'}`}
            onClick={() => {
              if (!isHeroExpanded) setIsHeroExpanded(true);
              else handleImageClick("carnival10");
            }}
          >
            <img
              src={isHeroExpanded ? cloudinaryUrlFromLegacyPath("/images/CarnivalSP/full/Carnival10.webp", { width: 2000 }) : cloudinaryUrlFromLegacyPath("/images/CarnivalSP/small/Carnival10z.webp", { width: 1200 })}
              alt="Carnival Hero"
              fetchPriority="high" // OPTIMIZATION
              loading="eager"      // OPTIMIZATION
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${!isHeroExpanded ? 'transform scale-100 group-hover:scale-105' : ''}`}
            />
          </div>

          <div className="relative md:absolute md:-bottom-12 md:left-12 lg:left-20 w-full md:max-w-xl bg-[#f5f5f4] p-8 md:p-10 shadow-xl rounded-lg border-t-4 border-[#e9d5ff] mt-[-3rem] md:mt-0 z-20">
            <div className="flex items-center gap-3 mb-4 opacity-60">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b21a8]">Feature</span>
              <div className="h-[1px] w-12 bg-stone-400"></div>
              <span className="text-xs font-serif italic text-stone-500">São Paulo</span>
            </div>

            <p className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed">
              <span className="text-5xl float-left mr-3 mt-[-10px] font-bold text-[#6b21a8] font-handwriting">C</span>
              arnival in São Paulo is often misunderstood. It is not just a spectacle for broadcast, but a reclaiming of the city itself. For a few days, the streets belong to people, not cars. The rhythm of the blocos rewrites the map, turning intersections into dance floors and viaducts into gathering spaces. It is messy, loud, and vital—a necessary release for a city that rarely stops.
            </p>
          </div>
        </div>

        <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
          {sections.map((section) => {
            if (section.type === "transition_image") {
              const img = getImage(section.imageId);
              if (!img) return null;
              return (
                <div key={section.id} className="w-full max-w-6xl py-12">
                  <RevealImage
                    smallSrc={cloudinaryUrlFromLegacyPath(img.image, { width: 1200 })}
                    fullSrc={cloudinaryUrlFromLegacyPath(img.blogimage, { width: 2000 })}
                    alt={img.title}
                    caption={section.caption}
                    title={img.title}
                    onClick={() => handleImageClick(section.imageId)}
                    expanded={true}
                    autoCollapse={false}
                  />
                </div>
              );
            }
            return (
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
            );
          })}

        </main>

        {/* Navigation - Outside main container */}
        <div className="w-full flex flex-col items-center gap-6 mt-12 mb-12 relative z-20 px-4">
          <Link to="/brazil/saopaulo" className="flex flex-row items-center justify-center bg-[#edd7f7]/30 border-2 border-[#2e1065] text-[#2e1065] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#edd7f7]/40 hover:text-[#2e1065] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
            <span className="text-lg mr-2">←</span>
            <span className="text-sm font-medium">Return To São Paulo</span>
          </Link>
          <Link to="/brazil/saopaulo/murals" className="flex flex-row items-center justify-center bg-[#edd7f7]/30 border-2 border-[#2e1065] text-[#2e1065] backdrop-blur-md rounded-xl py-3 px-4 text-center hover:bg-[#edd7f7]/40 hover:text-[#2e1065] transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]">
            <span className="text-sm font-medium">Next: Street Murals</span>
            <span className="text-lg ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ section, getImage, handleImageClick, onExpand, onCollapse, isCurrentlyExpanded }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeBg = section.expandedBg || "bg-[#edd7f7]";
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

        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left min-h-[150px]">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-left w-full"
              >
                <h2 className="text-3xl md:text-5xl font-bold font-handwriting drop-shadow-sm text-[#2e1065] mb-2 leading-tight">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-md md:text-lg font-light tracking-wide mb-4 text-stone-700">
                    {section.subtitle}
                  </h3>
                )}
                <div className="w-12 h-[2px] bg-[#2e1065]/20 mb-6"></div>

                <div className="space-y-6">
                  {section.content.map((item, idx) => {
                    if (item.type === "text") {
                      return <p key={idx} className="text-lg leading-relaxed text-stone-800 font-medium">{item.text}</p>;
                    }
                    if (item.type === "image") {
                      const subImg = getImage(item.id);
                      if (!subImg) return null;
                      return (
                        <div key={idx} className="w-full mt-4">
                          <RevealImage
                            smallSrc={cloudinaryUrlFromLegacyPath(subImg.image, { width: 1200 })}
                            fullSrc={cloudinaryUrlFromLegacyPath(subImg.blogimage, { width: 2000 })}
                            alt={subImg.title || ""}
                            caption={item.caption}
                            onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                            expanded={true}
                            autoCollapse={false}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col ${isReverse ? "items-start md:items-end md:text-right" : "items-start md:text-left"} w-full`}
              >
                <div className="max-w-[280px] p-4 bg-white/60 backdrop-blur-md border-l-2 border-[#E8C7F5] shadow-sm group">
                  <h4 className="text-[#2e1065] text-sm font-bold uppercase tracking-widest mb-1 font-cormorant leading-tight">
                    {section.title}
                  </h4>
                  <p className="text-stone-500 text-[11px] italic font-serif leading-tight">
                    {section.subtitle || "São Paulo Carnival"}
                  </p>
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

// Optimized Reusable Image Component
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
    <motion.div
      layout
      ref={containerRef}
      className={`relative max-w-5xl mx-auto transition-all duration-700 ease-in-out my-4 ${visuallyExpanded ? "w-full" : "w-[80%] md:w-[80%]"}`}
      onClick={handleClick}
    >
      <div className="relative w-full rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow cursor-pointer">
        {/* Small Image */}
        <img
          src={smallSrc}
          alt={alt}
          loading="lazy"
          className={`transition-all duration-500 
              ${showFullAsDriver ? "absolute inset-0 w-full h-full object-cover opacity-0" : "relative w-full h-auto object-contain z-10"}
              ${!visuallyExpanded ? "scale-95 group-hover:scale-100 transition-transform duration-500" : "scale-100"}
          `}
        />

        {/* High-Res Image - Conditional Render */}
        {!imgError && visuallyExpanded && (
          <img
            src={fullSrc}
            alt={alt}
            onLoad={() => setFullLoaded(true)}
            onError={() => setImgError(true)}
            loading="lazy"
            className={`transition-all duration-700 ease-out 
                ${showFullAsDriver ? "relative w-full h-auto z-20 opacity-100 scale-100" : "absolute inset-0 w-full h-full object-cover z-20 opacity-0 scale-95"}
            `}
          />
        )}
      </div>

      {(title || caption) && visuallyExpanded && (
        <div className="mt-4 text-center px-4">
          {title && <p className="text-xs font-bold uppercase tracking-widest text-[#2e1065]">{title}</p>}
          {caption && <p className="text-sm italic text-stone-600 mt-1">{caption}</p>}
        </div>
      )}
    </motion.div>
  );
}

export default Carnival;
