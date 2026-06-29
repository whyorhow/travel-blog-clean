/**
 * Austria — static in-flow hero BEFORE #root (mobile LCP).
 */
const { AUSTRIA_HERO_DATA_URI } = require('./austria-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.austria-static-page{margin:0;background:#1a1a1a}
  #austria-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #austria-static-hero .austria-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #austria-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #austria-static-hero .austria-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #austria-static-hero .austria-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#austria-static-hero{display:none}body.austria-static-page{background:transparent}}
</style>`;

function buildAustriaStaticHero() {
  const heroSrc = AUSTRIA_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="austria-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="austria-static-hero">` +
    `<div class="austria-static-hero-frame">` +
    `<img class="static-hero-primary austria-static-hero-primary" src="${heroSrc}" alt="Austria travel journal" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<p class="austria-static-hero-title">Austria</p>` +
    `<div class="austria-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildAustriaBodyPrefix() {
  return buildAustriaStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildAustriaBodyPrefix,
  BODY_CLASS: 'austria-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
