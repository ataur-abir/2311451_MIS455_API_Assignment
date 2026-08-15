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
            "Authorization": "Bearer YOUR_TOKEN"
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
                        <button onclick="getWeather(${latitude}, ${longitude}, '${capital}')">
                            More Details
                        </button>
                    </div>
                `;
            }
        })
        .catch(function(error) {
            statusArea.innerHTML = error.message;
            displayArea.innerHTML = "";
        });
}