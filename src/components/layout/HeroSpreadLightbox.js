import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightboxNavLock } from '../../hooks/useLightboxNavLock';

const CLOSE_SRC = `${process.env.PUBLIC_URL}/assets/crossv2.svg`;
const MAGNIFY_ICON = `${process.env.PUBLIC_URL}/assets/Magnifyv2.svg`;
const MAGNIFY_DROP_SHADOW = 'drop-shadow(0 2px 6px rgba(0,0,0,0.6)) drop-shadow(0 0px 2px rgba(0,0,0,0.4))';

const DEFAULT_HOTSPOT = { left: 0.03, top: 0.08, width: 0.52, height: 0.84 };
/** Sampled from bright journal paper in SaoPaulo-Hero-Additional2 */
const DEFAULT_TEXT_FOCUS_BACKGROUND = '#EDF0F2';

function LightboxCloseButton({ onClose, label = 'Close' }) {
  const handleClose = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  return (
    <button
      type="button"
      className="fixed z-[10001] flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-stone-300/90 bg-white shadow-lg active:scale-95 transition-transform touch-manipulation"
      style={{
        top: 'max(0.75rem, env(safe-area-inset-top))',
        right: 'max(0.75rem, env(safe-area-inset-right))',
      }}
      onClick={handleClose}
      aria-label={label}
    >
      <img src={CLOSE_SRC} alt="" className="w-6 h-6 pointer-events-none" aria-hidden />
    </button>
  );
}

/**
 * Two-step hero lightbox: full journal spread, then text-only focus view.
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

  useLightboxNavLock(true);

  useEffect(() => {
    setView('spread');
    setLoaded(false);
  }, [spreadSrc, textFocusSrc]);

  useEffect(() => {
    setLoaded(false);
  }, [view]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const exitLightbox = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (view === 'text') setView('spread');
      else exitLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, exitLightbox]);

  const handleBackdropClick = () => {
    if (view === 'text') setView('spread');
    else exitLightbox();
  };

  const isTextView = view === 'text';

  const content = (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[9999] flex items-start md:items-center justify-center px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:pb-4 sm:pt-4 ${
          isTextView ? '' : 'bg-black/95'
        }`}
        style={isTextView ? { backgroundColor: textFocusBackground } : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label={isTextView ? 'Journal text' : 'Journal spread'}
      >
        <LightboxCloseButton onClose={exitLightbox} />

        <motion.div
          className="relative flex flex-col items-center justify-start md:justify-center max-w-full max-h-full"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
            <div className="relative max-w-full max-h-[calc(100dvh-2rem)]">
              <img
                src={spreadSrc}
                alt={spreadAlt}
                onLoad={() => setLoaded(true)}
                className={`block max-w-[100vw] max-h-[calc(100dvh-2rem)] w-auto h-auto object-contain transition-opacity duration-300 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {textFocusSrc && loaded && (
                <button
                  type="button"
                  className="absolute flex items-center justify-center cursor-zoom-in bg-transparent border-0 p-0 group touch-manipulation"
                  style={{
                    left: `${hotspot.left * 100}%`,
                    top: `${hotspot.top * 100}%`,
                    width: `${hotspot.width * 100}%`,
                    height: `${hotspot.height * 100}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setView('text');
                  }}
                  aria-label="View journal text fullscreen"
                >
                  <img
                    src={MAGNIFY_ICON}
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-10 md:w-12 md:h-12 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 pointer-events-none"
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
              onClick={(e) => e.stopPropagation()}
              className={`max-w-[100vw] max-h-[calc(100dvh-5rem)] w-auto h-auto object-contain transition-opacity duration-300 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </motion.div>

        {isTextView && (
          <button
            type="button"
            className="fixed z-[10001] left-1/2 -translate-x-1/2 rounded-full border border-stone-300/80 bg-white/95 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-800 shadow-md active:scale-95 transition-transform touch-manipulation sm:hidden"
            style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            onClick={(e) => {
              e.stopPropagation();
              exitLightbox();
            }}
          >
            Close
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

export default HeroSpreadLightbox;
