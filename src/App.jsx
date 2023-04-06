import "./App.scss";
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import TopbarMobile from "./components/TopbarMobile/TopbarMobile";

import Dashboard from "./pages/Dashboard/Dashboard";
import Garden from "./pages/Garden/Garden";
import Devices from "./pages/Devices/Devices";

import {
  connectedMQTT,
  connectMQTT,
  subscribeMQTT,
  disconnectMQTT,
} from "./utils/MQTT/MQTT_functions";

export default function App() {
  const [receivedMessage, setReceivedMessage] = useState("");
  const [client, setClient] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [smallSidebar, setSmallSidebar] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    connectMQTT("ws://broker.emqx.io/mqtt", {
      clientId: "mqttjs_3233323232123",
      port: 8083,
      keepalive: 120,
    })
      .then(() => {
        subscribeMQTT("device/led", handleReceived);
      })
      .catch((err) => {
        console.error(err);
        setConnectionError(true);
      });

    return () => {
      disconnectMQTT();
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1100 && !smallSidebar) {
      setSmallSidebar(true);
    } else if (windowWidth > 1100 && smallSidebar) {
      setSmallSidebar(false);
    }
  }, [windowWidth]);

  const handleReceived = (topic, message) => {
    setReceivedMessage(message);
  };
  
  return (
    <div id="App" className={smallSidebar ? "sidebar-small" : ""}>
      <div id="sidebar">
        <Sidebar
          setSmallSidebar={setSmallSidebar}
          smallSidebar={smallSidebar}
        />
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/devices" element={<Devices />} />
        </Routes>
      </div>
      <div id="chat">
        <Chat message={receivedMessage} connected={connectedMQTT} />
      </div>
    </div>
  );
}
