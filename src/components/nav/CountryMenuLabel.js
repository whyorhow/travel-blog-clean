import React from "react";
import { getMenuHint } from "../../config/regionScope";

/** Country name in the side menu, with an honest scope hint when coverage is still thin. */
const CountryMenuLabel = ({ path, children }) => {
  const hint = getMenuHint(path);
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1">
      {children}
      {hint ? (
        <span className="text-stone-500 text-xs font-normal normal-case tracking-normal italic">
          · {hint}
        </span>
      ) : null}
    </span>
  );
};

export default CountryMenuLabel;
