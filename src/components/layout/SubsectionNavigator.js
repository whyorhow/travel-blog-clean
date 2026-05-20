import React from 'react';
import { Link } from 'react-router-dom';
import ContextMap from '../ContextMap';
import CloudinaryImage from '../CloudinaryImage';
import { tw } from '../../styles';

/**
 * SubsectionNavigator — clickable section cards + context map
 *
 * Heading and cards first; hand-drawn map sits below once thumbnails are in play.
 *
 * @param {Object} locationCoords — Coordinates from destinations.json
 * @param {Array<{ title: string, path: string, image?: string, imageAlt?: string }>} sections
 * @param {string} [heading="Inside the City"] — Navigator heading
 * @param {string} [contextText] — Optional spatial grounding text
 */
function SubsectionNavigator({
  locationCoords,
  sections,
  heading = 'Inside the City',
  contextText,
}) {
  return (
    <div className="py-12 w-full px-4 md:px-6">
      <h2 className={`text-4xl font-semibold mb-6 text-center ${tw.gold}`}>
        {heading}
      </h2>

      {contextText && (
        <p className="text-sm text-stone-500 text-center mb-10 max-w-xl mx-auto">
          {contextText}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 md:mb-16">
        {sections.map((section) => (
          <Link
            key={section.title}
            to={section.path}
            className="group flex items-center gap-3.5 p-3 rounded-lg border border-stone-200/70 bg-white/35 hover:bg-white/55 hover:border-stone-300/80 shadow-sm transition-all duration-300"
          >
            {section.image && (
              <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] flex-shrink-0 rounded-md overflow-hidden bg-stone-100/80">
                <CloudinaryImage
                  legacyPath={section.image}
                  alt={section.imageAlt || section.title}
                  sizes="80px"
                  widths={[120, 240]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <span className="flex-1 min-w-0 text-2xl sm:text-[1.65rem] font-handwriting text-stone-800 group-hover:text-stone-600 transition-colors duration-300 leading-tight">
              {section.title}
            </span>
            <span
              className="w-7 h-7 flex-shrink-0 rounded-full border-2 border-stone-500/70 bg-stone-200/80 flex items-center justify-center group-hover:border-stone-700 group-hover:bg-stone-300/90 transition-all duration-300"
              aria-hidden
            >
              <img src="/assets/plus.svg" alt="" className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="w-full max-w-lg mx-auto px-2">
        <ContextMap
          markers={locationCoords ? [locationCoords] : []}
          zoomToId={locationCoords?.id}
          title={`Where is ${locationCoords?.name || 'this location'}?`}
          geography={locationCoords?.geography}
          lightBackground
        />
      </div>
    </div>
  );
}

export default SubsectionNavigator;
