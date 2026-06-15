/**
 * Nashville — static in-flow hero BEFORE #root (mobile LCP).
 */
const { NASHVILLE_HERO_DATA_URI } = require('./nashville-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.nashville-static-page{margin:0;background:#1a1a1a}
  #nashville-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #nashville-static-hero .nashville-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #nashville-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #nashville-static-hero .nashville-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #nashville-static-hero .nashville-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#nashville-static-hero{display:none}body.nashville-static-page{background:transparent}}
</style>`;

function buildNashvilleStaticHero() {
  const heroSrc = NASHVILLE_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="nashville-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="nashville-static-hero">` +
    `<div class="nashville-static-hero-frame">` +
    `<img class="static-hero-primary nashville-static-hero-primary" src="${heroSrc}" alt="Nashville travel journal" width="400" height="249" fetchpriority="high" decoding="sync" />` +
    `<p class="nashville-static-hero-title">Nashville</p>` +
    `<div class="nashville-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildNashvilleBodyPrefix() {
  return buildNashvilleStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildNashvilleBodyPrefix,
  BODY_CLASS: 'nashville-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
