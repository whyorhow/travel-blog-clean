import React from 'react';
import { tw } from '../../styles';
import CloudinaryImage from '../CloudinaryImage';

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
    ? `text-base sm:text-lg md:text-xl leading-[1.8] ${textColor}`
    : `leading-[1.8] ${textColor}`;
  const headingClass = headingStyle === 'handwriting'
    ? `text-2xl sm:text-3xl md:text-4xl font-bold font-handwriting ${headingColor} mb-3`
    : `text-2xl font-semibold ${headingColor} mb-4`;

  // ── SCROLL GALLERY ───────────────────────────────────────────────────────
  if (layout === 'scroll-gallery') {
    const gridCols = galleryImages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
    return (
      <section className="max-w-5xl mx-auto py-6">
        <div
          className={`flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:grid ${gridCols} md:overflow-visible md:gap-4`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryImages.map((img, idx) => (
            <div key={img.src || idx} className="flex-shrink-0 w-[72%] sm:w-[55%] md:w-auto snap-center">
              <CloudinaryImage legacyPath={img.src} alt={img.alt} sizes="(max-width: 768px) 72vw, 33vw" widths={[600, 1000, 1400]} className={`w-full h-auto ${imgClass}`} />
            </div>
          ))}
        </div>
        {paragraph && <p className={`mt-5 text-sm sm:text-base leading-[1.8] ${textColor} ${NARRATIVE_TEXT_WRAP}`}>{paragraph}</p>}
      </section>
    );
  }

  // ── CINEMATIC ──────────────────────────────────────────────────────────────
  if (layout === 'cinematic') {
    return (
      <section className="w-full my-24">
        <div className={`relative ${imgClass}${onExpand ? ' group' : ''}`} onClick={onExpand || undefined} style={onExpand ? { cursor: 'zoom-in' } : undefined}>
          <CloudinaryImage legacyPath={image.src} alt={image.alt} sizes="100vw" widths={[800, 1600, 2400]} className={`w-full h-auto block object-cover ${photoClass}`} />
          {onExpand && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <img src="/assets/Magnify.svg" alt="" aria-hidden="true" className="w-12 h-12 opacity-0 group-hover:opacity-90 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          )}
        </div>
        {image.caption && <div className={`pt-4 ${NARRATIVE_TEXT_WRAP}`}><p className={`text-xs italic opacity-50 ${textColor}`}>{image.caption}</p></div>}
        {paragraph && <div className={`pt-6 ${NARRATIVE_TEXT_WRAP}`}><p className={`text-lg sm:text-xl leading-[1.8] ${textColor}`}>{paragraph}</p></div>}
      </section>
    );
  }

  // ── FEATURE IMAGE (full-width atmospheric with caption) ───────────────────
  if (layout === 'feature-image') {
    return (
      <figure className="feature-image w-full my-16">
        <div className={`relative ${imgClass} shadow-lg`}>
          <CloudinaryImage legacyPath={image.src} alt={image.alt} sizes="100vw" widths={[800, 1600, 2400]} className={`w-full h-auto object-cover ${photoClass}`} />
        </div>
        {image.caption && (
          <figcaption className="max-w-3xl mx-auto px-6 pt-4">
            <p className={`text-sm italic text-center ${textColor} opacity-70`}>{image.caption}</p>
          </figcaption>
        )}
      </figure>
    );
  }

  // ── DIPTYCH ───────────────────────────────────────────────────────────────
  if (layout === 'diptych') {
    const diptychSizes = '(max-width: 768px) 45vw, 50vw';
    return (
      <section className="max-w-5xl mx-auto py-6 px-3 sm:px-0">
        <div className="narrative-diptych-grid">
          <DiptychFrame image={image} alt={image.alt} sizes={diptychSizes} photoClass={photoClass} />
          {imageB && <DiptychFrame image={imageB} alt={imageB.alt} sizes={diptychSizes} photoClass={photoClass} />}
        </div>
        {paragraph && <p className={`mt-5 text-sm leading-[1.8] ${textColor} opacity-80 ${NARRATIVE_TEXT_WRAP}`}>{paragraph}</p>}
      </section>
    );
  }

  // ── PATTERN A: Editorial Spread (text left 55%, image right 40%) ──────────
  if (layout === 'editorial-split') {
    const cardBg = imageLeft ? 'bg-stone-50/70' : 'bg-stone-100/60';
    const imageWidth = imageLeft ? 'md:w-[40%]' : 'md:w-[40%] md:ml-auto';
    const textWidth = imageLeft ? 'md:w-[55%]' : 'md:w-[55%]';
    const textPadding = imageLeft ? 'md:pl-10 lg:pl-14' : 'md:pr-10 lg:pr-14';

    return (
      <section className={`editorial-split max-w-6xl mx-auto my-20 ${cardBg} backdrop-blur-sm`}>
        <div className="flex flex-col md:flex-row gap-8 md:gap-0">
          <div className={`${imageWidth} w-full ${!imageLeft ? 'md:order-2' : ''}`}>
            <div className={`relative ${imgClass} shadow-lg mx-4 md:mx-0`}>
              <CloudinaryImage
                legacyPath={image.src}
                alt={image.alt}
                sizes="(max-width: 768px) 100vw, 40vw"
                widths={[600, 1200, 1800]}
                className={`w-full h-auto object-cover ${photoClass}`}
                onClick={onExpand || undefined}
                style={onExpand ? { cursor: 'zoom-in' } : undefined}
              />
            </div>
          </div>
          <div className={`${textWidth} w-full flex items-center px-6 md:px-8 py-10 md:py-14 ${textPadding}`}>
            <div>
              {eyebrow && (
                <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-4 ${
                  variant === 'dark' ? 'text-editorialGold/90' : variant === 'paper' ? 'text-[#6B5A49]' : 'text-stone-500'
                }`}>{eyebrow}</p>
              )}
              {heading && <h3 className={`${headingClass} mb-6`}>{heading}</h3>}
              {paragraph && <p className={`${bodyClass} text-lg sm:text-xl md:text-[1.15rem] leading-[1.8] mb-0`}>{paragraph}</p>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── PATTERN B: Asymmetric Focus (text full width, image below offset) ─────
  if (layout === 'asymmetric-focus') {
    const offsetDirection = imageLeft ? 'md:ml-[10%] md:mr-auto' : 'md:mr-[10%] md:ml-auto';
    const aspectClass = imageLeft ? 'aspect-[3/4]' : 'aspect-[4/3]';

    return (
      <section className="asymmetric-focus max-w-5xl mx-auto my-24">
        {paragraph && (
          <div className="max-w-3xl mx-auto px-6 mb-10">
            {eyebrow && (
              <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-4 ${
                variant === 'dark' ? 'text-editorialGold/90' : variant === 'paper' ? 'text-[#6B5A49]' : 'text-stone-500'
              }`}>{eyebrow}</p>
            )}
            {heading && <h3 className={`${headingClass} mb-6`}>{heading}</h3>}
            <p className={`${bodyClass} text-lg sm:text-xl leading-[1.8]`}>{paragraph}</p>
          </div>
        )}
        <div className={`w-full ${offsetDirection} max-w-[70%]`}>
          <div className={`relative ${imgClass} shadow-xl ${aspectClass}`}>
            <CloudinaryImage
              legacyPath={image.src}
              alt={image.alt}
              sizes="(max-width: 768px) 100vw, 60vw"
              widths={[600, 1200, 1800]}
              className={`w-full h-full object-cover ${photoClass}`}
              onClick={onExpand || undefined}
              style={onExpand ? { cursor: 'zoom-in' } : undefined}
            />
          </div>
          {image.caption && (
            <div className="max-w-[90%] mx-auto md:mx-0 pt-3">
              <p className={`text-xs italic ${textColor} opacity-60`}>{image.caption}</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── PATTERN C: Immersive Break (full-width image with text above/below) ───
  if (layout === 'immersive-break') {
    return (
      <section className="immersive-break w-full my-28">
        {paragraph && (
          <div className="max-w-3xl mx-auto px-6 mb-10 text-center">
            {eyebrow && (
              <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-4 ${
                variant === 'dark' ? 'text-editorialGold/90' : variant === 'paper' ? 'text-[#6B5A49]' : 'text-stone-500'
              }`}>{eyebrow}</p>
            )}
            {heading && <h3 className={`${headingClass} mb-6`}>{heading}</h3>}
            <p className={`${bodyClass} text-lg sm:text-xl leading-[1.8]`}>{paragraph}</p>
          </div>
        )}
        <div className={`relative ${imgClass} shadow-2xl`}>
          <CloudinaryImage
            legacyPath={image.src}
            alt={image.alt}
            sizes="100vw"
            widths={[800, 1600, 2400]}
            className={`w-full h-auto object-cover ${photoClass}`}
            onClick={onExpand || undefined}
            style={onExpand ? { cursor: 'zoom-in' } : undefined}
          />
        </div>
        {image.caption && (
          <div className="max-w-3xl mx-auto px-6 pt-4">
            <p className={`text-sm italic text-center ${textColor} opacity-70`}>{image.caption}</p>
          </div>
        )}
      </section>
    );
  }

  // ── PATTERN D: Split Offset (image left, text right, tall portrait) ───────
  if (layout === 'split-offset') {
    return (
      <section className="split-offset max-w-6xl mx-auto my-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="md:w-[45%] w-full">
            <div className={`relative ${imgClass} shadow-lg aspect-[2/3]`}>
              <CloudinaryImage
                legacyPath={image.src}
                alt={image.alt}
                sizes="(max-width: 768px) 100vw, 45vw"
                widths={[600, 1200, 1800]}
                className={`w-full h-full object-cover ${photoClass}`}
                onClick={onExpand || undefined}
                style={onExpand ? { cursor: 'zoom-in' } : undefined}
              />
            </div>
          </div>
          <div className="md:w-[55%] w-full md:pl-8 lg:pl-12">
            {eyebrow && (
              <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-4 ${
                variant === 'dark' ? 'text-editorialGold/90' : variant === 'paper' ? 'text-[#6B5A49]' : 'text-stone-500'
              }`}>{eyebrow}</p>
            )}
            {heading && <h3 className={`${headingClass} mb-6`}>{heading}</h3>}
            {paragraph && <p className={`${bodyClass} text-lg sm:text-xl md:text-[1.15rem] leading-[1.8]`}>{paragraph}</p>}
          </div>
        </div>
      </section>
    );
  }

  // ── PATTERN C: Floated Material Inset (text wraps around floated image) ───────
  if (layout === 'float-inset') {
    return (
      <section className="float-inset max-w-[1000px] mx-auto my-16 px-6 md:px-4">
        <div className="berlin-float-inset" style={{ position: 'relative' }}>
          <div
            className="float-inset-img"
            style={{ float: 'right', width: '38%', marginLeft: '2rem', marginBottom: '2rem' }}
          >
            <div className={`relative ${imgClass} shadow-lg`}>
              <CloudinaryImage
                legacyPath={image.src}
                alt={image.alt}
                sizes="(max-width: 768px) 100vw, 38vw"
                widths={[600, 1200, 1800]}
                className={`w-full h-auto object-cover ${photoClass}`}
                onClick={onExpand || undefined}
                style={onExpand ? { cursor: 'zoom-in' } : undefined}
              />
            </div>
            {image.caption && (
              <p className={`text-xs italic mt-2 ${textColor} opacity-60`}>{image.caption}</p>
            )}
          </div>
          {eyebrow && (
            <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-4 ${
              variant === 'dark' ? 'text-editorialGold/90' : variant === 'paper' ? 'text-[#6B5A49]' : 'text-stone-500'
            }`}>{eyebrow}</p>
          )}
          {heading && <h3 className={headingClass}>{heading}</h3>}
          {paragraph && <p className={`${bodyClass} text-[1.15rem] leading-[1.8]`}>{paragraph}</p>}
        </div>
      </section>
    );
  }

  // ── INSERT ─────────────────────────────────────────────────────────────────
  if (layout === 'insert') {
    return (
      <section className={`max-w-5xl mx-auto pt-4 pb-6 ${NARRATIVE_TEXT_WRAP}`}>
        <div className={`flex flex-row gap-6 items-start ${!imageLeft ? 'flex-row-reverse' : ''}`}>
          <CloudinaryImage
            legacyPath={image.src}
            alt={image.alt}
            sizes="(max-width: 768px) 33vw, 25vw"
            widths={[300, 600, 900]}
            className={`w-1/3 md:w-1/4 h-auto flex-shrink-0 ${imgClass}`}
          />
          <div className="flex flex-col gap-3 justify-center">
            {paragraph && <p className={`leading-[1.8] ${textColor} text-base md:text-lg`}>{paragraph}</p>}
            {image.caption && <p className={`text-xs italic opacity-60 ${textColor}`}>{image.caption}</p>}
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
        className={`w-[70%] mx-auto md:mx-0 md:w-1/3 h-auto object-cover ${imgClass}${onExpand ? ' hover:opacity-90 transition-opacity duration-200' : ''}`}
        onClick={onExpand || undefined}
        style={onExpand ? { cursor: 'zoom-in' } : undefined}
      />
      <div className={`md:w-2/3 ${NARRATIVE_TEXT_WRAP} md:px-0 md:max-w-none`}>
        {eyebrow && (
          <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-2 ${
            variant === 'dark' ? 'text-editorialGold/90' : variant === 'paper' ? 'text-[#6B5A49]' : 'text-stone-500'
          }`}>{eyebrow}</p>
        )}
        {heading && <h3 className={headingClass}>{heading}</h3>}
        {paragraph && <p className={`${bodyClass} leading-[1.8]`}>{paragraph}</p>}
      </div>
    </>
  );

  return (
    <section id={sectionId} className="max-w-5xl mx-auto py-10 scroll-mt-8">
      <div className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center ${!imageLeft ? 'md:flex-row-reverse' : ''}`}>{content}</div>
    </section>
  );
}

export default NarrativeSplit;