import {useState} from "react";
import "./TopbarMobile.scss";
import { ReactSVG } from "react-svg";
import Sidebar from "../Sidebar/Sidebar";

export default function TopbarMobile() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  return (
    <>
      <div className="topbar_mobile">
        <ReactSVG src="/logo-small-modern.svg" className="topbar_mobile__logo" />
        <ReactSVG src="/icons/ellipsis-icon.svg" className="topbar_mobile__menu" onClick={() => {setShowMobileSidebar(!showMobileSidebar)}}/>
      </div>
    </>
  );
}
