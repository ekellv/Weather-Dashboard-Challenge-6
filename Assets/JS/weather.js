var APIKey = "e084df3b3410d40770be3c446e10a2b5"
var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// DOM Elements Variable Declaration
var searchBar = document.getElementById("search-bar")
var citySearchForm = document.getElementById("city-search-form");
var searchHistory = document.getElementById("search-history");
var userSearchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var clearStorageButton = document.getElementById("clear-storage");
var searchedCityWeather = document.getElementById("city-weather")
var locationName = document.getElementById("location-name");
var todaysDate = document.getElementById("todays-date");
var todaysWeatherIcon = document.getElementById("todays-weather");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUVIndex = document.getElementById("current-uv");
var fiveDayForecastDiv = document.getElementById("five-day-forecast");

// uses days.js to determine today's date 
var today = dayjs();

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
        var cityListItem = document.createElement("li");
        cityListItem.classList = "have to add these lol";
        cityListItem.textContent = searches[i];
        clearStorageButton.appendChild(cityListItem);
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
    if (event.target.matches (".userCitySearches")) {
        event.preventDefault();
        userCitySearches.value = event.target.textContent;
        searchButton.click();
    }
});

// function to display current weather conditions for searched city 

function currentCityWeather(location) {
    var apiKey = "d9473ab184f20ced8ecd4867185cb643"
    var queryURL = "https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}}&aqi=no";

    var today = dayjs();

    fetch(queryURL)
    .then(function (response) {
        return response.JSON();
    })
    .then (function (weather) {
        var longitude = weather.location.lon;
        var latitude = weather.location.lat;
        locationName.textContent = weather.location.name + ",", weather.location.region;
        todaysDate.textContent = dayjs().format("MMMM D, YYYY")
        todaysWeatherIcon.src = "https:" + weather.current.condition.icon;
        currentTemp.textContent = weather.current.temp_f;
        currentWind.textContent = weather.current.humidity;
        currentHumidity.textContent = weather.current.wind_mph;
        currentUVIndexColor(weather.current.uvi);
        getFiveDayForecast(latitude, longitude)
    });
};

console.log(locationName.textContent);

function currentUVIndexColor(index) {
    let color = "";
    if (index <= 2) {
            color = "green";
    } else if (index <= 5) {
            color = "yellow";
    } else if (index <= 7) {
            color = "orange";
    } else if (index <= 10) {
            color = "red";
    } else {
            color = "violet";
    }
    currentUVIndex.style.backgroundColor = color;
    currentUVIndex.textContent = index;
};

function getFiveDayForecast(lat, lon) {
    var apiKey = "d9473ab184f20ced8ecd4867185cb643"
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`;
    fiveDayForecastDiv.innerHTML = '';
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
        for (var i = 0; i < 5; i++) {
            var forecast = data.daily[i];
            var forecastCard = document.createElement("div");
            var forecastImg = document.createElement("img");
            var forecastHeading = document.createElement("h4");
            forecastCard.className = "need to do this";
            fiveDayForecastDiv.appendChild(forecast);

            forecastHeading.textContent = moment.unix(forecastDay.dt).format('ll');
            forecastHeading.classList = "text-center";
            forecastCard.appendChild(forecastHeading);

            createDiv = document.createElement("div");
            createDiv.classList = "mx-auto bg-white border rounded mb-2";
            forecastCard.appendChild(createDiv);

            forecastImg.classList = "mx-auto d-block"
            forecastImg.src = "https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png";
            forecastHeading.appendChild(forecastImg);

            forecastHumidity = document.createElement("p");
            forecastHumidity.textContent = "Humidity: ${forecast.humidity}%";
            forecastCard.appendChild(forecastHumidity);

            forecastWind = document.createElement("p");
            forecastWind.textContent = "Wind: ${forecast.wind_speed} MPH";
            forecastCard.appendChild("forecastWind");

            forecastTemp = document.createElement("p");
            forecastTemp.textContent = "High: ${Math.floor(forecast.temp.max)} / Low: ${Math.floor(forecast.temp.min)}";
            forecastCard.appendChild(forecastTemp)
        }
    });
}

createLocalStorage();


