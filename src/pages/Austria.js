import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { CountryLandingTemplate } from "./templates";
import AustriaMap from "../components/AustriaMap";
import austriaHeroConfig from "./austria/austria.hero.config";
import { getHubNote } from "../config/regionScope";

const mapMarkers = [
  { id: "vienna", name: "Vienna", x: 325, y: 113, path: "/austria/vienna" },
  { id: "salzburg", name: "Salzburg", x: 194, y: 139, path: "/austria/salzburg" },
  { id: "wider-country", name: "Beyond the Cities", x: 110, y: 177, path: "/austria/wider-country" },
];

const featuredDestinations = [
  {
    id: "vienna",
    name: "Vienna",
    img: "Austria/Vienna-backup",
    path: "/austria/vienna",
  },
  {
    id: "salzburg",
    name: "Salzburg",
    img: "Austria/Salzburg-backup",
    path: "/austria/salzburg",
  },
  {
    id: "wider-country",
    name: "Beyond the Cities",
    img: "Austria/Wider-Country-backup",
    path: "/austria/wider-country",
  },
];

const narrativeLines = {
  vienna:
    "History here is held in plain sight. It lives in grand palaces, quiet libraries, and centuries-old cafés built on the quiet assumption that you have all the time in the world to stay.",
  salzburg: "Baroque streets narrow toward the rock face. Everything eventually leads uphill.",
  "wider-country": "The cities eventually faded behind us. Forest trails, mountain lakes, and waterfalls set the pace instead.",
};

const gridCities = featuredDestinations.map(({ id, name, path }) => ({ id, name, path }));

function Austria() {
  return (
    <CountryLandingTemplate
      variant="alpine"
      countryKey="austria"
      seo={{
        title: SEO_TITLES["/austria"],
        description:
          "Fragments of Austria — Vienna's imperial rooms, Salzburg's old town, and the alpine country between them.",
        image: "/images/Adventures/AustriaFlag.webp",
        slug: "/austria",
      }}
      heroConfig={austriaHeroConfig}
      heroPageData={{ title: "Austria" }}
      showHeroTitle
      scopeNote={getHubNote("/austria")}
      introBridge={{
        headline: "Austria changes character faster than almost anywhere we've travelled.",
      }}
      journeyTitle="One mile it is all imperial grandeur and structured stone; the next, it dissolves into wild, silent alpine peaks."
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapComponent={<AustriaMap markers={mapMarkers} />}
      gridCities={gridCities}
      gridSectionTitle="Where the Path Leads Next"
      returnLink={{ label: "Explore Other Horizons", path: "/" }}
    />
  );
}

export default Austria;
