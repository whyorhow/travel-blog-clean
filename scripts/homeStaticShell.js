/**
 * Homepage static shell — keep in sync with public/index.html and HomeNew.js.
 * @param {string} assetPrefix e.g. '%PUBLIC_URL%' (dev template) or '' (production paths)
 */
function logoImg(assetPrefix, { id } = {}) {
  const p = assetPrefix ? assetPrefix.replace(/\/$/, '') : '';
  const base = p ? `${p}/assets` : '/assets';
  const idAttr = id ? `id="${id}" ` : '';
  return (
    `<img ${idAttr}src="${base}/LogoHero-800.webp" ` +
    `srcset="${base}/LogoHero-800.webp 800w, ${base}/LogoHero.webp 1200w" ` +
    'sizes="(max-width:768px) 95vw, 56rem" alt="Nomad Scribbles" width="1200" height="206" ' +
    'fetchpriority="high" decoding="sync" class="home-shell-logo" />'
  );
}

const HERO_SLOT_HTML =
  '<div class="home-slot-tagline" aria-hidden="true"></div>' +
  '<div class="home-slot-opening" aria-hidden="true"></div>' +
  '<div class="home-slot-pillars" aria-hidden="true"></div>' +
  '<div class="home-slot-arrow" aria-hidden="true"></div>';

const SHELL_STYLES = `<style>
  .home-shell{background:#2e1208;min-height:100vh;overflow-x:hidden;width:100%;margin:0;box-sizing:border-box;display:flex;flex-direction:column}
  .home-hero{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;padding:2rem 1rem 2rem;box-sizing:border-box;width:100%;min-height:65vh;flex:1 0 auto}
  .home-shell-logo{width:95%;max-width:56rem;height:auto;object-fit:contain;display:block;filter:drop-shadow(0 25px 25px rgba(0,0,0,0.15))}
  .home-slot-tagline{margin-top:1rem;width:100%;min-height:72px;flex-shrink:0}
  .home-slot-opening{margin:1.5rem auto 0;width:100%;max-width:64rem;min-height:200px;flex-shrink:0;padding:0 1rem;box-sizing:border-box}
  .home-slot-pillars{margin:2rem auto 0;width:100%;max-width:56rem;min-height:320px;flex-shrink:0;padding:0 1rem;box-sizing:border-box}
  .home-slot-arrow{margin-top:1rem;width:100%;height:3rem;flex-shrink:0}
  .home-torn{height:clamp(40px,6vw,60px);line-height:0;margin:0;background:#50473e;flex-shrink:0}
  .home-explore{min-height:50vh;background:#292524;margin:0;flex-shrink:0}
  .home-footer-spacer{height:3.5rem;background:#aea363;flex-shrink:0;width:100%}
  .home-lcp-persist{display:none}
  @media (max-width:767px){
    .home-lcp-persist{display:flex;position:fixed;top:0;left:0;right:0;z-index:55;justify-content:center;padding:2rem 1rem 0;background:#2e1208;pointer-events:none}
    .home-lcp-persist.is-hidden{visibility:hidden;opacity:0}
  }
  @media (min-width:768px){
    .home-hero{min-height:1100px;padding-top:4rem;padding-bottom:2rem}
    .home-slot-tagline{min-height:88px}
    .home-slot-opening{margin-top:3.5rem;min-height:220px}
    .home-slot-pillars{margin-top:2.5rem;min-height:200px}
    .home-slot-arrow{margin-top:2rem}
    .home-footer-spacer{height:4rem}
  }
</style>`;

function buildLcpPersist(assetPrefix = '') {
  return (
    `<div id="home-lcp-persist" aria-hidden="true">` +
    logoImg(assetPrefix, { id: 'home-lcp-logo-persist' }) +
    `</div>`
  );
}

function buildRootShell(assetPrefix = '') {
  return (
    `<div id="root"><div class="home-shell">` +
    `<section class="home-hero">${logoImg(assetPrefix)}${HERO_SLOT_HTML}</section>` +
    `<div class="home-torn" aria-hidden="true"></div>` +
    `<section class="home-explore" id="explore" aria-hidden="true"></section>` +
    `<div class="home-footer-spacer" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildHomeHtml(assetPrefix = '') {
  return buildLcpPersist(assetPrefix) + buildRootShell(assetPrefix);
}

module.exports = { SHELL_STYLES, buildLcpPersist, buildRootShell, buildHomeHtml };
