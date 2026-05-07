import React from 'react';
import { tokens } from '../../styles';

/**
 * LocationHero — Full-width hero with subtle overlay
 * 
 * Standard 60vh height with dark overlay for text legibility.
 * Used at the top of every destination page.
 * 
 * @param {string} imageSrc — Hero image URL
 * @param {string} alt — Alt text for accessibility
 * @param {number} [overlayOpacity=30] — Overlay opacity (0-100)
 */
function LocationHero({ imageSrc, alt, overlayOpacity = 30 }) {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ height: tokens.layout.heroHeight }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: 'rgba(0,0,0,' + (overlayOpacity / 100) + ')',
        }}
      />
    </section>
  );
}

export default LocationHero;
