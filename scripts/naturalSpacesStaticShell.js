/**
 * Brazil Natural Spaces — static in-flow hero BEFORE #root (mobile LCP).
 */
const { NATURAL_SPACES_HERO_DATA_URI } = require('./natural-spaces-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.natural-spaces-static-page{margin:0;background:#1a1a1a}
  #natural-spaces-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #natural-spaces-static-hero .natural-spaces-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #natural-spaces-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:left center}
  #natural-spaces-static-hero .natural-spaces-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #natural-spaces-static-hero .natural-spaces-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#natural-spaces-static-hero{display:none}body.natural-spaces-static-page{background:transparent}}
</style>`;

function buildNaturalSpacesStaticHero() {
  const heroSrc = NATURAL_SPACES_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="natural-spaces-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="natural-spaces-static-hero">` +
    `<div class="natural-spaces-static-hero-frame">` +
    `<img class="static-hero-primary natural-spaces-static-hero-primary" src="${heroSrc}" alt="Brazil natural spaces travel journal" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<p class="natural-spaces-static-hero-title">Natural Spaces</p>` +
    `<div class="natural-spaces-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildNaturalSpacesBodyPrefix() {
  return buildNaturalSpacesStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildNaturalSpacesBodyPrefix,
  BODY_CLASS: 'natural-spaces-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
