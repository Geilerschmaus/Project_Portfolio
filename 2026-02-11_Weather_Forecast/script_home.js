
let urlToday = null;
let urlForecast = null;
const forecastArray = [];

let weatherDataToday = null;
let tempToday = null;
let tempFeelsLike = null;
let description = null;
let dataToday = null;

function switchTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function applyTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

async function findCoordinates() {
    
    const cityName = localStorage.getItem("selectedCity");
    if (!cityName) return null;
    
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${_API_KEY}`;
    
    const response = await fetch(geocodingUrl);
    const geocodingdata = await response.json();
    
    if (!geocodingdata || geocodingdata.length === 0) return null;
    
    const LAT = geocodingdata[0].lat;
    const LON = geocodingdata[0].lon;
    
    const usedUnit = localStorage.getItem("usedUnit") || "metric";
    urlToday = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${_API_KEY}&units=${usedUnit}`;
    urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${_API_KEY}&units=${usedUnit}`;
    
}

function updateTime() {
    
    const timeTextfield = document.getElementById("t-timeUpdated")
    
    const datum = new Date();
    datum.setDate(datum.getDate());
    
    const stunden = String(datum.getHours()).padStart(2, "0");
    const minuten = String(datum.getMinutes()).padStart(2, "0");
    const sekunden = String(datum.getSeconds()).padStart(2, "0");
    
    const timeNow = ` ${stunden}:${minuten}:${sekunden}`;
    
    timeTextfield.textContent = `Last updated: ${timeNow}`
    
}

function switchUnits() {
    
    let usedUnit = localStorage.getItem("usedUnit") || "metric";
    
    if(usedUnit === "metric"){
        usedUnit = "imperial";
    }
    else if(usedUnit === "imperial"){
        usedUnit = "metric";
    }
    
    localStorage.setItem("usedUnit", usedUnit);

}

async function getWeatherToday(urlToday){
    const response = await fetch(urlToday);
    weatherDataToday = await response.json();
    return weatherDataToday;
    
}

async function getWeatherForecast(urlForecast){
    const response = await fetch(urlForecast);
    const forecastData = await response.json();
    
    forecastArray.length = 0;
    
    for(let day = 1; day <= 5; day++){
        const datum = new Date();
        datum.setDate(datum.getDate() + day);
        const jahr = datum.getFullYear();
        const monat = String(datum.getMonth() + 1).padStart(2, '0');
        const tag = String(datum.getDate()).padStart(2, '0');
        const timeComparer = `${jahr}-${monat}-${tag} 12:00:00`;
        
        const matchingForecast = forecastData.list.find(item => item.dt_txt === timeComparer);
        
        if(matchingForecast){
            const unit = localStorage.getItem("usedUnit") || "metric";
            const tempUnit = unit === "metric" ? "°C" : "°F";
            forecastArray.push(`Temperature: ${matchingForecast.main.temp}${tempUnit}`);
            forecastArray.push(`Feels like: ${matchingForecast.main.feels_like}${tempUnit}`);
            forecastArray.push(`Weather type: ${matchingForecast.weather[0].main}`);
        }
        else{
            forecastArray.push('Temperature: N/A');
            forecastArray.push('Feels like: N/A');
            forecastArray.push('Weather type: N/A');
        }
    }
}

function insertForecastText(forecastArray) {

    const textInsertForecast = document.querySelectorAll('#w-forecast-1, #w-forecast-2, #w-forecast-3, #w-forecast-4, #w-forecast-5');
    if (!textInsertForecast || textInsertForecast.length === 0) return;
    for(let divCounter = 0; divCounter < textInsertForecast.length; divCounter++){
        for(let h3Counter = 0; h3Counter < 3; h3Counter++){
            textInsertForecast[divCounter].querySelectorAll('h3')[h3Counter].textContent = forecastArray[divCounter * 3 + h3Counter];
        }
    }
}

function insertTemperatureToday(weatherDataToday){

    if (!weatherDataToday || !weatherDataToday.main) return;

    const tempTodayEl = document.getElementById("t-temp");
    const tempFeelsLikeEl = document.getElementById("t-tempFeelsLike");
    const descriptionEl = document.getElementById("t-description");
    const cityNameTextfield = document.getElementById("t-City");
    
    if (!tempTodayEl || !tempFeelsLikeEl || !descriptionEl || !cityNameTextfield) return;

    const cityName = localStorage.getItem("selectedCity");

    const unit = localStorage.getItem("usedUnit") || "metric";
    const tempUnit = unit === "metric" ? "°C" : "°F";

    tempTodayEl.textContent = `Temperature: ${weatherDataToday.main.temp}${tempUnit}`;
    tempFeelsLikeEl.textContent = `Feels like: ${weatherDataToday.main.feels_like}${tempUnit}`;
    descriptionEl.textContent = `Weather condition: ${weatherDataToday.weather[0].main}`;
    
    
    cityNameTextfield.textContent = `City: ${cityName}`;
}

function insertWeatherToday(weatherDataToday){

    if (!weatherDataToday || !weatherDataToday.weather) return;

    const weatherToday = document.querySelectorAll('#w-type h3');
    if (!weatherToday || weatherToday.length < 3) return;
    
    weatherToday[0].textContent = 'Weather conditions today: ' + weatherDataToday.weather[0].main;
    weatherToday[1].textContent = 'Detailed weather: ' + weatherDataToday.weather[0].description;
    weatherToday[2].textContent = 'Wind speed: ' + weatherDataToday.wind.speed + ' m/s';
    

}


function insertPicturesToday(weatherDataToday){

    if (!weatherDataToday || !weatherDataToday.weather) return;

    const imgWeather = document.querySelectorAll('#w-type img')
    if (!imgWeather || imgWeather.length === 0) return;
    
    const weatherType = weatherDataToday.weather[0].main;

    switch(weatherType){
        case "Rain" : 
            imgWeather[0].src = "./Bilder_Weather_Forecast/regen.jpg"
            break;
        case "Clouds" :
            imgWeather[0].src = "./Bilder_Weather_Forecast/wolke-sonne.jpg"
            break;
        case "Clear" :
            imgWeather[0].src = "./Bilder_Weather_Forecast/sonnig.jpg"
            break;
        default :
            imgWeather[0].src = "./Bilder_Weather_Forecast/wolke.jpg"
            break;
    }
        
}

function insertPicturesForecast(forecastArray){
    
    const imgForecast = document.querySelectorAll('#w-forecast-1 img, #w-forecast-2 img, #w-forecast-3 img, #w-forecast-4 img, #w-forecast-5 img');
    if (!imgForecast || imgForecast.length === 0) return;
    
    for(let i = 0; i < 5; i++){
        const weatherType = forecastArray[i * 3 + 2].split(': ')[1];

        switch(weatherType){

            case "Rain" : 
                imgForecast[i].src = "./Bilder_Weather_Forecast/regen.jpg"
                break;
            case "Clouds" :
                imgForecast[i].src = "./Bilder_Weather_Forecast/wolke-sonne.jpg"
                break;
            case "Clear" :
                imgForecast[i].src = "./Bilder_Weather_Forecast/sonnig.jpg"
                break;
            default :
                imgForecast[i].src = "./Bilder_Weather_Forecast/wolke.jpg"
        
                break;
        
        }
    }

}

function insertDateForecast(){

    const forecastDates = document.querySelectorAll('#w-forecast-1 h2, #w-forecast-2 h2, #w-forecast-3 h2, #w-forecast-4 h2, #w-forecast-5 h2');
    if (!forecastDates || forecastDates.length === 0) return;

    for(let day = 1; day <= 5; day++){
        const datum = new Date();
        datum.setDate(datum.getDate() + day);
        const jahr = datum.getFullYear();
        const monat = String(datum.getMonth() + 1).padStart(2, '0');
        const tag = String(datum.getDate()).padStart(2, '0');
        const timeComparer = `${jahr}-${monat}-${tag} 12:00`;

        forecastDates[day-1].textContent = timeComparer;
    }
}


document.addEventListener("DOMContentLoaded",async () =>{
    
    applyTheme();
    
    const isHomePage = document.getElementById("w-today") !== null;
    if (!isHomePage) return;
    
    const unitsSwitchButton = document.getElementById("unitsSwitchButton");
    
    const coords = await findCoordinates();
    if (!coords && !urlToday) return;
    
    await getWeatherForecast(urlForecast);
    dataToday = await getWeatherToday(urlToday);

    if (!dataToday) return;

    insertWeatherToday(dataToday);
    insertTemperatureToday(dataToday);
    insertForecastText(forecastArray);
    insertPicturesToday(dataToday);
    insertPicturesForecast(forecastArray);
    insertDateForecast();
    updateTime();

    if (unitsSwitchButton) {
        unitsSwitchButton.addEventListener("click", async () => {

            switchUnits();

            await findCoordinates();
            if (!urlToday) return;

            await getWeatherForecast(urlForecast);
            dataToday = await getWeatherToday(urlToday);
            
            if (!dataToday) return;
        
            insertWeatherToday(dataToday);
            insertTemperatureToday(dataToday);
            insertForecastText(forecastArray);
            insertPicturesToday(dataToday);
            insertPicturesForecast(forecastArray);
            insertDateForecast();
            updateTime();
        });
    }

})


setInterval(async () => {

    if (!urlToday || !urlForecast) return;

    await findCoordinates();
    await getWeatherForecast(urlForecast);
    dataToday = await getWeatherToday(urlToday);

    insertWeatherToday(dataToday);
    insertTemperatureToday(dataToday);
    insertForecastText(forecastArray);
    insertPicturesToday(dataToday);
    insertPicturesForecast(forecastArray);
    insertDateForecast();
    updateTime();

}, 300000);
