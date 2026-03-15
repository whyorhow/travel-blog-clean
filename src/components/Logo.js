import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

export default function Logo({ className }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    trackEvent("click_logo", "Navigation", "Logo Click");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    trackEvent("hover_logo", "Navigation", "Logo Hover");
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="relative inline-block cursor-pointer" // removed extra padding
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/" onClick={handleClick}>
        <img
          src="/assets/LogoV5.svg"
          alt="Site Logo"
          className={className}
        />
      </Link>

      {/* Tooltip / Label (desktop only, subtle fade + slide animation, below logo) */}
      <div
        className={`hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2
                    px-2 py-1 bg-[#37462f]/90 text-[#eeda8d] text-xs rounded shadow-md
                    pointer-events-none whitespace-nowrap z-50
                    transition-all duration-300 ease-in-out
                    ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        Return to Home
      </div>
    </div>
  );
}
