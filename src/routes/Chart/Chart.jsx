import "./Chart.scss";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../components/context/Context";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Chart = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { entries } = useContext(MyContext);
  // console.log(entries[0].date.toLocaleString().slice(0,9));

  const formatData = () => {
    const labels = [];
    const weightData = [];
    for (let i = 0; i < entries.length; i++) {
      labels.push(entries[i].date.toLocaleString().slice(0, 9));
      weightData.push(entries[i].data.weights);
    }
    // console.log(weightData)

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
  }, []);

  return (
    <div className="chart-container">
      {formatedChartData.labels.length ? (
        <div className="actual-chart-container">
          <Line
            data={formatedChartData}
            redraw={true}
            option={{}}
          />
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
  );
};

export default Chart;
