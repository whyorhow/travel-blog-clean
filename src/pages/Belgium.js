import React from "react";
import { useNavigate } from "react-router-dom";
import { CountryLandingTemplate } from "./templates";
import BelgiumMap from "../components/BelgiumMap";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import belgiumHeroConfig from "./belgium/belgium.hero.config";


const mapMarkers = [
  { id: "antwerp", name: "Antwerp", x: 800, y: 200, path: "/belgium/antwerp" },
];

function Belgium() {
  const navigate = useNavigate();

  const featureCard = (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={cloudinaryImageUrl(getPublicIdFromLegacyPath("/images/Belgium/Antwerp/Small/Antwerp Cathedral2.webp"), { width: 1200 })}
        alt="Antwerp"
        className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
        onClick={() => navigate("/belgium/antwerp")}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 pt-10">
        <h3 className="text-white text-xl font-bold font-cormorant tracking-tight">Antwerp</h3>
        <p className="text-yellow-400 text-xs italic font-cormorant mt-1">Click to explore</p>
      </div>
    </div>
  );

  return (
    <CountryLandingTemplate
      variant="industrial"
      seo={{
        title: "Belgium: History, Food & Character | Nomad Scribbles",
        description: "Small in size, but rich in character. Belgium blends history, food, and everyday life in a way that feels both grounded and refined. Antwerp sits at the centre of that balance.",
        image: "/images/Adventures/BelgiumFlag.webp",
        slug: "/belgium",
      }}
      heroConfig={belgiumHeroConfig}
      heroPageData={{ title: 'Belgium' }}
      showHeroTitle
      introBridge={{
        headline: "Belgium feels composed rather than constructed.",
        body: "As if everything has found its place over time. You notice it slowly, in details more than landmarks. Antwerp is where that feeling begins.",
      }}
      featureCard={featureCard}
      mapComponent={<BelgiumMap markers={mapMarkers} />}
      quote={{
        text: "Everything we see hides another thing.",
        attribution: "Rene Magritte",
      }}
      returnLink={{ label: "Return to Adventures", path: "/adventures" }}
    />
  );
}

export default Belgium;
