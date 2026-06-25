import React, { useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { useCompactStripTrim } from "./useCompactStripTrim";
import { motion, AnimatePresence } from "framer-motion";
import FilmStripLabel from "./FilmStripLabel";
import { FilmFrame, FilmNoteFrame } from "./FilmFrame";
import { frameSeed } from "../../utils/filmstripPool";
import {
  getFilmStripSnippetConfig,
  getCompactLayoutTrim,
  sliceFramesForSnippet,
  estimateCustomSvgStripSize,
  estimateCompactStripSize,
} from "../../utils/filmStripSnippet";
import FilmStripPins from "./FilmStripPins";
import "./filmstrip.css";

const PERF_UNIT_COUNT = 56;

/** 35mm pitch + lightbox stack geometry (matches --film-mm tokens in filmstrip.css) */
const LIGHTBOX_PERF_PITCH_MM = 4.7625;
const LIGHTBOX_STACK_PAD_MM = 4;
const LIGHTBOX_FRAME_MM = 24;
const LIGHTBOX_GAP_MM = 2.1;

function lightboxPerfUnitCount(frameCount) {
  if (frameCount <= 0) return PERF_UNIT_COUNT;
  const stackMm =
    LIGHTBOX_STACK_PAD_MM +
    frameCount * LIGHTBOX_FRAME_MM +
    Math.max(0, frameCount - 1) * LIGHTBOX_GAP_MM;
  return Math.max(12, Math.ceil(stackMm / LIGHTBOX_PERF_PITCH_MM) + 2);
}

function FilmStripRail({ variant, edge, frameCount = 0 }) {
  const isLightbox = variant === "lightbox";
  const perfCount = isLightbox ? lightboxPerfUnitCount(frameCount) : PERF_UNIT_COUNT;
  return (
    <div
      className={`film-strip-rail film-strip-rail--${edge}${
        isLightbox ? " film-strip-rail--vertical" : ""
      }`}
      aria-hidden
    >
      <div className="film-strip-perf-track">
        {Array.from({ length: perfCount }, (_, i) => (
          <span key={i} className="film-strip-perf-unit">
            <span className="film-strip-perf-cap film-strip-perf-cap--top" />
            <span className="film-strip-perf-solid film-strip-perf-solid--left" />
            <span className="film-strip-perf-hole" />
            <span className="film-strip-perf-solid film-strip-perf-solid--right" />
            <span className="film-strip-perf-cap film-strip-perf-cap--bottom" />
          </span>
        ))}
      </div>
    </div>
  );
}

const DRAG_SCROLL_INTERACTIVE = "button, a, input, textarea, select, [role='button']";

export function useDragScroll(
  ref,
  enabled,
  { touch = false, wheel = true, momentum = false, axis = "x" } = {}
) {
  const isVertical = axis === "y";

  useEffect(() => {
    if (!enabled || !ref.current) return undefined;
    const el = ref.current;

    let pending = false;
    let dragging = false;
    let startPos = 0;
    let lastPos = 0;
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
          if (isVertical) el.scrollTop -= v;
          else el.scrollLeft -= v;
          v *= 0.92;
          momentumRaf = requestAnimationFrame(glide);
        };
        momentumRaf = requestAnimationFrame(glide);
      }
    };

    const onPointerMove = (e) => {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;

      const now = performance.now();
      const pagePos = isVertical ? e.pageY : e.pageX;

      if (!dragging) {
        if (!pending || Math.abs(pagePos - startPos) < 4) return;
        dragging = true;
        pending = false;
        stopMomentum();
        el.classList.add("is-dragging");
        lastPos = pagePos;
        lastTime = now;
        return;
      }

      const delta = pagePos - lastPos;
      const dt = Math.max(now - lastTime, 1);
      velocity = delta / dt;
      lastTime = now;
      lastPos = pagePos;
      e.preventDefault();
      if (isVertical) el.scrollTop -= delta;
      else el.scrollLeft -= delta;
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
      startPos = isVertical ? e.pageY : e.pageX;
      lastPos = startPos;
      lastTime = performance.now();
      velocity = 0;
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerUp);
    };

    const onWheel = wheel
      ? (e) => {
          if (isVertical) {
            if (el.scrollHeight <= el.clientHeight) return;
            const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            if (delta === 0) return;
            stopMomentum();
            el.scrollTop += delta;
          } else {
            if (el.scrollWidth <= el.clientWidth) return;
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (delta === 0) return;
            stopMomentum();
            el.scrollLeft += delta;
          }
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
  }, [ref, enabled, touch, wheel, momentum, isVertical]);
}

