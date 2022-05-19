import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../components/context/Context";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
const Edit = () => {
  const navigate = useNavigate();
  const [activeItem] = useOutletContext()
  const { _id } = useParams();
  const [currentEntry, setCurrentEntry] = useState(null);


  const [dateInput, setDateInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  
  
  const [weights, setWeights] = useState(0);
  const [distance, setDistance] = useState(0);
  const [typeInput, setTypeInput] = useState('');
  

  const [set, setSet] = useState(0);
  const [setsArr, setSetsArr] = useState([]);
  const [round, setRound] = useState("");
  const [roundsArr, setRoundsArr] = useState([]);

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

  useEffect(() => {
    if(currentEntry){
      setDateInput(currentEntry.date.slice(0,10))
      setNoteInput(currentEntry.note)
      setTypeInput(currentEntry._type.category)

      if(currentEntry._type.category === "weights"){
        setWeights(currentEntry.data.weights)
        setSetsArr(currentEntry.data.sets)
      }
      else if(currentEntry._type.category === "bodyweight"){
        setSetsArr(currentEntry.data.sets)
      }
      else if(currentEntry._type.category === "distance"){
        setDistance(currentEntry.data.distance)
        setRoundsArr(currentEntry.data.rounds)
      }
    }

    // currentEntry && setFormInput({
    //   date: currentEntry.date.slice(0,10),
    //   notes: currentEntry.notes,
    //   type: {
    //     name: currentEntry._type.name,
    //     category: currentEntry._type.category,
    //   },
    //   data: {
    //     weights: currentEntry.data.weights,
    //     sets: currentEntry.data.sets,
    //     distance: currentEntry.data.distance,
    //     rounds: currentEntry.data.rounds,
    //   },
    // })
  },[currentEntry])


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit the form");
    const formData = new FormData(event.target);
    let data = {};
    if (currentEntry._type.category === "weights") {
      data = {
        type: formData.get("type"), //get the data from the input with name type
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          weights: formData.get("weights"),
          sets: setsArr,
        },
        note: formData.get("note"),
      };
    } else if (currentEntry._type.category === "bodyweight") {
      data = {
        type: formData.get("type"), //get the data from the input with name type
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          sets: setsArr,
        },
        note: formData.get("note"),
      };
    } else if (currentEntry._type.category === "distance") {
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
      const response = await axios.post(`/api/workouts/create/${currentEntry._type._id}`, data);

      if (response.status === 200) {
        console.log("workout was created");
      }
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };




  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit}>
        <h3>Edit Workout</h3>

        <div>
          <label>Type</label>
          <select value={typeInput} onChange={(e) => setTypeInput(e.taget.value) } name="type">
           <option value="weights">Weights</option>
           <option value="bodyweight">Bodyweight</option>
           <option value="distance">Distance</option>
          </select>
        </div>

        <div>
          <label>Date</label>
          <input value={dateInput} onChange={(e) => setDateInput(e)} type="date" name="date" />
        </div>

        {currentEntry && currentEntry._type.category === "weights" && (
          <div>
            <label>Weights amount</label>
            <input value={weights} onChange={(e) => setWeights(e.target.value) } name="weights" type="number" />
          </div>
        )}
        {currentEntry &&
          (currentEntry._type.category === "weights" || currentEntry._type.category === "bodyweight") && (
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
        {currentEntry && currentEntry._type.category === "distance" && (
          <>
            <div>
              <label>Distance</label>
              <input value={distance} onChange={(e) => setDistance(e.target.value) } type="number" />
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
          <textarea  value={noteInput} onChange={(e) => setNoteInput(e)}  name="note" cols="30" rows="10"></textarea>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Edit;
