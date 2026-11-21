import WeatherDashboard from './WeatherDashboard.jsx';

function App() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">K0126002 · Week 12 homework</p>
        <h1>
          Weather <span className="marker">dashboard</span>
        </h1>
        <p className="lead">
          Current temperature, wind and conditions from the free Open-Meteo API. Search by city name or by
          coordinates, or use your location. Handles loading, a missing city, bad coordinates, a rate limit and
          a lost connection.
        </p>
      </header>
      <WeatherDashboard />
      <p className="credit muted">Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo.com<span className="sr-only"> (opens in a new tab)</span></a>.</p>
    </>
  );
}

export default App;
