const paths = ['/', '/brazil', '/greece', '/brazil/saopaulo', '/united-states/tennessee/nashville', '/nomads-gallery', '/contact-us'];
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)';

for (const p of paths) {
  const res = await fetch(`https://www.nomadscribbles.com${p}`, { headers: { 'User-Agent': UA } });
  const h = await res.text();
  console.log(JSON.stringify({
    path: p,
    status: res.status,
    title: h.match(/<title>([^<]+)/)?.[1],
    inlineHero: /data:image\/webp/.test(h),
    staticHeroId: h.match(/id="([^"]*static-hero[^"]*)"/)?.[1] ?? null,
    homeLogo: h.includes('home-lcp-logo') || h.includes('home-shell-logo'),
    canonical: h.match(/rel="canonical" href="([^"]+)"/)?.[1],
    ogUrl: h.match(/property="og:url" content="([^"]+)"/)?.[1],
    bytes: h.length,
  }));
}
