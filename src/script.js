const API_KEY = 'ddad59fd4d0deddb1d6f754fa805e9f9';  //API KEY 


// Get references to HTML elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const forecastContainer = document.getElementById('forecast');

// Function to fetch weather data by city name
async function fetchWeatherByCity(city) {
    // Fetch current weather data from OpenWeatherMap API using city name
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}

// Function to fetch weather data by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
     // Fetch current weather data from OpenWeatherMap API using latitude and longitude
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}

// Function to fetch 5-day forecast by city name
async function fetchForecastByCity(city) {
       // Fetch 5-day forecast data from OpenWeatherMap API using city name
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}

// Function to update current weather information in the UI
function updateCurrentWeather(data) {
    const date = new Date().toISOString().split('T')[0]; //Get the current date in YYYY-MM-DD format
    cityName.textContent = `${data.name} (${date})`;   // Update city name and date
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    windSpeed.textContent = `Wind: ${data.wind.speed} M/S`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

// Function to update 5-day forecast in the UI
function updateForecast(data) {
    forecastContainer.innerHTML = ''; // Clear existing forecast
    const forecastDays = data.list.filter((item, index) => index % 8 === 0); // Get forecast for each day at the same time
    forecastDays.forEach(day => {
        const forecastDate = new Date(day.dt_txt).toISOString().split('T')[0];
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-card', 'bg-blue-200', 'p-4', 'rounded-lg', 'shadow-md', 'm-2');          // using tailwind adding some style by a class name of 'forecast-card'
        forecastElement.innerHTML = `
            <p>${forecastDate}</p>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon">                   
            <p>Temp: ${day.main.temp}°C</p>
            <p>Wind: ${day.wind.speed} M/S</p>
            <p>Humidity: ${day.main.humidity}%</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await fetchWeatherByCity(city);     // Fetch current weather data
            const forecastData = await fetchForecastByCity(city);     // fetch 5-day forecast weather data
            updateCurrentWeather(weatherData);
            updateForecast(forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        }
    } else {
        alert('Please enter a city name.');
    }
});

// Event listener for current location button
currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try {
                const weatherData = await fetchWeatherByCoordinates(lat, lon);
                updateCurrentWeather(weatherData);
                // Fetch forecast using city name obtained from weatherData
                const forecastData = await fetchForecastByCity(weatherData.name);
                updateForecast(forecastData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            }
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});










