import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloudinaryImage from "./CloudinaryImage";
const CloseIcon   = "/assets/crossv2.svg";
const EnlargeIcon = "/assets/enlargev2.svg";
const LeftArrow   = "/assets/lftarrowV2.svg";
const RightArrow  = "/assets/rtarrowV2.svg";
const MagnifyIcon = "/assets/Magnifyv2.svg";

const GALLERY_CAP = 10;

// Deterministic seed from string
const strSeed = (str, offset = 0) =>
  str.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), offset * 17);

// ── GalleryItem ───────────────────────────────────────────────────────────────
// Handles its own hover state and IntersectionObserver for mobile icon reveal

function GalleryItem({ image, index, onExpand }) {
  const [hovered, setHovered] = useState(false);
  const [centreOpacity, setCentreOpacity] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setCentreOpacity(entry.isIntersecting ? Math.min(1, entry.intersectionRatio * 4) : 0),
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const seed     = strSeed(image.imageId || image.alt || '', index);
  const widthPct = 58 + (seed % 43);
  const mbRem    = 7.2 + ((seed * 7) % 84) / 5;
  const align    = seed % 3 === 0 ? 'flex-end' : seed % 3 === 1 ? 'flex-start' : 'center';
  return (
    <div
      className="break-inside-avoid flex flex-col"
      style={{ marginBottom: `${mbRem}rem`, alignItems: align }}
    >
      <div
        ref={ref}
        className="relative group cursor-pointer outline-none"
        style={{ width: `${widthPct}%` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onExpand(image)}
      >
        <CloudinaryImage
          publicId={image.cloudinary?.gallery || image.imageId}
          legacyPath={image.src}
          alt={image.alt}
          className="w-full h-auto outline-none select-none transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ filter: 'drop-shadow(6px 10px 20px rgba(0,0,0,0.75))' }}
          draggable={false}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          widths={[400, 700, 1000]}
          onError={e => { if (image.fallbackSrc && e.currentTarget.src !== image.fallbackSrc) e.currentTarget.src = image.fallbackSrc; }}
        />
        {/* Desktop: centred on hover only */}
        <div className={`absolute inset-0 items-center justify-center transition-opacity duration-300 hidden md:flex ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <img src={MagnifyIcon} alt="View" className="w-14 h-14" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6)) drop-shadow(0 0px 2px rgba(0,0,0,0.4))' }} />
        </div>
        {/* Mobile: centred, fades in as image enters the centre 20% of viewport */}
        <div className="absolute inset-0 items-center justify-center flex md:hidden" style={{ opacity: centreOpacity, transition: 'opacity 0.2s ease' }}>
          <img src={MagnifyIcon} alt="View" className="w-8 h-8" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6)) drop-shadow(0 0px 2px rgba(0,0,0,0.4))' }} />
        </div>
      </div>
      {/* Title card */}
      {image.title && (
        <div
          className="mt-4 px-3 py-1.5 border-l-2 border-stone-500 bg-white inline-block max-w-[70%] outline-none select-none"
          style={{
            boxShadow: '1px 2px 6px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.12)',
          }}
        >
          <p className="text-stone-800 text-[10px] uppercase tracking-widest font-cormorant leading-tight font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {image.title}
          </p>
        </div>
      )}
    </div>
  );
}

// ── ExpandedCard ──────────────────────────────────────────────────────────────
// Middle layer: larger inline card, click enlarge.svg for fullscreen

function ExpandedCard({ image, onClose, onFullscreen }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center max-w-2xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Image — entire area clickable for fullscreen */}
        <div
          className="relative cursor-zoom-in group"
          onClick={onFullscreen}
          title="Click to view fullscreen"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-[65vh] object-contain rounded-sm shadow-2xl"
          />
          {/* Enlarge hint — top right, decorative only */}
          <div className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center bg-white/20 group-hover:bg-white/40 rounded-full shadow-lg transition-colors duration-200 pointer-events-none">
            <img src={EnlargeIcon} alt="" className="w-7 h-7" />
          </div>
          {/* Close — top left, needs its own click handler so stops propagation */}
          <button
            className="absolute top-3 left-3 w-11 h-11 flex items-center justify-center bg-white/30 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200"
            onClick={e => { e.stopPropagation(); onClose(); }}
          >
            <img src={CloseIcon} alt="Close" className="w-7 h-7" />
          </button>
        </div>
        {/* Name card */}
        {(image.title || image.description) && (
          <div className="mt-3 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-sm shadow-md border-l-2 border-stone-400 max-w-md w-full">
            {image.title && (
              <h4 className="text-stone-800 text-sm font-bold uppercase tracking-widest font-cormorant leading-tight">
                {image.title}
              </h4>
            )}
            {image.description && (
              <p className="text-stone-600 text-xs mt-1 font-cormorant leading-relaxed italic">
                {image.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Fullscreen Lightbox ───────────────────────────────────────────────────────

export function FullscreenLightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);
  const prevSrc = useRef(null);

  const current = images[index];

  useEffect(() => {
    const src = current?.image;
    if (src !== prevSrc.current) { setLoaded(false); prevSrc.current = src; }
    // Preload neighbours
    [-1, 1].forEach(d => {
      const n = images[(index + d + images.length) % images.length];
      if (n?.image) { const img = new Image(); img.src = n.image; }
    });
  }, [index, images, current]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')  setIndex(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  if (!current) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-2 md:px-16 py-4"
      style={{ backgroundColor: 'rgba(15,12,10,0.92)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div className="relative flex flex-col items-center w-full">
        <div className="relative" onClick={e => e.stopPropagation()}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center min-w-[40vw] min-h-[30vh] rounded-sm bg-stone-800/60">
              <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
            </div>
          )}
          <img
            src={current.image || current.src}
            alt={current.title || current.alt}
            onLoad={() => setLoaded(true)}
            onError={e => { const fb = current.fallbackSrc || current.src; if (e.currentTarget.src !== fb) { e.currentTarget.src = fb; setLoaded(true); } }}
            className={`max-w-[96vw] md:max-w-[90vw] lg:max-w-[82vw] object-contain rounded-sm shadow-2xl transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxHeight: 'calc(100vh - 220px)' }}
          />
          {/* Close — top left just outside image */}
          <button
            className="absolute top-0 left-0 translate-x-1 -translate-y-1 md:-translate-x-14 md:translate-y-0 w-11 h-11 flex items-center justify-center bg-white/25 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200 z-10"
            onClick={onClose}
          >
            <img src={CloseIcon} alt="Close" className="w-7 h-7" />
          </button>
          {/* Prev / Next — positioned just outside image edges */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-1 md:-translate-x-14 w-11 h-11 flex items-center justify-center bg-white/25 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200"
                onClick={e => { e.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); }}
              ><img src={LeftArrow} alt="Previous" className="w-7 h-7" /></button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 md:translate-x-14 w-11 h-11 flex items-center justify-center bg-white/25 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200"
                onClick={e => { e.stopPropagation(); setIndex(i => (i + 1) % images.length); }}
              ><img src={RightArrow} alt="Next" className="w-7 h-7" /></button>
            </>
          )}
        </div>

        {(current.title || current.description) && (
          <div className="mt-4 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-sm border border-stone-200 shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            {current.title && <h2 className="font-bold text-base text-stone-800 font-cormorant mb-1">{current.title}</h2>}
            {current.description && <p className="text-sm text-stone-600 font-cormorant leading-relaxed">{current.description}</p>}
          </div>
        )}

        {/* Shop / Purchase buttons */}
        {(current.shopLink || current.gumroadLink) && (
          <div className="mt-3 flex gap-3" onClick={e => e.stopPropagation()}>
            {current.shopLink && (
              <a
                href={current.shopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-xs font-cormorant tracking-widest uppercase border border-stone-400 text-stone-200 bg-white/10 hover:bg-white/20 rounded-sm transition-colors duration-200"
                onClick={e => e.stopPropagation()}
              >
                View in Shop
              </a>
            )}
            {current.gumroadLink && (
              <a
                href={current.gumroadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-xs font-cormorant tracking-widest uppercase border border-amber-500/60 text-amber-300 bg-amber-900/20 hover:bg-amber-900/40 rounded-sm transition-colors duration-200"
                onClick={e => e.stopPropagation()}
              >
                Purchase Print
              </a>
            )}
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}

// ── GalleryWall ───────────────────────────────────────────────────────────────

export default function GalleryWall({ images = [], openLightbox, backgroundImage, heading }) {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);   // expanded card
  const [lightboxIndex, setLightboxIndex] = useState(null);   // fullscreen
  const [visibleCount, setVisibleCount] = useState(GALLERY_CAP); // pagination

  // Stable shuffle keyed to seed — deterministic per remix
  const shuffled = useMemo(() => {
    const arr = [...images];
    // Seeded Fisher-Yates
    let s = shuffleSeed + 1;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(s) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [images, shuffleSeed]);

  // Reset visible count when shuffling
  useEffect(() => {
    setVisibleCount(GALLERY_CAP);
  }, [shuffleSeed]);

  const visible = shuffled.slice(0, visibleCount);

  const handleExpand = useCallback((image) => {
    setExpandedImage(image);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!expandedImage) return;
    const idx = shuffled.findIndex(img => (img.imageId || img.src) === (expandedImage.imageId || expandedImage.src));
    setExpandedImage(null);
    setLightboxIndex(idx >= 0 ? idx : 0);
  }, [expandedImage, shuffled]);

  return (
    <>
      {/* ── Wall ── */}
      <div className="relative overflow-hidden">
        {/* Background scrolls with content — position absolute, not fixed */}
        {backgroundImage && (
          <>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 z-0 bg-black/20" />
          </>
        )}

        <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-32 pb-16">
          {/* Heading */}
          {heading && (
            <h2 className="text-4xl md:text-6xl font-bold font-handwriting text-center mb-10" style={{ color: '#5c4a32', textShadow: '0 2px 4px rgba(255,255,255,0.4), 0 -1px 2px rgba(0,0,0,0.25)' }}>
              {heading}
            </h2>
          )}
          {/* Controls */}
          <div className="flex items-center justify-center gap-0 mt-8 mb-16">
            {/* Label card */}
            <div
              className="px-3 py-1.5 border-l-2 border-stone-500 bg-white/80 font-cormorant tracking-widest text-sm uppercase text-stone-700"
              style={{ boxShadow: '1px 2px 6px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.12)' }}
            >
              Rehang Pictures
            </div>
            {/* Icon-only push button */}
            <button
              onClick={() => setShuffleSeed(s => s + 1)}
              className="group w-9 self-stretch flex items-center justify-center rounded-sm transition-all duration-300 active:scale-95"
              style={{
                background: 'linear-gradient(160deg, #edd96e 0%, #c9a84c 55%, #b8922e 100%)',
                boxShadow: '0 4px 10px rgba(120,80,10,0.4), inset 0 2px 0 rgba(255,243,180,0.55), inset 0 -2px 0 rgba(100,65,5,0.35)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 7px 18px rgba(120,80,10,0.55), inset 0 2px 0 rgba(255,243,180,0.55), inset 0 -2px 0 rgba(100,65,5,0.35)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 10px rgba(120,80,10,0.4), inset 0 2px 0 rgba(255,243,180,0.55), inset 0 -2px 0 rgba(100,65,5,0.35)'}
            >
              <img src="/assets/Shuffle.svg" alt="Shuffle" className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
            </button>
          </div>

          {/* Masonry */}
          <div className="columns-2 md:columns-3 gap-6 md:gap-10 lg:gap-14">
            {visible.map((image, index) => (
              <GalleryItem
                key={image.imageId || image.src || index}
                image={image}
                index={index}
                onExpand={handleExpand}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < shuffled.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + GALLERY_CAP, shuffled.length))}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-stone-400 text-stone-800 font-cormorant tracking-[0.2em] uppercase text-sm rounded-sm hover:bg-white/30 hover:border-stone-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Layer 2: Expanded Card ── */}
      {expandedImage && (
        <ExpandedCard
          image={expandedImage}
          onClose={() => setExpandedImage(null)}
          onFullscreen={handleFullscreen}
        />
      )}

      {/* ── Layer 3: Fullscreen Lightbox ── */}
      {lightboxIndex !== null && (
        <FullscreenLightbox
          images={shuffled}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
