import React, { useState, useEffect } from 'react';
import './App.css';
import { weather_KEY } from './keys';

function App() {
  const [ location, setLocation ] = useState({ lat: '49.163168', lon: '123.13741' });
  const [ forecast, setForecast ] = useState([]);

  useEffect(
    () => {
      const { lat, lon } = location;
      fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=-${lon}&units=metric&exclude=minutely,hourly,alerts&APPID=${weather_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setForecast([data]);
        });
    },
    [ location ] //only re-run this effect if location changes
  );

  console.log(forecast);

  return (
    <div>
      <h1>Weather Forecast</h1>
      <main>
        <section>
          <p>search bar</p>
        </section>
        <section>
          <h3>Richmond, BC</h3>
          <section>
            <p>Currently:</p>
          </section>
          <p>days of week</p>
        </section>
      </main>
    </div>
  );
}

export default App;
