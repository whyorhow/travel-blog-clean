import React from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../../styles';
import { resolveHero } from '../../system/resolvers/resolveHero';

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
  return <LocationTreatment hero={hero} />;
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
        className="absolute inset-0 bg-gradient-to-b from-stone-800 via-stone-900 to-stone-950"
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
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest text-stone-500 border border-stone-700 rounded">
            Destination
          </span>
        </div>
        
        {/* Title: reduced scale vs Full Hero */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-300 font-handwriting">
          {title}
        </h1>
        
        {/* Subtle divider line */}
        <div className="w-16 h-px bg-stone-600 mx-auto mt-4 mb-3" />
        
        {/* Optional subtitle or default context */}
        <p className="text-stone-500 text-sm tracking-wide">
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
function LocationTreatment({ hero }) {
  const theme = hero.theme;
  
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ height: tokens.layout.heroHeight }}
    >
      <img
        src={hero.src}
        alt={hero.alt}
        className="w-full h-full object-cover"
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
      {/* Animated image container */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src={hero.src}
          alt={hero.alt}
          className="w-full h-full object-cover"
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
      </motion.div>

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
