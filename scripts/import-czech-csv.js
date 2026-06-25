/**
 * Import Czech-image-table.csv into artImages.json.
 * Run: node scripts/import-czech-csv.js
 *
 * CSV `category` column = section:
 *   Prague      → /czech-republic/prague
 *   Kutná Hoar  → /czech-republic/prague (subsection on Prague page)
 *   Nature & Wilderness → /czech-republic/bohemian-wilderness
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CSV_PATH = path.join(ROOT, "public", "assets", "Czech-image-table.csv");
const ART_IMAGES = path.join(ROOT, "src", "assets", "artImages.json");

const REGION_TO_STORY = {
  Prague: { storyLink: "/czech-republic/prague", slug: "prague" },
  "Kutná Hora": { storyLink: "/czech-republic/prague", slug: "prague" },
  Nature: { storyLink: "/czech-republic/bohemian-wilderness", slug: "bohemian-wilderness" },
  "Nature & Wilderness": {
    storyLink: "/czech-republic/bohemian-wilderness",
    slug: "bohemian-wilderness",
  },
};

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeRegion(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return null;
  if (REGION_TO_STORY[trimmed]) return trimmed;

  const lower = trimmed.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (lower.startsWith("kutn")) return "Kutná Hora";
  if (lower === "prague") return "Prague";
  if (lower === "nature") return "Nature & Wilderness";
  if (lower.includes("wilderness")) return "Nature & Wilderness";

  return null;
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
    blog: `Czech/Small/${id}`,
    lightbox: `Czech/Full/${id}`,
    gallery: `Czech/Small/${id}z`,
    thumbnail: `Czech/Thumbnail/${id}`,
  };
}

function main() {
  const csvText = fs.readFileSync(CSV_PATH, "utf8");
  const rows = parseCsv(csvText);
  const [header, ...dataRows] = rows;
  const col = Object.fromEntries(header.map((name, i) => [name, i]));

  const catalog = JSON.parse(fs.readFileSync(ART_IMAGES, "utf8"));
  const filtered = catalog.filter(
    (item) => !String(item.storyLink || "").startsWith("/czech-republic/")
  );
  const usedIds = new Set(filtered.map((item) => item.id));

  const entries = [];

  for (const cells of dataRows) {
    const filename = cells[col.filename];
    const title = cells[col.title]?.trim();
    if (!filename || !title) continue;

    const region = normalizeRegion(cells[col.category]?.trim() || cells[col.location]?.trim());
    const mapping = region ? REGION_TO_STORY[region] : null;
    if (!mapping) {
      console.warn(`Skipping ${filename}: unknown section "${cells[col.category] || cells[col.location] || ""}"`);
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

    if (/hero for/i.test(altText)) {
      console.warn(`Skipping ${filename}: hero-only (use *-backup on page hero, not in story/gallery)`);
      continue;
    }

    entries.push({
      id,
      title,
      description,
      altText,
      category: region,
      storyLink: mapping.storyLink,
      cloudinary: cloudinaryPaths(filename),
      shopLink: `/nomads-shop/czech-republic/${mapping.slug}?category=${encodeURIComponent(region)}`,
      gumroadLink: "https://nomadscribbles.gumroad.com/",
    });
  }

  const next = [...filtered, ...entries];

  fs.writeFileSync(ART_IMAGES, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  console.log(`Added ${entries.length} Czech images (${next.length} total in catalog).`);
}

main();
