import React from "react";
import destinations from "../assets/destinations.json";
import { CountryLandingTemplate } from "./templates";

const featuredDestinations = [
  { id: "saopaulo",      name: "Sao Paulo",      img: "/images/SaoPauloLanding/small/street.jpg",    path: "/brazil/saopaulo" },
  { id: "florianopolis", name: "Florianopolis",  img: "/images/Floripa/small/Floripa18.webp",         path: "/brazil/florianopolis" },
  { id: "rio",           name: "Rio de Janeiro", img: "/images/Rio/small/Rio9.webp",                  path: "/brazil/rio" },
  { id: "bonito",        name: "Bonito",         img: "/images/Bonito/Small/Bonito3new.webp",         path: "/brazil/bonito" },
  { id: "salvador",      name: "Salvador",       img: "/images/Salvador/small/Salvador5.webp",        path: "/brazil/salvador" },
  { id: "pantanal",      name: "The Pantanal",   img: "/images/Pantanal/small/Pantanal5.webp",        path: "/brazil/pantanal" },
  { id: "foz",           name: "Foz do Iguacu",  img: "/images/Iguazu/small/Iguazu16.webp",           path: "/brazil/foz" },
  { id: "manaus",        name: "Manaus",         img: "/images/Manaus/Small/Manaus13.webp",           path: "/brazil/manaus" },
  { id: "ilha-grande",   name: "Ilha Grande",    img: "/images/Ilha Grande/small/Ilha20new.webp",     path: "/brazil/ilha-grande" },
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
  return (
    <CountryLandingTemplate
      variant="tropical"
      countryKey="brazil"
      seo={{
        title: "Travel Adventures in Brazil | Nomad Scribbles",
        description: "Explore Brazil's most iconic cities and landscapes — from Rio de Janeiro and Sao Paulo to the Pantanal and Bonito, join our journeys across the country.",
        image: "/images/Brazil/BrazilBack.png",
        slug: "/brazil",
      }}
      fallbackHeroImage="Brazil/Brazil-hero"
      heroPageData={{ title: 'Brazil' }}
      heroImages={{
        base: "/images/Brazil/BrazilHero.webp",
        overlay: "/images/Brazil/BrazilPhoto.webp",
      }}
      introBridge={{
        headline: "We didn't really understand Brazil at first.",
        body: "It was only by moving through it that pace, landscape, and the journey itself began to make sense.",
      }}
      journeyTitle="This is how Brazil unfolded for us."
      destinations={featuredDestinations}
      narrativeLines={narrativeLines}
      mapMarkers={mapMarkers}
      gridCities={gridCities}
      returnLink={{ label: "Return To Adventures", path: "/adventures" }}
    />
  );
}

export default Brazil;
