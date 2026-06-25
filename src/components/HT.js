// HT.js
import React, { useEffect, useState } from "react";
import HandwritingEngine from "./HandwritingEngine";
import { taglinePathData } from "./taglinePathData";

const MOBILE_ANIMATION_DURATION = 4;
const DESKTOP_ANIMATION_DURATION = 6;
const MOBILE_DEFER_TIMEOUT_MS = 2500;

/** Defer handwriting on mobile so the logo stays LCP. */
function useDeferAnimationOnMobile(enabled) {
  const [play, setPlay] = useState(!enabled);

  useEffect(() => {
    if (!enabled || play) return undefined;

    const timer = window.setTimeout(() => setPlay(true), MOBILE_DEFER_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [enabled, play]);

  return play;
}

export default function HT({ instantOnMobile = false }) {
  const isMobile =
    instantOnMobile &&
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  const playAnimation = useDeferAnimationOnMobile(isMobile);

  return (
    <div>
      <HandwritingEngine
        d={taglinePathData}
        stroke="#7daa5c"
        strokeWidth={1.5}
        duration={isMobile ? MOBILE_ANIMATION_DURATION : DESKTOP_ANIMATION_DURATION}
        play={playAnimation}
        pressure="medium"
        viewBox="0 0 303 18"
        width="100%"
        height="auto"
      />
    </div>
  );
}
