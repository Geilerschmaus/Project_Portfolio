
const urlWienHeute = "https://api.openweathermap.org/data/2.5/weather?lat=48.19044082578702&lon=16.340154513565395&appid=0b62ed9ae380b0ff96221d9e5c721fd8&units=metric";
const urlWienForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=48.19044082578702&lon=16.340154513565395&appid=0b62ed9ae380b0ff96221d9e5c721fd8&units=metric";
const forecastArray = [];

let data = null;
let tempToday = null;
let tempFeelsLike = null;
let description = null;
let dataToday = null;




async function getWeatherToday(urlToday){
    const response = await fetch(urlToday);
    data = await response.json();
    console.log('API Response:', data); 
    console.log('tempToday element:', tempToday);
    return data;
    
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
            forecastArray.push(`Temperature: ${matchingForecast.main.temp}°C`);
            forecastArray.push(`Feels like: ${matchingForecast.main.feels_like}°C`);
            forecastArray.push(`Weather type: ${matchingForecast.weather[0].main}`);
        } else {
            forecastArray.push('Temperature: N/A');
            forecastArray.push('Feels like: N/A');
            forecastArray.push('Weather type: N/A');
        }
    }
}

function insertForecastText(forecastArray) {

    const textInsertForecast = document.querySelectorAll('#w-forecast-1, #w-forecast-2, #w-forecast-3, #w-forecast-4, #w-forecast-5');
    for(let divCounter = 0; divCounter < textInsertForecast.length; divCounter++){
        for(let h3Counter = 0; h3Counter < 3; h3Counter++){
            textInsertForecast[divCounter].querySelectorAll('h3')[h3Counter].textContent = forecastArray[divCounter * 3 + h3Counter];
        }
    }
}

function insertTemperatureToday(data){
    
    tempToday = document.getElementById("t-temp");
    tempFeelsLike = document.getElementById("t-tempFeelsLike");
    description = document.getElementById("t-description");

    tempToday.textContent = `Temperature: ${data.main.temp}°C`;
    tempFeelsLike.textContent = `Fühlt sich an wie: ${data.main.feels_like}°C`;
    description.textContent = `Wetterbedingung: ${data.weather[0].main}`;
    
}

function insertWeatherToday(data){

    const weatherToday = document.querySelectorAll('#w-type h3');

    weatherToday[0].textContent = 'Wetterbedingungen Heute: ' + data.weather[0].main;
    weatherToday[1].textContent = 'Wetterbedingungen spezifischer: ' + data.weather[0].description;
    weatherToday[2].textContent = 'Windgeschwindigkeit: ' + data.wind.speed + ' m/s';
}


function insertPicturesToday(data){

    const imgWeather = document.querySelectorAll('#w-type img')
    const weatherType = data.weather[0].main;

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



document.addEventListener("DOMContentLoaded",async () =>{


        
    await getWeatherForecast(urlWienForecast);
    dataToday = await getWeatherToday(urlWienHeute);


    insertWeatherToday(dataToday);
    insertTemperatureToday(dataToday);
    insertForecastText(forecastArray);
    insertPicturesToday(dataToday);
    insertPicturesForecast(forecastArray);
    


})
