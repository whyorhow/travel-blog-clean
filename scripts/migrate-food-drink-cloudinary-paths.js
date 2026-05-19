/**
 * Rewrites Food & Drink Cloudinary public IDs:
 *   Brazilian Additionals/{Small|Full|thumbnails}/… → Food&Drink/{Small|Full|Thumbnail}/…
 *
 * Run: node scripts/migrate-food-drink-cloudinary-paths.js
 * Then: node scripts/generate-art-slices.js
 */
const fs = require("fs");
const path = require("path");

const FROM = "Brazilian Additionals";
const TO = "Food-Drink";

function remapPublicId(publicId) {
  if (!publicId || typeof publicId !== "string") return publicId;
  if (!publicId.startsWith(`${FROM}/`)) return publicId;

  const rest = publicId.slice(FROM.length + 1);
  if (rest.startsWith("thumbnails/")) {
    return `${TO}/Thumbnail/${rest.slice("thumbnails/".length)}`;
  }
  return `${TO}/${rest}`;
}

function migrateCloudinary(cloudinary) {
  if (!cloudinary || typeof cloudinary !== "object") return cloudinary;
  const next = { ...cloudinary };
  for (const key of Object.keys(next)) {
    if (typeof next[key] === "string") {
      next[key] = remapPublicId(next[key]);
    }
  }
  return next;
}

function shouldMigrateItem(item) {
  return item?.category === "Food & Drink" || item?.storyLink === "/brazil/food-drink";
}

function migrateStringInFile(filePath, isFoodDrinkOnly) {
  if (!fs.existsSync(filePath)) return 0;
  let raw = fs.readFileSync(filePath, "utf8");
  const before = raw;
  if (isFoodDrinkOnly) {
    raw = raw.replaceAll(`"${FROM}/thumbnails/`, `"${TO}/Thumbnail/`);
    raw = raw.replaceAll(`"${FROM}/`, `"${TO}/`);
    raw = raw.replaceAll(`'${FROM}/thumbnails/`, `'${TO}/Thumbnail/`);
    raw = raw.replaceAll(`'${FROM}/`, `'${TO}/`);
  }
  if (raw !== before) {
    fs.writeFileSync(filePath, raw, "utf8");
    return 1;
  }
  return 0;
}

function main() {
  const artImagesPath = path.join(process.cwd(), "src", "assets", "artImages.json");
  const catalog = JSON.parse(fs.readFileSync(artImagesPath, "utf8"));
  let migratedItems = 0;

  const nextCatalog = catalog.map((item) => {
    if (!shouldMigrateItem(item)) return item;
    const cloudinary = migrateCloudinary(item.cloudinary);
    if (JSON.stringify(cloudinary) === JSON.stringify(item.cloudinary)) return item;
    migratedItems++;
    return { ...item, cloudinary };
  });

  fs.writeFileSync(artImagesPath, `${JSON.stringify(nextCatalog, null, 2)}\n`, "utf8");

  const extraFiles = [
    path.join(process.cwd(), "src", "pages", "brazil", "brazilFoodDrink.hero.config.js"),
    path.join(process.cwd(), "src", "pages", "Brazil.js"),
  ];

  let extraUpdated = 0;
  for (const filePath of extraFiles) {
    extraUpdated += migrateStringInFile(filePath, true);
  }

  console.log(`Migrated ${migratedItems} Food & Drink items in artImages.json`);
  console.log(`Updated ${extraUpdated} page config file(s)`);
  console.log(`Path mapping: ${FROM}/* → ${TO}/* (thumbnails → Thumbnail)`);
}

main();
