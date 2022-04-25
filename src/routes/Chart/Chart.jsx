import "./Chart.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../components/context/Context";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = () => {
  const { entries } = useContext(MyContext);
  const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const [dateInput, setDateInput] = useState({
    from: '2-5-2018',
    to: new Date().toISOString().substring(0, 10),
  });
  const filterEntries = () => {
    const clone = entries.filter((ele) => {
      return ele.type.category === typeFilterInput && (ele.date.getTime() > Date.parse(dateInput.from) && ele.date.getTime() < Date.parse(dateInput.to))
    });
    return clone;
  }
  const [filteredEntries, setFilteredEntries] = useState(filterEntries());
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });


  const chart = () => {
    setChartData(() => {
      const labels = []
      const dataset1 = []
      for (let i = 0; i < filteredEntries.length; i++) {
        labels.push(filteredEntries[i].date.toISOString().slice(0,10))
        if (typeFilterInput === "weights")
        dataset1.push(filteredEntries[i].data.weights);
      if (typeFilterInput === "bodyweight")
        dataset1.push(filteredEntries[i].data.sets);
      if (typeFilterInput === "distance")
        dataset1.push(filteredEntries[i].data.distance);
      }
      return {
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
        ],
      }
    });
  };
  useEffect(() => {
    chart();
    setFilteredEntries(filterEntries())
  }, []);

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
        <div className="chart-wrapper">
          {chartData ? (
            <Line data={chartData} redraw={true} />
          ) : (
            "no data found"
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
