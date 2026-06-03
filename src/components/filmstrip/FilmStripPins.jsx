import React, { useMemo } from "react";
import { frameSeed } from "../../utils/filmstripPool";
import {
  COMPACT_FILM_MM,
  GUIDE_STRIP_OVERRIDES,
  snapRightPinOffHoles,
} from "../../utils/filmStripSnippet";
const PIN_OPTIONS = [
  `${process.env.PUBLIC_URL}/assets/nomads-gallery/Red-Pin1.svg`,
  `${process.env.PUBLIC_URL}/assets/nomads-gallery/Red-Pin2.svg`,
  `${process.env.PUBLIC_URL}/assets/nomads-gallery/Red-Pin3.svg`,
];

/** Matches compact pin width in filmstrip.css (pre-zoom layout px) */
const PIN_LAYOUT_WIDTH_PX = 42;

function pickPinSrc(stripId, slot, avoidIdx = -1) {
  let idx = frameSeed(`${stripId}-pin-style`, slot) % PIN_OPTIONS.length;
  if (idx === avoidIdx) idx = (idx + 1) % PIN_OPTIONS.length;
  return { src: PIN_OPTIONS[idx], idx };
}

/** Top edge of the film card — small inset from each corner, slight along-edge wobble. */
function pickCornerPlacement(
  stripId,
  corner,
  { rightPinShiftLeft = 0, stripWidthPx, snapRightPin = false, pinAnchors = null }
) {
  const gapSeed = frameSeed(`${stripId}-pin-gap`, corner === "left" ? 0 : 2);
  const alongSeed = frameSeed(`${stripId}-pin-top`, corner === "left" ? 1 : 3);
  const rotSeed = frameSeed(`${stripId}-pin-rot`, corner === "left" ? 4 : 5);
  const rotation = -14 + (rotSeed % 29);
  const along = alongSeed % 4;

  const anchor = pinAnchors?.[corner];
  if (anchor?.xPct != null) {
    return {
      left: `${anchor.xPct}%`,
      top: anchor.yPct != null ? `${anchor.yPct}%` : `${along}px`,
      "--pin-rotate": `${rotation}deg`,
    };
  }

  if (corner === "left") {
    const edgeGap = 7 + (gapSeed % 17);
    return {
      left: `${edgeGap}px`,
      top: `${along}px`,
      "--pin-rotate": `${rotation}deg`,
    };
  }

  let edgeGap = 3 + (gapSeed % 7) + rightPinShiftLeft;

  if (snapRightPin && stripWidthPx) {
    edgeGap = snapRightPinOffHoles({
      stripWidthPx,
      filmMmPx: COMPACT_FILM_MM,
      pinWidthPx: PIN_LAYOUT_WIDTH_PX,
      startRightPx: edgeGap,
    });
  }

  return {
    right: `${edgeGap}px`,
    top: `${along}px`,
    "--pin-rotate": `${rotation}deg`,
  };
}

/** Two paper pins straddling the top edge of the strip (through the film stock). */
export default function FilmStripPins({
  stripId = "strip",
  stripIndex = 0,
  stripWidthPx,
  useCustomSvg = false,
  pinAnchors = null,
}) {
  const guideOverride = GUIDE_STRIP_OVERRIDES[stripIndex + 1];
  const rightPinShiftLeft = guideOverride?.rightPinShiftLeft ?? 0;
  const snapRightPin = !useCustomSvg && (guideOverride?.snapRightPinOffHoles ?? false);
  const anchors = pinAnchors ?? guideOverride?.pinAnchors ?? null;

  const pins = useMemo(() => {
    const pinOpts = { rightPinShiftLeft, stripWidthPx, snapRightPin, pinAnchors: anchors };
    const leftPin = pickPinSrc(stripId, 0);
    const rightPin = pickPinSrc(stripId, 7, leftPin.idx);

    return [
      {
        ...leftPin,
        placement: pickCornerPlacement(stripId, "left", pinOpts),
        className: "film-strip-pin film-strip-pin--left",
      },
      {
        ...rightPin,
        placement: pickCornerPlacement(stripId, "right", pinOpts),
        className: "film-strip-pin film-strip-pin--right",
      },
    ];
  }, [stripId, rightPinShiftLeft, stripWidthPx, snapRightPin, anchors]);

  return (
    <>
      {pins.map((pin) => (
        <span
          key={pin.className}
          className={pin.className}
          style={pin.placement}
          aria-hidden
        >
          <img src={pin.src} alt="" className="film-strip-pin__img" draggable={false} />
        </span>
      ))}
    </>
  );
}
