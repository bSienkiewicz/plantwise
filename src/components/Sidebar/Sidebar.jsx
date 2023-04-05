import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Sidebar.scss";

import React, { useState } from "react";

const Sidebar = ({ setSmallSidebar, smallSidebar, isMobile, showMobile, setShowMobile }) => {
  const toggleSidebar = () => {
    setSmallSidebar(!smallSidebar);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "/icons/home-icon.svg",
      link: "/",
    },
    {
      name: "Garden",
      icon: "/icons/garden-icon.svg",
      link: "/garden",
    },
    {
      name: "Devices",
      icon: "/icons/device-icon.svg",
      link: "/devices",
    },
    {
      name: "Devices2137",
      icon: "/icons/garden-icon.svg",
      link: "/devices",
    },
    {
      name: "Settings",
      icon: "/icons/settings-icon.svg",
      link: "/settings",
    },
  ];

  return (
    <>
      {!isMobile && (
        <div
          className={`sidebar__toggle ${smallSidebar ? "rotate" : ""}`}
          onClick={() => {
            toggleSidebar();
          }}
        >
          <ReactSVG
            src="/icons/chevron-left-icon.svg"
            className="sidebar__toggle_icon"
          />
        </div>
      )}
      <div
        className={`sidebar${isMobile ? "__mobile" : ""} ${smallSidebar ? "sidebar--shrink" : ""} ${isMobile && showMobile ? "show" : ""}`}
      >
        <div className={`sidebar${isMobile ? "__mobile" : ""}__content`}>
          <div className={`sidebar__logo ${smallSidebar ? "d-none" : ""}`}>
            <ReactSVG
              src="/logo-wide-modern.svg"
              className="sidebar__logo--wide"
            />
          </div>
          <div
            className={`sidebar__logo--shrink ${!smallSidebar ? "d-none" : ""}`}
          >
            <ReactSVG
              src="/logo-small-leaf.svg"
              className="sidebar__logo--small"
            />
          </div>
          <ul className="sidebar__menu">
            {menuItems.map((item, index) => (
            <li>
              <NavLink to={item.link} className="sidebar__menu_item" onClick={() => {isMobile && setShowMobile(false)}}>
                <ReactSVG
                  src={item.icon}
                  className="sidebar__menu_item__icon"
                />
                {smallSidebar ? "" : item.name}
              </NavLink>
            </li>
            ))}
            <li className=" logout">
              <NavLink to="/q" className="sidebar__menu_item">
                <ReactSVG
                  src="/icons/logout-icon.svg"
                  className="sidebar__menu_item__icon"
                />
                {smallSidebar ? "" : "Logout"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

Sidebar.defaultProps = {
  isMobile: false,
  showMobile: false,
};

export default Sidebar;
