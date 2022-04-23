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
  // console.log(entries[0].date.toLocaleString().slice(0,9));
  const [input, setInput] = useState({
    from: "",
    to: new Date().toISOString().substring(0, 10),
  });

  const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const formatData = () => {
    // console.log(createDateObj(input.from).getTime())
    // console.log(createDateObj(input.to).getTime())

    const labels = [];
    const dataset1 = [];
    const dataset2 = [];

    const filteredClone = entries.filter((ele) => {
      return ele.type.category === typeFilterInput;
    });
    console.log(filteredClone);
    for (let i = 0; i < filteredClone.length; i++) {
      if (input.from && input.to) {
        if (
          filteredClone[i].date.getTime() >
            createDateObj(input.from).getTime() &&
          filteredClone[i].date.getTime() < createDateObj(input.to).getTime()
        ) {
          labels.push(filteredClone[i].date.toLocaleString().slice(0, 9));
          if (typeFilterInput === "weights")
            dataset1.push(filteredClone[i].data.weights);
          if (typeFilterInput === "weights")
            dataset2.push(filteredClone[i].data.sets);
          if (typeFilterInput === "bodyweight")
            dataset1.push(filteredClone[i].data.sets);
          if (typeFilterInput === "distance")
            dataset1.push(filteredClone[i].data.distance);
        }
      } else {
        labels.push(filteredClone[i].date.toLocaleString().slice(0, 9));
        if (typeFilterInput === "weights")
          dataset1.push(filteredClone[i].data.sets);
        if (typeFilterInput === "weights")
          dataset2.push(filteredClone[i].data.weights);
        if (typeFilterInput === "bodyweight")
          dataset1.push(filteredClone[i].data.sets);
        if (typeFilterInput === "distance")
          dataset1.push(filteredClone[i].data.distance);
      }
    }
    console.log(dataset1);
    return {
      labels: labels,
      datasets: [
        {
          label: "Weights",
          data: dataset1,
          yAxisID:'y1',
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
          yAxisID:'y2',
          type:'bar',
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
  };
  const [formatedChartData, setFormatedChartData] = useState(formatData());

  useEffect(() => {
    setFormatedChartData(formatData());
  }, [input, typeFilterInput]);

  function handleChange(e) {
    if (e.target.id === "from") {
      setInput({
        ...input,
        [e.target.id]: e.target.value,
      });
    } else if (e.target.id === "to") {
      setInput({
        ...input,
        [e.target.id]: e.target.value,
      });
    }
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  return (
    <div className="chart-main">
      <label htmlFor="from">From</label>
      <input id="from" type="date" value={input.from} onChange={handleChange} />
      <label htmlFor="to">To</label>
      <input id="to" type="date" value={input.to} onChange={handleChange} />
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
