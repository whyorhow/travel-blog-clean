import React from "react";
import { shopTheme } from "./shopTheme";

/**
 * Shared shop page header — warm paper typography (matches design tokens).
 */
export default function ShopPageHeader({ title, subtitle, className = "" }) {
  return (
    <header
      className={`flex flex-col items-center mb-8 relative z-10 mt-14 sm:mt-8 px-4 text-center ${className}`}
    >
      <p className={shopTheme.brandTitle}>Nomads Shop</p>
      {title ? <h1 className={`${shopTheme.collectionTitle} mt-3`}>{title}</h1> : null}
      {subtitle ? <p className={`${shopTheme.subtitle} mt-2`}>{subtitle}</p> : null}
    </header>
  );
}
