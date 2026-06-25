import React, { useState, useEffect, useRef, useCallback } from "react";
import { useStaticHeroBelowFoldGate } from "../../utils/staticHeroScrollGate";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "../../styles/swiper";
import SEO from "../../components/SEO";
import ContextMap from "../../components/ContextMap";
import CloudinaryImage from "../../components/CloudinaryImage";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../../utils/cloudinary";
import { useNarrative } from "../../context/NarrativeContext";
import { Hero } from "../../components/layout";
import PolaroidGallery from "../../components/PolaroidGallery";
import { resolveHero, resolveLcpHeroPreloadUrl } from "../../system/resolvers/resolveHero";
import { prefetchRoute } from "../../config/pageChunks";
import { fadeScale, staggerContainer } from "../../utils/animations";
import LeftArrow from "../../assets/images/lftarrow.svg";
import RightArrow from "../../assets/images/rtarrow.svg";
import paperTexture from "../../assets/Backgrounds/PaperTexture.jpg";
import { SITE_HEADER_PX } from "../../components/nav/siteHeaderLayout";

/**
 * VARIANT ATMOSPHERES
 * Controls palette, texture, and tonal identity — not structure.
 * Structure (hero → bridge → journey → map → grid → exit) is always the same.
 */
const VARIANTS = {
  industrial: {
    background: { background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d, #1f1f1f)" },
    headlineColor: "text-white",
    bodyColor: "text-white/70",
    sectionTitleColor: "text-white",
    narrativeColor: "text-white",
    gridBg: "bg-white/5 border-white/20 text-white hover:bg-white/10",
    sectionOverlay: "bg-gradient-to-b from-black/20 via-black/10 to-transparent",
    returnBg: "bg-black/50 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black",
    narrativePanelBg: "bg-black/40",
    carouselLinkColor: "text-yellow-400",
    quoteColor: "text-white",
    quoteAccent: "text-yellow-400",
  },
  mediterranean: {
    background: { backgroundColor: "#1a1a1a" },
    headlineColor: "text-white",
    bodyColor: "text-white/70",
    sectionTitleColor: "text-white",
    narrativeColor: "text-white",
    gridBg: "bg-white/5 border-white/20 text-white hover:bg-white/10",
    sectionOverlay: "bg-gradient-to-b from-black/20 via-black/10 to-transparent",
    returnBg: "border-yellow-400/40 text-yellow-400 hover:text-white",
    narrativePanelBg: "bg-black/40",
    carouselLinkColor: "text-yellow-400",
    quoteColor: "text-white/60",
    quoteAccent: "text-yellow-400",
  },
  continental: {
    background: { background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d, #1f1f1f)" },
    headlineColor: "text-white",
    bodyColor: "text-white/70",
    sectionTitleColor: "text-white",
    narrativeColor: "text-white",
    gridBg: "bg-white/5 border-white/20 text-white hover:bg-white/10",
    sectionOverlay: "bg-gradient-to-b from-black/20 via-black/10 to-transparent",
    returnBg: "bg-black/50 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black",
    narrativePanelBg: "bg-black/40",
    carouselLinkColor: "text-yellow-400",
    quoteColor: "text-white",
    quoteAccent: "text-yellow-400",
  },
  alpine: {
    surface: "light",
    background: {
      backgroundColor: "#e8e3d9",
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 20% 10%, rgba(255, 252, 247, 0.85) 0%, transparent 55%),
        radial-gradient(ellipse 60% 45% at 85% 75%, rgba(180, 195, 205, 0.22) 0%, transparent 50%),
        linear-gradient(175deg, #ebe6dc 0%, #ded8cc 40%, #d4cec2 70%, #c9c2b4 100%)
      `,
    },
    headlineColor: "text-stone-900",
    bodyColor: "text-stone-700/90",
    sectionTitleColor: "text-stone-800",
    narrativeColor: "text-stone-900",
    gridBg: "bg-white/55 border-stone-500/35 text-stone-900 hover:bg-white/75 hover:border-stone-600/50 shadow-sm",
    sectionOverlay: "bg-gradient-to-b from-stone-900/6 via-stone-800/3 to-transparent",
    returnBg: "bg-white/50 border-stone-700/40 text-stone-800 hover:bg-stone-800 hover:text-amber-50",
    narrativePanelBg: "bg-white/60 border border-stone-300/45",
    carouselLinkColor: "text-amber-100/90",
    quoteColor: "text-stone-700",
    quoteAccent: "text-amber-900",
    carouselNavClass:
      "bg-white/70 border border-stone-600/40 hover:bg-white/90 hover:border-stone-700/60 shadow-md",
  },
  tropical: {
    surface: "light",
    background: {
      backgroundColor: "#c8d8c0",
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(170, 195, 160, 0.5) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(150, 175, 140, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(185, 205, 175, 0.6) 0%, transparent 70%),
        radial-gradient(circle at 10% 80%, rgba(175, 200, 165, 0.35) 0%, transparent 40%)
      `,
    },
    headlineColor: "text-green-950",
    bodyColor: "text-green-900/70",
    sectionTitleColor: "text-green-950",
    narrativeColor: "text-green-950",
    gridBg: "bg-green-800/15 border-green-800/45 text-green-900 hover:bg-green-800/25 hover:text-green-950 shadow-sm",
    sectionOverlay: "bg-gradient-to-b from-green-900/10 via-green-900/5 to-transparent",
    returnBg: "bg-green-800/10 border-green-800/30 text-green-900 hover:bg-green-800/20 hover:text-green-950",
    narrativePanelBg: "bg-white/40",
    carouselLinkColor: "text-darkText",
    carouselNavClass:
      "bg-white/70 border border-green-800/30 hover:bg-white/90 hover:border-green-800/50 shadow-md",
  },
};

/**
 * CountryLandingTemplate — Regional journey orchestrator
 *
 * Not a layout template. A navigation sequencer.
 * Controls how attention moves: image → emotion → narrative → geography → choice → exit.
 *
 * Props (editorial schema):
 * @param {string}   variant              - Atmospheric variant (e.g. "tropical")
 * @param {object}   seo                  - { title, description, image, slug }
 * @param {object}   heroImages           - { base: legacyPath, overlay: legacyPath }
 * @param {object}   introBridge          - { headline, body }
 * @param {string}   scopeNote            - Honest coverage note for thin regions (from regionScope)
 * @param {string}   journeyTitle         - Title above the carousel ("This is how Brazil unfolded for us.")
 * @param {Array}    destinations         - [{ id, name, img (legacy path), path }]
 * @param {object}   narrativeLines       - { [destinationId]: "narrative line" }
 * @param {Array}    mapMarkers           - destinations.json entries for the map
 * @param {Array}    gridCities           - destinations.json entries for the grid
 * @param {object}   returnLink           - { label, path }
 * @param {string}   countryKey           - NarrativeContext country key (e.g. "brazil")
 */
function CountryLandingTemplate({
  variant = "tropical",
  seo,
  heroImages,
  introBridge,
  scopeNote,
  journeyTitle,
  destinations: featuredDestinations = [],
  narrativeLines = {},
  mapMarkers = [],
  gridCities = [],
  returnLink,
  countryKey,
  featureCard,
  mapComponent,
  quote,
  heroConfig,
  heroPageData,
  showHeroTitle = false,
  featureBanner,
  featureBanners,
  scrollGoldGradient = false,
  skipHero = false,
}) {
  const v = VARIANTS[variant] || VARIANTS.tropical;
  const resolvedHero = resolveHero(heroConfig || {});
  const resolvedFeatureBanners = featureBanners ?? (featureBanner ? [featureBanner] : []);
  const { currentCountry, activeIndex, setActiveIndex } = useNarrative();

  const [showOverlay, setShowOverlay] = useState(false);
  const [hoveredDestId, setHoveredDestId] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [highlightedBannerId, setHighlightedBannerId] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const [deferBelowFold, setDeferBelowFold] = useState(
    () => skipHero && typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const swiperRef = useRef(null);
  const journeyRef = useRef(null);
  const featureBannersRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (event) => setIsMobile(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useStaticHeroBelowFoldGate(deferBelowFold, setDeferBelowFold);

  // Lock to this country's narrative context on load
  useEffect(() => {
    if (countryKey && currentCountry !== countryKey) {
      setActiveIndex(0);
    }
  }, [currentCountry, countryKey, setActiveIndex]);

  // Auto-show overlay on mobile after 1s
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => setShowOverlay(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Sync map hover → carousel slide
  useEffect(() => {
    if (swiperRef.current && hoveredDestId) {
      const index = featuredDestinations.findIndex(d => d.id === hoveredDestId);
      if (index !== -1) swiperRef.current.slideToLoop(index);
    }
  }, [hoveredDestId, featuredDestinations]);

  const handlePolaroidSelect = useCallback((item) => {
    const { focusTarget, focusType } = item;
    if (!focusTarget) return;

    if (focusType === 'banner') {
      setHoveredDestId(null);
      setHighlightedBannerId(focusTarget);
      featureBannersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => setHighlightedBannerId(null), 2000);
      return;
    }

    const destIndex = featuredDestinations.findIndex((d) => d.id === focusTarget);
    if (destIndex === -1) return;

    setActiveSlideIndex(destIndex);
    setActiveIndex(destIndex);
    setHoveredDestId(focusTarget);
    setHighlightedBannerId(null);
    if (swiperRef.current) swiperRef.current.slideToLoop(destIndex);
    journeyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [featuredDestinations, setActiveIndex]);

  const brazilOliveGoldBackground = `linear-gradient(180deg,
    #bab592 0%,
    #bdb58f 20%,
    #c4bc8a 38%,
    #cdb878 55%,
    #d4b060 72%,
    #d4af5a 85%,
    #c9a040 93%,
    #b8860b 100%
  )`;

  const brazilSurfaceClass =
    "bg-amber-50/80 border-stone-800/50 text-stone-900 hover:bg-amber-50/95 hover:border-stone-900/70 shadow-md";

  const gridPillClass = scrollGoldGradient ? brazilSurfaceClass : v.gridBg;
  const returnPillClass = scrollGoldGradient ? brazilSurfaceClass : v.returnBg;

  const brazilCardClass = scrollGoldGradient
    ? "bg-amber-50/80 border border-stone-800/50 shadow-md"
    : "";

  const brazilHeadlineColor = scrollGoldGradient ? "text-stone-900" : v.headlineColor;
  const brazilBodyColor = scrollGoldGradient ? "text-stone-900" : v.bodyColor;
  const brazilSectionTitleColor = scrollGoldGradient ? "text-stone-900" : v.sectionTitleColor;
  const brazilNarrativeColor = scrollGoldGradient ? "text-stone-900" : v.narrativeColor;
  const isLightSurface = v.surface === "light";
  const tightJourneyTitle =
    introBridge &&
    !introBridge.body &&
    !introBridge.images?.length &&
    featuredDestinations.length > 0;
  const darkCarouselNavClass = "bg-stone-800/70 hover:bg-stone-800/90";
  const carouselNavClass = scrollGoldGradient
    ? "bg-amber-50/80 border border-stone-800/50 hover:bg-amber-50/95 hover:border-stone-900/70 shadow-md"
    : (v.carouselNavClass ?? darkCarouselNavClass);

  const spreadBackgroundStyle = {
    backgroundImage: `url(${paperTexture})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "url(#torn-paper-filter)",
    opacity: 0.95,
  };

  const expandBackgroundStyle = (bg = {}) => {
    const { background, ...rest } = bg;
    return {
      ...rest,
      ...(background ? { backgroundImage: background } : {}),
    };
  };

  const fixedBackgroundStyle = {
    ...expandBackgroundStyle(v.background),
    backgroundAttachment: "fixed",
    zIndex: -2,
  };

  const pageBackgroundStyle = scrollGoldGradient
    ? { backgroundColor: "#bab592", backgroundImage: brazilOliveGoldBackground }
    : {
        ...expandBackgroundStyle(v.background),
        ...(variant === "tropical" && !scrollGoldGradient
          ? {
              backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
              backgroundPosition: "0 0, 0 0, 0 0, 0 0",
              backgroundAttachment: "fixed",
            }
          : {}),
      };

  return (
    <motion.div
      className="relative pb-20 min-h-screen"
      style={{
        ...pageBackgroundStyle,
        position: "relative",
        marginTop: `-${SITE_HEADER_PX}px`,
        paddingTop: `${SITE_HEADER_PX}px`,
      }}
      variants={staggerContainer}
      initial={isMobile ? false : "hidden"}
      animate="visible"
      exit={isMobile ? undefined : "hidden"}
    >
      {/* Atmospheric background — full page height for Brazil green→gold */}
      {scrollGoldGradient ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: -2,
            background: brazilOliveGoldBackground,
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="fixed inset-0 pointer-events-none"
          style={fixedBackgroundStyle}
        />
      )}

      {/* SVG torn-paper filter */}
      <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
        <defs>
          <filter id="torn-paper-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Paper grain overlay — skipped on Brazil olive→gold page */}
      {!scrollGoldGradient && (
        <div
          className={`fixed inset-0 pointer-events-none ${isLightSurface ? "opacity-10" : "opacity-20"}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            zIndex: -1,
          }}
        />
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      {!skipHero && <Hero heroConfig={heroConfig || {}} pageData={heroPageData} />}

      {/* ── TITLE BLOCK — opt-in per page via showHeroTitle ────────── */}
      {showHeroTitle && heroPageData?.title && (!skipHero || !deferBelowFold) && (
        <div className="text-center px-6 pt-10 pb-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-handwriting" style={{ color: '#B8860B' }}>
            {heroPageData.title}
          </h1>
          {heroPageData.subtitle && (
            <p className={`text-sm tracking-wide mt-3 ${v.bodyColor}`}>{heroPageData.subtitle}</p>
          )}
        </div>
      )}

      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          image={seo.image}
          slug={seo.slug}
          type="website"
          preloadImage={
            skipHero
              ? undefined
              : heroConfig
                ? resolveLcpHeroPreloadUrl({ heroConfig })
                : undefined
          }
        />
      )}

      {/* ── HERO IMAGE + OVERLAY — only when no heroConfig ───────────── */}
      {heroImages && !heroConfig && (
        <motion.div
          className="relative w-full max-w-3xl mx-auto mt-8 mb-4 px-4 cursor-pointer"
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
          onClick={() => setShowOverlay(!showOverlay)}
          variants={fadeScale}
        >
          <CloudinaryImage
            legacyPath={heroImages.base}
            alt={seo?.alt || "Country hero"}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            widths={[800, 1200, 2000]}
            className="w-full h-auto object-contain shadow-lg rounded-lg p-3 sm:p-4"
          />
          {heroImages.overlay && (
            <CloudinaryImage
              legacyPath={heroImages.overlay}
              alt=""
              sizes="(max-width: 768px) 100vw, 768px"
              widths={[800, 1200, 2000]}
              className={`absolute inset-0 w-full h-full object-contain shadow-lg transition-opacity duration-500 scale-[0.9] sm:scale-100 ${showOverlay ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </motion.div>
      )}

      {/* ── INTRO BRIDGE — scroll-gated with carousel when static hero is LCP ── */}
      {introBridge && !deferBelowFold && (
        <motion.div
          className={`relative text-center overflow-visible ${
            introBridge.galleryStyle === 'polaroid'
              ? 'pt-12 sm:pt-28 pb-4 sm:pb-8'
              : tightJourneyTitle
                ? 'pt-20 sm:pt-28 pb-0'
                : 'py-20 sm:py-28'
          }`}
        >
          <div className={`mx-auto px-6 ${introBridge.images?.length ? 'max-w-5xl' : 'max-w-xl'}`}>
            {scopeNote && (
              <p
                className={`mb-6 max-w-lg mx-auto text-sm sm:text-base font-cormorant italic leading-relaxed ${
                  scrollGoldGradient || isLightSurface ? "text-stone-700" : "text-white/65"
                }`}
              >
                {scopeNote}
              </p>
            )}
            <p className={`font-cormorant text-[2rem] sm:text-[2.4rem] leading-tight ${brazilHeadlineColor}`}>
              {introBridge.headline}
            </p>
            {introBridge.body && (
            <p className={`mt-6 text-[1.2rem] sm:text-[1.3rem] leading-relaxed ${brazilBodyColor} ${
              introBridge.galleryStyle === 'polaroid' && introBridge.images?.length ? 'mb-0' : ''
            }`}>
              {introBridge.body}
            </p>
            )}
            {!deferBelowFold && introBridge.images?.length > 0 && introBridge.galleryStyle !== 'polaroid' && (
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-14 max-w-5xl mx-auto"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {introBridge.images.map((item) => (
                    <CloudinaryImage
                      key={item.id}
                      legacyPath={item.src}
                      alt={item.alt}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 240px"
                      widths={[240, 480, 720]}
                      className="w-full aspect-[4/3] object-cover rounded-lg shadow-md"
                    />
                  ))}
                </motion.div>
            )}
          </div>
          {!deferBelowFold && introBridge.images?.length > 0 && introBridge.galleryStyle === 'polaroid' && (
            <PolaroidGallery
              images={introBridge.images}
              className="mt-10 sm:mt-16"
              onSelect={handlePolaroidSelect}
            />
          )}
        </motion.div>
      )}

      {/* ── JOURNEY: CAROUSEL + NARRATIVE SYNC ───────────────────────────── */}
      {!deferBelowFold && featuredDestinations.length > 0 && (
        <div ref={journeyRef} className={`relative w-full mb-20 overflow-visible ${
          scrollGoldGradient ? 'mt-4 pt-8' : tightJourneyTitle ? 'mt-0 pt-6' : 'mt-10 py-16'
        }`}>
          {!scrollGoldGradient && <div className={`absolute inset-0 ${v.sectionOverlay}`} />}
          <div className="relative z-10 max-w-7xl mx-auto px-4 overflow-visible">

            {journeyTitle && (
              <p className={`font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] ${brazilBodyColor} text-center max-w-xl mx-auto ${
                tightJourneyTitle ? 'mt-0 mb-14' : 'mt-[20px] mb-14'
              }`}>
                {journeyTitle}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center w-full mb-4">

              {/* Carousel */}
              <motion.section className="w-full flex justify-center lg:justify-end" variants={fadeScale}>
                <div className="relative w-full max-w-[450px] flex items-center">
                  <button
                    type="button"
                    aria-label="Previous destination"
                    className={`swiper-button-prev-custom flex-shrink-0 mr-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${carouselNavClass}`}
                  >
                    <img src={LeftArrow} alt="" aria-hidden="true" className="w-6 h-9 transition-transform duration-200 ease-in-out hover:scale-110" />
                  </button>

                  <div className="relative aspect-[4/5] flex-1 rounded-2xl overflow-hidden shadow-2xl">
                    <Swiper
                      modules={[A11y, Navigation, Pagination]}
                      a11y={{
                        prevSlideMessage: "Previous destination",
                        nextSlideMessage: "Next destination",
                        paginationBulletMessage: "Go to destination {{index}}",
                      }}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
                        swiper.params.navigation.nextEl = ".swiper-button-next-custom";
                        swiper.navigation.init();
                        swiper.navigation.update();
                      }}
                      onSlideChange={(swiper) => {
                        setActiveSlideIndex(swiper.realIndex);
                        setActiveIndex(swiper.realIndex);
                        setHoveredDestId(null);
                      }}
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation={{ prevEl: ".swiper-button-prev-custom", nextEl: ".swiper-button-next-custom" }}
                      pagination={{ clickable: true }}
                      loop={true}
                      initialSlide={activeIndex || 0}
                      className="w-full h-full"
                    >
                      {featuredDestinations.map((city, index) => (
                        <SwiperSlide key={city.id}>
                          <Link
                            to={city.path}
                            aria-label={`View ${city.name} full story`}
                            className="block w-full h-full group relative"
                            onMouseEnter={() => {
                              setHoveredDestId(city.id);
                              prefetchRoute(city.path);
                            }}
                            onFocus={() => prefetchRoute(city.path)}
                            onMouseLeave={() => setHoveredDestId(null)}
                          >
                            <CloudinaryImage
                              legacyPath={city.img}
                              alt={city.name}
                              sizes="(max-width: 768px) 100vw, 450px"
                              widths={[450, 900, 1350]}
                              width={450}
                              height={563}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 pt-20">
                              <h3 className="text-white text-3xl font-bold font-cormorant tracking-tight">{city.name}</h3>
                              <p className={`text-sm italic font-cormorant mt-1 ${v.carouselLinkColor}`}>View Full Story &rarr;</p>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <button
                    type="button"
                    aria-label="Next destination"
                    className={`swiper-button-next-custom flex-shrink-0 ml-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${carouselNavClass}`}
                  >
                    <img src={RightArrow} alt="" aria-hidden="true" className="w-6 h-9 transition-transform duration-200 ease-in-out hover:scale-110" />
                  </button>
                </div>
              </motion.section>

              {/* Narrative panel — synced to active slide */}
              <motion.div
                className={`w-full max-w-[420px] mx-auto flex flex-col justify-center items-center text-center px-6 py-10 backdrop-blur-md rounded-xl ${
                  scrollGoldGradient
                    ? `${brazilCardClass} transition duration-300`
                    : `${v.narrativePanelBg} shadow-sm`
                }`}
                key={activeSlideIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className={`text-[1.3rem] sm:text-[1.4rem] leading-relaxed font-cormorant ${brazilNarrativeColor}`}>
                  {narrativeLines[featuredDestinations[activeSlideIndex]?.id]}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* ── MAP: GEOGRAPHIC ORIENTATION ──────────────────────────────────── */}
      {!deferBelowFold && (mapComponent && featuredDestinations.length > 0 ? (
        <motion.div variants={fadeScale} className="w-full flex justify-center relative mt-8 overflow-visible py-8">
          <div
            className="absolute -inset-y-8 w-screen left-1/2 -translate-x-1/2 pointer-events-none z-0"
            style={{ ...spreadBackgroundStyle, filter: "url(#torn-paper-filter)" }}
          />
          <div className="relative z-10 w-full max-w-4xl mx-auto overflow-visible px-4">
            {React.isValidElement(mapComponent)
              ? React.cloneElement(mapComponent, {
                  onHoverMarker: setHoveredDestId,
                  hoveredId: hoveredDestId,
                  activeId: featuredDestinations[activeSlideIndex]?.id,
                })
              : mapComponent}
          </div>
        </motion.div>
      ) : mapMarkers.length > 0 && (
        <motion.div variants={fadeScale} className="w-full flex justify-center relative mt-8 overflow-visible py-8">
          <div
            className="absolute -inset-y-8 w-screen left-1/2 -translate-x-1/2 pointer-events-none z-0"
            style={{ ...spreadBackgroundStyle, filter: "url(#torn-paper-filter)" }}
          />
          <div className="relative z-10 w-full max-w-4xl mx-auto overflow-visible px-4">
            <ContextMap
              markers={mapMarkers}
              variant="overview"
              showTitle={false}
              geography={true}
              transparent={true}
              hoveredId={hoveredDestId}
              activeId={featuredDestinations[activeSlideIndex]?.id}
              onHoverMarker={setHoveredDestId}
            />
          </div>
        </motion.div>
      ))}

      {/* ── GRID: SECONDARY NAVIGATION ───────────────────────────────────── */}
      {!deferBelowFold && gridCities.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 mt-[54px] mb-20">
          <h2 className={`text-lg font-bold font-cormorant mb-6 text-center uppercase tracking-widest ${brazilSectionTitleColor} opacity-90`}>
            Explore These Places
          </h2>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={staggerContainer}>
            {gridCities.map((city) => (
              <motion.div key={city.id} variants={fadeScale} className="w-[calc(50%-0.5rem)] sm:w-40 md:w-44">
                <Link
                  to={city.path}
                  className={`block w-full backdrop-blur-md rounded-xl px-2 py-3 text-center transition duration-300 font-semibold border whitespace-nowrap text-[clamp(0.7rem,2.5vw,0.875rem)] leading-tight ${gridPillClass}`}
                  onMouseEnter={() => setHoveredDestId(city.id)}
                  onMouseLeave={() => setHoveredDestId(null)}
                >
                  {city.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── FEATURE BANNERS ───────────────────────────────────────────── */}
      {!deferBelowFold && resolvedFeatureBanners.length > 0 && (
        <div ref={featureBannersRef} className="max-w-4xl mx-auto px-4 mb-16 space-y-4">
          {resolvedFeatureBanners.map((banner) => (
            <Link
              key={banner.id || banner.path}
              to={banner.path}
              aria-label={`${banner.name}${banner.tagline ? `: ${banner.tagline}` : ""}`}
              onMouseEnter={() => prefetchRoute(banner.path)}
              onFocus={() => prefetchRoute(banner.path)}
              className={`group relative flex items-center overflow-hidden rounded-2xl transition-all duration-300 ${
                scrollGoldGradient
                  ? `border ${brazilSurfaceClass}${highlightedBannerId === banner.id ? ' ring-2 ring-stone-900/40' : ''}`
                  : "shadow-lg border border-amber-400/40 hover:shadow-xl bg-amber-50/60"
              }`}
            >
              <div className="relative w-40 h-32 flex-shrink-0 overflow-hidden">
                <CloudinaryImage
                  legacyPath={banner.img}
                  alt={banner.name}
                  sizes="(max-width: 768px) 100vw, 400px"
                  widths={[400, 800, 1200]}
                  width={160}
                  height={128}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 px-6 py-4">
                <p className={`text-xs uppercase tracking-[0.22em] font-semibold mb-1 ${
                  scrollGoldGradient ? 'text-stone-800' : brazilSectionTitleColor
                }`}>Also in Brazil</p>
                <h3 className={`text-2xl font-bold font-cormorant ${brazilHeadlineColor}`}>{banner.name}</h3>
                {banner.tagline && (
                  <p className={`text-sm italic font-cormorant mt-1 ${brazilBodyColor}`}>{banner.tagline}</p>
                )}
              </div>
              <div className={`pr-6 text-lg ${scrollGoldGradient ? 'text-stone-900' : (v.carouselLinkColor || v.headlineColor)} group-hover:translate-x-1 transition-transform duration-200`} aria-hidden="true">→</div>
            </Link>
          ))}
        </div>
      )}

      {/* ── FEATURE CARD + MAP (single-destination layout) ─────────── */}
      {(featureCard || (mapComponent && featuredDestinations.length === 0)) && !deferBelowFold && (
        <div className="relative w-full py-32">
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[110vw] pointer-events-none z-0"
            style={{ ...spreadBackgroundStyle, filter: 'url(#torn-paper-filter)' }}
          />
          <div className="relative z-10 px-2">
            <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-48">
              {featureCard && (
                <div className="flex-shrink-0 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] flex items-center justify-center lg:-translate-x-16 -mt-20 lg:mt-0">
                  {featureCard}
                </div>
              )}
              {mapComponent && (
                <div className="flex-shrink-0 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] flex items-center justify-center">
                  <div className="w-full rounded-xl overflow-hidden border border-white/30 shadow-frame-deep">
                    {mapComponent}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── QUOTE ────────────────────────────────────────────────────────── */}
      {quote && (
        <div className="relative z-10 text-center py-6 max-w-2xl mx-auto px-6">
          <p className={`text-lg font-cormorant italic ${v.quoteColor}`}>
            {quote.text}
            {quote.attribution && (
              <span className={`block text-sm mt-2 ${v.quoteAccent}`}>— {quote.attribution}</span>
            )}
          </p>
        </div>
      )}

      {/* ── RETURN LINK ──────────────────────────────────────────────────── */}
      {returnLink && (!skipHero || !deferBelowFold) && (
        <div className="flex flex-col items-center gap-6 mt-16 mb-12 relative z-10">
          <Link
            to={returnLink.path}
            className={`flex flex-row items-center justify-center backdrop-blur-md rounded-xl py-3 px-6 text-center transition duration-300 text-sm font-semibold border ${returnPillClass}`}
          >
            <span className="text-lg mr-2">←</span>
            <span className="text-sm font-semibold uppercase tracking-wide">{returnLink.label}</span>
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default CountryLandingTemplate;
