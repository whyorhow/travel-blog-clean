import React from 'react';
import { tw } from '../../styles';

/**
 * SURFACE VARIANT MAPPING
 */
const SURFACE_MAP = {
  light: { text: tw.textTertiary },
  dark: { text: tw.textSecondaryDark },
  paper: { text: tw.surface.paper.muted },
};

/**
 * RhythmInsert — Brief atmospheric moment
 * 
 * Short paragraph (2-3 lines) that creates pacing.
 * Used after narrative blocks, before transitions.
 * Understated, observational tone.
 * 
 * @param {string} text — Atmospheric observation
 * @param {string} [align='left'] — Text alignment ('left', 'center')
 * @param {string} [variant='light'] — 'light', 'dark', or 'paper' background
 */
function RhythmInsert({ text, align = 'left', variant = 'light' }) {
  const alignClass = align === 'center' ? 'text-center' : '';
  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  const textColor = surface.text;
  
  const readableSurface = variant === 'dark' || variant === 'paper';
  
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <p className={`font-medium italic ${alignClass} ${
        readableSurface
          ? `text-lg sm:text-xl md:text-2xl leading-[1.65] ${textColor}`
          : `text-xl md:text-2xl leading-relaxed ${textColor}`
      }`}>
        {text}
      </p>
    </section>
  );
}

export default RhythmInsert;
