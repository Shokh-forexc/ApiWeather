import React, { useState } from "react";
import "./App.css";
import Cloud from "../src/assets/Clouds.webp";
import Drizzle from "../src/assets/Drizzle.webp";
import Humidity from "../src/assets/Humidity.png";
import Mist from "../src/assets/Mist.png";
import Rain from "../src/assets/Rain.png";
import Snow from "../src/assets/Snow.webp";
import Sun from "../src/assets/Sun.png";
import Wind from "../src/assets/Wind.webp";

function App() {
  const apiKey = "cc0c97793b6174fef818fc04f78c4310";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [searchBox, setSearchBox] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(Sun);
  const [error, setError] = useState(null);

  const CheckWeather = async (city) => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("Shahar topilmadi");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
      if (data.weather[0].main === "Clouds") {
        setWeatherIcon(Cloud);
      } else if (data.weather[0].main === "Clear") {
        setWeatherIcon(Sun);
      } else if (data.weather[0].main === "Rain") {
        setWeatherIcon(Rain);
      } else if (data.weather[0].main === "Drizzle") {
        setWeatherIcon(Drizzle);
      } else if (data.weather[0].main === "Mist") {
        setWeatherIcon(Mist);
      } else if (data.weather[0].main === "Snow") {
        setWeatherIcon(Snow);
      }
    } catch (err) {
      setError(err.message); 
      setWeatherData(null); 
    }
  };

  const handleSearch = () => {
    if (searchBox) {
      CheckWeather(searchBox);
    }
  };

  return (
    <>
      <div className="card">
        <div className="search">
          <input
            value={searchBox}
            onChange={(e) => setSearchBox(e.target.value)}
            type="text"
            placeholder="Enter city name"
            spellCheck="false"
          />
          <button id="searchbtn" onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="weather">
            <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />
            <h1 className="temp">
              {weatherData ? Math.round(weatherData.main.temp) + "°C" : "22°C"}
            </h1>
            <h2 className="city">{weatherData ? weatherData.name : "New York"}</h2>
            <div className="detail">
              <div className="col">
                <img src={Humidity} alt="Humidity Icon" />
                <div>
                  <p className="humidity">
                    {weatherData ? weatherData.main.humidity + "%" : "50%"}
                  </p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src={Wind} alt="Wind Icon" />
                <div>
                  <p className="wind">
                    {weatherData ? weatherData.wind.speed + "km/h" : "15km/h"}
                  </p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
