import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { CountryLandingTemplate } from "./templates";
import GermanyMap from "../components/GermanyMap";
import germanyHeroConfig from "./germany/germany.hero.config";
import { hasGermanyStaticHero, isMobileViewport } from "../utils/staticPageHero";
import { getHubNote } from "../config/regionScope";

const mapMarkers = [
  { id: "berlin", name: "Berlin", x: 242, y: 113, path: "/germany/berlin" },
];

const featuredDestinations = [
  {
    id: "berlin",
    name: "Berlin",
    img: "Germany/Berlin/Small/Berlin 40",
    path: "/germany/berlin",
  },
];

const narrativeLines = {
  berlin:
    "The Reichstag dome spirals above the city while the East Side Gallery sits quiet along the Spree. History layers itself differently on every street.",
};

const gridCities = featuredDestinations.map(({ id, name, path }) => ({ id, name, path }));

function Germany() {
  return (
    <CountryLandingTemplate
      variant="continental"
      countryKey="germany"
      seo={{
        title: SEO_TITLES["/germany"],
        description:
          "Fragments of Germany — Berlin's layered history, river walks, and the everyday moments between monuments.",
        image: "/images/Germany/Berlin/Small/Berlin 1.webp",
        slug: "/germany",
      }}
      heroConfig={germanyHeroConfig}
      skipHero={hasGermanyStaticHero() && isMobileViewport()}
      heroPageData={{ title: "Germany" }}
      showHeroTitle
      scopeNote={getHubNote("/germany")}
      introBridge={{
        headline: "Berlin — one city, many histories, and the streets where they still meet.",
      }}
      journeyTitle="A single city on the map so far. Berlin stretches across its own history — from the Reichstag dome to the quiet banks of the Spree."
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapMarkers={mapMarkers}
      mapComponent={<GermanyMap markers={mapMarkers} />}
      gridCities={gridCities}
      gridSectionTitle="Where the Path Leads Next"
      returnLink={{ label: "Explore Other Horizons", path: "/" }}
    />
  );
}

export default Germany;