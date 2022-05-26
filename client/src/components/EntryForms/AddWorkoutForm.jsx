import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const AddWorkoutForm = ({ setShowAddModal, setWorkouts, setPageNumber }) => {
  const [myTypes, setMyTypes] = useState([]);
  const [typeInput, setTypeInput] = useState("");
  const [selectedType, setSelectedType] = useState({});
  const [set, setSet] = useState(0);
  const [setsArr, setSetsArr] = useState([]);
  const [round, setRound] = useState("");
  const [roundsArr, setRoundsArr] = useState([]);

  useEffect(() => {
    const getOne = async () => {
      const res = await axios.get(`/api/types/getonebyname?name=${typeInput}`);
      setSelectedType(res.data.type);
    };
    typeInput && getOne();
  }, [typeInput]);

  // const navigate = useNavigate();
  // const [isError, setIsError] = useState(false)
  // const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = {};
    if (selectedType.category === "weights") {
      if (!setsArr.length) alert("Please add data");

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
      if (!setsArr.length) return alert("Please add data");
      data = {
        type: formData.get("type"), //get the data from the input with name type
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          sets: setsArr,
        },
        note: formData.get("note"),
      };
    } else if (selectedType.category === "distance") {
      if (!roundsArr.length) return alert("Please add data");

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
        setPageNumber(1);
        setWorkouts([]);
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
      setTypeInput(res.data.types[0].name);
    };
    getListOfTypes();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Add Workout</h3>
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
          <input type="date" name="date" required />
        </div>

        {selectedType && selectedType.category === "weights" && (
          <div>
            <label>Weights amount</label>
            <input name="weights" type="number" required />
          </div>
        )}
        {selectedType &&
          (selectedType.category === "weights" || selectedType.category === "bodyweight") && (
            <>
              <div>
                <label>Repetitions</label>
                <div className="repetition-input-ui">
                  <input value={set} onChange={(e) => setSet(e.target.value)} type="number" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const clone = [...setsArr];
                      clone.push(set);
                      setSetsArr(clone);
                    }}
                  >
                    Add set
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSetsArr([]);
                    }}
                  >
                    Reset sets
                  </button>
                </div>
              </div>
              <div className="sets-container">
                {setsArr.length > 0 && <label>Sets</label>}

                <ol>
                  {setsArr.map((ele, i) => {
                    return <li key={i}>{ele}</li>;
                  })}
                </ol>
              </div>
            </>
          )}
        {selectedType && selectedType.category === "distance" && (
          <>
            <div>
              <label>Distance</label>
              <input type="number" required />
            </div>
            <div>
              <label>Time</label>
              <div className="repetition-input-ui">
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRoundsArr([]);
                  }}
                >
                  Reset Rounds
                </button>
              </div>
            </div>
            <div className="sets-container">
              {roundsArr.length > 0 && <label>Rounds</label>}

              <ol>
                {roundsArr.map((ele, i) => {
                  return <li key={i}>{ele}</li>;
                })}
              </ol>
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
