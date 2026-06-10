/**
 * Self-host Brazil Food & Drink mobile LCP hero from Cloudinary source.
 * Run: npm run optimize:food-drink-hero
 * Source: brazilFoodDrink.hero.config.js fallback tier.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { cloudinaryImageUrl } = require('./routeLcpPreload.cjs');

/** Legacy Cloudinary path — config publicId is Brazil/Food-Drink/Food-backup */
const FOOD_DRINK_HERO_ID = 'Food-Drink/Food-backup';
const FOOD_DRINK_HERO_VERSION = 1779186247;

const SOURCE_URL = cloudinaryImageUrl(FOOD_DRINK_HERO_ID, {
  width: 800,
  version: FOOD_DRINK_HERO_VERSION,
});
const OUTPUT = path.join(__dirname, '../public/assets/food-drink-hero-400.webp');
const WIDTH = 400;
const QUALITY = 78;

async function main() {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch hero: ${response.status} ${SOURCE_URL}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const meta = await sharp(buffer).metadata();
  const webpBuffer = await sharp(buffer)
    .resize(WIDTH)
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();
  await fs.promises.writeFile(OUTPUT, webpBuffer);
  const height = meta.width && meta.height ? Math.round((WIDTH * meta.height) / meta.width) : 534;
  console.log(
    `food-drink-hero-400.webp: ${WIDTH}x${height}, ${(webpBuffer.length / 1024).toFixed(1)} KiB`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
