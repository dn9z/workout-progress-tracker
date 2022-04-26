import "./Chart.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../components/context/Context";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = () => {
  const { entries } = useContext(MyContext);
  const [typeFilterInput, setTypeFilterInput] = useState("weights");
  const [dateInput, setDateInput] = useState({
    from: entries[0].date.toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  });
  const filterEntries = () => {
    const clone = entries.filter((ele) => {
      return (
        ele.type.category === typeFilterInput &&
        ele.date.getTime() >= Date.parse(dateInput.from) &&
        ele.date.getTime() <= Date.parse(dateInput.to)
      );
    });
    return clone;
  };
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
      const labels = [];
      const dataset1 = [];
      const dataset2 = [];
      if (typeFilterInput === "weights") {
        filteredEntries.forEach((ele, i) => {
          if (ele.type.category === "weights") {
            labels.push(filteredEntries[i].date.toISOString().slice(0, 10));
            dataset1.push(filteredEntries[i].data.weights);
            let acc = 0;
            for (let j = 0; j < filteredEntries[i].data.sets.length; j++) {
              acc += filteredEntries[i].data.sets[j];
            }
            dataset2.push(acc / filteredEntries[i].data.sets.length);
          }
        });
      }
      if (typeFilterInput === "bodyweight") {
        filteredEntries.forEach((ele, i) => {
          if (ele.type.category === "bodyweight") {
            labels.push(filteredEntries[i].date.toISOString().slice(0, 10));
            let acc = 0;
            for (let j = 0; j < filteredEntries[i].data.sets.length; j++) {
              acc += filteredEntries[i].data.sets[j];
            }
            dataset2.push(acc / filteredEntries[i].data.sets.length);
          }
        });
      }
      if (typeFilterInput === "distance") {
        filteredEntries.forEach((ele, i) => {
          if (ele.type.category === "distance") {
            labels.push(filteredEntries[i].date.toISOString().slice(0, 10));
            dataset1.push(filteredEntries[i].data.distance);
            let acc = 0;
            // console.log(timeArr)
            for (let j = 0; j < filteredEntries[i].data.rounds.length; j++) {
              const timeArr = filteredEntries[i].data.rounds[j].split(":");
              let seconds =
                +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];
              acc += seconds;
            }
            dataset2.push(acc / filteredEntries[i].data.rounds.length / 60);
          }
        });
      }

      if (typeFilterInput === "weights") {
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
        return {
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
        return {
          labels: labels,
          datasets: [
            {
              label: "Distance",
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
    });
  };

  useEffect(() => {
    chart();
  }, [filteredEntries]);

  useEffect(() => {
    setFilteredEntries(filterEntries());
    chart();
  }, [typeFilterInput, dateInput]);

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
        <div className="chart-wrapper">
          {chartData ? (
            <Line data={chartData} redraw={true} options={options} />
          ) : (
            "no data found"
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
