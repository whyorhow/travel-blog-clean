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
    "Sandstone labyrinths, forest trails and wide, quiet terrain formed the first impression of the Czech Republic. A landscape that feels carved rather than built, where time moves slowly and distances open out.",
  prague:
    "Gothic towers, enclosed courtyards and winding streets marked the final stage of the journey. A city of layers, where detail gathers in every surface and history sits just beneath the present.",
};

const journeySummary = {
  title: "The Journey",
  lead: "Two landscapes shaped the experience.",
  items: [
    "Bohemian wilderness — sandstone formations, forest trails, open terrain.",
    "Prague — dense historic centre, architectural detail, enclosed urban spaces.",
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
          "We moved first through the stillness of Bohemia, where woodland paths and rock formations set the pace of travel, before arriving in Prague, where the rhythm shifted into narrow streets and layered stone.",
          "What follows is that change — from openness into density, from landscape into city.",
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
