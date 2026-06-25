import React from "react";

/** Standalone section title — matches homepage journal typography (no container box). */
function HomeSectionHeading({ id, title, subtitle }) {
  return (
    <div className="relative z-10 text-center px-6 mb-10 md:mb-12 max-w-lg mx-auto">
      <h2
        id={id}
        className="text-sm md:text-base uppercase tracking-[0.35em] text-warmGold font-bold"
      >
        {title}
      </h2>
      <div className="mt-3 w-16 h-[1px] bg-cream/40 mx-auto" aria-hidden="true" />
      {subtitle && (
        <p className="mt-3 font-cormorant italic font-semibold leading-snug tracking-wide text-[#f5ecc8] text-[1.15rem] md:text-[1.3rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default HomeSectionHeading;
