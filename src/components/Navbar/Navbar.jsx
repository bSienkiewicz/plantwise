import React, { useEffect } from "react";
import "./Navbar.scss";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const Navbar = ({ title, device, buttons, image, bg_color, text_color }) => {
  const container_style = {};
  const text_style = {};
  if (image) container_style.backgroundImage = `url(${image})`;
  if (bg_color) container_style.backgroundColor = bg_color;
  if (text_color) text_style.color = text_color;

  useEffect(() => {
    console.log("image", image);
  }, []);

  return (
    <div className={`navbar ${image ? "navbar--plant" : ""}`} style={container_style}>
      {image && <div className="navbar__image"></div>}
      <div className="navbar__about">
        <h1 className="navbar__title" style={text_style}>{title}</h1>
        <p className="navbar__device">{device}</p>
      </div>
      {buttons && (
        <div className="navbar__buttons">
          {buttons.map((button, index) => (
            <Link to={button.path} key={index} className={`navbar__button ${image  ? 'navbar__button--nav_bg' : ''}`} style={text_style}>
              <ReactSVG src={button.icon} />
              <p className="navbar__button-text">{button.text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
