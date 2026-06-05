/**
 * Per-route title/description for post-build static <head> injection.
 * Keeps initial HTML aligned with react-helmet before JS runs.
 */
const { SEO_TITLES } = require("./seoTitles");

const BASE = "https://www.nomadscribbles.com";

const ROUTE_META = {
  "/": {
    title: "Nomad Scribbles | Slow Travel Stories from Brazil & Beyond",
    description:
      "Nomad Scribbles documents places, moments, and experiences from around the world — slow travel, photography, and reflections from Brazil and beyond.",
  },
  "/nomads-gallery": {
    title: "Nomads Gallery | Travel Photo Filmstrips",
    description:
      "A cinematic archive of recurring travel moments — thematic filmstrips across the wider journey.",
  },
  "/contact-us": {
    title: "Contact Nomad Scribbles",
    description:
      "Get in touch with Nomad Scribbles — send us a message and share your travel adventures or questions.",
  },
  "/nomads-shop": {
    title: "Nomads Shop | Travel Art & Prints",
    description:
      "Explore curated collections of travel art and prints from Brazil and beyond.",
  },
  "/nomads-shop/brazil": {
    title: "Brazil Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from across Brazil.",
  },
  "/nomads-shop/brazil/saopaulo": {
    title: "São Paulo Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from São Paulo.",
  },
  "/nomads-shop/brazil/rio": {
    title: "Rio Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from Rio de Janeiro.",
  },
  "/nomads-shop/brazil/salvador": {
    title: "Salvador Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from Salvador.",
  },
  "/nomads-shop/brazil/pantanal": {
    title: "Pantanal Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from the Pantanal.",
  },
  "/nomads-shop/brazil/foz": {
    title: "Iguazu Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from Foz do Iguaçu.",
  },
  "/nomads-shop/brazil/bonito": {
    title: "Bonito Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from Bonito.",
  },
  "/nomads-shop/brazil/manaus": {
    title: "Manaus Art Collection | Nomads Shop",
    description: "Explore our curated collection of art and prints from Manaus.",
  },
  "/brazil": {
    title: SEO_TITLES["/brazil"],
    description:
      "Explore Brazil's most iconic cities and landscapes — from Rio and São Paulo to the Pantanal and Bonito.",
  },
  "/brazil/rio": {
    title: SEO_TITLES["/brazil/rio"],
    description:
      "Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography.",
  },
  "/brazil/saopaulo": {
    title: SEO_TITLES["/brazil/saopaulo"],
    description: "Fragments of São Paulo — parks, art, carnival, and the spaces in between.",
  },
  "/brazil/saopaulo/green-spaces": {
    title: SEO_TITLES["/brazil/saopaulo/green-spaces"],
    description:
      "Three São Paulo green spaces — Ibirapuera, Trianon, and the Botanical Garden — as everyday green.",
  },
  "/brazil/saopaulo/galleries": {
    title: SEO_TITLES["/brazil/saopaulo/galleries"],
    description: "São Paulo's galleries as part of everyday movement through the city.",
  },
  "/brazil/saopaulo/carnival": {
    title: SEO_TITLES["/brazil/saopaulo/carnival"],
    description: "Carnival as structured procession and open street movement in São Paulo.",
  },
  "/brazil/saopaulo/street-art": {
    title: SEO_TITLES["/brazil/saopaulo/street-art"],
    description: "São Paulo's walls as part of the city's movement and surface.",
  },
  "/brazil/santos": {
    title: SEO_TITLES["/brazil/santos"],
    description:
      "Santos offers air, space, and a slower rhythm on the São Paulo coast — port city and Pelé's home ground.",
  },
  "/brazil/salvador": {
    title: SEO_TITLES["/brazil/salvador"],
    description: "Salvador: A city where history moves, sings, resists, and remembers.",
  },
  "/brazil/pantanal": {
    title: SEO_TITLES["/brazil/pantanal"],
    description:
      "The Pantanal is one of the largest tropical wetlands on Earth, governed by water and seasonal rhythms.",
  },
  "/brazil/florianopolis": {
    title: SEO_TITLES["/brazil/florianopolis"],
    description:
      "Florianópolis: An island city where lush hills meet over 40 distinct beaches on Brazil's southern coast.",
  },
  "/brazil/foz": {
    title: SEO_TITLES["/brazil/foz"],
    description:
      "Iguazu is falling water and dense subtropical forest, where the river ignores borders.",
  },
  "/brazil/manaus": {
    title: SEO_TITLES["/brazil/manaus"],
    description:
      "Deep in the Amazon, Manaus is shaped by riverside urbanism and the vast forest that surrounds it.",
  },
  "/brazil/ilha-grande": {
    title: SEO_TITLES["/brazil/ilha-grande"],
    description:
      "A roadless island where the Atlantic Forest meets the sea — quiet trails, clear water, unhurried rhythms.",
  },
  "/brazil/food-drink": {
    title: SEO_TITLES["/brazil/food-drink"],
    description:
      "A visual exploration of food culture across Brazil — markets, street food, coastal eating, and shared meals.",
  },
  "/brazil/natural-spaces": {
    title: "Brazil Natural Wonders: Rainforest, Wetlands & Coast",
    description:
      "Brazil's natural spaces — Atlantic Forest, Amazon canopy, clear-water rivers, wetlands, and urban green.",
  },
  "/brazil/bonito": {
    title: SEO_TITLES["/brazil/bonito"],
    description:
      "Crystal clear waters, waterfalls, and caves of Bonito — Brazil's premier ecotourism destination.",
  },
  "/belgium": {
    title: SEO_TITLES["/belgium"],
    description:
      "Belgium blends history, food, and everyday life — grounded and refined. Begin in Antwerp.",
  },
  "/belgium/antwerp": {
    title: SEO_TITLES["/belgium/antwerp"],
    description:
      "A personal diary of Antwerp — medieval streets, chocolate shops, the Grote Markt, and quiet city rhythm.",
  },
  "/greece": {
    title: SEO_TITLES["/greece"],
    description:
      "Greece unfolds through history, movement, and everyday rituals. Begin in Athens.",
  },
  "/greece/athens": {
    title: SEO_TITLES["/greece/athens"],
    description:
      "Exploring Athens — from the Acropolis to hidden chapels, ancient temples and quiet coastal escapes.",
  },
  "/hungary": {
    title: SEO_TITLES["/hungary"],
    description: "Hungary through history, culture, and architecture — centred on Budapest.",
  },
  "/hungary/budapest": {
    title: SEO_TITLES["/hungary/budapest"],
    description:
      "Budapest — grand architecture, thermal baths, Danube views, and the quiet spaces that reveal the city's rhythm.",
  },
  "/united-states": {
    title: SEO_TITLES["/united-states"],
    description: "Travel stories and adventures across the United States.",
  },
  "/united-states/tennessee": {
    title: SEO_TITLES["/united-states/tennessee"],
    description: "Tennessee — mountains, music cities, and the rhythm of the American South.",
  },
  "/united-states/tennessee/mountains": {
    title: SEO_TITLES["/united-states/tennessee/mountains"],
    description:
      "Explore the Great Smoky Mountains — arrival, forest immersion, water, human traces, and twilight perspective.",
  },
  "/united-states/tennessee/memphis": {
    title: SEO_TITLES["/united-states/tennessee/memphis"],
    description:
      "Memphis — Beale Street, the Mississippi, Sun Studio, Stax, and live blues that define the city.",
  },
  "/united-states/tennessee/nashville": {
    title: SEO_TITLES["/united-states/tennessee/nashville"],
    description:
      "Nashville — skyline views, Broadway's neon, songwriter corners, and Music City after dark.",
  },
};


function canonicalFor(routePath) {
  return routePath === "/" ? `${BASE}/` : `${BASE}${routePath}`;
}

module.exports = { ROUTE_META, canonicalFor, BASE };
