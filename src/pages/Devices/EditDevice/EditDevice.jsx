import { Fragment, useEffect, useState } from "react";
import "./EditDevice.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchDevices } from "../../../store/devices/devices";

export default function EditDevice({ setNavbarData }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);
  const deviceTypes = ["Measuring device", "Central control", "Peripheral"];
  const [deviceName, setDeviceName] = useState("");
  const [deviceMac, setDeviceMac] = useState("");
  const [deviceType, setDeviceType] = useState(deviceTypes[0]);
  const [deviceID, setDeviceID] = useState("");
  const navigate = useNavigate();
  const devicesLoading = useSelector((state) => state.devices.loading);

  useEffect(() => {
    setNavbarData({
      title: "Edit device",
      shade: true,
    });
  }, [setNavbarData]);

  useEffect(() => {
    const device = devices.find((device) => device.id === id);
    if (device) {
      setDeviceMac(device.mac_address);
      setDeviceID(device.id);
      setDeviceName(device.name);
    } else {
      navigate("/404");
    }
  }, [devices]);

  const handleInputChange = (e, param) => {
    const value = e.target.value;
    if (value.length > 20) {
      return;
    }
  };

  const handleEditDevice = () => {
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

    toast
      .promise(
        axios.put(`${window.CORE_URL}/api/v1/devices/${deviceID}`, device),
        {
          pending: "Updating device...",
          success: `${deviceName} updated!`,
          error: "Error while updating device",
        }
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchDevices());
          navigate("/devices");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteDevice = () => {
    const consent = window.confirm(
      "Are you sure you want to delete this device?"
    );
    if (!consent) return;
    toast
      .promise(axios.delete(`${window.CORE_URL}/api/v1/devices/${deviceID}`), {
        pending: "Deleting device...",
        success: "Device deleted!",
        error: "Error while deleting device",
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchDevices());
          navigate("/devices");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <div className="edit_device">
        <p className="edit_device__step">
          <span>1.</span>Choose device type
        </p>
        <div className="edit_device__type">
          {deviceTypes.map((type, index) => (
            <button
              key={index}
              className={`edit_device__type-item ${
                type === deviceType ? "selected" : ""
              }`}
              onClick={() => setDeviceType(type)}
            >
              <p>{type}</p>
            </button>
          ))}
        </div>
        <p className="edit_device__step">
          <span>2.</span>Device setup
        </p>
        <div className="edit_device__body">
          <div className="edit_device__body-form">
            <div className="input-group">
              <h4 className="edit_device__header">Device name</h4>
              <input
                className="edit_device__input"
                type="text"
                placeholder="Enter device name"
                required
                value={deviceName}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>

            <div className="input-group">
              <h4 className="edit_device__header">Device MAC</h4>
              <input
                className="edit_device__input"
                type="text"
                placeholder="Enter device MAC address"
                required
                value={deviceMac ? deviceMac : ""}
                disabled
              />
            </div>

            <div className="input-group">
              <h4 className="edit_device__header">Device ID</h4>
              <input
                className="edit_device__input"
                type="text"
                placeholder="Enter device unique ID"
                required
                value={deviceID ? deviceID : ""}
                disabled
              />
            </div>
            <div className="edit_device__buttons">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteDevice()}
              >
                Delete device
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleEditDevice()}
              >
                Edit device
              </button>
            </div>
          </div>
          <h5 className="edit_device__info">
            This device was detected automatically when you connected it. You
            can now set its name, but MAC address and ID are bound to this
            device and cannot be changed.
          </h5>
        </div>
      </div>
    </Fragment>
  );
}
