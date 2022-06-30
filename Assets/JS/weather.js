var APIKey = "d9473ab184f20ced8ecd4867185cb643"
var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// DOM Elements Variable Declaration
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
        searchHistory.appendChild(cityListItem)''
    }
    // reset the search to blank once the query has been stored
    userSearchInput.value = "";
};

// function to clear searches!!!!!!

citySearchForm.addEventListener("submit", function(event) {
    searchedCityWeather.style.display = "block";
    event.preventDefault();
    var input = userSearchInput.value;
    if (input.length > 0 ) {
        currentCityWeather(input);
        userCitySearches.unshift(input);
        if (userCitySearches.length = maxUserCitySearches) {
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
    var APIKey = "d9473ab184f20ced8ecd4867185cb643"
    var city;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        return response.JSON();
    })
    .then (function (weather) {
        var longitude = weather.location.lon;
        var latitude = weather.location.lat;
        city.textContent = weather.location.name + , weather.location.region;
        todaysDate.textContent = today.format(MMMM D, YYYY);
        todaysWeatherIcon.src = "https:" + weather.current.condition.icon;
        currentTemp.textContent = weather.current.temp_f;
        currentWind.textContent = weather.current.humidity;
        currentHumidity.textContent = weather.current.wind_mph;
        currentUVIndexColor(weather.current.uvi);
        getFiveDayForecast(latitude, longitude)
    });
};


