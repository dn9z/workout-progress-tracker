import React from "react";
import { Chart, registerables } from "chart.js";

import { Line } from "react-chartjs-2";
import chartZoom from "chartjs-plugin-zoom";
import 'chartjs-adapter-date-fns';

const ChartItem = ({ labels, dataset1, dataset2 }) => {
  Chart.register(...registerables, chartZoom);
  return (
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
        maintainAspectRatio: false,

        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,

        plugins: {
          // title: {
          //   display: true,
          //   text: "Chart.js Line Chart - Multi Axisss",
          // },
          zoom: {
            zoom: {
              wheel: {
                enabled: true, // SET SCROOL ZOOM TO TRUE
              },
              mode: "x",
              speed: 100,
            },
            pan: {
              enabled: true,
              mode: "x",
            },
          },
          tooltip: {
            callbacks: {
              label: (item) => {
                if (item.datasetIndex === 1) return `${item.dataset.label}: ${item.formattedValue}`;
                if (item.datasetIndex === 0)
                  return `${item.dataset.label}: ${item.formattedValue} Kg`;
              },
            },
          },
        },
        scales: {
          y1: {
            type: "linear",
            display: dataset1.length, // display only if dataset 1 exists
            position: "left",
            // suggestedMax: 100,
            // position: "left",
            // beginAtZero: true,
          },
          y2: {
            type: "linear",
            display: true,
            position: "right",
          },
          xAxis: {
            // type: "time",
            // time: {
            //   unit: "day",
            // },
            max: 10,
            // position: "bottom",
            // ticks: {
            //   align: "center",
            //   autoSkip: false,
            // },
          },
        },
      }}
      // width={900}
      // height={450}
    />
  );
};

export default ChartItem;
