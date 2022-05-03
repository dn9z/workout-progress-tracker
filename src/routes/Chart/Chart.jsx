import "./Chart.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../components/context/Context";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { format } from "date-fns";

const toSeconds = (str) => {
  const timeArr = str.split(":");
  let seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];
  return seconds;
};

const getData = async () => {};

const Chart = () => {
  // const { entries } = useContext(MyContext);
  const [workouts, setWorkouts] = useState(getData());

  const [outcomeInput, setOutcomeInput] = useState("average");
  const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const [dateInput, setDateInput] = useState({
    // from: workouts[0].date.substring(0, 10),
    // from: workouts[0].date.toISOString().substring(0, 10),
    from: "2020-01-01",
    to: new Date().toISOString().substring(0, 10),
  });
  // const [chartData, setChartData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "",
  //       data: [],
  //     },
  //   ],
  // });
  const [labels, setLabels] = useState([]);
  const [dataset1, setDataset] = useState([]);
  const [dataset2, setDataset2] = useState([]);

  const filterData = () => {
    const filteredLabels = [];
    const filteredDataset1 = [];
    const filteredDataset2 = [];
    for (let i = 0; i < workouts.length; i++) {
      if (
        new Date(workouts[i].date) > new Date(dateInput.from) &&
        new Date(workouts[i].date) < new Date(dateInput.to) &&
        workouts[i].type.category === typeFilterInput
      ) {
        filteredLabels.push(workouts[i].date.slice(0, 10));
        filteredDataset1.push(workouts[i].data.weights);
        const acc = workouts[i].data.sets.reduce(
          (acc, ele) => acc + ele
        );
        filteredDataset2.push(acc / workouts[i].data.sets.length);

      }
    }
    setLabels(filteredLabels);
    setDataset(filteredDataset1);
    setDataset2(filteredDataset2)
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

                  // const sorted = res.data.sort((a, b) => {
        //   return new Date(a.date) - new Date(b.date);
        // });
        // return sorted;
        setWorkouts(res.data);
        };
      })

      .catch((error) => {
        console.warn("There was an error", error);
      });
    // console.log(res.data)
  }, []);

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
          
            <Line
              // data={chartData}
              redraw={true}
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "Weights",
                    data: dataset1,
                    yAxisID: "y1",
                    // type: "bar",

                    borderWidth: 3,
                    fill: false,
                    backgroundColor: "#3ABEFF",
                    borderColor: "#3ABEFF",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    lineTension: 0.05,
                  },
                  dataset2.length && {
                    label: "Sets",
                    data: dataset2,
                    yAxisID: "y2",
                    type: "bar",
                    borderWidth: 3,
                    fill: false,
                    backgroundColor: "#df5858",
                    borderColor: "#df5858",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    lineTension: 0.05,
                  },
                ],
              }}
              options={{
                responsive: true,
                interaction: {
                  mode: "index",
                  intersect: false,
                },
                stacked: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Chart.js Line Chart - Multi Axisss",
                  },
                },
                scales: {
                  y1: {
                    type: "linear",
                    display: true,
                    position: "left",
                  },
                  y2: {
                    type: "linear",
                    display: true,
                    position: "right",
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                },
              }}
            />
          
        </div>
      </div>
    </div>
  );
};

export default Chart;
