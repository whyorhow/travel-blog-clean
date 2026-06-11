/**
 * Tennessee hub — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #tennessee-static-hero exists.
 */
const { USA_HERO_DATA_URI } = require('./usa-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.tennessee-static-page{margin:0;background:#1a1a1a}
  #tennessee-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #tennessee-static-hero .tennessee-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #tennessee-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #tennessee-static-hero .tennessee-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #tennessee-static-hero .tennessee-static-hero-title{position:absolute;left:0;right:0;bottom:14%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#tennessee-static-hero{display:none}body.tennessee-static-page{background:transparent}}
</style>`;

function buildTennesseeStaticHero() {
  const heroSrc = USA_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="tennessee-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="tennessee-static-hero">` +
    `<div class="tennessee-static-hero-frame">` +
    `<img class="static-hero-primary tennessee-static-hero-primary" src="${heroSrc}" alt="Tennessee travel journal" width="400" height="279" fetchpriority="high" decoding="sync" />` +
    `<p class="tennessee-static-hero-title">Tennessee</p>` +
    `<div class="tennessee-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildTennesseeBodyPrefix() {
  return buildTennesseeStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildTennesseeBodyPrefix,
  BODY_CLASS: 'tennessee-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
