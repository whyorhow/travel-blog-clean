import { useLayoutEffect, useState } from "react";

/** Tiny breathing room between one strip’s bottom edge and the next title */
const GAP_AFTER_VISUAL = 2;

/**
 * Collapse dead space left by transform: scale() on the strip object.
 * Measures layout height vs painted height after each render.
 */
export function useCompactStripTrim(objectRef, enabled, fallbackTrim = 0) {
  const [trim, setTrim] = useState(fallbackTrim);

  useLayoutEffect(() => {
    if (!enabled) return undefined;
    const el = objectRef.current;
    if (!el) return undefined;

    const measure = () => {
      const layoutH = el.offsetHeight;
      const visualH = el.getBoundingClientRect().height;
      const next = Math.max(0, Math.round(layoutH - visualH - GAP_AFTER_VISUAL));
      setTrim((prev) => (prev === next ? prev : next));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => ro.disconnect();
  }, [enabled, fallbackTrim]);

  return trim;
}
