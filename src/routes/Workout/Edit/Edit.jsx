import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../components/context/Context";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import axios from "../../../components/utils/axiosInstance";
const Edit = () => {
  const navigate = useNavigate();
  const { setPageNumber } = useContext(MyContext);
  const [activeItem,setActiveItem, setWorkouts] = useOutletContext()
  const { _id } = useParams();
  const [currentEntry, setCurrentEntry] = useState(null);


  const [dateInput, setDateInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  
  
  const [weights, setWeights] = useState(0);
  const [distance, setDistance] = useState(0);
  

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
  },[currentEntry])


  async function handleSubmit (e)  {
    e.preventDefault();
    console.log("Submit the form");
    const formData = new FormData(e.target);
    let data = {};
    if (currentEntry._type.category === "weights") {
      data = {
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          weights: formData.get("weights"),
          sets: setsArr,
        },
        note: formData.get("note"),
        type:currentEntry._type.category

      };
    } else if (currentEntry._type.category === "bodyweight") {
      data = {
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          sets: setsArr,
        },
        note: formData.get("note"),
        type:currentEntry._type.category

      };
    } else if (currentEntry._type.category === "distance") {
      data = {
        date: new Date(Date.parse(formData.get("date"))),
        data: {
          distance: formData.get("distance"),
          rounds: roundsArr,
        },
        note: formData.get("note"),
        type:currentEntry._type.category
      };
    }

    try {
      const response = await axios.patch(`/api/workouts/update/${currentEntry._id}`, data);

      if (response.status === 200) {
        console.log("workout was updated");
        setWorkouts([])
        setPageNumber(1)
        setActiveItem(null)
        navigate(`/workouts/details/${currentEntry._id}`);
      }
    } catch (error) {
      console.log(error);
      // setIsError(true);
      // setErrorMessage(error.response.data.message);
    }
  };

  async function handleDelete(e){
    e.preventDefault()
    try {
      const res = await axios.delete(`/api/workouts/deleteone/${currentEntry._id}`)
      setWorkouts([])
      setPageNumber(1)
      setActiveItem(null)
      navigate(`/workouts`)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Edit Workout</h3>

        <div>
          <label>Date</label>
          <input value={dateInput} onChange={(e) => setDateInput(e.target.value)} type="date" name="date" />
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
        {currentEntry && currentEntry._type.category === "distance" && (
          <>
            <div>
              <label>Distance</label>
              <input value={distance} onChange={(e) => setDistance(e.target.value) } type="number" name="distance" />
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
          <textarea  value={noteInput} onChange={(e) => setNoteInput(e.target.value)}  name="note" cols="30" rows="10"></textarea>
        </div>
        <button onClick={() => {
              navigate(`/workouts/details/${currentEntry._id}`);
            }}>Back</button>
        <button>Submit</button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
};

export default Edit;
