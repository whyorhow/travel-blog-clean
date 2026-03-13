import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";

export default function NomadsShop() {
  const countries = [
    { name: "Austria", img: "/images/Adventures/AustriaFlag.webp" },
    { name: "Belgium", img: "/images/Adventures/BelgiumFlag.webp" },
    { name: "Brazil", img: "/images/Adventures/BrazilFlag.webp", link: "/nomads-shop/brazil" },
    { name: "Czech Republic", img: "/images/Adventures/CzechFlag.webp" },
    { name: "England", img: "/images/Adventures/EnglandFlag.webp" },
    { name: "France", img: "/images/Adventures/FranceFlag.webp" },
    { name: "Germany", img: "/images/Adventures/GermanyFlag.webp" },
    { name: "Greece", img: "/images/Adventures/GreeceFlag.webp" },
    { name: "Hungary", img: "/images/Adventures/HungaryFlag.webp" },
    { name: "India", img: "/images/Adventures/IndiaFlag.webp" },
    { name: "Italy", img: "/images/Adventures/ItalyFlag.webp" },
    { name: "Scotland", img: "/images/Adventures/ScotlandFlag.webp" },
    { name: "Switzerland", img: "/images/Adventures/SwissFlag.webp" },
    { name: "Thailand", img: "/images/Adventures/ThaiFlag.webp" },
    { name: "United States", img: "/images/Adventures/USAFlag.webp" },
    { name: "Wales", img: "/images/Adventures/WalesFlag.webp" }
  ];

  const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";

  return (
    <div className="relative">
      {/* SEO */}
      <SEO
        title="Nomads Shop | Nomad Scribbles"
        description="Explore our curated collections of travel stories, sketches, and adventures from around the world."
        image="/images/Adventures/AdventuresBD.webp"
        slug="nomads-shop"
      />


      {/* Hero / Title */}
      <div className="flex flex-col items-center mb-8 relative z-10 mt-14 sm:mt-8">
        <div className="flex justify-center mb-4 px-4">
          <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-darkText tracking-tight text-center">Nomads Shop</h1>
        </div>
        {/* Instruction heading */}
        <h1 className="text-center text-xs sm:text-lg font-bold mt-2 text-[#eeda8d] drop-shadow-md opacity-80">
          click a country below to explore our collections.
        </h1>
      </div>

      {/* Country Flags Grid */}
      <div className="max-w-screen-lg mx-auto px-4 py-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {countries.map((country, index) => {
            const isLink = !!country.link;
            const Wrapper = isLink ? Link : "div";

            return (
              <Wrapper
                key={index}
                to={country.link || "#"}
                className="relative group cursor-pointer"
                onClick={() => {
                  if (cookiesAccepted && country.link) {
                    trackEvent("shop_country_click", "Navigation", country.name);
                  }
                }}
              >
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={country.img}
                    alt={`${country.name} flag`}
                    className={`w-full h-full object-cover transition-transform duration-200 ${isLink ? "group-hover:scale-105" : ""}`}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <span>{country.name}</span>
                    {!isLink && <span className="text-sm mt-1 opacity-80">Coming Soon</span>}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12 mt-8 relative z-10">
        <Link to="/" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return Home</span>
        </Link>
      </div>
    </div>
  );
}
