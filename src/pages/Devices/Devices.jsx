import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import "./Devices.scss";
import axios from "axios";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const nav_buttons = [
  {
    icon: "/icons/add-icon.svg",
    text: "Add new device",
    path: "/devices/add",
  },
];

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${window.CORE_URL}/devices`)
      .then((response) => {
        console.log(response.data);
        setDevices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const renderDevices = (device, index) => {
    const { name, configured, mac_address, id, type, last_connected } = device;
    const unconfiguredClass = !configured ? "devices__card--unconfigured" : "";
    const headerClass = configured
      ? "devices__card__header"
      : "devices__card__header devices__card__header--unconfigured";
    const headerText = configured ? name : "New device!";
    const cardStyle = { animationDelay: `${index / 10}s` };

    return (
      <Link
        to={`/devices/add`}
        state={{ device: device }}
        className={`devices__card ${unconfiguredClass}`}
        key={index}
        style={cardStyle}
      >
        <div className="devices__card__container">
          <h3 className={headerClass}>{headerText}</h3>
          <p className="devices__card__content">{type}</p>
          <p className="devices__card__content">
            <span>ID: </span>
            {id}
          </p>
          <p className="devices__card__content">
            <span>MAC: </span>
            {mac_address}
          </p>
          <p className="devices__card__content">Last handshake: {moment(last_connected).fromNow()}</p>
        </div>
        <div className="devices__card__button">
          {!configured ? (
            <ReactSVG src="/icons/add-icon.svg" />
          ) : (
            <ReactSVG src="/icons/edit-icon.svg" />
          )}
        </div>
      </Link>
    );
  };

  return (
    <>
      <Navbar title={"My devices"} preset={"devices"} buttons={nav_buttons} />
      <div className="devices">
        {loading && <Loader />}
        {error ? (
          <h3 className="devices__error">
            There was an error while loading devices.
          </h3>
        ) : (
          <div className="devices__cards">{devices.map(renderDevices)}</div>
        )}
      </div>
    </>
  );
}
