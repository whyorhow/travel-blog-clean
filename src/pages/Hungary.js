import React from "react";
import { useNavigate } from "react-router-dom";
import { CountryLandingTemplate } from "./templates";
import HungaryMap from "../components/HungaryMap";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import hungaryHeroConfig from "./hungary/hungary.hero.config";

const mapMarkers = [
  { id: "budapest", name: "Budapest", x: 400, y: 300, path: "/hungary/budapest" },
];

function Hungary() {
  const navigate = useNavigate();

  const featureCard = (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={cloudinaryImageUrl(getPublicIdFromLegacyPath("/images/Hungary/Budapest/Small/Outside Szechenyi Baths.webp"), { width: 1200 })}
        alt="Budapest"
        className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
        onClick={() => navigate("/hungary/budapest")}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 pt-10">
        <h3 className="text-white text-xl font-bold font-cormorant tracking-tight">Budapest</h3>
        <p className="text-yellow-400 text-xs italic font-cormorant mt-1">Click to explore</p>
      </div>
    </div>
  );

  return (
    <CountryLandingTemplate
      variant="continental"
      seo={{
        title: "Hungary Travel Guide: Budapest Architecture, Baths & Danube Life",
        description: "A land where history meets modernity. Hungary offers a unique blend of grand architecture, thermal baths, and vibrant culture. Budapest stands as the jewel in this Central European crown.",
        image: "/images/Adventures/HungaryFlag.webp",
        slug: "/hungary",
      }}
      heroConfig={hungaryHeroConfig}
      heroPageData={{ title: 'Hungary' }}
      showHeroTitle
      introBridge={{
        headline: "Hungary feels like a story that's still being written.",
        body: "Where imperial grandeur meets everyday life. Budapest is where this narrative unfolds most beautifully, along the Danube's gentle curve.",
      }}
      featureCard={featureCard}
      mapComponent={<HungaryMap markers={mapMarkers} />}
      quote={{
        text: "Budapest is a pearl of the Danube.",
        attribution: "Franz Liszt",
      }}
      returnLink={{ label: "Return to Adventures", path: "/" }}
    />
  );
}

export default Hungary;
