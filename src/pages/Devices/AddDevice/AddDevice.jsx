import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./AddDevice.scss";

export default function AddDevice() {
  const [deviceName, setDeviceName] = useState("");

  return (
    <>
      <Navbar
        title={deviceName != "" ? deviceName : "New device"}
        bg_color={"#38B8B1"}
        text_color={"white"}
      />
      <div className="add_device">
        <div className="add_device__body">
          <h3 className="add_device__header">Device name</h3>
          <input
            className="add_device__input"
            type="text"
            placeholder="Enter device name"
            onChange={(e) => setDeviceName(e.target.value)}
          />

          <h3 className="add_device__header">Device MAC</h3>
          <input
            className="add_device__input"
            type="text"
            placeholder="Enter device name"
          />

          <h3 className="add_device__header">Device name</h3>
          <input
            className="add_device__input"
            type="text"
            placeholder="Enter device name"
          />
        </div>
      </div>
    </>
  );
}
