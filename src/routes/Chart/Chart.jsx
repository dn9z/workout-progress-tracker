import "./Chart.scss";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../components/context/Context";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// ChartJS.register()

const createDateObj = (dateISOStr) => {
  const temp = new Date(
    dateISOStr.slice(0, 4),
    dateISOStr.slice(5, 7) - 1,
    dateISOStr.slice(8, 10)
  );
  return temp;
};

const Chart = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { entries } = useContext(MyContext);
  const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const [dateInput, setDateInput] = useState({
    from: entries[0].date.toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  });
  const formatData = () => {
    const filteredData = entries.filter((ele) => {
      return ele.type.category === typeFilterInput;
    });
    const labels = [];
    const dataset1 = [];
    const dataset2 = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (
        filteredData[i].date.getTime() >
          createDateObj(dateInput.from).getTime() &&
        filteredData[i].date.getTime() < createDateObj(dateInput.to).getTime()
      ) {
        labels.push(filteredData[i].date.toISOString().substring(0, 10));

        if (typeFilterInput === "weights") {
          dataset1.push(filteredData[i].data.weights);
          let acc = 0;
          for (let j = 0; j < filteredData[i].data.sets.length; j++) {
            acc += filteredData[i].data.sets[j];
          }
          dataset2.push(acc / filteredData[i].data.sets.length);
        } else if(typeFilterInput === "bodyweight"){
          let acc = 0;
          for (let j = 0; j < filteredData[i].data.sets.length; j++) {
            acc += filteredData[i].data.sets[j];
          }
          dataset2.push(acc / filteredData[i].data.sets.length);
        } else if(typeFilterInput === "distance"){
          dataset1.push(filteredData[i].data.distance);
          let acc = 0;
          for (let j = 0; j < filteredData[i].data.rounds.length; j++) {
            acc += filteredData[i].data.rounds[j];
          }
          dataset2.push(acc / filteredData[i].data.rounds.length);
        }
      }
    }

    const clone = {
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
        <option value="weights">weights</option>
        <option value="bodyweight">Bodyweight</option>
        <option value="distance">Distance</option>
      </select>

      <div className="chart-container">
        {formatedChartData.labels.length ? (
          <div className="chart-wrapper">
            <Line data={formatedChartData} redraw={true} options={options} />
          </div>
        ) : (
          "Sorry, no data found!"
        )}
      </div>
    </div>
  );
};

export default Chart;
