/**
 * Belgium — static in-flow hero BEFORE #root (mobile LCP).
 */
const { BELGIUM_HERO_DATA_URI } = require('./belgium-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.belgium-static-page{margin:0;background:#1a1a1a}
  #belgium-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #belgium-static-hero .belgium-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #belgium-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #belgium-static-hero .belgium-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #belgium-static-hero .belgium-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#belgium-static-hero{display:none}body.belgium-static-page{background:transparent}}
</style>`;

function buildBelgiumStaticHero() {
  const heroSrc = BELGIUM_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="belgium-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="belgium-static-hero">` +
    `<div class="belgium-static-hero-frame">` +
    `<img class="static-hero-primary belgium-static-hero-primary" src="${heroSrc}" alt="Belgium travel journal" width="400" height="267" fetchpriority="high" decoding="sync" />` +
    `<p class="belgium-static-hero-title">Belgium</p>` +
    `<div class="belgium-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildBelgiumBodyPrefix() {
  return buildBelgiumStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildBelgiumBodyPrefix,
  BODY_CLASS: 'belgium-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
