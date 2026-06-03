import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

const externalLinkClass =
  "text-goldAccent underline underline-offset-2 transition-colors hover:text-warmGold";
const internalLinkClass = externalLinkClass;

function PolicySection({ title, children, dark = false }) {
  return (
    <section
      className={`rounded-2xl border px-5 py-5 sm:px-7 sm:py-6 shadow-card ${
        dark
          ? "border-warmGold/40 bg-stone-900 text-cream shadow-panel-deep"
          : "border-warmTaupe/20 bg-white/80 backdrop-blur-sm text-stone-800"
      }`}
    >
      {title && (
        <h2
          className={`font-cormorant text-xl sm:text-2xl font-semibold mb-3 ${
            dark ? "text-warmGold" : "text-warmTaupe"
          }`}
        >
          {title}
        </h2>
      )}
      <div
        className={`font-cormorant text-base sm:text-lg leading-relaxed space-y-3 ${
          dark ? "text-cream" : "text-stone-800"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function ChoiceOption({ id, name, checked, onChange, label, description }) {
  return (
    <label
      htmlFor={id}
      className={`flex gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-colors duration-200 ${
        checked
          ? "border-warmGold bg-stone-800 shadow-sm"
          : "border-stone-600 bg-stone-800/70 hover:border-stone-500"
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 shrink-0 accent-warmGold"
      />
      <span>
        <span className="block font-cormorant text-base sm:text-lg text-cream font-medium">{label}</span>
        {description && (
          <span className="block mt-0.5 text-sm text-cream/80 font-cormorant italic">{description}</span>
        )}
      </span>
    </label>
  );
}

export default function CookiePreferences({ onConsentChange }) {
  const navigate = useNavigate();
  const [cookiesAccepted, setCookiesAccepted] = useState(null);
  const [nonEssential, setNonEssential] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    const rejected = localStorage.getItem("cookiesRejected");
    const nonEssentialStored = localStorage.getItem("cookiesNonEssential") === "true";
    const newsletterStored = localStorage.getItem("newsletterOptIn") === "true";

    if (accepted === "true") setCookiesAccepted(true);
    else if (rejected === "true") setCookiesAccepted(false);

    setNonEssential(nonEssentialStored);
    setNewsletterOptIn(newsletterStored);
  }, []);

  const handleChoice = (choice) => {
    if (choice === "acceptAll") {
      setCookiesAccepted(true);
      setNonEssential(true);
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.setItem("cookiesNonEssential", "true");
      localStorage.removeItem("cookiesRejected");
    } else if (choice === "rejectAll") {
      setCookiesAccepted(false);
      setNonEssential(false);
      localStorage.setItem("cookiesRejected", "true");
      localStorage.removeItem("cookiesAccepted");
      localStorage.removeItem("cookiesNonEssential");
    } else if (choice === "nonEssentialOnly") {
      setCookiesAccepted(true);
      setNonEssential(false);
      localStorage.setItem("cookiesAccepted", "true");
      localStorage.setItem("cookiesNonEssential", "false");
      localStorage.removeItem("cookiesRejected");
    }
  };

  const handleNewsletterChange = () => {
    const newValue = !newsletterOptIn;
    setNewsletterOptIn(newValue);
    localStorage.setItem("newsletterOptIn", newValue.toString());
  };

  const handleSaveAndReturn = () => {
    if (cookiesAccepted === false) {
      onConsentChange?.(false);
    } else if (cookiesAccepted && nonEssential) {
      onConsentChange?.(true);
    } else if (cookiesAccepted) {
      onConsentChange?.(null);
    }
    navigate(-1);
  };

  const essentialOnly = cookiesAccepted === true && !nonEssential;
  const acceptAll = cookiesAccepted === true && nonEssential;
  const rejectAll = cookiesAccepted === false;

  return (
    <div className="relative pb-16 text-stone-800">
      <SEO
        title="Cookie Preferences | Nomad Scribbles"
        description="Manage your cookie preferences and learn about our privacy policy."
        slug="cookie-preferences"
      />

      <main className="px-4 sm:px-6 py-10 sm:py-14 max-w-3xl mx-auto space-y-6 sm:space-y-8">
        <header className="text-center pb-2">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-goldAccent font-semibold">
            Privacy
          </p>
          <h1 className="mt-2 font-cormorant text-3xl sm:text-4xl font-semibold text-warmTaupe leading-tight">
            Privacy &amp; Cookie Policy
          </h1>
          <div className="mt-3 mx-auto w-16 h-px bg-goldAccent/40" />
        </header>

        <PolicySection>
          <p>
            This policy applies to Nomad Scribbles at{" "}
            <a href="https://www.nomadscribbles.com" className={externalLinkClass}>
              nomadscribbles.com
            </a>
            , including adventures, the gallery, and the{" "}
            <Link to="/nomads-shop" className={internalLinkClass}>
              Nomads Shop
            </Link>
            .
          </p>
        </PolicySection>

        <PolicySection title="Your data">
          <p>
            We respect your privacy. Information you send us (such as your email) is only used to
            reply or, if you opt in, for newsletter updates. We do not sell your data.
          </p>
        </PolicySection>

        <PolicySection title="Cookies">
          <p>
            Essential cookies keep the site working. Optional analytics cookies help us understand
            how pages are used. Checkout on the Nomads Shop may use additional cookies from our
            print partner when you purchase. Accepting analytics allows anonymised usage data so we
            can improve the experience.
          </p>
        </PolicySection>

        <PolicySection title="External links">
          <p>
            Recommended external sites may use their own cookies. We do not control those sites —
            please read their policies separately.
          </p>
        </PolicySection>

        <PolicySection title="Your choices" dark>
          <p>
            Essential cookies always run so the site works. Analytics are optional — contact and
            other core features work without them.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <ChoiceOption
              id="accept-all"
              name="cookie-choice"
              checked={acceptAll}
              onChange={() => handleChoice("acceptAll")}
              label="Accept all cookies"
              description="Essential plus analytics"
            />
            <ChoiceOption
              id="essential-only"
              name="cookie-choice"
              checked={essentialOnly}
              onChange={() => handleChoice("nonEssentialOnly")}
              label="Essential only"
              description="No analytics tracking"
            />
            <ChoiceOption
              id="reject-non-essential"
              name="cookie-choice"
              checked={rejectAll}
              onChange={() => handleChoice("rejectAll")}
              label="Reject non-essential cookies"
              description="Essential cookies still active"
            />
          </div>

          <label
            htmlFor="newsletterOptIn"
            className="mt-5 flex gap-3 cursor-pointer rounded-xl border border-stone-600 bg-stone-800/70 px-4 py-3 hover:border-stone-500 transition-colors"
          >
            <input
              id="newsletterOptIn"
              type="checkbox"
              checked={newsletterOptIn}
              onChange={handleNewsletterChange}
              className="mt-1 h-4 w-4 shrink-0 accent-warmGold rounded"
            />
            <span className="font-cormorant text-base text-cream font-medium">
              Email me the Nomad Scribbles newsletter when it launches (optional)
            </span>
          </label>

          <button
            type="button"
            onClick={handleSaveAndReturn}
            className="mt-6 w-full sm:w-auto rounded-full border border-warmGold/50 bg-warmGold px-8 py-2.5 text-sm font-semibold uppercase tracking-wider text-warmTaupe shadow-md transition-all duration-200 hover:bg-galleryGold"
          >
            Save &amp; return
          </button>
        </PolicySection>

        <PolicySection title="Affiliate links">
          <p>
            Some links may earn a small commission if you visit a recommended site. This does not
            change the price you pay.
          </p>
        </PolicySection>

        <PolicySection title="Questions">
          <p>
            For anything about this policy or your data, visit our{" "}
            <Link to="/contact-us" className={internalLinkClass}>
              contact page
            </Link>
            .
          </p>
        </PolicySection>

        <div className="flex justify-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full border border-warmTaupe/25 bg-stone-950/60 backdrop-blur-md px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream shadow-lg transition-colors hover:border-warmGold/40 hover:bg-stone-900/70"
          >
            <span className="text-lg pb-0.5">←</span>
            Return home
          </Link>
        </div>
      </main>
    </div>
  );
}
