/**
 * Prepends Brazil/ to Brazilian Cloudinary public IDs and local /images/ paths.
 * Folder names are unchanged — only the parent Brazil/ segment is added.
 *
 * Run: node scripts/migrate-brazil-cloudinary-paths.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "src", "assets", "artImages.json");

/** Cloudinary top-level folders moved under Brazil/ (São Paulo already migrated). */
const CLOUDINARY_PREFIXES = [
  "Bonito/",
  "Floripa/",
  "Food-Drink/",
  "Iguazu/",
  "IlhaGrande/",
  "Manaus/",
  "Natural Spaces/",
  "Pantanal/",
  "Rio/",
  "Salvador/",
  "Santos/",
];

/** Local public/image paths — preserve existing folder spelling. */
const LOCAL_IMAGE_REPLACEMENTS = [
  ["/images/Bonito/", "/images/Brazil/Bonito/"],
  ["/images/Floripa/", "/images/Brazil/Floripa/"],
  ["/images/Food-Drink/", "/images/Brazil/Food-Drink/"],
  ["/images/Iguazu/", "/images/Brazil/Iguazu/"],
  ["/images/Ilha Grande/", "/images/Brazil/IlhaGrande/"],
  ["/images/IlhaGrande/", "/images/Brazil/IlhaGrande/"],
  ["/images/Manaus/", "/images/Brazil/Manaus/"],
  ["/images/Natural Spaces/", "/images/Brazil/Natural Spaces/"],
  ["/images/Pantanal/", "/images/Brazil/Pantanal/"],
  ["/images/Rio/", "/images/Brazil/Rio/"],
  ["/images/Salvador/", "/images/Brazil/Salvador/"],
  ["/images/Santos/", "/images/Brazil/Santos/"],
];

function migrateCloudinaryString(value) {
  if (typeof value !== "string") return value;
  if (!value || value.startsWith("http") || value.startsWith("Brazil/")) return value;

  for (const prefix of CLOUDINARY_PREFIXES) {
    if (value.startsWith(prefix)) {
      return `Brazil/${value}`;
    }
  }

  return value;
}

function migrateLocalImageString(value) {
  if (typeof value !== "string") return value;
  let next = value;
  for (const [from, to] of LOCAL_IMAGE_REPLACEMENTS) {
    if (next.includes(from) && !next.includes(to)) {
      next = next.split(from).join(to);
    }
  }
  return next;
}

function migrateString(value) {
  return migrateLocalImageString(migrateCloudinaryString(value));
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

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      walkDir(full, files);
    } else if (/\.(js|jsx|json)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function migrateFile(filePath) {
  if (filePath.endsWith(`${path.sep}cloudinary.js`)) return false;

  const original = fs.readFileSync(filePath, "utf8");
  let next = original;

  for (const prefix of CLOUDINARY_PREFIXES) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<!Brazil/)${escaped}`, "g");
    next = next.replace(re, `Brazil/${prefix}`);
  }

  for (const [from, to] of LOCAL_IMAGE_REPLACEMENTS) {
    if (next.includes(from) && !next.includes(to)) {
      next = next.split(from).join(to);
    }
  }

  if (next !== original) {
    fs.writeFileSync(filePath, next, "utf8");
    return true;
  }
  return false;
}

function main() {
  const catalog = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
  if (!Array.isArray(catalog)) {
    throw new Error("artImages.json must be an array");
  }

  const migrated = catalog.map(migrateValue);
  fs.writeFileSync(SOURCE, `${JSON.stringify(migrated, null, 2)}\n`, "utf8");

  const srcDir = path.join(ROOT, "src");
  const updatedFiles = walkDir(srcDir).filter((file) => {
    if (file === SOURCE) return false;
    return migrateFile(file);
  });

  const counts = Object.fromEntries(
    CLOUDINARY_PREFIXES.map((prefix) => [
      prefix.replace(/\/$/, ""),
      JSON.stringify(migrated).split(`Brazil/${prefix.replace(/\/$/, "")}`).length - 1,
    ])
  );

  console.log("Migrated artImages.json — Brazil/* counts:", counts);
  console.log(`Updated ${updatedFiles.length} source files:`);
  updatedFiles.forEach((file) => console.log(`  ${path.relative(ROOT, file)}`));
}

main();
