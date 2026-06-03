const { ROUTE_META } = require("./staticRouteMeta");
const { SEARCH_PAGE_IMAGES } = require("./searchImages");
const {
  cloudinaryImageUrl,
  cloudinaryUrlFromLegacyPath,
} = require("../utils/cloudinary");

const CATEGORY_SLICES = [
  () => require("../assets/artImages/slices/category/rio.json"),
  () => require("../assets/artImages/slices/category/salvador.json"),
  () => require("../assets/artImages/slices/category/pantanal.json"),
  () => require("../assets/artImages/slices/category/iguazu.json"),
  () => require("../assets/artImages/slices/category/bonito.json"),
  () => require("../assets/artImages/slices/category/manaus.json"),
];

function pathToKeywords(routePath) {
  if (routePath === "/") {
    return ["home", "adventures", "journey", "map", "explore"];
  }
  return routePath
    .slice(1)
    .split("/")
    .flatMap((segment) =>
      segment
        .replace(/-/g, " ")
        .split(/\s+/)
        .filter(Boolean)
    );
}

function displayTitle(seoTitle) {
  const pipe = seoTitle.split("|")[0].trim();
  const colon = pipe.indexOf(":");
  if (colon > 0 && colon < 60) {
    return pipe.slice(0, colon).trim();
  }
  return pipe;
}

function resolveImageUrl(source) {
  if (!source) return "";
  if (source.startsWith("/")) {
    return cloudinaryUrlFromLegacyPath(source, { width: 600 });
  }
  return cloudinaryImageUrl(source, { width: 600 });
}

function buildPageIndex() {
  return Object.entries(ROUTE_META).map(([path, meta]) => ({
    type: "page",
    path,
    title: displayTitle(meta.title),
    description: meta.description,
    keywords: pathToKeywords(path),
    imageUrl: resolveImageUrl(SEARCH_PAGE_IMAGES[path]),
    label: path === "/" ? "Home" : path.startsWith("/nomads-shop") ? "Shop" : "Journey",
  }));
}

function buildMomentIndex() {
  const moments = [];
  CATEGORY_SLICES.forEach((loader) => {
    const raw = loader();
    const list = Array.isArray(raw) ? raw : raw.default || [];
    list.forEach((item) => {
      const publicId = item.cloudinary?.blog || item.cloudinary?.thumbnail;
      if (!publicId) return;
      moments.push({
        type: "image",
        path: item.storyLink || "/brazil",
        title: item.title,
        description: item.description || "",
        keywords: [
          item.category,
          item.title,
          ...(item.description || "").split(/\s+/).slice(0, 12),
        ].filter(Boolean),
        imageUrl: cloudinaryImageUrl(publicId, { width: 600 }),
        label: "Moment",
      });
    });
  });
  return moments;
}

const pageIndex = buildPageIndex();
const momentIndex = buildMomentIndex();
export const siteSearchIndex = [...pageIndex, ...momentIndex];

function matchScore(item, q) {
  let score = 0;
  const title = item.title.toLowerCase();
  const desc = item.description.toLowerCase();
  const path = item.path.toLowerCase();

  if (title === q) score += 50;
  else if (title.startsWith(q)) score += 30;
  else if (title.includes(q)) score += 20;

  if (desc.includes(q)) score += 8;
  if (path.includes(q)) score += 6;

  item.keywords.forEach((k) => {
    const kw = k.toLowerCase();
    if (kw === q) score += 15;
    else if (kw.startsWith(q)) score += 10;
    else if (kw.includes(q)) score += 4;
  });

  if (item.type === "image") score += 2;

  return score;
}

export function searchSite(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return siteSearchIndex
    .map((item) => ({ item, score: matchScore(item, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
