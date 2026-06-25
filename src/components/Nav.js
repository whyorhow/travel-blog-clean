import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BurgerButton from "./nav/BurgerButton";
import SidebarMenu from "./nav/SidebarMenu";
import SearchInput from "./nav/SearchInput";
import { NAV_CLUSTER_CLASS } from "./nav/siteHeaderLayout";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimeoutRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    if (document.body.classList.contains("lightbox-active")) return;
    setMenuOpen((s) => {
      const newState = !s;
      if (window.gtag) {
        window.gtag("event", newState ? "menu_open" : "menu_close", { event_category: "Navigation" });
      }
      return newState;
    });
  };

  const toggleSearch = () => {
    if (document.body.classList.contains("lightbox-active")) return;
    setSearchOpen((s) => !s);
  };

  const handleMenuEnter = () => {
    if (document.body.classList.contains("lightbox-active")) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMenuOpen(true);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 300);
  };

  useEffect(() => {
    const closeNavForLightbox = () => {
      if (!document.body.classList.contains("lightbox-active")) return;
      setMenuOpen(false);
      setSearchOpen(false);
    };
    closeNavForLightbox();
    const observer = new MutationObserver(closeNavForLightbox);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest?.(".header-nav-cluster") &&
        !e.target.closest?.(".burger-menu-container") &&
        !e.target.closest?.("#site-menu") &&
        menuOpen
      ) {
        setMenuOpen(false);
      }
      if (
        !e.target.closest?.(".header-nav-cluster") &&
        !e.target.closest?.(".search-container") &&
        searchOpen
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

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
      <div className={`header-nav-cluster ${NAV_CLUSTER_CLASS}`}>
        <SearchInput
          searchOpen={searchOpen}
          toggleSearch={toggleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
        <BurgerButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>

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
