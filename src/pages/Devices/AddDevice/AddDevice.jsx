import { Fragment, useEffect, useState } from "react";
import "./AddDevice.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchDevices } from "../../../store/devices/devices";

const AddDevice =({ setNavbarData }) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);
  const deviceTypes = ["Measuring device", "Central control", "Peripheral"];
  const [deviceName, setDeviceName] = useState("");
  const [deviceMac, setDeviceMac] = useState("");
  const [deviceType, setDeviceType] = useState(deviceTypes[0]);
  const [deviceID, setDeviceID] = useState("");
  const [macError, setMacError] = useState(false);
  const [idError, setIdError] = useState(false);
  const navigate = useNavigate();
  const devicesLoading = useSelector((state) => state.devices.loading);

  useEffect(() => {
    setNavbarData({
      title: "Add new device",
      shade: true,
    });
  }, [setNavbarData]);

  const handleInputChange = (e, param) => {
    const value = e.target.value;
    if (value.length > 20) {
      return;
    }

    const isUnique = checkUnique(param, value);

    switch (param) {
      case "name":
        setDeviceName(value);
        break;
      case "mac_address":
        setDeviceMac(value);
        setMacError(!isUnique);
        break;
      case "id":
        setDeviceID(value);
        setIdError(!isUnique);
        break;
      default:
        break;
    }
  };

  const checkUnique = (key, value) => {
    console.log(key + " " + value)
    return !devices.some((item) => item[key].toLowerCase() === value.toLowerCase());
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
      toast.error("Please fill all fields");
      return;
    }
    if (idError || macError) {
      toast.error("There are some errors in the form");
      return;
    }

    toast
      .promise(axios.post(`${window.CORE_URL}/api/v1/devices`, device), {
        pending: "Adding device...",
        success: `${deviceName} added!`,
        error: "Error while adding device",
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
      <div className="add_device">
        <p className="add_device__step">
          <span>1.</span>Choose device type
        </p>
        <div className="add_device__type">
          {deviceTypes.map((type, index) => (
            <button
              key={index}
              className={`add_device__type-item ${
                type === deviceType ? "selected" : ""
              }`}
              onClick={() => setDeviceType(type)}
            >
              <p>{type}</p>
            </button>
          ))}
        </div>
        <p className="add_device__step">
          <span>2.</span>Device setup
        </p>
        <div className="add_device__body">
          <div className="add_device__body-form">
            <div className="input-group">
              <p className="add_device__header">Device name</p>
              <input
                type="text"
                placeholder="Enter device name"
                required
                value={deviceName}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>

            <div className="input-group">
              <h4 className="add_device__header">Device MAC</h4>
              <input
                className={
                  macError && !checkUnique("mac_address", deviceMac)
                    ? "error"
                    : ""
                }
                type="text"
                placeholder="Enter device MAC address"
                required
                onChange={(e) => handleInputChange(e, "mac_address")}
                value={deviceMac}
              />
            </div>

            <div className="input-group">
              <h4 className="add_device__header">Device ID</h4>
              <input
                className={
                  idError && !checkUnique("id", deviceID) ? "error" : ""
                }
                type="text"
                placeholder="Enter unique device ID"
                required
                onChange={(e) => handleInputChange(e, "id")}
                value={deviceID}
              />
            </div>

            <div className="add_device__buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddDevice()}
              >
                Add new device
              </button>
            </div>
          </div>
          <h5 className="add_device__info">
            If your device is not detected automatically, you can add it
            manually by entering its MAC address and ID. It's recommended to try
            automatic detection first.
          </h5>
        </div>
      </div>
    </Fragment>
  );
}

export default AddDevice;