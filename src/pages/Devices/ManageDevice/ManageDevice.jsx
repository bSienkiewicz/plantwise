import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./ManageDevice.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageDevice() {
  const deviceTypes = ["Measuring device", "Central control", "Peripheral"];
  const [deviceName, setDeviceName] = useState("");
  const [deviceMac, setDeviceMac] = useState("");
  const [deviceType, setDeviceType] = useState(deviceTypes[0]);
  const [deviceID, setDeviceID] = useState("");
  let { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setDeviceMac(state.device.mac_address);
      setDeviceID(state.device.id);
      setDeviceName(state.device.name);
    }
  }, []);

  const handleChangeDeviceType = (e) => {
    setDeviceType(e.target.value);
  };

  const handleAddDevice = () => {
    const device = {
      name: deviceName,
      mac_address: deviceMac,
      type: deviceType,
      configured: true,
      id: deviceID,
    };

    if (
      deviceName === null || deviceName === "" ||
      deviceMac === null || deviceMac === "" ||
      deviceType === null || deviceType === "" ||
      deviceID === null || deviceID === ""
    ) {
      return;
    }

    if (state) {
      axios
        .put(`${window.CORE_URL}/devices/${deviceID}`, device)
        .then((response) => {
          if (response.status === 200) {
            navigate("/devices");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(`${window.CORE_URL}/devices`, device)
        .then((response) => {
          if (response.status === 200) {
            navigate("/devices");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDeleteDevice = () => {
    const consent = window.confirm(
      "Are you sure you want to delete this device?"
    );
    if (!consent) return;
    axios
      .delete(`${window.CORE_URL}/devices/${deviceID}`)
      .then((response) => {
        if (response.status === 200) {
          navigate("/devices");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar
        title={state ? `Edit device` : "New device"}
        bg_color={"#38B8B1"}
        text_color={"white"}
      />
      <div className="add_device">
        <form className="add_device__body">
          <h4 className="add_device__header">Device name</h4>
          <input
            className="add_device__input"
            type="text"
            placeholder="Enter device name"
            required
            max={30}
            value={deviceName != null ? deviceName : ""}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <h4 className="add_device__header">Type</h4>
          <select
            className="add_device__input"
            onChange={(e) => handleChangeDeviceType(e)}
          >
            {deviceTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="add_device__row">
            <div className="">
              <h4 className="add_device__header">Device MAC</h4>
              <input
                className="add_device__input"
                type="text"
                placeholder="Enter device MAC address"
                required
                {...(state && {
                  value: state.device.mac_address,
                  disabled: true,
                })}
                onChange={(e) => setDeviceMac(e.target.value)}
              />
            </div>
            <div className="">
              <h4 className="add_device__header">Device ID</h4>
              <input
                className="add_device__input"
                type="text"
                placeholder="Enter device unique ID"
                required
                {...(state && { value: state.device.id, disabled: true })}
                onChange={(e) => setDeviceID(e.target.value)}
              />
            </div>
          </div>
          <div className="add_device__buttons">
            {state && (
              <button
                type="button"
                className="add_device__button add_device__button--delete"
                onClick={() => handleDeleteDevice()}
              >
                Delete device
              </button>
            )}
            <button
              type="button"
              className="add_device__button"
              onClick={() => handleAddDevice()}
            >
              {state ? "Edit device" : "Add new device"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
