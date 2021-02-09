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
          setForecast([ data ]);
        });
    },
    [ location ] //only re-run this effect if location changes. If not explicitly stated, will loop as setting state causes rendering.
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
          {/* Current Forecast - Will become own functional component later*/}
          {forecast.map((place, i) => {
            function convertDate(date, options) {
              return new Date(date * 1000).toLocaleString('en-US', options);
            }

            const { current, daily } = place;
            const currentTime = convertDate(current.dt, {
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            });
            return (
              <div key={i}>
                <h3>Richmond, BC hardcoded for now</h3>
                <p>{currentTime}</p>
                <p>Day Temp: {daily[0].temp.day}&deg;C</p>
                <p>Night Temp: {daily[0].temp.night}&deg;C</p>
                <p> Current Temp: {current.temp}&deg;C</p>
                <p> Feels Like: {current.feels_like}&deg;C</p>
                <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt='current weather image' />
                <p> Weather Description: {current.weather[0].description}</p>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
