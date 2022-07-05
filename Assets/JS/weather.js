// DOM Elements Variable Declaration
var searchBar = document.getElementById("search-bar")
var citySearchForm = document.getElementById("city-search-form");
var searchHistory = document.getElementById("search-history");
var userSearchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var searchHistory = document.getElementById("search-history")
var clearStorageButton = document.getElementById("clear-storage");
var searchedCityWeather = document.getElementById("city-weather")
var locationName = document.getElementById("searched-location-name");
var todaysDate = document.getElementById("todays-date");
var todaysWeatherIcon = document.getElementById("todays-weather");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUVIndex = document.getElementById("current-uv");
var fiveDayForecastDiv = document.getElementById("five-day-forecast");
var fiveDayForecastUL = document.getElementById("five-day-forecast-UL")

// uses days.js to determine today's date 
var today = moment();

// creating an empty array for the user's searches
var userCitySearches = [];
// limiting the amount of saved city searches
var maxUserCitySearches = 8;

// initiate local storage to save the user's search queries in an array
function createLocalStorage() {
    if (localStorage.getItem("savedSearches")) {
        userCitySearches = JSON.parse(localStorage.getItem("savedSearches"));
        for (let i = 0; i < userCitySearches.length; i++) {
            createSavedSearchList(userCitySearches);
        }
    }
};

// dynamically creates a list from the user's searches
function createSavedSearchList(searches) {
    searchHistory.innerHTML = "";
    for (let i = 0; i < searches.length; i++) {
        var cityListItem = document.createElement("button");
        cityListItem.classList = "listItem cityBtn";
        cityListItem.textContent = searches[i];
        searchHistory.appendChild(cityListItem);
    }
    // reset the search to blank once the query has been stored
    userSearchInput.value = "";
};

// function to clear searches!!!!!!

citySearchForm.addEventListener("submit", function(event) {
    searchBar.classList = "";

    event.preventDefault();
    var input = userSearchInput.value;
    if (input.length > 0 ) {
        currentCityWeather(input);
        userCitySearches.unshift(input);
        if (userCitySearches.length > maxUserCitySearches) {
            userCitySearches.pop();
        }
        createSavedSearchList(userCitySearches);
        localStorage.setItem("savedSearches", JSON.stringify(userCitySearches));
    }
});

searchHistory.addEventListener("click", function(event) {
    if (event.target.matches (".listItem")) {
        event.preventDefault();
        userSearchInput.value = event.target.textContent;
        searchButton.click();
    }
})

// function to display current weather conditions for searched city 


function currentCityWeather(location) {
    var today = moment();
    var apiKey = "d9473ab184f20ced8ecd4867185cb643"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=imperial";

    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
        .then(function (weather) {
        var longitude = weather.coord.lon;
        var latitude = weather.coord.lat;

        locationName.textContent = weather.name;
        todaysDate.textContent = today.format('MMMM DD, YYYY');
        todaysWeatherIcon.src = "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
        todaysWeatherIcon.style.width = "64px";
        todaysWeatherIcon.style.height = "64px";
        todaysWeatherIcon.classList = "mx-auto bg-white border rounded mb-2";
        currentTemp.textContent = weather.main.temp;
        currentWind.textContent = weather.wind.speed;
        currentHumidity.textContent = weather.main.humidity;

        var UVQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly,alerts&appid=" + apiKey;
        fetch(UVQueryURL)
            .then(function(index) {
                var UVIndexValue = index.uvi
                var UVIndexColor = document.createElement("button");
                UVIndexColor.classList = "UV-button";
                if (index <= 2) {
                    UVIndexColor.style.backgroundColor = "rgb(22, 200, 22)";
                } else if (index <= 5) {
                    UVIndexColor.style.backgroundColor = "rgb(235, 243, 6)";
                } else if (index <= 7) {
                    UVIndexColor.style.backgroundColor = "rgb(255, 149, 0)";
                } else if (index <= 10) {
                    UVIndexColor.style.backgroundColor = "rgb(221, 12, 12)";
                } else {
                    UVIndexColor.style.backgroundColor = "rgb(89, 8, 144)";
                }
                UVIndexColor.textContent = UVIndexValue;
                UVIndexColor.classList = "btn-md";
                currentUVIndex.appendChild(UVIndexColor);
            });
        getFiveDayForecast(latitude, longitude)
    });
};

// function currentUVIndexColor(index) {
//     let color = "";
//     if (index <= 2) {
//             color = "rgb(22, 200, 22)";
//     } else if (index <= 5) {
//             color = "rgb(235, 243, 6)";
//     } else if (index <= 7) {
//             color = "rgb(255, 149, 0)";
//     } else if (index <= 10) {
//             color = "rgb(221, 12, 12)";
//     } else {
//             color = "rgb(89, 8, 144)";
//     }
//     currentUVIndex.style.backgroundColor = color;
//     currentUVIndex.textContent = index;
// };

function getFiveDayForecast(lat, lon) {
    var apiKey = "d9473ab184f20ced8ecd4867185cb643"
    var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`;

    fiveDayForecastUL.innerHTML = '';
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
        for (var i = 1; i < 6; i++) {
            var forecast = data.daily[i];
            var forecastCard = document.createElement("div");
            var forecastImg = document.createElement("img");
            var forecastHeading = document.createElement("h4");
            forecastCard.className = "forecastDIV fiveDayCard";
            fiveDayForecastUL.appendChild(forecastCard);

            forecastHeading.textContent = moment.unix(forecast.dt).format('ll');
            forecastHeading.classList = "text-center";
            forecastCard.appendChild(forecastHeading);

            createDiv = document.createElement("div");
            createDiv.classList = "mx-auto bg-white border rounded mb-2";
            forecastCard.appendChild(createDiv);

            forecastImg.classList = "mx-auto d-block"
            forecastImg.src = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
            createDiv.appendChild(forecastImg);

            forecastHumidity = document.createElement("p");
            forecastHumidity.textContent = `Humidity: ${forecast.humidity}%`;
            forecastCard.appendChild(forecastHumidity);

            forecastWind = document.createElement("p");
            forecastWind.textContent = `Wind: ${forecast.wind_speed} MPH`;
            forecastCard.appendChild(forecastWind);

            forecastTemp = document.createElement("p");
            forecastTemp.textContent = `High: ${Math.floor(forecast.temp.max)} / Low: ${Math.floor(forecast.temp.min)}`;
            forecastCard.appendChild(forecastTemp)
        }
    });
}

createLocalStorage();


