import {useState} from "react";
import { Outlet } from "react-router-dom";
import List from "../../components/List/List";

const Workout = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <>
      
        <>
          <div className="home-left">
            <List activeItem={activeItem} setActiveItem={setActiveItem}/>
          </div>
          <div className="home-right">
            {activeItem? <Outlet/>:'please select'}
          </div>
        </>
    </>
  );
};

export default Workout;
