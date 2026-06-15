/**
 * Florianópolis — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #florianopolis-static-hero exists.
 */
const { FLORIANOPOLIS_HERO_DATA_URI } = require('./florianopolis-hero-inline.cjs');

const SHELL_STYLES = `<style>
  body.florianopolis-static-page{margin:0;background:#000}
  #florianopolis-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #florianopolis-static-hero .florianopolis-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #florianopolis-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #florianopolis-static-hero .florianopolis-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.15);pointer-events:none}
  @media (min-width:768px){#florianopolis-static-hero{display:none}body.florianopolis-static-page{background:transparent}}
</style>`;

function buildFlorianopolisStaticHero() {
  const heroSrc = FLORIANOPOLIS_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="florianopolis-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="florianopolis-static-hero">` +
    `<div class="florianopolis-static-hero-frame">` +
    `<img class="static-hero-primary florianopolis-static-hero-primary" src="${heroSrc}" alt="Florianópolis island journal entry" width="400" height="513" fetchpriority="high" decoding="sync" />` +
    `<div class="florianopolis-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildFlorianopolisBodyPrefix() {
  return buildFlorianopolisStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildFlorianopolisBodyPrefix,
  BODY_CLASS: 'florianopolis-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
