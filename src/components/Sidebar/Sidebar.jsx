import { Link, NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Sidebar.scss";

import React, { useState } from "react";

const Sidebar = ({
  setSmallSidebar,
  smallSidebar,
  isMobile,
  showMobile,
  setShowMobile,
}) => {
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
      <div className={`sidebar ${smallSidebar ? "sidebar--small" : ""}`}>
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
        <div className={`sidebar__logo`}>
          <Link to="/">
          <ReactSVG
            src={
              smallSidebar
                ? "/logo-small-leaf-rot.svg"
                : "/logo-wide-modern-black.svg"
            }
            className={
              smallSidebar ? "sidebar__logo--small" : "sidebar__logo--wide"
            }
          />
          </Link>
        </div>
        <ul
          className={`sidebar__menu ${
            smallSidebar ? "sidebar__menu--small" : ""
          }`}
        >
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className={`sidebar__menu_item ${
                  smallSidebar ? "sidebar__menu_item--small" : ""
                }`}
              >
                <ReactSVG
                  src={item.icon}
                  className="sidebar__menu_item__icon"
                />
                <p
                  className={`sidebar__menu_item__text ${
                    smallSidebar ? "sidebar__menu_item__text--none" : ""
                  }`}
                >
                  {item.name}
                </p>
              </NavLink>
            </li>
          ))}
          <li className=" logout">
            <NavLink
              to="/q"
              className={`sidebar__menu_item ${
                smallSidebar ? "sidebar__menu_item--small" : ""
              }`}
            >
              <ReactSVG
                src="/icons/logout-icon.svg"
                className="sidebar__menu_item__icon"
              />
              {smallSidebar ? "" : "Logout"}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
