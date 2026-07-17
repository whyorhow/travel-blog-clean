import { useState, useCallback } from "react";
import CloudinaryImage from "./CloudinaryImage";
import { FullscreenLightbox } from "./UnifiedLightbox";
import { useLightboxNavLock } from "../hooks/useLightboxNavLock";
import { cloudinaryImageUrl } from "../utils/cloudinary";
const CloseIcon = "/assets/crossv2.svg";
const EnlargeIcon = "/assets/enlargev2.svg";
const MagnifyIcon = "/assets/Magnifyv2.svg";

const GALLERY_CAP = 10;

function GalleryItem({ image, onExpand, spacing = "standard", index = 0 }) {
  const [hovered, setHovered] = useState(false);

  const gallerySrc = image.cloudinary?.gallery
    ? cloudinaryImageUrl(image.cloudinary.gallery, {
        width: 800,
        preserveTransparency: true,
        sourceFormat: image.src,
      })
    : image.src;

  const spacingClasses =
    spacing === "relaxed" ? "mb-24 md:mb-32" : "mb-16 md:mb-24";

  const staggerClasses = [
    "md:ml-[2%] md:translate-y-0 md:self-start",
    "md:ml-[14%] md:translate-y-20 md:self-end",
    "md:ml-[5%] md:translate-y-6 md:self-center",
    "md:ml-[18%] md:translate-y-32 md:self-start",
    "md:ml-[0%] md:translate-y-12 md:self-end",
    "md:ml-[10%] md:translate-y-26 md:self-center",
    "md:ml-[20%] md:translate-y-8 md:self-start",
    "md:ml-[4%] md:translate-y-36 md:self-end",
    "md:ml-[12%] md:translate-y-16 md:self-center",
  ];

  const rotationClasses = [
    "rotate-[-2.2deg]",
    "rotate-[1.4deg]",
    "rotate-[-0.9deg]",
    "rotate-[2deg]",
    "rotate-[-1.5deg]",
    "rotate-[0.8deg]",
    "rotate-[-1.8deg]",
    "rotate-[1.2deg]",
    "rotate-[-0.6deg]",
  ];

  return (
    <button
      type="button"
      className={`group block w-full cursor-pointer text-left bg-transparent p-0 border-0 ${spacingClasses}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onExpand(image)}
      aria-label={`View ${image.title || image.alt}`}
    >
      <div
        className={`flex flex-col items-start ${staggerClasses[index % staggerClasses.length]}`}
      >
        <div
          className={`relative ${rotationClasses[index % rotationClasses.length]}`}
        >
          <CloudinaryImage
            publicId={image.cloudinary?.gallery || undefined}
            legacyPath={gallerySrc}
            alt={image.alt}
            className="block w-full h-auto outline-none select-none"
            draggable={false}
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 30vw"
            widths={[500, 800, 1200]}
            preserveTransparency={true}
            onError={(e) => {
              if (
                image.fallbackSrc &&
                e.currentTarget.src !== image.fallbackSrc
              )
                e.currentTarget.src = image.fallbackSrc;
            }}
          />
          <div
            className={`absolute inset-0 hidden md:flex items-center justify-center transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={MagnifyIcon}
              alt=""
              aria-hidden="true"
              className="w-12 h-12"
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.65))" }}
            />
          </div>
        </div>
        {image.title && (
          <div className="mt-6 ml-4 max-w-[72%] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-stone-700 font-semibold leading-tight">
              {image.title}
            </p>
          </div>
        )}
      </div>
    </button>
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
      <div
        className="relative flex flex-col items-center max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative cursor-zoom-in group"
          onClick={onFullscreen}
          title="Click to view fullscreen"
        >
          <img
            src={image.image || image.src}
            alt={image.alt}
            className="max-w-full max-h-[65vh] object-contain rounded-sm shadow-2xl"
            style={{ filter: "drop-shadow(12px 20px 36px rgba(0,0,0,0.7))" }}
          />
          <div className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center bg-white/20 group-hover:bg-white/40 rounded-full shadow-lg transition-colors duration-200 pointer-events-none">
            <img src={EnlargeIcon} alt="" className="w-7 h-7" />
          </div>
          <button
            type="button"
            className="absolute top-3 left-3 z-50 w-11 h-11 flex items-center justify-center bg-white/30 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200"
            onClick={handleClose}
            aria-label="Close"
          >
            <img src={CloseIcon} alt="Close" className="w-7 h-7" />
          </button>
        </div>
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

export { FullscreenLightbox };

export default function GalleryWall({
  images = [],
  openLightbox,
  backgroundImage,
  heading,
  spacing = "standard",
}) {
  const [expandedImage, setExpandedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(GALLERY_CAP);

  useLightboxNavLock(expandedImage !== null || lightboxIndex !== null);
  const visible = images.slice(0, visibleCount);

  const handleExpand = useCallback((image) => setExpandedImage(image), []);

  const handleFullscreen = useCallback(() => {
    if (!expandedImage) return;
    const idx = images.findIndex(
      (img) =>
        (img.imageId || img.src) ===
        (expandedImage.imageId || expandedImage.src),
    );
    setExpandedImage(null);
    setLightboxIndex(idx >= 0 ? idx : 0);
  }, [expandedImage, images]);

  return (
    <>
      <div className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        {backgroundImage && (
          <>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 z-0 bg-black/30 mix-blend-multiply" />
          </>
        )}

        <div className="relative z-10 px-6 md:px-12 pt-32 pb-16">
          {heading && (
            <div className="flex justify-center mb-10">
              <div className="relative inline-block px-8 py-4 sm:px-10 sm:py-5 rounded-md">
                <div
                  className="absolute inset-0 rounded-md bg-black/25 backdrop-blur-[2px]"
                  aria-hidden
                />
                <h2
                  className="relative text-4xl md:text-6xl font-bold font-handwriting text-center text-stone-100"
                  style={{
                    textShadow:
                      "0 2px 8px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.35)",
                  }}
                >
                  {heading}
                </h2>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-20 md:gap-x-28 xl:gap-x-36 items-start">
            {visible.map((image, index) => (
              <GalleryItem
                key={image.imageId || image.src || index}
                image={image}
                index={index}
                spacing={spacing}
                onExpand={handleExpand}
              />
            ))}
          </div>

          {visibleCount < images.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(prev + GALLERY_CAP, images.length),
                  )
                }
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-stone-400 text-stone-800 font-cormorant tracking-[0.2em] uppercase text-sm rounded-sm hover:bg-white/30 hover:border-stone-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {expandedImage && (
        <ExpandedCard
          image={expandedImage}
          onClose={() => setExpandedImage(null)}
          onFullscreen={handleFullscreen}
        />
      )}
      {lightboxIndex !== null && (
        <FullscreenLightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
