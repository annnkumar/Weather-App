document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherButton = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "e831dd647f266c3aeb8aae2f3e199b90";

    getWeatherButton.addEventListener("click", async () => {
        const cityName = cityInput.value.trim();
        if (!cityName) return;

        try {
            const weatherData = await fetchWeatherData(cityName);
            displayWeatherData(weatherData);
        } catch (error) {
            ShowError("City not found. Try another city.");
        }
    });

    async function fetchWeatherData(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                return {
                    city: data.name,
                    temperature: data.main.temp,
                    description: data.weather[0].description
                };
            });
    }

    function displayWeatherData(weatherData) {
        const { city, temperature, description } = weatherData;
        cityNameDisplay.textContent = `Temperature in ${city}`;
        
        // Update to work with the new HTML structure with spans
        const tempSpan = temperatureDisplay.querySelector('span');
        tempSpan.textContent = `${temperature}°C`;
        
        const descSpan = descriptionDisplay.querySelector('span');
        descSpan.textContent = description;

        errorMessage.classList.add("hidden");
        weatherInfo.classList.remove("hidden");
    }

    function ShowError(message = "An error occurred.") {
        weatherInfo.classList.add("hidden");
        errorMessage.textContent = message;
        errorMessage.classList.remove("hidden");
    }
});
