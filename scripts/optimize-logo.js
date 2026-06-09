/**
 * Regenerate homepage LCP logo WebP assets from LogoV5.svg.
 * Run: npm run optimize:logo
 */
const path = require('path');
const sharp = require('sharp');

const SOURCE = path.join(__dirname, '../public/assets/LogoV5.svg');
const OUTPUTS = [
  { file: 'LogoHero-800.webp', width: 800, quality: 80 },
  { file: 'LogoHero.webp', width: 1200, quality: 82 },
];

async function main() {
  for (const { file, width, quality } of OUTPUTS) {
    const out = path.join(__dirname, '../public/assets', file);
    const info = await sharp(SOURCE, { density: 150 })
      .resize(width)
      .webp({ quality, effort: 6 })
      .toFile(out);
    console.log(`${file}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KiB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
