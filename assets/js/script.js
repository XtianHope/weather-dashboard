var APIKey = "8823600ae11757d74ec67f06b60ca5ef"
var city = "Charlotte";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
var clearButton = document.querySelector("#clear-history");
var results = document.querySelector("#results");
var weatherContainer;

// Function to pull weather data from OpenWeather API
function getWeather(city) {
    const apiKey = '8823600ae11757d74ec67f06b60ca5ef';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      const tempElement = document.getElementById(`${city}-temp`);
      const humidityElement = document.getElementById(`${city}-humidity`);
      const windElement = document.getElementById(`${city}-wind`);
      const dateElement = document.getElementById(`${city}-date`);

      const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      dateElement.textContent = `Today: ${currentDate}`;
      tempElement.textContent = `Temperature: ${data.main.temp} °F`;
      humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
      windElement.textContent = `Wind Speed: ${data.wind.speed} mph`;
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

// Function to pull 5-day forecast data from OpenWeather API
function getFiveDayForecast(city) {
    const apiKey = '8823600ae11757d74ec67f06b60ca5ef';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`; 

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const dailyForecasts = {};
}


// Function to handle adding a city button
function addCityButton(city) {
}



// Function to handle the search event
function handleSearch(event) {
}


// Function to display weather icons
function displayWeatherIcon(iconCode) {
}

 // Add cityButtons event listener
 document.addEventListener('DOMContentLoaded', function () {
    const cityButtons = document.querySelectorAll('.city-button');
    const flexContainer = document.querySelector('.flex-container');
  
    const fetchedCities = [];
  cityButtons.forEach(button => {
    button.addEventListener('click', () => {
      const city = button.getAttribute('data-city');
      const cityContainer = document.getElementById(`${city}-container`);

 // Hide all other weather containers except the clicked one
 document.querySelectorAll('.weather-container').forEach(container => {
    if (container.id !== `${city}-container`) {
      container.style.display = 'none';
    }
});