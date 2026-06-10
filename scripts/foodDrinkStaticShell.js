/**
 * Brazil Food & Drink — static in-flow hero BEFORE #root (mobile LCP).
 * React skips Hero when #food-drink-static-hero exists.
 */
const { ROUTE_LCP_PRELOAD } = require('./routeLcpPreload.cjs');

const SHELL_STYLES = `<style>
  body.food-drink-static-page{margin:0;background:#000}
  #food-drink-static-hero{position:relative;width:100%;min-height:60vh;background:#000;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #food-drink-static-hero .food-drink-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #food-drink-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #food-drink-static-hero .food-drink-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  @media (min-width:768px){#food-drink-static-hero{display:none}body.food-drink-static-page{background:transparent}}
</style>`;

function buildFoodDrinkStaticHero() {
  const heroSrc = ROUTE_LCP_PRELOAD['/brazil/food-drink'] || '';
  if (!heroSrc) {
    return '<div id="food-drink-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="food-drink-static-hero">` +
    `<div class="food-drink-static-hero-frame">` +
    `<img class="static-hero-primary food-drink-static-hero-primary" src="${heroSrc}" alt="Brazil food and drink journal entry" width="400" height="309" fetchpriority="high" decoding="sync" />` +
    `<div class="food-drink-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildFoodDrinkBodyPrefix() {
  return buildFoodDrinkStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildFoodDrinkBodyPrefix,
  BODY_CLASS: 'food-drink-static-page',
};
