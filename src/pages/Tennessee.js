import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { CountryLandingTemplate } from "./templates";
import TennesseeMap from "../components/TennesseeMap";
import tennesseeHeroConfig from "./united-states/tennessee/tennessee.hero.config";
import { hasTennesseeStaticHero, isMobileViewport } from "../utils/staticPageHero";

const mapMarkers = [
  { id: "memphis", name: "Memphis", x: 453, y: 1038, path: "/united-states/tennessee/memphis" },
  { id: "nashville", name: "Nashville", x: 1116, y: 775, path: "/united-states/tennessee/nashville" },
  { id: "smoky-mountains", name: "Smoky Mountains", x: 1701, y: 800, path: "/united-states/tennessee/mountains" },
];

const featuredDestinations = [
  { id: "smoky-mountains", name: "Smoky Mountains", img: "/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp", path: "/united-states/tennessee/mountains" },
  { id: "nashville", name: "Nashville", img: "/images/United States/Tennessee/Nashville/Small/Nashville Skyline2.webp", path: "/united-states/tennessee/nashville" },
  { id: "memphis", name: "Memphis", img: "/images/United States/Tennessee/Memphis/Small/Illuminated Beale Street.webp", path: "/united-states/tennessee/memphis" },
];

const narrativeLines = {
  "smoky-mountains":
    "Ridgelines wrapped in low cloud, forest climbing steep ground, long views broken by mist.",
  nashville:
    "Streets lined with venues, recording spaces, and bars where live music spills into the road.",
  memphis:
    "Wide river edges, neon-lit streets, and music carried from open doorways at night.",
};

const gridCities = [
  { id: "smoky-mountains", name: "Smoky Mountains", path: "/united-states/tennessee/mountains" },
  { id: "nashville", name: "Nashville", path: "/united-states/tennessee/nashville" },
  { id: "memphis", name: "Memphis", path: "/united-states/tennessee/memphis" },
];

function Tennessee() {
  return (
    <CountryLandingTemplate
      variant="continental"
      seo={{
        title: SEO_TITLES["/united-states/tennessee"],
        description:
          "From the Smoky Mountains to Memphis and Nashville — river towns, mountain roads, and music streets across Tennessee.",
        image: "/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp",
        slug: "/united-states/tennessee",
      }}
      heroConfig={tennesseeHeroConfig}
      skipHero={hasTennesseeStaticHero() && isMobileViewport()}
      heroPageData={{ title: "Tennessee" }}
      showHeroTitle={!(hasTennesseeStaticHero() && isMobileViewport())}
      introBridge={{
        paragraphs: [
          "Tennessee stretches from the Smoky Mountains in the east to the Mississippi River in the west.",
          "Roads cross forested ridges, river plains, and city streets where music venues, studios, and late-night rooms sit close together in dense blocks.",
        ],
      }}
      journeyTitle="Journey"
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapComponent={<TennesseeMap markers={mapMarkers} />}
      gridCities={gridCities}
      quote={{
        text: "Tennessee holds mountains, river, and music within the same stretch of road.",
      }}
      returnLink={{ label: "Return to US Overview", path: "/united-states" }}
    />
  );
}

export default Tennessee;
