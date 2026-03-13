import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function Adventures() {
  const countries = [
    { name: "Austria", img: "/images/Adventures/AustriaFlag.webp" },
    { name: "Belgium", img: "/images/Adventures/BelgiumFlag.webp" },
    { name: "Brazil", img: "/images/Adventures/BrazilFlag.webp", link: "/brazil" },
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
    { name: "United States", img: "/images/Adventures/USAFlag.webp", link: "/united-states" },
    { name: "Wales", img: "/images/Adventures/WalesFlag.webp" }
  ];

  return (
    <div className="pt-4">
      {/* SEO Component */}
      <SEO
        title="Adventures Around the World | Nomad Scribbles"
        description="Join us on our journeys across the globe — from Europe to Asia and the Americas, explore flags, stories, and adventures with Nomad Scribbles."
        image="/images/Adventures/AdventuresBD.png"
        slug="adventures"
      />


      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">Nomad Scribbles | Adventures Around the World</h1>

      {/* Page Title */}
      <div className="flex justify-center mb-4">
        <img
          src={process.env.PUBLIC_URL + "/images/Adventures/Adventures.png"}
          alt="Adventures"
          className="w-[250px] sm:w-[300px] md:w-[400px] h-auto rounded-lg shadow-lg p-4"
        />
      </div>

      {/* Main Content */}
      <main className="px-2 py-0 max-w-screen-lg mx-auto text-center text-[#eeda8d] space-y-0">
        <p className="text-lg sm:text-xl md:text-2xl font-cormorant italic leading-relaxed tracking-wide">
          Explore the places we’ve journeyed through, each flag opening a window into new stories and adventures.
        </p>

        {/*
  <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
    From bustling cities to quiet villages, follow along as we share moments of culture, nature, and everyday discovery.
  </p>

  <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
    Every adventure is a story, and every story is a memory — welcome to Nomad Scribbles.
  </p>
        {/* Country Flags */}
        {/* Current Destination Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-16 max-w-4xl mx-auto">
          {countries.filter(c => c.link).map((country, index) => (
            <Link
              key={index}
              to={country.link}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#eeda8d]/20 transition-all duration-500 hover:scale-[1.02]"
            >
              <img
                src={process.env.PUBLIC_URL + country.img}
                alt={`Explore ${country.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-4xl md:text-5xl font-handwriting drop-shadow-lg mb-2">{country.name}</h2>
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#eeda8d]">Explore Stories</span>
              </div>
            </Link>
          ))}
        </div>

        <h3 className="text-sm uppercase tracking-widest text-[#eeda8d]/40 mb-8">Future Destinations</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 opacity-40">
          {countries.filter(c => !c.link).map((country, index) => (
            <div key={index} className="flex flex-col items-center gap-2 grayscale brightness-75">
              <div className="w-full aspect-[3/2] rounded overflow-hidden">
                <img src={process.env.PUBLIC_URL + country.img} alt={country.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] uppercase tracking-tighter">{country.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 mt-16 mb-12 relative z-10">
          <Link to="/" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
            <span className="text-xl mr-3 pb-1">←</span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Adventures;
