import { frameSeed } from "./filmstripPool";
import maskPaths from "../assets/filmstripMaskPaths.json";
import filmstripVariants from "../assets/filmstripVariants.json";
import { mergeFilmstripTemplate } from "../components/filmstrip/templates/registry";

/** Matches compact `--film-mm` (~1.89px) for layout slot sizing */
export const COMPACT_FILM_MM = 1.89;

/** Wall + lightbox strip scale bump (~40% larger than prior compact sizing) */
const STRIP_SIZE_FACTOR = 1.4;

/** 35mm perf pitch and hole bounds (mm), matching filmstrip.css mask */
const PERF_PITCH_MM = 4.7625;
const HOLE_WIDTH_MM = 1.85;
const HOLE_START_MM = (PERF_PITCH_MM - HOLE_WIDTH_MM) / 2;
const HOLE_END_MM = HOLE_START_MM + HOLE_WIDTH_MM;

export function isOverPerforation(xFromLeftPx, filmMmPx) {
  const pitchPx = PERF_PITCH_MM * filmMmPx;
  const holeStartPx = HOLE_START_MM * filmMmPx;
  const holeEndPx = HOLE_END_MM * filmMmPx;
  const posInPitch = ((xFromLeftPx % pitchPx) + pitchPx) % pitchPx;
  return posInPitch >= holeStartPx && posInPitch <= holeEndPx;
}

/** Nudge the right pin left until its point sits on solid film, not a sprocket hole */
export function snapRightPinOffHoles({
  stripWidthPx,
  filmMmPx,
  pinWidthPx,
  startRightPx,
  maxSearchPx = 56,
}) {
  const pinShiftRight = pinWidthPx * 0.28;
  const pinCenterFromLeft = (rightPx) =>
    stripWidthPx - rightPx - pinWidthPx * 0.5 + pinShiftRight;

  for (let delta = 0; delta <= maxSearchPx; delta += 1) {
    const rightPx = startRightPx + delta;
    const x = pinCenterFromLeft(rightPx);
    if (x > 0 && x < stripWidthPx && !isOverPerforation(x, filmMmPx)) {
      return rightPx;
    }
  }
  return startRightPx;
}

export function estimateCompactStripSize(frameCount) {
  const mm = COMPACT_FILM_MM;
  const frameW = 36 * mm;
  const frameH = 24 * mm;
  const railH = 5.5 * mm;
  const gap = 2.1 * mm;
  const hPad = 4 * mm;
  const framesBlockH = frameH + 0.5 * mm;
  const pinPad = 9;

  const width = frameCount * frameW + Math.max(0, frameCount - 1) * gap + hPad;
  const height = framesBlockH + railH * 2 + pinPad;

  return { width, height };
}

/** Horizontal Illustrator film-stock SVGs keyed by frame count (3–6) */
const FRAME_SLOT_PITCH = 203;
const FRAME_SLOT = { x: 23, y: 72, w: 180, h: 121 };

function buildFrameSlots(frameCount) {
  return Array.from({ length: frameCount }, (_, i) => ({
    x: FRAME_SLOT.x + i * FRAME_SLOT_PITCH,
    y: FRAME_SLOT.y,
    w: FRAME_SLOT.w,
    h: FRAME_SLOT.h,
  }));
}

export const FILMSTRIP_H_SVGS = {
  3: {
    src: "/assets/Filmstrip-3H.svg",
    pathD: maskPaths["3"].pathD,
    viewBoxW: 632,
    viewBoxH: 267,
    frameCount: 3,
    frameSlots: buildFrameSlots(3),
  },
  4: {
    src: "/assets/Filmstrip-4H.svg",
    pathD: maskPaths["4"].pathD,
    viewBoxW: 835,
    viewBoxH: 267,
    frameCount: 4,
    frameSlots: buildFrameSlots(4),
  },
  5: {
    src: "/assets/Filmstrip-5H.svg",
    pathD: maskPaths["5"].pathD,
    viewBoxW: 1039,
    viewBoxH: 267,
    frameCount: 5,
    frameSlots: buildFrameSlots(5),
  },
  6: {
    src: "/assets/Filmstrip-6H.svg",
    pathD: maskPaths["6"].pathD,
    viewBoxW: 1240,
    viewBoxH: 267,
    frameCount: 6,
    frameSlots: buildFrameSlots(6),
  },
};

/** @deprecated use FILMSTRIP_H_SVGS */
export const CUSTOM_STRIP_SVGS = FILMSTRIP_H_SVGS;

