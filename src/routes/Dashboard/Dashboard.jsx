import "./Dashboard.scss";
import { useEffect, useState, useContext } from "react";
// import Form from "../../components/AddEntryForm/AddEntryForm";
import List from "../../components/List/List";
import { Outlet, useLocation } from "react-router-dom";
// import Tiles from "../../components/Tiles/Tiles";
import { MyContext } from "../../components/context/Context";
import axios from "axios";
import TotalWorkouts from "../../components/tiles/TotalWorkouts/TotalWorkouts";
import Welcome from "../../components/tiles/Welcome/Welcome";
import RecentWorkouts from "../../components/tiles/RecentWorkouts/RecentWorkouts";
import Highlights from "../../components/tiles/Highlights/Highlights";
import CalendarWidget from "../../components/tiles/CalendarWidget/CalendarWidget";

const Dashboard = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const { username } = useContext(MyContext);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function getWorkouts() {
      const res = await axios.get("/api/workouts/getall");
      setWorkouts(res.data);
    }
    getWorkouts();
  }, []);

  // console.log(workouts)

  return (
    <div className="home-container">
      <div className="home-left">
        <div className="welcome">
          <Welcome workouts={workouts} />
        </div>
        <div className="calendar-widget"><CalendarWidget workouts={workouts}/></div>
      </div>
      <div className="home-right">
        <div className="entry-count">
          <TotalWorkouts workouts={workouts} />
        </div>
        <div className="recent">
          <RecentWorkouts workouts={workouts} />
        </div>
        <div className="highlights"><Highlights workouts={workouts}/></div>
      </div>
    </div>
  );
};

export default Dashboard;
