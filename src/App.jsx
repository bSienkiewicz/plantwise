import "./App.scss";
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Chat from "./components/Chat/Chat";
import Garden from "./Pages/Garden/Garden";

export default function App() {
  return (
    <div id="App">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/garden" element={<Garden />} />
        </Routes>

        <Chat />
      </div>
    </div>
  );
}
