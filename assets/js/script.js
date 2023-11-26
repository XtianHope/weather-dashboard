// My OpenWeatherMap API key
// const apiKey = 8823600ae11757d74ec67f06b60ca5ef;

// Geo Location API
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// Function to fetch data based on the longitude and latitudue
function getGeoWeather(lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?appid=8823600ae11757d74ec67f06b60ca5ef&lat=' + lat + '&lon=' + lon + '&units=imperial')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        getGeoWeather(data.lat, data.lon);
    })
}

// Function to fetch data based on the city name
function getCityGeoData() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?appid=8823600ae11757d74ec67f06b60ca5ef&limit=1&q=Charlotte')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        getGeoWeather(data[0].lat, data[0].lon);
    })
}

getCityGeoData();

