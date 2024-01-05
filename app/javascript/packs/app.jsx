import React, { useState } from 'react';
import { Temperature } from './pages/temperature';
import { Lux } from './pages/lux';
import { Humidity } from './pages/humidity';
import { TemperatureHumidityCreateScattergram } from './components/scattergram/temperature-humidity-create-scattergram';

export const App = () => {
  const [currentComponent, setCurrentComponent] = useState('temperature');
  const handleButtonClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleButtonClick('temperature')}>気温</button>
        <button onClick={() => handleButtonClick('lux')}>光度</button>
        <button onClick={() => handleButtonClick('humidity')}>湿度</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('temperature-humidity-scattergram')}>気温と湿度の散布図</button>
      </div>
      {currentComponent === 'temperature' && <Temperature />}
      {currentComponent === 'lux' && <Lux />}
      {currentComponent === 'humidity' && <Humidity />}
      {currentComponent === 'temperature-humidity-scattergram' && <TemperatureHumidityCreateScattergram />}
    </div>
  )
}
