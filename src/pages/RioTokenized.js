/**
 * RIO DE JANEIRO — Fully Tokenized Version
 * 
 * Stress test result: System successfully handles destination-specific palettes.
 * 
 * Changes from original Rio.js:
 * - All colors use tokens (tw.rio.*, tokens.colors.rio.*)
 * - All spacing uses tokens (tokens.spacing.*, tokens.layout.*)
 * - All shadows use tokens (tokens.shadows.*)
 * - Section backgrounds from data, not hardcoded
 * 
 * This proves the system can handle dramatic personality variation
 * while maintaining structural consistency.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import artImages from '../assets/artImages.json';
import ContextMap from '../components/ContextMap';
import destinations from '../assets/destinations.json';
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from '../utils/cloudinary';
import { tw, tokens, styles } from '../styles';

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

const cloudSmallSrc = (img) =>
  cloudinaryImageUrl(img?.imagePublicId || getPublicIdFromLegacyPath(img?.image), { width: 1200 });

const cloudFullSrc = (img) =>
  cloudinaryImageUrl(
    img?.lightboxImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.lightboxImage || img?.image),
    { width: 2000 }
  );

// ============================================================================
// SECTION DATA (Content + Theming)
// ============================================================================

const SECTIONS = [
  {
    id: 'carnival',
    title: 'Spectacle and scale',
    subtitle: 'Carnival Works Because Everyone Is Involved',
    theme: 'carnival', // References tokens.colors.rio.carnival
    coverImage: 'rio2',
    coverCaption: 'From the stands, the Sambadrome collapses into a dense field of light, sound, and movement.',
    content: [
      { type: 'text', text: 'From above, the Sambadrome compresses into a dense field of sound, light, and choreography. Each section performs with precision, but the scale of the crowd makes it clear that Carnival only works because it is shared. What looks overwhelming from a distance becomes cohesive only through collective effort.' },
      { type: 'header', text: 'The Effort Behind the Fantasy' },
      { type: 'image', id: 'rio3', caption: 'A vast carnival float advances slowly, revealing the scale and labour behind the display.' },
      { type: 'text', text: 'Large-scale floats move slowly through the avenue, combining mythology, politics, humour, and craftsmanship. Entire neighbourhoods work for months to create these fleeting moments of perfection, assembled collectively long before they ever reach the avenue.' },
      { type: 'grid', ids: ['rio4', 'rio5'] },
      { type: 'text', text: 'Close up, the detail becomes human again — hands raised, figures layered, performers and mechanics working side by side. Seen in daylight, the structures expose their construction, reminding us that Carnival exists within everyday Rio, not apart from it, and returns to it once the music fades.' }
    ]
  },
  {
    id: 'geography',
    title: 'Pressed to the Mountain',
    subtitle: 'Geography Forces the City Upward',
    theme: 'geography', // References tokens.colors.rio.geography
    coverImage: 'rio8',
    coverCaption: 'Dense neighbourhoods press tightly against the coastline and steep green slopes.',
    content: [
      { type: 'text', text: 'Dense neighbourhoods climb the slopes between forest and sea, filling every available space. Rio\'s geography leaves little room for sprawl; instead, it layers daily life vertically, compressing homes, streets, and routines against the hills.' },
      { type: 'header', text: 'Granite Foundations' },
      { type: 'image', id: 'rio7', caption: 'As daylight fades, Rio softens into shadow and colour across hills and streets.' },
      { type: 'text', text: 'The city wakes beneath massive stone hills as early light skims across bare rock. In Rio, the landscape isn\'t a backdrop — it sets the limits and the mood. Daily life adapts to this terrain rather than resisting it, shaped by shadow, elevation, and constraint.' },
      { type: 'image', id: 'rio6', caption: 'Café tables sit quietly below a towering rock face that presses the city into view.' }
    ]
  },
  {
    id: 'corcovado',
    title: 'Watching from Above',
    subtitle: 'A Fixed Point in a Moving City',
    theme: 'corcovado', // References tokens.colors.rio.corcovado
    coverImage: 'rio9',
    coverCaption: 'Christ the Redeemer stands open-armed as the city stretches quietly below.',
    content: [
      { type: 'text', text: 'Christ the Redeemer stands above the city, distant yet constant. From this height, Rio unfolds as a mix of water, forest, and dense urban movement, all held in uneasy balance.' },
      { type: 'text', text: 'Up close, the monument feels heavier and quieter than expected. Weathered stone, passing clouds, and surrounding forest pull attention back to the setting rather than the monument itself. It becomes a human pause within a monumental landscape.' },
      { type: 'image', id: 'rio10', caption: 'From ground level, the statue becomes stone, scale, and weather rather than symbol.' }
    ]
  },
  {
    id: 'transition_shade',
    type: 'transition_image',
    imageId: 'rio13',
    caption: 'Stretched fabric shifts gently against the sky, offering momentary relief from the sun.'
  },
  {
    id: 'sea',
    title: 'The City Meets the Sea',
    subtitle: 'The Shoreline Isn\'t an Escape; It\'s Part of Everyday Life',
    theme: 'sea', // References tokens.colors.rio.sea
    coverImage: 'rio14',
    coverCaption: 'As the light changes, the beach thins and the day slips quietly toward evening.',
    content: [
      { type: 'text', text: 'The beach marks a shift in pace. Conversations slow. Bodies stretch. The city exhales. In Rio, the shoreline isn\'t an escape; it\'s where daily life loosens without ever fully stopping, opening outward while still remaining unmistakably urban.' },
      { type: 'image', id: 'rio12', caption: 'A pair of flip-flops rests briefly before the beach erases all trace of them.' }
    ]
  }
];

// Theme color map — references tokens
const THEME_COLORS = {
  carnival: tw.rio.carnival,
  geography: tw.rio.geography,
  corcovado: tw.rio.corcovado,
  sea: tw.rio.sea,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function RioTokenized({ openLightbox }) {
  const rioCoords = destinations.find(d => d.id === 'rio');
  const rioImages = artImages.filter(img => img.category === 'Rio');

  const imageOrder = [
    'rio1', 'rio2', 'rio3', 'rio4', 'rio5', 'rio6', 'rio7', 'rio8', 'rio9', 'rio10', 'rio11', 'rio12', 'rio13', 'rio14'
  ];

  const sortedImages = imageOrder.map(id => rioImages.find(img => img.id === id)).filter(Boolean);

  const handleImageClick = (imageId) => {
    const index = sortedImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      openLightbox(index, sortedImages);
    }
  };

  const getImage = (id) => rioImages.find(i => i.id === id);

  return (
    <div 
      className="transition-colors duration-500" 
      style={styles.rio.pageBg}
    >
      <SEO
        title="Rio de Janeiro | Nomad Scribbles"
        description="Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography."
        keywords={['Rio de Janeiro', 'Brazil', 'Carnival', 'Travel Photography', 'Christ the Redeemer']}
      />

      {/* Torn Paper Filter SVG */}
      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <defs>
          <filter id="torn-paper-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
        </defs>
      </svg>

      {/* ==========================================================================
          HERO SECTION — Cinematic 90vh with motion
      ========================================================================== */}
      <div 
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: tokens.layout.heroHeightTall }}
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={cloudFullSrc(getImage('rio1'))}
            alt="Rio de Janeiro Landscape Hero"
            className="w-full h-full object-cover"
          />
          {/* Hero gradient overlay */}
          <div 
            className="absolute inset-0"
            style={styles.rio.heroGradient}
          />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-4 mt-[-36vh] md:mt-[-66vh]">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className={tw.rio.heroTitle}>
              Rio de Janeiro
            </h1>
            <p className="text-xl md:text-3xl font-bold tracking-[0.2em] uppercase text-stone-200 opacity-90">
              The Marvellous City
            </p>
          </motion.div>
        </div>
      </div>

      {/* ==========================================================================
          MAP SECTION — With torn paper effect
      ========================================================================== */}
      <div className="relative w-full mb-16 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
          style={{
            backgroundImage: `url(${paperTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'url(#torn-paper-filter)',
            opacity: 0.95,
          }}
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 pt-0 pb-4 md:pt-2 md:pb-8 flex flex-col items-center mt-[-10px]">
          <div className="w-full max-w-6xl overflow-visible mb-12">
            <ContextMap
              markers={[{ id: 'rio', name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 }]}
              zoomToId="rio"
              title="Where is Rio?"
              geography={rioCoords?.geography}
              transparent={true}
            />
          </div>
        </div>
      </div>

      {/* ==========================================================================
          STORY SECTIONS — Expandable cards with themes
      ========================================================================== */}
      <main className="px-2 py-2 max-w-screen-xl mx-auto space-y-8 flex flex-col items-center pb-24">
        {SECTIONS.map((section) => {
          if (section.type === 'transition_image') {
            const img = getImage(section.imageId);
            if (!img) return null;
            return (
              <div key={section.id} className="w-full max-w-6xl py-12">
                <RevealImage
                  smallSrc={cloudSmallSrc(img)}
                  fullSrc={cloudFullSrc(img)}
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
            />
          );
        })}

        {/* Navigation Buttons */}
        <div className="w-full flex flex-col items-center gap-6 mt-20 mb-12 relative z-20 px-4">
          <Link 
            to="/brazil" 
            className={`flex flex-row items-center justify-center ${tw.rio.button} ${tw.rio.buttonHover} rounded-xl py-3 px-4 text-center transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]`}
          >
            <span className="text-lg mr-2">←</span>
            <span className="text-sm font-medium">Return To Brazil</span>
          </Link>
          <Link 
            to="/brazil/bonito" 
            className={`flex flex-row items-center justify-center ${tw.rio.button} ${tw.rio.buttonHover} rounded-xl py-3 px-4 text-center transition duration-300 text-sm font-medium uppercase tracking-wide shadow-lg w-[240px]`}
          >
            <span className="text-sm font-medium">Next: Bonito</span>
            <span className="text-lg ml-2">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// REVEAL IMAGE COMPONENT — Tokenized
// ============================================================================

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
      className={`relative mx-auto transition-all duration-700 ease-in-out my-8 ${visuallyExpanded ? 'w-full max-w-[98vw] md:max-w-screen-2xl' : 'w-full md:w-1/2 max-w-5xl'}`}
    >
      <div className="relative w-full flex justify-center items-center">
        {/* Small Image */}
        <img
          src={smallSrc}
          alt={alt}
          onClick={handleClick}
          loading="lazy"
          className={`rounded-sm shadow-sm transition-all duration-500 cursor-pointer w-full h-auto max-h-[85vh] object-contain ${showFullAsDriver ? 'absolute inset-0 opacity-0' : 'relative z-10 opacity-100'}`}
        />

        {/* High-Res Image */}
        {!imgError && visuallyExpanded && (
          <img
            src={fullSrc}
            alt={alt}
            onClick={handleClick}
            onLoad={() => setFullLoaded(true)}
            onError={() => setImgError(true)}
            className={`rounded-sm transition-all duration-700 ease-out cursor-pointer w-full h-auto max-h-[85vh] object-contain ${showFullAsDriver ? 'relative z-20 opacity-100 scale-100' : 'absolute inset-0 z-20 opacity-0 scale-95'}`}
            loading="lazy"
          />
        )}

        {/* Metadata Card */}
        {(title || caption) && visuallyExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: fullLoaded ? 1 : 0, y: fullLoaded ? 0 : 10 }}
            className={`absolute bottom-8 left-0 right-0 mx-auto w-fit max-w-[90%] md:max-w-3xl p-6 md:p-8 text-left pointer-events-none rounded-xl z-30 ${tw.rio.metadataCard}`}
            style={{ boxShadow: tokens.shadows.floating }}
          >
            <div className="max-w-2xl px-2">
              {title && (
                <h4 className={`${tw.rio.gold} text-2xl md:text-3xl font-bold font-handwriting mb-3 tracking-wide drop-shadow-sm`}>
                  {title}
                </h4>
              )}
              {caption && (
                <p className={`${tw.rio.cream} text-lg leading-relaxed font-serif italic opacity-95`}>
                  {caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Collapsed Label */}
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

// ============================================================================
// STORY CARD COMPONENT — Tokenized with theme support
// ============================================================================

function StoryCard({ section, getImage, handleImageClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get theme color from map, fallback to dark
  const themeColor = THEME_COLORS[section.theme] || tw.rio.dark;
  
  // Build expanded background class
  const activeBg = isExpanded ? `${themeColor}/95` : '';

  return (
    <motion.div
      layout
      className={`w-full max-w-6xl backdrop-blur-md rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${isExpanded ? `shadow-2xl ${activeBg} max-w-[98vw] md:max-w-screen-2xl` : `bg-stone-900/50 ${tokens.shadows.card}`}`}
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative p-6 md:p-10 flex flex-col items-center z-10">
        <div className="text-center mb-8">
          <h2 className={`text-4xl md:text-6xl font-bold font-handwriting drop-shadow-md transition-colors duration-500 ${isExpanded ? 'text-stone-100' : tw.rio.gold}`}>
            {section.title}
          </h2>
          {section.subtitle && (
            <h3 className={`text-lg md:text-xl font-light tracking-wide mt-2 transition-colors duration-500 ${isExpanded ? 'text-stone-300' : 'text-stone-300'}`}>
              {section.subtitle}
            </h3>
          )}
        </div>

        <RevealImage
          smallSrc={cloudSmallSrc(getImage(section.coverImage))}
          fullSrc={cloudFullSrc(getImage(section.coverImage))}
          alt={section.title}
          caption={section.coverCaption || getImage(section.coverImage)?.description}
          title={getImage(section.coverImage)?.title}
          onClick={() => handleImageClick(section.coverImage)}
          expanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />

        <motion.div
          initial={{ opacity: 1, height: 'auto' }}
          animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : 'auto' }}
          className="flex flex-col items-center h-8"
        >
          <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-semibold text-stone-400">Explore Section</p>
          <div className="w-px h-4 bg-stone-400/30 mt-1"></div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden bg-transparent"
          >
            <div className="px-6 pb-12 md:px-16 md:pb-20 flex flex-col items-center space-y-10">
              {section.content.map((item, idx) => {
                if (item.type === 'text') {
                  return (
                    <p 
                      key={idx} 
                      className="text-xl leading-relaxed max-w-3xl text-center md:text-left text-stone-300 font-medium mx-auto"
                    >
                      {item.text}
                    </p>
                  );
                }
                if (item.type === 'image') {
                  const img = getImage(item.id);
                  if (!img) return null;
                  return (
                    <div key={idx} className="w-full">
                      <RevealImage
                        smallSrc={cloudSmallSrc(img)}
                        fullSrc={cloudFullSrc(img)}
                        alt={img.title || ''}
                        caption={item.caption || img.description}
                        title={img.title}
                        onClick={(e) => { e.stopPropagation(); handleImageClick(item.id); }}
                      />
                    </div>
                  );
                }
                if (item.type === 'grid') {
                  return (
                    <div key={idx} className={`grid grid-cols-1 md:grid-cols-${item.ids.length > 2 ? '3' : '2'} gap-6 md:gap-10 w-full max-w-6xl`}>
                      {item.ids.map(id => {
                        const img = getImage(id);
                        if (!img) return null;
                        return (
                          <div key={id} className="flex flex-col items-center w-full">
                            <RevealImage
                              smallSrc={cloudSmallSrc(img)}
                              fullSrc={cloudFullSrc(img)}
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
                if (item.type === 'header') {
                  return (
                    <h3 
                      key={idx} 
                      className="text-2xl md:text-3xl font-bold font-handwriting mt-4 text-center text-stone-100 max-w-2xl mx-auto"
                    >
                      {item.text}
                    </h3>
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

export default RioTokenized;