function FilmStripGloss({ stripId, className = "" }) {
  const gid = `gloss-${stripId.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg
      className={className ? className : "film-strip-gloss"}
      aria-hidden
      preserveAspectRatio="none"
    >
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

function FilmStripAssetChrome({ assetSrc }) {
  const url = `${process.env.PUBLIC_URL || ""}${assetSrc}`;
  return (
    <img
      src={url}
      className="film-strip-custom-svg__chrome film-strip-custom-svg__chrome--asset"
      alt=""
      draggable={false}
      decoding="async"
    />
  );
}

function FilmStripChromeLayer({
  viewBoxW,
  viewBoxH,
  viewBoxX = 0,
  viewBoxY = 0,
  pathD,
  pathFillRule = "evenodd",
  stripId,
}) {
  const gid = `film-gloss-${stripId.replace(/[^a-z0-9]/gi, "")}`;
  const x1 = viewBoxX + viewBoxW * 0.06;
  const y1 = viewBoxY + viewBoxH * 0.04;
  const x2 = viewBoxX + viewBoxW * 0.94;
  const y2 = viewBoxY + viewBoxH * 0.96;
  const diagonal = Math.hypot(x2 - x1, y2 - y1);
  const halfBand = 16 / diagonal;
  const hotCenter = 0.36 + (frameSeed(stripId, 7) % 14) / 100;
  const bandStart = Math.max(0, hotCenter - halfBand * 1.6);
  const bandCore = Math.max(0, hotCenter - halfBand * 0.45);
  const bandEnd = Math.min(1, hotCenter + halfBand * 1.6);

  return (
    <svg
      className="film-strip-custom-svg__chrome"
      viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gid}
          gradientUnits="userSpaceOnUse"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset={`${bandStart * 100}%`} stopColor="#fff" stopOpacity="0" />
          <stop offset={`${bandCore * 100}%`} stopColor="#fff" stopOpacity="0.38" />
          <stop offset={`${hotCenter * 100}%`} stopColor="#fff" stopOpacity="0.48" />
          <stop offset={`${(hotCenter + halfBand * 0.45) * 100}%`} stopColor="#fff" stopOpacity="0.38" />
          <stop offset={`${bandEnd * 100}%`} stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="film-strip-custom-svg__stock" fill="#17181b" fillRule={pathFillRule} d={pathD} />
      <path className="film-strip-custom-svg__gloss" fill={`url(#${gid})`} fillRule={pathFillRule} d={pathD} />
    </svg>
  );
}

function FilmStripFrameRow({
  strip,
  frames,
  stripIndex,
  variant,
  onOpenImage,
  waveScale,
  className = "",
  containerRef,
}) {
  const frameCount = frames.length;
  return (
    <div ref={containerRef} className={className}>
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
  );
}

