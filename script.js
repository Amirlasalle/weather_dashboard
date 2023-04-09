var searchBtn = document.querySelector("#search-btn");


searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    var city = document.querySelector("#city").value;
    var previousSearch = JSON.parse(localStorage.getItem("weather")) || []
    previousSearch.push(city)
    localStorage.setItem("weather", JSON.stringify(previousSearch))

    console.log("searching for city", city)
    fiveDayForecast(city)
    currentDayForecast(city)
});


var API = "8900debc433c038db6f38ffdd6df8280"

function fiveDayForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}&units=imperial`)
    .then(res => res.json())
    .then((data) => {
                console.log("Sucessfully Fetching", data);
                var cardsHTML = ""
                for(let i=0;i<data.list.length;i=i+8){
                    cardsHTML += `
                    <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">${data.list[i].dt_txt}</div>
  <div class="card-body">
    <h5 class="card-title">Temp: ${data.list[i].main.temp}
    <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>
    </h5>
    <p class="card-text">Wind Speed: ${data.list[i].wind.speed}</p>
    <p class="card-text" >Humidity: ${data.list[i].main.humidity}</p>
  </div>
</div>
                    `
                }
        document.getElementById("5-dayForcast").innerHTML = cardsHTML;

               
    })
};


// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function currentDayForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=imperial`)
    .then(res => res.json())
    .then((data) => {
                console.log("Sucessfully Fetching", data);
                var cardsHTML = ""
    
                    cardsHTML += `
                    <div class="card text-bg-warning mb-3" style="max-width: 18rem;">
  <div class="card-header">${city}</div>
  <div class="card-body">
    <h5 class="card-title">Temp: ${data.main.temp}
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    </h5>
    <p class="card-text">Wind Speed: ${data.wind.speed}</p>
    <p class="card-text" >Humidity: ${data.main.humidity}</p>
  </div>
</div>
                    `
          
        document.getElementById("current-city").innerHTML = cardsHTML;

               
    })
};

