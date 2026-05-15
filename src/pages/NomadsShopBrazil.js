import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import products from "../assets/artImages.json"; // FIX
import LeftArrow from "../assets/images/lftarrow.svg"; // FIX
import RightArrow from "../assets/images/rtarrow.svg"; // FIX
import BrazilFlag from "../assets/images/BrazilFlag.svg"; // FIX
import { trackEvent } from "../utils/analytics"; // FIX
import { cloudinaryImageUrl } from "../utils/cloudinary";

export default function NomadsShopBrazil() {
  const flagRef = useRef(null);
  const swiperRef = useRef(null);
  const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";

  const cities = [
    { name: "Rio de Janeiro", path: "/nomads-shop/brazil/rio" },
    { name: "São Paulo", path: "/nomads-shop/brazil/saopaulo" },
    { name: "Salvador", path: "/nomads-shop/brazil/salvador" },
    { name: "Foz do Iguaçu", path: "/nomads-shop/brazil/foz" },
    { name: "The Pantanal", path: "/nomads-shop/brazil/pantanal" },
    { name: "Bonito", path: "/nomads-shop/brazil/bonito" },
    { name: "Manaus", path: "/nomads-shop/brazil/manaus" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (flagRef.current) {
        const offset = Math.min(window.scrollY * 0.2, 100);
        flagRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [featuredItems, setFeaturedItems] = React.useState([]);

  useEffect(() => {
    // Categories to include in the random selection
    const allowedCategories = ["Rio", "Salvador", "Pantanal", "City Life", "Parks", "Murals", "Santos", "Carnival", "Museums"];

    // Filter products by allowed categories
    const brazilProducts = products.filter(p => allowedCategories.includes(p.category));

    // Shuffle and pick a few items (e.g., 15)
    const shuffled = [...brazilProducts].sort(() => 0.5 - Math.random());
    setFeaturedItems(shuffled.slice(0, 15));
  }, []);

  return (
    <div className="relative pb-24 sm:pb-32">
      <SEO
        title="Brazil Collection | Nomads Shop"
        description="Explore our curated collection of art and prints from across Brazil."
        image="/images/Adventures/BrazilFlag.webp"
        slug="nomads-shop/brazil"
      />

      {/* Page Title */}
      <div className="flex flex-col items-center mb-12 relative z-10 mt-20 sm:mt-8">
        <img
          src="/assets/NomadsShopTitle.webp"
          alt="NomadsShop Title"
          className="w-1/2 max-w-[8rem] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg"
          loading="lazy"
        />
        <h1 className="text-center text-xs sm:text-lg font-bold mt-2 text-[#eeda8d] drop-shadow-md opacity-80">
          click a city below to explore our collections.
        </h1>
      </div>

      {/* Flag + Carousel */}
      <div className="relative flex justify-center mb-32 sm:mb-12">
        <img
          ref={flagRef}
          src={BrazilFlag}
          alt="Brazil flag"
          className="w-[82%] sm:w-[85%] md:w-[80%] lg:w-[75%] h-auto rounded-lg shadow-lg"
          loading="lazy"
        />

        <div className="absolute inset-0 flex justify-center items-center w-[82%] sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {featuredItems.map((item, idx) => (
              <SwiperSlide key={`${item.id}-${idx}`}>
                <div className="flex flex-col items-center bg-transparent rounded-lg p-2">
                  <img
                    src={cloudinaryImageUrl(item.cloudinary?.blog, { width: 800 })}
                    alt={item.title}
                    className="w-full h-auto max-h-[220px] sm:max-h-[400px] md:max-h-[640px] object-contain rounded-lg"
                    loading="lazy"
                  />
                  <h2 className="mt-2 text-xl font-semibold text-white drop-shadow-md text-center">
                    {item.title}
                  </h2>
                  <a
                    href={item.gumroadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                    onClick={() => {
                      if (cookiesAccepted) {
                        trackEvent("purchase_click", "Shop Carousel", item.title);
                      }
                    }}
                  >
                    Purchase
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/2 left-[-2.5rem] transform -translate-y-1/2 z-10"
          >
            <img
              src={LeftArrow}
              alt="Previous"
              className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150"
              loading="lazy"
            />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/2 right-[-2.5rem] transform -translate-y-1/2 z-10"
          >
            <img
              src={RightArrow}
              alt="Next"
              className="w-8 h-12 transition-transform duration-200 ease-in-out hover:scale-125 hover:brightness-150"
              loading="lazy"
            />
          </button>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              to={city.path}
              className="flex justify-center items-center px-4 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg shadow-md border border-white/20 text-center transform transition duration-200 hover:bg-white/20 hover:scale-105 hover:shadow-lg"
              onClick={() => {
                if (cookiesAccepted) {
                  trackEvent("city_navigation", "Shop Brazil", city.name);
                }
              }}
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
        <Link to="/nomads-shop" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Shop</span>
        </Link>
      </div>
    </div>
  );
}
