import React from 'react';
import { tw } from '../../styles';

/**
 * SURFACE VARIANT MAPPING
 */
const SURFACE_MAP = {
  light: { text: tw.textMuted },
  dark: { text: tw.textMuted }, // muted works on both light/dark
  paper: { text: tw.surface.paper.subtle }, // warmer, more subtle on paper
};

/**
 * BridgeQuote — Centered transitional breathing room
 * 
 * Creates emotional continuity between major sections.
 * This is the moment that makes Nomad Scribbles feel authored.
 * 
 * Max 1x per page. Use between intro and deep content.
 * 
 * @param {string} quote — Reflective transitional text
 * @param {boolean} [useHandwriting=false] — Use handwriting font (LIMITED: only 1 per page)
 * @param {string} [variant='light'] — 'light', 'dark', or 'paper' background
 */
function BridgeQuote({ quote, useHandwriting = false, variant = 'light' }) {
  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  const textColor = surface.text;
  
  return (
    <section className="text-center py-12 px-6">
      <p 
        className={`italic max-w-2xl mx-auto ${textColor} ${
          variant === 'dark' || variant === 'paper'
            ? 'text-base sm:text-lg md:text-xl leading-[1.7]'
            : 'text-xl leading-relaxed'
        } ${useHandwriting ? 'font-handwriting' : ''}`}
      >
        {quote}
      </p>
    </section>
  );
}

export default BridgeQuote;
