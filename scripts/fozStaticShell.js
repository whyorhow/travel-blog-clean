/**
 * Foz / Iguazu — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #foz-static-hero exists.
 */
const { FOZ_HERO_DATA_URI } = require('./foz-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.foz-static-page{margin:0;background:#000}
  #foz-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #foz-static-hero .foz-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #foz-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #foz-static-hero .foz-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.15);pointer-events:none}
  @media (min-width:768px){#foz-static-hero{display:none}body.foz-static-page{background:transparent}}
</style>`;

function buildFozStaticHero() {
  const heroSrc = FOZ_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="foz-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="foz-static-hero">` +
    `<div class="foz-static-hero-frame">` +
    `<img class="static-hero-primary foz-static-hero-primary" src="${heroSrc}" alt="Iguazu Falls journal entry" width="400" height="576" fetchpriority="high" decoding="sync" />` +
    `<div class="foz-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildFozBodyPrefix() {
  return buildFozStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildFozBodyPrefix,
  BODY_CLASS: 'foz-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
