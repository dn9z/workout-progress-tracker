import "./Details.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
const Details = () => {
  const { _id } = useParams();
  const [activeItem] = useOutletContext()
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
          <p>The id of the Workout {_id}</p>
          <p>Date: {currentEntry.date.toString()}</p>
          <p>Name: {currentEntry._type.name}</p>
          <p>Type: {currentEntry._type.category}</p>
          <p>Notes: {currentEntry.note}</p>
          {currentEntry._type.category === "weights" && <p>Weights: {currentEntry.data.weights}</p>}
          {(currentEntry._type.category === "weights" ||
            currentEntry._type.category === "bodyweight") && (
            <ul>
              Sets
              {currentEntry._type.sets &&
                currentEntry._type.sets.map((ele, i) => {
                  return <li key={i}>{ele}</li>;
                })}
            </ul>
          )}
          {currentEntry._type.category === "distance" && (
            <ul>
              Sets
              {currentEntry.data.rounds.map((ele, i) => {
                return <li key={i}>{ele}</li>;
              })}
            </ul>
          )}
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
