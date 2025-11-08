const apiKey = 'c3c604b0419b40efb48130757250908';
    const cityInput = document.getElementById('cityInput');
    const resDiv = document.getElementById('res');
    const toggleButton = document.getElementById('toggleMode');

    function getdata() {
      const city = cityInput.value.trim();
      if (city === "") {
        resDiv.innerHTML = "<b>Please enter a city name.</b>";
        return;
      }

      resDiv.innerHTML = "Fetching data...";
      fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            resDiv.innerHTML = "<b>City not found!</b>";
            return;
          }

          const info = data.current;
          const loc = data.location;

          resDiv.innerHTML = `
            <h2>${loc.name}, ${loc.country}</h2>
            <img class="weather-icon" src="https:${info.condition.icon}" alt="icon">
            <div class="temp">${info.temp_c}°C</div>
            <div class="condition">${info.condition.text}</div>
            <div class="details">
              <p><b>Feels Like:</b> ${info.feelslike_c}°C</p>
              <p><b>Humidity:</b> ${info.humidity}%</p>
              <p><b>Wind:</b> ${info.wind_kph} km/h (${info.wind_dir})</p>
              <p><b>Pressure:</b> ${info.pressure_mb} mb</p>
              <p><b>Visibility:</b> ${info.vis_km} km</p>
              <p><b>UV Index:</b> ${info.uv}</p>
              <p><b>Local Time:</b> ${loc.localtime}</p>
            </div>
          `;
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          resDiv.innerHTML = "Error fetching data.";
        });
    }

    // 🌙 Toggle Mode
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        toggleButton.textContent = "☀️ Light Mode";
      } else {
        toggleButton.textContent = "🌙 Dark Mode";
      }
    });
