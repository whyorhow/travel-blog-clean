import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '../../styles';
import { cloudinaryImageUrl } from '../../utils/cloudinary';
import { resolveHero, resolveHeroTransition } from '../../system/resolvers/resolveHero';
import { useLightboxNavLock } from '../../hooks/useLightboxNavLock';
import { isMobileViewport } from '../../utils/brazilStaticHero';

const MAGNIFY_ICON = `${process.env.PUBLIC_URL}/assets/Magnifyv2.svg`;
const DEFAULT_TRANSITION_DELAY_MS = 4000;
const UNCROPPED_HERO_WIDTHS = [400, 600, 800, 1200];
const UNCROPPED_HERO_SIZES = '(max-width: 640px) 92vw, 600px';
const UNCROPPED_DISPLAY_WIDTH = 600;
const UNCROPPED_DISPLAY_HEIGHT = 450;

/**
 * HERO — System component with TWO layout modes
 * 
 * PRINCIPLE: State determines layout weight, not just content.
 * 
 * FULL HERO (60-90vh): When any hero tier is active
 * - diary: 90vh cinematic
 * - location: 60vh standard
 * - fallback: 60vh safety
 * 
 * COMPACT HERO (25-35vh): Only when placeholder state
 * - Visual: structural header, not cinematic opening
 * - Purpose: neutral entry point, incomplete page indicator
 * 
 * System rule:
 * - resolver decides type
 * - component decides layout variant (no mixing concerns)
 * 
 * @param {Object} heroConfig - From {location}.hero.config.js
 * @param {Object} pageData - Optional page data (title, theme, etc.)
 */
function Hero({ heroConfig, pageData = {} }) {
  // Resolver decides which hero type to render
  const hero = resolveHero(heroConfig);
  const transition = isMobileViewport() ? null : resolveHeroTransition(heroConfig);
  
  // COMPACT HERO: Placeholder state = structural header (25-35vh)
  // Visual rule: neutral, no "hero energy", above fold but not dominant
  if (hero.type === 'placeholder') {
    return <CompactHero title={pageData.title || 'Explore'} subtitle={pageData.subtitle} />;
  }
  
  // FULL HERO: Active hero state = cinematic experience (60-90vh)
  // Route to treatment based on resolved type
  if (hero.type === 'diary') {
    return <DiaryTreatment hero={hero} pageData={pageData} />;
  }
  
  // location, fallback: standard 60vh hero
  return <LocationTreatment hero={hero} transition={transition} />;
}

/**
 * COMPACT HERO — Structural header for placeholder state (25-35vh)
 * 
 * PRINCIPLE: Different spatial rules than Full Hero.
 * - No "hero energy" — neutral, above fold but not dominant
 * - Visual: structural header, not cinematic opening
 * - Purpose: incomplete page indicator, safe fallback
 * 
 * Rules:
 * - Height: 25-35vh (never competes with real heroes)
 * - No image dependency
 * - Subtle gradient, reduced typography
 * - Optional location tag for context
 */
function CompactHero({ title, subtitle }) {
  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ 
        height: '30vh', // Compact: 25-35vh range, never cinematic
        minHeight: '200px',
        maxHeight: '350px'
      }}
    >
      {/* Subtle gradient background — neutral, no image dependency */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-stone-600 via-stone-700 to-stone-800"
      />
      
      {/* Optional subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Content: centered, reduced scale */}
      <div className="relative z-10 text-center px-6">
        {/* Location tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest text-white/60 border border-white/30 rounded">
            Destination
          </span>
        </div>
        
        {/* Title: reduced scale vs Full Hero */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-handwriting" style={{ color: '#B8860B' }}>
          {title}
        </h1>
        
        {/* Subtle divider line */}
        <div className="w-16 h-px bg-white/30 mx-auto mt-4 mb-3" />
        
        {/* Optional subtitle or default context */}
        <p className="text-white/60 text-sm tracking-wide">
          {subtitle || 'Travel Notes'}
        </p>
      </div>
    </section>
  );
}

/**
 * LOCATION TREATMENT — Standard 60vh hero
 * Clean, establishing shot.
 */
