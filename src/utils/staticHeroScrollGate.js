import { useEffect } from 'react';

/** Defer React page chunk until after static hero LCP window (not scroll-triggered). */
export const STATIC_HERO_PAGE_CHUNK_DELAY_MS = 4000;

/** Below-fold reveal: scroll delta from mount position + minimum dwell. */
export const STATIC_HERO_BELOW_FOLD_SCROLL_DELTA = 160;
export const STATIC_HERO_BELOW_FOLD_MIN_DWELL_MS = 6000;
export const STATIC_HERO_BELOW_FOLD_FALLBACK_MS = 60000;

/**
 * Load page chunk on a timer when static HTML hero is LCP.
 * Scroll-triggered load caused PSI to mount React while already scrolled,
 * then journal map / gallery images replaced the hero as LCP (~24s).
 */
export function useStaticHeroPageChunkLoader(staticHeroActive, importPage, setPage) {
  useEffect(() => {
    if (!staticHeroActive) {
      importPage().then(({ default: Page }) => setPage(() => Page));
      return undefined;
    }
    let cancelled = false;
    let loaded = false;
    const load = () => {
      if (loaded || cancelled) return;
      loaded = true;
      importPage().then(({ default: Page }) => {
        if (!cancelled) setPage(() => Page);
      });
    };
    const timer = window.setTimeout(load, STATIC_HERO_PAGE_CHUNK_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [staticHeroActive, importPage, setPage]);
}

/** Keep static hero as LCP until deliberate scroll from mount position. */
export function useStaticHeroBelowFoldGate(deferBelowFold, setDeferBelowFold) {
  useEffect(() => {
    if (!deferBelowFold) return undefined;
    const mountAt = performance.now();
    const mountScrollY = window.scrollY;
    const reveal = () => setDeferBelowFold(false);
    const onScroll = () => {
      if (performance.now() - mountAt < STATIC_HERO_BELOW_FOLD_MIN_DWELL_MS) return;
      if (window.scrollY >= mountScrollY + STATIC_HERO_BELOW_FOLD_SCROLL_DELTA) {
        reveal();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = window.setTimeout(reveal, STATIC_HERO_BELOW_FOLD_FALLBACK_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(fallback);
    };
  }, [deferBelowFold, setDeferBelowFold]);
}
