function connect() {

    var countryName = document.getElementById("countryInput").value;

    var url = "https://api.restcountries.com/countries/v5/names.common/"
        + countryName;

    fetch(url, {
        headers: {
            "Authorization": "Bearer rc_live_b421716ccd5247b2af1b8dc5d9b8751d"
        }
    })

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        var country = data.data.objects[0];

        var name = country.names.common;
        var capital = country.capitals[0];
        var population = country.population;
        var region = country.region;
        var flag = country.flag.url_png;

        var latitude = country.coordinates.lat;
        var longitude = country.coordinates.lng;

        document.getElementById("displayArea").innerHTML =

            "<div class='countryCard'>" +

            "<img src='" + flag + "' width='200'>" +

            "<h2>" + name + "</h2>" +

            "<p>Capital: " + capital + "</p>" +

            "<p>Population: " + population + "</p>" +

            "<p>Region: " + region + "</p>" +

            "<button onclick=\"getWeather(" +
            latitude + "," +
            longitude + ",'" +
            capital +
            "')\">More Details</button>" +

            "</div>";
    });
}


function getWeather(latitude, longitude, capital) {

    var url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + latitude +
        "&longitude=" + longitude +
        "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m";

    fetch(url)

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        var weather = data.current;

        document.getElementById("displayArea").innerHTML +=

            "<div class='weatherBox'>" +

            "<h3>Weather in " + capital + "</h3>" +

            "<p>Temperature: " +
            weather.temperature_2m + " °C</p>" +

            "<p>Feels Like: " +
            weather.apparent_temperature + " °C</p>" +

            "<p>Humidity: " +
            weather.relative_humidity_2m + " %</p>" +

            "<p>Wind Speed: " +
            weather.wind_speed_10m + " km/h</p>" +

            "</div>";
    });
}