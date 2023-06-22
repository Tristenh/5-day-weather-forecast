const form = document.querySelector(".form");
const input = document.querySelector(".input");

var APIKey = "a5a686e64400da39c5b4faa4a396c1b4";

form.addEventListener("submit", function (event) {
  var city = input.value;
  event.preventDefault();
  console.log("click");
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
      console.log(data);
    });
}
