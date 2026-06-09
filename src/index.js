import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "./index.css";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

const isMobileHome =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches &&
  (window.location.pathname === "/" ||
    window.location.pathname === "/home" ||
    window.location.pathname === "");

if (isMobileHome) {
  import("./MobileShellApp").then(({ default: MobileShellApp }) => {
    root.render(
      <React.StrictMode>
        <MobileShellApp root={root} />
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
