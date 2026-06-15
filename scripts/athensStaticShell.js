/**
 * Athens — static in-flow hero BEFORE #root (mobile LCP).
 */
const { ATHENS_HERO_DATA_URI } = require('./athens-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.athens-static-page{margin:0;background:#1a1a1a}
  #athens-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #athens-static-hero .athens-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #athens-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #athens-static-hero .athens-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #athens-static-hero .athens-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#athens-static-hero{display:none}body.athens-static-page{background:transparent}}
</style>`;

function buildAthensStaticHero() {
  const heroSrc = ATHENS_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="athens-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="athens-static-hero">` +
    `<div class="athens-static-hero-frame">` +
    `<img class="static-hero-primary athens-static-hero-primary" src="${heroSrc}" alt="Athens travel journal" width="400" height="483" fetchpriority="high" decoding="sync" />` +
    `<p class="athens-static-hero-title">Athens</p>` +
    `<div class="athens-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildAthensBodyPrefix() {
  return buildAthensStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildAthensBodyPrefix,
  BODY_CLASS: 'athens-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
