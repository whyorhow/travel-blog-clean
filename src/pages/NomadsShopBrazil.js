import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import SEO from "../components/SEO";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import products from "../assets/artImages/slices/bundles/shop-brazil.json";

import LeftArrow from "../assets/images/lftarrow.svg";

import RightArrow from "../assets/images/rtarrow.svg";

import { trackEvent } from "../utils/analytics";

import { cloudinaryImageUrl, cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";

import ShopPageHeader from "../components/shop/ShopPageHeader";
import { shopTheme } from "../components/shop/shopTheme";



import "../styles/swiper";



const brazilFlagSrc = cloudinaryUrlFromLegacyPath("/images/Adventures/BrazilFlag.webp", { width: 800 });



export default function NomadsShopBrazil() {

  const swiperRef = useRef(null);

  const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";

  const [featuredItems, setFeaturedItems] = useState([]);



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

    const shuffled = [...products].sort(() => 0.5 - Math.random());

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



      <ShopPageHeader

        title="Brazil Collection"

        subtitle="Browse featured work below, then choose a city to explore the full collection."

        className="mb-10"

      />



      {/* Featured carousel — self-contained, does not overlap header */}

      {featuredItems.length > 0 && (

        <section

          className="relative z-0 max-w-3xl mx-auto px-4 sm:px-6 mb-12"

          aria-label="Featured prints from Brazil"

        >

          <div className={`${shopTheme.panel} ${shopTheme.panelInner}`}>

            <Swiper

              modules={[Autoplay]}

              onSwiper={(swiper) => {

                swiperRef.current = swiper;

              }}

              spaceBetween={16}

              slidesPerView={1}

              loop={featuredItems.length > 1}

              autoplay={{ delay: 4000, disableOnInteraction: false }}

            >

              {featuredItems.map((item, idx) => (

                <SwiperSlide key={`${item.id}-${idx}`}>

                  <div className="flex flex-col items-center gap-3">

                    <img

                      src={cloudinaryImageUrl(item.cloudinary?.blog, { width: 900 })}

                      alt={item.title}

                      className="w-full h-auto max-h-[50vh] sm:max-h-[420px] object-contain rounded-lg"

                      loading="lazy"

                    />

                    <h2 className={shopTheme.itemTitle}>

                      {item.title}

                    </h2>

                    {item.gumroadLink && (

                      <a

                        href={item.gumroadLink}

                        target="_blank"

                        rel="noopener noreferrer"

                        className={shopTheme.cta}

                        onClick={() => {

                          if (cookiesAccepted) {

                            trackEvent("purchase_click", "Shop Carousel", item.title);

                          }

                        }}

                      >

                        Purchase

                      </a>

                    )}

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>



            {featuredItems.length > 1 && (

              <>

                <button

                  type="button"

                  onClick={() => swiperRef.current?.slidePrev()}

                  className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 z-10 p-1"

                  aria-label="Previous featured print"

                >

                  <img

                    src={LeftArrow}

                    alt=""

                    className="w-7 h-10 sm:w-8 sm:h-12 opacity-90 hover:opacity-100 transition-opacity"

                    loading="lazy"

                  />

                </button>

                <button

                  type="button"

                  onClick={() => swiperRef.current?.slideNext()}

                  className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 z-10 p-1"

                  aria-label="Next featured print"

                >

                  <img

                    src={RightArrow}

                    alt=""

                    className="w-7 h-10 sm:w-8 sm:h-12 opacity-90 hover:opacity-100 transition-opacity"

                    loading="lazy"

                  />

                </button>

              </>

            )}

          </div>

        </section>

      )}



      {/* Brazil flag — decorative, below carousel */}

      <div className="flex justify-center px-4 mb-10">

        <img

          src={brazilFlagSrc}

          alt=""

          role="presentation"

          className="w-full max-w-xs sm:max-w-sm h-auto rounded-lg shadow-md opacity-90"

          loading="lazy"

        />

      </div>



      {/* City collections */}

      <section className="max-w-4xl mx-auto mb-10 px-4" aria-labelledby="brazil-cities-heading">

        <h2 id="brazil-cities-heading" className={shopTheme.sectionLabel}>

          Choose a city

        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

          {cities.map((city) => (

            <Link

              key={city.name}

              to={city.path}

              className={shopTheme.cityCard}

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

      </section>



      <div className="flex flex-col items-center gap-6 mb-12 relative z-10 px-4">

        <Link to="/nomads-shop" className={shopTheme.returnLink}>

          <span className="text-xl mr-3 pb-1">←</span>

          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">

            Return to Shop

          </span>

        </Link>

      </div>

    </div>

  );

}


