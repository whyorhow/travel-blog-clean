/**
 * Import Berlin-Imagetable.csv into artImages.json.
 * Run: node scripts/import-berlin-csv.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CSV_PATH = path.join(ROOT, "public", "assets", "Berlin-Imagetable.csv");
const ART_IMAGES = path.join(ROOT, "src", "assets", "artImages.json");

const REGION_TO_STORY = {
  Berlin: { storyLink: "/germany/berlin", folder: "Berlin", slug: "berlin" },
};

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field.trim());
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && next === "\n") i += 1;
      row.push(field.trim());
      field = "";
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

function cloudinaryPaths(filename) {
  const id = String(filename).trim();
  return {
    blog: `Germany/Berlin/Small/${id}`,
    lightbox: `Germany/Berlin/Full/${id}`,
    gallery: `Germany/Berlin/Small/${id}z`,
    thumbnail: `Germany/Berlin/Thumbnail/${id}`,
  };
}

function main() {
  const csvText = fs.readFileSync(CSV_PATH, "utf8");
  const rows = parseCsv(csvText);
  const [header, ...dataRows] = rows;
  const col = Object.fromEntries(header.map((name, i) => [name, i]));

  const catalog = JSON.parse(fs.readFileSync(ART_IMAGES, "utf8"));
  const filtered = catalog.filter(
    (item) => !String(item.storyLink || "").startsWith("/germany/")
  );
  const usedIds = new Set(filtered.map((item) => item.id));

  const entries = [];

  for (const cells of dataRows) {
    const filename = cells[col.filename];
    const title = cells[col.title]?.trim();
    if (!filename || !title) continue;

    const region = "Berlin";
    const subCategory = cells[col.category]?.trim();
    const mapping = REGION_TO_STORY[region];
    if (!mapping) {
      console.warn(`Skipping ${filename}: unknown region "${region}"`);
      continue;
    }

    const filenameSlug = slugify(filename);
    let id = slugify(title);
    if (!id) id = filenameSlug;
    else id = `${id}-${filenameSlug}`;
    if (usedIds.has(id)) {
      let n = 2;
      while (usedIds.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }
    usedIds.add(id);

    const description = cells[col.description]?.trim() || "";
    const altText = cells[col.altText]?.trim() || title;

    entries.push({
      id,
      title,
      description,
      altText,
      category: subCategory,
      storyLink: mapping.storyLink,
      cloudinary: cloudinaryPaths(filename),
      shopLink: `/nomads-shop/germany/${mapping.slug}?category=${encodeURIComponent(subCategory || "")}`,
      gumroadLink: "https://nomadscribbles.gumroad.com/",
    });
  }

  const next = [...filtered, ...entries];

  fs.writeFileSync(ART_IMAGES, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  console.log(`Added ${entries.length} Berlin images (${next.length} total in catalog).`);
}

main();