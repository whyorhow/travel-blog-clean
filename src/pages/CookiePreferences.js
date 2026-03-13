import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

export default function CookiePreferences() {
  const navigate = useNavigate();
  const [cookiesAccepted, setCookiesAccepted] = useState(null); // null = no choice yet
  const [nonEssential, setNonEssential] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  // Load saved choices
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
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="relative text-white">
      <SEO
        title="Cookie Preferences | Nomad Scribbles"
        description="Manage your cookie preferences and learn about our privacy policy."
        slug="cookie-preferences"
      />

      <main className="px-4 py-8 max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold mb-6">Privacy & Cookie Policy</h1>

        <section>
          <p>
            This Privacy & Cookie Policy applies to all Nomad Scribbles websites, including our main site{" "}
            <a href="https://nomadscribbles.com" className="underline text-blue-400 hover:text-blue-300">
              nomadscribbles.com
            </a>{" "}
            and our shop{" "}
            <a href="https://nomadscribbles.co.uk" className="underline text-blue-400 hover:text-blue-300">
              nomadscribbles.co.uk
            </a>. Any reference to “our website” or “this site” applies to both unless otherwise stated.
          </p>
        </section>

        <section>
          <p>
            At Nomad Scribbles, we respect your privacy and are committed to protecting your personal data.
            Any personal information you provide, such as your email, will only be used to respond to your inquiries
            or for newsletter communications if you opt in. We never sell or share your information with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Cookies</h2>
          <p>
            We use cookies to enhance your experience on our websites. These include essential cookies for core
            functionality and optional cookies for analytics or marketing. Our shop platform{" "}
            <a href="https://nomadscribbles.co.uk" className="underline text-blue-400 hover:text-blue-300">
              nomadscribbles.co.uk
            </a>{" "}
            may also use additional cookies required by its eCommerce system. By accepting cookies, you allow us to
            collect anonymised data to understand how our sites are used and improve your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Connected Sites</h2>
          <p>
            Our shop at{" "}
            <a href="https://nomadscribbles.co.uk" className="underline text-blue-400 hover:text-blue-300">
              nomadscribbles.co.uk
            </a>{" "}
            is operated by the same Nomad Scribbles team and follows the same data protection standards described in
            this policy. When you visit our shop, cookies or analytics may function slightly differently due to the
            platform’s technical setup, but your privacy rights remain the same.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">External Links & Recommendations</h2>
          <p>
            Our site may include links to external recommended sites. These may use their own cookies or tracking
            technologies. We do not control these sites, so please review their privacy policies independently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
          <p>
            Select your cookie preference. Essential cookies are always active to ensure the website works correctly. Analytics cookies help us understand how visitors use the site, but are optional.
          </p>

          <div className="mt-2 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={cookiesAccepted && nonEssential}
                onChange={() => handleChoice("acceptAll")}
              />
              Accept all cookies (essential + analytics)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={cookiesAccepted && !nonEssential}
                onChange={() => handleChoice("nonEssentialOnly")}
              />
              Accept essential only
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={cookiesAccepted === false}
                onChange={() => handleChoice("rejectAll")}
              />
              Reject all non-essential cookies
            </label>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={newsletterOptIn}
              onChange={handleNewsletterChange}
              id="newsletterOptIn"
            />
            <label htmlFor="newsletterOptIn">
              I consent to receive the Nomad Scribbles newsletter via email (future option)
            </label>
          </div>

          <button
            onClick={handleSaveAndReturn}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-all duration-200"
          >
            Save choices and return
          </button>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Affiliate & Sponsored Content</h2>
          <p>
            Some links may support Nomad Scribbles through affiliate programs. Clicking these links means you are
            visiting a recommended site, and we may receive a small commission at no extra cost to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>
            For any questions regarding this policy, including your personal data or cookies, please visit our{" "}
            <Link to="/contact-us" className="underline text-blue-400 hover:text-blue-300">
              Contact page
            </Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
