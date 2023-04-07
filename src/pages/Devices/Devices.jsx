import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Devices.scss";
import axios from "axios";

const nav_buttons = [
  {
    icon: "/icons/garden-icon.svg",
    text: "Add new device",
    path: "/devices/add",
  },
];

export default function Devices() {
  const [devices, setDevices] = useState([])

  useEffect (() => {
    axios.get('http://localhost:3000/devices')
    .then((response) => {
      console.log(response.data.records)
      setDevices(response.data.records)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Navbar title={"My devices"} preset={"devices"} buttons={nav_buttons} />
      <div className="devices">
        <div className="devices__cards">
          {devices.map((device, index) => (
          <div className="devices__card" key={index} style={{ animationDelay: `${index/10}s`}}>
            <h3 className="devices__card__header">{device.name}</h3>
            <p className="devices__card__content">
              {device.mac_address}
            </p>
          </div>
          ))}
        </div>
      </div>
    </>
  );
}