export function getFilmstripHConfig(frameCount) {
  const clamped = Math.min(6, Math.max(3, frameCount));
  return FILMSTRIP_H_SVGS[clamped] ?? FILMSTRIP_H_SVGS[4];
}

export function estimateCustomSvgStripSize(customSvg) {
  const spec = customSvg ?? FILMSTRIP_H_SVGS[4];
  return {
    width: spec.viewBoxW,
    height: spec.viewBoxH,
    spec,
  };
}

/** Wall preview length per strip (guide order 1–12). Vertical lightbox uses the full strip. */
export const COMPACT_PREVIEW_FRAME_COUNTS = [4, 4, 3, 4, 6, 4, 5, 4, 5, 4, 5, 4];

export function resolveCompactPreviewFrames(stripIndex, totalFrames, guideOverride) {
  const minFrames = 3;
  const maxFrames = 6;
  const assigned =
    guideOverride?.templateFrames ??
    COMPACT_PREVIEW_FRAME_COUNTS[stripIndex] ??
    COMPACT_PREVIEW_FRAME_COUNTS[stripIndex % COMPACT_PREVIEW_FRAME_COUNTS.length] ??
    4;
  const templateFrames = Math.min(maxFrames, Math.max(minFrames, Math.min(assigned, totalFrames)));
  const count = Math.min(totalFrames, templateFrames);
  return { templateFrames, count };
}

/** Illustrator baked-chrome template for 3-frame wall previews */
const THREE_FRAME_ILLUSTRATOR_TEMPLATE = "3HCustom01";

/** Illustrator baked-chrome template for 5-frame wall previews */
const FIVE_FRAME_ILLUSTRATOR_TEMPLATE = "5HCustom01";

/** Illustrator baked-chrome template for 6-frame wall previews */
const SIX_FRAME_ILLUSTRATOR_TEMPLATE = "6HCustom01";

/** Illustrator baked-chrome templates for 4-frame wall previews */
const FOUR_FRAME_ILLUSTRATOR_TEMPLATES = ["4HCustom01", "4HCustom02"];

/** Stable per-strip pick between the two 4-frame Illustrator templates */
export function resolveFourFrameIllustratorTemplate(stripId, stripIndex) {
  const seed = frameSeed(stripId, stripIndex + 20);
  return FOUR_FRAME_ILLUSTRATOR_TEMPLATES[seed % FOUR_FRAME_ILLUSTRATOR_TEMPLATES.length];
}

function resolveIllustratorTemplateOverride(templateFrames, stripId, stripIndex, guideOverride) {
  if (guideOverride?.filmstripTemplate) return guideOverride;

  if (templateFrames === 3) {
    return { ...guideOverride, filmstripTemplate: THREE_FRAME_ILLUSTRATOR_TEMPLATE };
  }
  if (templateFrames === 6) {
    return { ...guideOverride, filmstripTemplate: SIX_FRAME_ILLUSTRATOR_TEMPLATE };
  }
  if (templateFrames === 5) {
    return { ...guideOverride, filmstripTemplate: FIVE_FRAME_ILLUSTRATOR_TEMPLATE };
  }
  if (templateFrames === 4) {
    return {
      ...guideOverride,
      filmstripTemplate: resolveFourFrameIllustratorTemplate(stripId, stripIndex),
    };
  }
  return guideOverride;
}

/** TEMP — per guide-number strip tuning (key = visible guide badge 1–12) */
export const GUIDE_STRIP_OVERRIDES = {};

/** Scissor-cut and other Illustrator variants — regenerate via scripts/extract-filmstrip-variants.js */
export function applyFilmstripVariant(baseConfig, variantKey) {
  if (!variantKey) return baseConfig;
  const variant = filmstripVariants[variantKey];
  if (!variant) return baseConfig;
  return { ...baseConfig, ...variant };
}

/** Full Illustrator templates (baked shadow/gloss) take priority over path-only variants */
export function resolveCustomSvgConfig(templateFrames, guideOverride) {
  const base = getFilmstripHConfig(templateFrames);
  if (guideOverride?.filmstripTemplate) {
    return mergeFilmstripTemplate(base, guideOverride.filmstripTemplate);
  }
  return applyFilmstripVariant(base, guideOverride?.filmstripVariant);
}

function endCutOffsetPx(angleDeg, frameCount, overridePx) {
  if (overridePx != null) return overridePx;

  const { height } = estimateCompactStripSize(frameCount);
  let tiltDeg = 10;

  if (angleDeg > 180) tiltDeg = angleDeg - 180;
  else if (angleDeg >= 90) tiltDeg = angleDeg - 90;
  else tiltDeg = 90 - angleDeg;

  return Math.max(4, Math.round(height * Math.tan((tiltDeg * Math.PI) / 180)));
}

