import React, { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NOMADS_FILMSTRIPS } from "../../data/nomadsFilmstrips";
import { resolveStripFrames, toLightboxImage } from "../../utils/filmstripPool";
import {
  nomadsGalleryWallFallbackUrl,
  nomadsGalleryWallUrl,
} from "../../config/nomadsGalleryWall";
import { FullscreenLightbox } from "../GalleryWall";
import { trackEvent } from "../../utils/analytics";
import FilmStrip from "./FilmStrip";
import FilmStripLightbox from "./FilmStripLightbox";
import { useArchiveScrollGlimmer } from "./useArchiveScrollGlimmer";
import "./filmstrip.css";

export default function FilmStripArchive({ titleSrc, intro }) {
  const strips = useMemo(
    () =>
      NOMADS_FILMSTRIPS.map((strip) => ({
        ...strip,
        resolvedFrames: resolveStripFrames(strip),
      })),
    []
  );

  const [stripViewer, setStripViewer] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const handleSelectStrip = useCallback((strip, frames, stripIndex) => {
    setStripViewer({ strip, frames, stripIndex });
    trackEvent("click_filmstrip", "Nomads Gallery", strip.title);
  }, []);

  const closeStripViewer = useCallback(() => setStripViewer(null), []);

  const handleOpenImage = useCallback((imageOnly, startIndex, stripTitle) => {
    const images = imageOnly.map((img) => toLightboxImage(img, stripTitle));
    setLightbox({ images, startIndex });
    const current = imageOnly[startIndex];
    if (current?.title) {
      trackEvent("click_gallery_image", "Nomads Gallery", `${stripTitle}: ${current.title}`);
    }
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const archiveRef = useArchiveScrollGlimmer();

  const wallStyle = useMemo(
    () => ({
      "--archive-wall-url": `url("${nomadsGalleryWallUrl()}"), url("${nomadsGalleryWallFallbackUrl()}")`,
    }),
    []
  );

  return (
    <motion.div
      ref={archiveRef}
      className="archive-wall-root archive-vignette min-h-screen w-full max-w-[100vw] overflow-x-clip"
    >
      <div className="archive-wall-bg" style={wallStyle} aria-hidden />
      <motion.div
        className="absolute inset-0 pointer-events-none film-grain-overlay opacity-[0.05] z-[1]"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 pb-16">
        <header className="sticky top-0 z-30 flex flex-col items-center pt-5 pb-3 px-4 bg-gradient-to-b from-[#ebe6dc]/95 via-[#ebe6dc]/82 to-transparent backdrop-blur-[2px]">
          {titleSrc && (
            <img
              src={titleSrc}
              alt="Nomads Gallery"
              fetchpriority="high"
              loading="eager"
              className="w-[50vw] max-w-[14rem] sm:max-w-[18rem] h-auto block opacity-95 drop-shadow-sm"
            />
          )}
          {intro ?? (
            <p className="mt-3 max-w-md text-center text-sm text-[#3d3832] font-cormorant italic leading-relaxed px-2">
              Tap a strip to scroll through it on the darkroom wall — recurring moments, not a catalogue of places.
            </p>
          )}
        </header>

        <motion.div
          className="film-strip-archive-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {strips.map((strip, index) => (
            <FilmStrip
              key={strip.id}
              strip={strip}
              frames={strip.resolvedFrames}
              stripIndex={index}
              variant="compact"
              onSelect={() => handleSelectStrip(strip, strip.resolvedFrames, index)}
            />
          ))}
        </motion.div>

        <footer className="mt-16 flex justify-center px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold tracking-widest uppercase text-[#2a2622] border border-stone-500/55 bg-white/45 hover:bg-white/65 hover:border-editorialGold transition-colors duration-300 font-cormorant shadow-sm"
          >
            <span aria-hidden>←</span>
            Return Home
          </Link>
        </footer>
      </div>

      <AnimatePresence>
        {stripViewer && (
          <FilmStripLightbox
            strip={stripViewer.strip}
            frames={stripViewer.frames}
            stripIndex={stripViewer.stripIndex}
            onClose={closeStripViewer}
            onOpenImage={handleOpenImage}
            closeOnEscape={!lightbox}
          />
        )}
      </AnimatePresence>

      {lightbox && (
        <FullscreenLightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          onClose={closeLightbox}
          stackLayer="overlay"
        />
      )}
    </motion.div>
  );
}
