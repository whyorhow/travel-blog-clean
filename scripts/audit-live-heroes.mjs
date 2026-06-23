import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitemap = fs.readFileSync(path.join(__dirname, '../public/sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.nomadscribbles\.com([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

const inj = fs.readFileSync(path.join(__dirname, 'inject-static-meta.js'), 'utf8');
const shellBlock = inj.match(/const MOBILE_LCP_SHELLS = \{([\s\S]*?)\n\};/)[1];
const shellRoutes = [...shellBlock.matchAll(/'([^']+)':/g)].map((m) => m[1]);

const BASE = 'https://www.nomadscribbles.com';
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15';

async function audit(routePath) {
  const res = await fetch(`${BASE}${routePath}`, { headers: { 'User-Agent': UA } });
  const html = await res.text();
  const isHome = routePath === '/';
  return {
    path: routePath,
    status: res.status,
    bytes: html.length,
    shell: shellRoutes.includes(routePath),
    homeShell: isHome && html.includes('home-shell'),
    inlineHero: /data:image\/webp/.test(html),
    heroPreload: /<link[^>]+rel="preload"[^>]+as="image"[^>]+hero-400/.test(html),
    staticHeroId: html.match(/id="([^"]*-static-hero)"/)?.[1] ?? null,
    canonical: html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? null,
    titleOk: html.includes('<title>') && !html.includes('&amp; Beyond</title>') || isHome,
    title: html.match(/<title>([^<]+)/)?.[1]?.replace(/&amp;/g, '&').slice(0, 55),
  };
}

const results = [];
for (const routePath of routes) {
  results.push(await audit(routePath));
  process.stdout.write('.');
}
console.log('\n');

const shells = results.filter((r) => r.shell);
const home = results.find((r) => r.path === '/');
const gaps = results.filter((r) => !r.shell && r.path !== '/');

console.log('=== Coverage ===');
console.log(`Sitemap: ${routes.length} URLs`);
console.log(`Tier A travel shells: ${shells.length}`);
console.log(`Home static shell: ${home?.homeShell ? 'yes' : 'no'}`);
console.log(`Remaining (no mobile LCP shell): ${gaps.length}`);

console.log('\n=== Tier A health (live) ===');
console.log(`Inline data-URI heroes: ${shells.filter((r) => r.inlineHero).length}/${shells.length}`);
console.log(`Stale hero-400 preload: ${shells.filter((r) => r.heroPreload).length}`);
console.log(`Per-route canonical: ${results.filter((r) => r.canonical?.endsWith(r.path || '/')).length}/${results.length}`);
const missingInline = shells.filter((r) => !r.inlineHero);
if (missingInline.length) {
  console.log('Missing inline hero:', missingInline.map((r) => r.path).join(', '));
}

console.log('\n=== HTML payload (mobile shell, KiB) ===');
const bySize = [...shells].sort((a, b) => b.bytes - a.bytes).slice(0, 8);
bySize.forEach((r) => console.log(`  ${(r.bytes / 1024).toFixed(1)} KiB  ${r.path}`));

console.log('\n=== Optimization gaps ===');
gaps.forEach((r) => console.log(`  ${r.path} — ${(r.bytes / 1024).toFixed(1)} KiB — ${r.title}`));

console.log('\n=== Home ===');
console.log(`  ${(home.bytes / 1024).toFixed(1)} KiB, logo shell: ${home.homeShell}, inline map hero: no (by design)`);
