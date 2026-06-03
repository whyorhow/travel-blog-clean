import React from "react";

/**
 * Shown while a lazy route chunk loads. Keeps nav/footer visible; reads as a page opening, not a blank app.
 */
export default function RouteLoadingFallback() {
  return (
    <div
      className="flex-grow min-h-[50vh] px-4 py-10"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
        <div className="h-40 md:h-56 rounded-xl bg-black/10" />
        <div className="h-4 w-2/3 mx-auto rounded bg-black/10" />
        <div className="h-3 w-full rounded bg-black/5" />
        <div className="h-3 w-5/6 mx-auto rounded bg-black/5" />
        <div className="h-3 w-4/5 mx-auto rounded bg-black/5" />
      </div>
      <p className="mt-8 text-center font-cormorant italic text-goldAccent/80 text-sm tracking-widest">
        Opening page…
      </p>
    </div>
  );
}
