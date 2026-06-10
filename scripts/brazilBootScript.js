/**
 * Inline bootstrap: load CRA main.js only after static hero image paints.
 */

function buildBrazilBootScript(mainJsSrc) {
  const src = JSON.stringify(mainJsSrc);
  return (
    `(function(){function boot(){var s=document.createElement("script");` +
    `s.src=${src};s.defer=true;document.body.appendChild(s);}` +
    `var img=document.querySelector("#brazil-static-hero .brazil-static-hero-primary");` +
    `if(!img){boot();return;}` +
    `if(img.complete&&img.naturalWidth>0){boot();return;}` +
    `img.addEventListener("load",boot,{once:true});` +
    `img.addEventListener("error",boot,{once:true});})();`
  );
}

function deferMainUntilBrazilHero(html, mainJsSrc) {
  const scriptTag = `<script defer="defer" src="${mainJsSrc}"></script>`;
  const preloadTag = `<link rel="preload" href="${mainJsSrc}" as="script" />`;

  let out = html.replace(scriptTag, '');
  out = out.replace(preloadTag, '');

  const bootTag = `<script>${buildBrazilBootScript(mainJsSrc)}</script>`;
  if (out.includes(bootTag)) return out;
  return out.replace('</body>', `  ${bootTag}\n</body>`);
}

function extractMainJsSrc(html) {
  const match = html.match(/<script defer="defer" src="(\/static\/js\/[^"]+)"><\/script>/);
  return match ? match[1] : null;
}

module.exports = { buildBrazilBootScript, deferMainUntilBrazilHero, extractMainJsSrc };
