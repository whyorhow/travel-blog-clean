/**
 * Self-host São Paulo mobile LCP hero from Cloudinary source.
 * Run: npm run optimize:saopaulo-hero
 * Re-run when SaoPaulo.js SAO_PAULO_HERO_VERSION changes.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { cloudinaryImageUrl } = require('./routeLcpPreload.cjs');

/** Legacy Cloudinary public ID (see src/utils/cloudinary.js BRAZIL_LEGACY_PREFIXES). */
const SAO_PAULO_HERO_ID = 'SaoPauloLanding/SaoPaulo-Hero';
const SAO_PAULO_HERO_VERSION = 1779120039;

const SOURCE_URL = cloudinaryImageUrl(SAO_PAULO_HERO_ID, {
  width: 800,
  version: SAO_PAULO_HERO_VERSION,
});
const OUTPUT = path.join(__dirname, '../public/assets/saopaulo-hero-400.webp');
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
  const height = meta.width && meta.height ? Math.round((WIDTH * meta.height) / meta.width) : 300;
  console.log(
    `saopaulo-hero-400.webp: ${WIDTH}x${height}, ${(webpBuffer.length / 1024).toFixed(1)} KiB`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
