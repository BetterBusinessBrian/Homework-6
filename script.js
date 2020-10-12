var APIKey = "4c19bdbf48f17cef671da21f63c3f39d";
var lastCity = localStorage.getItem("lastCity")

//On Start
getForecast(lastCity);
searchHistory();

// New City Search
$(".search").on("click", function () {
    cityName = $(".form-control").val();
    localStorage.setItem("lastCity", cityName)
    getSetHistory();
    getForecast(cityName);
    window.location.href = "index.html";
})
// Searching History
$(".historyButton").on("click", function () {
    cityName = $(this).text();
    getForecast(cityName);
})

// appending history
function getSetHistory() {
    var storedCities = JSON.parse(localStorage.getItem("cityArray")) || [];
    storedCities.push(cityName);
    localStorage.setItem("cityArray", JSON.stringify(storedCities));
}
// Populate Search History
function searchHistory() {
    var storedCities = JSON.parse(localStorage.getItem("cityArray")) || [];
    for (i = 0; i < storedCities.length; i++) {
        var newBtn = $('<button/>', { text: storedCities[i] })
        newBtn.addClass("historyButton rounded")
        $(".historyDiv").append(newBtn)
        $(".historyDiv").append($("<br>"));
    }
}

//function to fill all fields
function getForecast(cityName) {

    var city = cityName;
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        var lat = response.city.coord["lat"];
        var lon = response.city.coord["lon"];
        var cityDetail = response;
        var cityTitle = cityDetail.city.name;

        // Setting Date
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear()
        var date = "(" + (day < 10 ? '0' : '') + day + '/' +
            (month < 10 ? '0' : '') + month + '/' + year + ")";

        // Displaying from first API
        $(".cityName").text(cityTitle + " - " + date)

        // Using latitude and Longitude from previous API to get complete data from next API
        var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely,alert&appid=510c7f3ff27ad1727021b6aa3db8d1b0"

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // Update Current Data
            var temp = Math.round(response.current.temp) + "°"
            var humidity = response.current.humidity + "%"
            var windspeed = response.current.wind_speed + "MPH"
            var uvIndex = response.current.uvi
            var iconCode = response.current.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

            $(".headIcon").attr("src", iconUrl);
            $(".temp").text("Temperature: " + temp);
            $(".humid").text("Humdity: " + humidity);
            $(".windspeed").text("Wind Speed: " + windspeed)
            $(".UVi").text("UV Index: " + uvIndex);



            // Changing the UV Index's Color
            var UVtest = parseFloat(JSON.stringify(uvIndex))

            if (UVtest < 3) {
                $(".UVi").addClass("badge-success")
            }
            if (UVtest > 3) {
                $(".UVi").addClass("badge-warning")
            }
            if (UVtest >= 8) {
                $(".UVi").addClass("badge-danger")
            }

            //For Loop for filling out cards
            for (i = 1; i < 6; i++) {
                $(".card-title").each(function () {
                    var index = parseInt($(this).attr('id'))
                    if (i == index) {
                        var d = new Date(response.daily[i].dt * 1000)
                        var month = d.getMonth() + 1;
                        var day = d.getDate();
                        var year = d.getFullYear()
                        var date = "(" + (day < 10 ? '0' : '') + day + '/' +
                            (month < 10 ? '0' : '') + month + '/' + year + ")";
                        $(this).text(date)
                    }
                    $(".forecastTemp").each(function () {
                        var index = parseInt($(this).attr('id'))
                        if (i == index) {
                            var forecastTemp = "Temperature: " + Math.round(response.daily[i].temp.day) + "°"
                            $(this).text(forecastTemp)
                        }
                    })
                    $(".forecastHumid").each(function () {
                        var index = parseInt($(this).attr('id'))
                        if (i == index) {
                            var forecastHumid = "Humidity: " + response.daily[i].humidity + "%";
                            $(this).text(forecastHumid);
                        }
                    })
                    $(".icon").each(function () {
                        var index = parseInt($(this).attr('id'))
                        if (i == index) {
                            var iconCode = response.daily[i].weather[0].icon;
                            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                            $(this).attr("src", iconUrl);
                        }
                    })

                });

            }

        });
    });
};