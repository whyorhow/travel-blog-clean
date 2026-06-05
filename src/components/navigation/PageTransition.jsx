import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { scrollToLocationHash } from '../../utils/scrollToAnchor';

const CHAPTER_EASE = [0.22, 1, 0.36, 1];
const FADE_DURATION = 0.42;

/**
 * Fade between routes (and between in-page chapters via hash changes).
 * Scrolls to hash targets while faded out, then reveals the section.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const isFirstMount = useRef(true);
  const [contentReady, setContentReady] = useState(true);

  useEffect(() => {
    let cancelScroll = () => {};

    if (!location.hash) {
      window.scrollTo(0, 0);

      if (isFirstMount.current) {
        isFirstMount.current = false;
        setContentReady(true);
        return () => {};
      }

      setContentReady(false);
      const frameId = requestAnimationFrame(() => setContentReady(true));
      return () => cancelAnimationFrame(frameId);
    }

    if (isFirstMount.current) {
      cancelScroll = scrollToLocationHash(location.hash, {
        onFound: () => {
          isFirstMount.current = false;
          setContentReady(true);
        },
        onTimeout: () => {
          isFirstMount.current = false;
          setContentReady(true);
        },
      });
      return () => cancelScroll();
    }

    setContentReady(false);
    cancelScroll = scrollToLocationHash(location.hash, {
      onFound: () => setContentReady(true),
      onTimeout: () => setContentReady(true),
    });

    return () => cancelScroll();
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="w-full"
        initial={isFirstMount.current ? false : { opacity: 0 }}
        animate={{ opacity: contentReady ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: FADE_DURATION, ease: CHAPTER_EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
