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

// City Buttons
const cityButtons = document.querySelectorAll('.city-button');

// Show weather container for the selected/clicked city
cityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const city = button.getAttribute('data-city');
        const cityContainer = document.getElementById(`${city}-container`);

        // Hide all weather containers
        document.querySelectorAll('.weather-container').forEach(container => {
            container.style.display = 'none';
        });
        
        // Show weather container for selected/clicked city
        if (cityContainer) {
            cityContainer.style.display = 'block';
        }
    });
});