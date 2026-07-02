import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { CountryLandingTemplate } from "./templates";
import CzechMap from "../components/CzechMap";
import czechHeroConfig from "./czech/czech.hero.config";
import { getHubNote } from "../config/regionScope";

const mapMarkers = [
  { id: "nature", name: "Bohemian Wilderness", x: 285, y: 140, path: "/czech-republic/bohemian-wilderness" },
  { id: "prague", name: "Prague", x: 135, y: 110, path: "/czech-republic/prague" },
];

const featuredDestinations = [
  {
    id: "nature",
    name: "Bohemian Wilderness",
    img: "Czech/Wilderness-backup",
    path: "/czech-republic/bohemian-wilderness",
  },
  {
    id: "prague",
    name: "Prague",
    img: "Czech/Prague-backup",
    path: "/czech-republic/prague",
  },
];

const narrativeLines = {
  nature:
    "Prachov and Adršpach — sandstone towers through dense woodland, trails cutting between shade and sudden views across the rock formations.",
  prague:
    "Spires, clocks, and carved figures set above street level. Side streets led between squares; an hour east, Kutná Hora offered a different counterpoint.",
};

const journeySummary = {
  title: "The Journey",
  lead: "Forests first, then Prague.",
  items: [
    "Bohemian wilderness — Prachov, Adršpach, shaded trails and stone rising through canopy.",
    "Prague — Old Town squares, Gothic spires above eye level, and a day trip to Kutná Hora.",
  ],
};

const gridCities = featuredDestinations.map(({ id, name, path }) => ({ id, name, path }));

function CzechRepublic() {
  return (
    <CountryLandingTemplate
      variant="alpine"
      countryKey="czech-republic"
      seo={{
        title: SEO_TITLES["/czech-republic"],
        description:
          "Fragments of the Czech Republic — sandstone labyrinths, forest trails, and Prague's historic streets.",
        image: "/images/Adventures/CzechFlag.webp",
        slug: "/czech-republic",
      }}
      heroConfig={czechHeroConfig}
      heroPageData={{ title: "Czech Republic" }}
      showHeroTitle
      scopeNote={getHubNote("/czech-republic")}
      introBridge={{
        headline: "The country before the capital.",
        paragraphs: [
          "Before church spires and crowded squares came forests. Before the astronomical clock came sandstone towers.",
          "Trails through Prachov and Adršpach first — stone appearing between trees, paths dissolving into shade. Prague came later: tram wires, narrow alleys, and detail built above the pavement.",
          "The last stretch was the train east from the forests; by the time we reached the Old Town, birdsong had already given way to tram bells.",
        ],
      }}
      journeyTitle="Where We Wandered"
      journeySummary={journeySummary}
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapComponent={<CzechMap markers={mapMarkers} />}
      gridCities={gridCities}
      returnLink={{ label: "Return to Adventures", path: "/" }}
    />
  );
}

export default CzechRepublic;
