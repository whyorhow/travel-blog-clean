import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { CountryLandingTemplate } from "./templates";
import PortugalMap from "../components/PortugalMap";
import portugalHeroConfig from "./portugal/portugal.hero.config";
import { hasPortugalStaticHero, isMobileViewport } from "../utils/staticPageHero";

const mapMarkers = [
  { id: "lisbon", name: "Lisbon", x: 158, y: 190, path: "/portugal/lisbon" },
];

const featuredDestinations = [
  {
    id: "lisbon",
    name: "Lisbon",
    img: "Portugal/Lisbon/Lisbon-Hero",
    path: "/portugal/lisbon",
  },
];

const narrativeLines = {
  lisbon:
    "Steep cobbled lanes, yellow trams, river light and ordinary routines folding into each other without ever feeling staged.",
};

const gridCities = featuredDestinations.map(({ id, name, path }) => ({
  id,
  name,
  path,
}));

function Portugal() {
  return (
    <CountryLandingTemplate
      variant="alpine"
      countryKey="portugal"
      seo={{
        title: SEO_TITLES["/portugal"],
        description:
          "Stories from Portugal begin in Lisbon — hills, trams, river light, and the quieter details between the viewpoints.",
        image: "/images/Adventures/PortugalFlag.webp",
        slug: "/portugal",
      }}
      heroConfig={portugalHeroConfig}
      skipHero={hasPortugalStaticHero() && isMobileViewport()}
      heroPageData={{ title: "Portugal" }}
      showHeroTitle
      scopeNote="Beginning in Lisbon — more journeys across Portugal may follow."
      introBridge={{
        headline: "Portugal begins where the hills meet the river.",
        paragraphs: [
          "Lisbon was the city that first opened Portugal up for us — not only through its viewpoints and old tram lines, but through the way everyday life seemed to settle naturally into the same spaces.",
          "Laundry drifted above steep lanes, corner cafés filled slowly, and the Tagus kept appearing at the end of streets just when the city felt most enclosed.",
        ],
      }}
      journeyTitle="Where the Path Leads First"
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapMarkers={mapMarkers}
      mapComponent={<PortugalMap markers={mapMarkers} />}
      gridCities={gridCities}
      gridSectionTitle="Where the Path Leads Next"
      returnLink={{ label: "Explore Other Horizons", path: "/" }}
      backgroundImage="Assets/soil-background4"
    />
  );
}

export default Portugal;
