import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({
  data: { confirmed, recovered, deaths, incidentRate },
  country,
}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "rgb(231,76,60)",
            backgroundColor: "rgba(231,76,60,0.1)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "rgb(0,0,0)",
            backgroundColor: "rgba(81, 90, 90, 0.1)",
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: "Daily Upadte On COVID-19",
          fontSize: 20,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(231, 76, 60, 0.5)",
              "rgba(39, 174, 96, 0.5)",
              "rgba(81, 90, 90, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
        },
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};
export default Chart;
