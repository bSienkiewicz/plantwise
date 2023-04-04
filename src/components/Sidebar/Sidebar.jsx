import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import "./Sidebar.scss";

import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <ReactSVG src="/logo-wide-modern.svg" />
      </div>
      <ul className="sidebar__menu">
        <li>
          <NavLink to="/" className="sidebar__menu_item">
            <ReactSVG
              src="/icons/home-icon.svg"
              className="sidebar__menu_item__icon"
            />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/garden" className="sidebar__menu_item">
            <ReactSVG
              src="/icons/garden-icon.svg"
              className="sidebar__menu_item__icon"
            />
            My garden
          </NavLink>
        </li>
        <li>
          <NavLink to="/status" className="sidebar__menu_item">
            <ReactSVG
              src="/icons/status-icon.svg"
              className="sidebar__menu_item__icon"
            />
            Status
          </NavLink>
        </li>
        <li>
          <NavLink to="/devices" className="sidebar__menu_item">
            <ReactSVG
              src="/icons/device-icon.svg"
              className="sidebar__menu_item__icon"
            />
            Devices
          </NavLink>
        </li>
        <li>
          <NavLink to="/q" className="sidebar__menu_item">
            <ReactSVG
              src="/icons/settings-icon.svg"
              className="sidebar__menu_item__icon"
            />
            Settings
          </NavLink>
        </li>
        <li className=" logout">
          <NavLink to="/q" className="sidebar__menu_item">
            <ReactSVG
              src="/icons/logout-icon.svg"
              className="sidebar__menu_item__icon"
            />
            Evacuate
          </NavLink>
        </li>
      </ul>

        <div className="sidebar__toggle">
            <ReactSVG src="/icons/minimize-icon.svg" />
        </div>
    </div>
  );
};

export default Sidebar;
