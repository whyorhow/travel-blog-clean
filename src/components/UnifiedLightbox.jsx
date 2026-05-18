import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../assets/images/cross.svg";
import LeftArrow from "../assets/images/lftarrow.svg";
import RightArrow from "../assets/images/rtarrow.svg";
import { resolveLightboxSrc, isLightboxOpen } from "../utils/resolveLightboxImage";

/**
 * Shared lightbox for templates, shop, and gallery.
 *
 * Props (use one control style):
 * - currentIndex + setCurrentIndex (null closes)
 * - startIndex + onClose
 *
 * variant:
 * - "standard" — nav arrows, keyboard, shop links (default)
 * - "minimal" — close only, darker backdrop (single-image narratives)
 */
export default function UnifiedLightbox({
  images = [],
  currentIndex,
  startIndex = 0,
  setCurrentIndex,
  onClose,
  variant = "standard",
}) {
  const controlled = setCurrentIndex != null;
  const [internalIndex, setInternalIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);
  const prevSrc = useRef(null);

  const openIndex = controlled ? currentIndex : internalIndex;
  const index = isLightboxOpen(openIndex) ? openIndex : null;

  const close = () => {
    if (controlled) {
      setCurrentIndex(null);
    } else {
      onClose?.();
    }
  };

  const goTo = (next) => {
    if (controlled) {
      setCurrentIndex(next);
    } else {
      setInternalIndex(next);
    }
  };

  const showPrev = () => goTo((index - 1 + images.length) % images.length);
  const showNext = () => goTo((index + 1) % images.length);

  const current = index !== null ? images[index] : null;
  const imageSrc = resolveLightboxSrc(current, { width: 1600 });
  const fallbackSrc = current?.src ? resolveLightboxSrc({ ...current, image: current.src }, { width: 1600 }) : "";
  const title = current?.title || current?.alt || "";
  const description = current?.description || current?.shortDescription || current?.contextLine || "";
  const showNav = variant === "standard" && images.length > 1;

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (showNav && e.key === "ArrowRight") showNext();
      if (showNav && e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!imageSrc) return;
    if (imageSrc !== prevSrc.current) {
      setLoaded(false);
      prevSrc.current = imageSrc;
    }
    if (!showNav) return;
    [-1, 1].forEach((offset) => {
      const neighbour = images[(index + offset + images.length) % images.length];
      const src = resolveLightboxSrc(neighbour, { width: 1200 });
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [index, images, imageSrc, showNav]);

  if (index === null || !current || !imageSrc) return null;

  const backdropClass =
    variant === "minimal"
      ? "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90"
      : "fixed inset-0 z-[300] flex items-center justify-center px-2 md:px-16 py-4";

  const backdropStyle =
    variant === "minimal"
      ? undefined
      : { backgroundColor: "rgba(15,12,10,0.92)", backdropFilter: "blur(6px)" };

  const content = (
    <AnimatePresence>
      <motion.div
        className={backdropClass}
        style={backdropStyle}
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <motion.div
          className="relative flex flex-col items-center w-full max-w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
        >
          <div className="relative">
            {!loaded && (
              <motion.div className="absolute inset-0 flex items-center justify-center min-w-[40vw] min-h-[30vh] rounded-sm bg-stone-800/60">
                <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              </motion.div>
            )}
            <img
              src={imageSrc}
              alt={title}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
                  e.currentTarget.src = fallbackSrc;
                  setLoaded(true);
                }
              }}
              className={`max-w-[96vw] md:max-w-[90vw] lg:max-w-[82vw] object-contain rounded-sm shadow-2xl transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              } ${variant === "minimal" ? "max-h-[70vh] cursor-pointer" : ""}`}
              style={{ maxHeight: variant === "minimal" ? undefined : "calc(100vh - 220px)" }}
              onClick={variant === "minimal" ? close : undefined}
            />

            <button
              type="button"
              className={`absolute flex items-center justify-center rounded-full shadow-lg transition-colors duration-200 z-10 ${
                variant === "minimal"
                  ? "top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white"
                  : "top-0 left-0 translate-x-1 -translate-y-1 md:-translate-x-14 md:translate-y-0 w-11 h-11 bg-white/25 hover:bg-white/60"
              }`}
              onClick={close}
              aria-label="Close"
            >
              <img src={CloseIcon} alt="" className={variant === "minimal" ? "w-4 h-4" : "w-7 h-7"} />
            </button>

            {showNav && (
              <>
                <button
                  type="button"
                  className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-1 md:-translate-x-14 w-11 h-11 flex items-center justify-center bg-white/25 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous image"
                >
                  <img src={LeftArrow} alt="" className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 md:translate-x-14 w-11 h-11 flex items-center justify-center bg-white/25 hover:bg-white/60 rounded-full shadow-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                >
                  <img src={RightArrow} alt="" className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {(title || description) && (
            <div
              className={`mt-4 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-sm border border-stone-200 shadow-xl max-w-lg w-full ${
                variant === "minimal" ? "rounded-lg" : ""
              }`}
            >
              {title && (
                <h2 className="font-bold text-base text-stone-800 font-cormorant mb-1">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-stone-600 font-cormorant leading-relaxed">{description}</p>
              )}
            </div>
          )}

          {variant === "standard" && (current.shopLink || current.gumroadLink) && (
            <div className="mt-3 flex gap-3">
              {current.shopLink && (
                <a
                  href={current.shopLink}
                  className="px-5 py-2 text-xs font-cormorant tracking-widest uppercase border border-stone-400 text-stone-200 bg-white/10 hover:bg-white/20 rounded-sm transition-colors duration-200"
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
                >
                  Purchase Print
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return variant === "minimal" ? content : createPortal(content, document.body);
}

/** Gallery / shop fullscreen (startIndex + onClose) */
export function FullscreenLightbox({ images, startIndex, onClose }) {
  return (
    <UnifiedLightbox
      images={images}
      startIndex={startIndex}
      onClose={onClose}
      variant="standard"
    />
  );
}
