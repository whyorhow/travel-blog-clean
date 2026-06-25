import React from 'react';
import { tw, tokens } from '../../styles';

/**
 * SURFACE VARIANT MAPPING
 */
const SURFACE_MAP = {
  light: {
    text: tw.textTertiary,
    gold: tokens.colors.gold,
  },
  dark: {
    text: tw.textSecondaryDark,
    gold: tokens.colors.rio?.gold || tokens.colors.gold,
  },
  paper: {
    text: tw.surface.paper.body,
    gold: '#8C6A2A', // Muted paper gold (matches tw.surface.paper.accent)
  },
};

/**
 * ReflectiveClose — Emotional landing at page end
 * 
 * Highlighted block with gold left border.
 * Memorable concluding moment.
 * 
 * @param {string} text — Closing reflection
 * @param {boolean} [useHandwriting=false] — Use handwriting font (only if not used elsewhere on page)
 * @param {string} [variant='light'] — 'light', 'dark', or 'paper' background
 * @param {string} [accentColor] — Override accent color (defaults to surface gold)
 */
function ReflectiveClose({ text, useHandwriting = false, variant = 'light', accentColor }) {
  if (!text?.trim()) return null;

  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  const gold = accentColor || surface.gold;
  const textColor = surface.text;
  const bgStyle = { backgroundColor: `${gold}1A` }; // 10% opacity hex
  const borderStyle = { borderLeft: `4px solid ${gold}` };
  
  return (
    <section className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="p-6 rounded-lg" style={{ ...bgStyle, ...borderStyle }}>
        <p className={`${textColor} ${
          variant === 'dark' || variant === 'paper'
            ? 'text-base sm:text-lg md:text-xl leading-[1.7]'
            : 'text-lg md:text-xl leading-relaxed'
        } ${useHandwriting ? 'font-handwriting' : ''}`}>
          {text}
        </p>
      </div>
    </section>
  );
}

export default ReflectiveClose;
