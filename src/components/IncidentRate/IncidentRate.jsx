import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line } from "react-chartjs-2";
import styles from "./IncidentRate.module.css";

const IncidentRate = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  console.log(dailyData);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map((data) => (data.deaths / data.confirmed) * 100),
            label: "Global Death Rate",
            borderColor: "rgb(0,0,0)",
            backgroundColor: "rgba(81,90,90,0.1)",
            fill: true,
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
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default IncidentRate;
