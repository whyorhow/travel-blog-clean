import React from "react";
import { Link } from "react-router-dom";
import { getSidebarRegionMenu } from "../../config/regionScope";
import bulletpoint from "../../assets/images/Bulletpoint.svg";

const BulletSmall = ({ rotation = 0 }) => (
  <img
    src={bulletpoint}
    alt=""
    className="w-1 h-1 mr-2 inline-block opacity-80"
    style={{ transform: `rotate(${rotation}deg)` }}
    aria-hidden="true"
  />
);

const randomRot = () => Math.floor(Math.random() * 360);

function RegionSubmenu({ hubPath, isOpen, onNavigate }) {
  const menu = getSidebarRegionMenu(hubPath);
  if (!menu) return null;

  return (
    <div
      className={`ml-6 flex flex-col gap-2 overflow-hidden transition-all duration-300 ${
        isOpen ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0"
      }`}
    >
      {menu.links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className="text-stone-300 text-base hover:text-white transition-colors flex items-center"
          onClick={onNavigate}
        >
          <BulletSmall rotation={randomRot()} />
          {label}
        </Link>
      ))}
    </div>
  );
}

export default RegionSubmenu;
