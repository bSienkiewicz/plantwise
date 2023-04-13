import { Fragment, useContext, useEffect } from "react";
import "./Dashboard.scss";
import { useSelector, useDispatch } from 'react-redux'
import { fetchDevices } from "../../store/devices/devices";

const Dashboard = ({ setNavbarData }) => {
  const devices = useSelector(state => state.devices.devices)
  const plants = useSelector(state => state.plants.plants)
  const dispatch = useDispatch()

  useEffect(() => {
    setNavbarData({
      title: "Dashboard",
    });
  }, []);

  useEffect(() => {
    console.log(devices)
    console.log(plants)
  }, [devices,plants])

  return (
    <Fragment>
      <div className="dashboard">Dashboard</div>
    </Fragment>
  );
};

export default Dashboard;
