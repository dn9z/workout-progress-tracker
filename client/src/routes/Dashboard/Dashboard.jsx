import "./Dashboard.scss";
import { useEffect, useState, useContext } from "react";
import List from "../../components/List/List";
import { Outlet, useLocation } from "react-router-dom";
import { MyContext } from "../../components/context/Context";
import axios from "../../components/utils/axiosInstance";
import useViewport from "../../components/utils/useViewport";
import TotalWorkouts from "../../components/tiles/TotalWorkouts/TotalWorkouts";
import Welcome from "../../components/tiles/Welcome/Welcome";
import RecentWorkouts from "../../components/tiles/RecentWorkouts/RecentWorkouts";
import Highlights from "../../components/tiles/Highlights/Highlights";
import CalendarWidget from "../../components/tiles/CalendarWidget/CalendarWidget";
import Modal from "../../components/utils/Modal/Modal";
import AddWorkoutForm from "../../components/EntryForms/AddWorkoutForm";

const Dashboard = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const { username } = useContext(MyContext);
  const [workouts, setWorkouts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { width } = useViewport();
  useEffect(() => {
    async function getWorkouts() {
      const res = await axios.get("/api/workouts/getall");
      setWorkouts(res.data);
    }
    getWorkouts();
  }, []);

  // console.log(workouts)

  return (
    <>
      {width < 576 ? (
        <>
          <div className="home-container">
            <div className="home-left">
              <div className="welcome-and-calendar">
              <div className="welcome tile-container">
                <Welcome workouts={workouts} />
              </div>
              <div className="calendar-widget tile-container">
                <CalendarWidget workouts={workouts} setShowAddModal={setShowAddModal} />
              </div>
              </div>
              <div className="entry-count tile-container">
                <TotalWorkouts workouts={workouts} />
              </div>
            </div>
            <div className="home-right">
              <div className="recent tile-container">
                <RecentWorkouts workouts={workouts} />
              </div>
              <div className="highlights tile-container">
                <Highlights workouts={workouts} />
              </div>
            </div>
            {showAddModal && (
              <Modal
                component={<AddWorkoutForm setShowAddModal={setShowAddModal} />}
                setShowModal={setShowAddModal}
              />
            )}
          </div>
        </>
      ) : (
        <div className="home-container">
          <div className="home-left">
            <div className="welcome tile-container">
              <Welcome workouts={workouts} />
            </div>
            <div className="calendar-widget tile-container">
              <CalendarWidget workouts={workouts} setShowAddModal={setShowAddModal} />
            </div>
          </div>
          <div className="home-right">
            <div className="entry-count tile-container">
              <TotalWorkouts workouts={workouts} />
            </div>
            <div className="recent tile-container">
              <RecentWorkouts workouts={workouts} />
            </div>
            <div className="highlights tile-container">
              <Highlights workouts={workouts} />
            </div>
          </div>
          {showAddModal && (
            <Modal
              component={<AddWorkoutForm setShowAddModal={setShowAddModal} />}
              setShowModal={setShowAddModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
