import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SITE_UPDATES, formatUpdateDate } from "../../config/siteUpdates";
import HomeSectionHeading from "./HomeSectionHeading";

const WhatsNew = () => (
  <section
    className="relative z-40 bg-warmTaupe -mt-6 md:-mt-8 pt-16 md:pt-20 pb-8"
    aria-labelledby="latest-entries-heading"
  >
    <HomeSectionHeading
      id="latest-entries-heading"
      title="Latest Entries"
      subtitle="Fresh pages and paths — the site grows as we travel"
    />

    <ul className="max-w-xl mx-auto px-6 space-y-3">
      {SITE_UPDATES.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.06 }}
        >
          <Link
            to={item.path}
            className="group block rounded-xl border border-white/10 bg-stone-950/55 backdrop-blur-md px-5 py-4 shadow-panel-deep transition-all duration-300 hover:border-warmGold/35 hover:bg-stone-950/65"
          >
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-warmGold font-bold">
                {item.kind}
              </span>
              <span className="text-cream/40 font-light select-none" aria-hidden="true">•</span>
              <span className="text-[11px] sm:text-xs text-cream/80 font-cormorant font-semibold tracking-wide">
                {formatUpdateDate(item.date)}
              </span>
            </div>
            <h3 className="font-cormorant text-lg sm:text-xl font-bold text-cream group-hover:text-warmGold transition-colors">
              {item.title}
            </h3>
            <p className="mt-1 font-cormorant text-sm text-cream/85 leading-snug">{item.summary}</p>
          </Link>
        </motion.li>
      ))}
    </ul>
  </section>
);

export default WhatsNew;
