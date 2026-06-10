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
} else {
  import("./App").then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}
