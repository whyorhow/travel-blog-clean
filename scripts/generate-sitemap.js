const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.nomadscribbles.com';
const today = new Date().toISOString().split('T')[0];

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/home', priority: '0.8', changefreq: 'weekly' },
  { url: '/adventures', priority: '0.8', changefreq: 'weekly' },
  { url: '/nomads-gallery', priority: '0.7', changefreq: 'weekly' },
  { url: '/contact-us', priority: '0.5', changefreq: 'monthly' },
  { url: '/search', priority: '0.3', changefreq: 'monthly' },
  { url: '/cookie-preferences', priority: '0.1', changefreq: 'yearly' },

  // BRAZIL
  { url: '/brazil', priority: '0.9', changefreq: 'weekly' },
  { url: '/brazil/rio', priority: '0.8', changefreq: 'weekly' },
  { url: '/brazil/salvador', priority: '0.8', changefreq: 'weekly' },
  { url: '/brazil/pantanal', priority: '0.8', changefreq: 'weekly' },
  { url: '/brazil/florianopolis', priority: '0.8', changefreq: 'weekly' },
  { url: '/brazil/saopaulo', priority: '0.8', changefreq: 'weekly' },

  // SÃO PAULO SUB-PAGES
  { url: '/brazil/saopaulo/parks', priority: '0.7', changefreq: 'weekly' },
  { url: '/brazil/saopaulo/museums', priority: '0.7', changefreq: 'weekly' },
  { url: '/brazil/saopaulo/carnival', priority: '0.7', changefreq: 'weekly' },
  { url: '/brazil/saopaulo/murals', priority: '0.7', changefreq: 'weekly' },
  { url: '/brazil/saopaulo/santos', priority: '0.7', changefreq: 'weekly' },

  // SHOP
  { url: '/nomadsshop', priority: '0.7', changefreq: 'weekly' },
  { url: '/nomads-shop', priority: '0.7', changefreq: 'weekly' },
  { url: '/nomads-shop/brazil', priority: '0.7', changefreq: 'weekly' },
  { url: '/nomads-shop/brazil/saopaulo', priority: '0.6', changefreq: 'weekly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map((page) => {
      return `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated at /public/sitemap.xml');

