import React, { useCallback, useEffect, useState } from 'react';
import JournalMap from './JournalMap';
import { DRAWN_MAPS } from '../config/journalMaps';

const CLOSE_SRC = '/assets/crossv2.svg';

const AIRPORT_INFO = {
  title: 'Florianópolis airport',
  body: [
    {
      code: 'FLN',
      name: 'Hercílio Luz International',
      text: 'The main airport sits on the mainland, north of the island. Most visitors cross the bridge or causeway into Florianópolis from here — the city and beaches unfold after that short hop.',
    },
  ],
};

/**
 * Map marker positions (% of image). Fine-tune with offsetX / offsetY (px).
 */
export const FLORIANOPOLIS_MAP_HOTSPOTS = [
  {
    id: 'campeche',
    label: 'Campeche',
    left: 32,
    top: 28,
    offsetX: -80,
    offsetY: 65,
    to: '#campeche',
  },
  {
    id: 'santo-antonio',
    label: 'Santo Antônio de Lisboa',
    left: 18,
    top: 55,
    offsetX: -35,
    offsetY: 32,
    to: '#santo-antonio',
  },
  {
    id: 'praia-do-forte',
    label: 'Praia do Forte',
    left: 55,
    top: 35,
    offsetX: -65,
    offsetY: 27,
    to: '#praia-do-forte',
  },
  {
    id: 'hercilio-luz-bridge',
    label: 'Hercílio Luz Bridge',
    left: 48,
    top: 12,
    offsetX: 260,
    offsetY: 120,
    to: '#hercilio-luz-bridge',
  },
  {
    id: 'lagoa-da-conceicao',
    label: 'Lagoa da Conceição',
    left: 72,
    top: 62,
    offsetX: 60,
    to: '#lagoa-da-conceicao',
  },
  {
    id: 'praia-da-solidao',
    label: 'Praia da Solidão',
    left: 22,
    top: 78,
    offsetX: 70,
    offsetY: 10,
    to: '#praia-da-solidao',
  },
  {
    id: 'pantano-do-sul',
    label: 'Praia do Pântano do Sul',
    left: 52,
    top: 42,
    offsetX: 100,
    offsetY: 220,
    to: '#pantano-do-sul',
  },
  {
    id: 'capital-city',
    label: 'Capital city',
    left: 58,
    top: 22,
    offsetX: 180,
    offsetY: 170,
    to: '#capital-city',
  },
  {
    id: 'fln',
    label: 'Florianópolis airport — FLN',
    left: 90,
    top: 86,
    offsetX: -5,
    offsetY: -40,
    info: 'airport',
  },
];

function AirportInfoBox({ onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="florianopolis-airport-info-title"
        className="relative w-full max-w-sm sm:max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white shadow-md hover:bg-stone-50 transition-colors"
          aria-label="Close airport information"
        >
          <img src={CLOSE_SRC} alt="" className="w-6 h-6" aria-hidden />
        </button>

        <h3
          id="florianopolis-airport-info-title"
          className="font-handwriting text-xl sm:text-2xl text-[#F2E4B3] mb-3 px-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
        >
          {AIRPORT_INFO.title}
        </h3>

        <div className="space-y-3">
          {AIRPORT_INFO.body.map(({ code, name, text }) => (
            <article
              key={code}
              className="rounded-lg border border-stone-300 bg-white px-4 py-3.5 sm:px-5 sm:py-4 shadow-[0_4px_16px_rgba(28,25,23,0.14)]"
            >
              <h4 className="font-cormorant text-base sm:text-lg font-semibold text-stone-950 tracking-wide">
                {code}
                <span className="font-normal text-stone-700"> — {name}</span>
              </h4>
              <p className="mt-1.5 font-cormorant text-[15px] sm:text-base leading-relaxed text-stone-900">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlorianopolisJournalMap({
  publicId = DRAWN_MAPS.florianopolis.publicId,
  version = DRAWN_MAPS.florianopolis.version,
  alt = DRAWN_MAPS.florianopolis.alt,
  hotspots = FLORIANOPOLIS_MAP_HOTSPOTS,
  compactSpacing,
}) {
  const [airportInfoOpen, setAirportInfoOpen] = useState(false);
  const closeAirportInfo = useCallback(() => setAirportInfoOpen(false), []);
  const handleOpenInfo = useCallback((infoId) => {
    if (infoId === 'airport') setAirportInfoOpen(true);
  }, []);

  return (
    <JournalMap
      publicId={publicId}
      version={version}
      alt={alt}
      mapLabel={DRAWN_MAPS.florianopolis.label}
      sectionId="florianopolis-journal-map"
      hotspots={hotspots}
      onOpenInfo={handleOpenInfo}
      overlay={airportInfoOpen ? <AirportInfoBox onClose={closeAirportInfo} /> : null}
      compactSpacing={compactSpacing}
    />
  );
}

export default FlorianopolisJournalMap;
