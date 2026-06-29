/**
 * Salzburg — static in-flow hero BEFORE #root (mobile LCP).
 */
const { SALZBURG_HERO_DATA_URI } = require('./salzburg-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.salzburg-static-page{margin:0;background:#1a1a1a}
  #salzburg-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #salzburg-static-hero .salzburg-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #salzburg-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #salzburg-static-hero .salzburg-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #salzburg-static-hero .salzburg-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#salzburg-static-hero{display:none}body.salzburg-static-page{background:transparent}}
</style>`;

function buildSalzburgStaticHero() {
  const heroSrc = SALZBURG_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="salzburg-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="salzburg-static-hero">` +
    `<div class="salzburg-static-hero-frame">` +
    `<img class="static-hero-primary salzburg-static-hero-primary" src="${heroSrc}" alt="Salzburg travel journal" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<p class="salzburg-static-hero-title">Salzburg</p>` +
    `<div class="salzburg-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildSalzburgBodyPrefix() {
  return buildSalzburgStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildSalzburgBodyPrefix,
  BODY_CLASS: 'salzburg-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
