const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.nomadscribbles.com';
const today = new Date().toISOString().split('T')[0];

const EXCLUDED_PATHS = new Set([
  '/search',
  '/cookie-preferences',
  '/adventures',
]);

/** Shop category slugs from NomadsShopCategory CITY_LABELS */
const SHOP_CITY_PATHS = [
  '/nomads-shop/brazil/rio',
  '/nomads-shop/brazil/salvador',
  '/nomads-shop/brazil/pantanal',
  '/nomads-shop/brazil/foz',
  '/nomads-shop/brazil/bonito',
  '/nomads-shop/brazil/manaus',
];

function priorityFor(path) {
  if (path === '/') return '1.0';
  if (
    path === '/brazil' ||
    path === '/belgium' ||
    path === '/greece' ||
    path === '/hungary' ||
    path === '/austria' ||
    path === '/czech-republic' ||
    path === '/united-states' ||
    path === '/germany'
  ) {
    return '0.9';
  }
  if (path.startsWith('/nomads-shop') || path.includes('/saopaulo/') || path.includes('/rio/')) return '0.7';
  if (path === '/contact-us' || path === '/nomads-gallery') return '0.6';
  return '0.8';
}

function changefreqFor(path) {
  if (path === '/contact-us') return 'monthly';
  if (path.startsWith('/nomads-shop')) return 'weekly';
  return 'weekly';
}

function extractPathsFromRoutes() {
  const routesFile = path.join(__dirname, '../src/config/routes.js');
  const content = fs.readFileSync(routesFile, 'utf8');
  const paths = new Set();

  for (const line of content.split('\n')) {
    const match = line.match(/path:\s*"([^"]+)"/);
    if (!match) continue;

    const routePath = match[1];
    if (routePath === '*') continue;
    if (routePath.includes(':')) continue;
    if (line.includes('<Navigate')) continue;
    if (EXCLUDED_PATHS.has(routePath)) continue;

    paths.add(routePath);
  }

  SHOP_CITY_PATHS.forEach((p) => paths.add(p));

  return [...paths].sort((a, b) => a.localeCompare(b));
}

const pages = extractPathsFromRoutes().map((url) => ({
  url,
  priority: priorityFor(url),
  changefreq: changefreqFor(url),
}));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url === '/' ? '/' : page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, sitemap);
console.log(`Sitemap generated: ${pages.length} URLs → ${outPath}`);
