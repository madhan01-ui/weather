async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "fae9c95f3c1cbde39338cc563b7c29e9"; // 🔸 Replace with your key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      resultDiv.innerHTML = "❌ City not found!";
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      <p>${data.weather[0].description}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error fetching data!";
  }
}

