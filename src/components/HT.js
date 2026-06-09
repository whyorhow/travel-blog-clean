// HT.js
import React from "react";
import HandwritingEngine from "./HandwritingEngine";
import { taglinePathData } from "./taglinePathData";

export default function HT({ instantOnMobile = false }) {
  const isMobile =
    instantOnMobile &&
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  return (
    <div>
      <HandwritingEngine
        d={taglinePathData}
        stroke="#5a7d42"
        strokeWidth={1.5}
        duration={isMobile ? 0 : 6}
        pressure="medium"
        viewBox="0 0 303 18"
        width="100%"
        height="auto"
      />
    </div>
  );
}
