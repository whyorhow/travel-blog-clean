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
    <div className="flex w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] flex-col items-center gap-5">
      <CountryFeatureCard
        to="/united-states/tennessee"
        legacyPath="/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp"
        title="Tennessee"
        subtitle=""
      />
      <p className="max-w-sm text-center font-cormorant text-[1.1rem] sm:text-[1.2rem] leading-relaxed text-stone-700 px-2">
        Memphis along the Mississippi River, Nashville&apos;s city streets, and the Smoky Mountains where roads climb into forest and ridge.
      </p>
    </div>
  );

  return (
    <CountryLandingTemplate
      variant="continental"
      seo={{
        title: SEO_TITLES["/united-states"],
        description:
          "Tennessee's mountains, cities, and river routes — the first completed section of the United States archive.",
        image: "/images/Adventures/USAFlag.webp",
        slug: "/united-states",
      }}
      heroConfig={usaHeroConfig}
      skipHero={hasUnitedStatesStaticHero() && isMobileViewport()}
      heroPageData={{ title: "United States" }}
      showHeroTitle={!(hasUnitedStatesStaticHero() && isMobileViewport())}
      scopeNote={getHubNote("/united-states")}
      introBridge={{
        paragraphs: [
          "The United States stretches across long distances between cities, highways, rivers, and mountain ranges.",
          "Travel here moves along roads that pass through forest, open land, and built-up areas that sit far apart from each other. Tennessee is the first completed section, covering river cities, music routes, and forested mountains.",
        ],
      }}
      featureCard={featureCard}
      mapComponent={<USAMap markers={[]} />}
      returnLink={{ label: "Back to Adventures", path: "/" }}
    />
  );
}

export default UnitedStates;
