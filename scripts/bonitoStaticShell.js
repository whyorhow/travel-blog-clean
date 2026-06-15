/**
 * Bonito — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #bonito-static-hero exists.
 */
const { BONITO_HERO_DATA_URI } = require('./bonito-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.bonito-static-page{margin:0;background:#000}
  #bonito-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #bonito-static-hero .bonito-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #bonito-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #bonito-static-hero .bonito-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.15);pointer-events:none}
  @media (min-width:768px){#bonito-static-hero{display:none}body.bonito-static-page{background:transparent}}
</style>`;

function buildBonitoStaticHero() {
  const heroSrc = BONITO_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="bonito-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="bonito-static-hero">` +
    `<div class="bonito-static-hero-frame">` +
    `<img class="static-hero-primary bonito-static-hero-primary" src="${heroSrc}" alt="Bonito crystal river journal entry" width="400" height="712" fetchpriority="high" decoding="sync" />` +
    `<div class="bonito-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildBonitoBodyPrefix() {
  return buildBonitoStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildBonitoBodyPrefix,
  BODY_CLASS: 'bonito-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
