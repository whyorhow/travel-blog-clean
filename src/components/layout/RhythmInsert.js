import React from "react";

/**
 * RhythmInsert — Brief atmospheric moment between narrative beats.
 */
function RhythmInsert({ text, align = "left", variant = "light" }) {
  if (!text?.trim()) return null;

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <section
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12"
      aria-label="Journal rhythm note"
    >
      <p className={`editorial-diary-note ${alignClass}`}>{text}</p>
    </section>
  );
}

export default RhythmInsert;
