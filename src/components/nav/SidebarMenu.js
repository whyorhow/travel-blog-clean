import React, { useState } from "react";
import { Link } from "react-router-dom";
import bulletpoint from "../../assets/images/Bulletpoint.svg";

const Bullet = ({ rotation = 0 }) => (
    <img src={bulletpoint} alt="" className="w-1.5 h-1.5 mr-2 inline-block opacity-80" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true" />
);

const BulletSmall = ({ rotation = 0 }) => (
    <img src={bulletpoint} alt="" className="w-1 h-1 mr-2 inline-block opacity-80" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true" />
);

const randomRot = () => Math.floor(Math.random() * 360);

const Arrow = ({ isOpen }) => (
    <svg
        viewBox="0 0 28 28"
        className="w-4 h-4 ml-2 inline-block transform transition-transform duration-500 ease-in-out origin-center"
        aria-hidden="true"
    >
        <g
            id="middle"
            className={`transform transition-transform duration-500 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
            style={{ transformOrigin: "14px 14px" }}
        >
            <path
                className="st0"
                fill="#ceb752"
                d="M26,14.2c0.2,0.5,0,0.9,0,1c0,0.6-0.5,0.6-0.7,0.7c0,0-0.7,0.4-2.1,1c-0.5,0.2-0.8,0.5-1.6,1.1
        c-1.2,0.9-1.3,1.1-2.1,1.4c-0.5,0.2-1.2,0.7-2.2,1.1c-2.2,1.6-3.8,2.3-5,2.5c-0.3,0.1-0.9,0.1-1.6,0.5c-1.1,0.4-1.3,0.6-2.9,1.2
        c-2.3,1-2.2,0.7-2.6,1.1c-0.1,0-0.6,0.6-1.5,0.7c-0.3,0-0.6,0-1-0.2c-0.3-0.3-0.6-0.4-0.8-0.6c-0.1-0.1-0.6-0.6-0.7-1.1
        c-0.2-0.6-0.1-0.9-0.1-1.1c0.1-0.2,0.1-0.3,0.4-0.6c0.4-0.3,0.7-0.5,1.1-0.7c0.6-0.3,1.1-0.4,1.1-0.4c0.8-0.2,1.6-0.5,2.4-0.8
        c1.5-0.6,2.1-0.8,2.4-0.9c0.9-0.4,1.5-0.7,1.9-1.1c1.3-0.5,2.3-0.8,3.1-1.3c0.9-0.4,1.5-0.9,2.1-1.2c0.9-0.6,1.4-1,2.3-1.5
        c0.8-0.6,1.3-0.9,1.6-1.1c-0.3-0.2-0.8-0.5-1.6-1.1c-0.9-0.5-1.4-1-2.3-1.5c-0.6-0.3-1.3-0.7-2.1-1.2c-0.7-0.5-1.8-0.9-3.1-1.3
        C10.2,8.8,9.5,8.4,8.6,8C8.4,7.9,7.7,7.7,6.2,7.1C5.4,6.9,4.6,6.6,3.8,6.4c0,0-0.5-0.1-1.1-0.4C2.3,5.8,1.9,5.6,1.5,5.3
        C1.3,5,1.2,4.9,1.2,4.7C1.1,4.5,1,4.2,1.2,3.6c0.2-0.5,0.7-0.9,0.7-1.1c0.2-0.2,0.4-0.4,0.8-0.6c0.4-0.2,0.8-0.2,1-0.2
        c0.9,0.1,1.4,0.7,1.5,0.7c0.4,0.5,0.3,0.2,2.6,1.1c1.6,0.6,1.7,0.8,2.9,1.2c0.7,0.4,1.4,0.4,1.6,0.5c1.1,0.3,2.8,0.9,5,2.5
        c1,0.3,1.7,0.8,2.2,1.1c0.8,0.4,0.9,0.6,2.1,1.4c0.9,0.6,1.2,0.8,1.6,1.1c1.4,0.7,2.1,1,2.1,1c0.2,0.1,0.6,0.2,0.7,0.7
        C26,13.3,26.2,13.7,26,14.2z"
            />
        </g>
    </svg>
);

const SidebarMenu = ({ menuOpen, setMenuOpen, handleMenuEnter, handleMenuLeave }) => {
    const [openBrazil, setOpenBrazil] = useState(false);
    const [openUS, setOpenUS] = useState(false);
    const [openBelgium, setOpenBelgium] = useState(false);
    const [openGreece, setOpenGreece] = useState(false);
    const [openHungary, setOpenHungary] = useState(false);
    const [openTennessee, setOpenTennessee] = useState(false);

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
            className={`fixed top-0 right-0 h-screen w-64 z-[9998] flex flex-col pt-12 p-4 gap-2 text-lg overflow-y-auto
    transform transition-transform duration-800 ease-[cubic-bezier(0.25,0.8,0.25,1)]
    bg-stone-950/95
    ${menuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}`}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
        >
            <Link className="text-stone-300 text-lg hover:text-white transition-colors" to="/adventures" onClick={() => setMenuOpen(false)}>Adventures Home</Link>

            <div className="ml-6 flex flex-col gap-2">
                {/* Brazil */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center w-full cursor-pointer">
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil" onClick={() => setMenuOpen(false)}><Bullet rotation={randomRot()} />Brazil</Link>
                        <button onClick={() => toggleSubmenu("brazil", setOpenBrazil)} className="focus:outline-none" aria-label="Toggle brazil submenu">
                            <Arrow isOpen={openBrazil} />
                        </button>
                    </div>
                    <div className={`ml-6 flex flex-col gap-2 transition-all duration-300 ${openBrazil ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/saopaulo" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />São Paulo</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/santos" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Santos</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/florianopolis" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Florianópolis</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/pantanal" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />The Pantanal</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/bonito" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Bonito</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/manaus" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Manaus</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/ilha-grande" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Ilha Grande</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/rio" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Rio de Janeiro</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/salvador" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Salvador</Link>
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/brazil/foz" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Foz do Iguaçu</Link>
                    </div>
                </div>

                {/* United States */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center w-full cursor-pointer">
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/united-states" onClick={() => setMenuOpen(false)}><Bullet rotation={randomRot()} />United States</Link>
                        <button onClick={() => toggleSubmenu("us", setOpenUS)} className="focus:outline-none" aria-label="Toggle US submenu">
                            <Arrow isOpen={openUS} />
                        </button>
                    </div>
                    <div className={`ml-6 flex flex-col gap-2 overflow-hidden ${openUS ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}`}>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center w-full cursor-pointer">
                                <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/united-states/tennessee" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Tennessee</Link>
                                <button onClick={() => toggleSubmenu("tennessee", setOpenTennessee)} className="focus:outline-none" aria-label="Toggle tennessee submenu">
                                    <Arrow isOpen={openTennessee} />
                                </button>
                            </div>
                            <div className={`ml-6 flex flex-col gap-2 overflow-hidden ${openTennessee ? "opacity-100 max-h-[200px]" : "opacity-0 max-h-0"}`}>
                                <Link to="/united-states/tennessee/mountains" className="text-stone-300 text-base hover:text-white transition-colors flex items-center" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Mountains</Link>
                                <Link to="/united-states/tennessee/memphis" className="text-stone-300 text-base hover:text-white transition-colors flex items-center" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Memphis</Link>
                                <Link to="/united-states/tennessee/nashville" className="text-stone-300 text-base hover:text-white transition-colors flex items-center" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Nashville</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Belgium */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center w-full cursor-pointer">
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/belgium" onClick={() => setMenuOpen(false)}><Bullet rotation={randomRot()} />Belgium</Link>
                        <button onClick={() => toggleSubmenu("belgium", setOpenBelgium)} className="focus:outline-none" aria-label="Toggle belgium submenu">
                            <Arrow isOpen={openBelgium} />
                        </button>
                    </div>
                    <div className={`ml-6 flex flex-col gap-2 overflow-hidden ${openBelgium ? "opacity-100 max-h-[200px]" : "opacity-0 max-h-0"}`}>
                        <Link to="/belgium/antwerp" className="text-stone-300 text-base hover:text-white transition-colors flex items-center" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Antwerp</Link>
                    </div>
                </div>

                {/* Greece */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center w-full cursor-pointer">
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/greece" onClick={() => setMenuOpen(false)}><Bullet rotation={randomRot()} />Greece</Link>
                        <button onClick={() => toggleSubmenu("greece", setOpenGreece)} className="focus:outline-none" aria-label="Toggle greece submenu">
                            <Arrow isOpen={openGreece} />
                        </button>
                    </div>
                    <div className={`ml-6 flex flex-col gap-2 overflow-hidden ${openGreece ? "opacity-100 max-h-[200px]" : "opacity-0 max-h-0"}`}>
                        <Link to="/greece/athens" className="text-stone-300 text-base hover:text-white transition-colors flex items-center" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Athens</Link>
                    </div>
                </div>

                {/* Hungary */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center w-full cursor-pointer">
                        <Link className="text-stone-300 text-base hover:text-white transition-colors flex items-center" to="/hungary" onClick={() => setMenuOpen(false)}><Bullet rotation={randomRot()} />Hungary</Link>
                        <button onClick={() => toggleSubmenu("hungary", setOpenHungary)} className="focus:outline-none" aria-label="Toggle hungary submenu">
                            <Arrow isOpen={openHungary} />
                        </button>
                    </div>
                    <div className={`ml-6 flex flex-col gap-2 overflow-hidden ${openHungary ? "opacity-100 max-h-[200px]" : "opacity-0 max-h-0"}`}>
                        <Link to="/hungary/budapest" className="text-stone-300 text-base hover:text-white transition-colors flex items-center" onClick={() => setMenuOpen(false)}><BulletSmall rotation={randomRot()} />Budapest</Link>
                    </div>
                </div>
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
