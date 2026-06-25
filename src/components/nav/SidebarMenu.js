import React, { useState } from "react";
import { Link } from "react-router-dom";
import bulletpoint from "../../assets/images/Bulletpoint.svg";
import CountryRegionNav from "./CountryRegionNav";

const Bullet = ({ rotation = 0 }) => (
    <img src={bulletpoint} alt="" className="w-1.5 h-1.5 mr-2 inline-block opacity-80" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true" />
);

const randomRot = () => Math.floor(Math.random() * 360);

const SidebarMenu = ({ menuOpen, setMenuOpen, handleMenuEnter, handleMenuLeave }) => {
    const [openBrazil, setOpenBrazil] = useState(false);
    const [openUS, setOpenUS] = useState(false);
    const [openBelgium, setOpenBelgium] = useState(false);
    const [openGreece, setOpenGreece] = useState(false);
    const [openAustria, setOpenAustria] = useState(false);
    const [openCzech, setOpenCzech] = useState(false);
    const [openHungary, setOpenHungary] = useState(false);

    const toggleSubmenu = (name, setter) => {
        setter((s) => {
            const newState = !s;
            if (window.gtag) {
                window.gtag("event", `${name}_toggle`, {
                    event_category: "Navigation",
                    event_label: newState ? "open" : "close",
                });
            }
            return newState;
        });
    };

    return (
        <div
            id="site-menu"
            className={`fixed top-0 right-0 h-screen w-64 z-[9998] flex flex-col pt-14 p-4 gap-2 text-lg overflow-y-auto
    transform transition-transform duration-800 ease-[cubic-bezier(0.25,0.8,0.25,1)]
    bg-stone-950/95
    ${menuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}`}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
        >
            <Link className="text-stone-300 text-lg hover:text-white transition-colors" to="/" onClick={() => setMenuOpen(false)}>Adventures Home</Link>

            <div className="ml-6 flex flex-col gap-2">
                <CountryRegionNav
                    hubPath="/brazil"
                    to="/brazil"
                    isOpen={openBrazil}
                    onToggle={() => toggleSubmenu("brazil", setOpenBrazil)}
                    onNavigate={() => setMenuOpen(false)}
                    bullet={<Bullet rotation={randomRot()} />}
                    toggleLabel="Toggle brazil submenu"
                >
                    Brazil
                </CountryRegionNav>

                <CountryRegionNav
                    hubPath="/united-states"
                    to="/united-states"
                    isOpen={openUS}
                    onToggle={() => toggleSubmenu("us", setOpenUS)}
                    onNavigate={() => setMenuOpen(false)}
                    bullet={<Bullet rotation={randomRot()} />}
                    toggleLabel="Toggle US submenu"
                >
                    United States
                </CountryRegionNav>

                <CountryRegionNav
                    hubPath="/austria"
                    to="/austria"
                    isOpen={openAustria}
                    onToggle={() => toggleSubmenu("austria", setOpenAustria)}
                    onNavigate={() => setMenuOpen(false)}
                    bullet={<Bullet rotation={randomRot()} />}
                    toggleLabel="Toggle austria submenu"
                >
                    Austria
                </CountryRegionNav>

                <CountryRegionNav
                    hubPath="/belgium"
                    to="/belgium"
                    isOpen={openBelgium}
                    onToggle={() => toggleSubmenu("belgium", setOpenBelgium)}
                    onNavigate={() => setMenuOpen(false)}
                    bullet={<Bullet rotation={randomRot()} />}
                    toggleLabel="Toggle belgium submenu"
                >
                    Belgium
                </CountryRegionNav>

                <CountryRegionNav
                    hubPath="/czech-republic"
                    to="/czech-republic"
                    isOpen={openCzech}
                    onToggle={() => toggleSubmenu("czech", setOpenCzech)}
                    onNavigate={() => setMenuOpen(false)}
                    bullet={<Bullet rotation={randomRot()} />}
                    toggleLabel="Toggle czech submenu"
                >
                    Czech Republic
                </CountryRegionNav>

                <CountryRegionNav
                    hubPath="/greece"
                    to="/greece"
                    isOpen={openGreece}
                    onToggle={() => toggleSubmenu("greece", setOpenGreece)}
                    onNavigate={() => setMenuOpen(false)}
                    bullet={<Bullet rotation={randomRot()} />}
                    toggleLabel="Toggle greece submenu"
                >
                    Greece
                </CountryRegionNav>

                <CountryRegionNav
                    hubPath="/hungary"
                    to="/hungary"
                    isOpen={openHungary}
                    onToggle={() => toggleSubmenu("hungary", setOpenHungary)}
                    onNavigate={() => setMenuOpen(false)}
                    bullet={<Bullet rotation={randomRot()} />}
                    toggleLabel="Toggle hungary submenu"
                >
                    Hungary
                </CountryRegionNav>
            </div>

            <Link
                to="/nomads-shop"
                onClick={() => setMenuOpen(false)}
                className="text-stone-300 text-lg hover:text-white transition-colors"
            >
                Nomads Shop
            </Link>

            <Link
                className="text-stone-300 text-lg hover:text-white transition-colors"
                to="/nomads-gallery"
                onClick={() => setMenuOpen(false)}
            >
                Nomads Gallery
            </Link>
            <Link
                className="text-stone-300 text-lg hover:text-white transition-colors"
                to="/contact-us"
                onClick={() => setMenuOpen(false)}
            >
                Contact Us
            </Link>
        </div>
    );
};

export default SidebarMenu;
