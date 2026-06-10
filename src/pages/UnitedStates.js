import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { CountryLandingTemplate } from "./templates";
import USAMap from "../components/USAMap";
import CountryFeatureCard from "../components/CountryFeatureCard";
import usaHeroConfig from "./united-states/usa.hero.config";
import { getHubNote } from "../config/regionScope";
import { hasUnitedStatesStaticHero, isMobileViewport } from "../utils/staticPageHero";

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
        title: SEO_TITLES["/united-states"],
        description: "Explore the diverse landscapes of the United States — starting with the misty peaks and musical rhythms of Tennessee.",
        image: "/images/Adventures/USAFlag.webp",
        slug: "/united-states",
      }}
      heroConfig={usaHeroConfig}
      skipHero={hasUnitedStatesStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'United States' }}
      showHeroTitle={!(hasUnitedStatesStaticHero() && isMobileViewport())}
      scopeNote={getHubNote("/united-states")}
      introBridge={{
        headline: "The scale of it takes time to understand.",
        body: "Every state holds a different register — different landscape, different pace, different sound. Tennessee is complete on the site; the wider United States archive will grow state by state from there.",
      }}
      featureCard={featureCard}
      mapComponent={<USAMap markers={[]} />}
      returnLink={{ label: "Back to Adventures", path: "/" }}
    />
  );
}

export default UnitedStates;
