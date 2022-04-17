import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../components/context/Context";
import { useParams } from "react-router-dom";
const Edit = () => {
  const { entries, setEntries } = useContext(MyContext);
  const { id } = useParams();
  const [currentEntry, setCurrentEntry] = useState(() => {
    const entry = entries.find((ele) => ele.id === Number(id));
    // console.log(entry)
    return entry;
  });
  const [formInput, setFormInput] = useState({
    id: currentEntry.id,
    workoutName: currentEntry.workoutName,
    date: currentEntry.date.toISOString().substring(0, 10),
    notes: currentEntry.notes,
    type: {...currentEntry.types },
    data: {...currentEntry.data},
  });
  const [repetition, setRepetition] = useState(12);
  useEffect(() => {
    setCurrentEntry(() => {
      const entry = entries.find((ele) => ele.id === Number(id));
      // console.log(new Date().toLocaleString().slice(0, 9));
      return entry;
    });
  }, [id]);

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
      const temp = new Date(
        e.target.value.slice(0, 4),
        e.target.value.slice(5, 7) - 1,
        e.target.value.slice(8, 10)
      );
      setFormInput({
        ...formInput,
        [e.target.id]: temp,
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
            const clone = {
              ...formInput,
              date: new Date(formInput.date.slice(0, 4),formInput.date.slice(5, 7) - 1, formInput.date.slice(8, 10))
            };
            // setFormInput(clone);
            setEntries((prevArray) => {
              console.log(prevArray.indexOf(currentEntry))
              // return [...prevArray, clone]
              const arrClone = [...prevArray]
              arrClone[arrClone.indexOf(currentEntry)] = clone
              return arrClone
            });
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Edit;
