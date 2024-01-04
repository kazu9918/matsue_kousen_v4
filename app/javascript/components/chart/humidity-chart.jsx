import React from 'react';
import { CreateChart } from '../../../utils/chart/create-chart';


export const HumidityChart = () => {
  const baseURL = "/monitoring_data/humidity";

  return (
    <CreateChart baseURL={baseURL} labelName={'湿度'}/>
  )
}
