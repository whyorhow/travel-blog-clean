import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cloudinaryImageUrl } from '../utils/cloudinary';
import { useLightboxNavLock } from '../hooks/useLightboxNavLock';
import { scrollToAnchorId } from '../utils/scrollToAnchor';

const MAGNIFY_SRC = '/assets/Magnifyv2.svg';
const CLOSE_SRC = '/assets/crossv2.svg';

/** Torn-edge clip: jagged only on top/bottom, straight on left/right. */
const TOP_TORN = [
  [0, 0], [30, 12], [60, 20], [90, 8], [120, 16], [150, 24], [180, 2],
  [210, 10], [240, 18], [270, 12], [300, 20], [330, 28], [360, 6],
  [390, 14], [420, 22], [450, 8], [480, 16], [510, 24], [540, 2],
  [570, 10], [600, 18], [630, 12], [660, 20], [690, 28], [720, 6],
  [750, 14], [780, 22], [810, 10], [840, 18], [870, 26], [900, 4],
  [930, 12], [960, 20], [990, 8], [1020, 16], [1050, 24], [1080, 6],
  [1110, 14], [1140, 22], [1170, 8], [1200, 0],
];

const BOTTOM_TORN = [
  [1200, 10], [1170, 18], [1140, 26], [1110, 18], [1080, 10], [1050, 28],
  [1020, 20], [990, 16], [960, 24], [930, 14], [900, 22], [870, 30],
  [840, 18], [810, 10], [780, 26], [750, 18], [720, 20], [690, 28],
  [660, 14], [630, 6], [600, 22], [570, 14], [540, 24], [510, 16],
  [480, 10], [450, 18], [420, 26], [390, 14], [360, 22], [330, 30],
  [300, 18], [270, 10], [240, 26], [210, 18], [180, 20], [150, 28],
  [120, 10], [90, 18], [60, 26], [30, 12], [0, 20],
];

const clipPctX = (x) => ((x / 1200) * 100).toFixed(3);
const clipTopY = (y) => ((y / 40) * 4).toFixed(3);
const clipBottomY = (y) => (100 - (y / 40) * 4).toFixed(3);

const MAP_TORN_CLIP_PATH = [
  '0% 0%',
  ...TOP_TORN.slice(1, -1).map(([x, y]) => `${clipPctX(x)}% ${clipTopY(y)}%`),
  '100% 0%',
  '100% 100%',
  ...BOTTOM_TORN.slice(1, -1).map(([x, y]) => `${clipPctX(x)}% ${clipBottomY(y)}%`),
  '0% 100%',
].join(', ');

const TORN_EDGE_DROP_SHADOW =
  'drop-shadow(0 2px 4px rgba(28, 25, 23, 0.12)) drop-shadow(0 6px 14px rgba(28, 25, 23, 0.07))';

/** Map width (px) used when tuning hotspot offsetX / offsetY values. */
export const HOTSPOT_TUNE_WIDTH = 920;

/** Magnifier lens sits left of the SVG viewBox centre (hotspots render at 44px). */
const MAGNIFIER_OPTICAL_OFFSET_X = 7;

function parseRouteTo(to) {
  const hashIndex = to.indexOf('#');
  if (hashIndex === -1) return to;
  return {
    pathname: to.slice(0, hashIndex),
    hash: to.slice(hashIndex),
  };
}

function MapHotspotMarker({ hotspot, markerStyle, largeIcons = false }) {
  if (markerStyle === 'number' && hotspot.number != null) {
    return (
      <span
        className={
          largeIcons
            ? 'flex h-9 w-9 items-center justify-center rounded-full border-2 border-editorialGold bg-white/95 font-cormorant text-lg font-semibold text-stone-900 shadow-[0_2px_8px_rgba(0,0,0,0.35)] pointer-events-none'
            : 'flex h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 items-center justify-center rounded-full border-2 border-editorialGold bg-white/95 font-cormorant text-xs sm:text-sm md:text-lg font-semibold text-stone-900 shadow-[0_2px_8px_rgba(0,0,0,0.35)] pointer-events-none'
        }
        aria-hidden
      >
        {hotspot.number}
      </span>
    );
  }

  return (
    <img
      src={MAGNIFY_SRC}
      alt=""
      width={44}
      height={44}
      className={
        largeIcons
          ? 'w-11 h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] pointer-events-none'
          : 'w-6 h-6 sm:w-7 sm:h-7 md:w-11 md:h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] pointer-events-none'
      }
      aria-hidden
    />
  );
}

function runAfterOverlayCloses(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}

