import { useEffect, useRef } from "react";

const SETTLE_MS = 220;

/**
 * Adds `archive-is-scrolling` on the archive root while the page is scrolling.
 * Film glimmer / gloss only render during active scroll.
 */
export function useArchiveScrollGlimmer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let timer;

    const onScroll = () => {
      root.classList.add("archive-is-scrolling");
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        root.classList.remove("archive-is-scrolling");
      }, SETTLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
      root.classList.remove("archive-is-scrolling");
    };
  }, []);

  return rootRef;
}
