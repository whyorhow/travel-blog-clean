/**
 * Street Art — static in-flow hero BEFORE #root (mobile LCP).
 */
const { STREET_ART_HERO_DATA_URI } = require('./street-art-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.street-art-static-page{margin:0;background:#1a1a1a}
  #street-art-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #street-art-static-hero .street-art-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #street-art-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #street-art-static-hero .street-art-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #street-art-static-hero .street-art-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#street-art-static-hero{display:none}body.street-art-static-page{background:transparent}}
</style>`;

function buildStreetArtStaticHero() {
  const heroSrc = STREET_ART_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="street-art-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="street-art-static-hero">` +
    `<div class="street-art-static-hero-frame">` +
    `<img class="static-hero-primary street-art-static-hero-primary" src="${heroSrc}" alt="São Paulo street art travel journal" width="400" height="283" fetchpriority="high" decoding="sync" />` +
    `<p class="street-art-static-hero-title">Street Art</p>` +
    `<div class="street-art-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildStreetArtBodyPrefix() {
  return buildStreetArtStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildStreetArtBodyPrefix,
  BODY_CLASS: 'street-art-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
