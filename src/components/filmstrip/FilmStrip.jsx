import React, { useRef, useEffect, useMemo } from "react";
import { useCompactStripTrim } from "./useCompactStripTrim";
import { motion, AnimatePresence } from "framer-motion";
import FilmStripLabel from "./FilmStripLabel";
import { FilmFrame, FilmNoteFrame } from "./FilmFrame";
import { frameSeed } from "../../utils/filmstripPool";
import {
  getFilmStripSnippetConfig,
  getCompactLayoutTrim,
  sliceFramesForSnippet,
} from "../../utils/filmStripSnippet";
import FilmStripPins from "./FilmStripPins";
import "./filmstrip.css";

const DRAG_SCROLL_INTERACTIVE = "button, a, input, textarea, select, [role='button']";

export function useDragScroll(
  ref,
  enabled,
  { touch = false, wheel = true, momentum = false } = {}
) {
  useEffect(() => {
    if (!enabled || !ref.current) return undefined;
    const el = ref.current;

    let pending = false;
    let dragging = false;
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let momentumRaf = 0;
    let activePointerId = null;

    const stopMomentum = () => {
      if (momentumRaf) cancelAnimationFrame(momentumRaf);
      momentumRaf = 0;
    };

    const detachDocument = () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
    };

    const endDrag = () => {
      detachDocument();
      const wasDragging = dragging;
      pending = false;
      dragging = false;
      activePointerId = null;
      el.classList.remove("is-dragging");

      if (wasDragging && momentum && Math.abs(velocity) > 0.15) {
        let v = velocity * 18;
        const glide = () => {
          if (Math.abs(v) < 0.35) {
            momentumRaf = 0;
            return;
          }
          el.scrollLeft -= v;
          v *= 0.92;
          momentumRaf = requestAnimationFrame(glide);
        };
        momentumRaf = requestAnimationFrame(glide);
      }
    };

    const onPointerMove = (e) => {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;

      const now = performance.now();

      if (!dragging) {
        if (!pending || Math.abs(e.pageX - startX) < 4) return;
        dragging = true;
        pending = false;
        stopMomentum();
        el.classList.add("is-dragging");
        lastX = e.pageX;
        lastTime = now;
        return;
      }

      const dx = e.pageX - lastX;
      const dt = Math.max(now - lastTime, 1);
      velocity = dx / dt;
      lastTime = now;
      lastX = e.pageX;
      e.preventDefault();
      el.scrollLeft -= dx;
    };

    const onPointerUp = (e) => {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      endDrag();
    };

    const onPointerDown = (e) => {
      if (!touch && e.pointerType === "touch") return;
      if (e.button !== 0 && e.pointerType !== "touch") return;
      if (e.target.closest(DRAG_SCROLL_INTERACTIVE)) return;
      stopMomentum();
      pending = true;
      dragging = false;
      activePointerId = e.pointerId;
      startX = e.pageX;
      lastX = e.pageX;
      lastTime = performance.now();
      velocity = 0;
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerUp);
    };

    const onWheel = wheel
      ? (e) => {
          if (el.scrollWidth <= el.clientWidth) return;
          const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
          if (delta === 0) return;
          stopMomentum();
          el.scrollLeft += delta;
          e.preventDefault();
        }
      : null;

    el.addEventListener("pointerdown", onPointerDown);
    if (onWheel) el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stopMomentum();
      endDrag();
      el.removeEventListener("pointerdown", onPointerDown);
      if (onWheel) el.removeEventListener("wheel", onWheel);
    };
  }, [ref, enabled, touch, wheel, momentum]);
}

function FilmStripGloss({ stripId }) {
  const gid = `gloss-${stripId.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg className="film-strip-gloss" aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="6%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="9%" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="24%" stopColor="#fff" stopOpacity="0" />
          <stop offset="38%" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="58%" stopColor="#fff" stopOpacity="0" />
          <stop offset="72%" stopColor="#fff" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${gid})`} />
    </svg>
  );
}

