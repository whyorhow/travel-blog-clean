/**
 * Salvador — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #salvador-static-hero exists.
 */
const { SALVADOR_HERO_DATA_URI } = require('./salvador-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.salvador-static-page{margin:0;background:#000}
  #salvador-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #salvador-static-hero .salvador-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #salvador-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #salvador-static-hero .salvador-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  @media (min-width:768px){#salvador-static-hero{display:none}body.salvador-static-page{background:transparent}}
</style>`;

function buildSalvadorStaticHero() {
  const heroSrc = SALVADOR_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="salvador-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="salvador-static-hero">` +
    `<div class="salvador-static-hero-frame">` +
    `<img class="static-hero-primary salvador-static-hero-primary" src="${heroSrc}" alt="Salvador Bahia journal entry" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<div class="salvador-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildSalvadorBodyPrefix() {
  return buildSalvadorStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildSalvadorBodyPrefix,
  BODY_CLASS: 'salvador-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
