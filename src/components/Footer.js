import React from "react";
import { useLocation } from "react-router-dom";
// FIX: Two dots (..) to go up one folder
import { trackEvent } from "../utils/analytics";

export default function Footer() {
  const location = useLocation();
  const onPreferencesPage = location.pathname === "/cookie-preferences";
  const year = new Date().getFullYear();

  const handleExternalClick = (action, category, label, url) => {
    trackEvent(action, category, label);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 100);
  };

  const handleInternalClick = (action, category, label, url) => {
    trackEvent(action, category, label);
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  };

  return (
    <footer className="relative z-50 w-full bg-[#AEA363] text-darkText p-2 md:p-3 border-t border-[#817e65] text-xs md:text-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-3 text-center md:text-left">

        {/* Left section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4">

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                handleExternalClick(
                  "click_instagram",
                  "Footer",
                  "Instagram",
                  "https://www.instagram.com/nomadscribbles"
                )
              }
              className="hover:text-lightText transition-colors"
            >
              <img
                src="/assets/Instaicon.svg"
                alt="Instagram"
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </button>
            <button
              onClick={() =>
                handleExternalClick(
                  "click_tiktok",
                  "Footer",
                  "TikTok",
                  "https://www.tiktok.com/@nomadscribbles"
                )
              }
              className="hover:text-lightText transition-colors"
            >
              <img
                src="/assets/TikTok.svg"
                alt="TikTok"
                className="w-[1.1rem] h-[1.1rem] md:w-[1.375rem] md:h-[1.375rem]"
              />
            </button>
            <button
              onClick={() =>
                handleExternalClick(
                  "click_x",
                  "Footer",
                  "X/Twitter",
                  "https://x.com/NomadScribblesX"
                )
              }
              className="hover:text-lightText transition-colors"
            >
              <img
                src="/assets/Xicon.svg"
                alt="X/Twitter"
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </button>

            {/* Small-screen favicon link */}
            <button
              onClick={() =>
                handleInternalClick(
                  "click_contact_footer",
                  "Footer",
                  "Favicon Small",
                  "/contact-us"
                )
              }
              className="md:hidden hover:opacity-90 transition-transform duration-300 ease-in-out hover:scale-110"
              aria-label="Contact us"
            >
              <img
                src="/assets/favicon-192x192.png"
                alt="Nomad Scribbles logo"
                className="w-4 h-4"
              />
            </button>
          </div>

          {/* Full tagline for medium+ screens */}
          <button
            onClick={() =>
              handleInternalClick(
                "click_contact_footer",
                "Footer",
                "Full Tagline",
                "/contact-us"
              )
            }
            className="hidden md:flex items-center gap-2 italic transition-all duration-300 hover:text-lightText hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          >
            <img
              src="/assets/favicon-192x192.png"
              alt="Nomad Scribbles logo"
              className="w-4 h-4 transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <span className="text-sm md:text-base">Wander and Wonder with us.</span>
          </button>
        </div>

        {/* Right section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-1 md:gap-3">

          {/* Mobile condensed text */}
          <div className="flex md:hidden items-center gap-1">
            <span>NS &copy; {year}</span>
            {!onPreferencesPage && (
              <>
                <span>|</span>
                <button
                  onClick={() =>
                    handleInternalClick(
                      "click_cookie_footer",
                      "Footer",
                      "Cookie Preferences",
                      "/cookie-preferences"
                    )
                  }
                  className="underline text-darkText hover:text-lightText"
                >
                  Cookies
                </button>
              </>
            )}
          </div>

          {/* Desktop text */}
          <div className="hidden md:flex items-center gap-3">
            <div>&copy; {year} Nomad Scribbles</div>
            {!onPreferencesPage && (
              <button
                onClick={() =>
                  handleInternalClick(
                    "click_cookie_footer",
                    "Footer",
                    "Change site preferences",
                    "/cookie-preferences"
                  )
                }
                className="underline text-darkText hover:text-lightText text-xs md:text-sm"
              >
                Change site preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}