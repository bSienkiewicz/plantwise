import React, { useEffect, useContext } from "react";
import "./Navbar.scss";
import { NavbarContext } from "../../App";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { title, device, buttons, image_url, bg_color, text_color } = useContext(NavbarContext);

  const container_style = {};
  const text_style = {};
  if (image_url) container_style.background = `url(${image_url}) no-repeat center/cover fixed`;
  if (bg_color && !image_url) container_style.background = bg_color;
  if (text_color) text_style.color = text_color;

  useEffect(() => {
    console.log("image", image_url);
  }, []);

  return (
    <div className={`navbar ${image_url ? "navbar--plant" : ""}`} style={container_style}>
      {image_url && <div className="navbar__image"></div>}
      <div className='navbar__logo'>
          <Link to="/">
          <ReactSVG
            src="/logo-wide-modern-white.svg"
          />
          </Link>
        </div>
      <div className="navbar__about">
        <h1 className="navbar__title" style={text_style}>{title}</h1>
        <p className="navbar__device">{device}</p>
      </div>
      {buttons && (
        <div className="navbar__buttons">
          {buttons.map((button, index) => (
            <Link to={button.path} key={index} className={`navbar__button ${image_url  ? 'navbar__button--nav_bg' : ''}`} style={text_style}>
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
