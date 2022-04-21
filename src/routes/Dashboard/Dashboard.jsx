import "./Dashboard.scss";
import { useRef, useState } from "react";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import { Outlet, useLocation } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";

const Dashboard = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="home-container">
      <div className="home-left">
        <div className="welcome">Welcome User!</div>
        <div className="calendar"></div>
      </div>
      <div className="home-right">
        <div className="entry-count"></div>
        <div className="random1"></div>
        <div className="random2"></div>
      </div>
    </div>
  );
};

export default Dashboard;
