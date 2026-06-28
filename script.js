// ===============================
// OpenWeather API Key
// ===============================

const apiKey = "42846221c68e9aa2b83424052c7a716b";

// ===============================
// DOM Elements
// ===============================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const updatedTime = document.getElementById("updatedTime");
const weatherIcon = document.getElementById("weatherIcon");

// ===============================
// Search Button
// ===============================

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }

});

// ===============================
// Enter Key Search
// ===============================

cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        const city = cityInput.value.trim();

        if (city !== "") {
            getWeather(city);
        }

    }

});

// ===============================
// Fetch Weather
// ===============================

async function getWeather(city){

    loader.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    errorMessage.innerHTML = "";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    }

    catch(error){

        errorMessage.innerHTML = error.message;

    }

    finally{

        loader.classList.add("hidden");

    }

}

// ===============================
// Display Weather
// ===============================

function displayWeather(data){

    weatherCard.classList.remove("hidden");

    cityName.innerHTML = data.name;

    country.innerHTML = data.sys.country;

    temp.innerHTML =
        Math.round(data.main.temp) + "°C";

    description.innerHTML =
        data.weather[0].description;

    feelsLike.innerHTML =
        Math.round(data.main.feels_like) + "°C";

    humidity.innerHTML =
        data.main.humidity + "%";

    wind.innerHTML =
        data.wind.speed + " m/s";

    pressure.innerHTML =
        data.main.pressure + " hPa";

    visibility.innerHTML =
        (data.visibility / 1000).toFixed(1) + " km";

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    changeBackground(data.weather[0].main);

    sunrise.innerHTML =
        formatTime(data.sys.sunrise);

    sunset.innerHTML =
        formatTime(data.sys.sunset);

    updatedTime.innerHTML =
        new Date().toLocaleTimeString();

}

// ===============================
// Time Formatter
// ===============================

function formatTime(unixTime){

    const date = new Date(unixTime * 1000);

    return date.toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit"

    });

}
// ===============================
// Current Location Weather
// ===============================

const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            getLocationWeather,

            () => {
                errorMessage.innerHTML =
                "Unable to access your location.";
            }

        );

    } else {

        errorMessage.innerHTML =
        "Geolocation is not supported.";

    }

});

async function getLocationWeather(position){

    loader.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    errorMessage.innerHTML = "";

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){

            throw new Error("Unable to fetch location weather.");

        }

        const data = await response.json();

        displayWeather(data);

    }

    catch(error){

        errorMessage.innerHTML = error.message;

    }

    finally{

        loader.classList.add("hidden");

    }

}

// ===============================
// Theme Toggle
// ===============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("light")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

    else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});

// ===============================
// Refresh Weather
// ===============================

function refreshCurrentWeather(){

    const city = cityName.innerText;

    if(city && city !== "Chennai"){

        getWeather(city);

    }

}

// Refresh every 10 minutes

setInterval(refreshCurrentWeather,600000);

// ===============================
// Weather Background
// ===============================

function changeBackground(weather){

    const condition = weather.toLowerCase();

    if(condition.includes("clear")){

        document.body.style.background =
        "linear-gradient(-45deg,#4facfe,#00f2fe,#43e97b,#38f9d7)";

    }

    else if(condition.includes("cloud")){

        document.body.style.background =
        "linear-gradient(-45deg,#757f9a,#d7dde8,#6a85b6,#bac8e0)";

    }

    else if(condition.includes("rain")){

        document.body.style.background =
        "linear-gradient(-45deg,#314755,#26a0da,#3a6073,#16222a)";

    }

    else if(condition.includes("snow")){

        document.body.style.background =
        "linear-gradient(-45deg,#E6DADA,#274046,#dfe9f3,#ffffff)";

    }

    else if(condition.includes("thunder")){

        document.body.style.background =
        "linear-gradient(-45deg,#141E30,#243B55,#232526,#414345)";

    }

}

// ===============================
// Update Display Function
// ===============================

// displayWeather() function-la

// weatherIcon.src = ...

// athuku immediately keela

// intha line add pannu

// changeBackground(data.weather[0].main);

// ===============================
// Default Weather
// ===============================

window.addEventListener("load",()=>{

    getWeather("Chennai");

});
// =====================================
// Forecast Section
// =====================================

const forecastSection = document.getElementById("forecastSection");
const forecastCards = document.getElementById("forecastCards");

// =====================================
// Fetch 5-Day Forecast
// =====================================

async function getForecast(city){

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            return;
        }

        const data = await response.json();

        displayForecast(data);

    }

    catch(error){

        console.log(error);

    }

}

// =====================================
// Display Forecast
// =====================================

function displayForecast(data){

    forecastCards.innerHTML="";

    const daily = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    daily.forEach(day=>{

        const date = new Date(day.dt_txt);

        forecastCards.innerHTML += `

        <div class="forecast-card">

            <h4>
            ${date.toLocaleDateString("en-US",{weekday:"short"})}
            </h4>

            <img
            src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

            <p>${Math.round(day.main.temp)}°C</p>

            <p>${day.weather[0].main}</p>

        </div>

        `;

    });

    forecastSection.classList.remove("hidden");

}

// =====================================
// Search History
// =====================================

function saveSearch(city){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history = history.filter(item=>item!==city);

    history.unshift(city);

    history = history.slice(0,5);

    localStorage.setItem("history",
    JSON.stringify(history));

}

// =====================================
// Favorite Cities
// =====================================

function saveFavorite(city){

    let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

    if(!favorites.includes(city)){

        favorites.push(city);

        localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
        );

        alert(city + " added to favorites.");

    }

}

// =====================================
// Temperature Toggle
// =====================================

let currentUnit = "metric";

function toggleUnit(){

    currentUnit =
    currentUnit === "metric"
    ? "imperial"
    : "metric";

    getWeather(cityName.innerText);

}

// =====================================
// Update getWeather()
// =====================================

// getWeather() function-la

// fetch URL replace with:

// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}

// =====================================
// Update Display
// =====================================

// temp.innerHTML replace with:

temp.innerHTML =
Math.round(data.main.temp) +
(currentUnit==="metric" ? "°C" : "°F");

feelsLike.innerHTML =
Math.round(data.main.feels_like) +
(currentUnit==="metric" ? "°C" : "°F");

// =====================================
// Auto Forecast
// =====================================

// displayWeather(data);

// athuku immediately keela

// add

// getForecast(data.name);

// saveSearch(data.name);

// =====================================
// Console Message
// =====================================

console.log("Weather Dashboard Loaded Successfully");