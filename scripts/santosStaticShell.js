/**
 * Santos — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #santos-static-hero exists.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const SHELL_STYLES = `<style>
  body.santos-static-page{margin:0;background:#000}
  #santos-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #santos-static-hero .santos-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #santos-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #santos-static-hero .santos-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.15);pointer-events:none}
  @media (min-width:768px){#santos-static-hero{display:none}body.santos-static-page{background:transparent}}
</style>`;

function buildSantosStaticHero() {
  const heroSrc = ROUTE_LCP_PRELOAD['/brazil/santos'] || '';
  if (!heroSrc) {
    return '<div id="santos-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="santos-static-hero">` +
    `<div class="santos-static-hero-frame">` +
    `<img class="static-hero-primary santos-static-hero-primary" src="${heroSrc}" alt="Santos port city journal entry" width="400" height="529" fetchpriority="high" decoding="sync" />` +
    `<div class="santos-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildSantosBodyPrefix() {
  return buildSantosStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildSantosBodyPrefix,
  BODY_CLASS: 'santos-static-page',
};
