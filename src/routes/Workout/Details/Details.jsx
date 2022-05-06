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
      .get(`http://localhost:9001/api/workouts/find/${_id}`)
      .then((res) => {
        if (res) {
          console.log(activeItem)
          setCurrentEntry(res.data);
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
          <p>Name: {currentEntry.type.name}</p>
          <p>Type: {currentEntry.type.category}</p>
          <p>Notes: {currentEntry.notes}</p>
          {currentEntry.type.category === "weights" && <p>Weights: {currentEntry.data.weights}</p>}
          {(currentEntry.type.category === "weights" ||
            currentEntry.type.category === "bodyweight") && (
            <ul>
              Sets
              {currentEntry.data.sets &&
                currentEntry.data.sets.map((ele, i) => {
                  return <li key={i}>{ele}</li>;
                })}
            </ul>
          )}
          {currentEntry.type.category === "distance" && (
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
