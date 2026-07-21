/**
 * Greece — static in-flow hero BEFORE #root (mobile LCP).
 */
const { GREECE_HERO_DATA_URI } = require("./greece-hero-inline.cjs");

const SHELL_STYLES = `<style>
  body.greece-static-page{margin:0;background:#1a1a1a}
  #greece-static-hero{position:relative;width:100%;min-height:60vh;background:#1a1a1a;overflow:hidden;padding-top:48px;box-sizing:border-box}
  #greece-static-hero .greece-static-hero-frame{position:relative;width:100%;height:60vh;max-height:calc(100vh - 48px)}
  #greece-static-hero img.static-hero-primary{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
  #greece-static-hero .greece-static-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.2);pointer-events:none}
  #greece-static-hero .greece-static-hero-title{position:absolute;left:0;right:0;bottom:6%;z-index:2;margin:0;text-align:center;font:700 2.25rem Georgia,"Times New Roman",serif;color:#B8860B;text-shadow:0 2px 12px rgba(0,0,0,.55);pointer-events:none}
  @media (min-width:768px){#greece-static-hero{display:none}body.greece-static-page{background:transparent}}
</style>`;

function buildGreeceStaticHero() {
  const heroSrc = GREECE_HERO_DATA_URI || "";
  if (!heroSrc) {
    return '<div id="greece-static-hero" aria-hidden="true"></div>';
  }
  return (
    `<div id="greece-static-hero">` +
    `<div class="greece-static-hero-frame">` +
    `<img class="static-hero-primary greece-static-hero-primary" src="${heroSrc}" alt="Greece travel journal" width="400" height="528" fetchpriority="high" decoding="sync" />` +
    `<p class="greece-static-hero-title">Greece</p>` +
    `<div class="greece-static-hero-overlay" aria-hidden="true"></div>` +
    `</div></div>`
  );
}

function buildGreeceBodyPrefix() {
  return buildGreeceStaticHero();
}

module.exports = {
  SHELL_STYLES,
  buildGreeceBodyPrefix,
  BODY_CLASS: "greece-static-page",
  skipLcpPreload: true,
  bootMinDelayMs: 3000,
};
