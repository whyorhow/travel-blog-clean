/**
 * Green Spaces — static in-flow hero BEFORE #root (mobile LCP).
 */
const { GREEN_SPACES_HERO_DATA_URI } = require('./green-spaces-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.green-spaces-static-page{margin:0;background:#1a1a1a}
  #green-spaces-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #green-spaces-static-hero .green-spaces-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #green-spaces-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #green-spaces-static-hero .green-spaces-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #green-spaces-static-hero .green-spaces-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#green-spaces-static-hero{display:none}body.green-spaces-static-page{background:transparent}}
</style>`;

function buildGreenSpacesStaticHero() {
  const heroSrc = GREEN_SPACES_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="green-spaces-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="green-spaces-static-hero">` +
    `<div class="green-spaces-static-hero-frame">` +
    `<img class="static-hero-primary green-spaces-static-hero-primary" src="${heroSrc}" alt="São Paulo green spaces travel journal" width="400" height="294" fetchpriority="high" decoding="sync" />` +
    `<p class="green-spaces-static-hero-title">Green Spaces</p>` +
    `<div class="green-spaces-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildGreenSpacesBodyPrefix() {
  return buildGreenSpacesStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildGreenSpacesBodyPrefix,
  BODY_CLASS: 'green-spaces-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
