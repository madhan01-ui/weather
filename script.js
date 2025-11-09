async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const box = document.getElementById("weatherBox");
  const rainCanvas = document.getElementById("rainCanvas");
  const apiKey = "fae9c95f3c1cbde39338cc563b7c29e9"; // 🔸 Replace with your OpenWeather key

  if (!city) {
    box.innerHTML = "Please enter a city name!";
    return;
  }

  box.innerHTML = "Loading...";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      box.innerHTML = "❌ City not found!";
      return;
    }

    const weatherType = data.weather[0].main.toLowerCase();
    const icon = data.weather[0].icon;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;

    // Display result
    box.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
      <p>${desc}</p>
      <h3>${temp}°C</h3>
      <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
    `;

    // Change background based on weather
    changeBackground(weatherType);

    // Show or hide rain effect
    if (weatherType.includes("rain")) {
      rainCanvas.style.display = "block";
      startRain();
    } else {
      rainCanvas.style.display = "none";
      stopRain();
    }
  } catch (err) {
    box.innerHTML = "⚠️ Error fetching weather!";
  }
}

function changeBackground(type) {
  const body = document.body;
  if (type.includes("rain")) {
    body.style.background = "linear-gradient(to bottom, #2e3d55, #1c2b40)";
  } else if (type.includes("cloud")) {
    body.style.background = "linear-gradient(to bottom, #90a4ae, #cfd8dc)";
  } else if (type.includes("clear")) {
    body.style.background = "linear-gradient(to bottom, #4fc3f7, #81d4fa)";
  } else {
    body.style.background = "linear-gradient(to bottom, #607d8b, #90a4ae)";
  }
}



