/**
 * Hungary — static in-flow hero BEFORE #root (mobile LCP).
 */
const { HUNGARY_HERO_DATA_URI } = require('./hungary-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.hungary-static-page{margin:0;background:#1a1a1a}
  #hungary-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #hungary-static-hero .hungary-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #hungary-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #hungary-static-hero .hungary-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #hungary-static-hero .hungary-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#hungary-static-hero{display:none}body.hungary-static-page{background:transparent}}
</style>`;

function buildHungaryStaticHero() {
  const heroSrc = HUNGARY_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="hungary-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="hungary-static-hero">` +
    `<div class="hungary-static-hero-frame">` +
    `<img class="static-hero-primary hungary-static-hero-primary" src="${heroSrc}" alt="Hungary travel journal" width="400" height="556" fetchpriority="high" decoding="sync" />` +
    `<p class="hungary-static-hero-title">Hungary</p>` +
    `<div class="hungary-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildHungaryBodyPrefix() {
  return buildHungaryStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildHungaryBodyPrefix,
  BODY_CLASS: 'hungary-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
