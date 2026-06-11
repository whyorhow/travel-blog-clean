/**
 * Memphis — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #memphis-static-hero exists.
 */
const { MEMPHIS_HERO_DATA_URI } = require('./memphis-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.memphis-static-page{margin:0;background:#1a1a1a}
  #memphis-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #memphis-static-hero .memphis-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #memphis-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #memphis-static-hero .memphis-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #memphis-static-hero .memphis-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#memphis-static-hero{display:none}body.memphis-static-page{background:transparent}}
</style>`;

function buildMemphisStaticHero() {
  const heroSrc = MEMPHIS_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="memphis-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="memphis-static-hero">` +
    `<div class="memphis-static-hero-frame">` +
    `<img class="static-hero-primary memphis-static-hero-primary" src="${heroSrc}" alt="Memphis travel journal" width="400" height="233" fetchpriority="high" decoding="sync" />` +
    `<p class="memphis-static-hero-title">Memphis</p>` +
    `<div class="memphis-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildMemphisBodyPrefix() {
  return buildMemphisStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildMemphisBodyPrefix,
  BODY_CLASS: 'memphis-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
