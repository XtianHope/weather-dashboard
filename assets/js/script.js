// Function to pull weather data from OpenWeather API
function getWeather(city) {
    const apiKey = '8823600ae11757d74ec67f06b60ca5ef';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentTemp = data.main.temp;
            const currentHumidity = data.main.humidity;
            const currentWindSpeed = data.wind.speed;
            const currentDate = new Date(data.dt * 1000); // Convert timestamp to date

            const currentWeatherBox = document.createElement('div');
            currentWeatherBox.classList.add('current-weather-box');
            currentWeatherBox.innerHTML = `
                <h3>${city}</h3>
                <p>Date: ${currentDate.toDateString()}</p>
                <p>Temperature: ${currentTemp.toFixed(2)} &#8457;</p>
                <p>Humidity: ${currentHumidity.toFixed(2)}%</p>
                <p>Wind Speed: ${currentWindSpeed.toFixed(2)} mph</p>
            `;

            const forecastContainer = document.getElementById(`${city}-forecast`);
            forecastContainer.insertBefore(currentWeatherBox, forecastContainer.firstChild);
        })
        .catch(error => {
            console.log(`Error fetching current weather for ${city}:`, error);
        });
}

// Function to pull 5 day forecast data from OpenWeather API
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

            const forecastContainer = document.getElementById(`${city}-forecast`);

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