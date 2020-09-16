const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-history");
const history = document.getElementById("history");
const cityName = document.getElementById("city-name");
const currentPicEl = document.getElementById("current-pic");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const UVIndex = document.getElementById("UV-index");


let date = new Date();

console.log(date);

$("#search-button").on("click", function () {
    let city = $("#city-input").val();
    const APIKey = "&appid=65c10c5579f42681f3f589f30c251f3f"
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;
    console.log(city);

    $('#forecast-section').removeClass('hide');
    $('#forecast-section').addClass('show');

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {

            console.log(response)
            // console.log(response.name)
            // console.log(response.weather[0].icon)
            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // console.log(Math.floor(tempF))
            // console.log(response.main.humidity)
            // console.log(response.wind.speed)

            getCurrentConditions(response);
            getCurrentForecast(response);
            makeList();

        })
});


function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}

function getCurrentConditions (response) {

    cityName.innerHTML = response.name;

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);
    temperature.innerHTML = tempF

    humidity.innerHTML = response.main.humidity + "%";

    windSpeed.innerHTML = response.wind.speed + "MPH";

    let weatherPic = response.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt",response.data.weather[0].description);

    // let lat = response.coord.lat;
    // let lon = response.coord.lon;
    // let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + APIKey + "&cnt=1";
    // $.ajax({
    //     url: UVQueryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    //     // UVIndex.innerHTML = response.data[0].value;
    // },)}

}


function getCurrentForecast (response) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey,
        method: "GET"
    }).then(function (response){
    
        let cityID = response.id;
        console.log(response);
        const forecastEls = document.querySelectorAll(".forecast");
        for (i=0; i<forecastEls.length; i++) {
            forecastEls[i].innerHTML = "";
            const forecastIndex = i*8 + 4;
            const forecastDate = new Date(response.list[forecastIndex].dt * 1000);
            const forecastDay = forecastDate.getDate();
            const forecastMonth = forecastDate.getMonth() + 1;
            const forecastYear = forecastDate.getFullYear();
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEls[i].append(forecastDateEl);
            const forecastWeatherEl = document.createElement("img");
            forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
            forecastWeatherEl.setAttribute("alt",response.list[forecastIndex].weather[0].description);
            forecastEls[i].append(forecastWeatherEl);
            const forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML = "Temp: " + k2f(response.list[forecastIndex].main.temp) + " &#176F";
            forecastEls[i].append(forecastTempEl);
            const forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastHumidityEl);
            }
        })
    };  
