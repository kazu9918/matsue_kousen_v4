import React from 'react';
import { CreateChart } from '../../packs/utils/chart/create-chart';


export const TemperatureChart = () => {
  const baseURL = "/monitoring_data/temperature";

  return (
    <CreateChart baseURL={baseURL} labelName={'気温'}/>
  )
}
