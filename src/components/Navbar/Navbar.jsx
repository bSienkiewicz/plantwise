import React, { useEffect, useContext, useState } from "react";
import "./Navbar.scss";
import { NavbarContext } from "../../App";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { title, device, buttons, image_url, bg_color, text_color, shade } = useContext(NavbarContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const container_style = {};
  const text_style = {};
  const image_style = {};
  if (image_url) image_style.backgroundImage = `url(${image_url})`;
  if (bg_color) container_style.background = bg_color;
  if (text_color) text_style.color = text_color;

  useEffect(() => {
    console.log("image", image_url);
  }, [image_url]);

  
  useEffect(() => {
    if (image_url) {
      console.log("image", image_url)
      const img = new Image();
      img.src = image_url;
      img.onload = () => setIsImageLoaded(true);
    } else {
      setIsImageLoaded(true);
    }
  }, [image_url]);

  return (
    <div className={`navbar ${shade ? "shade" : ""} ${image_url ? "navbar--plant" : ''}`} style={container_style}>
      {image_url && (
        <div className="navbar__image" style={isImageLoaded ? image_style : {}} onLoad={() => setIsImageLoaded(true)}></div>
      )}
      <div className='navbar__logo'>
          <Link to="/">
          <ReactSVG
            src="/logo-wide-modern-black.svg"
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
