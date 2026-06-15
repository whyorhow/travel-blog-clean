import React, { useState, useEffect, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import HT from "../components/HT";
import { cloudinaryUrlFromLegacyPath, cloudinaryImageUrl, cloudinarySrcSet } from "../utils/cloudinary";
import { HOME_LCP_LOGO, HOME_HERO_CLASS } from "../config/homeLcpLogo";
import { HOME_HERO_SLOTS } from "../config/homeHeroSlots";
import soilTexture from "../assets/images/soil-background.webp";
import ArrowLong from "../assets/images/Arrowlong.svg";

const Adventures = React.lazy(() => import("./Adventures"));
const HomeParallaxDecor = React.lazy(() => import("../components/home/HomeParallaxDecor"));
const WhatsNew = React.lazy(() => import("../components/home/WhatsNew"));

function HomeNew() {
  // Viewport state (kept for ParallaxBackground)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showDecor, setShowDecor] = useState(false);
  const [decorVisible, setDecorVisible] = useState(false);
  const [showBelowFold, setShowBelowFold] = useState(false);
  const [showAdventures, setShowAdventures] = useState(false);
  const exploreRef = useRef(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pillars = [
    {
      title: "Adventures",
      tagline: "Stories & maps",
      description:
        "Photo-led journeys, destination pages, and the interactive map — start below or anywhere on the path.",
      to: "#explore",
      anchor: true,
    },
    {
      title: "Nomads Gallery",
      tagline: "Filmstrip archives",
      description:
        "Thematic photo strips to browse at your own pace — moments grouped by mood, not itinerary.",
      to: "/nomads-gallery",
    },
    {
      title: "Nomads Shop",
      tagline: "Prints & artwork",
      description:
        "Art from the road. Brazil collections are live; other regions marked coming soon.",
      to: "/nomads-shop",
    },
  ];

  const journeys = [
    {
      title: "São Paulo",
      subtitle: "Concrete Jungle",
      link: "/brazil/saopaulo",
      publicId: "Brazil/Sao Paulo/Landing/small/street",
    },
    {
      title: "Salvador",
      subtitle: "Soul of Brazil",
      link: "/brazil/salvador",
      publicId: "Brazil/Salvador/full/SalvadorW1",
    },
    {
      title: "Antwerp",
      subtitle: "Heart of Belgium",
      link: "/belgium/antwerp",
      publicId: "Belgium/Antwerp/Full/Grote Markt",
    },
    {
      title: "Tennessee",
      subtitle: "Volunteer State",
      link: "/united-states/tennessee",
      publicId: "United States/Tennessee/Memphis/Small/Illuminated Beale Street",
    },
    {
      title: "Bonito",
      subtitle: "Hidden Waters",
      link: "/brazil/bonito",
      publicId: "Brazil/Bonito/thumbnail/Bonito7",
    },
  ];

  // Always start at top
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Below-fold sections + decor — idle to protect TBT; fade decor in to avoid a hard pop
  useEffect(() => {
    const enable = () => {
      setShowBelowFold(true);
      setShowDecor(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(enable, 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showDecor) return undefined;
    const frameId = window.requestAnimationFrame(() => setDecorVisible(true));
    return () => window.cancelAnimationFrame(frameId);
  }, [showDecor]);

  // Load Adventures only on scroll to #explore (map image was the ~28s LCP element)
  useEffect(() => {
    const load = () => setShowAdventures(true);

    if (window.location.hash === "#explore") {
      load();
      return undefined;
    }

    const node = exploreRef.current;
    if (!node) return undefined;

    // Negative bottom margin: ignore peeking below a tall hero on mobile lab tests
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 }
    );

    observer.observe(node);

    const onHash = () => {
      if (window.location.hash === "#explore") load();
    };
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-homeEarth">

      {/* Background Texture — deferred to avoid competing with LCP */}
      {showDecor && (
        <div
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out ${decorVisible ? "opacity-60" : "opacity-0"}`}
          style={{
            backgroundImage: `url(${cloudinaryUrlFromLegacyPath(
              "/images/Home/clumpy_red_soil_texture_v2.png"
            )})`,
            backgroundRepeat: "repeat",
            backgroundSize: "800px",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Parallax Background — deferred to reduce main-thread work at load */}
      {showDecor && (
        <div
          className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out ${decorVisible ? "opacity-100" : "opacity-0"}`}
        >
          <Suspense fallback={null}>
            <HomeParallaxDecor
              viewportHeight={viewportHeight}
              viewportWidth={viewportWidth}
            />
          </Suspense>
        </div>
      )}

      {/* SEO */}
      <SEO
        title="Nomad Scribbles | Slow Travel Stories from Brazil & Beyond"
        description="Nomad Scribbles documents places, moments, and experiences from around the world."
        image="/images/Home/Background.webp"
        slug=""
        preloadImage={HOME_LCP_LOGO.preload}
      />

      {/* HERO — phase-1 (logo only) matches static shell in index.html */}
      <section className={HOME_HERO_CLASS}>

        <img
          id="home-lcp-logo"
          src={HOME_LCP_LOGO.src}
          srcSet={HOME_LCP_LOGO.srcSet}
          sizes={HOME_LCP_LOGO.sizes}
          alt="Nomad Scribbles"
          width={HOME_LCP_LOGO.width}
          height={HOME_LCP_LOGO.height}
          className="home-shell-logo w-[95%] max-w-4xl h-auto object-contain drop-shadow-2xl"
          fetchPriority="high"
          decoding="sync"
        />

        {/* Fixed-height slots — reserved from first paint to prevent CLS */}
        <div className={HOME_HERO_SLOTS.tagline}>
          <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-4xl">
            <HT instantOnMobile />
          </div>
        </div>

        <div className={`${HOME_HERO_SLOTS.opening} text-center`}>
          <div className="relative bg-black/40 backdrop-blur-md rounded-2xl px-8 py-7 sm:px-12 sm:py-8 shadow-panel-deep border border-warmGold/20">
              <p className="text-sm md:text-lg uppercase tracking-[0.35em] text-warmGold font-bold">
                We are Nomad Scribbles.
              </p>
              <div className="mt-3 w-20 h-[1px] bg-cream/50 mx-auto" />
              <p className="mt-4 font-cormorant italic font-semibold leading-snug tracking-wide text-cream text-center text-[1.2rem] sm:text-[1.35rem] md:text-[1.55rem]">
                We document what we find.<br />
                Built as it grows.<br />
                Designed to be explored.
              </p>
            </div>
        </div>

        <div className={HOME_HERO_SLOTS.pillars}>
          <>
            <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.3em] text-warmGold/90 font-semibold mb-4">
                Three ways to explore
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {pillars.map((pillar) => {
                  const card = (
                    <div className="h-full rounded-xl border border-white/10 bg-black/30 backdrop-blur-md px-4 py-4 sm:py-5 shadow-panel-deep transition-all duration-300 hover:border-warmGold/40 hover:bg-black/40 group">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-warmGold/80 font-semibold">
                        {pillar.tagline}
                      </p>
                      <h2 className="mt-1 font-cormorant italic text-xl sm:text-2xl text-cream group-hover:text-warmGold transition-colors">
                        {pillar.title}
                      </h2>
                      <p className="mt-2 font-cormorant text-sm sm:text-[0.95rem] leading-snug text-cream/85">
                        {pillar.description}
                      </p>
                    </div>
                  );
                  return pillar.anchor ? (
                    <a key={pillar.title} href={pillar.to} className="block text-left">
                      {card}
                    </a>
                  ) : (
                    <Link key={pillar.title} to={pillar.to} className="block text-left">
                      {card}
                    </Link>
                  );
                })}
              </div>
          </>
        </div>

        <div className={HOME_HERO_SLOTS.arrow} style={{ transform: "rotate(180deg)" }}>
          <img
            src={ArrowLong}
            alt="Scroll down"
            className="w-9 md:w-12 opacity-90"
            width={48}
            height={48}
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}
          />
        </div>

      </section>

      {/* Torn paper edge - top of Adventures */}
      <div className="relative z-50 overflow-hidden" style={{ lineHeight: 0, marginBottom: '-2px', marginTop: '-1px' }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ height: "clamp(40px, 6vw, 60px)", display: "block" }}>
          <path d="M0,0 L0,40 L1200,40 L1200,0 C1170,8 1140,22 1110,14 C1080,6 1050,24 1020,16 C990,8 960,20 930,12 C900,4 870,26 840,18 C810,10 780,22 750,14 C720,6 690,28 660,20 C630,12 600,18 570,10 C540,2 510,24 480,16 C450,8 420,22 390,14 C360,6 330,28 300,20 C270,12 240,18 210,10 C180,2 150,24 120,16 C90,8 60,20 30,12 Z" fill="#50473e" />
        </svg>
      </div>

      {/* ADVENTURES — deferred until scroll (map image was the 28s LCP culprit) */}
      <section id="explore" ref={exploreRef} className="relative z-50 min-h-[50vh] bg-warmTaupe scroll-mt-0">
        {showAdventures ? (
          <Suspense fallback={<div className="min-h-[50vh] bg-stone-800" aria-hidden="true" />}>
            <Adventures hideTitle enlargeMap />
          </Suspense>
        ) : (
          <div className="min-h-[50vh] bg-stone-800" aria-hidden="true" />
        )}
      </section>

      {showBelowFold && (
        <Suspense fallback={null}>
          <WhatsNew />
        </Suspense>
      )}

      {/* FEATURED JOURNEYS */}
      {showBelowFold && (
      <section className="relative z-50 bg-warmTaupe pb-32 pt-4">
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url(${soilTexture})`, backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)', opacity: 0.1 }} />

          <div className="text-center pt-4 mb-16 max-w-lg mx-auto px-6">
            <div className="relative bg-warmMuted/50 backdrop-blur-md rounded-2xl px-8 py-6 shadow-panel-deep border border-white/10">
              <p className="text-sm md:text-base uppercase tracking-[0.35em] text-warmGold font-semibold">Featured Journeys</p>
              <div className="mt-3 w-16 h-[1px] bg-cream/40 mx-auto" />
              <p className="mt-3 font-cormorant italic leading-snug tracking-wide text-cream text-center text-[1.1rem] md:text-[1.4rem]">Some stops that stuck with us</p>
            </div>
          </div>

        <div className="w-full max-w-5xl mx-auto px-6">
          {journeys.map((j, i) => {
            const rotations = ["md:-rotate-1", "md:rotate-1", "md:-rotate-2", "md:rotate-2", "md:rotate-0"];
            const offsets = ["md:ml-0", "md:ml-8", "md:ml-3", "md:ml-10", "md:ml-5"];
            return (
              <div key={i}>
                <Link to={j.link}>
                  <div
                    className={`relative mb-8 md:mb-14 w-[85%] md:w-full mx-auto cursor-pointer ${rotations[i % rotations.length]} ${offsets[i % offsets.length]} transition-transform duration-500 hover:scale-[1.02]`}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-2xl">
                      <img
                        src={cloudinaryImageUrl(j.publicId, { width: 800 })}
                        srcSet={cloudinarySrcSet(j.publicId, [400, 800, 1200])}
                        sizes="85vw"
                        alt={j.title}
                        width={1200}
                        height={675}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-[140px] md:h-[300px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent rounded-t-xl" />
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl" />
                      <div className="absolute top-4 left-4 md:top-6 md:left-6">
                        <h2 className="font-cormorant italic text-2xl md:text-4xl text-[hsl(49,70%,66%)] -rotate-2 drop-shadow-lg">
                          {j.title}
                        </h2>
                      </div>
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right">
                        <p className="font-cormorant italic text-xl md:text-2xl text-[hsl(49,80%,75%)] rotate-1 drop-shadow-md">
                          {j.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-8 pb-4">
          <Link
            to="/brazil"
            className="flex items-center justify-center text-warmGold hover:text-warmTaupe transition-all duration-300 drop-shadow-md bg-black/30 backdrop-blur-md rounded-full px-10 py-3 border border-warmGold/60 shadow-lg hover:bg-warmGold font-semibold tracking-widest text-sm uppercase"
          >
            Start in Brazil
          </Link>
        </div>

      </section>
      )}

    </div>
  );
}

export default HomeNew;
