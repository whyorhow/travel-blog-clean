import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";

// Mural Data
const heroSection = {
  id: "graffiti1",
  title: "Walls That Speak",
  text: "In São Paulo, walls are rarely neutral. Murals stretch across facades like open letters, layered with joy, protest, memory, and response. Paint appears, disappears, and returns altered. For people who live here, these images aren’t landmarks — they’re part of the daily landscape, absorbing the city’s rhythm and reflecting it back in colour and form.",
  imageFull: "/images/Murals/full/Graffiti1.webp",
};

const cardSections = [
  {
    id: "graffiti2",
    title: "Colour on Concrete",
    subtitle: "Art Alongside Daily Life",
    text: "Concrete doesn’t stay blank for long. Colour climbs towers, wraps railway arches, fills tunnels and stairwells. Art in São Paulo isn’t separated from daily life — it runs alongside it. Commuters pass murals without stopping, children grow up beside them, and whole neighbourhoods change around painted walls that quietly remain.",
    imageSmall: "/images/Murals/small/Graffiti2z.webp",
    imageFull: "/images/Murals/full/Graffiti2.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "right",
    location: "Vila Madalena",
  },
  {
    id: "graffiti3",
    title: "Looking Over the City",
    subtitle: "A Pause in the Vertical Rush",
    text: "High above the streets, a vast mural of The Little Prince watches São Paulo unfold below. Painted across an apartment block, it feels both gentle and slightly out of place — a pause in the vertical rush. Locals pass beneath it daily, often without looking up, yet it remains: a reminder that imagination still claims space in a city built on movement.",
    imageSmall: "/images/Murals/small/Graffiti3z.webp",
    imageFull: "/images/Murals/full/Graffiti3.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "left",
    location: "Centro",
  },
  {
    id: "graffiti4",
    title: "Beyond Beco do Batman",
    subtitle: "Where Expression Lives",
    text: "Beco do Batman is often where people begin. Its narrow lanes are dense with colour, layered and constantly repainted. But São Paulo’s murals don’t end there. They stretch outward — into residential streets, under overpasses, across long blocks where art lives without an audience. Fame was never the point. Expression was.",
    imageSmall: "/images/Murals/small/Graffiti4z.webp",
    imageFull: "/images/Murals/full/Graffiti4.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "right",
    location: "Vila Madalena",
  },
  {
    id: "graffiti5",
    title: "Steps That Carry Stories",
    subtitle: "Movement into Narrative",
    text: "Painted stairways turn movement into narrative. From below, they appear fragmented — faces, phrases, shapes. From above, they align. These steps are climbed every day by people heading to work, home, or nowhere in particular. Art here doesn’t ask for attention; it reveals itself through use.",
    imageSmall: "/images/Murals/small/Graffiti5z.webp",
    imageFull: "/images/Murals/full/Graffiti5.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "left",
    location: "Pinheiros",
  },
  {
    id: "graffiti6",
    title: "Senna, Still Present",
    subtitle: "Continuity Speed",
    text: "Ayrton Senna’s face emerges from a city wall — vivid, determined, unmistakable. For many Paulistanos, this isn’t nostalgia. It’s continuity. Senna represents discipline, risk, and belief carried at full speed. His image remains not because it’s preserved, but because it’s returned to, repainted, and reaffirmed.",
    imageSmall: "/images/Murals/small/Graffiti6z.webp",
    imageFull: "/images/Murals/full/Graffiti6.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "right",
    location: "Paulista Avenue",
  },
  {
    id: "graffiti7",
    title: "After the Clean City Law",
    subtitle: "Filling the Gaps",
    text: "When outdoor advertising was banned in 2007, space opened. Murals filled the gaps where billboards once stood. Artists like Os Gêmeos, Nunca, and Nina Pandolfo rose from these streets, but the shift went deeper than names. São Paulo’s walls became places for dialogue — about identity, inequality, memory, and belonging — carried out in full view.",
    imageSmall: "/images/Murals/small/Graffiti7z.webp",
    imageFull: "/images/Murals/full/Graffiti7.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "left",
    location: "23 de Maio",
  },
  {
    id: "graffiti8",
    title: "A City Repainting Itself",
    subtitle: "Layers of Conversation",
    text: "Nothing here is fixed. Murals fade, peel, are tagged over, erased, replaced. Walking through São Paulo is moving through layers of past conversations. The city doesn’t preserve its walls — it allows them to change. For residents, that impermanence is the point. The streets stay alive because they never settle.",
    imageSmall: "/images/Murals/small/Graffiti8z.webp",
    imageFull: "/images/Murals/full/Graffiti8.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "right",
    location: "Cambuci",
  },
  {
    id: "graffiti9",
    title: "Unsettled Faces",
    subtitle: "Restless and Unresolved",
    text: "Some murals confront rather than decorate. Faces distort, colours clash, expressions refuse comfort. These works don’t explain themselves or ask to be liked. They reflect a city that is restless and unresolved, where contradiction is part of daily life. For many Paulistanos, this honesty matters more than beauty.",
    imageSmall: "/images/Murals/small/Graffiti9z.webp",
    imageFull: "/images/Murals/full/Graffiti9.webp",
    expandedBg: "bg-[#e8d5ce]",
    layout: "left",
    location: "Consolação",
  },
];

