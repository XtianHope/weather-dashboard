// Function to pull weather data from OpenWeather API
function getWeather(city) {
    const apiKey = '8823600ae11757d74ec67f06b60ca5ef';
    const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
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

// Function to create separate boxes for each date and weather information
function createWeatherBox(city, date, averageTemp, averageHumidity, averageWindSpeed) {
    const forecastContainer = document.getElementById(`${city}-forecast`);
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast-box');
  
    forecastElement.innerHTML = `
      <div class="date">${date}</div>
      <div class="weather-info">
        <p>Average Temperature: ${averageTemp.toFixed(2)} &#8457;</p>
        <p>Average Humidity: ${averageHumidity.toFixed(2)}%</p>
        <p>Average Wind Speed: ${averageWindSpeed.toFixed(2)} mph</p>
      </div>
    `;
  
    forecastContainer.appendChild(forecastElement);
  }


// Function to pull 5-day forecast data from OpenWeather API
function getFiveDayForecast(city) {
    const apiKey = '8823600ae11757d74ec67f06b60ca5ef';
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const dailyForecasts = {};
      data.list.forEach(forecast => {
          const date = forecast.dt_txt.split(' ')[0];
          if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
          }
          dailyForecasts[date].push(forecast);
        });
  
        // Loop through each date and create weather boxes
        Object.keys(dailyForecasts).forEach(date => {
          const forecastsForDay = dailyForecasts[date];
          let totalTemp = 0;
          let totalHumidity = 0;
          let totalWindSpeed = 0;
  
          forecastsForDay.forEach(forecast => {
            totalTemp += forecast.main.temp;
            totalHumidity += forecast.main.humidity;
            totalWindSpeed += forecast.wind.speed;
          });
  
          const averageTemp = totalTemp / forecastsForDay.length;
          const averageHumidity = totalHumidity / forecastsForDay.length;
          const averageWindSpeed = totalWindSpeed / forecastsForDay.length;
  
          createWeatherBox(city, date, averageTemp, averageHumidity, averageWindSpeed);
        });
      })
      .catch(error => {
        console.log('Error fetching 5-day forecast data:', error);
      });
  }
document.addEventListener('DOMContentLoaded', function () {
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

                // Fetch weather data for the selected city and handle the promise
                getWeather(city)
                    .then(() => {
                        getFiveDayForecast(city);
                    })
                    .catch(error => {
                        console.log(`Error fetching weather for ${city}:`, error);
                    });
            }
        });
    });
});