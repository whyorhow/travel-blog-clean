import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import SEO from "../components/SEO";
import HT from "../components/HT";
import ParallaxBackground from "../components/ParallaxBackground";
import { cloudinaryUrlFromLegacyPath, cloudinaryImageUrl } from "../utils/cloudinary";
import soilTexture from "../assets/images/soil-background.webp";

const Adventures = React.lazy(() => import("./Adventures"));
import ArrowLong from "../assets/images/Arrowlong.svg";
import WhatsNew from "../components/home/WhatsNew";

function HomeNew() {
  // Viewport state (kept for ParallaxBackground)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const { scrollY: scrollYMotion } = useScroll();

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
      img: cloudinaryImageUrl("Brazil/Sao Paulo/Landing/small/street", { width: 1200 })
    },
    {
      title: "Salvador",
      subtitle: "Soul of Brazil",
      link: "/brazil/salvador",
      img: cloudinaryImageUrl("Brazil/Salvador/full/SalvadorW1", { width: 1200 })
    },
    {
      title: "Antwerp",
      subtitle: "Heart of Belgium",
      link: "/belgium/antwerp",
      img: cloudinaryImageUrl("Belgium/Antwerp/Full/Grote Markt", { width: 1200 })
    },
    {
      title: "Tennessee",
      subtitle: "Volunteer State",
      link: "/united-states/tennessee",
      img: cloudinaryImageUrl("United States/Tennessee/Memphis/Small/Illuminated Beale Street", { width: 1200 })
    },
    {
      title: "Bonito",
      subtitle: "Hidden Waters",
      link: "/brazil/bonito",
      img: cloudinaryImageUrl("Brazil/Bonito/thumbnail/Bonito7", { width: 1200 })
    }
  ];

  // Always start at top
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-homeEarth">

      {/* Background Texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `url(${cloudinaryUrlFromLegacyPath(
            "/images/Home/clumpy_red_soil_texture_v2.png"
          )})`,
          backgroundRepeat: "repeat",
          backgroundSize: "800px",
          mixBlendMode: "multiply",
        }}
      />

      {/* Parallax Background */}
      <ParallaxBackground
        scrollYMotion={scrollYMotion}
        viewportHeight={viewportHeight}
        viewportWidth={viewportWidth}
      />

      {/* SEO */}
      <SEO
        title="Nomad Scribbles | Slow Travel Stories from Brazil & Beyond"
        description="Nomad Scribbles documents places, moments, and experiences from around the world."
        image="/images/Home/Background.webp"
        slug=""
      />

      {/* HERO */}
      <section className="relative z-50 flex flex-col items-center justify-start min-h-[65vh] md:min-h-[85vh] text-center px-4 pt-8 md:pt-16 pb-8 md:pb-0">

        {/* Logo */}
        <motion.img
          src="/assets/LogoLargeDrawn2.webp"
          alt="Nomad Scribbles"
          className="w-[95%] max-w-4xl object-contain drop-shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Tagline - controlled by CSS width only */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-4 z-50 w-full flex items-center justify-center"
        >
          <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-4xl">
            <HT />
          </div>
        </motion.div>

        {/* Opening note - directly below tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="mt-6 md:mt-14 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center"
        >
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
        </motion.div>

        {/* Three pillars */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-8 md:mt-10 w-full max-w-4xl mx-auto px-4 sm:px-6"
        >
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
        </motion.div>

        {/* Scroll hint arrow toward Adventures */}
        <div className="mt-4 md:mt-8" style={{ transform: 'rotate(180deg)' }}>
          <motion.img
            src={ArrowLong}
            alt="Scroll down"
            className="w-9 md:w-12 opacity-90 mx-auto"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0, 0] }}
            transition={{
              opacity: { duration: 1, delay: 3 },
              y: { duration: 3, ease: "easeInOut" }
            }}
          />
        </div>

      </section>

      {/* Torn paper edge - top of Adventures */}
      <div className="relative z-50 overflow-hidden" style={{ lineHeight: 0, marginBottom: '-2px', marginTop: '-1px' }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ height: "clamp(40px, 6vw, 60px)", display: "block" }}>
          <path d="M0,0 L0,40 L1200,40 L1200,0 C1170,8 1140,22 1110,14 C1080,6 1050,24 1020,16 C990,8 960,20 930,12 C900,4 870,26 840,18 C810,10 780,22 750,14 C720,6 690,28 660,20 C630,12 600,18 570,10 C540,2 510,24 480,16 C450,8 420,22 390,14 C360,6 330,28 300,20 C270,12 240,18 210,10 C180,2 150,24 120,16 C90,8 60,20 30,12 Z" fill="#50473e" />
        </svg>
      </div>

      {/* ADVENTURES (MAIN CONTENT) - lazy-loaded below hero */}
      <section id="explore" className="relative z-50 min-h-[50vh] bg-warmTaupe scroll-mt-0">
        <Suspense
          fallback={
            <motion.div
              className="flex flex-col items-center justify-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-8 h-8 border-4 border-goldAccent border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          }
        >
          <Adventures hideTitle enlargeMap />
        </Suspense>
      </section>

      <WhatsNew />

      {/* FEATURED JOURNEYS */}
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link to={j.link}>
                  <div
                    className={`relative mb-8 md:mb-14 w-[85%] md:w-full mx-auto cursor-pointer ${rotations[i % rotations.length]} ${offsets[i % offsets.length]} transition-transform duration-500 hover:scale-[1.02]`}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-2xl">
                      <img
                        src={j.img}
                        alt={j.title}
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
              </motion.div>
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

    </div>
  );
}

export default HomeNew;
