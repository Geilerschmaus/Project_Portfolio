
const favouriteCitys = [];



function getNewFavouriteCity() {

    const newFavouritecity = document.getElementById("newFavouriteCityInput");
    if(newFavouritecity.value.trim() === "") {
        alert("Cant add nothing to favourites" + "\n" + "Please insert a city name");
        return;
    }

    if (!favouriteCitys.includes(newFavouritecity.value)) {
    
        favouriteCitys.push(newFavouritecity.value);
        localStorage.setItem("favouriteCitys", JSON.stringify(favouriteCitys));
        displayFavouriteCitys();
        console.log(favouriteCitys);
    }
    else {
        alert("City already in favourites" + "\n" + "Please insert another city ");
    }
}

function deleteFavouriteCity() {

    const cityToDelete = document.getElementById("deleteFavouriteCityInput");
    const city = cityToDelete.value;
    if(city.trim() === "") {
        alert("Cant delete nothing from favourites" + "\n" + "Please insert a city name");
        return;
    }
    const cityExisting = favouriteCitys.some(favouriteCity => favouriteCity.toLowerCase() === city.toLowerCase());
    if (!cityExisting) {
        alert("Cant delete non-favourite city" + "\n" + "Please insert a valid city name");
        return;
    }
    
    const updatedFavouriteCitys = favouriteCitys.filter(favouriteCity => favouriteCity.toLowerCase() !== city.toLowerCase());
    localStorage.setItem("favouriteCitys", JSON.stringify(updatedFavouriteCitys));

    favouriteCitys.length = 0;
    favouriteCitys.push(...updatedFavouriteCitys);

    displayFavouriteCitys();
    alert(`removed ${city}`);
}

function clearAllFavouriteCities() {
    favouriteCitys.length = 0;
    localStorage.removeItem("favouriteCitys");
    displayFavouriteCitys();
    alert("All favourite cities cleared");
}

function displayFavouriteCitys() {

    const favouriteCitys = JSON.parse(localStorage.getItem("favouriteCitys")) || [];
    const favouriteCitysSection = document.getElementById("favouriteCitys-section");
    favouriteCitysSection.innerHTML = "";


    favouriteCitys.forEach(city => {
        const newCityDiv = document.createElement("div");
        const newCityPicture = document.createElement("img");
        const newCityName = document.createElement("h1");
        const watchCityForecast = document.createElement("a");
        
        switch(city.toLowerCase()) {
            case "vienna":
                newCityPicture.src = "./Bilder_Weather_Forecast/Wien-bild.jpg";
                break;
            case "moskau":
                newCityPicture.src = "./Bilder_Weather_Forecast/Moskau.jpg";
                break;
            case "new york":
                newCityPicture.src = "./Bilder_Weather_Forecast/new-york.jpg";
                break;
            default:
                newCityPicture.src = "./Bilder_Weather_Forecast/Berlin.jpg";
                newCityPicture.alt = "No image available";
        }

        newCityName.textContent = city;
        if(city.trim() !== ""){

            newCityDiv.classList.add(city.replace(/\s+/g, '-'));
        }

        watchCityForecast.textContent = "Watch Forecast";
        watchCityForecast.href = "./index.html";
        watchCityForecast.id = city.replace(/\s+/g, '-');
        watchCityForecast.classList.add("forecast-link");
        
        

        favouriteCitysSection.appendChild(newCityDiv);

        newCityDiv.appendChild(newCityPicture);
        newCityDiv.appendChild(newCityName);
        newCityDiv.appendChild(watchCityForecast);

        
    });

    saveCityNameLocalStorage();
    
}

function saveCityNameLocalStorage() {
    const watchCityForecast = document.querySelectorAll(".forecast-link");

    watchCityForecast.forEach(city => {
        city.addEventListener("click",(event) => {
            
            event.preventDefault();

            const toSaveCity = city.id;
            localStorage.setItem("selectedCity", toSaveCity);

            globalThis.location.href = city.href;
        })
    })
    


}

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

    const storedFavouriteCitys = localStorage.getItem("favouriteCitys");

    if (storedFavouriteCitys) {

        favouriteCitys.push(...JSON.parse(storedFavouriteCitys));
    }

    displayFavouriteCitys();
    saveCityNameLocalStorage();
})

