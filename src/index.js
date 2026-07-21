import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "./index.css";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

function isMobileViewport() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
  );
}

const ROUTE_BOOTSTRAP_MAP = {
  "/": "home",
  "/home": "home",
  "/united-states": "united-states",
  "/united-states/tennessee": "tennessee",
  "/united-states/tennessee/memphis": "memphis",
  "/united-states/tennessee/nashville": "nashville",
  "/united-states/tennessee/mountains": "mountains",
  "/brazil": "brazil",
  "/brazil/saopaulo": "saopaulo",
  "/brazil/saopaulo/green-spaces": "green-spaces",
  "/brazil/saopaulo/street-art": "street-art",
  "/brazil/saopaulo/carnival": "carnival",
  "/brazil/saopaulo/galleries": "galleries",
  "/belgium": "belgium",
  "/belgium/antwerp": "antwerp",
  "/greece": "greece",
  "/greece/athens": "athens",
  "/hungary": "hungary",
  "/hungary/budapest": "budapest",
  "/austria": "austria",
  "/austria/vienna": "vienna",
  "/austria/salzburg": "salzburg",
  "/austria/wider-country": "wider-country",
  "/brazil/florianopolis": "florianopolis",
  "/brazil/rio": "rio",
  "/brazil/rio/ilha-grande": "ilha-grande",
  "/brazil/natural-spaces": "natural-spaces",
  "/brazil/santos": "santos",
  "/brazil/pantanal": "pantanal",
  "/brazil/bonito": "bonito",
  "/brazil/manaus": "manaus",
  "/brazil/salvador": "salvador",
  "/brazil/foz": "foz",
  "/brazil/food-drink": "food-drink",
};

const BOOTSTRAP_LOADERS = {
  home: () => import("./MobileShellApp"),
  "united-states": () => import("./MobileUnitedStatesShellApp"),
  tennessee: () => import("./MobileTennesseeShellApp"),
  memphis: () => import("./MobileMemphisShellApp"),
  nashville: () => import("./MobileNashvilleShellApp"),
  mountains: () => import("./MobileMountainsShellApp"),
  brazil: () => import("./MobileBrazilShellApp"),
  saopaulo: () => import("./MobileSaoPauloShellApp"),
  "green-spaces": () => import("./MobileGreenSpacesShellApp"),
  "street-art": () => import("./MobileStreetArtShellApp"),
  carnival: () => import("./MobileCarnivalSaoPauloShellApp"),
  galleries: () => import("./MobileArtGalleriesShellApp"),
  greece: () => import("./MobileGreeceShellApp"),
  athens: () => import("./MobileAthensShellApp"),
  belgium: () => import("./MobileBelgiumShellApp"),
  antwerp: () => import("./MobileAntwerpShellApp"),
  budapest: () => import("./MobileBudapestShellApp"),
  hungary: () => import("./MobileHungaryShellApp"),
  austria: () => import("./MobileAustriaShellApp"),
  vienna: () => import("./MobileViennaShellApp"),
  salzburg: () => import("./MobileSalzburgShellApp"),
  "wider-country": () => import("./MobileWiderCountryShellApp"),
  florianopolis: () => import("./MobileFlorianopolisShellApp"),
  rio: () => import("./MobileRioShellApp"),
  "ilha-grande": () => import("./MobileIlhaGrandeShellApp"),
  "natural-spaces": () => import("./MobileNaturalSpacesShellApp"),
  santos: () => import("./MobileSantosShellApp"),
  pantanal: () => import("./MobilePantanalShellApp"),
  bonito: () => import("./MobileBonitoShellApp"),
  manaus: () => import("./MobileManausShellApp"),
  salvador: () => import("./MobileSalvadorShellApp"),
  foz: () => import("./MobileFozShellApp"),
  "food-drink": () => import("./MobileFoodDrinkShellApp"),
  app: () => import("./App"),
};

function bootstrapPath() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/" || path === "/home") return ROUTE_BOOTSTRAP_MAP[path];
  if (!isMobileViewport()) return "app";
  return ROUTE_BOOTSTRAP_MAP[path] || "app";
}

function renderBootstrapComponent(Component, needsRoot) {
  root.render(
    <React.StrictMode>
      {needsRoot ? <Component root={root} /> : <Component />}
    </React.StrictMode>,
  );
}

const mobileBootstrap = bootstrapPath();
const bootstrapLoader =
  BOOTSTRAP_LOADERS[mobileBootstrap] || BOOTSTRAP_LOADERS.app;

bootstrapLoader().then(({ default: Component }) => {
  renderBootstrapComponent(Component, mobileBootstrap !== "app");
});
