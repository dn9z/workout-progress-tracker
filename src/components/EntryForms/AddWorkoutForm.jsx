import "./Form.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddWorkoutForm = ({ setShowAddModal }) => {
  const [myTypes, setMyTypes] = useState([]);
  const [typeInput, setTypeInput] = useState("");
  const [selectedType, setSelectedType] = useState({});
  const [set, setSet] = useState(0);
  const [setsArr, setSetsArr] = useState([]);
  const [round, setRound] = useState("");
  const [roundsArr, setRoundsArr] = useState([]);

  useEffect(() => {
    const getOne = async () => {
      const res = await axios.post("/api/types/getonebyname", { typeName: typeInput });
      setSelectedType(res.data.type);
    };
    getOne();
  }, [typeInput]);

  // const navigate = useNavigate();
  // const [isError, setIsError] = useState(false)
  // const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit the form");
    const formData = new FormData(event.target);
    let data = {};
    if (selectedType.category === "weights") {
      data = {
        type: formData.get("type"), //get the data from the input with name type
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          weights: formData.get("weights"),
          sets: setsArr,
        },
        note: formData.get("note"),
      };
    } else if (selectedType.category === "bodyweight") {
      data = {
        type: formData.get("type"), //get the data from the input with name type
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          sets: setsArr,
        },
        note: formData.get("note"),
      };
    } else if (selectedType.category === "distance") {
      data = {
        type: formData.get("type"), //get the data from the input with name type
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          distance: formData.get("distance"),
          rounds: roundsArr,
        },
        note: formData.get("note"),
      };
    }

    try {
      const response = await axios.post(`/api/workouts/create/${selectedType._id}`, data);

      if (response.status === 200) {
        console.log("workout was created");
        setShowAddModal(false);
      }
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const getListOfTypes = async () => {
      const res = await axios.get("/api/types/getall");
      setMyTypes(res.data.types);
    };
    getListOfTypes();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Add Workout-Type</h3>

        <div>
          <label>Type</label>
          <select onChange={(e) => setTypeInput(e.target.value)} value={typeInput} name="type">
            {myTypes &&
              myTypes.map((ele, i) => {
                return (
                  <option value={ele.name} key={i}>
                    {ele.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div>
          <label>Date</label>
          <input type="date" name="date" />
        </div>

        {selectedType && selectedType.category === "weights" && (
          <div>
            <label>Weights amount</label>
            <input name="weights" type="number" />
          </div>
        )}
        {selectedType &&
          (selectedType.category === "weights" || selectedType.category === "bodyweight") && (
            <>
              <div>
                <label>Repetitions</label>
                <input value={set} onChange={(e) => setSet(e.target.value)} type="number" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const clone = [...setsArr];
                    clone.push(set)
                    setSetsArr(clone);
                  }}
                >
                  Add set
                </button>
              </div>
              <ol>
                {setsArr.map((ele, i) => {
                  return <li key={i}>{ele}</li>;
                })}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSetsArr([]);
                  }}
                >
                  Reset sets
                </button>
              </ol>
            </>
          )}
        {selectedType && selectedType.category === "distance" && (
          <>
            <div>
              <label>Distance</label>
              <input type="number" />
            </div>
            <div>
              <label>Time</label>
              <input
                type="time"
                step="1"
                min="00:00"
                max="24:00"
                onChange={(e) => {
                  setRound(e.target.value);
                }}
                value={round}
              />
                            <button
                onClick={(e) => {
                  e.preventDefault();
                  const clone = [...roundsArr];
                  clone.push(round);
                  setRoundsArr(clone);
                }}
              >
                Add Round
              </button>
              <ul>
                {roundsArr.map((ele, i) => {
                  return <li key={i}>{ele}</li>;
                })}
              </ul>
              <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRoundsArr([]);
                  }}
                >
                  Reset Rounds
                </button>
            </div>
          </>
        )}
        <div>
          <label>Personal Note</label>
          <textarea name="note" cols="30" rows="10"></textarea>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddWorkoutForm;
