const APIKey = "65c10c5579f42681f3f589f30c251f3f"

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-history");
const history = document.getElementById("history");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const UVIndex = document.getElementById("UV-index");


let date = new Date();

    console.log(date);

$("#search-button").on("click", function() {
    let city = $("#city-input").val();
    const APIKey = "65c10c5579f42681f3f589f30c251f3f"
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;
    console.log(city);

    $('#forecast-section').removeClass('hide');
    $('#forecast-section').addClass('show');

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function (response){
    
        console.log(response)
    
        console.log(response.name)
        console.log(response.weather[0].icon)


    })
});