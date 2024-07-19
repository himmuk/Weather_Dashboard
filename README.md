# Weather Dashboard

## Overview

The Weather Dashboard is a web application that provides current weather information and a 5-day forecast for a given city. Users can search for weather data by entering a city name or by using their current location.

## Features

- Search for weather by city name.
- Fetch weather data based on the user's current location.
- Display current weather conditions, including temperature, wind speed, and humidity.
- Display a 5-day weather forecast with temperature, wind speed, and humidity.
- Responsive design that works on desktops, iPad Mini, and iPhone SE.

## Technologies Used

- HTML
- Tailwind CSS
- JavaScript
- OpenWeatherMap API

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- A modern web browser

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/weather-dashboard.git
    cd weather-dashboard
    ```

2. **Open the project directory** in your code editor.

3. **Get an OpenWeatherMap API key**:

    Sign up at [OpenWeatherMap](https://openweathermap.org/) and get your API key.

4. **Update the API key in `script.js`**:

    Replace `your_api_key_here` with your actual API key in `script.js`:

    ```javascript
    const API_KEY = 'your_api_key_here';
    ```

### Usage

- Open `Weather.html` in your web browser.
- Enter a city name in the input field and click the "Search" button to fetch weather data for the entered city.
- Click the "Use Current Location" button to fetch weather data based on your current geographical location.

## Project Structure

```plaintext
weather-dashboard/
├── src/
│   ├── script.js
│   ├── style.css
│   ├── Weather.html
├── .gitignore
└── README.md

 
