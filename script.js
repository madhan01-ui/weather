async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "fae9c95f3c1cbde39338cc563b7c29e9"; // replace
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const resultDiv = document.getElementById("result");
  const bg = document.getElementById("background");
  resultDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = "❌ City not found!";
      bg.className = "";
      return;
    }

    const weather = data.weather[0].main.toLowerCase();
    const desc = data.weather[0].description;

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${desc}</p>
      <p>🌡️ ${data.main.temp}°C</p>
      <p>💧 ${data.main.humidity}% humidity</p>
      <p>🌬️ ${data.wind.speed} m/s wind</p>
    `;

    // Reset background
    bg.className = "";
    if (weather.includes("cloud")) bg.classList.add("cloudy");
    else if (weather.includes("rain")) bg.classList.add("rainy");
    else if (weather.includes("mist") || weather.includes("fog")) bg.classList.add("misty");
    else bg.classList.add("sunny");

  } catch (err) {
    resultDiv.innerHTML = "⚠️ Error fetching weather data!";
    bg.className = "";
  }
}

