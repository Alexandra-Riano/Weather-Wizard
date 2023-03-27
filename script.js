// Validate user input
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// Add event listener to search button
search.addEventListener("click", () => {
	//Define API key and retrieve user input
	const APIKey = "1724320837478e4a77da723f32b14419";
	const city = document.querySelector(".search-box input").value;
	// Validate user input
	if (city === "") return;

	// Send GET request to OpenWeatherMap API with user input and API key
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`
	)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === "404") {
				container.style.height = "400px";
				weatherBox.style.display = "none";
				weatherDetails.style.display = "none";
				error404.style.display = "block";
				error404.classList.add("fadeIn");
				return;
			}
			// Remove error message if present
			error404.style.display = "none";
			error404.classList.remove("fadeIn");

			// Update weather information with response data
			const image = document.querySelector(".weather-box img");
			const temperature = document.querySelector(".weather-box .temperature");
			const description = document.querySelector(".weather-box .description");
			const humidity = document.querySelector(
				".weather-details .humidity span"
			);
			const wind = document.querySelector(".weather-details .wind span");

			switch (json.weather[0].main) {
				case "Clear":
					image.src = "images/clear.png";
					break;

				case "Rain":
					image.src = "images/rain.png";
					break;

				case "Snow":
					image.src = "images/snow.png";
					break;

				case "Clouds":
					image.src = "images/cloud.png";
					break;

				case "Haze":
					image.src = "images/mist.png";
					break;

				default:
					image.src = "";
			}

			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

			// Show weather information
			weatherBox.style.display = "";
			weatherDetails.style.display = "";
			weatherBox.classList.add("fadeIn");
			weatherDetails.classList.add("fadeIn");
			container.style.height = "590px";
		});
});
