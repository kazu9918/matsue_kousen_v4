import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const CreateChart = ({ baseURL, labelName }) => {
  const [monitoringData, setMonitoringData] = useState(null);
  useEffect(()=> {
    axios.get(baseURL).then((response) => {
      setMonitoringData(response.data);
    });
  }, []);
  if (!monitoringData) return null;

  const CreateMonitoringDataArray = Object.entries(monitoringData)
  .map((data) => data[1])
  .sort((previousData, rawData) => (previousData.recorded_at < rawData.recorded_at ? -1 : 1));
  const MonitoringDataRecordedAtData = CreateMonitoringDataArray.map(data => data.recorded_at);
  const MonitoringData = CreateMonitoringDataArray.map(data => data.temperature);

  const data = {
    labels: MonitoringDataRecordedAtData,
    datasets: [
      {
        label: labelName,
        data: MonitoringData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Line data={data} />
  )
}
