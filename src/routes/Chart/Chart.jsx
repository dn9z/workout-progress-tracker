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
  const { searchQueryInput } = useContext(MyContext);

  const [workouts, setWorkouts] = useState([]);

  const [outcomeInput, setOutcomeInput] = useState("average");
  // const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const [dateInput, setDateInput] = useState({
    from: "2020-01-01",
    to: new Date().toISOString().substring(0, 10),
  });
  const [labels, setLabels] = useState([]);
  const [dataset1, setDataset] = useState([]);
  const [dataset2, setDataset2] = useState([]);


  useEffect(() => {
    setWorkouts([])
    getData()
  }, [searchQueryInput])

 async function getData(){
   try {
      const res = await axios.get(`/api/workouts/paginate?searchquery=${searchQueryInput}&from=${dateInput.from}&to=${dateInput.to}`) 
      setWorkouts(res.data)
    } catch (e) {
      console.log(e)
    }
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
  //   axios
  //     .get(`/api/workouts/chart?searchquery`)
  //     .then((res) => {
  //       if (res) {
  //         const sorted = res.data.sort((a,b) => {
  //           return new Date(a.date) - new Date(b.date)
  //         })
  //         setWorkouts(sorted);
  //       }
  //     })
  //     .catch((error) => {
  //       console.warn("There was an error", error);
  //     });
  // }, []);

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
      {/* <button onClick={filterData}>Filter</button> */}
      <div className="chart-container">
        <div className="chart-wrapper">
          <ChartItem labels={labels} dataset1={dataset1} dataset2={dataset2} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
