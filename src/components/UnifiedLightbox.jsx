import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../assets/images/cross.svg";
import LeftArrow from "../assets/images/lftarrow.svg";
import RightArrow from "../assets/images/rtarrow.svg";
import { resolveLightboxSrc, isLightboxOpen } from "../utils/resolveLightboxImage";

const EnlargeIcon = "/assets/enlargev2.svg";

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
  layout = "default",
  stackLayer = "default",
  allowImmersive = true,
}) {
  const controlled = setCurrentIndex != null;
  const [internalIndex, setInternalIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const prevSrc = useRef(null);
  const shellRef = useRef(null);

  useEffect(() => {
    if (!controlled) setInternalIndex(startIndex);
  }, [startIndex, controlled]);

  const openIndex = controlled ? currentIndex : internalIndex;
  const index = isLightboxOpen(openIndex) ? openIndex : null;

  const exitImmersive = async () => {
    setImmersive(false);
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        /* noop */
      }
    }
  };

  const close = () => {
    exitImmersive();
    if (controlled) {
      setCurrentIndex(null);
    } else {
      onClose?.();
    }
  };

  const enterImmersive = async () => {
    setImmersive(true);
    const el = shellRef.current;
    if (!el?.requestFullscreen) return;
    try {
      await el.requestFullscreen();
    } catch {
      /* CSS-only immersive still applies */
    }
  };

  const toggleImmersive = () => {
    if (immersive) exitImmersive();
    else enterImmersive();
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

  const isLayoutFullscreen = layout === "fullscreen";
  const isEdgeToEdge = isLayoutFullscreen || immersive;
  const lightboxWidth = isEdgeToEdge ? 3200 : 1600;

  const current = index !== null ? images[index] : null;
  const imageSrc = resolveLightboxSrc(current, { width: lightboxWidth });
  const fallbackSrc = current?.src ? resolveLightboxSrc({ ...current, image: current.src }, { width: lightboxWidth }) : "";
  const title = current?.title || "";
  const alt = current?.alt || current?.title || "Image";
  const description = current?.description || current?.shortDescription || current?.contextLine || "";
  const showNav = variant === "standard" && images.length > 1;

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (immersive) {
          exitImmersive();
          return;
        }
        close();
      }
      if (showNav && e.key === "ArrowRight") showNext();
      if (showNav && e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, immersive, showNav, images.length]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setImmersive(false);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (index === null) setImmersive(false);
  }, [index]);

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

  const standardZ = stackLayer === "overlay" ? "z-[10000]" : "z-[300]";
  const showImmersiveToggle = allowImmersive && variant === "standard";
  const backdropClass =
    variant === "minimal"
      ? isLayoutFullscreen
        ? "fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
        : "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90"
      : immersive
        ? `fixed inset-0 ${standardZ} flex items-center justify-center bg-black`
        : `fixed inset-0 ${standardZ} flex items-center justify-center px-2 md:px-16 py-4`;

  const backdropStyle =
    variant === "minimal"
      ? undefined
      : immersive
        ? { backgroundColor: "#000" }
        : { backgroundColor: "rgba(15,12,10,0.92)", backdropFilter: "blur(6px)" };

  const content = (
    <AnimatePresence>
      <motion.div
        ref={shellRef}
        className={backdropClass}
        style={backdropStyle}
        onClick={immersive ? undefined : close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <motion.div
          className={`relative flex flex-col items-center w-full max-w-full ${
            isEdgeToEdge ? "h-full min-h-[100dvh] max-h-[100dvh] justify-center" : "max-h-[90vh]"
          }`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
        >
          <div className={`relative ${isEdgeToEdge ? "w-full h-full flex items-center justify-center" : ""}`}>
            {!loaded && (
              <motion.div className="absolute inset-0 flex items-center justify-center min-w-[40vw] min-h-[30vh] rounded-sm bg-stone-800/60">
                <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              </motion.div>
            )}
            <img
              src={imageSrc}
              alt={alt}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
                  e.currentTarget.src = fallbackSrc;
                  setLoaded(true);
                }
              }}
              className={`object-contain transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              } ${
                isEdgeToEdge
                  ? "w-full max-w-[100vw] max-h-[100dvh] shadow-none rounded-none"
                  : `max-w-[96vw] md:max-w-[90vw] lg:max-w-[82vw] rounded-sm shadow-2xl ${
                      variant === "minimal" ? "max-h-[70vh] cursor-pointer" : ""
                    }`
              }`}
              style={{
                maxHeight: isEdgeToEdge
                  ? "100dvh"
                  : variant === "minimal"
                    ? undefined
                    : "calc(100vh - 220px)",
              }}
              onClick={variant === "minimal" ? close : undefined}
            />

            <button
              type="button"
              className={`absolute flex items-center justify-center rounded-full shadow-lg transition-colors duration-200 z-10 ${
                variant === "minimal"
                  ? `${isLayoutFullscreen ? "top-3 right-3 md:top-4 md:right-4" : "top-4 right-4"} w-8 h-8 bg-white/80 hover:bg-white`
                  : immersive
                    ? "top-3 right-3 md:top-4 md:right-4 w-10 h-10 bg-black/50 hover:bg-black/70 border border-white/20"
                    : "top-0 left-0 translate-x-1 -translate-y-1 md:-translate-x-14 md:translate-y-0 w-11 h-11 bg-white/25 hover:bg-white/60"
              }`}
              onClick={close}
              aria-label="Close"
            >
              <img src={CloseIcon} alt="" className={variant === "minimal" ? "w-4 h-4" : "w-7 h-7"} />
            </button>

            {showImmersiveToggle && (
              <button
                type="button"
                className={`absolute flex items-center justify-center rounded-full shadow-lg transition-colors duration-200 z-10 ${
                  immersive
                    ? "top-3 right-14 md:top-4 md:right-16 w-10 h-10 bg-black/50 hover:bg-black/70 border border-white/20"
                    : "top-0 right-0 -translate-y-1 translate-x-1 md:translate-x-14 md:translate-y-0 w-11 h-11 bg-white/25 hover:bg-white/60"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleImmersive();
                }}
                aria-label={immersive ? "Exit fullscreen" : "View image fullscreen"}
              >
                <img
                  src={EnlargeIcon}
                  alt=""
                  className="w-7 h-7"
                  style={immersive ? { transform: "rotate(180deg)" } : undefined}
                />
              </button>
            )}

            {showNav && (
              <>
                <button
                  type="button"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full shadow-lg transition-colors duration-200 ${
                    immersive
                      ? "left-2 md:left-4 bg-black/45 hover:bg-black/65 border border-white/15"
                      : "translate-x-1 md:-translate-x-14 bg-white/25 hover:bg-white/60"
                  }`}
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
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full shadow-lg transition-colors duration-200 ${
                    immersive
                      ? "right-2 md:right-4 bg-black/45 hover:bg-black/65 border border-white/15"
                      : "-translate-x-1 md:translate-x-14 bg-white/25 hover:bg-white/60"
                  }`}
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

          {!immersive && (title || description || current.stripTitle || current.storyLink) && (
            <div
              className={`mt-4 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-sm border border-stone-200 shadow-xl max-w-lg w-full ${
                variant === "minimal" ? "rounded-lg" : ""
              }`}
            >
              {current.stripTitle && (
                <p className="text-[10px] uppercase tracking-[0.28em] text-warmMuted font-cormorant mb-2">
                  {current.stripTitle}
                </p>
              )}
              {title && (
                <h2 className="font-bold text-base text-stone-800 font-cormorant mb-1">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-stone-600 font-cormorant leading-relaxed">{description}</p>
              )}
              {current.storyLink && (
                <Link
                  to={current.storyLink}
                  onClick={close}
                  className="inline-block mt-3 text-xs font-cormorant tracking-widest uppercase text-rioViolet hover:text-stone-900 border-b border-rioViolet/30 hover:border-stone-800 transition-colors"
                >
                  Return to story
                </Link>
              )}
            </div>
          )}

          {!immersive && variant === "standard" && (current.shopLink || current.gumroadLink) && (
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
export function FullscreenLightbox({
  images,
  startIndex,
  onClose,
  stackLayer = "default",
  allowImmersive = true,
}) {
  return (
    <UnifiedLightbox
      images={images}
      startIndex={startIndex}
      onClose={onClose}
      variant="standard"
      stackLayer={stackLayer}
      allowImmersive={allowImmersive}
    />
  );
}