export default function Murals({ openLightbox }) {
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
      id: heroSection.id,
      lightboxImage: `${process.env.PUBLIC_URL}${heroSection.imageFull}`,
      title: heroSection.title,
    }];
    cardSections.forEach(s => {
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
    <div className="bg-[#f5f5f4] min-h-screen pb-16 transition-colors duration-500">
      <SEO
        title="Street Murals | Nomad Scribbles"
        description="São Paulo’s streets speak openly. Murals record identity, tension, and pride in full public view."
        image={heroSection.imageFull}
        slug="/brazil/saopaulo/murals"
      />

      <div className="relative w-full overflow-hidden">
        {/* Title Section */}
        <div className="flex justify-center mb-6 px-4 mt-8 relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#D4AF37] tracking-tight text-center drop-shadow-sm">Street Murals</h1>
        </div>

        {/* Magazine Style Hero Section */}
        <div ref={heroRef} className="w-full max-w-7xl mx-auto px-4 mb-24 relative z-10 group">

          {/* Main Hero Image - Large & Cinematic */}
          <div
            className={`relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer group-hover:shadow-xl transition-all duration-700 ease-in-out ${isHeroExpanded ? 'aspect-auto' : 'aspect-[16/10] md:aspect-[16/9]'}`}
            onClick={() => {
              if (!isHeroExpanded) setIsHeroExpanded(true);
              else handleImageClick(heroSection.id);
            }}
          >
            <img
              src={isHeroExpanded ? process.env.PUBLIC_URL + "/images/Murals/full/Graffiti1.webp" : process.env.PUBLIC_URL + "/images/Murals/small/Graffiti1new.webp"}
              alt="Murals Hero"
              fetchPriority="high" // OPTIMIZATION
              loading="eager"      // OPTIMIZATION
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${!isHeroExpanded ? 'transform scale-100 group-hover:scale-105' : ''}`}
            />
          </div>

          {/* Overlapping Text Card - "Newspaper" Style */}
          <div className="relative md:absolute md:-bottom-12 md:left-12 lg:left-20 w-full md:max-w-xl bg-[#f5f5f4] p-8 md:p-10 shadow-xl rounded-lg border-t-4 border-[#e9d5ff] mt-[-3rem] md:mt-0 z-20">
            {/* Decorative 'Issue' or 'Date' line */}
            <div className="flex items-center gap-3 mb-4 opacity-60">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6b21a8]">Feature</span>
              <div className="h-[1px] w-12 bg-stone-400"></div>
              <span className="text-xs font-serif italic text-stone-500">São Paulo</span>
            </div>

            <div className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed">
              <span className="text-5xl float-left mr-3 mt-[-10px] font-bold text-[#6b21a8] font-handwriting">P</span>
              <p className="inline">
                aint appears, disappears, and returns altered. Walls in São Paulo are rarely neutral. Murals stretch across facades like open letters, layered with joy, protest, memory, and response. For people who live here, these images aren’t landmarks — they’re part of the daily landscape, absorbing the city’s rhythm and reflecting it back in colour and form.
              </p>
            </div>
          </div>
        </div>
        {/* 2. Expanding Cards (Graffiti 2-9) */}
        <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-12 flex flex-col items-center pb-24">
          {cardSections.map((section) => (
            <StoryCard
              key={section.id}
              section={section}
              onImageClick={() => handleImageClick(section.id)}
            />
          ))}
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
            to="/brazil/saopaulo/santos"
            className="flex flex-row items-center justify-center text-[#ceb752] hover:text-[#e8eac7] transition-colors drop-shadow-sm bg-[#ceb752]/20 backdrop-blur-md rounded-full px-8 py-3 border border-[#ceb752]/50 shadow-md hover:bg-[#ceb752]/30 w-fit min-w-[240px]"
          >
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">
              Next: Santos
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
  const activeBg = section.expandedBg || "bg-[#e8d5ce]";

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
            onClick={onImageClick}
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left min-h-[150px]">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              // Expanded: Full Text
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-left"
              >
                <h2 className="text-3xl md:text-5xl font-bold font-handwriting drop-shadow-sm text-[#2e1065] mb-2">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-md md:text-lg font-light tracking-wide mb-4 text-stone-700">
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
                <div className="max-w-[280px] p-4 bg-white/60 backdrop-blur-md border-l-2 border-[#eeda8d] shadow-sm group">
                  <h4 className="text-[#2e1065] text-sm font-bold uppercase tracking-widest mb-1 font-cormorant leading-tight">
                    {section.title}
                  </h4>
                  <p className="text-stone-500 text-[11px] italic font-serif leading-tight">
                    {section.location || "São Paulo"}
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


// Optimized RevealImage Component
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
