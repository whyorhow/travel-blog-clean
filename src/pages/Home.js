import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import SEO from "../components/SEO";
import { fadeScale, hoverScale, staggerContainer } from "../utils/animations";
import HandwritingTagline from "../components/HandwritingTagline";
import { trackEvent } from "../utils/analytics";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

// Swiper for simpler, smoother carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ParallaxBackground from "../components/ParallaxBackground";

/**
 * HOME PAGE
 * Optimized for "Liquid Silk" auto-scrolling and rich clumpy red soil texture.
 */
function Home() {
  const navigate = useNavigate();

  // OPTIMIZATION: Use viewport state sparingly
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Framer Motion useScroll for high-performance values
  const { scrollY: scrollYMotion } = useScroll();
  const logoOpacity = useTransform(scrollYMotion, [100, 300], [0, 1]);

  const cards = [
    { title: "Bonito", link: "/brazil/bonito", img: "/images/Bonito/thumbnail/Bonito7.webp" },
    { title: "Florianópolis", link: "/brazil/florianopolis", img: "/images/Floripa/thumbnail/Floripa7.webp" },
    { title: "Iguazu", link: "/brazil/iguazu", img: "/images/Iguazu/thumbnail/Iguazu7.webp" },
    { title: "Ilha Grande", link: "/brazil/ilhagrande", img: "/images/IlhaGrande/thumbnail/Ilha7.webp" },
    { title: "Manaus", link: "/brazil/manaus", img: "/images/Manaus/thumbnail/Manaus7.webp" },
    { title: "Pantanal", link: "/brazil/pantanal", img: "/images/Pantanal/thumbnail/Pantanal7.webp" },
    { title: "Santos", link: "/brazil/santos", img: "/images/Santos/thumbnail/Santos1.webp" },
  ];

  const [showMiniGallery, setShowMiniGallery] = useState(false);
  const [showMiniSP, setShowMiniSP] = useState(false);
  const [showMiniSantos, setShowMiniSantos] = useState(false);
  const [showMiniRio, setShowMiniRio] = useState(false);

  const firstFeatureRef = useRef(null); // For autoscroll
  const isMobile = viewportWidth <= 768;

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure page starts at top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // --- SMOOTH TIME-BASED AUTOSCROLL (No Stutter) ---
  useEffect(() => {
    let animationFrameId;
    let timeoutId;
    let isStopped = false;
    let startTime = null;
    let startScrollY = 0;

    const SCROLL_SPEED_PX_PER_SEC = isMobile ? 80 : 120;
    const START_DELAY_MS = 3500;

    const stopScroll = () => {
      isStopped = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };

    window.addEventListener("wheel", stopScroll, { passive: true });
    window.addEventListener("touchmove", stopScroll, { passive: true });
    window.addEventListener("keydown", stopScroll);

    const animateScroll = (timestamp) => {
      if (isStopped) return;
      if (!startTime) {
        startTime = timestamp;
        startScrollY = window.scrollY;
      }

      const elapsed = timestamp - startTime;
      const targetScroll = startScrollY + (elapsed / 1000) * SCROLL_SPEED_PX_PER_SEC;

      const targetElement = firstFeatureRef.current;
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          isStopped = true;
          return;
        }
      }

      if ((window.innerHeight + targetScroll) >= document.body.offsetHeight - 5) {
        isStopped = true;
        return;
      }

      window.scrollTo(0, targetScroll);
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateScroll);
    }, START_DELAY_MS);

    return () => {
      stopScroll();
      window.removeEventListener("wheel", stopScroll);
      window.removeEventListener("touchmove", stopScroll);
      window.removeEventListener("keydown", stopScroll);
    };
  }, [isMobile]);

  const handleSPClick = () => {
    setShowMiniSP((prev) => {
      if (!prev && isMobile) return true;
      navigate("/brazil/saopaulo");
      return prev;
    });
  };

  const handleRioClick = () => {
    setShowMiniRio((prev) => {
      if (!prev) return true;
      navigate("/brazil/rio");
      return prev;
    });
  };

  const handleFloripaClick = () => {
    setShowMiniFloripa((prev) => {
      if (!prev) return true;
      navigate("/brazil/florianopolis");
      return prev;
    });
  };

  return (
    <div className="relative w-screen min-h-[250vh] overflow-hidden bg-[#2e1208]">
      {/* Background Texture Overlay: Photographic Clumpy Red Soil */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `url(${cloudinaryUrlFromLegacyPath("/images/Home/clumpy_red_soil_texture_v2.png")})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px',
          mixBlendMode: 'multiply'
        }}
      />

      <ParallaxBackground scrollYMotion={scrollYMotion} viewportHeight={viewportHeight} viewportWidth={viewportWidth} />

      <SEO
        title="Nomad Scribbles | Travel Stories Across the World"
        description="Join Nomad Scribbles on a journey through cities, culture, travel tips, and inspiring adventures."
        image="/images/Home/Background.webp"
        slug=""
      />

      {/* Tagline Sticky Filter - Supporting Detail Grit */}
      <svg className="hidden">
        <filter id="soilTexture" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" result="monoNoise" />
          <feGaussianBlur in="monoNoise" stdDeviation="0.4" result="softNoise" />
          <feDiffuseLighting in="softNoise" lightingColor="#7d5a3e" surfaceScale="1.2" result="light">
            <feDistantLight azimuth="45" elevation="65" />
          </feDiffuseLighting>
          <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1="1.0" k2="0.6" k3="0.1" k4="0" />
        </filter>
        {/* NEW: Exaggerated "Clumpy Red Earth" Filter for the Bottom Layers */}
        <filter
          id="exaggeratedSoilFilter"
          filterUnits="userSpaceOnUse"
          x="0" y="0" width="100%" height="100%"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="clods" />
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" result="grit" />
          <feBlend in="clods" in2="grit" mode="overlay" result="combinedNoise" />
          <feComponentTransfer in="combinedNoise" result="sharpNoise">
            <feFuncR type="gamma" exponent="2.2" />
            <feFuncG type="gamma" exponent="2.2" />
            <feFuncB type="gamma" exponent="2.2" />
          </feComponentTransfer>
          <feDiffuseLighting in="sharpNoise" lightingColor="#a52a2a" surfaceScale="4.5" result="light">
            <feDistantLight azimuth="225" elevation="45" />
          </feDiffuseLighting>
          <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1="1.6" k2="0.3" k3="0.05" k4="0" />
        </filter>
      </svg>

      <h1 className="sr-only">Nomad Scribbles | Travel Stories Across the World</h1>

      {/* Sticky Hero Section */}
      <div className="absolute top-0 left-0 w-full h-[200vh] z-30 pointer-events-none flex flex-col items-center">
        {/* Tagline Sticky Layer */}
        <div className="sticky top-[25vh] w-full flex flex-col items-center">
          <motion.div
            className="text-center mb-2 w-full flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="text-lg sm:text-xl md:text-2xl font-handwriting drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] text-[hsl(49,70%,66%)] w-[90%] max-w-[1050px] mx-auto text-center opacity-90">
              <HandwritingTagline duration={2.5} strokeColor="hsl(49, 70%, 66%)" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* Logo Sticky Layer - Instant Fade (No Delay Timer) */}
        <div className="sticky top-[75vh] w-full flex flex-col items-center">
          <motion.div
            className="text-center w-full flex justify-center"
            style={{ opacity: logoOpacity }}
          >
            <motion.div
              className="w-full sm:w-4/5 md:w-3/4 lg:w-3/4 max-w-4xl mx-auto"
              variants={fadeScale}
              initial="visible"
              animate="visible"
            >
              <img
                src="/assets/LogoLargeDrawn2.webp"
                alt="Nomad Scribbles Hand-drawn Logo"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Feature 1: Nomads Gallery */}
      <motion.div
        ref={firstFeatureRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-[120vh] px-2 sm:px-4 relative z-40"
      >
        <motion.div
          className="relative block w-full max-w-full sm:max-w-[85%] md:max-w-[80%] mx-auto aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
          onMouseEnter={() => setShowMiniGallery(true)}
          onMouseLeave={() => setShowMiniGallery(false)}
          onClick={() => {
            navigate("/nomads-gallery");
            trackEvent("click_feature", "Home Page", "Nomads Gallery Feature");
          }}
          variants={fadeScale}
        >
          <motion.img
            src={cloudinaryUrlFromLegacyPath("/images/Home/ThumbnailNG_UserPreference.png", { width: 2000 })}
            alt="Nomads Gallery feature"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
            variants={hoverScale}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-[2000ms]"></div>

          <div className={`absolute top-8 left-8 z-20 transition-opacity duration-[2000ms] ${!showMiniGallery ? "opacity-100" : "opacity-0"}`}>
            <h2 className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-[hsl(49,70%,66%)] drop-shadow-lg -rotate-6">
              Nomads Gallery
            </h2>
          </div>

          {showMiniGallery && (
            <>
              <motion.div
                className="absolute inset-0 flex items-end justify-center z-20 pb-12 sm:pb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.2 }} // Delay appearance until first text fades
              >
                <h3 className="font-handwriting text-3xl sm:text-5xl text-[hsl(49,80%,75%)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center px-4">
                  The World through Art
                </h3>
              </motion.div>

              <motion.img
                src={cloudinaryUrlFromLegacyPath("/images/ArtGallery/small/ArtGallery1z.webp", { width: 1200 })}
                alt=""
                loading="lazy"
                className="absolute top-4 right-4 w-32 sm:w-48 md:w-56 lg:w-64 z-20 transition-opacity duration-[2000ms] rounded-lg shadow-lg rotate-[6deg]"
                variants={fadeScale}
              />
              <motion.img
                src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/small/caparinhaz.webp", { width: 1200 })}
                alt=""
                loading="lazy"
                className="absolute bottom-4 left-4 w-32 sm:w-48 md:w-56 lg:w-64 z-20 transition-opacity duration-[2000ms] rounded-lg shadow-lg rotate-[-3deg]"
                variants={fadeScale}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Feature 2: São Paulo */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-24 px-2 sm:px-4 relative z-40"
      >
        <motion.div
          className="relative block w-full max-w-full sm:max-w-[85%] md:max-w-[80%] mx-auto aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
          onMouseEnter={() => {
            if (!isMobile) setShowMiniSP(true);
            trackEvent("hover_feature", "Home Page", "São Paulo Feature");
          }}
          onMouseLeave={() => !isMobile && setShowMiniSP(false)}
          onClick={() => {
            handleSPClick();
            trackEvent("click_feature", "Home Page", "São Paulo Feature");
          }}
          variants={fadeScale}
        >
          <motion.img
            src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/street.webp", { width: 2000 })}
            alt="São Paulo city travel feature"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
            variants={hoverScale}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-[2000ms]"></div>

          <div className={`absolute top-8 left-8 z-20 transition-opacity duration-[2000ms] ${!showMiniSP ? "opacity-100" : "opacity-0"}`}>
            <h2 className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-[hsl(49,70%,66%)] drop-shadow-lg -rotate-6">
              São Paulo
            </h2>
          </div>

          {showMiniSP && (
            <>
              <motion.div
                className="absolute inset-0 flex items-end justify-center z-20 pb-12 sm:pb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2 }}
              >
                <h3 className="font-handwriting text-3xl sm:text-5xl text-[hsl(49,80%,75%)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center px-4">
                  Concrete Jungle
                </h3>
              </motion.div>

              <motion.img
                src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/pizza.webp", { width: 1200 })}
                alt=""
                loading="lazy"
                className="absolute top-4 right-4 w-32 sm:w-48 md:w-56 lg:w-64 z-20 transition-opacity duration-[2000ms] rounded-lg shadow-lg rotate-[6deg]"
                variants={fadeScale}
              />
              <motion.img
                src={cloudinaryUrlFromLegacyPath("/images/SaoPauloLanding/caparinha.webp", { width: 1200 })}
                alt=""
                loading="lazy"
                className="absolute bottom-4 left-4 w-32 sm:w-48 md:w-56 lg:w-64 z-20 transition-opacity duration-[2000ms] rounded-lg shadow-lg rotate-[-3deg]"
                variants={fadeScale}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Feature 2: Salvador */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-24 px-2 sm:px-4 relative z-40"
      >
        <motion.div
          className="relative block w-full max-w-full sm:max-w-[85%] md:max-w-[80%] mx-auto aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
          onMouseEnter={() => {
            setShowMiniSantos(true);
            trackEvent("hover_feature", "Home Page", "Salvador Feature");
          }}
          onMouseLeave={() => setShowMiniSantos(false)}
          onClick={() => {
            navigate("/brazil/salvador");
            trackEvent("click_feature", "Home Page", "Salvador Feature");
          }}
          variants={fadeScale}
        >
          <motion.img
            src={cloudinaryUrlFromLegacyPath("/images/Salvador/full/SalvadorW1.webp", { width: 2000 })}
            alt="Salvador city travel feature"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
            variants={hoverScale}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-[2000ms]"></div>

          <div className={`absolute top-8 right-8 z-20 transition-opacity duration-[2000ms] ${!showMiniSantos ? "opacity-100" : "opacity-0"}`}>
            <h2 className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-[hsl(49,70%,66%)] drop-shadow-lg rotate-3 text-right">
              Salvador
            </h2>
          </div>

          {showMiniSantos && (
            <>
              <motion.div
                className="absolute inset-0 flex items-end justify-center z-20 pb-12 sm:pb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2 }}
              >
                <h3 className="font-handwriting text-3xl sm:text-5xl text-[hsl(49,80%,75%)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center px-4">
                  Soul of Brazil
                </h3>
              </motion.div>

              <motion.img
                src={cloudinaryUrlFromLegacyPath("/images/Salvador/small/Salvador20z.webp", { width: 1200 })}
                alt=""
                loading="lazy"
                className="absolute top-4 left-4 w-32 sm:w-48 md:w-56 lg:w-64 z-20 transition-opacity duration-[2000ms] rounded-lg shadow-lg rotate-[-6deg]"
                variants={fadeScale}
              />
              <motion.img
                src={cloudinaryUrlFromLegacyPath("/images/Salvador/small/Salvador15z.webp", { width: 1200 })}
                alt=""
                loading="lazy"
                className="absolute bottom-4 right-4 w-32 sm:w-48 md:w-56 lg:w-64 z-20 transition-opacity duration-[2000ms] rounded-lg shadow-lg rotate-[3deg]"
                variants={fadeScale}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Feature 4: Rio */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={staggerContainer}
        className="w-full mt-24 px-2 sm:px-4 relative z-40"
      >
        <motion.div
          className="relative block w-full max-w-full sm:max-w-[85%] md:max-w-[80%] mx-auto aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 group transition-all duration-[2000ms]"
          onMouseEnter={() => {
            setShowMiniRio(true);
            trackEvent("hover_feature", "Home Page", "Rio Feature");
          }}
          onMouseLeave={() => setShowMiniRio(false)}
          onClick={() => {
            handleRioClick();
            trackEvent("click_feature", "Home Page", "Rio Feature");
          }}
          variants={fadeScale}
        >
          <motion.img
            src={cloudinaryUrlFromLegacyPath("/images/Rio/Rio1.jpg", { width: 2000 })}
            alt="Rio de Janeiro city travel feature"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
            variants={hoverScale}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/10 group-hover:backdrop-blur-none transition-all duration-[2000ms]"></div>

          <div className={`absolute top-8 left-8 z-20 transition-opacity duration-[2000ms] ${!showMiniRio ? "opacity-100" : "opacity-0"}`}>
            <h2 className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-[hsl(49,70%,66%)] drop-shadow-lg -rotate-6">
              Rio de Janeiro
            </h2>
          </div>

          {showMiniRio && (
            <motion.div
              className="absolute inset-0 flex items-end justify-center z-20 pb-12 sm:pb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
            >
              <h3 className="font-handwriting text-3xl sm:text-5xl text-[hsl(49,80%,75%)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-center px-4">
                Marvelous City
              </h3>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom Carousel - Swiper Implementation */}
      <div className="w-full max-w-screen-xl mx-auto py-12 mt-24 relative px-2 sm:px-4 z-40">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3.2,
              centeredSlides: false,
            },
          }}
          className="w-full h-full !pb-8"
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx} className="!h-auto flex items-stretch">
              <Link to={card.link} className="block w-full">
                <div className="relative shadow-xl hover:shadow-2xl transition-all duration-300 w-full h-full rounded-2xl overflow-hidden aspect-square group">
                  <img
                    src={cloudinaryUrlFromLegacyPath(card.img, { width: 1200 })}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[hsl(49,70%,66%)] font-semibold text-lg drop-shadow-md">{card.title}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: rgba(255,255,255, 0.8);
          background-color: rgba(0,0,0, 0.3);
          padding: 24px;
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Home;
