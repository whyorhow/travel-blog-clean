/**
 * Self-host Brazil hub LCP hero from Cloudinary source.
 * Run: npm run optimize:brazil-hero
 * Re-run when brazil.hero.config.js fallback publicId/version changes.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { cloudinaryImageUrl } = require('./routeLcpPreload.cjs');

const SOURCE_URL = cloudinaryImageUrl('Brazil/Brazil-hero', {
  width: 800,
  version: 1779448919,
});
const OUTPUT = path.join(__dirname, '../public/assets/brazil-hero-400.webp');
const WIDTH = 400;
const QUALITY = 78;

async function main() {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch hero: ${response.status} ${SOURCE_URL}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const info = await sharp(buffer)
    .resize(WIDTH)
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(OUTPUT);
  console.log(
    `brazil-hero-400.webp: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KiB`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
