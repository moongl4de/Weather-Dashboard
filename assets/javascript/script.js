var APIKey = "0234a5db053f0c8c1789c2487e8d0de2";
var city = "Atlanta"
    

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  // Create CODE HERE to Log the queryURL
  console.log(queryURL)
  // Create CODE HERE to log the resulting object
  console.log(response)
  // Create CODE HERE to transfer content to HTML
  $(".city").append(response.name)
  $(".city").attr("style", "font-weight: bold; font-size: 30px", )
  $(".wind").append("Wind speed " + response.wind.speed)
  $(".humidity").append("Humidity: " + response.main.humidity)
  var convert = response.main.temp
  var F = (convert - 273.15) * 1.80 + 32
  F = F.toFixed(2)
  console.log(F)
  $(".temp").append("Temperature: " + F)
  // Create CODE HERE to calculate the temperature (converted from Kelvin)

  // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
  // Create CODE HERE to dump the temperature content into HTML
  

});