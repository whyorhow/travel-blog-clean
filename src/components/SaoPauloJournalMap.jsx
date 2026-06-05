import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cloudinaryImageUrl } from '../utils/cloudinary';

const MAGNIFY_SRC = '/assets/Magnifyv2.svg';
const CLOSE_SRC = '/assets/crossv2.svg';

/** Torn-edge clip: jagged only on top/bottom, straight on left/right. */
const TOP_TORN = [
  [0, 0], [30, 12], [60, 20], [90, 8], [120, 16], [150, 24], [180, 2],
  [210, 10], [240, 18], [270, 12], [300, 20], [330, 28], [360, 6],
  [390, 14], [420, 22], [450, 8], [480, 16], [510, 24], [540, 2],
  [570, 10], [600, 18], [630, 12], [660, 20], [690, 28], [720, 6],
  [750, 14], [780, 22], [810, 10], [840, 18], [870, 26], [900, 4],
  [930, 12], [960, 20], [990, 8], [1020, 16], [1050, 24], [1080, 6],
  [1110, 14], [1140, 22], [1170, 8], [1200, 0],
];

const BOTTOM_TORN = [
  [1200, 10], [1170, 18], [1140, 26], [1110, 18], [1080, 10], [1050, 28],
  [1020, 20], [990, 16], [960, 24], [930, 14], [900, 22], [870, 30],
  [840, 18], [810, 10], [780, 26], [750, 18], [720, 20], [690, 28],
  [660, 14], [630, 6], [600, 22], [570, 14], [540, 24], [510, 16],
  [480, 10], [450, 18], [420, 26], [390, 14], [360, 22], [330, 30],
  [300, 18], [270, 10], [240, 26], [210, 18], [180, 20], [150, 28],
  [120, 10], [90, 18], [60, 26], [30, 12], [0, 20],
];

const clipPctX = (x) => ((x / 1200) * 100).toFixed(3);
const clipTopY = (y) => ((y / 40) * 4).toFixed(3); // 0..4% depth
const clipBottomY = (y) => (100 - (y / 40) * 4).toFixed(3); // 96..100% depth

const TOP_INTERNAL = TOP_TORN.slice(1, -1); // remove x=0 and x=1200
const BOTTOM_INTERNAL = BOTTOM_TORN.slice(1, -1); // remove x=1200 and x=0

const MAP_TORN_CLIP_PATH = [
  // top edge (straight left/right corners)
  `0% 0%`,
  ...TOP_INTERNAL.map(([x, y]) => `${clipPctX(x)}% ${clipTopY(y)}%`),
  `100% 0%`,

  // right edge straight down
  `100% 100%`,

  // bottom jagged (moving left)
  ...BOTTOM_INTERNAL.map(([x, y]) => `${clipPctX(x)}% ${clipBottomY(y)}%`),

  // left edge straight up (closing back to start)
  `0% 100%`,
].join(', ');

/** Soft lift around the torn silhouette (applied on wrapper, not the artwork). */
const TORN_EDGE_DROP_SHADOW =
  'drop-shadow(0 2px 4px rgba(28, 25, 23, 0.12)) drop-shadow(0 6px 14px rgba(28, 25, 23, 0.07))';

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

function parseRouteTo(to) {
  const hashIndex = to.indexOf('#');
  if (hashIndex === -1) return to;
  return {
    pathname: to.slice(0, hashIndex),
    hash: to.slice(hashIndex),
  };
}

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

function MapMagnifierLink({ hotspot, onOpenInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const offsetX = hotspot.offsetX ?? 0;
  const offsetY = hotspot.offsetY ?? 0;
  const style = {
    left: offsetX ? `calc(${hotspot.left}% + ${offsetX}px)` : `${hotspot.left}%`,
    top: offsetY ? `calc(${hotspot.top}% + ${offsetY}px)` : `${hotspot.top}%`,
  };

  const className =
    'absolute z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 p-1 rounded-full hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorialGold/80 transition-transform duration-200';

  const magnifier = (
    <img
      src={MAGNIFY_SRC}
      alt=""
      className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] pointer-events-none"
      aria-hidden
    />
  );

  if (hotspot.info) {
    return (
      <button
        type="button"
        className={className}
        style={style}
        aria-label={`${hotspot.label}. Open airport information.`}
        title={hotspot.label}
        onClick={() => onOpenInfo?.(hotspot.info)}
      >
        {magnifier}
      </button>
    );
  }

  if (!hotspot.to) return null;

  if (hotspot.to.startsWith('#')) {
    const hash = hotspot.to.replace(/^#/, '');
    return (
      <button
        type="button"
        className={className}
        style={style}
        aria-label={hotspot.label}
        title={hotspot.label}
        onClick={() => navigate({ pathname: location.pathname, hash })}
      >
        {magnifier}
      </button>
    );
  }

  return (
    <Link
      to={parseRouteTo(hotspot.to)}
      className={className}
      style={style}
      aria-label={hotspot.label}
      title={hotspot.label}
    >
      {magnifier}
    </Link>
  );
}

function SaoPauloJournalMap({
  publicId = 'Brazil/Sao Paulo/SaoPaulo-Map',
  version = 1780589300,
  alt = 'Hand-drawn map of São Paulo with magnifying-glass hotspots',
  hotspots = SAO_PAULO_MAP_HOTSPOTS,
}) {
  const [airportsInfoOpen, setAirportsInfoOpen] = useState(false);
  const closeAirportsInfo = useCallback(() => setAirportsInfoOpen(false), []);
  const handleOpenInfo = useCallback((infoId) => {
    if (infoId === 'airports') setAirportsInfoOpen(true);
  }, []);

  const tornClipStyle = {
    clipPath: `polygon(${MAP_TORN_CLIP_PATH})`,
    WebkitClipPath: `polygon(${MAP_TORN_CLIP_PATH})`,
  };

  return (
    <section
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 py-10 md:py-14 px-0 overflow-visible"
      aria-labelledby="saopaulo-journal-map-heading"
      aria-describedby="saopaulo-journal-map-instructions"
    >
      <h2 className="sr-only" id="saopaulo-journal-map-heading">
        São Paulo map
      </h2>
      <p className="sr-only" id="saopaulo-journal-map-instructions">
        Follow the magnifying glass to open the matching chapter or section.
      </p>

      {/* Map: absolute full width, no left/right padding */}
      <div className="relative w-screen">
        <div className="relative w-full overflow-visible py-2">
          <div
            className="relative w-full overflow-visible"
            style={{ filter: TORN_EDGE_DROP_SHADOW }}
          >
            <div className="relative w-full" style={tornClipStyle}>
              <img
                src={cloudinaryImageUrl(publicId, { width: 2400, version })}
                srcSet={[800, 1200, 1600, 2400, 3200]
                  .map((w) => `${cloudinaryImageUrl(publicId, { width: w, version })} ${w}w`)
                  .join(', ')}
                sizes="100vw"
                alt={alt}
                className="w-full h-auto block select-none"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-x-0 top-0 h-[5%] pointer-events-none z-[1] bg-gradient-to-b from-stone-900/10 to-transparent"
                aria-hidden
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[5%] pointer-events-none z-[1] bg-gradient-to-t from-stone-900/10 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                  {hotspots.map((hotspot) => (
                    <MapMagnifierLink
                      key={hotspot.id}
                      hotspot={hotspot}
                      onOpenInfo={handleOpenInfo}
                    />
                  ))}
                  {airportsInfoOpen && <AirportsInfoBox onClose={closeAirportsInfo} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SaoPauloJournalMap;
