import React from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "./sentimentChart.module.css";

const sentimentChartPie = () => {
  var fetcheddata = require("../../info/data.json");
  console.log(fetcheddata.data);

  var pos = 0;
  var neg = 0;
  var nut = 0;
  var size = 0;
  for (size = 0; size < fetcheddata.data.length; size++) {
    pos += fetcheddata.data[size].positive;
    neg += fetcheddata.data[size].negative;
    nut += fetcheddata.data[size].neutral;
  }
  console.log(pos / size, neg / size, nut / size);

  const pieChart = fetcheddata.data.length ? (
    <Doughnut
      data={{
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
          {
            label: "Rainfall",
            backgroundColor: [
              "rgb(160, 255, 75)",
              "rgb(252,32,3)",
              "rgb(250, 181, 5)",
            ],
            hoverBackgroundColor: [
              "rgba(160, 255, 75,0.5)",
              "rgba(252,32,3,0.5)",
              "rgba(250, 181, 5,0.5)",
            ],
            data: [pos / size, neg / size, nut / size],
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: "Sentiment of People during the time of COVID-19",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "bottom",
        },
      }}
    />
  ) : null;

  return <div className={styles.container}>{pieChart}</div>;
};

export default sentimentChartPie;
