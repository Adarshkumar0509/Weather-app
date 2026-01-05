import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '0d7aad7e2067c18c5b6f9be3499eb7fb23';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⚡';
    if (desc.includes('wind')) return '💨';
    return '🌤️';
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1>Weather App</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        {loading && <div className="loading">Loading weather data...</div>}
        {error && <div className="error">Error: {error}</div>}

        {weather && (
          <div className="weather-info">
            <div className="city-name">
              <h2>{weather.name}, {weather.sys.country}</h2>
            </div>
            
            <div className="weather-main">
              <div className="temperature">
                <span className="temp-value">{Math.round(weather.main.temp)}°C</span>
                <span className="weather-icon">{getWeatherIcon(weather.weather[0].description)}</span>
              </div>
              <p className="weather-description">{weather.weather[0].main}</p>
              <p className="weather-desc-detail">{weather.weather[0].description}</p>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">Feels Like</span>
                <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weather.main.pressure} hPa</span>
              </div>
            </div>

            <div className="weather-minmax">
              <div className="minmax-item">
                <span className="label">Min Temp</span>
                <span className="value">{Math.round(weather.main.temp_min)}°C</span>
              </div>
              <div className="minmax-item">
                <span className="label">Max Temp</span>
                <span className="value">{Math.round(weather.main.temp_max)}°C</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
