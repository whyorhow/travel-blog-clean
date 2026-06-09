import React, { useCallback, useEffect, useState } from 'react';
import JournalMap from './JournalMap';
import { DRAWN_MAPS } from '../config/journalMaps';
import { scrollToAnchorId } from '../utils/scrollToAnchor';

const CLOSE_SRC = '/assets/crossv2.svg';

const AIRPORT_INFO = {
  title: 'Rio airports',
  body: [
    {
      code: 'GIG',
      name: 'Galeão — Tom Jobim International',
      text: 'Rio\'s main international airport sits on Ilha do Governador, north-east of the city. Most overseas arrivals land here before travelling across the bay toward the beaches and hills.',
    },
    {
      code: 'SDU',
      name: 'Santos Dumont',
      text: 'A smaller airport pressed right against the bay, mainly used for domestic flights. Flying in here means touching down with Corcovado and Sugarloaf already in view.',
    },
  ],
};

const HELICOPTER_INFO = {
  title: 'Above the city by helicopter',
  body: [
    {
      heading: 'Christ the Redeemer from the air',
      text: 'We took a helicopter tour that circled Corcovado — the statue close enough to feel monumental, the city spread below in a single sweeping view. It is expensive and brief, but it compresses Rio\'s geography in a way no viewpoint on foot quite manages.',
    },
    {
      heading: 'On the page',
      text: 'Scroll to the helicopter section below for the photograph from that flight.',
      linkLabel: 'View the photograph',
      linkTo: '#helicopter',
    },
  ],
};

/**
 * Map marker positions (% of image). Fine-tune with offsetX / offsetY (px).
 */
export const RIO_MAP_HOTSPOTS = [
  {
    id: 'sambadrome',
    label: 'Sambadrome',
    left: 68,
    top: 42,
    offsetX: -20,
    to: '#sambadrome',
  },
  {
    id: 'sugarloaf',
    label: 'Sugarloaf Mountain',
    left: 78,
    top: 58,
    offsetX: 140,
    offsetY: -125,
    to: '#sugarloaf',
  },
  {
    id: 'santa-teresa',
    label: 'Santa Teresa',
    left: 22,
    top: 38,
    offsetX: -15,
    offsetY: 5,
    to: '#santa-teresa',
  },
  {
    id: 'ipanema',
    label: 'Ipanema',
    left: 32,
    top: 72,
    offsetX: -60,
    offsetY: -15,
    to: '#ipanema',
  },
  {
    id: 'christ-the-redeemer',
    label: 'Christ the Redeemer',
    left: 52,
    top: 28,
    offsetX: -70,
    offsetY: -20,
    to: '#christ-the-redeemer',
  },
  {
    id: 'lapa',
    label: 'Lapa',
    left: 40,
    top: 52,
    offsetX: 170,
    offsetY: -108,
    to: '#lapa',
  },
  {
    id: 'gig',
    label: 'Rio airports — GIG & SDU',
    left: 88,
    top: 14,
    offsetX: -25,
    offsetY: 40,
    info: 'airport',
  },
  {
    id: 'helicopter',
    label: 'Helicopter tour',
    left: 46,
    top: 44,
    offsetX: 380,
    offsetY: 185,
    info: 'helicopter',
  },
  {
    id: 'copacabana',
    label: 'Copacabana beach',
    left: 50,
    top: 70,
    offsetY: -110,
    to: '#copacabana',
  },
];

function InfoDialog({ title, onClose, children }) {
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
        aria-labelledby="rio-map-info-title"
        className="relative w-full max-w-sm sm:max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white shadow-md hover:bg-stone-50 transition-colors"
          aria-label="Close information"
        >
          <img src={CLOSE_SRC} alt="" className="w-6 h-6" aria-hidden />
        </button>

        <h3
          id="rio-map-info-title"
          className="font-handwriting text-xl sm:text-2xl text-[#F2E4B3] mb-3 px-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
        >
          {title}
        </h3>

        {children}
      </div>
    </div>
  );
}

function AirportInfoBox({ onClose }) {
  return (
    <InfoDialog title={AIRPORT_INFO.title} onClose={onClose}>
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
    </InfoDialog>
  );
}

function HelicopterInfoBox({ onClose, onNavigateToPhoto }) {
  return (
    <InfoDialog title={HELICOPTER_INFO.title} onClose={onClose}>
      <div className="space-y-3">
        {HELICOPTER_INFO.body.map((section) => (
          <article
            key={section.heading}
            className="rounded-lg border border-stone-300 bg-white px-4 py-3.5 sm:px-5 sm:py-4 shadow-[0_4px_16px_rgba(28,25,23,0.14)]"
          >
            <h4 className="font-cormorant text-base sm:text-lg font-semibold text-stone-950 tracking-wide">
              {section.heading}
            </h4>
            <p className="mt-1.5 font-cormorant text-[15px] sm:text-base leading-relaxed text-stone-900">
              {section.text}
            </p>
            {section.linkTo && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToPhoto?.(section.linkTo);
                }}
                className="mt-3 font-cormorant text-[15px] sm:text-base font-semibold text-[#8C6A2A] hover:text-[#6B521F] underline underline-offset-2 transition-colors"
              >
                {section.linkLabel}
              </button>
            )}
          </article>
        ))}
      </div>
    </InfoDialog>
  );
}

function RioJournalMap({
  publicId = DRAWN_MAPS.rio.publicId,
  version = DRAWN_MAPS.rio.version,
  alt = DRAWN_MAPS.rio.alt,
  hotspots = RIO_MAP_HOTSPOTS,
  compactSpacing,
}) {
  const [airportInfoOpen, setAirportInfoOpen] = useState(false);
  const [helicopterInfoOpen, setHelicopterInfoOpen] = useState(false);

  const closeAirportInfo = useCallback(() => setAirportInfoOpen(false), []);
  const closeHelicopterInfo = useCallback(() => setHelicopterInfoOpen(false), []);

  const handleOpenInfo = useCallback((infoId) => {
    if (infoId === 'airport') setAirportInfoOpen(true);
    if (infoId === 'helicopter') setHelicopterInfoOpen(true);
  }, []);

  const handleNavigateToPhoto = useCallback((hash) => {
    const id = hash.replace(/^#/, '');
    window.location.hash = id;
    scrollToAnchorId(id);
  }, []);

  const overlay = airportInfoOpen ? (
    <AirportInfoBox onClose={closeAirportInfo} />
  ) : helicopterInfoOpen ? (
    <HelicopterInfoBox
      onClose={closeHelicopterInfo}
      onNavigateToPhoto={handleNavigateToPhoto}
    />
  ) : null;

  return (
    <JournalMap
      publicId={publicId}
      version={version}
      alt={alt}
      mapLabel={DRAWN_MAPS.rio.label}
      sectionId="rio-journal-map"
      hotspots={hotspots}
      onOpenInfo={handleOpenInfo}
      overlay={overlay}
      compactSpacing={compactSpacing}
    />
  );
}

export default RioJournalMap;
