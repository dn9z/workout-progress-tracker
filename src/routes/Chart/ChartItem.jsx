import React from 'react'
import { Line, Bar } from "react-chartjs-2";

const ChartItem = ({labels,dataset1,dataset2}) => {
  return (
    <>
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
                  display: dataset1.length, // display only if dataset 1 exists
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
    </>
  )
}

export default ChartItem