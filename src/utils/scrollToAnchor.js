/**
 * Scroll to an in-page anchor instantly once the target mounts (lazy routes, etc.).
 */
export function scrollToAnchorId(id, { maxWaitMs = 4000, onFound, onTimeout } = {}) {
  if (!id) {
    onTimeout?.();
    return () => {};
  }

  let cancelled = false;
  let frameId = 0;
  const startedAt = Date.now();

  const tryScroll = () => {
    if (cancelled) return;

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      onFound?.();
      return;
    }

    if (Date.now() - startedAt < maxWaitMs) {
      frameId = requestAnimationFrame(tryScroll);
      return;
    }

    onTimeout?.();
  };

  tryScroll();

  return () => {
    cancelled = true;
    if (frameId) cancelAnimationFrame(frameId);
  };
}

export function scrollToLocationHash(hash, callbacks) {
  const id = hash?.replace(/^#/, '') ?? '';
  return scrollToAnchorId(id, callbacks);
}
