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
  if (path === "/brazil" && isMobileViewport()) return "brazil";
  if (path === "/brazil/saopaulo" && isMobileViewport()) return "saopaulo";
  if (path === "/brazil/florianopolis" && isMobileViewport()) return "florianopolis";
  if (path === "/brazil/rio" && isMobileViewport()) return "rio";
  if (path === "/brazil/santos" && isMobileViewport()) return "santos";
  if (path === "/brazil/pantanal" && isMobileViewport()) return "pantanal";
  if (path === "/brazil/bonito" && isMobileViewport()) return "bonito";
  if (path === "/brazil/manaus" && isMobileViewport()) return "manaus";
  if (path === "/brazil/salvador" && isMobileViewport()) return "salvador";
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
} else {
  import("./App").then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}
