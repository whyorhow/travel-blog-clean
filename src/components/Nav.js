
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BurgerButton from "./nav/BurgerButton";
import SidebarMenu from "./nav/SidebarMenu";
import SearchInput from "./nav/SearchInput";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimeoutRef = useRef(null);

  const navigate = useNavigate();

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
    if (document.body.classList.contains("filmstrip-viewer-active")) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMenuOpen(true);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 300); // 300ms delay to allow moving to the menu
  };

  useEffect(() => {
    const closeNavForFilmstrip = () => {
      if (!document.body.classList.contains("filmstrip-viewer-active")) return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    closeNavForFilmstrip();
    const observer = new MutationObserver(closeNavForFilmstrip);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

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
      <SearchInput
        searchOpen={searchOpen}
        toggleSearch={toggleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />

      <SidebarMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleMenuEnter={handleMenuEnter}
        handleMenuLeave={handleMenuLeave}
      />

      <BurgerButton
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleMenuEnter={handleMenuEnter}
        handleMenuLeave={handleMenuLeave}
      />
    </>
  );
}

export default Nav;
