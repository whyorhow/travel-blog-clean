/**
 * Smoky Mountains — static in-flow hero BEFORE #root (mobile LCP).
 */
const { MOUNTAINS_HERO_DATA_URI } = require('./mountains-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.mountains-static-page{margin:0;background:#1a1a1a}
  #mountains-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #mountains-static-hero .mountains-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #mountains-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #mountains-static-hero .mountains-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #mountains-static-hero .mountains-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#mountains-static-hero{display:none}body.mountains-static-page{background:transparent}}
</style>`;

function buildMountainsStaticHero() {
  const heroSrc = MOUNTAINS_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="mountains-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="mountains-static-hero">` +
    `<div class="mountains-static-hero-frame">` +
    `<img class="static-hero-primary mountains-static-hero-primary" src="${heroSrc}" alt="Great Smoky Mountains travel journal" width="400" height="223" fetchpriority="high" decoding="sync" />` +
    `<p class="mountains-static-hero-title">Smoky Mountains</p>` +
    `<div class="mountains-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildMountainsBodyPrefix() {
  return buildMountainsStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildMountainsBodyPrefix,
  BODY_CLASS: 'mountains-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
