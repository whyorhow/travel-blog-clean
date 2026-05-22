/**
 * Migrates São Paulo Cloudinary public IDs and storyLink routes to the
 * Brazil/Sao Paulo/* staging layout.
 *
 * Run: node scripts/migrate-saopaulo-cloudinary-paths.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "src", "assets", "artImages.json");

const CLOUDINARY_PREFIX_MAP = [
  ["SaoPauloLanding/", "Brazil/Sao Paulo/Landing/"],
  ["SP-Parks/", "Brazil/Sao Paulo/Green Spaces/"],
  ["ArtGallery/", "Brazil/Sao Paulo/Galleries/"],
  ["CarnivalSP/", "Brazil/Sao Paulo/Carnival/"],
  ["Murals/", "Brazil/Sao Paulo/Street Art/"],
];

const STORY_LINK_MAP = [
  ["/brazil/saopaulo/parks", "/brazil/saopaulo/green-spaces"],
  ["/brazil/saopaulo/murals", "/brazil/saopaulo/street-art"],
  ["/brazil/saopaulo/museums", "/brazil/saopaulo/galleries"],
];

function migrateString(value) {
  if (typeof value !== "string") return value;
  let next = value;
  for (const [from, to] of CLOUDINARY_PREFIX_MAP) {
    next = next.split(from).join(to);
  }
  for (const [from, to] of STORY_LINK_MAP) {
    next = next.split(from).join(to);
  }
  return next;
}

function migrateValue(value) {
  if (typeof value === "string") return migrateString(value);
  if (Array.isArray(value)) return value.map(migrateValue);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      out[key] = migrateValue(val);
    }
    return out;
  }
  return value;
}

function main() {
  const catalog = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
  if (!Array.isArray(catalog)) {
    throw new Error("artImages.json must be an array");
  }

  const migrated = catalog.map(migrateValue);
  fs.writeFileSync(SOURCE, `${JSON.stringify(migrated, null, 2)}\n`, "utf8");

  const counts = Object.fromEntries(
    CLOUDINARY_PREFIX_MAP.map(([from]) => [
      from.replace(/\/$/, ""),
      JSON.stringify(migrated).split(from.replace(/\/$/, "")).length - 1,
    ])
  );

  console.log("Migrated artImages.json Cloudinary prefixes:", counts);
  console.log("Story links normalized to green-spaces, street-art, galleries.");
}

main();
