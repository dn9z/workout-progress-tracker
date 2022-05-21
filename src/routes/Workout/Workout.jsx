import {useState} from "react";
import { Outlet } from "react-router-dom";
import List from "../../components/List/List";
import './Workout.scss'
const Workout = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  return (
        <div className="workout-page-container">
          <div className="workout-left">
            <List workouts={workouts} setWorkouts={setWorkouts} activeItem={activeItem} setActiveItem={setActiveItem}/>
          </div>
          <div className="workout-right">
            {activeItem? <Outlet context={[activeItem,setActiveItem,setWorkouts]} />:'please select'}
          </div>
        </div>
  );
};

export default Workout;
