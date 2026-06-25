import React from "react";
import { Link } from "react-router-dom";
import { hasExpandableRegionMenu } from "../../config/regionScope";
import CountryMenuLabel from "./CountryMenuLabel";
import RegionSubmenu from "./RegionSubmenu";

const MenuArrow = ({ isOpen }) => (
  <svg
    viewBox="0 0 28 28"
    className="w-4 h-4 ml-2 inline-block transform transition-transform duration-500 ease-in-out origin-center"
    aria-hidden="true"
  >
    <g
      className={`transform transition-transform duration-500 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
      style={{ transformOrigin: "14px 14px" }}
    >
      <path
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

const CountryRegionNav = ({
  hubPath,
  to,
  isOpen,
  onToggle,
  onNavigate,
  bullet,
  toggleLabel,
  children,
}) => {
  const expandable = hasExpandableRegionMenu(hubPath);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center w-full cursor-pointer">
        <Link
          className="text-stone-300 text-base hover:text-white transition-colors flex items-center"
          to={to}
          onClick={onNavigate}
        >
          {bullet}
          <CountryMenuLabel path={hubPath}>{children}</CountryMenuLabel>
        </Link>
        {expandable ? (
          <button onClick={onToggle} className="focus:outline-none" aria-label={toggleLabel}>
            <MenuArrow isOpen={isOpen} />
          </button>
        ) : null}
      </div>
      {expandable ? (
        <RegionSubmenu hubPath={hubPath} isOpen={isOpen} onNavigate={onNavigate} />
      ) : null}
    </div>
  );
};

export default CountryRegionNav;
