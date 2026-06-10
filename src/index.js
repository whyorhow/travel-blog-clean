import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "./index.css";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

function mobileLitePathname() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return path === "/" || path === "/home" || path === "/brazil" ? path : null;
}

const isMobileLite =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches &&
  mobileLitePathname();

if (isMobileLite) {
  const renderShell = (ShellApp) => {
    root.render(
      <React.StrictMode>
        <ShellApp root={root} />
      </React.StrictMode>
    );
  };
  if (mobileLitePathname() === "/brazil") {
    import(/* webpackPrefetch: true */ "./MobileBrazilShellApp").then(({ default: ShellApp }) => {
      renderShell(ShellApp);
    });
  } else {
    import(/* webpackPrefetch: true */ "./MobileShellApp").then(({ default: ShellApp }) => {
      renderShell(ShellApp);
    });
  }
} else {
  import("./App").then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}
