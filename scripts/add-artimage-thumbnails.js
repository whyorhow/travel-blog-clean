/**
 * Adds cloudinary.thumbnail from blog/small paths (…/small/… → …/thumbnails/…).
 * Upload matching files to Cloudinary, then set REACT_APP_FILMSTRIP_THUMBNAILS=true.
 * Until then, compact filmstrips use /small at low width (no 404s).
 * Run: node scripts/add-artimage-thumbnails.js
 */
const fs = require("fs");
const path = require("path");

const SOURCE = path.join(__dirname, "..", "src", "assets", "artImages.json");

function deriveThumbnail(publicId) {
  if (!publicId || typeof publicId !== "string") return null;
  if (/\/thumbnails?\//i.test(publicId)) return publicId;
  if (/\/small\//i.test(publicId)) return publicId.replace(/\/small\//i, "/thumbnails/");
  const parts = publicId.split("/");
  if (parts.length < 2) return null;
  const file = parts.pop();
  return [...parts, "thumbnails", file].join("/");
}

function main() {
  const catalog = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
  let added = 0;

  for (const item of catalog) {
    if (!item.cloudinary) continue;
    if (item.cloudinary.thumbnail) continue;
    const thumb =
      deriveThumbnail(item.cloudinary.blog) ||
      deriveThumbnail(item.cloudinary.gallery?.replace(/z$/i, ""));
    if (thumb) {
      item.cloudinary.thumbnail = thumb;
      added += 1;
    }
  }

  fs.writeFileSync(SOURCE, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Added thumbnail to ${added} of ${catalog.length} items in artImages.json`);
}

main();
