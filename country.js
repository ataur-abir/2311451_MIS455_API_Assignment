function connect() {
    var country = document.getElementById("countryInput").value;
    var statusArea = document.getElementById("statusArea");
    var displayArea = document.getElementById("displayArea");

    if (country == "") {
        statusArea.innerHTML = "Please enter a country name.";
        displayArea.innerHTML = "";
        return;
    }

    statusArea.innerHTML = "Searching...";
    displayArea.innerHTML = "";

    var url = "https://restcountries.com/v3.1/name/" + country;

    fetch(url, {
        headers: {
            "Authorization": "Bearer rc_live_b421716ccd5247b2af1b8dc5d9b8751d"
        }
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(function(data) {
            statusArea.innerHTML = "";
            displayArea.innerHTML = "";

            for (var i = 0; i < data.length; i++) {
                var countryData = data[i];
                var countryName = countryData.name.common;
                var capital = countryData.capital ? countryData.capital[0] : "No capital";
                var population = countryData.population;
                var region = countryData.region;
                var subregion = countryData.subregion;
                var flag = countryData.flags.png;
                var latitude = countryData.latlng[0];
                var longitude = countryData.latlng[1];

                displayArea.innerHTML += `
                    <div class="countryCard">
                        <img src="${flag}" alt="${countryName} Flag">
                        <h2>${countryName}</h2>
                        <p><b>Capital:</b> ${capital}</p>
                        <p><b>Population:</b> ${population.toLocaleString()}</p>
                        <p><b>Region:</b> ${region}</p>
                        <p><b>Subregion:</b> ${subregion}</p>
                        <button onclick="getWeather(${latitude}, ${longitude}, '${capital}')">More Details</button>
                    </div>
                `;
            }
        })
        .catch(function(error) {
            statusArea.innerHTML = error.message;
            displayArea.innerHTML = "";
        });
}

function getWeather(latitude, longitude, capital) {
    var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m";

    fetch(weatherUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Weather data not found");
            }
            return response.json();
        })
        .then(function(data) {
            var weather = data.current;

            displayArea.innerHTML += `
                <div class="weatherBox">
                    <h3>Weather in ${capital}</h3>
                    <p><b>Temperature:</b> ${weather.temperature_2m} °C</p>
                    <p><b>Feels Like:</b> ${weather.apparent_temperature} °C</p>
                    <p><b>Humidity:</b> ${weather.relative_humidity_2m} %</p>
                    <p><b>Wind Speed:</b> ${weather.wind_speed_10m} km/h</p>
                </div>
            `;
        })
        .catch(function(error) {
            statusArea.innerHTML = error.message;
        });
}