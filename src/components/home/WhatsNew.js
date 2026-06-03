import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SITE_UPDATES, formatUpdateDate } from "../../config/siteUpdates";

const WhatsNew = () => (
  <section className="relative z-50 bg-warmTaupe pt-12 pb-6">
    <div className="max-w-2xl mx-auto px-6 text-center mb-8">
      <div className="relative bg-warmMuted/50 backdrop-blur-md rounded-2xl px-8 py-6 shadow-panel-deep border border-white/10">
        <p className="text-sm md:text-base uppercase tracking-[0.35em] text-warmGold font-semibold">
          What&apos;s new
        </p>
        <div className="mt-3 w-16 h-[1px] bg-cream/40 mx-auto" />
        <p className="mt-3 font-cormorant italic leading-snug tracking-wide text-cream text-[1.05rem] md:text-[1.25rem]">
          Fresh pages and paths — the site grows as we travel
        </p>
      </div>
    </div>

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
            className="group block rounded-xl border border-white/10 bg-stone-950/35 backdrop-blur-md px-5 py-4 shadow-panel-deep transition-all duration-300 hover:border-warmGold/35 hover:bg-stone-950/50"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-warmGold/90 font-semibold">
                {item.kind}
              </span>
              <span className="text-[10px] text-cream/50 font-cormorant italic">
                {formatUpdateDate(item.date)}
              </span>
            </div>
            <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-cream group-hover:text-warmGold transition-colors">
              {item.title}
            </h3>
            <p className="mt-1 font-cormorant text-sm text-cream/75 leading-snug">{item.summary}</p>
          </Link>
        </motion.li>
      ))}
    </ul>
  </section>
);

export default WhatsNew;
