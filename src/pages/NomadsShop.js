import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import { tokens, tw } from "../styles";
import {
  LocationHero,
  IntroGrid,
  BridgeQuote,
  ReflectiveClose
} from "../components/layout";

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
      <SEO
        title="Nomads Shop | Nomad Scribbles"
        description="Explore our curated collections of travel stories, sketches, and adventures from around the world."
        image={cloudinaryUrlFromLegacyPath("/images/Adventures/AdventuresBD.webp", { width: 1200 })}
        slug="nomads-shop"
      />

      {/* Hero Section */}
      <LocationHero
        imageSrc={cloudinaryUrlFromLegacyPath("/images/Adventures/AdventuresBD.webp", { width: 1600 })}
        alt="Nomads Shop Sketches and Adventures"
        overlayOpacity={40}
      />

      <div className="relative z-10 -mt-24 mb-12">
        <div className="flex justify-center">
            <h1 className="text-6xl md:text-8xl font-bold font-handwriting text-[#B8860B] drop-shadow-2xl">
                Nomads Shop
            </h1>
        </div>
      </div>

      {/* Narrative Intro */}
      <IntroGrid
        title="Artifacts of Travel"
        variant="paper"
        paragraphs={[
          "The shop is an extension of the journey. Every sketch, every photograph, and every fragment of a story gathered here is an artifact of a moment spent somewhere else.",
          "We don't just curate prints; we curate memories of the textures, the light, and the quiet rhythms of the places we've wandered through. These collections are meant to bring a piece of that world into yours.",
          "Click a country below to explore its specific collection of stories and sketches."
        ]}
        sidebarImage={{
          src: "/images/Adventures/AdventuresBD.webp",
          alt: "Street level sketches",
          caption: "Capturing the layered rhythms of the street."
        }}
      />

      <BridgeQuote
        quote="A collection is never finished; it only pauses before the next destination."
        useHandwriting={true}
        variant="paper"
      />

      {/* Country Selection Grid */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <h2 className={`text-2xl font-semibold ${tw.surface.paper.accentHeading} mb-8 uppercase tracking-widest`}>
          Explore Collections
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                <div className={`aspect-[4/3] w-full overflow-hidden ${tw.image} ${isLink ? "hover:shadow-xl transition-shadow duration-300" : "opacity-60"}`}>
                  <img
                    src={cloudinaryUrlFromLegacyPath(country.img, { width: 400 })}
                    alt={`${country.name} flag`}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isLink ? "group-hover:scale-110" : ""}`}
                  />

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}>
                    <span className="text-lg font-semibold tracking-wide">{country.name}</span>
                    {!isLink && <span className="text-xs mt-1 opacity-80 uppercase tracking-tighter">Coming Soon</span>}
                  </div>
                </div>
                <p className={`mt-2 text-center text-sm font-medium ${tw.surface.paper.muted} group-hover:text-[#B8860B] transition-colors`}>
                  {country.name}
                </p>
              </Wrapper>
            );
          })}
        </div>
      </section>

      <ReflectiveClose
        text="Every print holds a piece of the horizon."
        variant="paper"
      />

      <div className="flex flex-col items-center gap-6 mb-24 mt-12 relative z-10">
        <Link to="/" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return Home</span>
        </Link>
      </div>
    </div>
  );
}
