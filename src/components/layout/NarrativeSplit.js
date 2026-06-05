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

/**
 * NarrativeSplit — Flexible narrative image + text block
 *
 * layout types:
 *   'split'     — default: image 1/3 + text 2/3, alternating sides
 *   'cinematic' — full-width image, paragraph beneath, commanding space
 *   'diptych'   — two images side by side, optional short caption below
 *   'insert'    — small floated image beside compact text, detail/texture weight
 *
 * @param {Object}  image      — { src, alt, width } (split/cinematic/insert)
 * @param {Object}  imageB     — { src, alt } second image (diptych only)
 * @param {string}  heading    — Section heading (split only)
 * @param {string}  paragraph  — Story text
 * @param {string}  [layout='split']
 * @param {boolean} [imageLeft=true]
 * @param {string}  [variant='light']
 * @param {string}  [accentColor]
 */
function NarrativeSplit({ image, imageB, heading, paragraph, layout = 'split', imageLeft = true, variant = 'light', accentColor, onExpand, sectionId }) {
  if (!image) return null;

  const surface = SURFACE_MAP[variant] || SURFACE_MAP.light;
  const textColor = surface.text;
  const headingColor = accentColor || surface.heading;

  // ── CINEMATIC ──────────────────────────────────────────────────────────────
  // Full-width on all screen sizes, but shorter max-height on mobile
  if (layout === 'cinematic') {
    return (
      <section className="w-full mt-16 mb-8">
        <div
          className={`relative overflow-hidden${onExpand ? ' group' : ''}`}
          onClick={onExpand || undefined}
          style={onExpand ? { cursor: 'zoom-in' } : undefined}
        >
          <CloudinaryImage
            legacyPath={image.src}
            alt={image.alt}
            sizes="100vw"
            widths={[800, 1600, 2400]}
            className="w-full object-cover"
            style={{ maxHeight: 'clamp(200px, 40vw, 520px)' }}
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
          <div className="max-w-3xl mx-auto px-6 pt-3">
            <p className={`text-xs italic opacity-50 ${textColor}`}>{image.caption}</p>
          </div>
        )}
        {paragraph && (
          <div className="max-w-3xl mx-auto px-6 pt-5">
            <p className={`leading-relaxed ${textColor}`}>{paragraph}</p>
          </div>
        )}
      </section>
    );
  }

  // ── DIPTYCH ────────────────────────────────────────────────────────────────
  // Desktop: side by side. Mobile: stacked but each image capped at 80% width,
  // centred — preserves the "pair" feel rather than filling the screen edge-to-edge.
  if (layout === 'diptych') {
    return (
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-4">
          <CloudinaryImage
            legacyPath={image.src}
            alt={image.alt}
            sizes="(max-width: 768px) 80vw, 50vw"
            widths={[600, 1000, 1400]}
            className={`w-4/5 md:w-1/2 object-cover ${tw.image}`}
          />
          {imageB && (
            <CloudinaryImage
              legacyPath={imageB.src}
              alt={imageB.alt}
              sizes="(max-width: 768px) 80vw, 50vw"
              widths={[600, 1000, 1400]}
              className={`w-4/5 md:w-1/2 object-cover ${tw.image}`}
            />
          )}
        </div>
        {paragraph && (
          <p className={`mt-4 text-sm leading-relaxed ${textColor} opacity-80`}>{paragraph}</p>
        )}
      </section>
    );
  }

  // ── INSERT ─────────────────────────────────────────────────────────────────
  // On mobile: image floats at 1/3 width inline beside text — never full-width.
  // This preserves the "small detail" weight on all screen sizes.
  if (layout === 'insert') {
    return (
      <section className="max-w-4xl mx-auto px-6 pt-2 pb-4">
        <div className={`flex flex-row gap-4 items-start ${!imageLeft ? 'flex-row-reverse' : ''}`}>
          <CloudinaryImage
            legacyPath={image.src}
            alt={image.alt}
            sizes="(max-width: 768px) 33vw, 25vw"
            widths={[300, 600, 900]}
            className={`w-1/3 md:w-1/4 object-cover flex-shrink-0 ${tw.image}`}
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
  // On mobile: image capped at 70% width, centred above text — not edge-to-edge.
  const content = (
    <>
      <CloudinaryImage
        legacyPath={image.src}
        alt={image.alt}
        sizes="(max-width: 768px) 70vw, 33vw"
        widths={[600, 1200, 1800]}
        className={`w-[70%] mx-auto md:mx-0 md:w-1/3 ${tw.image}${onExpand ? ' hover:opacity-90 transition-opacity duration-200' : ''}`}
        onClick={onExpand || undefined}
        style={onExpand ? { cursor: 'zoom-in' } : undefined}
      />
      <div className="md:w-2/3">
        {heading && (
          <h3 className={`text-2xl font-semibold ${headingColor} mb-4`}>
            {heading}
          </h3>
        )}
        {paragraph && (
          <p className={`leading-relaxed ${textColor}`}>
            {paragraph}
          </p>
        )}
      </div>
    </>
  );

  return (
    <section id={sectionId} className="max-w-4xl mx-auto px-6 py-8 scroll-mt-8">
      <div className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center ${!imageLeft ? 'md:flex-row-reverse' : ''}`}>
        {content}
      </div>
    </section>
  );
}

export default NarrativeSplit;
