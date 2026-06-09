import React, { useCallback, useEffect, useState } from 'react';
import JournalMap from './JournalMap';
import { DRAWN_MAPS } from '../config/journalMaps';

const CLOSE_SRC = '/assets/crossv2.svg';

const AIRPORTS_INFO = {
  title: 'São Paulo airports',
  body: [
    {
      code: 'GRU',
      name: 'Guarulhos',
      text: 'The main international airport, outside the city. Most arrivals from abroad land here before travelling into São Paulo.',
    },
    {
      code: 'CGH',
      name: 'Congonhas',
      text: 'A smaller airport in a city neighbourhood, often used for domestic flights. We flew from here to other cities in Brazil.',
    },
  ],
};

/**
 * Map marker positions (% of image). Fine-tune with offsetX / offsetY (px).
 */
export const SAO_PAULO_MAP_HOTSPOTS = [
  {
    id: 'pinacoteca',
    label: 'Pinacoteca',
    left: 52,
    top: 36,
    offsetY: 20,
    to: '/brazil/saopaulo/galleries#pinacoteca',
  },
  {
    id: 'gru',
    label: 'Arrival at GRU',
    left: 79,
    top: 32,
    info: 'airports',
  },
  {
    id: 'cgh',
    label: 'Congonhas departure — CGH',
    left: 42,
    top: 79,
    info: 'airports',
  },
  {
    id: 'jardim-botanico',
    label: 'Jardim Botânico',
    left: 80,
    top: 74,
    to: '/brazil/saopaulo/green-spaces#jardim-botanico',
  },
  {
    id: 'itaim',
    label: 'Itaim Bibi market & pastel',
    left: 37.5,
    top: 65,
    to: '/brazil/food-drink#itaim-bibi',
  },
  {
    id: 'luz',
    label: 'Estação da Luz',
    left: 72,
    top: 39,
    to: '#estacao-da-luz',
  },
  {
    id: 'street-art',
    label: 'Unexpected street art — Vila Madalena',
    left: 13,
    top: 51,
    to: '/brazil/saopaulo/street-art',
  },
  {
    id: 'carnival',
    label: 'Carnival',
    left: 19,
    top: 30,
    to: '/brazil/saopaulo/carnival',
  },
  {
    id: 'masp',
    label: 'Favourite gallery — MASP',
    left: 34,
    top: 50,
    to: '/brazil/saopaulo/galleries#masp',
  },
  {
    id: 'sushi',
    label: 'Best sushi we found',
    left: 58,
    top: 56,
    to: '/brazil/food-drink#japanese-brazilian',
  },
  {
    id: 'caipirinha',
    label: 'Caipirinha & shared tables',
    left: 45,
    top: 58,
    to: '/brazil/food-drink#food-gathering',
  },
  {
    id: 'ibirapuera',
    label: 'Unexpectedly quiet afternoon — Ibirapuera',
    left: 64,
    top: 70,
    to: '/brazil/saopaulo/green-spaces#ibirapuera',
  },
];

function AirportsInfoBox({ onClose }) {
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
        aria-labelledby="airports-info-title"
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
          id="airports-info-title"
          className="font-handwriting text-xl sm:text-2xl text-[#F2E4B3] mb-3 px-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
        >
          {AIRPORTS_INFO.title}
        </h3>

        <div className="space-y-3">
          {AIRPORTS_INFO.body.map(({ code, name, text }) => (
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

function SaoPauloJournalMap({
  publicId = DRAWN_MAPS.saoPaulo.publicId,
  version = DRAWN_MAPS.saoPaulo.version,
  alt = DRAWN_MAPS.saoPaulo.alt,
  hotspots = SAO_PAULO_MAP_HOTSPOTS,
  compactSpacing,
}) {
  const [airportsInfoOpen, setAirportsInfoOpen] = useState(false);
  const closeAirportsInfo = useCallback(() => setAirportsInfoOpen(false), []);
  const handleOpenInfo = useCallback((infoId) => {
    if (infoId === 'airports') setAirportsInfoOpen(true);
  }, []);

  return (
    <JournalMap
      publicId={publicId}
      version={version}
      alt={alt}
      mapLabel={DRAWN_MAPS.saoPaulo.label}
      sectionId="saopaulo-journal-map"
      hotspots={hotspots}
      onOpenInfo={handleOpenInfo}
      overlay={airportsInfoOpen ? <AirportsInfoBox onClose={closeAirportsInfo} /> : null}
      compactSpacing={compactSpacing}
    />
  );
}

export default SaoPauloJournalMap;
