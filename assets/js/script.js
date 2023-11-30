var APIKey = "8823600ae11757d74ec67f06b60ca5ef"
var city = "Charlotte";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
var clearButton = document.querySelector("#clear-history");
var results = document.querySelector("#results");
var weatherContainer;

// Function to pull weather data from OpenWeather API
function getGeoWeather(Lat, Lon) {
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + Lat + "&lon=" + Lon + "&appid=" + APIKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(data.list);
    });
  }

  function getCityGeoData(city) {
    var city = "";
  
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      getGeoWeather(lat, lon);
    })
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


// Function to store searched cities in local storage
function storeCity(city) {
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