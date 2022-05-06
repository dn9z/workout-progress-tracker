import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../components/context/Context";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
const Edit = () => {
  const navigate = useNavigate();
  const [activeItem] = useOutletContext()
  const { _id } = useParams();
  const [currentEntry, setCurrentEntry] = useState(null);
  const [formInput, setFormInput] = useState({
    date: '',
    notes: "",
    type: {
      name: "",
      category: "",
    },
    data: {
      weights: 0,
      sets: [],
      distance: 0,
      rounds: [],
    },
  });
  const [repetition, setRepetition] = useState(12);

  

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


  useEffect(() => {
    currentEntry && setFormInput({
      date: currentEntry.date.slice(0,10),
      notes: currentEntry.notes,
      type: {
        name: currentEntry.type.name,
        category: currentEntry.type.category,
      },
      data: {
        weights: currentEntry.data.weights,
        sets: currentEntry.data.sets,
        distance: currentEntry.data.distance,
        rounds: currentEntry.data.rounds,
      },
    })
  },[currentEntry])


  function handleChange(e) {
    const value = e.target.value;
    console.log(e.target.value);
    if (e.target.id === "name") {
      setFormInput({
        ...formInput,
        [e.target.dataset.parent]: {
          ...formInput.type,
          [e.target.id]: value,
        },
      });
      // console.log(formInput.type.withWeights())
    } else if (e.target.id === "notes" || e.target.id === "workoutName") {
      setFormInput({
        ...formInput,
        [e.target.id]: value,
      });
    } else if (e.target.id === "date") {
      setFormInput({
        ...formInput,
        [e.target.id]: value,
      });
      // console.log(new Date().toISOString().substring(0, 10))
    } else if (e.target.dataset.parent) {
      setFormInput({
        ...formInput,
        [e.target.dataset.parent]: {
          ...formInput.data,
          [e.target.id]: value,
        },
      });
    } else {
      setFormInput({
        ...formInput,
        [e.target.dataset.parent]: value,
      });
    }
  }


  return (
    <div className="edit-form-container">
      <form>
        <li>
          <label htmlFor="workoutName">Workout name</label>
          <input
            id="workoutName"
            type="text"
            onChange={handleChange}
            value={formInput.type.name}
          />
        </li>
        <li>
          <label htmlFor="category">Type</label>
          <select
            id="category"
            onChange={handleChange}
            value={formInput.type.category}
            data-parent="type"
          >
            <option value="weights">Weights</option>
            <option value="bodyweight">Bodyweight</option>
            <option value="distance">Distance</option>
          </select>
        </li>
        <li>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            onChange={handleChange}
            value={formInput.date}
          />
        </li>
        <li>
          <label htmlFor="weights">Weights amount</label>
          <input
            id="weights"
            data-parent="data"
            type="number"
            onChange={handleChange}
            value={formInput.data.weights}
          />
        </li>
        <li>
          <label htmlFor="repetitionInputField">Repetitions</label>
          <input
            id="repetitionInputField"
            data-parent="data"
            type="number"
            onChange={(e) => {
              setRepetition(e.target.value);
            }}
            value={repetition}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              const clone = { ...formInput };
              clone.data.sets.push(repetition);
              setFormInput(clone);
            }}
          >
            Add set
          </button>
        </li>
        <ol>
          {formInput.data.sets.map((ele, i) => {
            return <li key={i}>{ele}</li>;
          })}
          <button
            onClick={(e) => {
              e.preventDefault();
              const clone = { ...formInput };
              clone.data.sets = [];
              setFormInput(clone);
            }}
          >
            Reset sets
          </button>
        </ol>
        <li>
          <label htmlFor="notes">Personal Note</label>
          <textarea
            id="notes"
            data-parent="notes"
            onChange={handleChange}
            value={formInput.notes}
            cols="30"
            rows="10"
          ></textarea>
        </li>
        {/* <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const clone = {
              ...formInput,
              date: new Date(
                formInput.date.slice(0, 4),
                formInput.date.slice(5, 7) - 1,
                formInput.date.slice(8, 10)
              ),
            };
            // setFormInput(clone);
            setEntries((prevArray) => {
              console.log(prevArray.indexOf(currentEntry));
              // return [...prevArray, clone]
              const arrClone = [...prevArray];
              arrClone[arrClone.indexOf(currentEntry)] = clone;
              return arrClone;
            });
            navigate(`/workouts/details/${currentEntry.id}`);
          }}
        >
          Save
        </button> */}
        <button
          onClick={() => {
            navigate(`/workouts/details/${currentEntry.id}`);
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default Edit;
