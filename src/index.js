import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";

// Desktop: load all fonts up front to avoid idle font-swap CLS (mobile defers in App.js)
const isDesktop =
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px)").matches;

if (isDesktop) {
  require("@fontsource/cormorant-garamond/300.css");
  require("@fontsource/cormorant-garamond/500.css");
  require("@fontsource/dancing-script/400.css");
  require("@fontsource/dancing-script/500.css");
  require("@fontsource/dancing-script/600.css");
  require("@fontsource/dancing-script/700.css");
}

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
