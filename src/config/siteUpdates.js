/**
 * Curated “what’s new” feed for the homepage (newest first).
 * Update when you publish a journey, gallery theme, or shop collection.
 */
export const SITE_UPDATES = [
  {
    id: "germany-berlin",
    date: "2026-07",
    kind: "Journey",
    title: "Berlin",
    path: "/germany/berlin",
    summary: "History layers, street art, and the rhythm of a city that never stops moving.",
  },
  {
    id: "portugal-lisbon",
    date: "2026-07",
    kind: "Journey",
    title: "Lisbon",
    path: "/portugal/lisbon",
    summary: "Cobbled hills, vintage trams, and river light that lingers all afternoon.",
  },
  {
    id: "czech-republic",
    date: "2026-06",
    kind: "Journey",
    title: "Czech Republic",
    path: "/czech-republic",
    summary: "Prague's old town squares, plus a short Kutná Hora stop — and Bohemian nature beyond the city.",
  },
  {
    id: "czech-prague",
    date: "2026-06",
    kind: "Journey",
    title: "Prague",
    path: "/czech-republic/prague",
    summary: "Baroque squares, medieval clocks, pastel façades — and the bone church at Kutná Hora.",
  },
  {
    id: "czech-bohemian-wilderness",
    date: "2026-06",
    kind: "Journey",
    title: "Bohemian Wilderness",
    path: "/czech-republic/bohemian-wilderness",
    summary: "Sandstone labyrinths at Prachov and Adršpach — the forests that introduced us to Bohemia.",
  },
  {
    id: "austria",
    date: "2026-06",
    kind: "Journey",
    title: "Austria",
    path: "/austria",
    summary: "A new country hub — Vienna, Salzburg, and the Alps, each with its own story path.",
  },
  {
    id: "austria-vienna",
    date: "2026-06",
    kind: "Journey",
    title: "Vienna",
    path: "/austria/vienna",
    summary: "Imperial palaces, libraries, and cafés that assume you have time.",
  },
  {
    id: "austria-salzburg",
    date: "2026-06",
    kind: "Journey",
    title: "Salzburg",
    path: "/austria/salzburg",
    summary: "Baroque streets, Sound of Music trails, and the rock face above the old town.",
  },
  {
    id: "austria-wider-country",
    date: "2026-06",
    kind: "Journey",
    title: "Beyond the Cities",
    path: "/austria/wider-country",
    summary: "Forest trails, mountain lakes, and Krimml Falls — the pace slows outside the cities.",
  },
  {
    id: "site-search",
    date: "2025-06",
    kind: "Explore",
    title: "Search the archive",
    path: "/search",
    summary: "Journeys, destination pages, and individual photographs — all in one place.",
  },
  {
    id: "rio",
    date: "2025-05",
    kind: "Journey",
    title: "Rio de Janeiro",
    path: "/brazil/rio",
    summary: "Neighbourhoods, carnival at scale, and the coastline we kept walking back to.",
  },
  {
    id: "gallery",
    date: "2025-04",
    kind: "Gallery",
    title: "Nomads Gallery",
    path: "/nomads-gallery",
    summary: "Thematic filmstrips — browse moments without following a fixed route.",
  },
  {
    id: "shop-brazil",
    date: "2025-03",
    kind: "Shop",
    title: "Brazil print collections",
    path: "/nomads-shop/brazil",
    summary: "Art and prints from the road — São Paulo and regional collections.",
  },
  {
    id: "bonito",
    date: "2025-02",
    kind: "Journey",
    title: "Bonito",
    path: "/brazil/bonito",
    summary: "Clear water, waterfalls, and the slow ecotourism rhythm of Mato Grosso do Sul.",
  },
];

export function formatUpdateDate(dateKey) {
  const [year, month] = dateKey.split("-").map(Number);
  if (!year || !month) return dateKey;
  return new Date(year, month - 1, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}
