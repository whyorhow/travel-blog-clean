import React from "react";
import { useNavigate } from "react-router-dom";
import { CountryLandingTemplate } from "./templates";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import greeceMap from "../assets/images/Greece-Map.svg";
import greeceHeroConfig from "./greece/greece.hero.config";

function Greece() {
  const navigate = useNavigate();

  const featureCard = (
    <div
      className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-xl cursor-pointer group"
      onClick={() => navigate("/greece/athens")}
    >
      <img
        src={cloudinaryImageUrl(getPublicIdFromLegacyPath("/images/Greece/Athens/Small/Tragopogon Flower.webp"), { width: 1000 })}
        alt="Athens"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
        <div>
          <h3 className="text-white text-2xl font-cormorant">Athens</h3>
          <p className="text-yellow-400 text-xs italic mt-1">Enter the city</p>
        </div>
      </div>
    </div>
  );

  const mapEl = (
    <img
      src={greeceMap}
      alt="Map of Greece"
      className="w-full h-auto"
    />
  );

  return (
    <CountryLandingTemplate
      variant="mediterranean"
      seo={{
        title: "Greece | Nomad Scribbles",
        description: "Greece unfolds slowly — through history, movement, and everyday rituals. Begin in Athens, then follow the thread.",
        image: "/images/Greece/Athens/Small/Acropolis Hill.webp",
        slug: "/greece",
      }}
      heroConfig={greeceHeroConfig}
      heroPageData={{ title: 'Greece' }}
      showHeroTitle
      introBridge={{
        headline: "History doesn't sit behind glass here.",
        body: "It moves with you. It appears between streets, above rooftops, and in places you're not expecting. Athens is where that presence becomes impossible to ignore.",
      }}
      featureCard={featureCard}
      mapComponent={mapEl}
      returnLink={{ label: "All Adventures", path: "/" }}
    />
  );
}

export default Greece;
