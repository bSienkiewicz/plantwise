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
      name: "Settings",
      icon: "/icons/settings-icon.svg",
      link: "/settings",
    },
  ];

  return (
    <>
      {/* {!isMobile && (
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
      )} */}
      <div
        className={`sidebar`}
      >
        <div className={`sidebar__content`}>
          <div className={`sidebar__logo`}>
            <ReactSVG
              src="/logo-wide-modern-black.svg"
              className="sidebar__logo--wide"
            />
          </div>
          <ul className="sidebar__menu">
            {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.link} className="sidebar__menu_item">
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

export default Sidebar;
