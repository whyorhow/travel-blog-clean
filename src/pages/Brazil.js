import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, staggerContainer } from "../utils/animations";
import ContextMap from "../components/ContextMap";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import LeftArrow from "../assets/images/lftarrow.svg";
import RightArrow from "../assets/images/rtarrow.svg";
import { useNarrative } from "../context/NarrativeContext";

// Swiper for locations carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Brazil() {
  const { currentCountry, activeIndex, setActiveIndex } = useNarrative();

  // Lock Brazil to its own context on load
  useEffect(() => {
    if (currentCountry !== "brazil") {
      setActiveIndex(0);
    }
  }, [currentCountry, setActiveIndex]);

  // Destinations for the carousel/grid
  const gridCities = destinations.filter(d => d.country === 'Brazil');

  // Featured destinations for the carousel
  const featuredDestinations = [
    { id: "saopaulo", name: "São Paulo", img: "/images/SaoPauloLanding/small/street.jpg", path: "/brazil/saopaulo" },
    { id: "florianopolis", name: "Florianópolis", img: "/images/Floripa/small/Floripa18.webp", path: "/brazil/florianopolis" },
    { id: "rio", name: "Rio de Janeiro", img: "/images/Rio/small/Rio9.webp", path: "/brazil/rio" },
    { id: "bonito", name: "Bonito", img: "/images/Bonito/Small/Bonito3new.webp", path: "/brazil/bonito" },
    { id: "salvador", name: "Salvador", img: "/images/Salvador/small/Salvador5.webp", path: "/brazil/salvador" },
    { id: "pantanal", name: "The Pantanal", img: "/images/Pantanal/small/Pantanal5.webp", path: "/brazil/pantanal" },
    { id: "foz", name: "Foz do Iguaçu", img: "/images/Iguazu/small/Iguazu16.webp", path: "/brazil/foz" },
    { id: "manaus", name: "Manaus", img: "/images/Manaus/Small/Manaus13.webp", path: "/brazil/manaus" },
    { id: "ilha-grande", name: "Ilha Grande", img: "/images/Ilha Grande/small/Ilha20new.webp", path: "/brazil/ilha-grande" }
  ];

  // Map markers
  const mapMarkers = destinations.filter(d => d.country === 'Brazil');

  const [showOverlay, setShowOverlay] = useState(false);
  const [hoveredDestId, setHoveredDestId] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef(null);

  // Narrative lines for each destination - creates the "journey unfolded" story
  const narrativeLines = {
    saopaulo: "This is where it began.",
    rio: "Everything shifted towards the coast.",
    florianopolis: "The pace slowed.",
    bonito: "The landscape changed again.",
    salvador: "The rhythm found its roots.",
    pantanal: "It opened out completely.",
    foz: "The falls marked the edge.",
    manaus: "The river became the road.",
    "ilha-grande": "We ended where the forest meets the sea."
  };

  // Auto-switch overlay after 1 second on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const spreadBackgroundStyle = {
    backgroundImage: `url(${paperTexture})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "url(#torn-paper-filter)",
    opacity: 0.95,
  };

  // Brazil-specific light green paper background - natural tone
  const brazilBackgroundStyle = {
    backgroundColor: "#c8d8c0", // Warm natural sage
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(170, 195, 160, 0.5) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(150, 175, 140, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(185, 205, 175, 0.6) 0%, transparent 70%),
      radial-gradient(circle at 10% 80%, rgba(175, 200, 165, 0.35) 0%, transparent 40%)
    `,
    backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
    backgroundPosition: "0 0, 0 0, 0 0, 0 0",
    backgroundAttachment: "fixed",
    position: "relative",
  };

  // Programmatically slide swiper when map pin is hovered
  useEffect(() => {
    if (swiperRef.current && hoveredDestId) {
      const index = featuredDestinations.findIndex(d => d.id === hoveredDestId);
      if (index !== -1) {
        swiperRef.current.slideToLoop(index);
      }
    }
  }, [hoveredDestId, featuredDestinations]);

  return (
    <motion.div
      className="relative pb-20 min-h-screen"
      style={{
        ...brazilBackgroundStyle,
        marginTop: "-48px", // Pull up behind the fixed header (h-12 = 48px)
        paddingTop: "48px", // Add padding back to compensate
      }}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Full-height green background layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: brazilBackgroundStyle.backgroundColor,
          backgroundImage: brazilBackgroundStyle.backgroundImage,
          backgroundSize: brazilBackgroundStyle.backgroundSize,
          backgroundPosition: brazilBackgroundStyle.backgroundPosition,
          backgroundAttachment: "fixed",
          zIndex: -1,
        }}
      />

      {/* SVG Filter for torn paper edges */}
      <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
        <defs>
          <filter id="torn-paper-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Paper texture overlay for Brazil page only */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          zIndex: -1,
        }}
      />
      <SEO
        title="Travel Adventures in Brazil | Nomad Scribbles"
        description="Explore Brazil’s most iconic cities and landscapes — from Rio de Janeiro and São Paulo to the Pantanal and Bonito, join our journeys across the country."
        image="/images/Brazil/BrazilBack.png"
        slug="/brazil"
      />

      <h1 className="sr-only">Nomad Scribbles | Travel Adventures in Brazil</h1>

      {/* Hero Image with Overlay - Optimized */}
      <motion.div
        className="relative w-full max-w-3xl mx-auto mt-8 mb-4 px-4 cursor-pointer"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onClick={() => setShowOverlay(!showOverlay)}
        variants={fadeScale}
      >
        <img
          src={cloudinaryUrlFromLegacyPath("/images/Brazil/BrazilHero.webp", { width: 2000 })}
          alt="Brazilian landscape with city and nature"
          fetchPriority="high" // OPTIMIZATION: Load first
          loading="eager"      // OPTIMIZATION: Load immediately
          className="w-full h-auto object-contain shadow-lg rounded-lg p-3 sm:p-4"
        />
        <img
          src={cloudinaryUrlFromLegacyPath("/images/Brazil/BrazilPhoto.webp", { width: 2000 })}
          alt="Overlay Brazil photo"
          loading="lazy" // OPTIMIZATION: This can load later
          className={`absolute inset-0 w-full h-full object-contain shadow-lg transition-opacity duration-500 scale-[0.9] sm:scale-100 ${showOverlay ? "opacity-100" : "opacity-0"}`}
        />
      </motion.div>

      {/* Intro Bridge - scene change moment */}
      <div className="relative py-20 sm:py-28 text-center">
        <div className="max-w-xl mx-auto px-6">

          <p className="font-cormorant text-[2rem] sm:text-[2.4rem] leading-tight text-green-950">
            We didn't really understand Brazil at first.
          </p>

          <p className="mt-6 text-[1.2rem] sm:text-[1.3rem] leading-relaxed text-green-900/70">
            It was only by moving through it that pace, landscape, and the journey itself began to make sense.
          </p>

        </div>
      </div>

      {/* Side-by-Side Swiper and Map Section (Full-Width Spread) */}
      <div className="relative w-full mt-10 mb-20 py-16 overflow-visible">

        {/* Stronger background separation */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-green-900/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 overflow-visible">
          {/* Section title */}
          <p className="font-cormorant text-[1.6rem] sm:text-[1.9rem] text-green-950 text-center max-w-xl mx-auto mb-14">
            This is how Brazil unfolded for us.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center w-full mb-4 text-darkText">
            {/* Swiper Carousel (Left) */}
            <motion.section
              className="w-full flex justify-center lg:justify-end"
              variants={fadeScale}
            >
              <div className="relative w-full max-w-[450px] flex items-center">
                {/* Left arrow - outside carousel */}
                <button
                  className="swiper-button-prev-custom flex-shrink-0 mr-3 w-12 h-12 rounded-full bg-stone-800/70 flex items-center justify-center hover:bg-stone-800/90 transition-colors duration-200"
                >
                  <img src={LeftArrow} alt="Previous" className="w-6 h-9 transition-transform duration-200 ease-in-out hover:scale-110" />
                </button>

                {/* Carousel container */}
                <div className="relative aspect-[4/5] flex-1 rounded-2xl overflow-hidden shadow-2xl">
                <Swiper
                  modules={[Navigation, Pagination]}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // Connect custom buttons to swiper
                    swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
                    swiper.params.navigation.nextEl = ".swiper-button-next-custom";
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  onSlideChange={(swiper) => {
                    setActiveSlideIndex(swiper.realIndex);
                    setActiveIndex(swiper.realIndex);
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
                        className="block w-full h-full group relative"
                        onMouseEnter={() => setHoveredDestId(city.id)}
                        onMouseLeave={() => setHoveredDestId(null)}
                      >
                        <img
                          src={cloudinaryUrlFromLegacyPath(city.img, { width: 1600 })}
                          alt={city.name}
                          loading={index === 0 ? "eager" : "lazy"} // OPTIMIZATION: First slide eager, others lazy
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 pt-20">
                          <h3 className="text-white text-3xl font-bold font-cormorant tracking-tight">{city.name}</h3>
                          <p className="text-[#E5CF6B] text-sm italic font-cormorant mt-1">View Full Story &rarr;</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Right arrow - outside carousel */}
              <button
                className="swiper-button-next-custom flex-shrink-0 ml-3 w-12 h-12 rounded-full bg-stone-800/70 flex items-center justify-center hover:bg-stone-800/90 transition-colors duration-200"
              >
                <img src={RightArrow} alt="Next" className="w-6 h-9 transition-transform duration-200 ease-in-out hover:scale-110" />
              </button>
            </div>
            </motion.section>

            {/* Dynamic narrative - changes with active slide */}
            <motion.div
              className="w-full max-w-[420px] mx-auto flex flex-col justify-center items-center text-center px-6 py-10 bg-white/40 backdrop-blur-md rounded-xl shadow-sm"
              key={activeSlideIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[1.3rem] sm:text-[1.4rem] leading-relaxed font-cormorant text-green-950">
                {narrativeLines[featuredDestinations[activeSlideIndex]?.id]}
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Other Cities Grid */}
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-20">
        <h2 className="text-lg font-bold font-cormorant text-green-800/80 mb-6 text-center uppercase tracking-widest">Explore These Places</h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
        >
          {gridCities.map((city) => (
            <motion.div
              key={city.id}
              variants={fadeScale}
            >
              <Link
                to={city.path}
                className="block w-full bg-green-800/10 border border-green-800/30 text-green-900 backdrop-blur-md rounded-xl py-3 text-center hover:bg-green-800/20 hover:text-green-950 transition duration-300 text-sm font-medium"
                onMouseEnter={() => setHoveredDestId(city.id)}
                onMouseLeave={() => setHoveredDestId(null)}
              >
                {city.name}
              </Link>
            </motion.div>
          ))}
          {/* Add the new São Paulo page */}
          <motion.div
            variants={fadeScale}
          >
            <Link
              to="/brazil/saopaulo"
              className="block w-full bg-[#2e5c31]/10 border border-[#2e5c31]/30 text-[#2e5c31] backdrop-blur-md rounded-xl py-3 text-center hover:bg-[#2e5c31]/20 hover:text-[#1f4a24] transition duration-300 text-sm font-medium"
              onMouseEnter={() => setHoveredDestId("saopaulo")}
              onMouseLeave={() => setHoveredDestId(null)}
            >
              São Paulo
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Map Section - Full width with frayed edges */}
      <motion.div variants={fadeScale} className="w-full flex justify-center relative mt-8 overflow-visible py-8">
        {/* Paper texture background - full bleed with frayed edges */}
        <div
          className="absolute -inset-y-8 w-screen left-1/2 -translate-x-1/2 pointer-events-none z-0"
          style={{
            ...spreadBackgroundStyle,
            filter: "url(#torn-paper-filter)",
          }}
        />
        <div className="relative z-10 w-full max-w-4xl mx-auto overflow-visible px-4">
          <ContextMap
            markers={mapMarkers}
            variant="overview"
            showTitle={false}
            geography={true} // Enable high-contrast ink mode
            transparent={true} // Map floats on the main banner spread
            hoveredId={hoveredDestId}
            activeId={featuredDestinations[activeSlideIndex]?.id}
            onHoverMarker={setHoveredDestId}
          />
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-6 mt-16 mb-12 relative z-10">
        <Link to="/adventures" className="flex flex-row items-center justify-center bg-green-800/10 border border-green-800/30 text-green-900 backdrop-blur-md rounded-xl py-3 px-6 text-center hover:bg-green-800/20 hover:text-green-950 transition duration-300 text-sm font-medium">
          <span className="text-lg mr-2 text-green-900">←</span>
          <span className="text-sm font-medium uppercase tracking-wide">Return To Adventures</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default Brazil;
