import {useState} from "react";
import { Outlet } from "react-router-dom";
import List from "../../components/List/List";
import './Workout.scss'
const Workout = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
        <div className="workout-page-container">
          <div className="home-left">
            <List activeItem={activeItem} setActiveItem={setActiveItem}/>
          </div>
          <div className="home-right">
            {activeItem? <Outlet context={[activeItem]} />:'please select'}
          </div>
        </div>
  );
};

export default Workout;
