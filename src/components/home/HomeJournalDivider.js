import React from "react";

/** Thin accent rule with centre dot — journal-style section break on warmTaupe. */
function HomeJournalDivider() {
  return (
    <div
      className="relative z-50 flex items-center justify-center gap-3 py-7 bg-warmTaupe"
      aria-hidden="true"
    >
      <span className="h-px w-10 sm:w-14 bg-warmGold/30" />
      <span className="w-1.5 h-1.5 rounded-sm bg-warmGold/45 rotate-45 shadow-[0_0_6px_rgba(224,201,106,0.25)]" />
      <span className="h-px w-10 sm:w-14 bg-warmGold/30" />
    </div>
  );
}

export default HomeJournalDivider;
