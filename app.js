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
  let currentHour = `${hours}:${minutes}`;
  let formattedDate = `${dayName} <br /> ${monthName} ${date}, ${year}`;
  let currentHours = document.querySelector("#currentTime");
  currentHours.innerHTML = currentHour;
  return [formattedDate];
}

let dateChange = document.querySelector("#currentDateTime");
dateChange.innerHTML = formatDate(new Date());

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
let city = document.querySelector("#searchForm");
city.addEventListener("submit", handleSubmit);
// function celsius(event) {
//   event.preventDefault();
//   let temperatureCelsius = document.querySelector("#currentDegrees");
//   temperatureCelsius.innerHTML = 16 + "º";
// }
// let celsiusDegrees = document.querySelector("#celsius");
// celsiusDegrees.addEventListener("click", celsius);

// function fahrenheit(event) {
//   event.preventDefault();
//   let temperatureFahrenheit = document.querySelector("#currentDegrees");
//   temperatureFahrenheit.innerHTML = 60.8 + "º";
// }
// let fahrenheitDegrees = document.querySelector("#fahrenheit");
// fahrenheitDegrees.addEventListener("click", fahrenheit);

//Function current Location

function handlePosition(position) {
  let apiKey = "a58132974e1508fb139cd5dab2b170ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

function showTemperature(response) {
  //TEMPERATURE
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentDegrees");
  currentTemp.innerHTML = `${temperature}ºC`;
  //CITY NAME
  let cityName = response.data.name;
  let currentCityName = document.querySelector("#cityTypedName");
  currentCityName.innerHTML = `${cityName}`;
  //FEELS LIKE
  let sensation = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like ${sensation} ºC`;
  //DESCRIPTION
  let descriptionWeather = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${descriptionWeather}`;
  //HUMIDITY
  let humidity = response.data.main.humidity;
  let humidityPercent = document.querySelector("#humidity");
  humidityPercent.innerHTML = `Humidity: ${humidity}%`;
}
searchCity("Barcelona");
