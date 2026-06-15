/**
 * Art Galleries — static in-flow hero BEFORE #root (mobile LCP).
 */
const { GALLERIES_HERO_DATA_URI } = require('./galleries-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.galleries-static-page{margin:0;background:#1a1a1a}
  #galleries-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #galleries-static-hero .galleries-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #galleries-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #galleries-static-hero .galleries-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #galleries-static-hero .galleries-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#galleries-static-hero{display:none}body.galleries-static-page{background:transparent}}
</style>`;

function buildGalleriesStaticHero() {
  const heroSrc = GALLERIES_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="galleries-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="galleries-static-hero">` +
    `<div class="galleries-static-hero-frame">` +
    `<img class="static-hero-primary galleries-static-hero-primary" src="${heroSrc}" alt="São Paulo art galleries travel journal" width="400" height="265" fetchpriority="high" decoding="sync" />` +
    `<p class="galleries-static-hero-title">Art Galleries</p>` +
    `<div class="galleries-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildGalleriesBodyPrefix() {
  return buildGalleriesStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildGalleriesBodyPrefix,
  BODY_CLASS: 'galleries-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
