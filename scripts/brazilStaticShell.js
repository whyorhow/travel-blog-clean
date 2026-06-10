/**
 * Brazil hub — static in-flow hero BEFORE #root (not inside it).
 * React skips its own hero when #brazil-static-hero exists → one image download, stable LCP.
 * Keep URL in sync with scripts/routeLcpPreload.cjs and brazil.hero.config.js.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const GRADIENT =
  'linear-gradient(180deg,#bab592 0%,#bdb58f 20%,#c4bc8a 38%,#cdb878 55%,#d4b060 72%,#d4af5a 85%,#c9a040 93%,#b8860b 100%)';

const SHELL_STYLES = `<style>
  body.brazil-static-page{margin:0;background:${GRADIENT}}
  #brazil-static-hero{display:flex;justify-content:center;align-items:center;min-height:52vh;padding:calc(48px + 1rem) 1rem .5rem;box-sizing:border-box}
  #brazil-static-hero img{display:block;width:100%;max-width:600px;height:auto;aspect-ratio:4/3;object-fit:contain}
  @media (min-width:768px){#brazil-static-hero{display:none}body.brazil-static-page{background:#f5f0e8}}
</style>`;

const PRECONECT = '<link rel="preconnect" href="https://res.cloudinary.com" crossorigin />';

function buildBrazilStaticHero() {
  const heroSrc = ROUTE_LCP_PRELOAD['/brazil'] || '';
  if (!heroSrc) {
    return '<div id="brazil-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="brazil-static-hero">` +
    `<img src="${heroSrc}" alt="Brazil travel journal" width="600" height="450" fetchpriority="high" decoding="sync" />` +
    `</div>`
  );
}

function buildBrazilBodyPrefix() {
  return buildBrazilStaticHero();
}

module.exports = {
  SHELL_STYLES,
  PRECONECT,
  buildBrazilBodyPrefix,
  BODY_CLASS: 'brazil-static-page',
};
