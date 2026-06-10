/**
 * Brazil hub static shell — hero paints before React hydrates (mobile LCP).
 * Persist layer lives OUTSIDE #root so createRoot does not wipe it.
 * Keep hero URL in sync with scripts/routeLcpPreload.cjs and brazil.hero.config.js.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const SHELL_STYLES = `<style>
  .brazil-lcp-persist{position:fixed;inset:0;z-index:9998;pointer-events:none;background:linear-gradient(180deg,#bab592 0%,#bdb58f 20%,#c4bc8a 38%,#cdb878 55%,#d4b060 72%,#d4af5a 85%,#c9a040 93%,#b8860b 100%);transition:opacity .15s ease}
  .brazil-hero-wrap{display:flex;justify-content:center;padding:calc(48px + 3rem) 1rem 1.5rem;box-sizing:border-box}
  .brazil-shell-hero{display:block;width:100%;max-width:600px;height:auto;object-fit:contain;aspect-ratio:4/3}
</style>`;

function brazilHeroImgMarkup() {
  const heroSrc = ROUTE_LCP_PRELOAD['/brazil'] || '';
  if (!heroSrc) {
    return '<div class="brazil-shell-hero" style="width:100%;max-width:600px;aspect-ratio:4/3" aria-hidden="true"></div>';
  }
  return (
    `<img src="${heroSrc}" alt="" width="600" height="450" fetchpriority="high" decoding="sync" class="brazil-shell-hero" />`
  );
}

function buildBrazilPersistLayer() {
  return (
    `<div id="brazil-lcp-persist" class="brazil-lcp-persist" aria-hidden="true">` +
    `<div class="brazil-hero-wrap">${brazilHeroImgMarkup()}</div>` +
    `</div>`
  );
}

module.exports = { SHELL_STYLES, buildBrazilPersistLayer };
