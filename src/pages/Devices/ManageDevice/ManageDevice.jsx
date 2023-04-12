import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./ManageDevice.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ManageDevice({setNavbarData}) {
  const deviceTypes = ["Measuring device", "Central control", "Peripheral"];
  const [deviceName, setDeviceName] = useState("");
  const [deviceMac, setDeviceMac] = useState("");
  const [deviceType, setDeviceType] = useState(deviceTypes[0]);
  const [deviceID, setDeviceID] = useState("");
  let { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setNavbarData({
      title: state ? "Edit device" : "Add device",
      bg_color: "#565656",
    });
  }, [setNavbarData]);

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

    if (!deviceName || !deviceMac || !deviceType || !deviceID) {
      return;
    }

    if (state) {
      toast
        .promise(axios.put(`${window.CORE_URL}/devices/${deviceID}`, device), {
          pending: "Updating device...",
          success: `${deviceName} updated!`,
          error: "Error while updating device",
        })
        .then((response) => {
          if (response.status === 200) {
            navigate("/devices");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      toast
        .promise(axios.post(`${window.CORE_URL}/devices`, device), {
          pending: "Adding device...",
          success: `${deviceName} added!`,
          error: "Error while adding device",
        })
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
    toast
      .promise(axios.delete(`${window.CORE_URL}/devices/${deviceID}`), {
        pending: "Deleting device...",
        success: "Device deleted!",
        error: "Error while deleting device",
      })
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
      <div className="add_device">
        <p className="add_device__step"><span>1.</span>Choose device type</p>
          <div className="add_device__type">
            {deviceTypes.map((type, index) => (
              <button key={index} className={`add_device__type-item ${type === deviceType ? 'selected' : ''}`} onClick={() => setDeviceType(type)}>
                <p>{type}</p>
              </button>
            ))}
          </div>
        <p className="add_device__step"><span>2.</span>Device setup</p>
        <div className="add_device__body">
          <div className="add_device__body-form">
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
            <h4 className="add_device__header">Device ID</h4>
            <input
              className="add_device__input"
              type="text"
              placeholder="Enter device unique ID"
              required
              {...(state && { value: state.device.id, disabled: true })}
              onChange={(e) => setDeviceID(e.target.value)}
            />
            <div className="add_device__buttons">
              {state && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteDevice()}
                >
                  Delete device
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddDevice()}
              >
                {state ? "Edit device" : "Add new device"}
              </button>
            </div>
          </div>
            <h5 className="add_device__info">
              {state ? (
                "This device was detected automatically when you connected it. You can now set its name, but MAC address and ID are bound to this device and cannot be changed."
              ) : (
                "If your device is not detected automatically, you can add it manually by entering its MAC address and ID. It's recommended to try automatic detection first."
              )}
            </h5>
        </div>
      </div>
    </>
  );
}
