import React from "react";
import { CountryLandingTemplate } from "./templates";
import CountryFeatureCard from "../components/CountryFeatureCard";
import greeceMap from "../assets/images/Greece-Map.svg";
import greeceHeroConfig from "./greece/greece.hero.config";

function Greece() {
  const featureCard = (
    <CountryFeatureCard
      to="/greece/athens"
      legacyPath="/images/Greece/Athens/Small/Tragopogon Flower.webp"
      title="Athens"
      subtitle="Enter the city"
      rounded="xl"
    />
  );

  const mapEl = (
    <img
      src={greeceMap}
      alt="Map of Greece"
      className="h-auto w-full"
      width={800}
      height={600}
    />
  );

  return (
    <CountryLandingTemplate
      variant="mediterranean"
      seo={{
        title: "Greece Travel Guide: History, Athens & Mediterranean Culture",
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
