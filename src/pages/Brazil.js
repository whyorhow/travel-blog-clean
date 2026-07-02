import React, { useEffect } from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { BRAZIL_HUB_PREFETCH_PATHS, prefetchRoute } from "../config/pageChunks";
import destinations from "../assets/destinations.json";
import { CountryLandingTemplate } from "./templates";
import brazilHeroConfig from "./brazil/brazil.hero.config";
import brazilIntroGallery from "./brazil/brazil.introGallery.config";
import { hasBrazilStaticHero, isMobileViewport } from "../utils/brazilStaticHero";
import { initBrazilStaticHeroTransition } from "../utils/brazilStaticHeroTransition";
import { resolveHeroTransition } from "../system/resolvers/resolveHero";
import { cloudinaryImageUrl } from "../utils/cloudinary";

const featuredDestinations = [
  { id: "saopaulo",      name: "Sao Paulo",      img: "/images/Brazil/Sao Paulo/Landing/small/street.jpg",    path: "/brazil/saopaulo" },
  { id: "florianopolis", name: "Florianopolis",  img: "/images/Brazil/Floripa/small/Floripa18.webp",         path: "/brazil/florianopolis" },
  { id: "rio",           name: "Rio de Janeiro", img: "/images/Brazil/Rio/small/Rio9.webp",                  path: "/brazil/rio" },
  { id: "bonito",        name: "Bonito",         img: "/images/Brazil/Bonito/Small/Bonito3new.webp",         path: "/brazil/bonito" },
  { id: "salvador",      name: "Salvador",       img: "/images/Brazil/Salvador/small/Salvador5.webp",        path: "/brazil/salvador" },
  { id: "pantanal",      name: "The Pantanal",   img: "/images/Brazil/Pantanal/small/Pantanal5.webp",        path: "/brazil/pantanal" },
  { id: "foz",           name: "Foz do Iguacu",  img: "/images/Brazil/Iguazu/small/Iguazu16.webp",           path: "/brazil/foz" },
  { id: "manaus",        name: "Manaus",         img: "/images/Brazil/Manaus/Small/Manaus13.webp",           path: "/brazil/manaus" },
];

const featureBanners = [
  {
    id: "food-drink",
    name: "Food & Drink",
    img: "Brazil/Food-Drink/Small/Moqueca Lunch with Caipirinha",
    path: "/brazil/food-drink",
    tagline: "Moqueca in a clay pot, caipirinhas sweating on the tablecloth — meals that refused to end on schedule.",
  },
  {
    id: "natural-spaces",
    name: "Natural Spaces",
    img: "Brazil/Natural Spaces/small/Mata Atlântica",
    path: "/brazil/natural-spaces",
    tagline: "Green threaded through cities, rivers, forest, and wetland.",
  },
];

const narrativeLines = {
  saopaulo:
    "Liberdade at street level, graffiti corridors, dinners that stretched past midnight.",
  rio:
    "Granite peaks above tile roofs, morning mist in the valleys, sound rising from the beach at dusk.",
  florianopolis:
    "Campeche wide and unhurried — an island Brazilians return to each summer.",
  bonito:
    "Turquoise rivers so clear the limestone bed looked close enough to touch.",
  salvador:
    "Drums in Pelourinho, pastel façades on cobblestones, capoeira in the open square.",
  pantanal:
    "A caiman at the waterline, horizon flat enough to mistake for sky.",
  foz:
    "Noise building through the forest long before the falls came into view.",
  manaus:
    "The river became the road.",
};

const mapMarkers = destinations.filter(
  (d) => d.country === "Brazil" && d.id !== "ilha-grande",
);
const gridCities = destinations.filter(
  (d) => d.country === "Brazil" && d.id !== "ilha-grande",
);

function Brazil() {
  useEffect(() => {
    if (!hasBrazilStaticHero() || !isMobileViewport()) return undefined;
    const transition = resolveHeroTransition(brazilHeroConfig);
    if (!transition?.publicId) return undefined;
    const backupSrc = cloudinaryImageUrl(transition.publicId, {
      width: 480,
      format: "webp",
      version: transition.version,
    });
    return initBrazilStaticHeroTransition(
      backupSrc,
      transition.delayMs ?? 4000
    );
  }, []);

  useEffect(() => {
    const isMobileStatic =
      hasBrazilStaticHero() && isMobileViewport();
    if (isMobileStatic) return undefined;

    const warm = () => BRAZIL_HUB_PREFETCH_PATHS.forEach(prefetchRoute);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const delayMs = isMobile ? 8000 : 500;
    const timeoutMs = isMobile ? 12000 : 3000;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: timeoutMs });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(warm, delayMs);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <CountryLandingTemplate
      variant="tropical"
      scrollGoldGradient
      countryKey="brazil"
      seo={{
        title: SEO_TITLES["/brazil"],
        description: "Explore Brazil's most iconic cities and landscapes — from Rio de Janeiro and Sao Paulo to the Pantanal and Bonito, join our journeys across the country.",
        image: "/images/Brazil/BrazilBack.png",
        slug: "/brazil",
      }}
      heroConfig={brazilHeroConfig}
      skipHero={hasBrazilStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Brazil' }}
      introBridge={{
        headline: "We landed in São Paulo and kept moving.",
        body: "Humidity on arrival, then ipê-amarelo above traffic, clear rivers at Bonito, caimans beside Pantanal roads, and forest produce at Manaus markets — ten regions, no single summary.",
        images: brazilIntroGallery,
        galleryStyle: 'polaroid',
      }}
      journeyTitle="São Paulo to the coast, inland to Bonito and the Pantanal, north to Iguazú and the Amazon."
      destinations={featuredDestinations}
      featureBanners={featureBanners}
      narrativeLines={narrativeLines}
      mapMarkers={mapMarkers}
      gridCities={gridCities}
      returnLink={{ label: "Return To Adventures", path: "/" }}
    />
  );
}

export default Brazil;
