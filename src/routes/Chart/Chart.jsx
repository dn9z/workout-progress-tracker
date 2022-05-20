import "./Chart.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../components/context/Context";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { format, parseISO } from "date-fns";
import ChartItem from "./ChartItem";
// import {update} from 'chart.js'
const toSeconds = (str) => {
  const timeArr = str.split(":");
  let seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];
  return seconds;
};

const Chart = () => {
  const { searchQueryInput } = useContext(MyContext);

  // const [workouts, setWorkouts] = useState([]);

  const [outcomeInput, setOutcomeInput] = useState("average");
  // const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const [dateInput, setDateInput] = useState({
    from: "2020-01-01",
    to: new Date().toISOString().substring(0, 10),
  });
  const [labels, setLabels] = useState([]);
  const [dataset1, setDataset] = useState([]);
  const [dataset2, setDataset2] = useState([]);

  const [myTypes, setMyTypes] = useState([]);
  const [typeInput, setTypeInput] = useState("");
  const [selectedType, setSelectedType] = useState({});

  useEffect(() => {
    async function initializeTypes() {
      let res = await axios.get("/api/types/getall");
      setMyTypes(res.data.types);
      setTypeInput(res.data.types[0].name);
    }
    initializeTypes();
  }, []);


  useEffect(() => {
    async function getTypeObj() {
      const res = await axios.get(`/api/types/getonebyname?name=${typeInput}`);
      setSelectedType(res.data.type);
    }
    typeInput && getTypeObj();
  }, [typeInput]);

  useEffect(() => {
    searchQueryInput && setTypeInput(searchQueryInput)
  }, [searchQueryInput])

  useEffect(() => {
    async function getWorkouts() {
      const res = await axios.get(
        `/api/workouts/chart?searchquery=${
          searchQueryInput ? searchQueryInput : selectedType.name
        }&from=${dateInput.from}&to=${dateInput.to}`
      );
      // setWorkouts(res.data);
      setData(res.data)
    }
    (searchQueryInput || Object.keys(selectedType).length !== 0) && getWorkouts();
  }, [selectedType]);


  function setData(workouts) {
    const dataLabels = [];
    const dataset1 = [];
    const dataset2 = [];
    workouts.forEach((ele, i) => {
      dataLabels.push(format(parseISO(workouts[i].date), "MMM dd, yyyy"));
      if (selectedType.category === "weights") {
        dataset1.push(workouts[i].data.weights);

        if (outcomeInput === "average") {
          const acc = workouts[i].data.sets.reduce((acc, ele) => acc + ele);
          dataset2.push(acc / workouts[i].data.sets.length);
        }
        if (outcomeInput === "highest") {
          const highest = workouts[i].data.sets.reduce((acc, ele) => (acc < ele ? ele : acc));
          dataset2.push(highest);
        }
        if (outcomeInput === "lowest") {
          const lowest = workouts[i].data.sets.reduce((acc, ele) => (acc > ele ? ele : acc));
          dataset2.push(lowest);
        }
      }
      if (selectedType.category === "bodyweight") {
        if (outcomeInput === "average") {
          const acc = workouts[i].data.sets.reduce((acc, ele) => acc + ele);
          dataset2.push(acc / workouts[i].data.sets.length);
        }
        if (outcomeInput === "highest") {
          const highest = workouts[i].data.sets.reduce((acc, ele) => (acc < ele ? ele : acc));
          dataset2.push(highest);
        }
        if (outcomeInput === "lowest") {
          const lowest = workouts[i].data.sets.reduce((acc, ele) => (acc > ele ? ele : acc));
          dataset2.push(lowest);
        }
      }
      if (selectedType.category === "distance") {
        dataset1.push(workouts[i].data.distance);
        if (outcomeInput === "average") {
          const avgSeconds = workouts[i].data.rounds.reduce((acc, ele) => {
            let seconds = toSeconds(ele);
            return acc + seconds;
          }, 0);
          dataset2.push(avgSeconds / workouts[i].data.rounds.length / 60);
        }
        if (outcomeInput === "highest") {
          const highestSeconds = workouts[i].data.rounds.reduce((acc, ele) => {
            let seconds = toSeconds(ele);
            return seconds < acc ? acc : seconds;
          }, 0);

          dataset2.push(highestSeconds / 60);
        }
        if (outcomeInput === "lowest") {
          const lowestSeconds = workouts[i].data.rounds.reduce((acc, ele) => {
            const timeArr = ele.split(":");
            let seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];
            return seconds > acc ? acc : seconds;
          }, toSeconds(workouts[i].data.rounds[0]));

          dataset2.push(lowestSeconds / 60);
        }
      }
    });
    setLabels(() => [...dataLabels]);
    setDataset(() => [...dataset1]);
    setDataset2(() => [...dataset2]);
  }

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

  // useEffect(() => {
  //   filterData();
  //   if (workouts.length) {
  //     // Set from input field to first date of workout matching typeFilterInput
  //     const firstDate = workouts.find((ele) => ele._type.category === typeFilterInput)
  //     setDateInput({
  //       ...dateInput,
  //       from: firstDate.date.slice(0, 10),
  //     });
  //   }
  // }, [workouts]);

  return (
    <div className="chart-main">
      <label htmlFor="from">From</label>
      <input id="from" type="date" value={dateInput.from} onChange={handleChange} />
      <label htmlFor="to">To</label>
      <input id="to" type="date" value={dateInput.to} onChange={handleChange} />
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
      <button onClick={setData}>Filter</button>
      <div className="chart-container">
        <div className="chart-wrapper">
          <ChartItem
            labels={labels}
            dataset1={dataset1}
            dataset2={dataset2}
            category={selectedType}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
