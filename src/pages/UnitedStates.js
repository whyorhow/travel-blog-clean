import React from "react";
import { CountryLandingTemplate } from "./templates";
import USAMap from "../components/USAMap";
import CountryFeatureCard from "../components/CountryFeatureCard";
import usaHeroConfig from "./united-states/usa.hero.config";

function UnitedStates() {
  const featureCard = (
    <CountryFeatureCard
      to="/united-states/tennessee"
      legacyPath="/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp"
      title="Tennessee"
    />
  );

  return (
    <CountryLandingTemplate
      variant="continental"
      seo={{
        title: "United States Travel Guide: Regions, Roads & American Journeys",
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
      featureCard={featureCard}
      mapComponent={<USAMap markers={[]} />}
      returnLink={{ label: "Back to Adventures", path: "/" }}
    />
  );
}

export default UnitedStates;
