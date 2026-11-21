import { useEffect, useState } from 'react';
import { describeWeather, findCity, getCurrentWeather, WeatherError } from './weather.js';

// What to look up. Changing `target` is what makes the effect below run again.
//   { type: 'city', name: 'Seoul' }                      -> look the city up, then get its weather
//   { type: 'coords', lat: 37.57, lon: 126.98, label }   -> get the weather for these coordinates
const FIRST_TARGET = { type: 'city', name: 'Seoul' };

function WeatherDashboard() {
  const [mode, setMode] = useState('city'); // which form is shown
  const [cityInput, setCityInput] = useState('Seoul');
  const [latInput, setLatInput] = useState('37.57');
  const [lonInput, setLonInput] = useState('126.98');
  const [target, setTarget] = useState(FIRST_TARGET);

  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0); // bumping this runs the effect again with the same target
  const [formError, setFormError] = useState('');

  // The effect: fetch whenever the target changes (or the user presses Try again).
  // The cleanup aborts the request, so a slow answer for an old place can never overwrite a newer one.
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setError('');

    async function load() {
      try {
        let latitude, longitude, label;
        if (target.type === 'city') {
          const city = await findCity(target.name, controller.signal);
          latitude = city.latitude;
          longitude = city.longitude;
          label = [city.name, city.admin1 && city.admin1 !== city.name ? city.admin1 : null, city.country].filter(Boolean).join(', ');
        } else {
          latitude = target.lat;
          longitude = target.lon;
          label = target.label;
        }
        const current = await getCurrentWeather(latitude, longitude, controller.signal);
        setReport({ ...current, label, latitude, longitude });
        setStatus('ready');
      } catch (err) {
        if (err.name === 'AbortError') return; // cancelled by the cleanup: ignore
        setError(err instanceof WeatherError ? err.message : 'Network problem: check your internet connection and try again.');
        setStatus('error');
      }
    }
    load();

    return () => controller.abort();
  }, [target, retry]);

  function searchCity(e) {
    e.preventDefault();
    const name = cityInput.trim();
    if (!name) {
      setFormError('Type a city name first.');
      return;
    }
    setFormError('');
    setTarget({ type: 'city', name });
  }

  function searchCoords(e) {
    e.preventDefault();
    const lat = Number(latInput);
    const lon = Number(lonInput);
    if (latInput.trim() === '' || lonInput.trim() === '' || Number.isNaN(lat) || Number.isNaN(lon)) {
      setFormError('Latitude and longitude must both be numbers.');
      return;
    }
    setFormError('');
    // out-of-range values are sent on purpose: the service's own error message is shown to the user
    setTarget({ type: 'coords', lat, lon, label: `${lat}, ${lon}` });
  }

  // Bonus: use the device location (only when the button is pressed, never on page load)
  function useMyLocation() {
    if (!('geolocation' in navigator)) {
      setFormError('This browser cannot share its location.');
      return;
    }
    setFormError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(3));
        const lon = Number(pos.coords.longitude.toFixed(3));
        setLatInput(String(lat));
        setLonInput(String(lon));
        setTarget({ type: 'coords', lat, lon, label: 'Your location' });
      },
      (err) => {
        setFormError(err.code === 1 ? 'Location permission was denied. Search for a city instead.' : 'Could not find your location. Search for a city instead.');
      },
      { timeout: 10000 },
    );
  }

  const weather = report ? describeWeather(report.weather_code) : null;

  return (
    <div className="dashboard">
      <section className="panel" aria-labelledby="search-title">
        <h2 id="search-title">Find a place</h2>
        <div className="tabs" role="group" aria-label="Search by">
          <button type="button" aria-pressed={mode === 'city'} onClick={() => setMode('city')}>City name</button>
          <button type="button" aria-pressed={mode === 'coords'} onClick={() => setMode('coords')}>Coordinates</button>
        </div>

        {mode === 'city' ? (
          <form onSubmit={searchCity}>
            <label htmlFor="city">City</label>
            <div className="row">
              <input id="city" value={cityInput} onChange={(e) => setCityInput(e.target.value)} placeholder="e.g. Seoul, Tashkent, Paris" autoComplete="off" />
              <button type="submit">Get weather</button>
            </div>
          </form>
        ) : (
          <form onSubmit={searchCoords}>
            <div className="row two">
              <div>
                <label htmlFor="lat">Latitude</label>
                <input id="lat" inputMode="decimal" value={latInput} onChange={(e) => setLatInput(e.target.value)} />
              </div>
              <div>
                <label htmlFor="lon">Longitude</label>
                <input id="lon" inputMode="decimal" value={lonInput} onChange={(e) => setLonInput(e.target.value)} />
              </div>
            </div>
            <button type="submit">Get weather</button>
          </form>
        )}

        <button type="button" className="ghost" onClick={useMyLocation}>Use my location</button>
        {formError && <p className="error" role="alert">{formError}</p>}
      </section>

      <section className="panel result" aria-labelledby="result-title" aria-live="polite">
        <h2 id="result-title" className="sr-only">Current weather</h2>
        {status === 'loading' && <p className="muted loading">Loading the weather...</p>}

        {status === 'error' && (
          <div role="alert">
            <p className="error">{error}</p>
            <button type="button" onClick={() => setRetry((n) => n + 1)}>Try again</button>
          </div>
        )}

        {status === 'ready' && report && (
          <div className="widget">
            <p className="place">{report.label}</p>
            <p className="temp">
              <span className="icon" aria-hidden="true">{weather.icon}</span>
              {report.temperature_2m}
              <span className="unit">{report.units.temperature_2m}</span>
            </p>
            <p className="desc">{weather.text}</p>
            <p className="wind">Wind {report.wind_speed_10m} {report.units.wind_speed_10m}</p>
            <p className="muted small">Measured at {report.time.replace('T', ' ')} local time · {report.latitude.toFixed(2)}, {report.longitude.toFixed(2)}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default WeatherDashboard;
