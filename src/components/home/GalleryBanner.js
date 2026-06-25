import React, { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import paperTexture from "../../assets/Backgrounds/PaperTexture.webp";
import {
  GALLERY_BANNER_FRAME_IMAGE,
  GALLERY_BANNER_STRIP,
} from "../../config/galleryBannerPreview";
import { resolveStripFrames } from "../../utils/filmstripPool";
import {
  estimateCustomSvgStripSize,
  resolveCustomSvgConfig,
} from "../../utils/filmStripSnippet";
import { FilmStripCard } from "../filmstrip/FilmStrip";
import FilmStripPins from "../filmstrip/FilmStripPins";
import "../filmstrip/filmstrip.css";
import "./gallery-banner.css";

const BANNER_STRIP_INDEX = 0;

function useHorizontalScrollGuard() {
  const blockClickRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);

  const onPointerDown = (event) => {
    blockClickRef.current = false;
    draggingRef.current = false;
    startRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerMove = (event) => {
    if (draggingRef.current) return;
    const dx = Math.abs(event.clientX - startRef.current.x);
    const dy = Math.abs(event.clientY - startRef.current.y);
    if (dx > 8 || dy > 8) {
      draggingRef.current = true;
      blockClickRef.current = true;
    }
  };

  const onClickCapture = (event) => {
    if (blockClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return { onPointerDown, onPointerMove, onClickCapture };
}

export default function GalleryBanner() {
  const scrollGuard = useHorizontalScrollGuard();
  const objectRef = useRef(null);

  const strip = useMemo(
    () => ({
      ...GALLERY_BANNER_STRIP,
      resolvedFrames: resolveStripFrames(GALLERY_BANNER_STRIP),
    }),
    []
  );

  const customSvg = useMemo(
    () => resolveCustomSvgConfig(6, { filmstripTemplate: "6HCustom01" }),
    []
  );

  const stripWidthPx = estimateCustomSvgStripSize(customSvg).width;

  return (
    <div className="gallery-banner-block relative z-50 left-1/2 w-screen -translate-x-1/2 py-8 md:py-10">
      {/* Same torn-paper filter as CountryLandingTemplate map sections (e.g. Czech) */}
      <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
        <defs>
          <filter id="gallery-banner-torn-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="5"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="gallery-banner__torn-surface absolute -inset-y-6 md:-inset-y-8 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
        style={{
          backgroundImage: `url(${paperTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <Link
        to="/nomads-gallery"
        className="gallery-banner group relative z-10 block w-full text-center no-underline"
        aria-labelledby="gallery-banner-heading"
      >
        <div className="pt-1 pb-0 md:pt-2">
          <h2
            id="gallery-banner-heading"
            className="font-cormorant text-[1.6875rem] md:text-[1.875rem] font-semibold tracking-wide text-[#3a2d22]"
          >
            Step into the Gallery
          </h2>
          <p className="mt-1 font-cormorant text-[1.125rem] md:text-[1.3125rem] italic text-[#5c4a38]">
            captured stories, pinned in time
          </p>
        </div>

        <div
          className="gallery-banner__scroller"
          onPointerDown={scrollGuard.onPointerDown}
          onPointerMove={scrollGuard.onPointerMove}
          onClickCapture={scrollGuard.onClickCapture}
        >
          <div
            ref={objectRef}
            className="gallery-banner__strip-object film-strip-object"
            style={{
              "--object-rotate-z": "0deg",
              "--object-tilt-x": "0deg",
              "--object-y": "0px",
              "--object-x": "0px",
              "--layout-trim": "0px",
            }}
          >
            <div className="film-strip-plinth film-strip-plinth--compact">
              <div className="film-strip-pinned">
                <FilmStripCard
                  strip={strip}
                  frames={strip.resolvedFrames}
                  stripIndex={BANNER_STRIP_INDEX}
                  variant="compact"
                  customSvg={customSvg}
                  frameImageProps={GALLERY_BANNER_FRAME_IMAGE}
                />
                <FilmStripPins
                  stripId={strip.id}
                  stripIndex={BANNER_STRIP_INDEX}
                  stripWidthPx={stripWidthPx}
                  useCustomSvg
                  pinAnchors={customSvg.pinAnchors}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-1.5 pb-1 md:pb-2 text-[16.5px] font-cormorant font-semibold uppercase tracking-[0.22em] text-[#3a2d22] transition-colors group-hover:text-[#5c4a38]">
          Explore Full Gallery <span aria-hidden="true">→</span>
        </p>
      </Link>
    </div>
  );
}
