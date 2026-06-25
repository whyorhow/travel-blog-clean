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
    "Sandstone labyrinths, forest trails, and the landscapes that introduced us to the Czech Republic.",
  prague:
    "Gothic towers, hidden courtyards, and a final stop among the historic streets of the capital.",
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
        body:
          "Before the church spires and crowded squares came forests. Before the astronomical clock came sandstone towers. Our route through the Czech Republic began in the quieter corners of Bohemia and ended in Prague, giving the country an unusual rhythm that we would not have planned but came to appreciate. These pages follow that journey from wilderness to city.",
      }}
      journeyTitle="Where We Wandered"
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapComponent={<CzechMap markers={mapMarkers} />}
      gridCities={gridCities}
      returnLink={{ label: "Return to Adventures", path: "/" }}
    />
  );
}

export default CzechRepublic;
