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

function bootstrapPath() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/" || path === "/home") return "home";
  if (path === "/united-states" && isMobileViewport()) return "united-states";
  if (path === "/united-states/tennessee" && isMobileViewport()) return "tennessee";
  if (path === "/united-states/tennessee/memphis" && isMobileViewport()) return "memphis";
  if (path === "/united-states/tennessee/nashville" && isMobileViewport()) return "nashville";
  if (path === "/united-states/tennessee/mountains" && isMobileViewport()) return "mountains";
  if (path === "/brazil" && isMobileViewport()) return "brazil";
  if (path === "/brazil/saopaulo" && isMobileViewport()) return "saopaulo";
  if (path === "/brazil/saopaulo/green-spaces" && isMobileViewport()) return "green-spaces";
  if (path === "/brazil/saopaulo/street-art" && isMobileViewport()) return "street-art";
  if (path === "/brazil/saopaulo/carnival" && isMobileViewport()) return "carnival";
  if (path === "/brazil/saopaulo/galleries" && isMobileViewport()) return "galleries";
  if (path === "/belgium" && isMobileViewport()) return "belgium";
  if (path === "/belgium/antwerp" && isMobileViewport()) return "antwerp";
  if (path === "/greece" && isMobileViewport()) return "greece";
  if (path === "/greece/athens" && isMobileViewport()) return "athens";
  if (path === "/hungary" && isMobileViewport()) return "hungary";
  if (path === "/hungary/budapest" && isMobileViewport()) return "budapest";
  if (path === "/austria" && isMobileViewport()) return "austria";
  if (path === "/austria/vienna" && isMobileViewport()) return "vienna";
  if (path === "/austria/salzburg" && isMobileViewport()) return "salzburg";
  if (path === "/austria/wider-country" && isMobileViewport()) return "wider-country";
  if (path === "/brazil/florianopolis" && isMobileViewport()) return "florianopolis";
  if (path === "/brazil/rio" && isMobileViewport()) return "rio";
  if (path === "/brazil/rio/ilha-grande" && isMobileViewport()) return "ilha-grande";
  if (path === "/brazil/natural-spaces" && isMobileViewport()) return "natural-spaces";
  if (path === "/brazil/santos" && isMobileViewport()) return "santos";
  if (path === "/brazil/pantanal" && isMobileViewport()) return "pantanal";
  if (path === "/brazil/bonito" && isMobileViewport()) return "bonito";
  if (path === "/brazil/manaus" && isMobileViewport()) return "manaus";
  if (path === "/brazil/salvador" && isMobileViewport()) return "salvador";
  if (path === "/brazil/foz" && isMobileViewport()) return "foz";
  if (path === "/brazil/food-drink" && isMobileViewport()) return "food-drink";
  return "app";
}

const mobileBootstrap = bootstrapPath();

if (mobileBootstrap === "home") {
  import("./MobileShellApp").then(({ default: MobileShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "united-states") {
  import("./MobileUnitedStatesShellApp").then(({ default: MobileUnitedStatesShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileUnitedStatesShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "tennessee") {
  import("./MobileTennesseeShellApp").then(({ default: MobileTennesseeShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileTennesseeShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "memphis") {
  import("./MobileMemphisShellApp").then(({ default: MobileMemphisShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileMemphisShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "nashville") {
  import("./MobileNashvilleShellApp").then(({ default: MobileNashvilleShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileNashvilleShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "mountains") {
  import("./MobileMountainsShellApp").then(({ default: MobileMountainsShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileMountainsShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "brazil") {
  import("./MobileBrazilShellApp").then(({ default: MobileBrazilShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileBrazilShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "saopaulo") {
  import("./MobileSaoPauloShellApp").then(({ default: MobileSaoPauloShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileSaoPauloShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "green-spaces") {
  import("./MobileGreenSpacesShellApp").then(({ default: MobileGreenSpacesShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileGreenSpacesShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "street-art") {
  import("./MobileStreetArtShellApp").then(({ default: MobileStreetArtShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileStreetArtShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "carnival") {
  import("./MobileCarnivalSaoPauloShellApp").then(({ default: MobileCarnivalSaoPauloShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileCarnivalSaoPauloShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "galleries") {
  import("./MobileArtGalleriesShellApp").then(({ default: MobileArtGalleriesShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileArtGalleriesShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "greece") {
  import("./MobileGreeceShellApp").then(({ default: MobileGreeceShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileGreeceShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "athens") {
  import("./MobileAthensShellApp").then(({ default: MobileAthensShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileAthensShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "belgium") {
  import("./MobileBelgiumShellApp").then(({ default: MobileBelgiumShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileBelgiumShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "antwerp") {
  import("./MobileAntwerpShellApp").then(({ default: MobileAntwerpShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileAntwerpShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "budapest") {
  import("./MobileBudapestShellApp").then(({ default: MobileBudapestShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileBudapestShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "hungary") {
  import("./MobileHungaryShellApp").then(({ default: MobileHungaryShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileHungaryShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "austria") {
  import("./MobileAustriaShellApp").then(({ default: MobileAustriaShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileAustriaShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "vienna") {
  import("./MobileViennaShellApp").then(({ default: MobileViennaShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileViennaShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "salzburg") {
  import("./MobileSalzburgShellApp").then(({ default: MobileSalzburgShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileSalzburgShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "wider-country") {
  import("./MobileWiderCountryShellApp").then(({ default: MobileWiderCountryShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileWiderCountryShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "florianopolis") {
  import("./MobileFlorianopolisShellApp").then(({ default: MobileFlorianopolisShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileFlorianopolisShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "rio") {
  import("./MobileRioShellApp").then(({ default: MobileRioShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileRioShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "ilha-grande") {
  import("./MobileIlhaGrandeShellApp").then(({ default: MobileIlhaGrandeShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileIlhaGrandeShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "natural-spaces") {
  import("./MobileNaturalSpacesShellApp").then(({ default: MobileNaturalSpacesShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileNaturalSpacesShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "santos") {
  import("./MobileSantosShellApp").then(({ default: MobileSantosShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileSantosShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "pantanal") {
  import("./MobilePantanalShellApp").then(({ default: MobilePantanalShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobilePantanalShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "bonito") {
  import("./MobileBonitoShellApp").then(({ default: MobileBonitoShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileBonitoShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "manaus") {
  import("./MobileManausShellApp").then(({ default: MobileManausShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileManausShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "salvador") {
  import("./MobileSalvadorShellApp").then(({ default: MobileSalvadorShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileSalvadorShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "foz") {
  import("./MobileFozShellApp").then(({ default: MobileFozShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileFozShellApp root={root} />
      </React.StrictMode>
    );
  });
} else if (mobileBootstrap === "food-drink") {
  import("./MobileFoodDrinkShellApp").then(({ default: MobileFoodDrinkShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileFoodDrinkShellApp root={root} />
      </React.StrictMode>
    );
  });
} else {
  import("./App").then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}
