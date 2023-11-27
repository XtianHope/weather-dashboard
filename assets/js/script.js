function getWeather(city) {
    const apiKey = '8823600ae11757d74ec67f06b60ca5ef';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const tempElement = document.getElementById(`${city}-temp`);
        const humidityElement = document.getElementById(`${city}-humidity`);
        const windElement = document.getElementById(`${city}-wind`);
  
        tempElement.textContent = data.main.temp;
        humidityElement.textContent = data.main.humidity;
        windElement.textContent = data.wind.speed;
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
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
          // Fetch weather data for the selected city
          getWeather(city);
        }
      });
    });
  });