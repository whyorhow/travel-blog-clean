import React from 'react';
import { motion } from 'framer-motion';
import { tokens, tw } from '../../styles';

/**
 * DiaryHero — Narrative-driven hero for emotional destinations
 * 
 * Extends LocationHero with atmospheric overlay and editorial title treatment.
 * Used for destinations where the hero itself tells part of the story.
 * 
 * Differences from LocationHero:
 * - Cinematic height (90vh vs 60vh)
 * - Animated title reveal
 * - Handwritten font option
 * - Gradient overlay for mood
 * - Optional subtitle
 * 
 * Fallback rule: If themed variant unavailable, use LocationHero.
 * 
 * @param {string} imageSrc — Hero image URL
 * @param {string} alt — Alt text
 * @param {string} title — Page title (displayed on hero)
 * @param {string} [subtitle] — Optional subtitle/tagline
 * @param {string} [accentColor] — Title color (defaults to tokens.gold)
 * @param {boolean} [useHandwriting=true] — Use handwriting font for title
 * @param {number} [height] — Override height (defaults to 90vh)
 * @param {number} [overlayOpacity=30] — Base overlay opacity
 */
function DiaryHero({ 
  imageSrc, 
  alt, 
  title, 
  subtitle,
  accentColor,
  useHandwriting = true,
  height,
  overlayOpacity = 30 
}) {
  const heroHeight = height || tokens.layout.heroHeightTall || '90vh';
  const titleColor = accentColor || tw.gold;
  
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
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay for cinematic effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity / 100 * 0.5}), transparent, rgba(28,25,23,0.8))`
          }}
        />
      </motion.div>

      {/* Title content with negative margin overlap */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-[-30vh] md:mt-[-60vh]">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold ${titleColor} ${useHandwriting ? 'font-handwriting' : ''} drop-shadow-2xl`}>
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-2xl font-bold tracking-[0.15em] uppercase text-stone-200 opacity-90 mt-4">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default DiaryHero;
