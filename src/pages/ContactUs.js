import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trackEvent } from "../utils/analytics";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import ContactTitle from "../assets/images/ContactTitle.svg";

import SEO from "../components/SEO";

// Import analytics helper


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

    // GDPR consent check
    const nonEssentialConsent = localStorage.getItem("cookiesNonEssential") === "true";
    if (!nonEssentialConsent) {
      alert("You must accept non-essential cookies to send us a message.");
      return;
    }

    // Track GA event if consent given
    const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";
    if (cookiesAccepted) {
      trackEvent("submit_contact_form", "Contact", "Contact Us Form");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message);

      if (res.ok) setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Log removed
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center px-4 pt-4 pb-10">
      {/* SEO */}
      <SEO
        title="Contact Us | Nomad Scribbles"
        description="Get in touch with Nomad Scribbles — send us a message and share your travel adventures or questions."
        image={cloudinaryUrlFromLegacyPath("/images/Contact/ContactBackground.png", { width: 1200 })}
        slug="contact-us"
      />

      {/* Hidden H1 for accessibility */}
      <h1 className="sr-only">Contact Us | Nomad Scribbles</h1>



      {/* Page Title */}
      <div className="relative z-10 mt-14 mb-6 text-center">
        <img
          src={ContactTitle}
          alt="Contact Us"
          className="w-[220px] sm:w-[300px] md:w-[400px] mx-auto"
        />
      </div>


      {/* Contact Form */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center border border-white/20"
      >
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Name */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <label htmlFor="name" className="block mb-1 font-medium text-[#1C1F13]">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-gray-400 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5FCD9] focus:border-[#F5FCD9]"
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <label htmlFor="email" className="block mb-1 font-medium text-[#1C1F13]">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-gray-400 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5FCD9] focus:border-[#F5FCD9]"
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <label htmlFor="message" className="block mb-1 font-medium text-[#1C1F13]">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-gray-400 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5FCD9] focus:border-[#F5FCD9]"
            />
          </motion.div>

          {/* GDPR / Consent Notice */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-sm text-gray-700"
          >
            By sending this message, you consent to Nomad Scribbles collecting and using your information to respond. See our{" "}
            <a href="/cookie-preferences" className="underline text-[#1C1F13]">Privacy & Cookie Policy</a>.
          </motion.div>

          {/* Submit */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex justify-center">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(245, 252, 217, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-400 text-[#1C1F13] font-semibold py-2 px-6 rounded-full transition-transform duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.div>
        </form>
      </motion.main>

      <div className="flex flex-col items-center gap-6 mt-12 mb-12 relative z-10">
        <Link to="/" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return Home</span>
        </Link>
      </div>
    </div>
  );
}