export function FilmStripCard({ strip, frames, stripIndex, variant, onOpenImage }) {
  const isCompact = variant === "compact";
  const isLightbox = variant === "lightbox";
  const stripTilt = -1.5 + (frameSeed(strip.id, 0) % 16) / 10;
  const frameCount = frames.length;
  const waveScale = isCompact || isLightbox ? 0 : 1;
  const isFlat = isCompact || isLightbox;

  return (
    <motion.div
      className={`film-strip-card film-strip-card--${variant}`}
      style={{ rotate: isFlat ? 0 : stripTilt }}
      initial={isFlat ? false : { opacity: 0, y: 10 }}
      animate={isFlat ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="film-strip-rail film-strip-rail--top" aria-hidden />
      <div className="film-strip-frames">
        {frames.map((frame, i) => {
          if (frame.type === "note") {
            return (
              <FilmNoteFrame
                key={`${strip.id}-note-${i}`}
                text={frame.text}
                subtext={frame.subtext}
                waveIndex={i}
                waveTotal={frameCount}
                stripIndex={stripIndex}
                variant={variant}
                waveScale={waveScale}
              />
            );
          }
          return (
            <FilmFrame
              key={frame.id}
              image={frame}
              onOpen={onOpenImage}
              waveIndex={i}
              waveTotal={frameCount}
              stripIndex={stripIndex}
              variant={variant}
              waveScale={waveScale}
            />
          );
        })}
      </div>
      <div className="film-strip-rail film-strip-rail--bottom" aria-hidden />
      <FilmStripGloss stripId={strip.id} />
      <div className="film-strip-glimmer" aria-hidden />
    </motion.div>
  );
}

export default function FilmStrip({
  strip,
  frames,
  stripIndex,
  variant = "compact",
  isExpanded = false,
  onSelect,
  onClose,
  onOpenImage,
}) {
  const scrollRef = useRef(null);
  const objectRef = useRef(null);
  const isCompact = variant === "compact";

  const snippet = useMemo(
    () => (isCompact ? getFilmStripSnippetConfig(strip.id, stripIndex, frames.length) : null),
    [isCompact, strip.id, stripIndex, frames.length]
  );

  const snippetFrames = useMemo(
    () => (snippet ? sliceFramesForSnippet(frames, snippet) : frames),
    [frames, snippet]
  );

  const fallbackTrim = useMemo(
    () =>
      snippet && snippetFrames.length
        ? getCompactLayoutTrim(snippetFrames.length, snippet.scale)
        : 0,
    [snippet, snippetFrames.length, snippet?.scale]
  );

  const layoutTrim = useCompactStripTrim(
    objectRef,
    isCompact && Boolean(snippet),
    fallbackTrim
  );

  useDragScroll(scrollRef, variant === "expanded");

  if (isCompact && snippet) {
    return (
      <section
        className="film-strip-section film-strip-section--compact"
        aria-labelledby={`strip-${strip.id}`}
      >
        <FilmStripLabel
          id={`strip-${strip.id}`}
          title={strip.title}
          index={stripIndex}
          compact
        />
        <div
          className="filmstrip-preview filmstrip-preview--compact"
          role="button"
          tabIndex={0}
          onClick={() => onSelect?.()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect?.();
            }
          }}
          aria-label={`Open filmstrip: ${strip.title}`}
        >
          <motion.div
            ref={objectRef}
            className="film-strip-object"
            style={{
              "--layout-trim": `${layoutTrim}px`,
              "--object-scale": snippet.scale,
              "--object-rotate-z": `${snippet.rotateZ}deg`,
              "--object-tilt-x": `${snippet.tiltX}deg`,
              "--object-y": `${snippet.offsetY}px`,
              "--object-x": `${snippet.offsetX}%`,
              "--wall-shadow-x": snippet.wallShadowX,
              "--wall-shadow-skew": snippet.wallShadowSkew,
              "--wall-shadow-origin": snippet.wallShadowOrigin,
              "--wall-shadow-inset": snippet.wallShadowInset,
              "--wall-shadow-w": snippet.wallShadowWidth,
              "--wall-shadow-drop": snippet.wallShadowDrop,
              "--wall-shadow-blur": snippet.wallShadowBlur,
              "--wall-shadow-alpha": snippet.wallShadowAlpha,
              "--wall-bow": snippet.wallBow,
              "--wall-shadow-room": snippet.wallShadowRoom,
              "--pin-shadow-x": snippet.pinShadowX,
              "--pin-shadow-y": snippet.pinShadowY,
            }}
          >
            <div className="film-strip-plinth film-strip-plinth--compact">
              <div className="film-strip-pinned">
                <FilmStripPins stripId={strip.id} />
                <FilmStripCard
                  strip={strip}
                  frames={snippetFrames}
                  stripIndex={stripIndex}
                  variant="compact"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.section
          className="film-strip-section film-strip-section--expanded"
          aria-labelledby={`strip-${strip.id}-expanded`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="film-strip-expanded-header">
            <h2 id={`strip-${strip.id}-expanded`} className="film-strip-expanded-title">
              {strip.title}
            </h2>
            <button type="button" className="film-strip-close" onClick={onClose}>
              Close
            </button>
          </div>
          {strip.description && (
            <p className="film-strip-expanded-desc">{strip.description}</p>
          )}

          <div
            ref={scrollRef}
            className="filmstrip-scroll filmstrip-scroll--expanded"
            role="list"
            aria-label={`${strip.title} — full filmstrip`}
          >
            <div className="film-strip-plinth film-strip-plinth--expanded">
              <div className="film-strip-ground-shadow" aria-hidden />
              <FilmStripCard
                strip={strip}
                frames={frames}
                stripIndex={stripIndex}
                variant="expanded"
                onOpenImage={onOpenImage}
              />
            </div>
            <div className="filmstrip-scroll-end" aria-hidden />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
