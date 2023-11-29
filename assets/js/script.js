var APIKey = 
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

}

// Function to pull 5-day forecast data from OpenWeather API
function getFiveDayForecast(city) {
    const apiKey = '8823600ae11757d74ec67f06b60ca5ef';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;  
}


// Function to handle adding a city button


// Function to handle the search event


// Function to display weather icons


 // Add cityButtons event listener

 // Hide all other weather containers except the clicked one
 document.querySelectorAll('.weather-container').forEach(container => {
    if (container.id !== `${city}-container`) {
      container.style.display = 'none';
    }
});