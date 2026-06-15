// HT.js
import React, { useEffect, useState } from "react";
import HandwritingEngine from "./HandwritingEngine";
import { taglinePathData } from "./taglinePathData";

const MOBILE_ANIMATION_DURATION = 4;
const DESKTOP_ANIMATION_DURATION = 6;
const MOBILE_DEFER_TIMEOUT_MS = 2500;

/** Start handwriting after LCP or idle — keeps logo as LCP on mobile. */
function useDeferAnimationOnMobile(enabled) {
  const [play, setPlay] = useState(!enabled);

  useEffect(() => {
    if (!enabled || play) return undefined;

    let cancelled = false;
    const start = () => {
      if (!cancelled) setPlay(true);
    };

    let observer;
    if (typeof PerformanceObserver !== "undefined") {
      try {
        observer = new PerformanceObserver(() => start());
        observer.observe({ type: "largest-contentful-paint", buffered: true });
        if (performance.getEntriesByType("largest-contentful-paint").length > 0) {
          start();
        }
      } catch {
        // LCP observer unavailable
      }
    }

    let idleId;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: MOBILE_DEFER_TIMEOUT_MS });
    }
    const timer = window.setTimeout(start, MOBILE_DEFER_TIMEOUT_MS);

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      window.clearTimeout(timer);
    };
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
        stroke="#5a7d42"
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
