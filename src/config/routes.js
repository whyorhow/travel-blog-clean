import React from "react";

import { Navigate } from "react-router-dom";

import { chunkLoaders } from "./pageChunks";

const lazy = (path) => React.lazy(chunkLoaders[path]);

const HomeNew = lazy("/");

const NomadsShop = lazy("/nomads-shop");

const NomadsShopBrazil = lazy("/nomads-shop/brazil");

const NomadsShopSaoPaulo = lazy("/nomads-shop/brazil/saopaulo");

const NomadsShopCategory = lazy("/nomads-shop/brazil/rio");

const Brazil = lazy("/brazil");

const SaoPaulo = lazy("/brazil/saopaulo");

const CarnivalSaoPaulo = lazy("/brazil/saopaulo/carnival");

const Graffiti = lazy("/brazil/saopaulo/street-art");

const Santos = lazy("/brazil/santos");

const GreenSpaces = lazy("/brazil/saopaulo/green-spaces");

const ArtGalleries = lazy("/brazil/saopaulo/galleries");

const Pantanal = lazy("/brazil/pantanal");

const Rio = lazy("/brazil/rio");

const Salvador = lazy("/brazil/salvador");

const NomadsGallery = lazy("/nomads-gallery");

const ContactUs = lazy("/contact-us");

const SearchResults = lazy("/search");

const NotFound = React.lazy(
  () => import(/* webpackPrefetch: true */ "../pages/NotFound"),
);

const CookiePreferences = lazy("/cookie-preferences");

const Florianopolis = lazy("/brazil/florianopolis");

const Iguazu = lazy("/brazil/foz");

const Bonito = lazy("/brazil/bonito");

const Manaus = lazy("/brazil/manaus");

const BrazilFoodDrink = lazy("/brazil/food-drink");

const BrazilNaturalSpaces = lazy("/brazil/natural-spaces");

const IlhaGrande = lazy("/brazil/rio/ilha-grande");

const Tennessee = lazy("/united-states/tennessee");

const Nashville = lazy("/united-states/tennessee/nashville");

const Memphis = lazy("/united-states/tennessee/memphis");

const UnitedStates = lazy("/united-states");

const Mountains = lazy("/united-states/tennessee/mountains");

const Belgium = lazy("/belgium");

const AntwerpNew = lazy("/belgium/antwerp");

const Greece = lazy("/greece");

const AthensNew = lazy("/greece/athens");

const Hungary = lazy("/hungary");

const BudapestNew = lazy("/hungary/budapest");

const Austria = lazy("/austria");

const ViennaNew = lazy("/austria/vienna");

const SalzburgNew = lazy("/austria/salzburg");

const WiderCountryNew = lazy("/austria/wider-country");

const Portugal = lazy("/portugal");

const LisbonNew = lazy("/portugal/lisbon");

const Germany = lazy("/germany");

const BerlinNew = lazy("/germany/berlin");

const CzechRepublic = lazy("/czech-republic");

const PragueNew = lazy("/czech-republic/prague");

const BohemianWildernessNew = lazy("/czech-republic/bohemian-wilderness");