function LocationTreatment({ hero, transition }) {
  const theme = hero.theme;
  const hasTransition = !!transition?.src;

  if (hero.uncropped && hasTransition) {
    return <UncroppedTransitionHero hero={hero} transition={transition} />;
  }

  if (hero.uncropped) {
    return (
      <section className="relative w-full flex justify-center">
        <div className="relative w-full max-w-[600px] aspect-[4/3]">
          <img
            src={heroFrameSrc(hero, 800)}
            srcSet={heroFrameSrcSet(hero)}
            sizes={UNCROPPED_HERO_SIZES}
            alt={hero.alt}
            width={UNCROPPED_DISPLAY_WIDTH}
            height={UNCROPPED_DISPLAY_HEIGHT}
            className="w-full h-auto object-contain"
            fetchPriority="high"
            decoding="sync"
          />
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ height: tokens.layout.heroHeight }}
    >
      <img
        src={hero.src}
        alt={hero.alt}
        width={1200}
        height={675}
        className="w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: `rgba(0,0,0,${theme.overlayStart})`,
        }}
      />
    </section>
  );
}

function heroFrameSrc(frame, width = 800) {
  if (!frame?.publicId) return frame?.src;
  return cloudinaryImageUrl(frame.publicId, {
    width,
    format: 'webp',
    version: frame.version,
  });
}

function heroFrameSrcSet(frame, widths = UNCROPPED_HERO_WIDTHS) {
  return widths.map((w) => `${heroFrameSrc(frame, w)} ${w}w`).join(', ');
}

function UncroppedTransitionHero({ hero, transition }) {
  const [showTransition, setShowTransition] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const delayMs = transition.delayMs ?? DEFAULT_TRANSITION_DELAY_MS;

  useLightboxNavLock(isExpanded);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowTransition(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (!showTransition) return undefined;
    const frame = requestAnimationFrame(() => setTransitionVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [showTransition]);

  useEffect(() => {
    if (!isExpanded) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded]);

  const expandedSrc = heroFrameSrc(hero, 2400);

  return (
    <>
      <section className="relative w-full flex justify-center">
        <button
          type="button"
          className="relative w-full max-w-[600px] aspect-[4/3] cursor-zoom-in group text-left"
          onClick={() => setIsExpanded(true)}
          aria-label="View hero image full screen"
        >
          <img
            src={heroFrameSrc(hero, 800)}
            srcSet={heroFrameSrcSet(hero)}
            sizes={UNCROPPED_HERO_SIZES}
            alt={hero.alt}
            width={UNCROPPED_DISPLAY_WIDTH}
            height={UNCROPPED_DISPLAY_HEIGHT}
            className="absolute inset-0 w-full h-full object-contain"
            fetchPriority="high"
            decoding="sync"
          />
          {showTransition && (
            <img
              src={heroFrameSrc(transition, 800)}
              srcSet={heroFrameSrcSet(transition)}
              sizes={UNCROPPED_HERO_SIZES}
              alt={transition.alt}
              width={UNCROPPED_DISPLAY_WIDTH}
              height={UNCROPPED_DISPLAY_HEIGHT}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                transitionVisible ? 'opacity-100' : 'opacity-0'
              }`}
              fetchPriority="low"
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="pointer-events-none absolute bottom-5 right-5 rounded-full bg-black/45 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <img src={MAGNIFY_ICON} alt="" className="h-7 w-7" aria-hidden="true" />
          </span>
        </button>
      </section>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Hero image full screen"
          >
            <motion.div
              className="relative flex h-full w-full max-h-[100dvh] items-center justify-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={expandedSrc}
                alt={hero.alt}
                className="max-h-[100dvh] max-w-full object-contain"
              />
              <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white/90">
                Close
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * DIARY TREATMENT — Cinematic 90vh hero
 * Narrative weight, animated reveal.
 */
function DiaryTreatment({ hero, pageData }) {
  const theme = hero.theme;
  const heroHeight = tokens.layout.heroHeightTall || '90vh';
  
  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: heroHeight }}
    >
      {/* Hero image — visible on first paint (no opacity-0) for LCP */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.src}
          alt={hero.alt}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(0,0,0,${theme.overlayStart * 1.5}), 
              transparent, 
              rgba(28,25,23,${theme.overlayEnd})
            )`
          }}
        />
      </div>

      {/* Title content */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-[-30vh] md:mt-[-60vh]">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-handwriting drop-shadow-2xl"
            style={{ color: theme.gold }}
          >
            {pageData.title || 'Explore'}
          </h1>
          
          {pageData.subtitle && (
            <p 
              className="text-lg md:text-2xl font-bold tracking-[0.15em] uppercase mt-4"
              style={{ color: theme.textPrimary, opacity: 0.9 }}
            >
              {pageData.subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
