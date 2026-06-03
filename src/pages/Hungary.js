import React from "react";
import { CountryLandingTemplate } from "./templates";
import HungaryMap from "../components/HungaryMap";
import CountryFeatureCard from "../components/CountryFeatureCard";
import hungaryHeroConfig from "./hungary/hungary.hero.config";

const mapMarkers = [
  { id: "budapest", name: "Budapest", x: 400, y: 300, path: "/hungary/budapest" },
];

function Hungary() {
  const featureCard = (
    <CountryFeatureCard
      to="/hungary/budapest"
      legacyPath="/images/Hungary/Budapest/Small/Outside Szechenyi Baths.webp"
      title="Budapest"
    />
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
      returnLink={{ label: "Return to Adventures", path: "/" }}
    />
  );
}

export default Hungary;
