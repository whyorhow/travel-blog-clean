import React from 'react';
import { tw } from '../../styles';
import CloudinaryImage from '../CloudinaryImage';

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

const NARRATIVE_FRAME = 'rounded-md shadow-md overflow-hidden';
export const NARRATIVE_PHOTO_JOURNAL = 'saturate-[0.88] brightness-[1.03] contrast-[0.98]';

const NARRATIVE_TEXT_WRAP = 'max-w-[92%] mx-auto px-5';

function narrativeImageClass(photoClass = '') {
  return [NARRATIVE_FRAME, photoClass].filter(Boolean).join(' ');
}

function DiptychFrame({ image, alt, sizes, photoClass }) {
  return (
    <div className="narrative-diptych-cell">
      <CloudinaryImage
        legacyPath={image.src}
        alt={alt}
        sizes={sizes}
        widths={[600, 1000, 1400]}
        className={photoClass}
      />
    </div>
  );
}

/**
 * NarrativeSplit — Flexible narrative image + text block
 *
 * layout types:
 *   'split'           — default: image 1/3 + text 2/3, alternating sides
 *   'cinematic'       — full-width image, paragraph beneath, commanding space
 *   'diptych'         — two images side by side, optional short caption below
 *   'scroll-gallery'  — horizontal snap scroll on mobile, grid on desktop
 *   'insert'          — small floated image beside compact text, detail/texture weight
 */