export function FilmStripCard({
  strip,
  frames,
  stripIndex,
  variant,
  onOpenImage,
  endCutPx,
  endCutSide,
  endCutCorner,
  endCutInset,
  customSvg,
  frameImageProps,
}) {
  const isCompact = variant === "compact";
  const isLightbox = variant === "lightbox";
  const cardRef = useRef(null);
  const framesColumnRef = useRef(null);
  const stripTilt = -1.5 + (frameSeed(strip.id, 0) % 16) / 10;
  const waveScale = isCompact || isLightbox ? 0 : 1;
  const isFlat = isCompact || isLightbox;
  const endCutClass =
    isCompact && endCutSide && !customSvg
      ? `film-strip-card--cut-end-${endCutSide} film-strip-card--cut-corner-${endCutCorner || "bottom"}`
      : "";

  useLayoutEffect(() => {
    if (!isLightbox || customSvg || !cardRef.current || !framesColumnRef.current) return undefined;

    const syncRailHeight = () => {
      const h = framesColumnRef.current.offsetHeight;
      cardRef.current.style.setProperty("--lightbox-frames-h", `${h}px`);
    };

    syncRailHeight();
    const observer = new ResizeObserver(syncRailHeight);
    observer.observe(framesColumnRef.current);
    window.addEventListener("resize", syncRailHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncRailHeight);
    };
  }, [isLightbox, customSvg, frames.length]);

  if (customSvg) {
    const {
      viewBoxW,
      viewBoxH,
      viewBoxX = 0,
      viewBoxY = 0,
      frameSlots,
      pathD,
      pathFillRule,
      assetSrc,
      bakedChrome,
    } = customSvg;
    const slotFrames = frames.slice(0, frameSlots.length);
    const useAssetChrome = Boolean(bakedChrome && assetSrc);

    return (
      <motion.div
        className={`film-strip-card film-strip-card--${variant} film-strip-card--custom-svg${
          useAssetChrome ? " film-strip-card--baked-chrome" : ""
        }`.trim()}
        style={{
          rotate: 0,
          "--custom-svg-w": viewBoxW,
          "--custom-svg-h": viewBoxH,
        }}
        initial={false}
      >
        <div className="film-strip-custom-svg">
          {!useAssetChrome && <div className="film-strip-custom-svg__wall-shadow" aria-hidden />}
          {slotFrames.map((frame, i) => {
            const slot = frameSlots[i];
            const slotStyle = {
              left: `${((slot.x - viewBoxX) / viewBoxW) * 100}%`,
              top: `${((slot.y - viewBoxY) / viewBoxH) * 100}%`,
              width: `${(slot.w / viewBoxW) * 100}%`,
              height: `${(slot.h / viewBoxH) * 100}%`,
            };

            if (frame.type === "note") {
              return (
                <div
                  key={`${strip.id}-note-${i}`}
                  className="film-strip-custom-svg__slot"
                  style={slotStyle}
                >
                  <FilmNoteFrame
                    text={frame.text}
                    subtext={frame.subtext}
                    waveIndex={i}
                    waveTotal={slotFrames.length}
                    stripIndex={stripIndex}
                    variant={variant}
                    waveScale={0}
                  />
                </div>
              );
            }

            return (
              <div
                key={frame.id}
                className="film-strip-custom-svg__slot"
                style={slotStyle}
              >
                <FilmFrame
                  image={frame}
                  onOpen={onOpenImage}
                  waveIndex={i}
                  waveTotal={slotFrames.length}
                  stripIndex={stripIndex}
                  variant={variant}
                  waveScale={0}
                  {...frameImageProps}
                />
              </div>
            );
          })}
          <div className="film-strip-custom-svg__film" aria-hidden>
            {useAssetChrome ? (
              <FilmStripAssetChrome assetSrc={assetSrc} />
            ) : (
              <FilmStripChromeLayer
                viewBoxW={viewBoxW}
                viewBoxH={viewBoxH}
                viewBoxX={viewBoxX}
                viewBoxY={viewBoxY}
                pathD={pathD}
                pathFillRule={pathFillRule}
                stripId={strip.id}
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className={`film-strip-card film-strip-card--${variant} ${endCutClass}`.trim()}
      style={{
        rotate: isFlat ? 0 : stripTilt,
        ...(isCompact && (endCutInset || endCutPx)
          ? { "--strip-end-cut": endCutInset || `${endCutPx}px` }
          : undefined),
      }}
      initial={isFlat ? false : { opacity: 0, y: 10 }}
      animate={isFlat ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <FilmStripRail variant={variant} edge="top" frameCount={frames.length} />
      <FilmStripFrameRow
        strip={strip}
        frames={frames}
        stripIndex={stripIndex}
        variant={variant}
        onOpenImage={onOpenImage}
        waveScale={waveScale}
        className="film-strip-frames"
        containerRef={framesColumnRef}
      />
      <FilmStripRail variant={variant} edge="bottom" frameCount={frames.length} />
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
        ? getCompactLayoutTrim(snippetFrames.length, snippet.scale, snippet.customSvg)
        : 0,
    [snippet, snippetFrames.length, snippet?.scale, snippet?.customSvg]
  );

  const layoutTrim = useCompactStripTrim(
    objectRef,
    isCompact && Boolean(snippet),
    fallbackTrim
  );

  useDragScroll(scrollRef, variant === "expanded");

  if (isCompact && snippet) {
    const stripWidthPx = snippet.customSvg
      ? estimateCustomSvgStripSize(snippet.customSvg).width
      : estimateCompactStripSize(snippetFrames.length).width;

    return (
      <section
        className="film-strip-section film-strip-section--compact"
        aria-labelledby={`strip-${strip.id}`}
        data-strip-guide={stripIndex + 1}
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
              "--object-x": `${snippet.offsetX}px`,
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
                <FilmStripCard
                  strip={strip}
                  frames={snippetFrames}
                  stripIndex={stripIndex}
                  variant="compact"
                  endCutPx={snippet.endCutPx}
                  endCutSide={snippet.endCutSide}
                  endCutCorner={snippet.endCutCorner}
                  endCutInset={snippet.endCutInset}
                  customSvg={snippet.customSvg}
                />
                <FilmStripPins
                  stripId={strip.id}
                  stripIndex={stripIndex}
                  stripWidthPx={stripWidthPx}
                  useCustomSvg={Boolean(snippet.customSvg)}
                  pinAnchors={snippet.customSvg?.pinAnchors}
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
