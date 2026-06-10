/**
 * Inline bootstrap: load main.css + main.js after static hero paints (double rAF).
 */

function buildBrazilBootScript({ mainJsSrc, mainCssHref }) {
  const js = JSON.stringify(mainJsSrc);
  const css = mainCssHref ? JSON.stringify(mainCssHref) : null;
  const loadCss =
    css != null
      ? `var l=document.createElement("link");l.rel="stylesheet";l.href=${css};document.head.appendChild(l);`
      : '';
  return (
    `(function(){function loadApp(){${loadCss}var s=document.createElement("script");` +
    `s.src=${js};s.defer=true;document.body.appendChild(s);}` +
    `function afterHeroPaint(){if(window.requestAnimationFrame){` +
    `requestAnimationFrame(function(){requestAnimationFrame(loadApp);});` +
    `}else{setTimeout(loadApp,0);}}` +
    `var img=document.querySelector(".static-hero-primary");` +
    `if(!img){afterHeroPaint();return;}` +
    `if(img.complete&&img.naturalWidth>0){afterHeroPaint();return;}` +
    `img.addEventListener("load",afterHeroPaint,{once:true});` +
    `img.addEventListener("error",afterHeroPaint,{once:true});})();`
  );
}

function deferBrazilAssetsUntilHero(html, { mainJsSrc, mainCssHref }) {
  const scriptTag = `<script defer="defer" src="${mainJsSrc}"></script>`;
  const preloadTag = `<link rel="preload" href="${mainJsSrc}" as="script" />`;

  let out = html.replace(scriptTag, '');
  out = out.replace(preloadTag, '');

  if (mainCssHref) {
    const cssTag = `<link href="${mainCssHref}" rel="stylesheet">`;
    const cssTagAlt = `<link href="${mainCssHref}" rel="stylesheet" />`;
    out = out.replace(cssTag, '').replace(cssTagAlt, '');
  }

  const bootTag = `<script>${buildBrazilBootScript({ mainJsSrc, mainCssHref })}</script>`;
  if (out.includes(bootTag)) return out;
  return out.replace('</body>', `  ${bootTag}\n</body>`);
}

function extractMainJsSrc(html) {
  const match = html.match(/<script defer="defer" src="(\/static\/js\/[^"]+)"><\/script>/);
  return match ? match[1] : null;
}

function extractMainCssHref(html) {
  const match = html.match(/<link href="(\/static\/css\/[^"]+)" rel="stylesheet"\s*\/?>/);
  return match ? match[1] : null;
}

module.exports = {
  buildBrazilBootScript,
  deferBrazilAssetsUntilHero,
  extractMainJsSrc,
  extractMainCssHref,
};
