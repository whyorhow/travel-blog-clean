/** Fade out the static /brazil hero overlay once the React hero has painted. */
export function dismissBrazilLcpPersist() {
  const el = document.getElementById('brazil-lcp-persist');
  if (!el) return;
  el.style.opacity = '0';
  window.setTimeout(() => el.remove(), 160);
}

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
}
