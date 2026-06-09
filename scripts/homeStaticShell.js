/**
 * Homepage static shell — keep in sync with public/index.html and HomeNew.js phase-1 layout.
 * @param {string} assetPrefix e.g. '%PUBLIC_URL%' (dev template) or '' (production paths)
 */
function logoImg(assetPrefix) {
  const p = assetPrefix ? assetPrefix.replace(/\/$/, '') : '';
  const base = p ? `${p}/assets` : '/assets';
  return (
    `<img src="${base}/LogoHero-800.webp" ` +
    `srcset="${base}/LogoHero-800.webp 800w, ${base}/LogoHero.webp 1200w" ` +
    'sizes="(max-width:768px) 95vw, 56rem" alt="Nomad Scribbles" width="1200" height="206" ' +
    'fetchpriority="high" decoding="async" class="home-shell-logo" />'
  );
}

const SHELL_STYLES = `<style>
  .home-shell{background:#2e1208;min-height:100vh;overflow-x:hidden;width:100%;margin:0;box-sizing:border-box}
  .home-hero{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;padding:2rem 1rem 2rem;box-sizing:border-box;width:100%;min-height:65vh}
  .home-shell-logo{width:95%;max-width:56rem;height:auto;object-fit:contain;display:block;filter:drop-shadow(0 25px 25px rgba(0,0,0,0.15))}
  .home-torn{height:clamp(40px,6vw,60px);line-height:0;margin:0;background:#50473e}
  .home-explore{min-height:50vh;background:#292524;margin:0}
  @media (min-width:768px){
    .home-hero{min-height:1100px;padding-top:4rem;padding-bottom:2rem}
  }
</style>`;

function buildRootShell(assetPrefix = '') {
  return (
    `<div id="root"><div class="home-shell">` +
    `<section class="home-hero">${logoImg(assetPrefix)}</section>` +
    `<div class="home-torn" aria-hidden="true"></div>` +
    `<section class="home-explore" id="explore" aria-hidden="true"></section>` +
    `</div></div>`
  );
}

module.exports = { SHELL_STYLES, buildRootShell };
