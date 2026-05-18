import React from 'react';
import { tw } from '../../styles';
import CloudinaryImage from '../CloudinaryImage';
import paperTexture from '../../assets/Backgrounds/PaperTexture.jpg';

const SURFACE_TEXT = {
  paper: {
    body: tw.surface.paper.body,
    muted: tw.surface.paper.muted,
    accent: tw.surface.paper.accent,
    heading: tw.surface.paper.subheading,
  },
  dark: {
    body: tw.surface.dark.body,
    muted: tw.surface.dark.muted,
    accent: tw.surface.dark.accent,
    heading: tw.surface.dark.heading,
  },
  light: {
    body: tw.body,
    muted: tw.textMuted,
    accent: tw.gold,
    heading: tw.subsection,
  },
};

export function useEditorialSurface(surface = 'paper') {
  return SURFACE_TEXT[surface] ?? SURFACE_TEXT.paper;
}

export function EditorialImage({ image, className = '', onClick, rounded = 'rounded-lg', showCaption = true }) {
  if (!image?.src) return null;
  const imgEl = (
    <CloudinaryImage
      legacyPath={image.src}
      alt={image.alt || ''}
      className={`w-full h-full object-cover ${rounded}`}
      sizes="(max-width: 768px) 90vw, 400px"
    />
  );
  const interactive = onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : '';

  return (
    <figure className={`relative overflow-hidden ${rounded} ${interactive} ${className}`}>
      {onClick ? (
        <button type="button" onClick={onClick} className="block w-full h-full text-left">
          {imgEl}
        </button>
      ) : (
        imgEl
      )}
      {showCaption && image.caption && (
        <figcaption className="mt-2 text-sm italic text-center opacity-80">{image.caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * Personal-layer container — warmer, journal-like, distinct from main narrative.
 */
export function PersonalContainer({
  children,
  atmosphere,
  compact = false,
  className = '',
}) {
  const pad = compact ? 'p-5 md:p-6' : 'p-6 md:p-8';

  return (
    <div
      className={`
        relative max-w-3xl mx-auto ${pad}
        ${atmosphere.containerBg} backdrop-blur-[2px]
        border ${atmosphere.containerBorder}
        rounded-xl shadow-sm overflow-hidden
        ${className}
      `}
    >
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          backgroundImage: `url(${paperTexture})`,
          backgroundSize: 'cover',
          opacity: atmosphere.textureOpacity,
          mixBlendMode: 'multiply',
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function BlockTitle({ title, subtitle, atmosphere, surface, align = 'left' }) {
  const text = useEditorialSurface(surface);
  if (!title && !subtitle) return null;
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <header className={`mb-4 ${alignClass}`}>
      {title && (
        <h3 className={`text-xl md:text-2xl font-medium font-cormorant ${atmosphere.titleAccent || text.accent}`}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p className={`text-sm mt-1 italic ${text.muted}`}>{subtitle}</p>
      )}
    </header>
  );
}

export function BlockBody({ text, surface, className = '' }) {
  const styles = useEditorialSurface(surface);
  if (!text) return null;

  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <div className={`space-y-3 ${className}`}>
      {paragraphs.map((para, i) => (
        <p key={i} className={`${styles.body} leading-relaxed`}>
          {para}
        </p>
      ))}
    </div>
  );
}

export function LocationNote({ location, surface }) {
  const text = useEditorialSurface(surface);
  if (!location) return null;
  return (
    <p className={`text-xs uppercase tracking-widest mt-3 ${text.muted}`}>
      {location}
    </p>
  );
}