function NarrativeSplit({
  image,
  imageB,
  images,
  heading,
  eyebrow,
  headingStyle = 'serif',
  paragraph,
  layout = 'split',
  imageLeft = true,
  variant = 'light',
  accentColor,
  photoClass = '',
  onExpand,
  sectionId,
}) {
  const galleryImages = images?.length
    ? images
    : [image, imageB].filter(Boolean);

  if (!image && !galleryImages.length) return null;

  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  const textColor = surface.text;
  const headingColor = accentColor || surface.heading;
  const imgClass = narrativeImageClass(photoClass);
  const bodyClass = variant === 'dark' || variant === 'paper'
    ? `text-base sm:text-lg md:text-xl leading-[1.7] ${textColor}`
    : `leading-relaxed ${textColor}`;
  const headingClass = headingStyle === 'handwriting'
    ? `text-2xl sm:text-3xl md:text-4xl font-bold font-handwriting ${headingColor} mb-3`
    : `text-2xl font-semibold ${headingColor} mb-4`;

  // ── SCROLL GALLERY ───────────────────────────────────────────────────────
  // Mobile: horizontal snap row. Desktop: 2- or 3-column grid.
  if (layout === 'scroll-gallery') {
    const gridCols = galleryImages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

    return (
      <section className="max-w-5xl mx-auto py-4">
        <div
          className={`flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:grid ${gridCols} md:overflow-visible md:gap-4`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={img.src || idx}
              className="flex-shrink-0 w-[72%] sm:w-[55%] md:w-auto snap-center"
            >
              <CloudinaryImage
                legacyPath={img.src}
                alt={img.alt}
                sizes="(max-width: 768px) 72vw, 33vw"
                widths={[600, 1000, 1400]}
                className={`w-full h-auto ${imgClass}`}
              />
            </div>
          ))}
        </div>
        {paragraph && (
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${textColor} ${NARRATIVE_TEXT_WRAP}`}>
            {paragraph}
          </p>
        )}
      </section>
    );
  }

  // ── CINEMATIC ──────────────────────────────────────────────────────────────
  if (layout === 'cinematic') {
    return (
      <section className="w-full mt-16 mb-8">
        <div
          className={`relative ${imgClass}${onExpand ? ' group' : ''}`}
          onClick={onExpand || undefined}
          style={onExpand ? { cursor: 'zoom-in' } : undefined}
        >
          <CloudinaryImage
            legacyPath={image.src}
            alt={image.alt}
            sizes="100vw"
            widths={[800, 1600, 2400]}
            className={`w-full h-auto block ${photoClass}`}
          />
          {onExpand && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <img
                src="/assets/Magnify.svg"
                alt=""
                aria-hidden="true"
                className="w-12 h-12 opacity-0 group-hover:opacity-90 transition-opacity duration-300 drop-shadow-lg"
              />
            </div>
          )}
        </div>
        {image.caption && (
          <div className={`pt-3 ${NARRATIVE_TEXT_WRAP}`}>
            <p className={`text-xs italic opacity-50 ${textColor}`}>{image.caption}</p>
          </div>
        )}
        {paragraph && (
          <div className={`pt-5 ${NARRATIVE_TEXT_WRAP}`}>
            <p className={`leading-relaxed ${textColor}`}>{paragraph}</p>
          </div>
        )}
      </section>
    );
  }

  // ── DIPTYCH ────────────────────────────────────────────────────────────────
  if (layout === 'diptych') {
    const diptychSizes = '(max-width: 768px) 45vw, 50vw';

    return (
      <section className="max-w-5xl mx-auto py-6 px-3 sm:px-0">
        <div className="narrative-diptych-grid">
          <DiptychFrame
            image={image}
            alt={image.alt}
            sizes={diptychSizes}
            photoClass={photoClass}
          />
          {imageB && (
            <DiptychFrame
              image={imageB}
              alt={imageB.alt}
              sizes={diptychSizes}
              photoClass={photoClass}
            />
          )}
        </div>
        {paragraph && (
          <p className={`mt-4 text-sm leading-relaxed ${textColor} opacity-80 ${NARRATIVE_TEXT_WRAP}`}>
            {paragraph}
          </p>
        )}
      </section>
    );
  }

  // ── INSERT ─────────────────────────────────────────────────────────────────
  if (layout === 'insert') {
    return (
      <section className={`max-w-4xl mx-auto pt-2 pb-4 ${NARRATIVE_TEXT_WRAP}`}>
        <div className={`flex flex-row gap-4 items-start ${!imageLeft ? 'flex-row-reverse' : ''}`}>
          <CloudinaryImage
            legacyPath={image.src}
            alt={image.alt}
            sizes="(max-width: 768px) 33vw, 25vw"
            widths={[300, 600, 900]}
            className={`w-1/3 md:w-1/4 h-auto flex-shrink-0 ${imgClass}`}
          />
          <div className="flex flex-col gap-2 justify-center">
            {paragraph && (
              <p className={`leading-relaxed ${textColor} text-sm md:text-base`}>{paragraph}</p>
            )}
            {image.caption && (
              <p className={`text-xs italic opacity-60 ${textColor}`}>{image.caption}</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── SPLIT (default) ────────────────────────────────────────────────────────
  const content = (
    <>
      <CloudinaryImage
        legacyPath={image.src}
        alt={image.alt}
        sizes="(max-width: 768px) 70vw, 33vw"
        widths={[600, 1200, 1800]}
        className={`w-[70%] mx-auto md:mx-0 md:w-1/3 h-auto ${imgClass}${onExpand ? ' hover:opacity-90 transition-opacity duration-200' : ''}`}
        onClick={onExpand || undefined}
        style={onExpand ? { cursor: 'zoom-in' } : undefined}
      />
      <div className={`md:w-2/3 ${NARRATIVE_TEXT_WRAP} md:px-0 md:max-w-none`}>
        {eyebrow && (
          <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-2 ${
            variant === 'dark'
              ? 'text-editorialGold/90'
              : variant === 'paper'
                ? 'text-[#6B5A49]'
                : 'text-stone-500'
          }`}>
            {eyebrow}
          </p>
        )}
        {heading && (
          <h3 className={headingClass}>
            {heading}
          </h3>
        )}
        {paragraph && (
          <p className={bodyClass}>
            {paragraph}
          </p>
        )}
      </div>
    </>
  );

  return (
    <section id={sectionId} className="max-w-4xl mx-auto py-8 scroll-mt-8">
      <div className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center ${!imageLeft ? 'md:flex-row-reverse' : ''}`}>
        {content}
      </div>
    </section>
  );
}

export default NarrativeSplit;
