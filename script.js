const form = document.querySelector(".form");
const input = document.querySelector(".input");
const cityInfo = document.querySelector(".city-info");

let getDate = new Date();
const currentDay = getDate.toLocaleDateString(1 / 12 / 2023);

var APIKey = "a5a686e64400da39c5b4faa4a396c1b4";
form.addEventListener("submit", function (event) {
  var city = input.value;
  event.preventDefault();
  getApi(city);
});

function getApi(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=metric";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityInfo.innerHTML = "";
      console.log(data);
      cityInfo.innerHTML = ` 
        <h2>${data.city.name} (${currentDay})<img src= "https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png?"/>
        </h2>
        <p>Temp: ${data.list[0].main.temp} °C</p>
        <p>Wind: ${data.list[0].wind.speed} km/h</p>
        <p>Humidity: ${data.list[0].main.humidity} %</p>`;
    });
}
