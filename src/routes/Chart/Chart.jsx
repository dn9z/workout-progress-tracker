import "./Chart.scss";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../components/context/Context";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
    to: "",
  });

 
  const formatData = () => {
    // console.log(createDateObj(input.from).getTime())
    // console.log(createDateObj(input.to).getTime())

    const labels = [];
    const weightData = [];
    for (let i = 0; i < entries.length; i++) {
      if (input.from && input.to) {
        // console.log(createDateObj(input.from))
        if (
          entries[i].date.getTime() > createDateObj(input.from).getTime() &&
          entries[i].date.getTime() < createDateObj(input.to).getTime()
        ) {
          labels.push(entries[i].date.toLocaleString().slice(0, 9));
          weightData.push(entries[i].data.weights);
        }
      }else{
        labels.push(entries[i].date.toLocaleString().slice(0, 9));
        weightData.push(entries[i].data.weights);

      }
    }
    return {
      labels: labels,
      datasets: [
        {
          label: "Date",
          data: weightData,
          borderWidth: 3,
          fill: false,
          backgroundColor: "green",
          borderColor: "#3ABEFF",
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
  }, [input]);

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
  return (
    <div className="chart-main">
      <label htmlFor="from">From</label>
      <input id="from" type="date" value={input.from} onChange={handleChange} />
      <label htmlFor="to">To</label>
      <input id="to" type="date" value={input.to} onChange={handleChange} />
      <label htmlFor="type">Type</label>
      <select id="type">
        <option value="weights">weights</option>
        <option value="bodyweight">Bodyweight</option>
        <option value="distance">Distance</option>
      </select>

      <div className="chart-container">
        {formatedChartData.labels.length ? (
          <div className="chart-wrapper">
            <Line data={formatedChartData} redraw={true} option={{}} />
          </div>
        ) : (
          "Sorry, no data found!"
        )}

        <button
          onClick={() => {
            navigate(`/`);
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Chart;