function MapHotspotLink({
  hotspot,
  onOpenInfo,
  markerStyle = 'magnifier',
  largeIcons = false,
  onBeforeNavigate,
  mapWidth = HOTSPOT_TUNE_WIDTH,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const offsetScale = mapWidth / HOTSPOT_TUNE_WIDTH;
  const offsetX = (hotspot.offsetX ?? 0) * offsetScale;
  const offsetY = (hotspot.offsetY ?? 0) * offsetScale;
  const opticalX = markerStyle === 'magnifier' ? MAGNIFIER_OPTICAL_OFFSET_X : 0;
  const style = {
    left: offsetX ? `calc(${hotspot.left}% + ${offsetX}px)` : `${hotspot.left}%`,
    top: offsetY ? `calc(${hotspot.top}% + ${offsetY}px)` : `${hotspot.top}%`,
    transform: `translate(calc(-50% + ${opticalX}px), -50%)`,
  };

  const className =
    'absolute z-10 flex items-center justify-center min-w-[44px] min-h-[44px] p-0 md:p-1 rounded-full md:hover:scale-110 md:focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorialGold/80 transition-transform duration-200';

  const marker = (
    <MapHotspotMarker hotspot={hotspot} markerStyle={markerStyle} largeIcons={largeIcons} />
  );

  const navigateToHash = (hash) => {
    const navigateAndScroll = () => {
      navigate({ pathname: location.pathname, hash });
      scrollToAnchorId(hash);
    };

    if (onBeforeNavigate) {
      onBeforeNavigate();
      runAfterOverlayCloses(navigateAndScroll);
      return;
    }

    navigateAndScroll();
  };

  if (hotspot.info) {
    return (
      <button
        type="button"
        className={className}
        style={style}
        aria-label={`${hotspot.label}. Open information.`}
        title={hotspot.label}
        onClick={() => onOpenInfo?.(hotspot.info)}
      >
        {marker}
      </button>
    );
  }

  if (!hotspot.to) return null;

  if (hotspot.to.startsWith('#')) {
    const hash = hotspot.to.replace(/^#/, '');
    return (
      <button
        type="button"
        className={className}
        style={style}
        aria-label={hotspot.label}
        title={hotspot.label}
        onClick={() => navigateToHash(hash)}
      >
        {marker}
      </button>
    );
  }

  const parsedTo = parseRouteTo(hotspot.to);

  return (
    <Link
      to={parsedTo}
      className={className}
      style={style}
      aria-label={hotspot.label}
      title={hotspot.label}
      onClick={(event) => {
        if (!onBeforeNavigate) return;
        event.preventDefault();
        onBeforeNavigate();
        runAfterOverlayCloses(() => navigate(parsedTo));
      }}
    >
      {marker}
    </Link>
  );
}

function MapArtwork({
  publicId,
  version,
  alt,
  tornClipStyle,
  hasHotspots,
  hotspots,
  overlay,
  onOpenInfo,
  showHotspots = true,
  imageSizes = '100vw',
  className = 'relative w-full',
  largeIcons = false,
  markerStyle = 'magnifier',
  onBeforeNavigate,
}) {
  const imgRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(HOTSPOT_TUNE_WIDTH);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return undefined;

    const update = () => {
      if (img.offsetWidth > 0) setMapWidth(img.offsetWidth);
    };

    update();
    img.addEventListener('load', update);
    const observer = new ResizeObserver(update);
    observer.observe(img);

    return () => {
      img.removeEventListener('load', update);
      observer.disconnect();
    };
  }, [publicId, version]);

  return (
    <div className={`journal-map-artwork relative ${className}`}>
      {/* Drop-shadow on artwork only — filter on a parent blurs/rasterises hotspot SVGs */}
      <div className="relative w-full" style={{ filter: TORN_EDGE_DROP_SHADOW }}>
        <div className="relative w-full" style={tornClipStyle}>
          <img
            ref={imgRef}
            src={cloudinaryImageUrl(publicId, { width: 2400, version })}
            srcSet={[800, 1200, 1600, 2400, 3200]
              .map((w) => `${cloudinaryImageUrl(publicId, { width: w, version })} ${w}w`)
              .join(', ')}
            sizes={imageSizes}
            alt={alt}
            className="w-full h-auto block select-none"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div
            className="absolute inset-x-0 top-0 h-[5%] pointer-events-none z-[1] bg-gradient-to-b from-stone-900/10 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[5%] pointer-events-none z-[1] bg-gradient-to-t from-stone-900/10 to-transparent"
            aria-hidden
          />
        </div>
      </div>
      {showHotspots && (hasHotspots || overlay) && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            {hotspots.map((hotspot) => (
              <MapHotspotLink
                key={hotspot.id}
                hotspot={hotspot}
                onOpenInfo={onOpenInfo}
                markerStyle={markerStyle}
                largeIcons={largeIcons}
                onBeforeNavigate={onBeforeNavigate}
                mapWidth={mapWidth}
              />
            ))}
            {overlay}
          </div>
        </div>
      )}
    </div>
  );
}

