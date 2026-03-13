
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BurgerButton from "./nav/BurgerButton";
import SidebarMenu from "./nav/SidebarMenu";
import SearchInput from "./nav/SearchInput";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if we should show the "Return to Brazil" global header link
  const showReturnLink = ["/brazil/florianopolis", "/brazil/bonito", "/brazil/pantanal", "/brazil/rio", "/brazil/salvador", "/brazil/foz", "/brazil/manaus", "/brazil/ilha-grande", "/brazil/saopaulo/santos"].includes(location.pathname);

  const [hideFloatingButton, setHideFloatingButton] = useState(true);

  useEffect(() => {
    if (!showReturnLink) return;

    const handleScroll = () => {
      // Hide button when near bottom of page (within 150px) OR near top (within 700px - feature image)
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      const isNearTop = window.scrollY < 700;
      setHideFloatingButton(isNearBottom || isNearTop);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showReturnLink]);

  const toggleMenu = () => {
    setMenuOpen((s) => {
      const newState = !s;
      if (window.gtag) {
        window.gtag("event", newState ? "menu_open" : "menu_close", { event_category: "Navigation" });
      }
      return newState;
    });
  };

  const toggleSearch = () => setSearchOpen((s) => !s);

  // Hover handlers for Menu
  const handleMenuEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMenuOpen(true);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 300); // 300ms delay to allow moving to the menu
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Logic adjusted to match extracted components classes/ids
      if (!e.target.closest?.(".burger-menu-container") && !e.target.closest?.("#site-menu") && menuOpen) {
        setMenuOpen(false);
      }
      if (!e.target.closest?.(".search-container") && searchOpen) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    let timeout;
    if (menuOpen || searchOpen) {
      // Optional auto-close logic if needed, currently disabled in previous code
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [menuOpen, searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      if (window.gtag) {
        window.gtag("event", "search", { event_category: "Navigation", event_label: searchQuery });
      }
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {showReturnLink && (
        <div className={`fixed top-16 lg:top-3 left-1/2 -translate-x-1/2 z-[10000] transition-opacity duration-500 ${hideFloatingButton ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <Link to="/brazil" className="flex flex-row items-center justify-center text-[#ceb752] hover:text-[#e8eac7] transition-colors drop-shadow-md bg-stone-950/80 backdrop-blur-md rounded-full px-4 py-0.5 border border-white/10 shadow-lg">
            <span className="text-lg mr-2 mb-0">←</span>
            <span className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-center leading-tight whitespace-nowrap">
              Return to Brazil
            </span>
          </Link>
        </div>
      )}

      <SearchInput
        searchOpen={searchOpen}
        toggleSearch={toggleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />

      <BurgerButton
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleMenuEnter={handleMenuEnter}
        handleMenuLeave={handleMenuLeave}
      />

      <SidebarMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleMenuEnter={handleMenuEnter}
        handleMenuLeave={handleMenuLeave}
      />
    </>
  );
}

export default Nav;