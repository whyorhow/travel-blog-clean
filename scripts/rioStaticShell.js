/**
 * Rio de Janeiro — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #rio-static-hero exists.
 */
const { RIO_HERO_DATA_URI } = require('./rio-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.rio-static-page{margin:0;background:#000}
  #rio-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #rio-static-hero .rio-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #rio-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #rio-static-hero .rio-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  @media (min-width:768px){#rio-static-hero{display:none}body.rio-static-page{background:transparent}}
</style>`;

function buildRioStaticHero() {
  const heroSrc = RIO_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="rio-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="rio-static-hero">` +
    `<div class="rio-static-hero-frame">` +
    `<img class="static-hero-primary rio-static-hero-primary" src="${heroSrc}" alt="Rio de Janeiro journal entry" width="400" height="534" fetchpriority="high" decoding="sync" />` +
    `<div class="rio-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildRioBodyPrefix() {
  return buildRioStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildRioBodyPrefix,
  BODY_CLASS: 'rio-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
