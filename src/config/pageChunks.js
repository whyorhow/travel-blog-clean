/**
 * Single map of pathname → dynamic import. Used by routes (React.lazy) and prefetchRoute.
 */

export const chunkLoaders = {
  "/": () => import(/* webpackPrefetch: true */ "../pages/HomeNew"),
  "/nomads-gallery": () =>
    import(/* webpackPrefetch: true */ "../pages/NomadsGallery"),
  "/contact-us": () => import(/* webpackPrefetch: true */ "../pages/ContactUs"),
  "/search": () => import(/* webpackPrefetch: true */ "../pages/SearchResults"),
  "/nomads-shop": () =>
    import(/* webpackPrefetch: true */ "../pages/NomadsShop"),
  "/nomads-shop/brazil": () =>
    import(/* webpackPrefetch: true */ "../pages/NomadsShopBrazil"),
  "/nomads-shop/brazil/saopaulo": () =>
    import(/* webpackPrefetch: true */ "../pages/NomadsShopSaoPaulo"),
  "/nomads-shop/brazil/rio": () =>
    import(/* webpackPrefetch: true */ "../pages/NomadsShopCategory"),
  "/brazil": () => import(/* webpackPrefetch: true */ "../pages/Brazil"),
  "/brazil/saopaulo": () =>
    import(/* webpackPrefetch: true */ "../pages/SaoPaulo"),
  "/brazil/saopaulo/green-spaces": () =>
    import(/* webpackPrefetch: true */ "../pages/GreenSpaces"),
  "/brazil/saopaulo/galleries": () =>
    import(/* webpackPrefetch: true */ "../pages/ArtGalleries"),
  "/brazil/saopaulo/carnival": () =>
    import(/* webpackPrefetch: true */ "../pages/CarnivalSaoPaulo"),
  "/brazil/saopaulo/street-art": () =>
    import(/* webpackPrefetch: true */ "../pages/Graffiti"),
  "/brazil/santos": () => import(/* webpackPrefetch: true */ "../pages/Santos"),
  "/brazil/rio": () => import(/* webpackPrefetch: true */ "../pages/Rio"),
  "/brazil/rio/ilha-grande": () =>
    import(/* webpackPrefetch: true */ "../pages/IlhaGrande"),
  "/brazil/salvador": () =>
    import(/* webpackPrefetch: true */ "../pages/Salvador"),
  "/brazil/pantanal": () =>
    import(/* webpackPrefetch: true */ "../pages/Pantanal"),
  "/brazil/foz": () => import(/* webpackPrefetch: true */ "../pages/Iguazu"),
  "/brazil/manaus": () => import(/* webpackPrefetch: true */ "../pages/Manaus"),
  "/brazil/food-drink": () =>
    import(/* webpackPrefetch: true */ "../pages/BrazilFoodDrink"),
  "/brazil/natural-spaces": () =>
    import(/* webpackPrefetch: true */ "../pages/BrazilNaturalSpaces"),
  "/brazil/florianopolis": () =>
    import(/* webpackPrefetch: true */ "../pages/Florianopolis"),
  "/brazil/bonito": () => import(/* webpackPrefetch: true */ "../pages/Bonito"),
  "/belgium": () => import(/* webpackPrefetch: true */ "../pages/Belgium"),
  "/belgium/antwerp": () =>
    import(/* webpackPrefetch: true */ "../pages/AntwerpNew"),
  "/greece": () => import(/* webpackPrefetch: true */ "../pages/Greece"),
  "/greece/athens": () =>
    import(/* webpackPrefetch: true */ "../pages/AthensNew"),
  "/hungary": () => import(/* webpackPrefetch: true */ "../pages/Hungary"),
  "/hungary/budapest": () =>
    import(/* webpackPrefetch: true */ "../pages/BudapestNew"),
  "/austria": () => import(/* webpackPrefetch: true */ "../pages/Austria"),
  "/austria/vienna": () =>
    import(/* webpackPrefetch: true */ "../pages/ViennaNew"),
  "/austria/salzburg": () =>
    import(/* webpackPrefetch: true */ "../pages/SalzburgNew"),
  "/austria/wider-country": () =>
    import(/* webpackPrefetch: true */ "../pages/WiderCountryNew"),
  "/portugal": () => import(/* webpackPrefetch: true */ "../pages/Portugal"),
  "/portugal/lisbon": () =>
    import(/* webpackPrefetch: true */ "../pages/LisbonNew"),
  "/germany": () => import(/* webpackPrefetch: true */ "../pages/Germany"),
  "/germany/berlin": () =>
    import(/* webpackPrefetch: true */ "../pages/BerlinNew"),
  "/czech-republic": () =>
    import(/* webpackPrefetch: true */ "../pages/CzechRepublic"),
  "/czech-republic/prague": () =>
    import(/* webpackPrefetch: true */ "../pages/PragueNew"),
  "/czech-republic/bohemian-wilderness": () =>
    import(/* webpackPrefetch: true */ "../pages/BohemianWildernessNew"),
  "/united-states": () =>
    import(/* webpackPrefetch: true */ "../pages/UnitedStates"),
  "/united-states/tennessee": () =>
    import(/* webpackPrefetch: true */ "../pages/Tennessee"),
  "/united-states/tennessee/mountains": () =>
    import(/* webpackPrefetch: true */ "../pages/Mountains"),
  "/united-states/tennessee/memphis": () =>
    import(/* webpackPrefetch: true */ "../pages/Memphis"),
  "/united-states/tennessee/nashville": () =>
    import(/* webpackPrefetch: true */ "../pages/Nashville"),
  "/cookie-preferences": () =>
    import(/* webpackPrefetch: true */ "../pages/CookiePreferences"),
};

const prefetched = new Set();

export function prefetchRoute(pathname) {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (prefetched.has(path)) return;

  const loader =
    chunkLoaders[path] ||
    (path.startsWith("/nomads-shop/brazil/")
      ? chunkLoaders["/nomads-shop/brazil/rio"]
      : null);

  if (!loader) return;

  prefetched.add(path);
  loader();
}

/** Warm likely next pages after the shell is idle */
export const IDLE_PREFETCH_PATHS = [
  "/brazil",
  "/brazil/rio",
  "/brazil/saopaulo",
  "/nomads-gallery",
  "/nomads-shop",
];

/** Brazil hub: warm journey routes when the country page loads */
export const BRAZIL_HUB_PREFETCH_PATHS = [
  "/brazil/rio",
  "/brazil/saopaulo",
  "/brazil/salvador",
  "/brazil/pantanal",
  "/brazil/bonito",
  "/brazil/foz",
  "/brazil/florianopolis",
  "/brazil/food-drink",
  "/brazil/natural-spaces",
];
