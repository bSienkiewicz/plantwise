import "./App.scss";
import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Dashboard from "./pages/Dashboard/Dashboard";
import Garden from "./pages/Garden/Garden";
import AddPlant from "./pages/Garden/AddPlant/AddPlant";
import Devices from "./pages/Devices/Devices";
import AddDevice from "./pages/Devices/ManageDevice/ManageDevice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
export const NavbarContext = React.createContext();

window.CORE_URL = "http://localhost:5000";

import {
  connectedMQTT,
  connectMQTT,
  subscribeMQTT,
  disconnectMQTT,
} from "./utils/MQTT/MQTT_functions";
import Plant from "./pages/Garden/Plant/Plant";

export default function App() {
  const [navbarData, setNavbarData] = useState({
    title: "Dashboard",
  });
  const [receivedMessage, setReceivedMessage] = useState("");
  const [client, setClient] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [smallSidebar, setSmallSidebar] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    toast
      .promise(
        connectMQTT("ws://broker.emqx.io/mqtt", {
          clientId: "mqttjs_3233323232123",
          port: 8083,
          keepalive: 120,
        }),
        {
          pending: "Connecting to MQTT broker...",
          error: "Error while connecting to MQTT broker",
        }
      )
      .then(() => {
        subscribeMQTT("plantwise/device/msg", handleReceived);
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

  function updateNavbarData(newData){
    setNavbarData(newData);
  };

  const routes = [
    { path: "/", element: <Dashboard setNavbarData={setNavbarData}/> },
    { path: "/garden", element: <Garden setNavbarData={setNavbarData}/> },
    { path: "/garden/add", element: <AddPlant setNavbarData={setNavbarData} /> },
    { path: "/plant/:id", element: <Plant setNavbarData={setNavbarData} /> },
    { path: "/devices", element: <Devices setNavbarData={setNavbarData} /> },
    { path: "/devices/add", element: <AddDevice setNavbarData={setNavbarData} /> },
  ];

  return (
    <>
      <div
        id="App"
        className={`${smallSidebar ? "sidebar-small" : ""} 
      ${theme === "light" ? "theme--light" : "theme--dark"}`}
      >
        <div id="statusbar">
          <h3>ELO</h3>
        </div>
        <div id="sidebar">
          <Sidebar
            setSmallSidebar={setSmallSidebar}
            smallSidebar={smallSidebar}
          />
        </div>
        <NavbarContext.Provider value={navbarData}>
          <div id="main">
            <Navbar />
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
        </NavbarContext.Provider>
        <Chat message={receivedMessage} connected={connectedMQTT} />
      </div>

      <ToastContainer theme="dark" />
    </>
  );
}
