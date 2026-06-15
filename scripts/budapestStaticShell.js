/**
 * Budapest — static in-flow hero BEFORE #root (mobile LCP).
 */
const { BUDAPEST_HERO_DATA_URI } = require('./budapest-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.budapest-static-page{margin:0;background:#1a1a1a}
  #budapest-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #budapest-static-hero .budapest-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #budapest-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #budapest-static-hero .budapest-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #budapest-static-hero .budapest-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#budapest-static-hero{display:none}body.budapest-static-page{background:transparent}}
</style>`;

function buildBudapestStaticHero() {
  const heroSrc = BUDAPEST_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="budapest-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="budapest-static-hero">` +
    `<div class="budapest-static-hero-frame">` +
    `<img class="static-hero-primary budapest-static-hero-primary" src="${heroSrc}" alt="Budapest travel journal" width="400" height="327" fetchpriority="high" decoding="sync" />` +
    `<p class="budapest-static-hero-title">Budapest</p>` +
    `<div class="budapest-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildBudapestBodyPrefix() {
  return buildBudapestStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildBudapestBodyPrefix,
  BODY_CLASS: 'budapest-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
