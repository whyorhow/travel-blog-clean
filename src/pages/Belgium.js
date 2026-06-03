import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { CountryLandingTemplate } from "./templates";
import BelgiumMap from "../components/BelgiumMap";
import CountryFeatureCard from "../components/CountryFeatureCard";
import belgiumHeroConfig from "./belgium/belgium.hero.config";
import { getHubNote } from "../config/regionScope";

const mapMarkers = [
  { id: "antwerp", name: "Antwerp", x: 800, y: 200, path: "/belgium/antwerp" },
];

function Belgium() {
  const featureCard = (
    <CountryFeatureCard
      to="/belgium/antwerp"
      legacyPath="/images/Belgium/Antwerp/Small/Antwerp Cathedral2.webp"
      title="Antwerp"
    />
  );

  return (
    <CountryLandingTemplate
      variant="industrial"
      seo={{
        title: SEO_TITLES["/belgium"],
        description: "Small in size, but rich in character. Belgium blends history, food, and everyday life in a way that feels both grounded and refined. Antwerp sits at the centre of that balance.",
        image: "/images/Adventures/BelgiumFlag.webp",
        slug: "/belgium",
      }}
      heroConfig={belgiumHeroConfig}
      heroPageData={{ title: 'Belgium' }}
      showHeroTitle
      scopeNote={getHubNote("/belgium")}
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
      returnLink={{ label: "Return to Adventures", path: "/" }}
    />
  );
}

export default Belgium;
