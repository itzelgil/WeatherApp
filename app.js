//DATE

function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0".concat(hours);
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = months[now.getMonth()];
  let formattedDateTime = `${dayName} | ${monthName} ${date}, ${year} | ${hours}:${minutes}`;

  return [formattedDateTime];
}

//FORECAST PER DAYS

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="row">
        <div class="col">
              <h2>${day}</h2>
        </div>
        <div class="col">
            <h2 class="emoji">☀️</h2>
        </div>
        <div class="col">
          <span class="weather-forecast-temp-max">9ºC</span>
              |
          <span class="weather-forecast-temp-min">16ºC</span>
        </div>
        </div>`;
  });
  forecastHTML = forecastHTML + "";
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let apiKey = "a58132974e1508fb139cd5dab2b170ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function handlePosition(position) {
  let apiKey = "a58132974e1508fb139cd5dab2b170ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showTemperature(response) {
  console.log(response.data);
  //TEMPERATURE
  // let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentDegrees");
  celsiusTemperature = response.data.main.temp;
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  //CITY NAME
  let cityName = response.data.name;
  let currentCityName = document.querySelector("#cityTypedName");
  currentCityName.innerHTML = `${cityName}`;
  //FEELS LIKE
  let sensation = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like ${sensation} ºC`;
  //MIN TEMP
  let minTemp = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#min-temp");
  tempMin.innerHTML = `L: ${minTemp}º`;
  //MAX TEMP
  let maxTemp = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#max-temp");
  tempMax.innerHTML = `H: ${maxTemp}º`;
  //DESCRIPTION
  let descriptionWeather = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${descriptionWeather}`;
  //HUMIDITY
  let humidity = response.data.main.humidity;
  let humidityPercent = document.querySelector("#humidity");
  humidityPercent.innerHTML = `Humidity: ${humidity}%`;
  // ICON
  let iconElementChange = document.querySelector("#icon");
  let iconChange = response.data.weather[0].main;
  if (iconChange === "Clear") {
    iconElementChange.innerHTML = "☀️";
  } else if (iconChange === "Clouds") {
    iconElementChange.innerHTML = "⛅️";
  } else if (iconChange === "Snow") {
    iconElementChange.innerHTML = "🌨";
  } else if (iconChange === "Thunderstorm") {
    iconElementChange.innerHTML = "⛈";
  } else if (iconChange === "Rain") {
    iconElementChange.innerHTML = "🌧 ";
  } else {
    iconElementChange = "🌤";
  }
  //WIND
  let windElement = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed: ${windElement} km/h`;
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentDegrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentDegrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//MIN-MAX TEMPERATURE

let celsiusTemperature = null;
displayForecast();

let city = document.querySelector("#searchForm");
city.addEventListener("submit", handleSubmit);

let dateChange = document.querySelector("#currentDateTime");
dateChange.innerHTML = formatDate(new Date());

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);
searchCity("Barcelona");
