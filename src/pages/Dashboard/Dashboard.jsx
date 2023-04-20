import { Fragment, useEffect, useState } from "react";
import "./Dashboard.scss";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = ({ setNavbarData }) => {
  const devices = useSelector((state) => state.devices.devices);
  const plants = useSelector((state) => state.plants.plants);
  const mqtt_connected = useSelector((state) => state.system.mqtt_connected);
  const mqtt_error = useSelector((state) => state.system.mqtt_error);

  const [dbEcho, setDbEcho] = useState("");

  function testDbConnection() {
    console.log("testDbConnection");
    axios.get(`${window.CORE_URL}/api/v1/echo`)
      .then((response) => {
        setDbEcho(response.data);
      }
    );
  }

  useEffect(() => {
    setNavbarData({
      title: "Dashboard",
    });
  }, []);

  useEffect(() => {
    console.log(devices);
    console.log(plants);
  }, [devices, plants]);

  return (
    <Fragment>
      <p>MQTT Connected: <span>{mqtt_connected.toString()}</span></p>
      <button onClick={() => testDbConnection()}>Test DB connection</button><br/>
      <code>{dbEcho}</code>
    </Fragment>
  );
};

export default Dashboard;
