import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { CountryLandingTemplate } from "./templates";
import GermanyMap from "../components/GermanyMap";
import germanyHeroConfig from "./germany/germany.hero.config";
import {
  hasGermanyStaticHero,
  isMobileViewport,
} from "../utils/staticPageHero";

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
    "Wide boulevards, riverside paths, neighbourhood cafés and reminders of Germany's recent history sit side by side across the city. Whether you're drawn by its landmarks, museums or everyday streets, Berlin is a rewarding place to begin exploring Germany.",
};

const gridCities = featuredDestinations.map(({ id, name, path }) => ({
  id,
  name,
  path,
}));

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
      scopeNote="Beginning in Berlin — more journeys will follow."
      introBridge={{
        headline: "Berlin - Where the German journey started for us",
        paragraphs: [
          "Berlin is difficult to reduce to a single impression. One morning might begin beneath the glass dome of the Reichstag, another beside the colourful stretches of the East Side Gallery or along the banks of the River Spree. A single journey on the U-Bahn is often enough to make the city feel completely different.",
        ],
      }}
      journeyTitle=""
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
