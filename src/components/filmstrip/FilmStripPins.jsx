import React, { useMemo } from "react";
import { frameSeed } from "../../utils/filmstripPool";

const PIN_OPTIONS = [
  `${process.env.PUBLIC_URL}/assets/nomads-gallery/Red-Pin1.svg`,
  `${process.env.PUBLIC_URL}/assets/nomads-gallery/Red-Pin2.svg`,
  `${process.env.PUBLIC_URL}/assets/nomads-gallery/Red-Pin3.svg`,
];

function pickPinSrc(stripId, slot, avoidIdx = -1) {
  let idx = frameSeed(`${stripId}-pin-style`, slot) % PIN_OPTIONS.length;
  if (idx === avoidIdx) idx = (idx + 1) % PIN_OPTIONS.length;
  return { src: PIN_OPTIONS[idx], idx };
}

/** Top edge of the film card — small inset from each corner, slight along-edge wobble. */
function pickCornerPlacement(stripId, corner) {
  const gapSeed = frameSeed(`${stripId}-pin-gap`, corner === "left" ? 0 : 2);
  const alongSeed = frameSeed(`${stripId}-pin-top`, corner === "left" ? 1 : 3);
  const rotSeed = frameSeed(`${stripId}-pin-rot`, corner === "left" ? 4 : 5);
  const rotation = -14 + (rotSeed % 29);

  if (corner === "left") {
    const edgeGap = 7 + (gapSeed % 17);
    const along = alongSeed % 4;
    return {
      left: `${edgeGap}px`,
      top: `${along}px`,
      "--pin-rotate": `${rotation}deg`,
    };
  }

  const edgeGap = 3 + (gapSeed % 7);
  const along = alongSeed % 4;
  return {
    right: `${edgeGap}px`,
    top: `${along}px`,
    "--pin-rotate": `${rotation}deg`,
  };
}

/** Two paper pins straddling the top edge of the strip (through the film stock). */
export default function FilmStripPins({ stripId = "strip" }) {
  const pins = useMemo(() => {
    const leftPin = pickPinSrc(stripId, 0);
    const rightPin = pickPinSrc(stripId, 7, leftPin.idx);

    return [
      {
        ...leftPin,
        placement: pickCornerPlacement(stripId, "left"),
        className: "film-strip-pin film-strip-pin--left",
      },
      {
        ...rightPin,
        placement: pickCornerPlacement(stripId, "right"),
        className: "film-strip-pin film-strip-pin--right",
      },
    ];
  }, [stripId]);

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
