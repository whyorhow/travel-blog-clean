import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FilmStripCard, useDragScroll } from "./FilmStrip";
import { stripImageFrames } from "../../utils/filmstripPool";
import { useLightboxNavLock } from "../../hooks/useLightboxNavLock";

export default function FilmStripLightbox({
  strip,
  frames,
  stripIndex,
  onClose,
  onOpenImage,
  closeOnEscape = true,
}) {
  const scrollRef = useRef(null);
  const closeRef = useRef(null);

  useDragScroll(scrollRef, true, { touch: false, wheel: false, momentum: true, axis: "y" });

  useLightboxNavLock(true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (!closeOnEscape) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, closeOnEscape]);

  const handleRootClick = useCallback(
    (e) => {
      if (e.target.closest(".film-strip-lightbox__stage")) return;
      onClose();
    },
    [onClose]
  );

  const imageFrames = stripImageFrames(frames);

  const handleOpenFrame = (image) => {
    if (!onOpenImage || !imageFrames.length) return;
    const startIndex = imageFrames.findIndex((f) => f.id === image.id);
    onOpenImage(imageFrames, startIndex >= 0 ? startIndex : 0, strip.title);
  };

  return createPortal(
    <motion.div
      className="film-strip-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="film-strip-lightbox-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={handleRootClick}
    >
      <header className="film-strip-lightbox__header">
        <motion.div className="film-strip-lightbox__titles" layout={false}>
          <p className="film-strip-lightbox__index">
            strip {String(stripIndex + 1).padStart(2, "0")}
          </p>
          <h2 id="film-strip-lightbox-title" className="film-strip-lightbox__title">
            {strip.title}
          </h2>
          {strip.description && (
            <p className="film-strip-lightbox__desc">{strip.description}</p>
          )}
        </motion.div>
        <button
          ref={closeRef}
          type="button"
          className="film-strip-lightbox__close"
          onClick={onClose}
          aria-label="Close filmstrip"
        >
          Close
        </button>
      </header>

      <p className="film-strip-lightbox__hint">
        Drag or scroll down the strip · click outside to close · centre of a frame to enlarge
      </p>

      <div
        ref={scrollRef}
        className="filmstrip-scroll filmstrip-scroll--lightbox"
        role="region"
        aria-label={`${strip.title} — scroll the filmstrip`}
      >
        <div className="film-strip-plinth film-strip-plinth--lightbox">
          <div
            className="film-strip-lightbox__stage"
            onClick={(e) => e.stopPropagation()}
          >
            <FilmStripCard
              strip={strip}
              frames={frames}
              stripIndex={stripIndex}
              variant="lightbox"
              onOpenImage={handleOpenFrame}
            />
          </div>
        </div>
        <div className="filmstrip-scroll-end filmstrip-scroll-end--lightbox" aria-hidden />
      </div>
    </motion.div>,
    document.body
  );
}
