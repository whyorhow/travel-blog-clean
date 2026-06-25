import React from "react";
import {
  CLUSTER_BTN_CLASS,
  BURGER_LOWER_NUDGE_CLASS,
  BURGER_ICON_CLASS,
} from "./siteHeaderLayout";

const BurgerButton = ({ menuOpen, toggleMenu }) => {
  const svgCenterX = 47.3 / 2;
  const topYPos = 8;
  const middleYPos = 32;
  const bottomYPos = 10;
  const topRotateDeg = 25;
  const bottomRotateDeg = -22;
  const middleShiftX = 2;

  return (
    <div
      className={`burger-menu-container cursor-pointer overflow-visible ${BURGER_LOWER_NUDGE_CLASS} ${CLUSTER_BTN_CLASS}`}
      role="button"
      tabIndex={0}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      aria-controls="site-menu"
      onClick={toggleMenu}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleMenu();
        }
      }}
    >
      <svg viewBox="0 0 47.3 47.3" className={BURGER_ICON_CLASS} style={{ overflow: "visible" }}>
        <g
          id="top"
          style={{
            transformBox: "fill-box",
            transformOrigin: `${svgCenterX}px ${topYPos}px`,
            transform: menuOpen
              ? `translateY(-1px) rotate(${topRotateDeg}deg) scaleX(1.3)`
              : `translateY(0px) rotate(0deg) scaleX(1)`,
            transition: "transform 300ms ease-in-out",
          }}
        >
          <path
            fill="#ceb752"
            d="M8.1,1c0,0,1,0,3.1,0c0.7,0,1.3-0.1,2.6-0.3c1.9-0.3,2.2-0.3,3.4-0.4c0.7-0.1,1.8-0.1,3.2,0
                  c3.6-0.6,6-0.4,7.5-0.1c0.4,0,1.1,0.3,2.1,0.3c1.5,0.1,1.9,0,4.1,0.1c3.3,0.1,3,0.4,3.7,0.1c0.1,0,1.1-0.3,2.1,0
                  c0.3,0.1,0.7,0.3,1,0.7c0.2,0.3,0.3,0.7,0.4,1c0,0.1,0.2,0.8,0,1.4c-0.2,0.7-0.5,1-0.7,1.1s-0.4,0.3-0.9,0.4
                  c-0.7,0.1-1.2,0.1-1.8,0.1c-0.9,0-1.6-0.1-1.6-0.1c-1.1-0.1-2.2-0.3-3.2-0.4c-1.7-0.3-2.6-0.3-3-0.3c-1.3,0-2.3,0-2.9,0.1
                  c-1.8-0.1-3.3-0.3-4.4-0.3c-1.3,0-2.3,0.1-3.3,0.1c-1.3,0.1-2.4,0.1-3.8,0.3c-2.6,0.3-2.9,0.3-3.9,0.3c-0.7,0-1-0.1-1.8,0
                  c-0.8,0.1-1.2,0.3-2.2,0.3c-0.9,0-1.3-0.1-1.6-0.4c-0.1-0.1-0.3-0.4-0.4-1c0-0.3,0-0.6,0.1-1.1c0-0.4,0.1-0.6,0.1-0.7
                  c0.2-0.7,0.7-1,0.8-1.1C7.3,0.8,7.8,0.8,8.1,1z"
          />
        </g>
        <g
          id="middle"
          style={{
            transformBox: "fill-box",
            transformOrigin: `${svgCenterX}px ${middleYPos}px`,
            transform: menuOpen ? `translateX(${middleShiftX + 3}px)` : `translateX(0px)`,
            transition: "transform 300ms ease-in-out",
          }}
        >
          <path
            fill="#ceb752"
            d="M39.3,11c0,0-1.1,0-3.1,0c-0.7,0-1.3-0.1-2.6-0.3c-2-0.3-2.2-0.4-3.4-0.4c-0.7,0-1.9-0.1-3.2,0
                   c-3.6-0.6-6-0.4-7.4-0.1c-0.4,0-1.1,0.3-2.2,0.3c-1.6,0.1-1.9,0-4.1,0.1c-3.2,0.1-2.9,0.4-3.7,0.1c-0.1,0-1.1-0.3-2.2,0
                   c-0.3,0.1-0.7,0.3-1,0.7c-0.2,0.4-0.3,0.7-0.4,1c0,0.1-0.2,0.8,0,1.4c0.2,0.7,0.6,1,0.8,1.1c0.2,0.1,0.4,0.3,0.9,0.4
                   c0.7,0.1,1.2,0.1,1.8,0.1c0.9,0,1.6-0.1,1.6-0.1c1.1-0.1,2.2-0.3,3.2-0.4c2.1-0.1,2.9-0.3,3.3-0.3c1.3,0,2.2,0,2.9,0.1
                   c1.8-0.1,3.2-0.3,4.4-0.1c1.3,0,2.3,0.1,3.2,0.1c1.4,0.1,2.3,0.3,3.7,0.4c2.5,0.3,2.8,0.4,3.8,0.3c0.8,0,1.1-0.1,1.8,0
                   c0.9,0.1,1.2,0.3,2.2,0.3c0.9,0,1.3-0.1,1.6-0.4c0.1-0.1,0.3-0.4,0.4-1c0-0.3,0-0.6-0.1-1.1c0-0.4-0.1-0.6-0.1-0.7
                   c-0.2-0.7-0.7-1-0.8-1.1C40.1,10.9,39.6,11,39.3,11z"
          />
        </g>
        <g
          id="bottom"
          style={{
            transformBox: "fill-box",
            transformOrigin: `${svgCenterX}px ${bottomYPos}px`,
            transform: menuOpen
              ? `translateY(-1px) translateX(3px) rotate(${bottomRotateDeg}deg) scaleX(1.3)`
              : `translateY(-1px) translateX(0px) rotate(0deg) scaleX(1)`,
            transition: "transform 300ms ease-in-out",
          }}
        >
          <path
            fill="#ceb752"
            d="M33.9,25.5c-0.8,0-1.8-0.1-3.8-0.1c-1.3,0-2.4,0-3.2,0c-3.6,0.6-6,0.4-7.5,0.1
                   c-0.4,0-1.1-0.3-2.1-0.3c-1.5-0.1-1.9,0-4.1,0.1c-3.3-0.1-3,0.4-3.7,0.1c-0.1,0-1.1-0.3-2.1,0c-0.3-0.1-0.7-0.3-1-0.7
                   c-0.2-0.3-0.3-0.7-0.4-1c0-0.1-0.2-0.8,0-1.4c0.2-0.7,0.5-1,0.7-1.1s0.4-0.3,0.9-0.4c0.7-0.1,1.2-0.1,1.8-0.1
                   c0.9,0,1.6,0.1,1.6,0.1c1.1,0.1,2.2,0.3,3.2,0.4c1.7,0.3,2.6,0.3,3,0.3c1.3,0,2.3,0,2.9-0.1c1.8,0.1,3.3,0.3,4.4,0.3
                   c1.3,0,1.4-0.1,3.3-0.1c3.2-0.1,3.4,0.1,5.8,0c2.3-0.1,3.4-0.2,3.9-0.3c0.5-0.1,1.4-0.3,2.6-0.1c0.4,0.1,0.7,0.2,0.9,0.3
                   c0.2,0.4,0.3,0.9,0.4,1.6c0,0.6,0,1.1-0.1,1.5c-0.2,0.2-0.4,0.5-0.8,0.7c-0.8,0.5-1.5,0.6-1.9,0.6
                   C36.9,25.7,35.3,25.5,33.9,25.5z"
          />
        </g>
      </svg>
    </div>
  );
};

export default BurgerButton;
