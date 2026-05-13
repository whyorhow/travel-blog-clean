import React from "react";
import { useNavigate } from "react-router-dom";
import { CountryLandingTemplate } from "./templates";
import USAMap from "../components/USAMap";
import destinations from "../assets/destinations.json";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import usaHeroConfig from "./united-states/usa.hero.config";

const featuredDestinations = [
  { id: "tennessee", name: "Tennessee", img: "/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp", path: "/united-states/tennessee" },
];

const narrativeLines = {
  tennessee: "From the blue-grey ridges of the Smokies to the neon stages of Nashville — Tennessee holds more than one story.",
};

function UnitedStates() {
  const navigate = useNavigate();
  const usDestinations = destinations.filter(d => d.country === 'USA');
  const gridCities = usDestinations.filter(d => d.active);

  const featureCard = (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={cloudinaryImageUrl(getPublicIdFromLegacyPath("/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp"), { width: 1200 })}
        alt="Tennessee"
        className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
        onClick={() => navigate("/united-states/tennessee")}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 pt-10">
        <h3 className="text-white text-xl font-bold font-cormorant tracking-tight">Tennessee</h3>
        <p className="text-yellow-400 text-xs italic font-cormorant mt-1">Click to explore</p>
      </div>
    </div>
  );

  return (
    <CountryLandingTemplate
      variant="continental"
      seo={{
        title: "Travel Adventures in the United States | Nomad Scribbles",
        description: "Explore the diverse landscapes of the United States — starting with the misty peaks and musical rhythms of Tennessee.",
        image: "/images/Adventures/USAFlag.webp",
        slug: "/united-states",
      }}
      heroConfig={usaHeroConfig}
      heroPageData={{ title: 'United States' }}
      showHeroTitle
      introBridge={{
        headline: "The scale of it takes time to understand.",
        body: "Every state holds a different register — different landscape, different pace, different sound. We started in Tennessee, and it set the tone for everything that followed.",
      }}
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      featureCard={featureCard}
      mapComponent={<USAMap markers={[]} />}
      gridCities={gridCities}
      returnLink={{ label: "Back to Adventures", path: "/adventures" }}
    />
  );
}

export default UnitedStates;
