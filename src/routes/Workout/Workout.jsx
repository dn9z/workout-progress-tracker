import {useState} from "react";
import { Outlet, useLocation } from "react-router-dom";
import List from "../../components/List/List";
import './Workout.scss'
const Workout = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const location = useLocation()
  return (
        <div className="workout-page-container">
          <div className="workout-left">
            <List workouts={workouts} setWorkouts={setWorkouts} activeItem={activeItem} setActiveItem={setActiveItem}/>
          </div>
          <div className="workout-right">
            {location.pathname === '/workouts'&&<span>please select</span>}
            { <Outlet context={[activeItem,setActiveItem,setWorkouts]} />}
          </div>
        </div>
  );
};

export default Workout;
