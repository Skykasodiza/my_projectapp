function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let search = document.querySelector("#search-input");
  h1.innerHTML = `${search.value}`;
  let city = `${search.value}`;
  city = city.toUpperCase();
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63214c4281922e3bb72fdf12dada7734&units=metric`;
  axios.get(apiUrl).then(getTemp);
}
function getTemp(response) {
  let temp = document.querySelector("#celsius-temp");
  temp.innerHTML = Math.round(response.data.main.temp);

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  weatherResults(response);
}
function weatherResults(response) {
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity-results");
  let humidityElement = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityElement}%`;

  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedResults = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind: ${windSpeedResults}km/h`;
}

function searchLocation(position) {
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];

let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h3 = document.querySelector("#date");
h3.innerHTML = `${day} ${hours}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiusTemp = document.querySelector("#celsius-temp");

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", function () {
  celsiusTemp.innerHTML = "10";
  // console.log(celsiusTemp);
});
