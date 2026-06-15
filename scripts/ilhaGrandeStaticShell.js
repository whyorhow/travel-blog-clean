/**
 * Ilha Grande — static in-flow hero BEFORE #root (mobile LCP).
 */
const { ILHA_GRANDE_HERO_DATA_URI } = require('./ilha-grande-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.ilha-grande-static-page{margin:0;background:#000}
  #ilha-grande-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #ilha-grande-static-hero .ilha-grande-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #ilha-grande-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #ilha-grande-static-hero .ilha-grande-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #ilha-grande-static-hero .ilha-grande-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#ilha-grande-static-hero{display:none}body.ilha-grande-static-page{background:transparent}}
</style>`;

function buildIlhaGrandeStaticHero() {
  const heroSrc = ILHA_GRANDE_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="ilha-grande-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="ilha-grande-static-hero">` +
    `<div class="ilha-grande-static-hero-frame">` +
    `<img class="static-hero-primary ilha-grande-static-hero-primary" src="${heroSrc}" alt="Ilha Grande travel journal" width="400" height="520" fetchpriority="high" decoding="sync" />` +
    `<p class="ilha-grande-static-hero-title">Ilha Grande</p>` +
    `<div class="ilha-grande-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildIlhaGrandeBodyPrefix() {
  return buildIlhaGrandeStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildIlhaGrandeBodyPrefix,
  BODY_CLASS: 'ilha-grande-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
