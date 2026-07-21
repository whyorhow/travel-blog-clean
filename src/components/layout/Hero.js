import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "../../styles";
import { cloudinaryImageUrl } from "../../utils/cloudinary";
import {
  resolveHero,
  resolveHeroTransition,
} from "../../system/resolvers/resolveHero";
import { useLightboxNavLock } from "../../hooks/useLightboxNavLock";
import {
  hasBrazilStaticHero,
  isMobileViewport,
} from "../../utils/brazilStaticHero";

const MAGNIFY_ICON = "/assets/Magnifyv2.svg";
const CLOSE_ICON = "/assets/crossv2.svg";
const HERO_CORNER_POSITION = {
  bottom: "max(0.75rem, env(safe-area-inset-bottom))",
  right: "max(0.75rem, env(safe-area-inset-right))",
};
const DEFAULT_TRANSITION_DELAY_MS = 4000;
const UNCROPPED_HERO_WIDTHS = [400, 600, 800, 1200];
const UNCROPPED_HERO_SIZES = "(max-width: 640px) 100vw, 600px";
const UNCROPPED_DISPLAY_WIDTH = 600;
const UNCROPPED_DISPLAY_HEIGHT = 450;
const UNCROPPED_FRAME_CLASS = "relative block w-full";

/**
 * HERO — System component with TWO layout modes
 *
 * PRINCIPLE: State determines layout weight, not just content.
 *
 * FULL HERO (60-90vh): When any hero tier is active
 * - diary: 90vh cinematic
 * - location: 60vh standard
 * - fallback: 60vh safety
 *
 * COMPACT HERO (25-35vh): Only when placeholder state
 * - Visual: structural header, not cinematic opening
 * - Purpose: neutral entry point, incomplete page indicator
 *
 * System rule:
 * - resolver decides type
 * - component decides layout variant (no mixing concerns)
 *
 * @param {Object} heroConfig - From {location}.hero.config.js
 * @param {Object} pageData - Optional page data (title, theme, etc.)
 */
function Hero({ heroConfig, pageData = {} }) {
  // Resolver decides which hero type to render
  const hero = resolveHero(heroConfig);
  const transition =
    hasBrazilStaticHero() && isMobileViewport()
      ? null
      : resolveHeroTransition(heroConfig);

  // COMPACT HERO: Placeholder state = structural header (25-35vh)
  // Visual rule: neutral, no "hero energy", above fold but not dominant
  if (hero.type === "placeholder") {
    return (
      <CompactHero
        title={pageData.title || "Explore"}
        subtitle={pageData.subtitle}
      />
    );
  }

  // FULL HERO: Active hero state = cinematic experience (60-90vh)
  // Route to treatment based on resolved type
  if (hero.type === "diary") {
    return <DiaryTreatment hero={hero} pageData={pageData} />;
  }

  // location, fallback: standard 60vh hero
  return <LocationTreatment hero={hero} transition={transition} />;
}

/**
 * COMPACT HERO — Structural header for placeholder state (25-35vh)
 *
 * PRINCIPLE: Different spatial rules than Full Hero.
 * - No "hero energy" — neutral, above fold but not dominant
 * - Visual: structural header, not cinematic opening
 * - Purpose: incomplete page indicator, safe fallback
 *
 * Rules:
 * - Height: 25-35vh (never competes with real heroes)
 * - No image dependency
 * - Subtle gradient, reduced typography
 * - Optional location tag for context
 */
function CompactHero({ title, subtitle }) {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: "30vh", // Compact: 25-35vh range, never cinematic
        minHeight: "200px",
        maxHeight: "350px",
      }}
    >
      {/* Subtle gradient background — neutral, no image dependency */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-600 via-stone-700 to-stone-800" />

      {/* Optional subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Content: centered, reduced scale */}
      <div className="relative z-10 text-center px-6">
        {/* Location tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest text-white/60 border border-white/30 rounded">
            Destination
          </span>
        </div>

        {/* Title: reduced scale vs Full Hero */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-handwriting"
          style={{ color: "#B8860B" }}
        >
          {title}
        </h1>

        {/* Subtle divider line */}
        <div className="w-16 h-px bg-white/30 mx-auto mt-4 mb-3" />

        {/* Optional subtitle or default context */}
        <p className="text-white/60 text-sm tracking-wide">
          {subtitle || "Travel Notes"}
        </p>
      </div>
    </section>
  );
}

