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

export const HumidityAPI = "/monitoring_data/humidity";

export const HumidityCreateChart = () => {
  const [humidityData, setHumidityData] = useState(null);
  useEffect(()=> {
    axios.get(HumidityAPI).then((response) => {
      setHumidityData(response.data);
    });
  }, []);
  if (!humidityData) return null;

  const CreateHumidityDataArray = CreateDataArray(humidityData);
  const HumidityDataRecordedAtData = CreateHumidityDataArray.map(data => data.recorded_at);
  const HumidityData = CreateHumidityDataArray.map(data => data.humidity);

  const data = {
    labels: HumidityDataRecordedAtData,
    datasets: [
      {
        label: '湿度',
        data: HumidityData,
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
