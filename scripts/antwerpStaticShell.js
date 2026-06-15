/**
 * Antwerp — static in-flow hero BEFORE #root (mobile LCP).
 */
const { ANTWERP_HERO_DATA_URI } = require('./antwerp-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.antwerp-static-page{margin:0;background:#1a1a1a}
  #antwerp-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #antwerp-static-hero .antwerp-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #antwerp-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #antwerp-static-hero .antwerp-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #antwerp-static-hero .antwerp-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#antwerp-static-hero{display:none}body.antwerp-static-page{background:transparent}}
</style>`;

function buildAntwerpStaticHero() {
  const heroSrc = ANTWERP_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="antwerp-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="antwerp-static-hero">` +
    `<div class="antwerp-static-hero-frame">` +
    `<img class="static-hero-primary antwerp-static-hero-primary" src="${heroSrc}" alt="Antwerp travel journal" width="400" height="224" fetchpriority="high" decoding="sync" />` +
    `<p class="antwerp-static-hero-title">Antwerp</p>` +
    `<div class="antwerp-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildAntwerpBodyPrefix() {
  return buildAntwerpStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildAntwerpBodyPrefix,
  BODY_CLASS: 'antwerp-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
