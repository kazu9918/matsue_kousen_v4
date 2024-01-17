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

export const LuxAPI = "/monitoring_data/lux";

export const LuxCreateChart = () => {
  const [luxData, setLuxData] = useState(null);
  useEffect(()=> {
    axios.get(LuxAPI).then((response) => {
      setLuxData(response.data);
    });
  }, []);
  if (!luxData) return null;

  const CreateLuxDataArray = CreateDataArray(luxData);
  const LuxDataRecordedAtData = CreateLuxDataArray.map(data => data.recorded_at);
  const LuxData = CreateLuxDataArray.map(data => data.lux);

  const data = {
    labels: LuxDataRecordedAtData,
    datasets: [
      {
        label: '光度',
        data: LuxData,
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
