import "./Details.scss";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../components/context/Context";
import { useParams, useNavigate } from "react-router-dom";
const Details = ({ setShowDetails }) => {
  const { entries, setEntries } = useContext(MyContext);
  const { id } = useParams();
  const [currentEntry, setCurrentEntry] = useState(() => {
    const entry = entries.find((ele) => ele.id === Number(id));
    // console.log(entry)
    return entry;
  });
  // console.log(currentEntry)
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentEntry(() => {
      const entry = entries.find((ele) => ele.id === Number(id));
      return entry;
    });
  }, [id]);

  return (
    <div className="details-container">
      <p>The id of the Workout {id}</p>
      <p>Date: {currentEntry.date.toString()}</p>
      <p>Name: {currentEntry.workoutName}</p>
      <p>Type: {currentEntry.type.name}</p>
      <p>Notes: {currentEntry.notes}</p>
      <p>Weights: {currentEntry.data.weights}</p>
      <ul>
        Sets
        {currentEntry.data.sets.map((ele, i) => {
          return <li key={i}>{ele}</li>;
        })}
      </ul>
      <button
        onClick={() => {
          navigate(`/workouts/edit/${currentEntry.id}`);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Details;
