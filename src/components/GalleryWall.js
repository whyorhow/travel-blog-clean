import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import CloudinaryImage from "./CloudinaryImage";
import { FullscreenLightbox } from "./UnifiedLightbox";
import { useLightboxNavLock } from "../hooks/useLightboxNavLock";
const CloseIcon   = "/assets/crossv2.svg";
const EnlargeIcon = "/assets/enlargev2.svg";
const MagnifyIcon = "/assets/Magnifyv2.svg";

const GALLERY_CAP = 10;

// Deterministic seed from string
const strSeed = (str, offset = 0) =>
  str.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), offset * 17);

// ── Polaroid Scatter Item ─────────────────────────────────────────────────────

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

  const seed = strSeed(image.imageId || image.alt || '', index);
  
  // Organic tilt values (-8 to +8 degrees)
  const tilts = [-6, 5, -7, 4, -3, 6, -5, 7, -4, 3, -8, 2, -2, 8, -7];
  const tilt = tilts[index % tilts.length];
  
  // Size variations based on seed
  const sizes = ['w-44', 'w-52', 'w-60', 'w-48', 'w-56'];
  const sizeClass = sizes[index % sizes.length];
  
  // Z-index variation for layering
  const zIndices = [5, 3, 8, 2, 6, 1, 7, 4];
  
  return (
    <div
      ref={ref}
      className={`relative cursor-pointer outline-none transition-all duration-500 ease-out ${sizeClass} mb-20`}
      style={{
        transform: hovered 
          ? `scale(1.08) rotate(0deg) translateY(-12px)` 
          : `rotate(${tilt}deg)`,
        zIndex: hovered ? 100 : zIndices[index % zIndices.length],
        marginLeft: index % 3 === 0 ? '8%' : index % 3 === 1 ? '0' : 'auto',
        marginRight: index % 3 === 0 ? 'auto' : index % 3 === 1 ? '8%' : '0',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onExpand(image)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand(image);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.title || image.alt}`}
    >
      <div
        className="relative bg-white/90 p-2 pb-3 rounded-sm shadow-xl transition-all duration-500"
        style={{
          transform: hovered ? 'scale(1.02)' : 'none',
          boxShadow: hovered 
            ? '0 25px 50px -12px rgba(0,0,0,0.25)' 
            : '0 10px 25px -5px rgba(0,0,0,0.15)',
        }}
      >
        <CloudinaryImage
          publicId={image.cloudinary?.gallery || image.imageId}
          legacyPath={image.src}
          alt={image.alt}
          className="w-full h-auto outline-none select-none rounded-sm"
          style={{ filter: 'drop-shadow(4px 8px 12px rgba(0,0,0,0.4))' }}
          draggable={false}
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
          widths={[400, 700, 1000]}
          onError={e => { if (image.fallbackSrc && e.currentTarget.src !== image.fallbackSrc) e.currentTarget.src = image.fallbackSrc; }}
        />
        {image.title && (
          <div className="mt-2 px-2">
            <p className="text-stone-800 text-[10px] uppercase tracking-widest font-cormorant leading-tight font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {image.title}
            </p>
          </div>
        )}
      </div>
      
      {/* Desktop: centred on hover only */}
      <div className={`absolute inset-0 items-center justify-center transition-opacity duration-300 hidden md:flex ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <img src={MagnifyIcon} alt="View" className="w-14 h-14" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))' }} />
      </div>
      {/* Mobile: centred, fades in as image enters the centre 20% of viewport */}
      <div className="absolute inset-0 items-center justify-center flex md:hidden" style={{ opacity: centreOpacity, transition: 'opacity 0.2s ease' }}>
        <img src={MagnifyIcon} alt="View" className="w-8 h-8" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))' }} />
      </div>
    </div>
  );
}

// ── ExpandedCard ──────────────────────────────────────────────────────────────

