import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '../../assets/images/cross.svg';

const MAGNIFY_ICON = `${process.env.PUBLIC_URL}/assets/Magnifyv2.svg`;
const MAGNIFY_DROP_SHADOW = 'drop-shadow(0 2px 6px rgba(0,0,0,0.6)) drop-shadow(0 0px 2px rgba(0,0,0,0.4))';

const DEFAULT_HOTSPOT = { left: 0.03, top: 0.08, width: 0.52, height: 0.84 };
/** Sampled from bright journal paper in SaoPaulo-Hero-Additional2 */
const DEFAULT_TEXT_FOCUS_BACKGROUND = '#EDF0F2';

/**
 * Two-step hero lightbox: full journal spread, then text-only focus view.
 *
 * @param {string} spreadSrc — Full flat-lay spread
 * @param {string} textFocusSrc — Cropped straight-on text view
 * @param {string} [textFocusBackground] — Backdrop colour for the text view (match journal paper)
 * @param {{ left, top, width, height }} [hotspot] — Fractions (0–1) of spread image for text region
 */
function HeroSpreadLightbox({
  spreadSrc,
  textFocusSrc,
  spreadAlt,
  textFocusAlt,
  textFocusBackground = DEFAULT_TEXT_FOCUS_BACKGROUND,
  hotspot = DEFAULT_HOTSPOT,
  onClose,
}) {
  const [view, setView] = useState('spread');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setView('spread');
    setLoaded(false);
  }, [spreadSrc, textFocusSrc]);

  useEffect(() => {
    setLoaded(false);
  }, [view]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (view === 'text') setView('spread');
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, onClose]);

  const handleBackdropClick = () => {
    if (view === 'text') setView('spread');
    else onClose();
  };

  const isTextView = view === 'text';

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${
          isTextView ? '' : 'bg-black/95'
        }`}
        style={isTextView ? { backgroundColor: textFocusBackground } : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="relative flex flex-col items-center w-full h-full min-h-[100dvh] max-h-[100dvh] justify-center"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-10 h-10 border-2 rounded-full animate-spin ${
                  isTextView
                    ? 'border-stone-400/30 border-t-stone-600/80'
                    : 'border-white/20 border-t-white/80'
                }`}
              />
            </div>
          )}

          {view === 'spread' ? (
            <div className="relative max-w-full max-h-[100dvh]">
              <img
                src={spreadSrc}
                alt={spreadAlt}
                onLoad={() => setLoaded(true)}
                className={`block max-w-[100vw] max-h-[100dvh] w-auto h-auto object-contain transition-opacity duration-300 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {textFocusSrc && loaded && (
                <button
                  type="button"
                  className="absolute flex items-center justify-center cursor-zoom-in bg-transparent border-0 p-0 group"
                  style={{
                    left: `${hotspot.left * 100}%`,
                    top: `${hotspot.top * 100}%`,
                    width: `${hotspot.width * 100}%`,
                    height: `${hotspot.height * 100}%`,
                  }}
                  onClick={() => setView('text')}
                  aria-label="View journal text fullscreen"
                >
                  <img
                    src={MAGNIFY_ICON}
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-10 md:w-12 md:h-12 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                    style={{ filter: MAGNIFY_DROP_SHADOW }}
                  />
                </button>
              )}
            </div>
          ) : (
            <img
              src={textFocusSrc}
              alt={textFocusAlt || spreadAlt}
              onLoad={() => setLoaded(true)}
              className={`w-full h-full max-w-[100vw] max-h-[100dvh] object-contain transition-opacity duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          <button
            type="button"
            className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg z-10"
            onClick={onClose}
            aria-label="Close"
          >
            <img src={CloseIcon} alt="" className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default HeroSpreadLightbox;
