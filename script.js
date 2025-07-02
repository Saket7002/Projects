const API_KEY = '9dc9a0d900286125a7bcadfb3740eee7'; 

async function getWeather () {
  const city        = document.getElementById('search').value.trim();
  const weatherBox  = document.getElementById('weather');
  const aqiBox      = document.getElementById('aqi');
  

  if (!city) { weatherBox.textContent = '❌ Please enter a city.'; return; }

  try {
    const curURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const curRes = await fetch(curURL);
    if (!curRes.ok) throw new Error('City not found');
    const cur    = await curRes.json();

    const { name, coord, main, weather, wind,feels_like,curPop } = cur;

    weatherBox.innerHTML = `
      <h2>${name}</h2>
      <p><strong>${weather[0].main}</strong>  ${weather[0].description}</p>
      <p>🌡️Temp: ${main.temp}°C</p>
      <p>💧Humidity : ${main.humidity}%</p>
      <p>🤗 Real‑feel: ${main.feels_like}°C</p>
      <p>💨Wind: ${wind.speed}m/s</p>
    `;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`;
    const forecastRes = await fetch(forecastURL);
    if (!forecastRes.ok) throw new Error('Forecast unavailable');
    const fc = await forecastRes.json();
    const forecastBox = document.getElementById('forecast');
    renderForecast(fc.list); 
  function renderForecast(list){
  forecastBox.innerHTML = '';                

  list.forEach(entry=>{
    /* entry.dt is UTC seconds since 1970 */
    const date = new Date(entry.dt * 1000);

    const day  = date.toLocaleDateString(undefined,
                 { weekday:'short', month:'short', day:'numeric'}); 
    const hour = date.toLocaleTimeString(undefined,
                 { hour:'2-digit', minute:'2-digit'});             

    const icon = `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`;
    const temp = Math.round(entry.main.temp);
    

    /* Build one miniature “card” */
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
        <p>${day}<br>${hour}</p>
        <img src="${icon}" alt="${entry.weather[0].description}">
        <p>${temp}&deg;C</p>`;
    forecastBox.appendChild(card);
  });
}

 




    const aqiURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`;
    const aqiRes = await fetch(aqiURL);
    if (!aqiRes.ok) throw new Error('AQI unavailable');
    const aqi    = await aqiRes.json();
    const level  = ['Good','Fair','Moderate','Poor','VeryPoor'];
    const aqiVal = aqi.list[0].main.aqi;          // 1‑5
    aqiBox.textContent = `AQI:(${level[aqiVal-1]})`;
    


 
  } catch (err) {
    weatherBox.textContent = `❌ ${err.message}`;
    aqiBox.textContent     = '';
    console.error(err);
  }
  
}
document.getElementById('search')
        .addEventListener('keyup',
          e => { if (e.key === 'Enter') getWeather(); });



