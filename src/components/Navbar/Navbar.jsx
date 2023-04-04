import React from "react";
import "./Navbar.scss";
import { ReactSVG } from "react-svg";

const Navbar = ({ title, device, preset, image }) => {
  const style = {};
  if (image) style.backgroundImage = `url(${image})`;

  return (
    <div className={`navbar ${image ? "navbar--plant" : ""}`}>
      {image && <div className="navbar__image" style={style}></div>}
      <div className="navbar__about">
        <h1 className="navbar__title">{title}</h1>
        <p className="navbar__device">{device}</p>
      </div>
      {preset != null && (
        <div className="navbar__buttons">
          {preset === "dashboard" && (
            <>
              <button className="navbar__button">
                <ReactSVG src="/icons/garden-icon.svg" />
                My garden
              </button>
              <button className="navbar__button">
                <ReactSVG src="/icons/garden-icon.svg" />
                My garden
              </button>
            </>
          )}
          {preset === "garden" && (
            <>
              <button className="navbar__button">
                <ReactSVG src="/icons/garden-icon.svg" />
                Add new plant
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
