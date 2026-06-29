import React from "react";

/**
 * Shown while a lazy route chunk loads on the homepage.
 * Interior routes use static HTML heroes or a null Suspense fallback instead.
 */
export default function RouteLoadingFallback() {
  return (
    <div
      className="flex-grow min-h-[40vh]"
      aria-live="polite"
      aria-busy="true"
      aria-label="Opening page"
    />
  );
}
