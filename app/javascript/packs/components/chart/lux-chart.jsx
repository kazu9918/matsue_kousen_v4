import React from 'react';
import { CreateChart } from '../../utils/chart/create-chart';


export const LuxChart = () => {
  const baseURL = "/monitoring_data/temperature";

  return (
    <CreateChart baseURL={baseURL} labelName={'光度'}/>
  )
}
