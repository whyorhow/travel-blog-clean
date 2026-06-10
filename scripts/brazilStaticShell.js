/**
 * Brazil hub static shell — hero paints before React hydrates (mobile LCP).
 * Keep hero URL in sync with scripts/routeLcpPreload.cjs and brazil.hero.config.js.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const SHELL_STYLES = `<style>
  .brazil-shell{background:linear-gradient(180deg,#bab592 0%,#bdb58f 20%,#c4bc8a 38%,#cdb878 55%,#d4b060 72%,#d4af5a 85%,#c9a040 93%,#b8860b 100%);min-height:100vh;margin:0;box-sizing:border-box}
  .brazil-hero-wrap{display:flex;justify-content:center;padding:3rem 1rem 1.5rem;box-sizing:border-box}
  .brazil-shell-hero{display:block;width:100%;max-width:600px;height:auto;object-fit:contain;aspect-ratio:4/3}
</style>`;

function buildBrazilRootShell() {
  const heroSrc = ROUTE_LCP_PRELOAD['/brazil'] || '';
  const heroImg = heroSrc
    ? `<img src="${heroSrc}" alt="Brazil travel journal" width="600" height="450" fetchpriority="high" decoding="sync" class="brazil-shell-hero" />`
    : '<div class="brazil-shell-hero" style="width:100%;max-width:600px;aspect-ratio:4/3" aria-hidden="true"></div>';

  return (
    `<div id="root"><div class="brazil-shell">` +
    `<div class="brazil-hero-wrap">${heroImg}</div>` +
    `</div></div>`
  );
}

module.exports = { SHELL_STYLES, buildBrazilRootShell };
