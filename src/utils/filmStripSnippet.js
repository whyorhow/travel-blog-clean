import { frameSeed } from "./filmstripPool";

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
  const tiltX = 3.2 + (s1 % 4) * 0.85;
  const scale = 0.36 + (s2 % 6) * 0.018;
  const offsetY = 0;

  const minFrames = 3;
  const maxFrames = Math.min(5, Math.max(minFrames, totalFrames));
  const count = Math.min(maxFrames, minFrames + (s2 % (maxFrames - minFrames + 1)));
  const maxStart = Math.max(0, totalFrames - count);
  const start = maxStart > 0 ? s3 % (maxStart + 1) : 0;

  const offsetPercents = [-14, -7, -3, 0, 4, 8, 12, -10, 6];
  const offsetX = offsetPercents[(s0 + stripIndex) % offsetPercents.length];

  const s4 = frameSeed(stripId, 4);
  const s5 = frameSeed(stripId, 5);
  const s6 = frameSeed(stripId, 6);
  const hangSide = rotateZ >= 0 ? 1 : -1;
  const lightSide = hangSide > 0 ? 1 : -1;

  return {
    rotateZ,
    tiltX,
    scale,
    offsetY,
    offsetX,
    start,
    count,
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

/** Matches compact `--film-mm` (~1.35px) for layout slot sizing */
const COMPACT_MM = 1.35;

export function estimateCompactStripSize(frameCount) {
  const mm = COMPACT_MM;
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

/** Pull following content up after scale() — keeps strips visible, removes dead air */
export function getCompactLayoutTrim(frameCount, scale) {
  const { height } = estimateCompactStripSize(frameCount);
  return Math.max(0, Math.round(height * (1 - scale)));
}
