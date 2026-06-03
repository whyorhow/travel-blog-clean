import React, { useEffect } from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { BRAZIL_HUB_PREFETCH_PATHS, prefetchRoute } from "../config/pageChunks";
import destinations from "../assets/destinations.json";
import { CountryLandingTemplate } from "./templates";
import brazilHeroConfig from "./brazil/brazil.hero.config";
import brazilIntroGallery from "./brazil/brazil.introGallery.config";

const featuredDestinations = [
  { id: "saopaulo",      name: "Sao Paulo",      img: "/images/Brazil/Sao Paulo/Landing/small/street.jpg",    path: "/brazil/saopaulo" },
  { id: "florianopolis", name: "Florianopolis",  img: "/images/Brazil/Floripa/small/Floripa18.webp",         path: "/brazil/florianopolis" },
  { id: "rio",           name: "Rio de Janeiro", img: "/images/Brazil/Rio/small/Rio9.webp",                  path: "/brazil/rio" },
  { id: "bonito",        name: "Bonito",         img: "/images/Brazil/Bonito/Small/Bonito3new.webp",         path: "/brazil/bonito" },
  { id: "salvador",      name: "Salvador",       img: "/images/Brazil/Salvador/small/Salvador5.webp",        path: "/brazil/salvador" },
  { id: "pantanal",      name: "The Pantanal",   img: "/images/Brazil/Pantanal/small/Pantanal5.webp",        path: "/brazil/pantanal" },
  { id: "foz",           name: "Foz do Iguacu",  img: "/images/Brazil/Iguazu/small/Iguazu16.webp",           path: "/brazil/foz" },
  { id: "manaus",        name: "Manaus",         img: "/images/Brazil/Manaus/Small/Manaus13.webp",           path: "/brazil/manaus" },
  { id: "ilha-grande",   name: "Ilha Grande",    img: "/images/Brazil/IlhaGrande/Small/Ilha20new.webp",     path: "/brazil/ilha-grande" },
];

const featureBanners = [
  {
    id: "food-drink",
    name: "Food & Drink",
    img: "Brazil/Food-Drink/Small/Moqueca Lunch with Caipirinha",
    path: "/brazil/food-drink",
    tagline: "Every meal carried the atmosphere of where it was eaten.",
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
  saopaulo:      "This is where it began.",
  rio:           "Everything shifted towards the coast.",
  florianopolis: "The pace slowed.",
  bonito:        "The landscape changed again.",
  salvador:      "The rhythm found its roots.",
  pantanal:      "It opened out completely.",
  foz:           "The falls marked the edge.",
  manaus:        "The river became the road.",
  "ilha-grande": "We ended where the forest meets the sea.",
};

const mapMarkers = destinations.filter(d => d.country === "Brazil");
const gridCities = destinations.filter(d => d.country === "Brazil");

function Brazil() {
  useEffect(() => {
    const warm = () => BRAZIL_HUB_PREFETCH_PATHS.forEach(prefetchRoute);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(warm, 500);
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
      heroPageData={{ title: 'Brazil' }}
      introBridge={{
        headline: "We didn't really understand Brazil at first.",
        body: "It was only by moving through it that pace, landscape, and the journey itself began to make sense.",
        images: brazilIntroGallery,
        galleryStyle: 'polaroid',
      }}
      journeyTitle="This is how Brazil unfolded for us."
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
