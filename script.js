const form = document.querySelector(".form");
const input = document.querySelector(".input");
const cityInfo = document.querySelector(".city-info");

var APIKey = "a5a686e64400da39c5b4faa4a396c1b4";

form.addEventListener("submit", function (event) {
  var city = input.value;
  event.preventDefault();
  getApi(city);
});

function getApi(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let getDate = new Date();
      cityInfo.innerHTML = ` 
      <h2>${data.name} (${getDate.toLocaleDateString(1 / 12 / 2023)})</h2>
     <p>Temp: ${data.main.temp}</p>
     <p>Wind: ${data.wind.speed}km/h</p>
     <p>Humidity: ${data.main.humidity}%</p>`;

      console.log(data.main.temp);
      console.log(data);
    });
}
