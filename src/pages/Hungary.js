import React from "react";
import { useNavigate } from "react-router-dom";
import { CountryLandingTemplate } from "./templates";
import CountryIntro from "../components/CountryIntro";
import HungaryMap from "../components/HungaryMap";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import hungaryTitle from "../assets/images/Hungary Title.webp";

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
        title: "Hungary: History, Culture & Architecture | Nomad Scribbles",
        description: "A land where history meets modernity. Hungary offers a unique blend of grand architecture, thermal baths, and vibrant culture. Budapest stands as the jewel in this Central European crown.",
        image: "/images/Adventures/HungaryFlag.webp",
        slug: "/hungary",
      }}
      fallbackHeroImage="Hungary/Hungary-backup"
      heroPageData={{ title: 'Hungary' }}
      heroSlot={
        <CountryIntro
          title="Hungary"
          titleImage={hungaryTitle}
          heroImage="/images/Hungary/Budapest/Small/Szechenyi Thermal Baths.webp"
          heroAlt="Szechenyi Thermal Baths"
          intro="Hungary feels like a story that's still being written — where imperial grandeur meets everyday life. Budapest is where this narrative unfolds most beautifully, along the Danube's gentle curve."
          guideLine="Begin in Budapest, and let the city guide you."
        />
      }
      featureCard={featureCard}
      mapComponent={<HungaryMap markers={mapMarkers} />}
      quote={{
        text: "Budapest is a pearl of the Danube.",
        attribution: "Franz Liszt",
      }}
      returnLink={{ label: "Return to Adventures", path: "/adventures" }}
    />
  );
}

export default Hungary;
