import { useContext } from "react";
import "./List.scss";

import { MyContext } from "../context/Context";
import { Outlet, useNavigate } from "react-router-dom";

const List = () => {
  const { entries } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="list-container">
        <button onClick={() => {}}>Add</button>
        {entries.map((ele, i) => {
          return (
            <li
              onClick={() => {
                navigate(`/details/${ele.id}`);
              }}
              key={i}
            >
              {ele.workoutName}
            </li>
          );
        })}
      </div>
      <Outlet />
    </>
  );
};

export default List;
