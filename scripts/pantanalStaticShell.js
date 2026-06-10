/**
 * Pantanal — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #pantanal-static-hero exists.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const SHELL_STYLES = `<style>
  body.pantanal-static-page{margin:0;background:#000}
  #pantanal-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #pantanal-static-hero .pantanal-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #pantanal-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #pantanal-static-hero .pantanal-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.15);pointer-events:none}
  @media (min-width:768px){#pantanal-static-hero{display:none}body.pantanal-static-page{background:transparent}}
</style>`;

function buildPantanalStaticHero() {
  const heroSrc = ROUTE_LCP_PRELOAD['/brazil/pantanal'] || '';
  if (!heroSrc) {
    return '<div id="pantanal-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="pantanal-static-hero">` +
    `<div class="pantanal-static-hero-frame">` +
    `<img class="static-hero-primary pantanal-static-hero-primary" src="${heroSrc}" alt="Pantanal wetland journal entry" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<div class="pantanal-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildPantanalBodyPrefix() {
  return buildPantanalStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildPantanalBodyPrefix,
  BODY_CLASS: 'pantanal-static-page',
};
