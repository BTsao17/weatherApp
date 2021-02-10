import React, { useState, useEffect } from 'react';
import './App.css';
import { weather_KEY } from './keys';

function convertDate(date, options) {
  return new Date(date * 1000).toLocaleString('en-US', options);
}

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
          {forecast.map((info, i) => {
            const { daily, current } = info;
            return (
              <Card key={i}>
                <Location />
                <CurrentForecast today={daily[0]} current={current} />
                <WeekForecast daily={daily} />
              </Card>
            );
          })}
        </section>
      </main>
    </div>
  );
}

function Card({ children }) {
  return <div className='card'>{children}</div>;
}

function Location() {
  return <h3 className='location'>Richmond, BC - hardcoded for now</h3>;
}

function CurrentForecast({ today, current }) {
  const currentTime = convertDate(current.dt, {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <div className='currentContainer'>
      <p className='currentTime'>{currentTime} aka Today</p>
      <section className='temperatureContainer'>
        <div className='dayNightTemp'>
          <p>Day {Math.round(today.temp.day)}&deg;</p>
          <p>Night {Math.round(today.temp.night)}&deg;</p>
        </div>
        <p className='currentTemp'>{Math.round(current.temp)}&deg;C</p>
        <p className='feelsLike'>Feels like {Math.round(current.feels_like)}&deg;</p>
      </section>
      <figure className='weatherContainer'>
        <img
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt='current weather'
          className='weatherImg'
        />
        <figcaption className='weatherImgCaption'>{current.weather[0].description}</figcaption>
      </figure>
      <p>Show Hourly Forecast - Button</p>
    </div>
  );
}

function WeekForecast({ daily }) {
  return (
    <div className='weekContainer'>
      <h4>7 days</h4>
      {daily.map((day, i) => {
        const { temp, weather } = day;
        const dateOfForecast = convertDate(day.dt, { weekday: 'short', month: 'short', day: 'numeric' });
        return (
          <div key={i}>
            <p>{dateOfForecast}</p>
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt='current weather' />
            <div>
              <p>{Math.round(temp.max)}&deg;C</p>
              <p>{Math.round(temp.min)}&deg;C</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
