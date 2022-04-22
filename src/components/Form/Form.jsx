import "./Form.scss";
import { useState, useContext } from "react";
import { MyContext } from "../context/Context";

const Form = ({setShowAddModal}) => {
  const { entries, setEntries } = useContext(MyContext);
  const [formInput, setFormInput] = useState({
    id: undefined,
    workoutName: "My Workout",
    date: new Date().toISOString().substring(0, 10),
    notes: "",
    type: {
      name: "weights",
      // withWeights: this.name==='weights'?true:false
      // withWeights: () => {
      //   console.log(this.name);
      //   return this.name === "weights" ? true : false;
      // },
    },
    data: {
      weights: 0,
      sets: [],
    },
  });

  const [repetition, setRepetition] = useState(12);

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
      console.log(e.target.id)
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
    <div className="form-container">
      <form>
        <li>
          <label htmlFor="workoutName">Workout name</label>
          <input
            id="workoutName"
            type="text"
            onChange={handleChange}
            value={formInput.workoutName}
          />
        </li>
        <li>
          <label htmlFor="name">Type</label>
          <select
            id="name"
            onChange={handleChange}
            value={formInput.type.name}
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
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const temp = new Date(
              e.target.value.slice(0, 4),
              e.target.value.slice(5, 7) - 1,
              e.target.value.slice(8, 10)
            );
            const clone = {
              ...formInput,
              id: Math.floor(100000 + Math.random() * 900000),
              date: new Date(formInput.date.slice(0, 4),formInput.date.slice(5, 7) - 1, formInput.date.slice(8, 10))
            };
            // setFormInput(clone);
            setEntries((prevArray) => [...prevArray, clone]);setShowAddModal(false)
          }}
        >
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default Form;
