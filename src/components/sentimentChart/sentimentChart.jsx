import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./sentimentChart.module.css";

const sentimentChart = () => {
  var fetcheddata = require("../../info/data.json");
  console.log(fetcheddata.data);

  const lineChart = fetcheddata.data.length ? (
    <Line
      data={{
        labels: fetcheddata.data.map((d) => d.date),
        datasets: [
          {
            data: fetcheddata.data.map((d) => d.positive),
            label: "Positive",
            borderColor: "rgb(160, 255, 75)",
            backgroundColor: "rgba(160, 255, 75, 0.5)",
            fill: true,
          },
          {
            data: fetcheddata.data.map((d) => d.negative),
            label: "Negative",
            borderColor: "rgb(252,32,3)",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: fetcheddata.data.map((d) => d.neutral),
            label: "Neutral",
            borderColor: "rgb(250, 181, 5)",
            backgroundColor: "rgba(250, 181, 5, 0.2)",
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: "Change in Sentiment of people as the time passes",
          fontSize: 20,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "percentage",
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default sentimentChart;
