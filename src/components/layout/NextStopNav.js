import React from 'react';
import { Link } from 'react-router-dom';
import CloudinaryImage from '../CloudinaryImage';

/**
 * Visual "next stop" card for sequential journey navigation at page end.
 */
function NextStopNav({ nextLink, returnLink }) {
  if (!nextLink?.path && !returnLink?.path) return null;

  return (
    <nav
      className="max-w-2xl mx-auto px-5 sm:px-6 pb-20 space-y-6"
      aria-label="Continue the journey"
    >
      {nextLink?.path && (
        <Link
          to={nextLink.path}
          className="group block overflow-hidden rounded-xl border border-white/15 bg-stone-950/55 backdrop-blur-md shadow-lg hover:border-editorialGold/45 transition-colors"
        >
          <div className="flex items-stretch min-h-[7.5rem]">
            {nextLink.image && (
              <div className="w-28 sm:w-36 flex-shrink-0 relative">
                <CloudinaryImage
                  legacyPath={nextLink.image}
                  alt=""
                  sizes="144px"
                  widths={[200, 400]}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 px-5 py-5 sm:px-6 sm:py-6 min-w-0 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-editorialGold/90 mb-1.5">
                {nextLink.eyebrow || 'Next stop'}
              </p>
              <h3 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#F5F0E8] group-hover:text-white transition-colors leading-tight">
                {nextLink.label}
              </h3>
              {nextLink.tagline && (
                <p className="mt-1.5 text-sm text-stone-400 italic font-cormorant leading-snug">
                  {nextLink.tagline}
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-editorialGold">
                Continue
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      )}

      {returnLink?.path && (
        <div className="flex justify-center">
          <Link
            to={returnLink.path}
            className="inline-flex items-center gap-2 text-editorialGold hover:text-editorialCream transition-colors bg-stone-950/70 backdrop-blur-md rounded-full px-5 py-2 border border-white/10 shadow-md text-xs font-bold tracking-widest uppercase"
          >
            <span aria-hidden="true">←</span>
            {returnLink.label}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NextStopNav;
