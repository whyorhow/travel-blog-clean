/**
 * Manaus — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #manaus-static-hero exists.
 */
const { MANAUS_HERO_DATA_URI } = require('./manaus-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.manaus-static-page{margin:0;background:#000}
  #manaus-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #manaus-static-hero .manaus-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #manaus-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #manaus-static-hero .manaus-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  @media (min-width:768px){#manaus-static-hero{display:none}body.manaus-static-page{background:transparent}}
</style>`;

function buildManausStaticHero() {
  const heroSrc = MANAUS_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="manaus-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="manaus-static-hero">` +
    `<div class="manaus-static-hero-frame">` +
    `<img class="static-hero-primary manaus-static-hero-primary" src="${heroSrc}" alt="Manaus Amazon gateway journal entry" width="400" height="513" fetchpriority="high" decoding="sync" />` +
    `<div class="manaus-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildManausBodyPrefix() {
  return buildManausStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildManausBodyPrefix,
  BODY_CLASS: 'manaus-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
