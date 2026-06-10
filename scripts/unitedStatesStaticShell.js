/**
 * United States hub — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #united-states-static-hero exists.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const SHELL_STYLES = `<style>
  body.united-states-static-page{margin:0;background:#1a1a1a}
  #united-states-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #united-states-static-hero .united-states-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #united-states-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #united-states-static-hero .united-states-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  @media (min-width:768px){#united-states-static-hero{display:none}body.united-states-static-page{background:transparent}}
</style>`;

function buildUnitedStatesStaticHero() {
  const heroSrc = ROUTE_LCP_PRELOAD['/united-states'] || '';
  if (!heroSrc) {
    return '<div id="united-states-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="united-states-static-hero">` +
    `<div class="united-states-static-hero-frame">` +
    `<img class="static-hero-primary united-states-static-hero-primary" src="${heroSrc}" alt="United States travel journal" width="400" height="279" fetchpriority="high" decoding="sync" />` +
    `<div class="united-states-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildUnitedStatesBodyPrefix() {
  return buildUnitedStatesStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildUnitedStatesBodyPrefix,
  BODY_CLASS: 'united-states-static-page',
};