function ExpandedCard({ image, onClose, onFullscreen }) {
  const handleClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[10100] flex items-start md:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4 pt-[max(0.25rem,env(safe-area-inset-top))] md:p-4"
      onClick={onClose}
    >
      <div className="relative flex flex-col items-center max-w-2xl w-full" onClick={e => e.stopPropagation()}>
        <div className="relative cursor-zoom-in group" onClick={onFullscreen} title="Click to view fullscreen">
          <img src={image.image || image.src} alt={image.alt} className="max-w-full max-h-[65vh] object-contain rounded-sm shadow-2xl"
            style={{ filter: 'drop-shadow(12px 20px 36px rgba(0,0,0,0.7))' }} />
          <div className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center bg-white/20 group-hover:bg-white/40 rounded-full shadow-lg transition-colors duration-200 pointer-events-none">
            <img src={EnlargeIcon} alt="" className="w-7 h-7" />
          </div>
          <button type="button" className="absolute top-3 left-3 z-50 w-11 h-11 flex items-center justify-center bg-white/30 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200"
            onClick={handleClose} aria-label="Close">
            <img src={CloseIcon} alt="Close" className="w-7 h-7" />
          </button>
        </div>
        {(image.title || image.description) && (
          <div className="mt-3 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-sm shadow-md border-l-2 border-stone-400 max-w-md w-full">
            {image.title && <h4 className="text-stone-800 text-sm font-bold uppercase tracking-widest font-cormorant leading-tight">{image.title}</h4>}
            {image.description && <p className="text-stone-600 text-xs mt-1 font-cormorant leading-relaxed italic">{image.description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export { FullscreenLightbox };

// ── GalleryWall — Polaroid Scatter ───────────────────────────────────────────────

export default function GalleryWall({ images = [], openLightbox, backgroundImage, heading }) {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(GALLERY_CAP);

  useLightboxNavLock(expandedImage !== null || lightboxIndex !== null);

  const shuffled = useMemo(() => {
    const arr = [...images];
    let s = shuffleSeed + 1;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(s) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [images, shuffleSeed]);

  useEffect(() => {
    setVisibleCount(GALLERY_CAP);
  }, [shuffleSeed]);

  const visible = shuffled.slice(0, visibleCount);

  const handleExpand = useCallback((image) => setExpandedImage(image), []);

  const handleFullscreen = useCallback(() => {
    if (!expandedImage) return;
    const idx = shuffled.findIndex(img => (img.imageId || img.src) === (expandedImage.imageId || expandedImage.src));
    setExpandedImage(null);
    setLightboxIndex(idx >= 0 ? idx : 0);
  }, [expandedImage, shuffled]);

  return (
    <>
      <div className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
        {backgroundImage && (
          <>
            <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 z-0 bg-black/30 mix-blend-multiply" />
          </>
        )}

        <div className="relative z-10 px-6 md:px-12 pt-32 pb-16">
          {heading && (
            <div className="flex justify-center mb-10">
              <div className="relative inline-block px-8 py-4 sm:px-10 sm:py-5 rounded-md">
                <div className="absolute inset-0 rounded-md bg-black/25 backdrop-blur-[2px]" aria-hidden />
                <h2 className="relative text-4xl md:text-6xl font-bold font-handwriting text-center text-stone-100"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.35)' }}>
                  {heading}
                </h2>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-0 mt-8 mb-16">
            <div className="px-3 py-1.5 border-l-2 border-stone-500 bg-white/80 font-cormorant tracking-widest text-sm uppercase text-stone-700"
              style={{ boxShadow: '1px 2px 6px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.12)' }}>
              Rehang Pictures
            </div>
            <button onClick={() => setShuffleSeed(s => s + 1)} className="group w-9 self-stretch flex items-center justify-center rounded-sm transition-all duration-300 active:scale-95"
              style={{ background: 'linear-gradient(160deg, #edd96e 0%, #c9a84c 55%, #b8922e 100%)',
                boxShadow: '0 4px 10px rgba(120,80,10,0.4), inset 0 2px 0 rgba(255,243,180,0.55), inset 0 -2px 0 rgba(100,65,5,0.35)' }}>
              <img src="/assets/Shuffle.svg" alt="Shuffle" className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
            </button>
          </div>

          {/* Polaroid Scatter — scattered layout, not grid */}
          <div className="relative mx-auto max-w-5xl">
            {visible.map((image, index) => (
              <GalleryItem
                key={image.imageId || image.src || index}
                image={image}
                index={index}
                onExpand={handleExpand}
              />
            ))}
          </div>

          {visibleCount < shuffled.length && (
            <div className="flex justify-center mt-16">
              <button onClick={() => setVisibleCount(prev => Math.min(prev + GALLERY_CAP, shuffled.length))}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-stone-400 text-stone-800 font-cormorant tracking-[0.2em] uppercase text-sm rounded-sm hover:bg-white/30 hover:border-stone-600 transition-all duration-300 shadow-md hover:shadow-lg">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {expandedImage && <ExpandedCard image={expandedImage} onClose={() => setExpandedImage(null)} onFullscreen={handleFullscreen} />}
      {lightboxIndex !== null && <FullscreenLightbox images={shuffled} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </>
  );
}