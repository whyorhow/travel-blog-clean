import React from 'react';
import { tw } from '../../styles';
import { cloudinaryImageUrl } from '../../utils/cloudinary';

/**
 * SURFACE VARIANT MAPPING
 * Maps variant prop to surface-aware typography tokens
 */
const SURFACE_MAP = {
  light: {
    text: tw.textPrimary,
    heading: tw.gold,
  },
  dark: {
    text: tw.textPrimaryDark,
    heading: tw.rio?.gold || tw.gold,
  },
  paper: {
    text: tw.surface.paper.body,
    heading: tw.surface.paper.accentHeading,
  }
};

/**
 * NarrativeSplit — Side-by-side image + story block
 * 
 * Used for deeper narrative moments after the intro.
 * Image on left, heading + paragraph on right (reversible).
 * 
 * @param {Object} image — { src, alt, width }
 * @param {string} heading — Section heading
 * @param {string} paragraph — Story text
 * @param {boolean} [imageLeft=true] — Image position (default left)
 * @param {string} [variant='light'] — 'light', 'dark', or 'paper' background
 * @param {string} [accentColor] — Override accent color for heading
 */
function NarrativeSplit({ image, heading, paragraph, imageLeft = true, variant = 'light', accentColor }) {
  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  const textColor = surface.text;
  const headingColor = accentColor || surface.heading;
  
  const content = (
    <>
      {/* Image */}
      <img
        src={cloudinaryImageUrl(image.src, { width: image.width || 1200 })}
        alt={image.alt}
        className={`w-full md:w-1/3 ${tw.image}`}
      />
      
      {/* Text */}
      <div className="md:w-2/3">
        <h3 className={`text-2xl font-semibold ${headingColor} mb-4`}>
          {heading}
        </h3>
        <p className={`leading-relaxed ${textColor}`}>
          {paragraph}
        </p>
      </div>
    </>
  );

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className={`flex flex-col md:flex-row gap-10 items-center ${!imageLeft ? 'md:flex-row-reverse' : ''}`}>
        {content}
      </div>
    </section>
  );
}

export default NarrativeSplit;
