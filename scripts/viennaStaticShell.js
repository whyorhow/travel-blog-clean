/**
 * Vienna — static in-flow hero BEFORE #root (mobile LCP).
 */
const { VIENNA_HERO_DATA_URI } = require('./vienna-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.vienna-static-page{margin:0;background:#1a1a1a}
  #vienna-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #vienna-static-hero .vienna-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #vienna-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #vienna-static-hero .vienna-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #vienna-static-hero .vienna-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#vienna-static-hero{display:none}body.vienna-static-page{background:transparent}}
</style>`;

function buildViennaStaticHero() {
  const heroSrc = VIENNA_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="vienna-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="vienna-static-hero">` +
    `<div class="vienna-static-hero-frame">` +
    `<img class="static-hero-primary vienna-static-hero-primary" src="${heroSrc}" alt="Vienna travel journal" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<p class="vienna-static-hero-title">Vienna</p>` +
    `<div class="vienna-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildViennaBodyPrefix() {
  return buildViennaStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildViennaBodyPrefix,
  BODY_CLASS: 'vienna-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
