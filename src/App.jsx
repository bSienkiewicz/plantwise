import "./App.scss";
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Dashboard from "./pages/Dashboard/Dashboard";
import Garden from "./pages/Garden/Garden";
import Devices from "./pages/Devices/Devices";
import AddDevice from "./pages/Devices/ManageDevice/ManageDevice";

window.CORE_URL = "http://localhost:5000";

import {
  connectedMQTT,
  connectMQTT,
  subscribeMQTT,
  disconnectMQTT,
} from "./utils/MQTT/MQTT_functions";

const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/garden', element: <Garden /> },
  { path: '/devices', element: <Devices /> },
  { path: '/devices/add', element: <AddDevice /> },
];



export default function App() {
  const [receivedMessage, setReceivedMessage] = useState("");
  const [client, setClient] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [smallSidebar, setSmallSidebar] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [theme, setTheme] = useState("light");

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
    <div id="App" className={`${smallSidebar ? "sidebar-small" : ""} ${theme === 'light' ? "theme--light" : "theme--dark"}`}>
      <div id="statusbar">
        <h3>ELO</h3>
        </div>
      <div id="sidebar">
        <Sidebar
          setSmallSidebar={setSmallSidebar}
          smallSidebar={smallSidebar}
        />
      </div>
      <div id="main" className={`${showChat ? "expand" : ""}`}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              component={route.component}
            />
          ))}
        </Routes>
      </div>
      <div id="chat">
        <Chat message={receivedMessage} connected={connectedMQTT} />
      </div>
    </div>
  );
}
