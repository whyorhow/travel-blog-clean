import React, { useCallback, useEffect, useState } from 'react';
import JournalMap from './JournalMap';
import { DRAWN_MAPS } from '../config/journalMaps';

const CLOSE_SRC = '/assets/crossv2.svg';

const AIRPORT_INFO = {
  title: 'Salvador airport',
  body: [
    {
      code: 'SSA',
      name: 'Deputado Luís Eduardo Magalhães',
      text: 'Salvador\'s international airport sits outside the city centre. Most visitors arrive here before travelling into Pelourinho and the coast.',
    },
  ],
};

/**
 * Map marker positions (% of image). Fine-tune with offsetX / offsetY (px).
 */
export const SALVADOR_MAP_HOTSPOTS = [
  {
    id: 'pelourinho',
    label: 'Pelourinho',
    left: 48,
    top: 42,
    offsetY: 7,
    to: '#pelourinho',
  },
  {
    id: 'baiana',
    label: 'Baiana seller',
    left: 44,
    top: 52,
    offsetX: -230,
    offsetY: 100,
    to: '#baiana',
  },
  {
    id: 'bonfim-ribbons',
    label: 'Bonfim ribbons',
    left: 72,
    top: 35,
    offsetX: 50,
    to: '#bonfim-ribbons',
  },
  {
    id: 'capoeira',
    label: 'Capoeira',
    left: 38,
    top: 48,
    offsetX: -180,
    offsetY: 40,
    to: '#capoeira',
  },
  {
    id: 'cathedral-basilica',
    label: 'Cathedral Basilica',
    left: 70,
    top: 32,
    offsetX: -200,
    offsetY: -30,
    to: '#cathedral-basilica',
  },
  {
    id: 'igreja-do-bonfim',
    label: 'Igreja do Bonfim',
    left: 50,
    top: 38,
    offsetX: 70,
    offsetY: -90,
    to: '#igreja-do-bonfim',
  },
  {
    id: 'ssa',
    label: 'Salvador airport — SSA',
    left: 88,
    top: 12,
    offsetX: 10,
    offsetY: 140,
    info: 'airport',
  },
  {
    id: 'farol-da-barra',
    label: 'Farol da Barra lighthouse',
    left: 18,
    top: 78,
    offsetX: 550,
    offsetY: -170,
    to: '#farol-da-barra',
  },
  {
    id: 'barra-beach',
    label: 'Barra beach',
    left: 22,
    top: 88,
    offsetX: 370,
    offsetY: -140,
    to: '#barra-beach',
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
        aria-labelledby="salvador-airport-info-title"
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
          id="salvador-airport-info-title"
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

function SalvadorJournalMap({
  publicId = DRAWN_MAPS.salvador.publicId,
  version = DRAWN_MAPS.salvador.version,
  alt = DRAWN_MAPS.salvador.alt,
  hotspots = SALVADOR_MAP_HOTSPOTS,
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
      mapLabel={DRAWN_MAPS.salvador.label}
      sectionId="salvador-journal-map"
      hotspots={hotspots}
      onOpenInfo={handleOpenInfo}
      overlay={airportInfoOpen ? <AirportInfoBox onClose={closeAirportInfo} /> : null}
      compactSpacing={compactSpacing}
    />
  );
}

export default SalvadorJournalMap;
