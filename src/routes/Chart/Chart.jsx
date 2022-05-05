import "./Chart.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../components/context/Context";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { format } from "date-fns";
import ChartItem from "./ChartItem";
const toSeconds = (str) => {
  const timeArr = str.split(":");
  let seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];
  return seconds;
};

const Chart = () => {
  const [workouts, setWorkouts] = useState([]);

  const [outcomeInput, setOutcomeInput] = useState("average");
  const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const [dateInput, setDateInput] = useState({
    from: "2020-01-01",
    to: new Date().toISOString().substring(0, 10),
  });
  const [labels, setLabels] = useState([]);
  const [dataset1, setDataset] = useState([]);
  const [dataset2, setDataset2] = useState([]);

  const filterData = () => {
    const filteredLabels = [];
    const filteredDataset1 = [];
    const filteredDataset2 = [];

    workouts.forEach((ele, i) => {
      if (
        new Date(workouts[i].date) > new Date(dateInput.from) &&
        new Date(workouts[i].date) < new Date(dateInput.to)
      ) {
        if (typeFilterInput === "weights") {
          if (ele.type.category === "weights") {
            filteredLabels.push(workouts[i].date.slice(0, 10));
            filteredDataset1.push(workouts[i].data.weights);

            if (outcomeInput === "average") {
              const acc = workouts[i].data.sets.reduce((acc, ele) => acc + ele);
              filteredDataset2.push(acc / workouts[i].data.sets.length);
            }
            if (outcomeInput === "highest") {
              const highest = workouts[i].data.sets.reduce((acc, ele) => (acc < ele ? ele : acc));
              filteredDataset2.push(highest);
            }
            if (outcomeInput === "lowest") {
              const lowest = workouts[i].data.sets.reduce((acc, ele) => (acc > ele ? ele : acc));
              filteredDataset2.push(lowest);
            }
          }
        }
        if (typeFilterInput === "bodyweight") {
          if (ele.type.category === "bodyweight") {
            filteredLabels.push(workouts[i].date.slice(0, 10));
            if (outcomeInput === "average") {
              const acc = workouts[i].data.sets.reduce((acc, ele) => acc + ele);
              filteredDataset2.push(acc / workouts[i].data.sets.length);
            }
            if (outcomeInput === "highest") {
              const highest = workouts[i].data.sets.reduce((acc, ele) => (acc < ele ? ele : acc));
              filteredDataset2.push(highest);
            }
            if (outcomeInput === "lowest") {
              const lowest = workouts[i].data.sets.reduce((acc, ele) => (acc > ele ? ele : acc));
              filteredDataset2.push(lowest);
            }
          }
          // console.log(filteredDataset1)
        }
        if (typeFilterInput === "distance") {
          if (ele.type.category === "distance") {
            filteredLabels.push(workouts[i].date.slice(0, 10));
            filteredDataset1.push(workouts[i].data.distance);
            if (outcomeInput === "average") {
              const avgSeconds = workouts[i].data.rounds.reduce((acc, ele) => {
                let seconds = toSeconds(ele);
                return acc + seconds;
              }, 0);
              filteredDataset2.push(avgSeconds / workouts[i].data.rounds.length / 60);
            }
            if (outcomeInput === "highest") {
              const highestSeconds = workouts[i].data.rounds.reduce((acc, ele) => {
                let seconds = toSeconds(ele);
                return seconds < acc ? acc : seconds;
              }, 0);

              filteredDataset2.push(highestSeconds / 60);
            }
            if (outcomeInput === "lowest") {
              const lowestSeconds = workouts[i].data.rounds.reduce((acc, ele) => {
                // console.log(first)
                const timeArr = ele.split(":");
                let seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];
                return seconds > acc ? acc : seconds;
              }, toSeconds(workouts[i].data.rounds[0]));

              filteredDataset2.push(lowestSeconds / 60);
              console.log(lowestSeconds);
            }
          }
        }
      }
    });

    setLabels(filteredLabels);
    setDataset(filteredDataset1);
    setDataset2(filteredDataset2);
  };

  function handleChange(e) {
    if (e.target.id === "from") {
      setDateInput({
        ...dateInput,
        [e.target.id]: e.target.value,
      });
    } else if (e.target.id === "to") {
      setDateInput({
        ...dateInput,
        [e.target.id]: e.target.value,
      });
    }
  }
  useEffect(() => {
    axios
      .get("http://localhost:9001/api/workouts/")
      .then((res) => {
        if (res) {
          setWorkouts(res.data);
        }
      })
      .catch((error) => {
        console.warn("There was an error", error);
      });
  }, []);

  useEffect(() => {
    filterData()
    if(workouts.length){
    setDateInput({
      ...dateInput,
      from: workouts[0].date.slice(0,10)
    })
    }

  },[workouts])

  return (
    <div className="chart-main">
      <label htmlFor="from">From</label>
      <input id="from" type="date" value={dateInput.from} onChange={handleChange} />
      <label htmlFor="to">To</label>
      <input id="to" type="date" value={dateInput.to} onChange={handleChange} />
      <label htmlFor="type">Type</label>
      <select
        id="type"
        value={typeFilterInput}
        onChange={(e) => {
          setTypeFilterInput(e.target.value);
        }}
      >
        <option value="weights">Weights</option>
        <option value="bodyweight">Bodyweight</option>
        <option value="distance">Distance</option>
      </select>
      <label htmlFor="sets">Outcome</label>
      <select
        id="sets"
        value={outcomeInput}
        onChange={(e) => {
          setOutcomeInput(e.target.value);
        }}
      >
        <option value="average">Average</option>
        <option value="highest">Highest</option>
        <option value="lowest">Lowest</option>
      </select>
      <button onClick={filterData}>Filter</button>
      <div className="chart-container">
        <div className="chart-wrapper">
          <ChartItem labels={labels} dataset1={dataset1} dataset2={dataset2} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
