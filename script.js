const accessKey = "8b1dcfe6e490c6f9e307474d32a56130";

const lang = "ru";
const cityId = 498817;

let weatherData = {}; // объявляем переменную weatherData
const weatherElement = document.getElementById("weather");

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&lang=${lang}&appid=${accessKey}`
)
  .then((response) => response.json())
  .then((json) => {
    weatherData = json; // присваиваем полученный JSON переменной weatherData

    // Фильтрация данных по времени "12:00:00"
    const filteredData = weatherData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    // Отображение отфильтрованных данных на странице
    filteredData.forEach((item) => {
      const dateParts = item.dt_txt.split(" ")[0].split("-");
      const dayNumber = parseInt(dateParts[2], 10);
      const temperatureKelvin = item.main.temp;
      const temperatureCelsius = temperatureKelvin - 273.15; // перевод из Кельвинов в Цельсии
      const description = item.weather[0].description;
      const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;

      const weatherItemElement = document.createElement("div");
      weatherItemElement.innerHTML = `
        <div class="weather__card">
          <p class="weather__day">${dayNumber}</p>
          <img src="${icon}" alt="${description}">
          <p class="weather__temp">${temperatureCelsius.toFixed(1)} °C</p>
        </div>
      `;

      weatherElement.appendChild(weatherItemElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });

let currentWeatherData = {};
const bodyElement = document.querySelector("body"); // Получаем элемент <body>

const currentWeatherElement = document.getElementById("currentWeather");

fetch(
  `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&lang=${lang}&appid=${accessKey}`,
  {}
)
  .then((response) => response.json())
  .then((json) => {
    currentWeatherData = json;
    console.log(currentWeatherData);

    if (
      currentWeatherData.weather[0].icon === "01d" ||
      currentWeatherData.weather[0].icon === "02d"
    ) {
      bodyElement.classList.add("sunny");
    } else if (
      currentWeatherData.weather[0].icon === "03d" ||
      currentWeatherData.weather[0].icon === "04d"
    ) {
      bodyElement.classList.add("cloudy");
    } else if (
      currentWeatherData.weather[0].icon === "09d" ||
      currentWeatherData.weather[0].icon === "10d"
    ) {
      bodyElement.classList.add("rainy");
    } else if (currentWeatherData.weather[0].icon === "11d") {
      bodyElement.classList.add("thunder");
    } else if (currentWeatherData.weather[0].icon === "13d") {
      bodyElement.classList.add("snowy");
    } else if (currentWeatherData.weather[0].icon === "50d") {
      bodyElement.classList.add("foggy");
    }

    const temperature = currentWeatherData.main.temp - 273.15;
    const cityName = currentWeatherData.name;

    currentWeatherElement.innerHTML = `
        <div class="weather__card-current">
        <p class="weather__temp-current">${temperature.toFixed(1)}°</p>
        <p class="weather__cityname">${cityName}</p>
        </div>
      `;
  });
