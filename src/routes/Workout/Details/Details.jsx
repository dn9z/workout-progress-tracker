import "./Details.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { format, parseISO } from "date-fns";

const Details = () => {
  const { _id } = useParams();
  const [activeItem] = useOutletContext();
  const [currentEntry, setCurrentEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/workouts/findbyid/${_id}`)
      .then((res) => {
        if (res) {
          setCurrentEntry(res.data.workout);
        }
      })
      .catch((error) => {
        console.warn("There was an error", error);
      });
  }, [activeItem]);

  return (
    <div className="details-container">
      {currentEntry && (
        <>
          <h1>{currentEntry._type.name}</h1>
          <h2>{format(parseISO(currentEntry.date), "MMMM dd, yyyy")}</h2>
          <p>
            Category:{" "}
            {currentEntry._type.category[0].toUpperCase() + currentEntry._type.category.slice(1)}
          </p>

          {currentEntry._type.category === "weights" && (
            <p >Weights: <span className="score">{currentEntry.data.weights}</span> kg</p>
          )}
          {(currentEntry._type.category === "weights" ||
            currentEntry._type.category === "bodyweight") && (
            <>
              <span>Sets:</span>
              <ul className="details-set-list">
                {currentEntry.data.sets &&
                  currentEntry.data.sets.map((ele, i) => {
                    return (
                      <li
                        style={{
                          fontSize: i === 0 ? "3rem" : i === 1 ? "2rem" : i === 2 && "1.5rem",
                        }}
                        key={i}
                      >
                        {ele}
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
          {currentEntry._type.category === "distance" && (
            <>
              <p >Distance: <span className="score">{currentEntry.data.distance}</span> km</p>
              <span>Rounds:</span>
              <ul className="details-set-list">
                {currentEntry.data.rounds.map((ele, i) => {
                  return (
                    <li
                      style={{
                        fontSize: i === 0 ? "3rem" : i === 1 ? "2rem" : i === 2 && "1.5rem",
                      }}
                      key={i}
                    >
                      {ele}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {/* <span>Notes:</span> */}
          <p>{currentEntry.note}</p>
          <button
            onClick={() => {
              navigate(`/workouts/edit/${currentEntry._id}`);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Details;
