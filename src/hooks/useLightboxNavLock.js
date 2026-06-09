import { useEffect } from 'react';

/** Ref-count so nested overlays restore nav only when all are closed. */
let lightboxNavLockCount = 0;

function applyLightboxNavLock() {
  lightboxNavLockCount += 1;
  document.body.classList.add('lightbox-active');

  return () => {
    lightboxNavLockCount = Math.max(0, lightboxNavLockCount - 1);
    if (lightboxNavLockCount === 0) {
      document.body.classList.remove('lightbox-active');
    }
  };
}

/** Hide global burger/search nav while a lightbox or fullscreen overlay is open. */
export function useLightboxNavLock(active = true) {
  useEffect(() => {
    if (!active) return undefined;
    return applyLightboxNavLock();
  }, [active]);
}
