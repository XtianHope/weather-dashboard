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
    const cityName = data.city.name;

    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
      const currentDay = data.list[dayIndex * 8];
      const tempMax = currentDay.main.temp_max;
      const tempMin = currentDay.main.temp_min;
      const humidity = currentDay.main.humidity;
      const wind = currentDay.wind.speed;
      const icon = currentDay.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      const iconImg = document.getElementById(`day-${dayIndex + 1}-weather-icon`);
      iconImg.src = iconUrl;

      // Display weather container for each day
      const weatherContainer = document.querySelector(`#day-${dayIndex + 1}-container`);
      weatherContainer.style.display = 'flex';
    }
})
.catch(error => {
  console.log('Error fetching data:', error);
});
}




// Function to handle the search event
function handleSearch() {
  city = $('#search-input').val();
  if(!city){
    alert('Please enter valid city plz');
    document.querySelectorAll('.weather-container').forEach(container => {
      container.style.display = 'none';
    });
    return;
  }

  getFiveDayForecast(city);

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
  });
});

// Hide all other weather containers except the clicked one
document.querySelectorAll('.weather-container').forEach(container => {
    container.style.display = 'none';
});

// Search Button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', () => {
  handleSearch();
});
});