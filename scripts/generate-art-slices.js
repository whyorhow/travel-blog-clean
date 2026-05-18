/**
 * Splits artImages.json into page-sized slices for code-splitting.
 * Run via prebuild: npm run build / npm start (after prebuild hook).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "src", "assets", "artImages.json");
const OUT_DIR = path.join(ROOT, "src", "assets", "artImages", "slices");

const SAO_PAULO_CATEGORIES = ["City Life", "Parks", "ArtGallery", "Murals", "Carnival"];
const ART_GALLERY_CATEGORIES = ["ArtGallery", "Museums"];
const SHOP_BRAZIL_CATEGORIES = [
  "Rio",
  "Salvador",
  "Pantanal",
  "City Life",
  "Parks",
  "Murals",
  "Santos",
  "Carnival",
  "Museums",
];

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function storySlug(storyLink) {
  return slugify(storyLink.replace(/^\/+/, "").replace(/\//g, "-"));
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function slimForGallery(item) {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    storyLink: item.storyLink,
    cloudinary: item.cloudinary,
    gumroadLink: item.gumroadLink,
    shopLink: item.shopLink,
  };
}

function main() {
  const catalog = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
  if (!Array.isArray(catalog)) {
    throw new Error("artImages.json must be an array");
  }

  fs.rmSync(OUT_DIR, { recursive: true, force: true });

  const byCategory = new Map();
  const byStory = new Map();

  for (const item of catalog) {
    if (item.category) {
      const key = slugify(item.category);
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key).push(item);
    }
    if (item.storyLink) {
      const key = storySlug(item.storyLink);
      if (!byStory.has(key)) byStory.set(key, []);
      byStory.get(key).push(item);
    }
  }

  const manifest = { categories: [], stories: [], bundles: [], legacy: [] };

  for (const [slug, items] of byCategory.entries()) {
    const rel = `category/${slug}.json`;
    writeJson(path.join(OUT_DIR, rel), items);
    manifest.categories.push({ slug, count: items.length, file: rel });
  }

  for (const [slug, items] of byStory.entries()) {
    const rel = `story/${slug}.json`;
    writeJson(path.join(OUT_DIR, rel), items);
    manifest.stories.push({ slug, count: items.length, file: rel });
  }

  const bundles = {
    "saopaulo.json": catalog.filter((i) => SAO_PAULO_CATEGORIES.includes(i.category)),
    "art-galleries.json": catalog.filter((i) => ART_GALLERY_CATEGORIES.includes(i.category)),
    "shop-brazil.json": catalog.filter((i) => SHOP_BRAZIL_CATEGORIES.includes(i.category)),
    "gallery-pool.json": catalog.filter((i) => i.cloudinary?.gallery).map(slimForGallery),
  };

  for (const [name, items] of Object.entries(bundles)) {
    const rel = `bundles/${name}`;
    writeJson(path.join(OUT_DIR, rel), items);
    manifest.bundles.push({ name, count: items.length, file: rel });
  }

  const legacy = {
    "athens.json": catalog.filter(
      (i) => i.image && String(i.image).includes("/Greece/Athens/Small/")
    ),
    "budapest.json": catalog.filter(
      (i) => i.image && String(i.image).includes("/Hungary/Budapest/Small/")
    ),
  };

  for (const [name, items] of Object.entries(legacy)) {
    const rel = `legacy/${name}`;
    writeJson(path.join(OUT_DIR, rel), items);
    manifest.legacy.push({ name, count: items.length, file: rel });
  }

  manifest.generatedAt = new Date().toISOString();
  manifest.sourceCount = catalog.length;
  writeJson(path.join(OUT_DIR, "manifest.json"), manifest);

  console.log(
    `Art slices: ${catalog.length} items → ${manifest.categories.length} categories, ` +
      `${manifest.stories.length} stories, ${manifest.bundles.length} bundles, ` +
      `${manifest.legacy.length} legacy`
  );
}

main();
