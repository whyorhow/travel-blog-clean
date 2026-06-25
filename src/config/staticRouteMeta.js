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
    title: "Brazil Travel Guide: Cities, Nature, Food & Slow Travel",
    description:
      "Explore Brazil's most iconic cities and landscapes — from Rio and São Paulo to the Pantanal and Bonito.",
  },
  "/brazil/rio": {
    title: "Rio de Janeiro Travel Guide: Neighborhoods, Culture & Carnival",
    description:
      "Rio de Janeiro: A city of granite, carnival, and sea, defined by its dramatic geography.",
  },
  "/brazil/saopaulo": {
    title: "São Paulo Travel Guide: Street Art, Parks, Carnival & City Life",
    description: "Fragments of São Paulo — parks, art, carnival, and the spaces in between.",
  },
  "/brazil/saopaulo/green-spaces": {
    title: "São Paulo Parks Guide: Ibirapuera, Trianon & Botanical Garden",
    description:
      "Three São Paulo green spaces — Ibirapuera, Trianon, and the Botanical Garden — as everyday green.",
  },
  "/brazil/saopaulo/galleries": {
    title: "São Paulo Art Galleries Guide: MASP, Pinacoteca & Museums",
    description: "São Paulo's galleries as part of everyday movement through the city.",
  },
  "/brazil/saopaulo/carnival": {
    title: "São Paulo Carnival Guide: Blocos, Sambódromo & Street Celebrations",
    description: "Carnival as structured procession and open street movement in São Paulo.",
  },
  "/brazil/saopaulo/street-art": {
    title: "São Paulo Street Art Guide: Murals, Beco do Batman & Urban Culture",
    description: "São Paulo's walls as part of the city's movement and surface.",
  },
  "/brazil/santos": {
    title: "Santos Brazil Travel Guide: Coastal Port City Near São Paulo",
    description:
      "Santos offers air, space, and a slower rhythm on the São Paulo coast — port city and Pelé's home ground.",
  },
  "/brazil/salvador": {
    title: "Salvador Brazil Travel Guide: Bahia Culture, History & Coast",
    description: "Salvador: A city where history moves, sings, resists, and remembers.",
  },
  "/brazil/pantanal": {
    title: "Pantanal Travel Guide: Wildlife, Wetlands & Seasonal Brazil",
    description:
      "The Pantanal is one of the largest tropical wetlands on Earth, governed by water and seasonal rhythms.",
  },
  "/brazil/florianopolis": {
    title: "Florianópolis Travel Guide: Beaches, Island Life & Southern Brazil",
    description:
      "Florianópolis: An island city where lush hills meet over 40 distinct beaches on Brazil's southern coast.",
  },
  "/brazil/foz": {
    title: "Iguazu Falls Travel Guide: Brazil–Argentina Border & Rainforest",
    description:
      "Iguazu is falling water and dense subtropical forest, where the river ignores borders.",
  },
  "/brazil/manaus": {
    title: "Manaus Amazon Guide: River City, Rainforest & Jungle Gateways",
    description:
      "Deep in the Amazon, Manaus is shaped by riverside urbanism and the vast forest that surrounds it.",
  },
  "/brazil/rio/ilha-grande": {
    title: "Ilha Grande Travel Guide: Roadless Island Off Rio",
    description:
      "A roadless island off the Rio coast — quiet trails, clear water, and unhurried rhythms reached by boat.",
  },
  "/brazil/food-drink": {
    title: "Brazil Food Guide: Street Food, Markets & Regional Cuisine",
    description:
      "A visual exploration of food culture across Brazil — markets, street food, coastal eating, and shared meals.",
  },
  "/brazil/natural-spaces": {
    title: "Brazil Natural Wonders: Rainforest, Wetlands & Coast",
    description:
      "Brazil's natural spaces — Atlantic Forest, Amazon canopy, clear-water rivers, wetlands, and urban green.",
  },
  "/brazil/bonito": {
    title: "Bonito Brazil Travel Guide: Snorkeling, Waterfalls & Ecotourism",
    description:
      "Crystal clear waters, waterfalls, and caves of Bonito — Brazil's premier ecotourism destination.",
  },
  "/belgium": {
    title: "Slow Travel Belgium: A Guide to Local Food, History & Culture",
    description:
      "Belgium blends history, food, and everyday life — grounded and refined. Begin in Antwerp.",
  },
  "/belgium/antwerp": {
    title: "Antwerp Travel Guide: Medieval Streets, Art & Belgian Culture",
    description:
      "A personal diary of Antwerp — medieval streets, chocolate shops, the Grote Markt, and quiet city rhythm.",
  },
  "/greece": {
    title: "Greece Travel Guide: History, Athens & Mediterranean Culture",
    description:
      "Greece unfolds through history, movement, and everyday rituals. Begin in Athens.",
  },
  "/greece/athens": {
    title: "Athens Travel Guide: Acropolis, Ancient Sites & Coastal Escapes",
    description:
      "Exploring Athens — from the Acropolis to hidden chapels, ancient temples and quiet coastal escapes.",
  },
  "/hungary": {
    title: "Hungary Travel Guide: Budapest Architecture, Baths & Danube Life",
    description: "Hungary through history, culture, and architecture — centred on Budapest.",
  },
  "/hungary/budapest": {
    title: "Budapest Travel Guide: Thermal Baths, Danube Views & City Life",
    description:
      "Budapest — grand architecture, thermal baths, Danube views, and the quiet spaces that reveal the city's rhythm.",
  },
  "/austria": {
    title: "Austria Travel Guide: Vienna, Salzburg & Alpine Country",
    description:
      "Austria through imperial cities, alpine trails, and quiet corners — Vienna, Salzburg, and the wider country beyond.",
  },
  "/austria/vienna": {
    title: "Vienna Travel Guide: Palaces, Libraries & Café Culture",
    description:
      "Vienna — imperial palaces, historic libraries, Hundertwasser colour, and the unhurried rhythm of café culture.",
  },
  "/austria/salzburg": {
    title: "Salzburg Travel Guide: Old Town, Sound of Music & Catacombs",
    description:
      "Salzburg — Sound of Music trails, baroque old town, St. Peter's catacombs, and a skyline of copper domes.",
  },
  "/austria/wider-country": {
    title: "Austria Alpine Travel Guide: Krimml Falls, Attersee & Forest Trails",
    description:
      "Beyond the cities — Krimml Waterfalls, Lake Attersee, Waldviertel forests, and the alpine country in between.",
  },
  "/czech-republic": {
    title: "Czech Republic Travel Guide: Prague & Bohemian Wilderness",
    description:
      "Fragments of the Czech Republic — sandstone labyrinths, forest trails, and Prague's historic streets.",
  },
  "/czech-republic/prague": {
    title: "Prague Travel Guide: Old Town Square, Astronomical Clock & Kutná Hora",
    description:
      "Old Town squares, Gothic towers, hidden details, and a short journey to Kutná Hora's remarkable bone church.",
  },
  "/czech-republic/bohemian-wilderness": {
    title: "Bohemian Wilderness Travel Guide: Prachov Rocks, Forests & Adršpach",
    description:
      "Sandstone labyrinths, forest trails, and quiet corners of Bohemia beyond Prague.",
  },
  "/united-states": {
    title: "United States Travel Guide: Regions, Roads & American Journeys",
    description: "Travel stories and adventures across the United States.",
  },
  "/united-states/tennessee": {
    title: "Tennessee Travel Guide: Music, Mountains & Southern Culture",
    description: "Tennessee — mountains, music cities, and the rhythm of the American South.",
  },
  "/united-states/tennessee/mountains": {
    title: "Great Smoky Mountains Travel Guide: Hiking, Forests & Views",
    description:
      "Explore the Great Smoky Mountains — arrival, forest immersion, water, human traces, and twilight perspective.",
  },
  "/united-states/tennessee/memphis": {
    title: "Memphis Travel Guide: Blues, Beale Street & Mississippi River",
    description:
      "Memphis — Beale Street, the Mississippi, Sun Studio, Stax, and live blues that define the city.",
  },
  "/united-states/tennessee/nashville": {
    title: "Nashville Travel Guide: Music City, Broadway & Songwriting Culture",
    description:
      "Nashville — skyline views, Broadway's neon, songwriter corners, and Music City after dark.",
  },
};

Object.keys(SEO_TITLES).forEach((routePath) => {
  if (ROUTE_META[routePath]) {
    ROUTE_META[routePath].title = SEO_TITLES[routePath];
  }
});

function canonicalFor(routePath) {
  return routePath === "/" ? `${BASE}/` : `${BASE}${routePath}`;
}

module.exports = { ROUTE_META, canonicalFor, BASE };
