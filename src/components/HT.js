// HT.js
import React from "react";
import HandwritingEngine from "./HandwritingEngine";
import { taglinePathData } from "./taglinePathData";

export default function HT() {
  return (
    <div>
      <HandwritingEngine
        d={taglinePathData}
        stroke="#5a7d42"
        strokeWidth={1.5}
        duration={6}
        pressure="medium"
        viewBox="0 0 303 18"
        width="100%"
        height="auto"
      />
    </div>
  );
}
