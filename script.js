async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const box = document.getElementById("weatherBox");
  const apiKey ="fae9c95f3c1cbde39338cc563b7c29e9"; // Replace with your key

  if (!city) {
    box.innerHTML = "Please enter a city name!";
    return;
  }

  box.innerHTML = `<p class="fade-in">Fetching weather...</p>`;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      box.innerHTML = "❌ City not found!";
      return;
    }

    const weather = data.weather[0].main.toLowerCase();
    const icon = data.weather[0].icon;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;

    // Display
    box.innerHTML = `
      <div class="fade-in">
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
        <p>${desc}</p>
        <h3>${temp}°C</h3>
        <p>💧 Humidity: ${data.main.humidity}% | 🌬️ Wind: ${data.wind.speed} m/s</p>
      </div>
    `;

    // Change background animation
    changeBackground(weather);
  } catch (err) {
    box.innerHTML = "⚠️ Error fetching weather!";
  }
}

function changeBackground(weatherType) {
  const body = document.body;
  const rainCanvas = document.getElementById("rainCanvas");

  // Reset background class
  body.className = "";

  if (weatherType.includes("rain")) {
    body.classList.add("rainy");
    rainCanvas.style.display = "block";
    startRain();
  } else if (weatherType.includes("cloud")) {
    body.classList.add("cloudy");
    rainCanvas.style.display = "none";
    stopRain();
  } else if (weatherType.includes("clear")) {
    body.classList.add("sunny");
    rainCanvas.style.display = "none";
    stopRain();
  } else {
    body.classList.add("night");
    rainCanvas.style.display = "none";
    stopRain();
  }
}