function JournalMapFullscreen({ open, onClose, mapLabel, children }) {
  useLightboxNavLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-stone-950/96"
      role="dialog"
      aria-modal="true"
      aria-label={`${mapLabel} — enlarged view`}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 z-[10001] flex h-10 w-10 items-center justify-center rounded-full border border-stone-400/40 bg-stone-900/80 shadow-lg hover:bg-stone-800 transition-colors"
        aria-label="Close enlarged map"
      >
        <img src={CLOSE_SRC} alt="" className="w-6 h-6" aria-hidden />
      </button>

      <div className="absolute inset-0 overflow-auto overscroll-contain touch-pan-x touch-pan-y">
        <div className="flex min-h-full w-max min-w-full items-center justify-center px-4 py-16">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * Full-bleed hand-drawn journal map with torn edges and optional magnifier hotspots.
 * On small screens: compact preview + enlarge button opens a scrollable fullscreen view.
 */
function JournalMap({
  publicId,
  version,
  alt,
  mapLabel = 'Journal map',
  hotspots = [],
  overlay = null,
  onOpenInfo,
  sectionId = 'journal-map',
  markerStyle = 'magnifier',
  compactSpacing = false,
}) {
  const [expanded, setExpanded] = useState(false);
  const openExpanded = useCallback(() => setExpanded(true), []);
  const closeExpanded = useCallback(() => setExpanded(false), []);

  const tornClipStyle = {
    clipPath: `polygon(${MAP_TORN_CLIP_PATH})`,
    WebkitClipPath: `polygon(${MAP_TORN_CLIP_PATH})`,
  };

  const hasHotspots = hotspots.length > 0;

  const artworkProps = {
    publicId,
    version,
    alt,
    tornClipStyle,
    hasHotspots,
    hotspots,
    overlay,
    onOpenInfo,
    markerStyle,
  };

  const markerInstructions =
    markerStyle === 'number'
      ? 'Follow the numbered markers to open the matching chapter or section. On small screens, tap the map or Enlarge map for a readable view.'
      : 'Follow the magnifying glass to open the matching chapter or section. On small screens, tap the map or Enlarge map for a readable view.';

  return (
    <section
      className={`relative left-1/2 w-screen max-w-none -translate-x-1/2 px-0 overflow-visible journal-map-section ${
        compactSpacing ? 'py-4 md:py-8' : 'py-10 md:py-14'
      }`}
      aria-labelledby={`${sectionId}-heading`}
      aria-describedby={hasHotspots ? `${sectionId}-instructions` : undefined}
    >
      <h2 className="sr-only" id={`${sectionId}-heading`}>
        {mapLabel}
      </h2>
      {hasHotspots && (
        <p className="sr-only" id={`${sectionId}-instructions`}>
          {markerInstructions}
        </p>
      )}

      {/* Desktop / tablet: inline full-bleed map with hotspots */}
      <div className="hidden md:block relative w-screen py-2">
        <MapArtwork {...artworkProps} showHotspots />
      </div>

      {/* Mobile: compact preview — tap map or link to enlarge */}
      <div className="md:hidden relative w-screen px-4">
        <button
          type="button"
          onClick={openExpanded}
          className="block w-full py-2 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorialGold/60 focus-visible:ring-offset-2 active:opacity-95 transition-opacity"
          aria-label="Enlarge map"
        >
          <MapArtwork {...artworkProps} showHotspots={false} />
        </button>
        <div className="flex justify-center pb-1">
          <button
            type="button"
            onClick={openExpanded}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 tracking-wide uppercase hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorialGold/60 focus-visible:ring-offset-2 rounded-sm transition-colors"
          >
            <img src={MAGNIFY_SRC} alt="" className="w-3.5 h-3.5 opacity-50" aria-hidden />
            Enlarge map
          </button>
        </div>
      </div>

      <JournalMapFullscreen open={expanded} onClose={closeExpanded} mapLabel={mapLabel}>
        <MapArtwork
          {...artworkProps}
          showHotspots
          largeIcons
          onBeforeNavigate={closeExpanded}
          className="relative w-[920px] max-w-none shrink-0"
          imageSizes="920px"
        />
      </JournalMapFullscreen>
    </section>
  );
}

export default JournalMap;
