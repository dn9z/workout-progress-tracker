import "./Home.scss";
import { useRef, useState } from "react";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import { Outlet, useLocation } from "react-router-dom";
import Tiles from "../../components/Tiles/Tiles";

const Home = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  return (
    <>
      {location.pathname.slice(1, 6) === "chart" ? (
        <Outlet />
      ) : (
        <>
          <div className="home-left">
            <List activeItem={activeItem} setActiveItem={setActiveItem}/>
          </div>
          <div className="home-right">
            {location.pathname === "/" ? <Tiles activeItem={activeItem} /> : <Outlet />}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
