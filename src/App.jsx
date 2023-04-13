import "./App.scss";
import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchDevices } from "./store/devices/devices";
import { fetchPlants } from "./store/plants/plants";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Dashboard from "./pages/Dashboard/Dashboard";
import Garden from "./pages/Garden/Garden";
import AddPlant from "./pages/Garden/AddPlant/AddPlant";
import Devices from "./pages/Devices/Devices";
import AddDevice from "./pages/Devices/ManageDevice/ManageDevice";
import Plant from "./pages/Garden/Plant/Plant";
import {
  connectedMQTT,
  connectMQTT,
  subscribeMQTT,
  disconnectMQTT,
} from "./utils/MQTT/MQTT_functions";

export const NavbarContext = React.createContext();

window.CORE_URL = "http://localhost:5000";

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
  const dispatch = useDispatch();

  // MQTT connection and subscription
  useEffect(() => {
    toast
      .promise(
        connectMQTT("ws://broker.emqx.io/mqtt", {
          clientId: "mqttjs_3233323232123",
          port: 8083,
          keepalive: 120,
        }),
        {
          error: "Error while connecting to MQTT broker",
        }
      )
      .then(() => {
        subscribeMQTT("plantwise/#", handleReceived);
      })
      .catch((err) => {
        console.error(err);
        setConnectionError(true);
      });

    return () => {
      disconnectMQTT();
    };
  }, []);

  // Window resize event listener
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

  // State download
  useEffect(() => {
    Promise.all([dispatch(fetchDevices()), dispatch(fetchPlants())]).then(
      () => {
        toast.promise(Promise.resolve(), {
          error: "Error while loading data",
        });
      }
    );
  }, [dispatch]);

  const routes = [
    { path: "/", element: <Dashboard setNavbarData={setNavbarData} /> },
    { path: "/garden", element: <Garden setNavbarData={setNavbarData} /> },
    {
      path: "/garden/add",
      element: <AddPlant setNavbarData={setNavbarData} />,
    },
    { path: "/plant/:id", element: <Plant setNavbarData={setNavbarData} /> },
    { path: "/devices", element: <Devices setNavbarData={setNavbarData} /> },
    {
      path: "/devices/add",
      element: <AddDevice setNavbarData={setNavbarData} />,
    },
  ];

  return (
    <Fragment>
      <div id="App" className={`${smallSidebar ? "sidebar-small" : ""}`}>
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
            <div id="content">
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
          </div>
        </NavbarContext.Provider>
        <Chat message={receivedMessage} connected={connectedMQTT} />
      </div>

      <ToastContainer theme="dark" />
    </Fragment>
  );
}
