import React from 'react';
import { TemperatureChart } from '../components/chart/temperature-chart';
import { Button } from '../components/button';


export const Temperature = () => {

  return (
    <>
      <Button to={'/pages/lux'} />
      <TemperatureChart />
    </>
  )
}
