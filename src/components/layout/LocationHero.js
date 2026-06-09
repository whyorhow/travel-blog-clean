import React, { useEffect, useState } from 'react';
import { tokens } from '../../styles';

const MAGNIFY_ICON = `${process.env.PUBLIC_URL}/assets/Magnifyv2.svg`;
const ZOOM_HINT_VISIBLE_MS = 2000;
const ZOOM_HINT_FADE_MS = 500;

/**
 * LocationHero — Full-width hero with subtle overlay
 * 
 * Standard 60vh height with dark overlay for text legibility.
 * Used at the top of every destination page.
 * 
 * @param {string} imageSrc — Hero image URL
 * @param {string} alt — Alt text for accessibility
 * @param {number} [overlayOpacity=30] — Overlay opacity (0-100)
 * @param {string} [objectPosition='center'] — Focal point when objectFit is cover (e.g. 'left center')
 * @param {() => void} [onImageClick] — Opens a larger view when the hero is clicked
 */
function LocationHero({ imageSrc, fallbackSrc, alt, overlayOpacity = 30, objectFit = 'cover', objectPosition = 'center', onImageClick }) {
  const isContain = objectFit === 'contain';
  const isInteractive = typeof onImageClick === 'function';
  const [showZoomHint, setShowZoomHint] = useState(isInteractive);

  useEffect(() => {
    if (!isInteractive) return undefined;

    setShowZoomHint(true);
    const fadeTimer = window.setTimeout(() => setShowZoomHint(false), ZOOM_HINT_VISIBLE_MS);
    return () => window.clearTimeout(fadeTimer);
  }, [isInteractive, imageSrc]);

  return (
    <section 
      className={`relative w-full overflow-hidden flex items-center justify-center bg-black${isInteractive ? ' cursor-zoom-in' : ''}`}
      style={{ height: isContain ? 'auto' : tokens.layout.heroHeight, minHeight: isContain ? '60vh' : undefined, maxHeight: isContain ? '100vh' : undefined }}
      onClick={isInteractive ? onImageClick : undefined}
      onKeyDown={isInteractive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onImageClick(); } } : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `View larger image: ${alt}` : undefined}
    >
      {/* Blurred background fill for portrait/contain images */}
      {isContain && (
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(18px) brightness(0.5)',
          }}
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        className={`relative z-10 ${isContain ? 'w-auto h-auto max-h-screen object-contain' : 'w-full h-full object-cover'}`}
        style={!isContain ? { objectPosition } : undefined}
        onError={fallbackSrc ? (e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackSrc; } : undefined}
      />
      <div 
        className={`absolute inset-0 z-20${isInteractive ? ' pointer-events-none' : ''}`}
        style={{ 
          backgroundColor: 'rgba(0,0,0,' + (overlayOpacity / 100) + ')',
        }}
      />
      {isInteractive && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity ease-out"
          style={{
            opacity: showZoomHint ? 1 : 0,
            transitionDuration: `${ZOOM_HINT_FADE_MS}ms`,
          }}
          aria-hidden="true"
        >
          <img
            src={MAGNIFY_ICON}
            alt=""
            className="w-12 h-12 md:w-14 md:h-14"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6)) drop-shadow(0 0px 2px rgba(0,0,0,0.4))' }}
          />
        </div>
      )}
    </section>
  );
}

export default LocationHero;
