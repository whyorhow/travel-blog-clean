import React from "react";
import { Navigate } from "react-router-dom";

// Lazy load all page components
const HomeNew = React.lazy(() => import("../pages/HomeNew"));
const NomadsShop = React.lazy(() => import("../pages/NomadsShop"));
const NomadsShopBrazil = React.lazy(() => import("../pages/NomadsShopBrazil"));
const NomadsShopSaoPaulo = React.lazy(() => import("../pages/NomadsShopSaoPaulo"));
const NomadsShopCategory = React.lazy(() => import("../pages/NomadsShopCategory"));
const Brazil = React.lazy(() => import("../pages/Brazil"));
const SaoPaulo = React.lazy(() => import("../pages/SaoPaulo"));
const CarnivalSaoPaulo = React.lazy(() => import("../pages/CarnivalSaoPaulo"));
const Graffiti = React.lazy(() => import("../pages/Graffiti"));
const Santos = React.lazy(() => import("../pages/Santos"));
const GreenSpaces = React.lazy(() => import("../pages/GreenSpaces"));
const ArtGalleries = React.lazy(() => import("../pages/ArtGalleries"));
const Pantanal = React.lazy(() => import("../pages/Pantanal"));
const Rio = React.lazy(() => import("../pages/Rio"));
const Salvador = React.lazy(() => import("../pages/Salvador"));
const NomadsGallery = React.lazy(() => import("../pages/NomadsGallery"));
const ContactUs = React.lazy(() => import("../pages/ContactUs"));
const SearchResults = React.lazy(() => import("../pages/SearchResults"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const CookiePreferences = React.lazy(() => import("../pages/CookiePreferences"));
const Florianopolis = React.lazy(() => import("../pages/Florianopolis"));
const Iguazu = React.lazy(() => import("../pages/Iguazu"));
const Bonito = React.lazy(() => import("../pages/Bonito"));
const Manaus = React.lazy(() => import("../pages/Manaus"));
const BrazilFoodDrink = React.lazy(() => import("../pages/BrazilFoodDrink"));
const BrazilNaturalSpaces = React.lazy(() => import("../pages/BrazilNaturalSpaces"));
const IlhaGrande = React.lazy(() => import("../pages/IlhaGrande"));
const Tennessee = React.lazy(() => import("../pages/Tennessee"));
const Nashville = React.lazy(() => import("../pages/Nashville"));
const Memphis = React.lazy(() => import("../pages/Memphis"));
const UnitedStates = React.lazy(() => import("../pages/UnitedStates"));
const Mountains = React.lazy(() => import("../pages/Mountains"));
const Belgium = React.lazy(() => import("../pages/Belgium"));
const AntwerpNew = React.lazy(() => import("../pages/AntwerpNew"));
const Greece = React.lazy(() => import("../pages/Greece"));
const AthensNew = React.lazy(() => import("../pages/AthensNew"));
const Hungary = React.lazy(() => import("../pages/Hungary"));
const BudapestNew = React.lazy(() => import("../pages/BudapestNew"));

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
  { path: "/brazil/salvador", element: <Salvador /> },
  { path: "/brazil/pantanal", element: <Pantanal /> },
  { path: "/brazil/foz", element: <Iguazu /> },
  { path: "/brazil/manaus", element: <Manaus /> },
  { path: "/brazil/ilha-grande", element: <IlhaGrande /> },
  { path: "/brazil/food-drink", element: <BrazilFoodDrink /> },
  { path: "/brazil/natural-spaces", element: <BrazilNaturalSpaces /> },
  { path: "/brazil/saopaulo", element: <SaoPaulo /> },
  { path: "/brazil/saopaulo/green-spaces", element: <GreenSpaces /> },
  { path: "/brazil/saopaulo/galleries", element: <ArtGalleries /> },
  { path: "/brazil/saopaulo/carnival", element: <CarnivalSaoPaulo /> },
  { path: "/brazil/saopaulo/street-art", element: <Graffiti /> },
  { path: "/brazil/saopaulo/street-murals", element: <Navigate to="/brazil/saopaulo/street-art" replace /> },
  { path: "/brazil/saopaulo/murals", element: <Navigate to="/brazil/saopaulo/street-art" replace /> },
  { path: "/brazil/saopaulo/art-galleries", element: <Navigate to="/brazil/saopaulo/galleries" replace /> },
  { path: "/brazil/saopaulo/parks", element: <Navigate to="/brazil/saopaulo/green-spaces" replace /> },
  { path: "/brazil/saopaulo/museums", element: <Navigate to="/brazil/saopaulo/galleries" replace /> },
  { path: "/brazil/saopaulo/santos", element: <Navigate to="/brazil/santos" replace /> },
  { path: "/brazil/santos", element: <Santos /> },
  { path: "/brazil/florianopolis", element: <Florianopolis /> },
  { path: "/brazil/bonito", element: <Bonito /> },
  
  // Europe
  { path: "/belgium", element: <Belgium /> },
  { path: "/belgium/antwerp", element: <AntwerpNew /> },
  { path: "/belgium/antwerp-legacy", element: <Navigate to="/belgium/antwerp" replace /> },
  
  { path: "/greece", element: <Greece /> },
  { path: "/greece/athens", element: <AthensNew /> },
  { path: "/greece/athens-legacy", element: <Navigate to="/greece/athens" replace /> },
  
  { path: "/hungary", element: <Hungary /> },
  { path: "/hungary/budapest", element: <BudapestNew /> },
  { path: "/hungary/budapest-legacy", element: <Navigate to="/hungary/budapest" replace /> },
  
  // USA
  { path: "/united-states", element: <UnitedStates /> },
  { path: "/united-states/tennessee", element: <Tennessee /> },
  { path: "/united-states/tennessee/mountains", element: <Mountains /> },
  { path: "/united-states/tennessee/memphis", element: <Memphis /> },
  { path: "/united-states/tennessee/nashville", element: <Nashville /> },

  // System
  { path: "/cookie-preferences", element: <CookiePreferences />, isCookieRoute: true },
  { path: "*", element: <NotFound /> }
];
