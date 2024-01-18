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
import { Scatter } from "react-chartjs-2";
import { TemperatureAPI } from '../chart/temperature-create-chart';
import { HumidityAPI } from '../chart/humidity-create-chart';
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


export const TemperatureHumidityCreateScattergram = () => {
  const [temperatureData, setTemperatureData] = useState(null);
  const [humidityData, setHumidityData] = useState(null);

  useEffect(()=> {
    axios.get(TemperatureAPI).then((response) => {
      setTemperatureData(response.data);
    });
    axios.get(HumidityAPI).then((response) => {
      setHumidityData(response.data);
    });
  }, []);
  if (!temperatureData) return null;
  if (!humidityData) return null;

  const CreateTemperatureDataArray = CreateDataArray(temperatureData);
  const TemperatureData = CreateTemperatureDataArray.map(data => data.temperature);
  const CreateHumidityDataArray = CreateDataArray(humidityData);
  const HumidityData = CreateHumidityDataArray.map(data => data.humidity);

  const ScatterData = TemperatureData.map((temperatureData, index) => 
    (
      {
         x: temperatureData, y: HumidityData[index]
      }
    )
  );

  // 回帰直線の傾きと切片を求める
  let sx = 0;
  let sy = 0;
  let sxy = 0;
  let sxsq = 0;

  ScatterData.forEach(function(data) {
    sx += data.x;
    sy += data.y;
    sxy += data.x * data.y;
    sxsq += Math.pow(data.x,2);
  });

  let xAxis = sx/ScatterData.length;
  let yAxis = sy/ScatterData.length;
  // 傾き
  let beta  = ((ScatterData.length * sxy) - (sx * sy))/((ScatterData.length * sxsq)-(Math.pow(sx,2))); 
  // 切片
  let alpha = yAxis - (beta * xAxis); 


  // // 回帰式より、回帰直線描画用データを作成
  const regressionLinePlot = [];
  ScatterData.forEach(function(data) {
    regressionLinePlot.push({'x': data.x, 'y': alpha + beta * data.x});
  });

  const data = {
    datasets: [
      {
        // 散布図
        type: 'scatter',
        label: '気温と湿度',
        data: ScatterData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      { 
        // 回帰直線
        type: 'scatter',
        label: '回帰直線',
        data: regressionLinePlot,              // 始点と終点のデータ（座標）
        borderColor : 'rgba(20,100,20,1)',     // 線の色
        backgroundColor: 'rgba(70,100,70,1)',  // 凡例の背景色
        borderWidth : 2,                       // 線幅
        pointRadius: 0.5,                      // 点の形状の半径（0にすると点を描画しない）
        tension: 0,                            // 線を直線にする
        showLine: true,                        // 線を描画
        fill: false                            // 線とＸ軸で囲まれた範囲の描画
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: '気温',
        }
      },
      y: {
        title: {
          display: true,
          text: '湿度',
        }
      },
    }
  }

  return (
    <>
      <Scatter data={data} options={options}/>
    </>
    
  )
}
