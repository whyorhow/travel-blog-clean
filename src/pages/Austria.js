import React from "react";
import { SEO_TITLES } from "../config/seoTitles";
import { CountryLandingTemplate } from "./templates";
import AustriaMap from "../components/AustriaMap";
import austriaHeroConfig from "./austria/austria.hero.config";
import { hasAustriaStaticHero, isMobileViewport } from "../utils/staticPageHero";
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
    "Trams rolled past Belvedere while office workers crossed palace squares at lunch — grand façades and neighbourhood streets on the same pavement.",
  salzburg:
    "Narrow streets twist beneath the cliffs until the fortress appears above the rooftops. Looking up becomes part of the walk.",
  "wider-country":
    "At Krimml, waterfall sound built through the pines before the cascades appeared. Lake shallows at Attersee and mossy forest trails took over from tramlines and crowded squares.",
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
          "Fragments of Austria — quiet cafés in Vienna, Salzburg beneath the fortress, and the mountain landscapes between them.",
        image: "/images/Adventures/AustriaFlag.webp",
        slug: "/austria",
      }}
      heroConfig={austriaHeroConfig}
      skipHero={hasAustriaStaticHero() && isMobileViewport()}
      heroPageData={{ title: "Austria" }}
      showHeroTitle
      scopeNote={getHubNote("/austria")}
      introBridge={{
        headline: "Three regions on the map — Vienna, Salzburg, and the Alps beyond.",
      }}
      journeyTitle="One road winds between Vienna's palaces and Salzburg's fortress cliffs. The next climbs toward Krimml's waterfalls, Lake Attersee, and shaded trails through Hohe Tauern."
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
