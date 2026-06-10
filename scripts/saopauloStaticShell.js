/**
 * São Paulo hub — static in-flow hero BEFORE #root (mobile LCP).
 * React skips LocationHero when #saopaulo-static-hero exists.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const SHELL_STYLES = `<style>
  body.saopaulo-static-page{margin:0;background:#000}
  #saopaulo-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #saopaulo-static-hero .saopaulo-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #saopaulo-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:left center}
  #saopaulo-static-hero .saopaulo-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.3);pointer-events:none}
  @media (min-width:768px){#saopaulo-static-hero{display:none}body.saopaulo-static-page{background:transparent}}
</style>`;

function buildSaoPauloStaticHero() {
  const heroSrc = ROUTE_LCP_PRELOAD['/brazil/saopaulo'] || '';
  if (!heroSrc) {
    return '<div id="saopaulo-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="saopaulo-static-hero">` +
    `<div class="saopaulo-static-hero-frame">` +
    `<img class="static-hero-primary saopaulo-static-hero-primary" src="${heroSrc}" alt="São Paulo handwritten journal entry" width="400" height="295" fetchpriority="high" decoding="sync" />` +
    `<div class="saopaulo-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildSaoPauloBodyPrefix() {
  return buildSaoPauloStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildSaoPauloBodyPrefix,
  BODY_CLASS: 'saopaulo-static-page',
};
