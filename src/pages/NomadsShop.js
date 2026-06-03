import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import ShopPageHeader from "../components/shop/ShopPageHeader";
import { shopTheme } from "../components/shop/shopTheme";

export default function NomadsShop() {
  const countries = [
    { name: "Austria", img: cloudinaryUrlFromLegacyPath("/images/Adventures/AustriaFlag.webp", { width: 400 }) },
    { name: "Belgium", img: cloudinaryUrlFromLegacyPath("/images/Adventures/BelgiumFlag.webp", { width: 400 }) },
    { name: "Brazil", img: cloudinaryUrlFromLegacyPath("/images/Adventures/BrazilFlag.webp", { width: 400 }), link: "/nomads-shop/brazil" },
    { name: "Czech Republic", img: cloudinaryUrlFromLegacyPath("/images/Adventures/CzechFlag.webp", { width: 400 }) },
    { name: "England", img: cloudinaryUrlFromLegacyPath("/images/Adventures/EnglandFlag.webp", { width: 400 }) },
    { name: "France", img: cloudinaryUrlFromLegacyPath("/images/Adventures/FranceFlag.webp", { width: 400 }) },
    { name: "Germany", img: cloudinaryUrlFromLegacyPath("/images/Adventures/GermanyFlag.webp", { width: 400 }) },
    { name: "Greece", img: cloudinaryUrlFromLegacyPath("/images/Adventures/GreeceFlag.webp", { width: 400 }) },
    { name: "Hungary", img: cloudinaryUrlFromLegacyPath("/images/Adventures/HungaryFlag.webp", { width: 400 }) },
    { name: "India", img: cloudinaryUrlFromLegacyPath("/images/Adventures/IndiaFlag.webp", { width: 400 }) },
    { name: "Italy", img: cloudinaryUrlFromLegacyPath("/images/Adventures/ItalyFlag.webp", { width: 400 }) },
    { name: "Scotland", img: cloudinaryUrlFromLegacyPath("/images/Adventures/ScotlandFlag.webp", { width: 400 }) },
    { name: "Switzerland", img: cloudinaryUrlFromLegacyPath("/images/Adventures/SwissFlag.webp", { width: 400 }) },
    { name: "Thailand", img: cloudinaryUrlFromLegacyPath("/images/Adventures/ThaiFlag.webp", { width: 400 }) },
    { name: "United States", img: cloudinaryUrlFromLegacyPath("/images/Adventures/USAFlag.webp", { width: 400 }) },
    { name: "Wales", img: cloudinaryUrlFromLegacyPath("/images/Adventures/WalesFlag.webp", { width: 400 }) },
  ];

  const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";

  return (
    <div className="relative">
      <SEO
        title="Nomads Shop | Nomad Scribbles"
        description="Explore our curated collections of travel stories, sketches, and adventures from around the world."
        image={cloudinaryUrlFromLegacyPath("/images/Adventures/AdventuresBD.webp", { width: 1200 })}
        slug="nomads-shop"
      />

      <ShopPageHeader subtitle="Brazil is open now. More countries are on the way." />

      <div className="max-w-screen-lg mx-auto px-4 py-4">
        <p className={`${shopTheme.sectionLabel} normal-case tracking-normal mb-4`}>
          Choose a country
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {countries.map((country, index) => {
            const isActive = !!country.link;

            if (isActive) {
              return (
                <Link
                  key={index}
                  to={country.link}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    if (cookiesAccepted) {
                      trackEvent("shop_country_click", "Navigation", country.name);
                    }
                  }}
                >
                  <div className={`aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg ${shopTheme.flagRing}`}>
                    <img
                      src={country.img}
                      alt={`${country.name} flag`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className={shopTheme.flagOverlayActive}>
                      <span>{country.name}</span>
                      <span className="text-sm mt-1 opacity-90">Shop now</span>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={index}
                className="relative cursor-default"
                aria-disabled="true"
                title={`${country.name} — coming soon`}
              >
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-md opacity-55 grayscale-[0.35]">
                  <img
                    src={country.img}
                    alt={`${country.name} — coming soon`}
                    className="w-full h-full object-cover"
                  />
                  <div className={shopTheme.flagOverlaySoon}>
                    <span className="text-base font-semibold">{country.name}</span>
                    <span className="text-xs mt-1 uppercase tracking-wider opacity-90">Coming soon</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12 mt-8 relative z-10 px-4">
        <Link to="/" className={shopTheme.returnLink}>
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">
            Return Home
          </span>
        </Link>
      </div>
    </div>
  );
}
