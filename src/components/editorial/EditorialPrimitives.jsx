import React from 'react';
import { Link } from 'react-router-dom';
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

export function EditorialImage({
  image,
  className = '',
  onClick,
  rounded = 'rounded-lg',
  showCaption = true,
  objectFit = 'cover',
}) {
  if (!image?.src) return null;
  const isNatural = objectFit === 'natural';
  const imgFitClass = isNatural
    ? 'w-full h-auto'
    : objectFit === 'contain'
      ? 'w-full h-full object-contain'
      : 'w-full h-full object-cover';
  const isExternal = image.external || /^https?:\/\//.test(image.src);
  const imgEl = isExternal ? (
    <img
      src={image.src}
      alt={image.alt || ''}
      loading="lazy"
      decoding="async"
      className={`${imgFitClass} ${rounded}`}
    />
  ) : (
    <CloudinaryImage
      legacyPath={image.src}
      alt={image.alt || ''}
      className={`${imgFitClass} ${rounded}`}
      sizes={image.sizes ?? '(max-width: 768px) 90vw, 400px'}
    />
  );
  const interactive = onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : '';

  return (
    <figure className={`relative overflow-hidden ${rounded} ${interactive} ${isNatural ? '' : className}`}>
      {onClick ? (
        <button type="button" onClick={onClick} className={`block text-left ${isNatural ? 'w-full' : 'w-full h-full'}`}>
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

function editorialLinkShell(atmosphere) {
  const border = atmosphere?.containerBorder ?? 'border-stone-300/40';
  return `inline-block max-w-full rounded-md border ${border} bg-white/30 px-3.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-white/50 transition-colors`;
}

const editorialLinkText =
  'text-xs font-cormorant not-italic tracking-wide leading-snug';

export function EditorialBlockLinks({ block, atmosphere, surface }) {
  if (!block?.internalLink && !block?.link) return null;
  const inline =
    block.internalLink?.variant === 'inline' || block.link?.variant === 'inline';
  return (
    <div
      className={`${inline ? 'mt-5 pt-1' : 'mt-3'} flex flex-col items-start gap-2 not-italic`}
    >
      <EditorialInternalLink internalLink={block.internalLink} atmosphere={atmosphere} surface={surface} />
      <EditorialExternalLink link={block.link} atmosphere={atmosphere} surface={surface} />
    </div>
  );
}

export function EditorialExternalLink({ link, atmosphere, surface }) {
  const text = useEditorialSurface(surface);
  if (!link?.href) return null;
  if (link.variant === 'inline') {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm ${text.muted} underline underline-offset-[3px] decoration-stone-400/50 hover:text-stone-800 hover:decoration-stone-500/80 transition-colors`}
      >
        {link.label || 'Read more'}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${editorialLinkShell(atmosphere)} ${editorialLinkText} ${text.muted} hover:text-stone-800`}
    >
      {link.label || 'Read more'}
      <span aria-hidden="true" className="sr-only">
        (opens in new tab)
      </span>
    </a>
  );
}

export function EditorialInternalLink({ internalLink, atmosphere, surface }) {
  const text = useEditorialSurface(surface);
  if (!internalLink?.path) return null;
  if (internalLink.variant === 'inline') {
    return (
      <Link
        to={internalLink.path}
        className={`text-sm ${text.muted} underline underline-offset-[3px] decoration-stone-400/50 hover:text-stone-800 hover:decoration-stone-500/80 transition-colors`}
      >
        {internalLink.label || 'Continue reading'}
      </Link>
    );
  }
  return (
    <Link
      to={internalLink.path}
      className={`${editorialLinkShell(atmosphere)} ${editorialLinkText} ${text.muted} hover:text-stone-700`}
    >
      {internalLink.label || 'Continue reading'}
    </Link>
  );
}
