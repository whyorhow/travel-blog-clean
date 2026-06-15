/**
 * Carnival — static in-flow hero BEFORE #root (mobile LCP).
 */
const { CARNIVAL_HERO_DATA_URI } = require('./carnival-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.carnival-static-page{margin:0;background:#1a1a1a}
  #carnival-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #carnival-static-hero .carnival-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #carnival-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #carnival-static-hero .carnival-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #carnival-static-hero .carnival-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#carnival-static-hero{display:none}body.carnival-static-page{background:transparent}}
</style>`;

function buildCarnivalStaticHero() {
  const heroSrc = CARNIVAL_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="carnival-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="carnival-static-hero">` +
    `<div class="carnival-static-hero-frame">` +
    `<img class="static-hero-primary carnival-static-hero-primary" src="${heroSrc}" alt="São Paulo carnival travel journal" width="400" height="322" fetchpriority="high" decoding="sync" />` +
    `<p class="carnival-static-hero-title">Carnival</p>` +
    `<div class="carnival-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildCarnivalBodyPrefix() {
  return buildCarnivalStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildCarnivalBodyPrefix,
  BODY_CLASS: 'carnival-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
