import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context";
const Tiles = ({ activeItem }) => {
  const { entries } = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <div className="tiles-container">
      <div className="primary-tiles">
        {entries.length ? (
          <>
          <p>Most Recent Workout</p>
            {entries[entries.length - 1].date.toLocaleString()}
          <p>Weight:{entries[entries.length - 1].data.weights}</p>
            <p>Sets:</p>
            {entries[entries.length - 1].data.sets &&
              entries[entries.length - 1].data.sets.map((ele, i) => {
                return <span key={i} style={{fontSize:`calc(1rem + ${i*10}px)`}}>{ele}</span>;
              })}
          </>
        ) : (
          "No entries"
        )}
      </div>
      <div className="secondary-tiles">
        <div
          className="tile"
          onClick={() => {
            navigate(`/details/${activeItem.id}`);
          }}
        >
          Details
        </div>
        <div
          className="tile"
          onClick={() => {
            navigate(`/chart/${activeItem.id}`);
          }}
        >
          Charts
        </div>
        <div className="tile" onClick={() => {
          console.log(entries.find((ele) => {
            return ele.id === activeItem.id
          }))
        }}>Delete</div>
        <div className="tile">Settings</div>
      </div>
    </div>
  );
};

export default Tiles;
