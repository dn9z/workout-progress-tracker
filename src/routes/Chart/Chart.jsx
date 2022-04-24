import "./Chart.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../components/context/Context";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// ChartJS.register()

const createDateObj = (dateISOStr) => {
  const temp = new Date(dateISOStr);
  // console.log(temp.getTime())
  return temp;
};

const Chart = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { entries } = useContext(MyContext);
  const [typeFilterInput, setTypeFilterInput] = useState("weights");

  const [filteredEntries, setFilteredEntries] = useState(() => {
    const clone = entries.filter((ele) => {
      return ele.type.category === typeFilterInput;
    });
    return clone;
  });

  const [dateInput, setDateInput] = useState({
    from: filteredEntries[0].date.toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  });

  const chartRef = useRef()

  const formatData = () => {
    //   console.log('run')
    const labels = [];
    const dataset1 = [];
    const dataset2 = [];
    for (let i = 0; i < filteredEntries.length; i++) {
      const from = Date.parse(dateInput.from);
      const to = Date.parse(dateInput.to);
      if (
        // true
        //something is wrong with here
        filteredEntries[i].date.getTime() >= from &&
        filteredEntries[i].date.getTime() <= to
      ) {
        labels.push(filteredEntries[i].date.toISOString().substring(0, 10));

        if (typeFilterInput === "weights") {
          dataset1.push(filteredEntries[i].data.weights);
          let acc = 0;
          for (let j = 0; j < filteredEntries[i].data.sets.length; j++) {
            console.log(filteredEntries[i].data.sets.length);
            acc += filteredEntries[i].data.sets[j];
          }
          dataset2.push(acc / filteredEntries[i].data.sets.length);
        } else if (typeFilterInput === "bodyweight") {
          let acc = 0;
          for (let j = 0; j < filteredEntries[i].data.sets.length; j++) {
            acc += filteredEntries[i].data.sets[j];
          }
          dataset2.push(acc / filteredEntries[i].data.sets.length);
        } else if (typeFilterInput === "distance") {
          dataset1.push(filteredEntries[i].data.distance);
          let acc = 0;
          for (let j = 0; j < filteredEntries[i].data.rounds.length; j++) {
            acc += filteredEntries[i].data.rounds[j];
          }
          dataset2.push(acc / filteredEntries[i].data.rounds.length);
        }
      }
    }
    let clone = {};
    if (typeFilterInput === "weights") {
      clone = {
        ...formatedChartData,
        labels: labels,
        datasets: [
          {
            label: "Weights",
            data: dataset1,
            yAxisID: "y1",
            borderWidth: 3,
            fill: false,
            backgroundColor: "#3ABEFF",
            borderColor: "#3ABEFF",
            pointRadius: 0,
            pointHoverRadius: 0,
            lineTension: 0.05,
          },
          {
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
      };
    } else if (typeFilterInput === "bodyweight") {
      clone = {
        ...formatedChartData,
        labels: labels,
        datasets: [
          {
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
      };
    } else if (typeFilterInput === "distance") {
      clone = {
        ...formatedChartData,
        labels: labels,
        datasets: [
          {
            label: "Distance",
            data: dataset1,
            yAxisID: "y1",
            borderWidth: 3,
            fill: false,
            backgroundColor: "#3ABEFF",
            borderColor: "#3ABEFF",
            pointRadius: 0,
            pointHoverRadius: 0,
            lineTension: 0.05,
          },
          {
            label: "Rounds",
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
      };
    }

    return clone;
  };
  const [formatedChartData, setFormatedChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Weights",
        data: [],
        yAxisID: "y1",
        borderWidth: 3,
        fill: false,
        backgroundColor: "#3ABEFF",
        borderColor: "#3ABEFF",
        pointRadius: 0,
        pointHoverRadius: 0,
        lineTension: 0.05,
      },
      {
        label: "Sets",
        data: [],
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
  });

  useEffect(() => {
    setFormatedChartData(formatData());
    setFilteredEntries(() => {
      const clone = entries.filter((ele) => {
        return ele.type.category === typeFilterInput;
      });
      return clone;
    });
  }, [dateInput, typeFilterInput]);

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

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
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
  };
  return (
    <div className="chart-main">
      <label htmlFor="from">From</label>
      <input
        id="from"
        type="date"
        value={dateInput.from}
        onChange={handleChange}
      />
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

      <div className="chart-container">
        {formatedChartData.labels.length ? (
          <div className="chart-wrapper">
            <Line ref={chartRef} data={formatedChartData} redraw={true} options={options} />
          </div>
        ) : (
          "Sorry, no data found!"
        )}
      </div>
    </div>
  );
};

export default Chart;