export function resolveEndCut(guideNumber, frameCount, defaults) {
  const override = GUIDE_STRIP_OVERRIDES[guideNumber];
  const endCutSide = override?.endCutSide ?? defaults.endCutSide;
  const endCutAngle = override?.endCutAngle ?? defaults.endCutAngle ?? 100;

  let endCutCorner = override?.endCutCorner;
  if (!endCutCorner) {
    endCutCorner = endCutAngle > 180 || endCutAngle < 90 ? "top" : "bottom";
  }

  const endCutPx = endCutOffsetPx(endCutAngle, frameCount, override?.endCutPx);
  const endCutInset =
    override?.endCutInset ?? (endCutPx != null ? `${endCutPx}px` : "8px");

  return { endCutSide, endCutPx, endCutCorner, endCutAngle, endCutInset };
}

/**
 * Compact archive strip: shorter length, varied placement, subtle rest angle on the wall.
 * No diagonal clip — straight film edges.
 */
export function getFilmStripSnippetConfig(stripId, stripIndex, totalFrames) {
  const s0 = frameSeed(stripId, 0);
  const s1 = frameSeed(stripId, 1);
  const s2 = frameSeed(stripId, 2);
  const s3 = frameSeed(stripId, stripIndex + 3);

  const rotateZ = ((s0 % 11) - 5) * 0.32;
  const tiltX = 0;
  const scale = (0.54 + (s2 % 6) * 0.027) * STRIP_SIZE_FACTOR;
  const offsetY = 0;

  const guideOverride = GUIDE_STRIP_OVERRIDES[stripIndex + 1];
  const { templateFrames, count } = resolveCompactPreviewFrames(
    stripIndex,
    totalFrames,
    guideOverride
  );
  const effectiveOverride = resolveIllustratorTemplateOverride(
    templateFrames,
    stripId,
    stripIndex,
    guideOverride
  );
  const customSvg = resolveCustomSvgConfig(templateFrames, effectiveOverride);
  const maxStart = Math.max(0, totalFrames - count);
  const start = maxStart > 0 ? s3 % (maxStart + 1) : 0;

  const offsetPixels = [-10, -8, -7, -6, -5, 5, 6, 7, 8, 9, 10, -9, 0];
  const offsetX = offsetPixels[(s0 + stripIndex) % offsetPixels.length];

  const s4 = frameSeed(stripId, 4);
  const s5 = frameSeed(stripId, 5);
  const s6 = frameSeed(stripId, 6);
  const s7 = frameSeed(stripId, 7);
  const hangSide = rotateZ >= 0 ? 1 : -1;
  const lightSide = hangSide > 0 ? 1 : -1;
  const endCutPx = 5 + (s7 % 6);
  const endCutSide = (s0 + stripIndex) % 2 === 0 ? "right" : "left";

  const endCut = resolveEndCut(stripIndex + 1, count, { endCutPx, endCutSide });

  return {
    rotateZ,
    tiltX,
    scale,
    offsetY,
    offsetX,
    start,
    count,
    customSvg,
    endCutPx: endCut.endCutPx,
    endCutSide: endCut.endCutSide,
    endCutCorner: endCut.endCutCorner,
    endCutAngle: endCut.endCutAngle,
    endCutInset: endCut.endCutInset,
    wallShadowX: lightSide * (3 + (s4 % 9)),
    wallShadowSkew: rotateZ * 0.65 + ((s5 % 7) - 3) * 0.35,
    wallShadowOrigin: 38 + (s5 % 26),
    wallShadowInset: 8 + (s6 % 10),
    wallShadowWidth: 68 + (s1 % 24),
    wallShadowDrop: 5 + (s4 % 7),
    wallShadowBlur: 4 + (s6 % 5),
    wallShadowAlpha: 0.34 + (s5 % 6) * 0.025,
    wallBow: 0.5 + (s2 % 5) * 0.09,
    wallShadowRoom: 10 + (s6 % 6),
    pinShadowX: lightSide,
    pinShadowY: 2 + (s4 % 2),
  };
}

export function sliceFramesForSnippet(frames, snippet) {
  return frames.slice(snippet.start, snippet.start + snippet.count);
}

/** Pull following content up after scale() — keeps strips visible, removes dead air */
export function getCompactLayoutTrim(frameCount, scale, customSvg = null) {
  const { height } = customSvg
    ? estimateCustomSvgStripSize(customSvg)
    : estimateCompactStripSize(frameCount);
  return Math.max(0, Math.round(height * (1 - scale)));
}
