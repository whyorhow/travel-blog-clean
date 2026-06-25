/**
 * Brazil hub — static in-flow hero BEFORE #root (not inside it).
 * React skips its own hero when #brazil-static-hero exists → one image download, stable LCP.
 * Crossfade backup frame is added post-LCP via brazilStaticHeroTransition.js.
 * Hero URL: public/assets/brazil-hero-400.webp (npm run optimize:brazil-hero)
 */
const { BRAZIL_HERO_DATA_URI } = require('./brazil-hero-inline.cjs');

const GRADIENT =
  'linear-gradient(180deg,#bab592 0%,#bdb58f 20%,#c4bc8a 38%,#cdb878 55%,#d4b060 72%,#d4af5a 85%,#c9a040 93%,#b8860b 100%)';

const SHELL_STYLES = `<style>
  body.brazil-static-page{margin:0;background:${GRADIENT}}
  #brazil-static-hero{display:flex;justify-content:center;align-items:center;min-height:min(52vh,100%);padding:calc(56px + 1rem) 0 .5rem;box-sizing:border-box}
  #brazil-static-hero .brazil-static-hero-frame{position:relative;width:100%;max-width:600px;margin:0 auto}
  #brazil-static-hero .brazil-static-hero-frame img.brazil-static-hero-primary{display:block;position:relative;width:100%;height:auto;object-fit:contain;z-index:1}
  #brazil-static-hero .brazil-static-hero-backup{position:absolute;inset:0;z-index:2;background:center/contain no-repeat;opacity:0;transition:opacity .7s ease;pointer-events:none}
  #brazil-static-hero .brazil-static-hero-backup.is-visible{opacity:1}
  @media (min-width:768px){#brazil-static-hero{display:none}body.brazil-static-page{background:#f5f0e8}}
</style>`;

function buildBrazilStaticHero() {
  const heroSrc = BRAZIL_HERO_DATA_URI || '';
  if (!heroSrc) {
    return '<div id="brazil-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="brazil-static-hero">` +
    `<div class="brazil-static-hero-frame">` +
    `<img class="static-hero-primary brazil-static-hero-primary" src="${heroSrc}" alt="Brazil travel journal" width="600" height="450" fetchpriority="high" decoding="sync" />` +
    `</div></div>`
  );
}

function buildBrazilBodyPrefix() {
  return buildBrazilStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildBrazilBodyPrefix,
  BODY_CLASS: 'brazil-static-page',
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
