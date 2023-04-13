import { Fragment, useContext, useEffect } from "react";
import "./Dashboard.scss";

const Dashboard = ({ setNavbarData }) => {
  useEffect(() => {
    setNavbarData({
      title: "Dashboard",
    });
  }, []);

  return (
    <Fragment>
      <div className="dashboard">Dashboard</div>
    </Fragment>
  );
};

export default Dashboard;
