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
import { CreateDataArray } from '../../utils/create-data-array';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TemperatureAPI = "/monitoring_data/temperature";

export const TemperatureCreateChart = () => {
  const [temperatureData, setTemperatureData] = useState(null);
  useEffect(()=> {
    axios.get(TemperatureAPI).then((response) => {
      setTemperatureData(response.data);
    });
  }, []);
  if (!temperatureData) return null;

  const TemperatureDataArray = CreateDataArray(temperatureData);
  const TemperatureDataRecordedAtData = TemperatureDataArray.map(data => data.recorded_at);
  const TemperatureData = TemperatureDataArray.map(data => data.temperature);

  const data = {
    labels: TemperatureDataRecordedAtData,
    datasets: [
      {
        label: '気温',
        data: TemperatureData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
    <Line data={data} />
    </>
    
  )
}
