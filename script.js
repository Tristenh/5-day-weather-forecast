// querySelectors
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const cityInfo = document.querySelector(".city-info");
const dayForecast = document.querySelectorAll(".day-forecast");
const saved = document.querySelectorAll(".saved");

// current date
let getDate = new Date();
const currentDay = getDate.toLocaleDateString("en-AU");

// API key
var APIKey = "a5a686e64400da39c5b4faa4a396c1b4";

let inputArray = [];

function JSONParse() {
  let inputJSON = localStorage.getItem("city");
  if (inputJSON) {
    inputArray = JSON.parse(inputJSON);
  }
}

// form submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var city = input.value;
  inputArray.push(city);
  getApi(city);
  saveResult();
  displayResult();
});

function displayResult() {
  saved[0].innerHTML = "";
  for (let i = 0; i < inputArray.length; i++) {
    const displayInput = inputArray[i];
    let createEl = document.createElement("button");
    createEl.classList.add("btn");
    createEl.innerHTML = displayInput;
    saved[0].appendChild(createEl);
    createEl.addEventListener("click", function () {
      getApi(displayInput);
    });
  }
}
function saveResult() {
  localStorage.setItem("city", JSON.stringify(inputArray));
}


// getApi
function getApi(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=metric";

  // fetch request
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityInfo.innerHTML = "";
      console.log(data);

      // for loop dayForcast
      for (let i = 0; i < dayForecast.length; i++) {
        let forecast = dayForecast[i];
        let futureDay = data.list[i * 8];

        // if statement
        if (i >= 0) {
          // cityInfo.innerHTML
          cityInfo.innerHTML = ` 
          <h2>${data.city.name} (${currentDay})<img  src= "https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png?"/>
          </h2>
          <p>Temp: ${data.list[0].main.temp} °C</p>
          <p>Wind: ${data.list[0].wind.speed} km/h</p>
          <p>Humidity: ${data.list[0].main.humidity} %</p>`;
          // format unix timestamp
          const timeStamp = futureDay.dt;
          const date = new Date(timeStamp * 1000);
          const formatDate = date.toLocaleDateString("en-AU");
          console.log(formatDate);
          // forecast.innerHTML
          forecast.innerHTML = `
          <h2>(${formatDate})</h2>
           <img class="icon" src= "https://openweathermap.org/img/wn/${futureDay.weather[0].icon}@2x.png?"> 
          <p>Temp: ${futureDay.main.temp} °C</p>
          <p>Wind: ${futureDay.wind.speed} km/h</p>
          <p>Humidity: ${futureDay.main.humidity} %</p>`;
        }
      }
    });
}
JSONParse();
displayResult();
