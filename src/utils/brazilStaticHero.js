/** True when build injected a static /brazil hero above #root (mobile LCP). */
export function hasBrazilStaticHero() {
  return typeof document !== 'undefined' && !!document.getElementById('brazil-static-hero');
}

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
}
