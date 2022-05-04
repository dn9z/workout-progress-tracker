import "./Form.scss";
import { useState, useContext } from "react";
import { MyContext } from "../context/Context";
import axios from "axios";

const AddEntryForm = ({ setShowAddModal }) => {
  const { entries, setEntries } = useContext(MyContext);
  const [formInput, setFormInput] = useState({
    id: undefined,
    // workoutName: "My Workout",
    date: new Date().toISOString().substring(0, 10),
    notes: "",
    type: {
      name: "My Workout",
      category: "weights",

      // withWeights: this.name==='weights'?true:false
      // withWeights: () => {
      //   console.log(this.name);
      //   return this.name === "weights" ? true : false;
      // },
    },
    data: {
      weights: 0,
      sets: [],
      distance: 0,
      rounds: [],
    },
  });
// console.log(Math.round((Math.random()*(2023 - 2020) + 2020) * 100) / 100)
  const [repetition, setRepetition] = useState(12);
  const [time, setTime] = useState("00:00:00");

  function handleChange(e) {
    const value = e.target.value;
    if (e.target.id === "name") {
      setFormInput({
        ...formInput,
        [e.target.dataset.parent]: {
          ...formInput.type,
          [e.target.id]: value,
        },
      });
    } else if (e.target.id === "category") {
      setFormInput({
        ...formInput,
        [e.target.dataset.parent]: {
          ...formInput.type,
          [e.target.id]: value,
        },
      });
    } else if (e.target.id === "notes") {
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const temp = new Date(
      formInput.date.slice(0, 4),
      formInput.date.slice(5, 7) - 1,
      formInput.date.slice(8, 10)
    );
    const clone = {
      ...formInput,
      id: Math.floor(100000 + Math.random() * 900000),
      date: temp,
    };
    // setFormInput(clone);
    // setEntries((prevArray) => [...prevArray, clone]);
    
    setShowAddModal(false);

    try {
        const res = await axios.post('http://localhost:9001/api/workouts/add', clone)
        console.log("data saved ", res)
    } catch (error) {
        console.warn("There was an error", error)
    }
 }

  return (
    <div className="form-container">
      <form>
        <li>
          <label htmlFor="name">Type</label>
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
          <label htmlFor="name">Workout name</label>
          <input
            id="name"
            type="text"
            onChange={handleChange}
            value={formInput.type.name}
            data-parent="type"
          />
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
        {formInput.type.category === "weights" && (
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
        )}
        {(formInput.type.category === "weights" ||
          formInput.type.category === "bodyweight") && (
          <>
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
          </>
        )}
        {formInput.type.category === "distance" && (
          <>
            <li>
              <label htmlFor="distance">Distance</label>
              <input
                id="distance"
                data-parent="data"
                type="number"
                onChange={handleChange}
                value={formInput.data.distance}
              />
            </li>
            <li>
              <label htmlFor="time">Time</label>
              <input
                id="time"
                data-parent="data"
                type="time"
                step="1"
                min="00:00"
                max="24:00"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                value={time}
              />
              <ul>
                {formInput.data.rounds.map((ele, i) => {
                  return <li key={i}>{ele}</li>;
                })}
              </ul>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const clone = { ...formInput };
                  clone.data.rounds.push(time);
                  setFormInput(clone);
                }}
              >
                Add Round
              </button>
            </li>
          </>
        )}
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
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default AddEntryForm;
