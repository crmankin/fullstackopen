import { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState({});

  const loadWeatherData = () => {
    const api_key = process.env.REACT_APP_API_KEY;

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: lat,
          lon: lon,
          units: "imperial",
          appid: api_key
        }
      })
      .then((result) => setWeatherData(result.data));
  };
  useEffect(loadWeatherData, [lat, lon]);

  if (weatherData.weather) {
    return (
      <table className="weather-info">
        <tbody>
          <tr>
            <td rowSpan="3"><img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" width="100" /></td>
            <td>Weather</td>
            <td>{weatherData.weather[0].description}</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>
              {Math.round(weatherData.main.temp, 0)} &deg;F, feels like&nbsp;
              {Math.round(weatherData.main.feels_like, 0)} &deg;F
            </td>
          </tr>
          <tr>
            <td>Wind</td>
            <td>
              {Math.round(weatherData.wind.speed, 0)} mph at {weatherData.wind.deg}&deg;
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return <div className="weather-info">Loading weather...</div>;
  }
};

export default WeatherInfo;