export const routes = [
  // Core

  { path: "/", element: <HomeNew /> },

  { path: "/adventures", element: <Navigate to="/" replace /> },

  { path: "/nomads-gallery", element: <NomadsGallery /> },

  { path: "/contact-us", element: <ContactUs /> },

  { path: "/search", element: <SearchResults /> },

  // Shop

  { path: "/nomads-shop", element: <NomadsShop /> },

  { path: "/nomadsshop", element: <Navigate to="/nomads-shop" replace /> },

  { path: "/nomads-shop/brazil", element: <NomadsShopBrazil /> },

  { path: "/nomads-shop/brazil/saopaulo", element: <NomadsShopSaoPaulo /> },

  { path: "/nomads-shop/brazil/:city", element: <NomadsShopCategory /> },

  // Brazil

  { path: "/brazil", element: <Brazil /> },

  { path: "/brazil/rio", element: <Rio /> },

  { path: "/brazil/rio/ilha-grande", element: <IlhaGrande /> },

  {
    path: "/brazil/ilha-grande",
    element: <Navigate to="/brazil/rio/ilha-grande" replace />,
  },

  { path: "/brazil/salvador", element: <Salvador /> },

  { path: "/brazil/pantanal", element: <Pantanal /> },

  { path: "/brazil/foz", element: <Iguazu /> },

  { path: "/brazil/manaus", element: <Manaus /> },

  { path: "/brazil/food-drink", element: <BrazilFoodDrink /> },

  { path: "/brazil/natural-spaces", element: <BrazilNaturalSpaces /> },

  { path: "/brazil/saopaulo", element: <SaoPaulo /> },

  { path: "/brazil/saopaulo/green-spaces", element: <GreenSpaces /> },

  { path: "/brazil/saopaulo/galleries", element: <ArtGalleries /> },

  { path: "/brazil/saopaulo/carnival", element: <CarnivalSaoPaulo /> },

  { path: "/brazil/saopaulo/street-art", element: <Graffiti /> },

  {
    path: "/brazil/saopaulo/street-murals",
    element: <Navigate to="/brazil/saopaulo/street-art" replace />,
  },

  {
    path: "/brazil/saopaulo/murals",
    element: <Navigate to="/brazil/saopaulo/street-art" replace />,
  },

  {
    path: "/brazil/saopaulo/art-galleries",
    element: <Navigate to="/brazil/saopaulo/galleries" replace />,
  },

  {
    path: "/brazil/saopaulo/parks",
    element: <Navigate to="/brazil/saopaulo/green-spaces" replace />,
  },

  {
    path: "/brazil/saopaulo/museums",
    element: <Navigate to="/brazil/saopaulo/galleries" replace />,
  },

  {
    path: "/brazil/saopaulo/santos",
    element: <Navigate to="/brazil/santos" replace />,
  },

  { path: "/brazil/santos", element: <Santos /> },

  { path: "/brazil/florianopolis", element: <Florianopolis /> },

  { path: "/brazil/bonito", element: <Bonito /> },

  // Europe

  { path: "/belgium", element: <Belgium /> },

  { path: "/belgium/antwerp", element: <AntwerpNew /> },

  {
    path: "/belgium/antwerp-legacy",
    element: <Navigate to="/belgium/antwerp" replace />,
  },

  { path: "/greece", element: <Greece /> },

  { path: "/greece/athens", element: <AthensNew /> },

  {
    path: "/greece/athens-legacy",
    element: <Navigate to="/greece/athens" replace />,
  },

  { path: "/hungary", element: <Hungary /> },

  { path: "/hungary/budapest", element: <BudapestNew /> },

  {
    path: "/hungary/budapest-legacy",
    element: <Navigate to="/hungary/budapest" replace />,
  },

  { path: "/austria", element: <Austria /> },

  { path: "/austria/vienna", element: <ViennaNew /> },

  { path: "/austria/salzburg", element: <SalzburgNew /> },

  { path: "/austria/wider-country", element: <WiderCountryNew /> },

  { path: "/portugal", element: <Portugal /> },

  { path: "/portugal/lisbon", element: <LisbonNew /> },

  // Germany

  { path: "/germany", element: <Germany /> },

  { path: "/germany/berlin", element: <BerlinNew /> },

  { path: "/czech-republic", element: <CzechRepublic /> },

  { path: "/czech-republic/prague", element: <PragueNew /> },

  {
    path: "/czech-republic/bohemian-wilderness",
    element: <BohemianWildernessNew />,
  },

  {
    path: "/czech-republic/nature",
    element: <Navigate to="/czech-republic/bohemian-wilderness" replace />,
  },

  {
    path: "/czech-republic/kutna-hora",
    element: <Navigate to="/czech-republic/prague" replace />,
  },

  // USA

  { path: "/united-states", element: <UnitedStates /> },

  { path: "/united-states/tennessee", element: <Tennessee /> },

  { path: "/united-states/tennessee/mountains", element: <Mountains /> },

  { path: "/united-states/tennessee/memphis", element: <Memphis /> },

  { path: "/united-states/tennessee/nashville", element: <Nashville /> },

  // System

  {
    path: "/cookie-preferences",
    element: <CookiePreferences />,
    isCookieRoute: true,
  },

  { path: "*", element: <NotFound /> },
];
