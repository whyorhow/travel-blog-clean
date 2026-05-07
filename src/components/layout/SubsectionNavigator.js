import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContextMap from '../ContextMap';
import { tw } from '../../styles';

/**
 * SubsectionNavigator — Map + clickable section list
 * 
 * Solves the hierarchy problem: users always know there's "more inside this place."
 * Left: Context map with location marker
 * Right: "Inside the City" + list of subsections
 * 
 * @param {Object} locationCoords — Coordinates from destinations.json
 * @param {Array} sections — Array of { title, path } objects
 * @param {string} [heading="Inside the City"] — Navigator heading
 * @param {string} [contextText] — Optional spatial grounding text
 */
function SubsectionNavigator({ 
  locationCoords, 
  sections, 
  heading = "Inside the City",
  contextText
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-0 py-12 w-full md:gap-8">
      {/* Map */}
      <div className="w-full md:w-1/2 px-6 mb-12 md:mb-0 md:mt-16">
        <ContextMap
          markers={locationCoords ? [locationCoords] : []}
          zoomToId={locationCoords?.id}
          title={`Where is ${locationCoords?.name || 'this location'}?`}
          geography={locationCoords?.geography}
          lightBackground
        />
      </div>

      {/* Subsection list */}
      <div className="w-full md:w-1/2 px-4">
        <h2 className={`text-4xl font-semibold mb-12 text-center ${tw.gold}`}>
          {heading}
        </h2>

        {contextText && (
          <p className="text-sm text-stone-500 text-center mb-10">
            {contextText}
          </p>
        )}

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              onClick={() => navigate(section.path)}
              className="cursor-pointer border-b border-stone-200 pb-6 hover:pl-2 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between max-w-sm mx-auto">
                <h2 className="text-3xl md:text-4xl font-handwriting text-stone-800 group-hover:text-stone-600 transition-colors duration-300">
                  {section.title}
                </h2>
                <div className="w-8 h-8 rounded-full border-2 border-stone-600 bg-stone-200 flex items-center justify-center group-hover:border-stone-800 group-hover:bg-stone-300 transition-all duration-300">
                  <img src="/assets/plus.svg" alt="Expand" className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubsectionNavigator;
