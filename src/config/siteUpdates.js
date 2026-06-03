/**
 * Curated “what’s new” feed for the homepage (newest first).
 * Update when you publish a journey, gallery theme, or shop collection.
 */
export const SITE_UPDATES = [
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
