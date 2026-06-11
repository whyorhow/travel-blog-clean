import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { CountryLandingTemplate } from "./templates";
import TennesseeMap from "../components/TennesseeMap";
import tennesseeHeroConfig from "./united-states/tennessee/tennessee.hero.config";
import { getHubNote } from "../config/regionScope";
import { hasTennesseeStaticHero, isMobileViewport } from "../utils/staticPageHero";

const mapMarkers = [
  { id: "memphis", name: "Memphis", x: 453, y: 1038, path: "/united-states/tennessee/memphis" },
  { id: "nashville", name: "Nashville", x: 1116, y: 775, path: "/united-states/tennessee/nashville" },
  { id: "smoky-mountains", name: "Smoky Mountains", x: 1701, y: 800, path: "/united-states/tennessee/mountains" },
];

const featuredDestinations = [
  { id: "smoky-mountains", name: "Smoky Mountains", img: "/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp", path: "/united-states/tennessee/mountains" },
  { id: "nashville",       name: "Nashville",       img: "/images/United States/Tennessee/Nashville/Small/Nashville Skyline2.webp",   path: "/united-states/tennessee/nashville" },
  { id: "memphis",         name: "Memphis",         img: "/images/United States/Tennessee/Memphis/Small/Illuminated Beale Street.webp", path: "/united-states/tennessee/memphis" },
];

const narrativeLines = {
  "smoky-mountains": "Ancient ridges and blue-grey mist. A scale and stillness that is both humbling and rejuvenating.",
  nashville: "Nashville hums with sound — from historic venues to modern studios. The roots of country, blues, and rock.",
  memphis: "Barbecue smoke, neon streets, and live blues from open doorways. Memphis mixes river history with late nights.",
};

const gridCities = [
  { id: "smoky-mountains", name: "Smoky Mountains", path: "/united-states/tennessee/mountains" },
  { id: "nashville",       name: "Nashville",       path: "/united-states/tennessee/nashville" },
  { id: "memphis",         name: "Memphis",         path: "/united-states/tennessee/memphis" },
];

function Tennessee() {
  return (
    <CountryLandingTemplate
      variant="continental"
      seo={{
        title: SEO_TITLES["/united-states/tennessee"],
        description: "From the misty peaks of the Smokies to the rhythmic pulse of Nashville, explore the diverse landscapes and rich culture of Tennessee.",
        image: "/images/United States/Tennessee/Mountains/Small/Panoramic Mountains.webp",
        slug: "/united-states/tennessee",
      }}
      heroConfig={tennesseeHeroConfig}
      skipHero={hasTennesseeStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Tennessee' }}
      showHeroTitle={!(hasTennesseeStaticHero() && isMobileViewport())}
      scopeNote={getHubNote("/united-states/tennessee")}
      introBridge={{
        headline: "Mountains, music and something harder to name.",
        body: "Tennessee runs from the blue-grey ridges of the Smokies in the east to the river plains of Memphis in the west — and each place sounds different.",
      }}
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapComponent={<TennesseeMap markers={mapMarkers} />}
      gridCities={gridCities}
      quote={{
        text: "Tennessee is a song that hasn't finished being sung.",
      }}
      returnLink={{ label: "Return to US Overview", path: "/united-states" }}
    />
  );
}

export default Tennessee;
