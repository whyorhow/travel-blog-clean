import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trackEvent } from "../utils/analytics";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import ContactTitle from "../assets/images/ContactTitle.svg";
import SEO from "../components/SEO";

const fieldClass =
  "w-full rounded-lg border border-warmTaupe/30 bg-white px-3 py-2.5 font-cormorant text-base text-stone-800 placeholder:text-stone-400 outline-none transition-colors focus:border-goldAccent focus:ring-1 focus:ring-goldAccent/40";
const labelClass = "block mb-1.5 font-cormorant text-base font-semibold text-warmTaupe";
const primaryBtn =
  "inline-flex items-center justify-center rounded-full border border-warmGold/50 bg-warmGold px-8 py-3 text-sm font-semibold uppercase tracking-wider text-warmTaupe shadow-md transition-all duration-200 hover:bg-galleryGold hover:border-warmGold disabled:opacity-60 disabled:pointer-events-none";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";
    const analyticsAllowed = localStorage.getItem("cookiesNonEssential") === "true";
    if (cookiesAccepted && analyticsAllowed) {
      trackEvent("submit_contact_form", "Contact", "Contact Us Form");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const raw = await res.text();
      let result = {};
      try {
        result = raw ? JSON.parse(raw) : {};
      } catch {
        console.error("Contact API returned non-JSON:", res.status, raw.slice(0, 200));
        alert(
          process.env.NODE_ENV === "development"
            ? "Contact API is not reachable from the dev server. Run `npx vercel dev`, or set CONTACT_API_PROXY in .env.development.local (see .env.example)."
            : "There was an error sending your message. Please try again later."
        );
        return;
      }

      alert(
        result.message ||
          (res.ok
            ? "Email sent successfully!"
            : "There was an error sending your message. Please try again later.")
      );

      if (res.ok) setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form request failed:", err);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center px-4 sm:px-6 pt-10 sm:pt-12 pb-20 text-stone-800">
      <SEO
        title="Contact | Nomad Scribbles"
        description="Get in touch with Nomad Scribbles — questions, feedback, or notes from the road."
        image={cloudinaryUrlFromLegacyPath("/images/Contact/ContactBackground.png", { width: 1200 })}
        slug="contact-us"
      />

      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl"
      >
        <img
          src={ContactTitle}
          alt=""
          aria-hidden="true"
          className="w-[200px] sm:w-[280px] md:w-[340px] mx-auto"
        />
        <h1 className="sr-only">Contact Nomad Scribbles</h1>
        <p className="mt-5 font-cormorant italic text-lg sm:text-xl text-stone-700 leading-snug">
          Questions, feedback, or a note from your own travels — we read every message.
        </p>
      </motion.header>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative z-10 mt-10 w-full max-w-md rounded-2xl border border-warmTaupe/20 bg-white/80 backdrop-blur-sm shadow-card px-6 py-7 sm:px-8 sm:py-8"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div variants={fadeUp}>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={fieldClass}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={fieldClass}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className={`${fieldClass} resize-y min-h-[120px]`}
            />
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm font-cormorant leading-relaxed text-stone-600">
            By sending this message, you consent to us using your details to reply. Analytics cookies
            are not required. See our{" "}
            <Link
              to="/cookie-preferences"
              className="text-goldAccent underline underline-offset-2 hover:text-warmGold transition-colors"
            >
              Privacy &amp; Cookie Policy
            </Link>
            .
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center pt-1">
            <button type="submit" disabled={loading} className={primaryBtn}>
              {loading ? "Sending…" : "Send message"}
            </button>
          </motion.div>
        </form>
      </motion.main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-3 rounded-full border border-warmTaupe/25 bg-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-warmTaupe shadow-sm transition-colors hover:border-goldAccent/50 hover:bg-white"
        >
          <span className="text-lg pb-0.5" aria-hidden="true">
            ←
          </span>
          Return home
        </Link>
      </motion.div>
    </div>
  );
}