/**
 * LOCATION TREATMENT — Standard 60vh hero
 * Clean, establishing shot.
 */
function LocationTreatment({ hero, transition }) {
  const theme = hero.theme;
  const hasTransition = !!transition?.src;

  if (hero.uncropped && hasTransition) {
    return <UncroppedTransitionHero hero={hero} transition={transition} />;
  }

  if (hero.uncropped) {
    return <UncroppedExpandableHero hero={hero} />;
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: tokens.layout.heroHeight }}
    >
      <img
        src={hero.src}
        alt={hero.alt}
        width={1200}
        height={675}
        className={`w-full h-full object-cover${
          hero.photoTreatment === "warm"
            ? " saturate-[0.94] brightness-[1.02]"
            : ""
        }`}
        style={{ objectPosition: hero.objectPosition ?? "center" }}
        fetchpriority="high"
        decoding="async"
      />
      {hero.photoTreatment === "warm" && (
        <div
          className="absolute inset-0 bg-amber-100/10 mix-blend-multiply pointer-events-none"
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0,0,0,${theme.overlayStart})`,
        }}
      />
    </section>
  );
}

function heroFrameSrc(frame, width = 800) {
  if (!frame?.publicId) return frame?.src;
  return cloudinaryImageUrl(frame.publicId, {
    width,
    format: "webp",
    version: frame.version,
  });
}

function heroFrameSrcSet(frame, widths = UNCROPPED_HERO_WIDTHS) {
  return widths.map((w) => `${heroFrameSrc(frame, w)} ${w}w`).join(", ");
}

function useHeroFullscreen() {
  const [isExpanded, setIsExpanded] = useState(false);

  useLightboxNavLock(isExpanded);

  useEffect(() => {
    if (!isExpanded) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  return {
    isExpanded,
    open: () => setIsExpanded(true),
    close: () => setIsExpanded(false),
  };
}

function HeroCornerButton({ variant, onClick }) {
  const isClose = variant === "close";
  const iconSrc = isClose ? CLOSE_ICON : MAGNIFY_ICON;

  return (
    <button
      type="button"
      className="absolute z-20 flex h-14 w-14 min-h-[48px] min-w-[48px] items-center justify-center border-0 bg-transparent active:scale-95 transition-transform touch-manipulation"
      style={HERO_CORNER_POSITION}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      aria-label={isClose ? "Close full screen" : "View full screen"}
    >
      <img
        src={iconSrc}
        alt=""
        className="h-8 w-8 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
        aria-hidden="true"
      />
    </button>
  );
}

function HeroFullscreenOverlay({ isOpen, onClose, src, alt }) {
  if (typeof document === "undefined" || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="hero-fullscreen-backdrop"
          className="fixed inset-0 bg-black"
          style={{ zIndex: 10100 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Hero image full screen"
        >
          <div className="relative w-full">
            <button
              type="button"
              className="block w-full cursor-zoom-out border-0 bg-transparent p-0 text-left"
              onClick={onClose}
              aria-label="Close full screen"
            >
              <img
                src={src}
                alt={alt}
                className="block w-full h-auto max-h-[100dvh] object-top"
              />
            </button>
            <HeroCornerButton variant="close" onClick={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function UncroppedHeroFrame({ hero, onOpen, children, showCorner = true }) {
  return (
    <div className={`${UNCROPPED_FRAME_CLASS} relative`}>
      <button
        type="button"
        className="relative block w-full cursor-zoom-in text-left"
        onClick={onOpen}
        aria-label="View hero image full screen"
      >
        {children ?? (
          <img
            src={heroFrameSrc(hero, 800)}
            srcSet={heroFrameSrcSet(hero)}
            sizes={UNCROPPED_HERO_SIZES}
            alt={hero.alt}
            width={UNCROPPED_DISPLAY_WIDTH}
            height={UNCROPPED_DISPLAY_HEIGHT}
            className="relative z-[1] block w-full h-auto object-contain"
            fetchpriority="high"
            decoding="sync"
          />
        )}
      </button>
      {showCorner && <HeroCornerButton variant="magnify" onClick={onOpen} />}
    </div>
  );
}

function UncroppedExpandableHero({ hero, children }) {
  const { isExpanded, open, close } = useHeroFullscreen();
  const expandedSrc = heroFrameSrc(hero, 2400);

  return (
    <>
      <section className="relative w-full flex justify-center">
        <UncroppedHeroFrame hero={hero} onOpen={open} showCorner={!isExpanded}>
          {children}
        </UncroppedHeroFrame>
      </section>
      <HeroFullscreenOverlay
        isOpen={isExpanded}
        onClose={close}
        src={expandedSrc}
        alt={hero.alt}
      />
    </>
  );
}

function UncroppedTransitionHero({ hero, transition }) {
  const [showTransition, setShowTransition] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const { isExpanded, open, close } = useHeroFullscreen();
  const delayMs = transition.delayMs ?? DEFAULT_TRANSITION_DELAY_MS;

  useEffect(() => {
    const timer = window.setTimeout(() => setShowTransition(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (!showTransition) return undefined;
    const frame = requestAnimationFrame(() => setTransitionVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [showTransition]);

  const expandedSrc = heroFrameSrc(hero, 2400);

  return (
    <>
      <section className="relative w-full flex justify-center">
        <UncroppedHeroFrame hero={hero} onOpen={open} showCorner={!isExpanded}>
          <>
            <img
              src={heroFrameSrc(hero, 800)}
              srcSet={heroFrameSrcSet(hero)}
              sizes={UNCROPPED_HERO_SIZES}
              alt={hero.alt}
              width={UNCROPPED_DISPLAY_WIDTH}
              height={UNCROPPED_DISPLAY_HEIGHT}
              className="relative z-[1] block w-full h-auto object-contain"
              fetchpriority="high"
              decoding="sync"
            />
            {showTransition && (
              <img
                src={heroFrameSrc(transition, 800)}
                srcSet={heroFrameSrcSet(transition)}
                sizes={UNCROPPED_HERO_SIZES}
                alt={transition.alt}
                width={UNCROPPED_DISPLAY_WIDTH}
                height={UNCROPPED_DISPLAY_HEIGHT}
                className={`absolute inset-0 z-[2] h-full w-full object-contain transition-opacity duration-700 ${
                  transitionVisible ? "opacity-100" : "opacity-0"
                }`}
                fetchpriority="low"
                loading="lazy"
                decoding="async"
              />
            )}
          </>
        </UncroppedHeroFrame>
      </section>

      <HeroFullscreenOverlay
        isOpen={isExpanded}
        onClose={close}
        src={expandedSrc}
        alt={hero.alt}
      />
    </>
  );
}

/**
 * DIARY TREATMENT — Cinematic 90vh hero
 * Narrative weight, animated reveal.
 */
function DiaryTreatment({ hero, pageData }) {
  const theme = hero.theme;
  const heroHeight = tokens.layout.heroHeightTall || "90vh";

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: heroHeight }}
    >
      {/* Hero image — visible on first paint (no opacity-0) for LCP */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.src}
          alt={hero.alt}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
          style={{ objectPosition: hero.objectPosition ?? "center" }}
          fetchpriority="high"
          decoding="async"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(0,0,0,${theme.overlayStart * 1.5}),
              transparent,
              rgba(28,25,23,${theme.overlayEnd})
            )`,
          }}
        />
      </div>

      {/* Title content */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-[-30vh] md:mt-[-60vh]">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-handwriting drop-shadow-2xl"
            style={{ color: theme.gold }}
          >
            {pageData.title || "Explore"}
          </h1>

          {pageData.subtitle && (
            <p
              className="text-lg md:text-2xl font-bold tracking-[0.15em] uppercase mt-4"
              style={{ color: theme.textPrimary, opacity: 0.9 }}
            >
              {pageData.subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
