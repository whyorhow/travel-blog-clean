import React from 'react';
import { tw, tokens } from '../../styles';
import CloudinaryImage from '../CloudinaryImage';

/**
 * SURFACE VARIANT MAPPING
 * Maps variant prop to surface-aware typography tokens
 */
const SURFACE_MAP = {
  light: {
    textPrimary: tw.textPrimary,
    textSecondary: tw.textSecondary,
    textTertiary: tw.textTertiary,
    titleColor: tw.gold,
    captionColor: tw.textMuted,
  },
  dark: {
    textPrimary: tw.textPrimaryDark,
    textSecondary: tw.textSecondaryDark,
    textTertiary: tw.textTertiaryDark,
    titleColor: tw.rio.gold,
    captionColor: tw.textTertiaryDark,
  },
  paper: {
    textPrimary: tw.surface.paper.body,
    textSecondary: tw.surface.paper.lead,
    textTertiary: tw.surface.paper.muted,
    titleColor: tw.surface.paper.accentHeading,
    captionColor: tw.surface.paper.muted,
  }
};

/**
 * IntroGrid — Two-column introduction layout
 * 
 * Left: Title + narrative text (2/3 width)
 * Right: Context image with caption (1/3 width)
 * 
 * @param {string} title — Page title (gold accent color)
 * @param {string[]} paragraphs — Array of intro paragraphs
 * @param {Object} sidebarImage — { src, alt, caption } for right column
 * @param {string} [sidebarImage.src] — Image path (passes through cloudinaryUrlFromLegacyPath)
 * @param {string} [sidebarImage.alt] — Image alt text
 * @param {string} [sidebarImage.caption] — Small caption below image
 * @param {string} [variant='light'] — 'light' or 'dark' background
 * @param {string} [accentColor] — Override accent color for title
 */
function IntroGrid({ title, paragraphs, sidebarImage, variant = 'light', accentColor, sectionId }) {
  // Use surface-aware mapping or fall back to default
  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  
  const textPrimary = surface.textPrimary;
  const textSecondary = surface.textSecondary;
  const textTertiary = surface.textTertiary;
  const captionColor = surface.captionColor;
  const titleColor = accentColor || surface.titleColor;
  
  // Mobile-first readable sizes on paper / dark surfaces
  const readableSurface = variant === 'dark' || variant === 'paper';
  const leadClass = readableSurface
    ? `text-lg sm:text-xl md:text-2xl leading-[1.65] ${textSecondary}`
    : `text-xl md:text-2xl leading-relaxed ${textSecondary}`;
  const bodyClass = readableSurface
    ? `text-base sm:text-lg md:text-xl leading-[1.7] ${textTertiary}`
    : `text-lg md:text-xl leading-relaxed ${textTertiary}`;
  
  return (
    <section id={sectionId} className="max-w-5xl mx-auto px-6 md:px-12 py-6 scroll-mt-8">
      {/* Title */}
      <h1 className={`text-4xl md:text-5xl font-semibold ${titleColor} mb-10`}>
        {title}
      </h1>

      {/* Two-column grid */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Text column */}
        <div className={`md:w-2/3 space-y-6 ${textPrimary}`}>
          {paragraphs.map((text, index) => (
            <p 
              key={index}
              className={index === 0 ? leadClass : bodyClass}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Image column */}
        {sidebarImage && (
          <div className="md:w-1/3 w-full">
            <div className={`relative overflow-hidden ${tw.image}`}>
              <CloudinaryImage
                legacyPath={sidebarImage.src}
                alt={sidebarImage.alt}
                sizes="(max-width: 768px) 100vw, 33vw"
                widths={[400, 800, 1200]}
                className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
              <div className="absolute inset-0" style={{ backgroundColor: tokens.colors.overlay.imageTone }} />
            </div>
            {sidebarImage.caption && (
              <p className={`text-xs leading-snug ${captionColor} mt-2`}>
                {sidebarImage.caption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default IntroGrid;
