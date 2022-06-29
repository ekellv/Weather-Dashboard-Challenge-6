var APIKey = "d9473ab184f20ced8ecd4867185cb643"
var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


var citySearchForm = document.getElementById("city-search-form");
var searchHistory = document.getElementById("search-history");
var userSearchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var clearStorageButton = document.getElementById("clear-storage");
var locationName = document.getElementById("location-name");
var todaysDate = document.getElementById("todays-date");
var todaysWeatherIcon = document.getElementById("todays-weather");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUVIndex = document.getElementById("current-uv");
var fiveDayForecastDiv = document.getElementById("five-day-forecast");


