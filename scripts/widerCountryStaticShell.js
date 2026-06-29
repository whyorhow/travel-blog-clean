/**
 * Beyond the Cities — static in-flow hero BEFORE #root (mobile LCP).
 */
const { WIDER_COUNTRY_HERO_DATA_URI } = require('./wider-country-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.wider-country-static-page{margin:0;background:#1a1a1a}
  #wider-country-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #wider-country-static-hero .wider-country-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #wider-country-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #wider-country-static-hero .wider-country-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #wider-country-static-hero .wider-country-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#wider-country-static-hero{display:none}body.wider-country-static-page{background:transparent}}
</style>`;

function buildWiderCountryStaticHero() {
  const heroSrc = WIDER_COUNTRY_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="wider-country-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="wider-country-static-hero">` +
    `<div class="wider-country-static-hero-frame">` +
    `<img class="static-hero-primary wider-country-static-hero-primary" src="${heroSrc}" alt="Austria countryside travel journal" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<p class="wider-country-static-hero-title">Beyond the Cities</p>` +
    `<div class="wider-country-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildWiderCountryBodyPrefix() {
  return buildWiderCountryStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildWiderCountryBodyPrefix,
  BODY_CLASS: 'wider-country-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
