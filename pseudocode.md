Weather Dashboard PsuedoCode:

Body:

Use bootstrap grid

-Container for all
-Header that spans full screen
-Row
-Col-4: background grey
    Form with label + search button + fontawesome magnifying glass
    h3- Search History
    div for creating buttons with for loop

-Col-8:
-card-8
-card body
-H1 #cityAndDate + #faIcon
br
-p Temperature: + #temp
br
-p Humidity: + #humidity
br
-p Wind Speed + #windspeed
br
-p UV Index: <span class badge>#uv index<span>p
-end card
br

H1- 5 day forecast:
div class = "card-group"

div class card 
h5- #date 
p #faIcon2
p Temp: + Temp[1]
p Humdity: + Humidity[1]
div class card 
h5- #date 
p #faIcon2
p Temp: + Temp[2]
p Humdity: + Humidity[2]
div class card 
h5- #date 
p #faIcon2
p Temp: + Temp[3]
p Humdity: + Humidity[3]
div class card 
h5- #date 
p #faIcon2
p Temp: + Temp[4]
p Humdity: + Humidity[4]
div class card 
h5- #date 
p #faIcon2
p Temp: + Temp[5]
p Humdity: + Humidity[5]


scripts:

var cityName
var searches
var faIcon


on click search, set text on form to CityName and save in local storage + unshift city name to array searches

function to populate search history{
    for (i = 0; i < 8; i++){
        append button co-4 with text searches[i]
    }
}

function for changing UV:
if response.UV or whatever is <= 3{
    add class badge-success
}
if response.UV or whatever is >= 8{
    add class badge-danger
}
if response.UV or whatever is >= 3 && < 8{
    add class badge-warning
}


function to choose faIcon{
    if response.whatever is = cloudy {
        faIcon=<i class= "fa fa-x">
    }
     if response.whatever is = Sunny {
        faIcon=<i class= "fa fa-x">
    }
     if response.whatever is = Rainy {
        faIcon=<i class= "fa fa-x">
    }
}