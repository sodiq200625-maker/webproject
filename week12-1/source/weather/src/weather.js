// Helpers for the Open-Meteo API (free, no API key): geocoding, the forecast and the weather codes.

const GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST = 'https://api.open-meteo.com/v1/forecast';

// WMO weather codes used by Open-Meteo -> a description and an icon (the icon is decoration only)
const CODES = [
  [[0], 'Clear sky', '☀️'],
  [[1], 'Mainly clear', '🌤️'],
  [[2], 'Partly cloudy', '⛅'],
  [[3], 'Overcast', '☁️'],
  [[45, 48], 'Fog', '🌫️'],
  [[51, 53, 55], 'Drizzle', '🌦️'],
  [[56, 57], 'Freezing drizzle', '🌧️'],
  [[61, 63, 65], 'Rain', '🌧️'],
  [[66, 67], 'Freezing rain', '🌧️'],
  [[71, 73, 75, 77], 'Snow', '🌨️'],
  [[80, 81, 82], 'Rain showers', '🌦️'],
  [[85, 86], 'Snow showers', '🌨️'],
  [[95], 'Thunderstorm', '⛈️'],
  [[96, 99], 'Thunderstorm with hail', '⛈️'],
];

export function describeWeather(code) {
  const found = CODES.find(([codes]) => codes.includes(code));
  return found ? { text: found[1], icon: found[2] } : { text: `Unknown weather (code ${code})`, icon: '❔' };
}

// An error the user should see as a normal sentence, not a stack trace.
export class WeatherError extends Error {}

// Turns whatever went wrong into one short, honest message.
async function readFailure(res) {
  if (res.status === 429) return 'Too many requests (the free weather service has a rate limit). Wait a minute and try again.';
  if (res.status >= 500) return `The weather service has a problem right now (status ${res.status}). Try again later.`;
  try {
    const body = await res.json();
    if (body && body.reason) return body.reason; // e.g. "Latitude must be in range of -90 to 90°. Given: 999."
  } catch {
    /* not JSON */
  }
  return `The weather service did not accept the request (status ${res.status}).`;
}

// City name -> { name, country, latitude, longitude }
export async function findCity(name, signal) {
  const url = `${GEOCODING}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new WeatherError(await readFailure(res));
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new WeatherError(`No place found called “${name}”. Check the spelling.`);
  return data.results[0];
}

// Coordinates -> the current weather
export async function getCurrentWeather(latitude, longitude, signal) {
  const url = `${FORECAST}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new WeatherError(await readFailure(res));
  const data = await res.json();
  return { ...data.current, units: data.current_units, timezone: data.timezone };
}
