// I definitely could have written this in a much more succinct and less repetitive way, but I have been completely focused on project 1. This app is fully functional and should meet all required criteria. One major thing I learned during this assignment is how to use template literals. Something I plan to work on in the next few days is to prevent duplicate buttons. In the mean time, here's what I've got! 

var APIKey = "0234a5db053f0c8c1789c2487e8d0de2";
var buttonDiv = $(".button-div")
var cityButtonArr = []

loadData();

//function to clear out text before appending new data
function reloadData() {
  $("#city-title").empty();
  $("#temperature").empty();
  $("#wind-speed").empty();
};
//function to clear out the forecast before appending new data
function clearForecastBoxes() {
  for (i = 1; i < 6; i++) {
    $("#date" + i).empty();
  };
};

$("#form").on('submit', function (e) {
  e.preventDefault();
  var city = ""
  city = $("#city-input").val()
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var longitude = response.coord.lon
    var latitude = response.coord.lat

    $("#UV-index").empty()
    var uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${latitude}&lon=${longitude}`
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      $("#UV-index").text("UV Index: " + response.value)
      if(response.value > 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-danger")
      }
      if(response.value < 3){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-success")
      }
      if(response.value > 3 && response.value < 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-warning")
      }
    });

    var icon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

    $('#icon').html(`<img src="${icon}">`);
    $('#icon').attr("class", "icon")
    $("#city-title").empty()
    $("#city-title").append(response.name)
    $(".city").attr("style", "font-weight: bold; font-size: 30px")
    $("#wind-speed").empty()
    $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
    var convert = response.main.temp
    var F = (convert - 273.15) * 1.80 + 32
    F = F.toFixed(0)
    $("#temperature").empty()
    $("#temperature").append("Temperature: " + F + "°")

    forecastData();

    function forecastData() {
      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}35&lon=${longitude}&units=imperial&APPID=0234a5db053f0c8c1789c2487e8d0de2`
      $.ajax({
        url: forecastUrl,
        method: "GET"
      }).then(function (response) {
        console.log("forecast response")
        console.log(response)

        clearForecastBoxes();

        $("#date1").append(response.list[7].dt_txt.slice(5, 10))
        $('#date1').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
        $('#date1').append(`<img src="${icon}">`);
        $('#date1').attr("style", "font-size: 10px; text-align: center;")
        $('#date1').append("Temperature: " + response.list[7].main.temp.toFixed(0) + "°")
        $('#date1').append("<br>")
        $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")

        $("#date2").append(response.list[15].dt_txt.slice(5, 10))
        $('#date2').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
        $('#date2').append(`<img src="${icon}">`);
        $('#date2').attr("style", "font-size: 10px; text-align: center;")
        $('#date2').append("Temperature: " + response.list[15].main.temp.toFixed(0) + "°")
        $('#date2').append("<br>")
        $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")

        $("#date3").append(response.list[23].dt_txt.slice(5, 10))
        $('#date3').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
        $('#date3').append(`<img src="${icon}">`);
        $('#date3').attr("style", "font-size: 10px; text-align: center;")
        $('#date3').append("Temperature: " + response.list[23].main.temp.toFixed(0) + "°")
        $('#date3').append("<br>")
        $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")

        $("#date4").append(response.list[31].dt_txt.slice(5, 10))
        $('#date4').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
        $('#date4').append(`<img src="${icon}">`);
        $('#date4').attr("style", "font-size: 10px; text-align: center;")
        $('#date4').append("Temperature: " + response.list[31].main.temp.toFixed(0) + "°")
        $('#date4').append("<br>")
        $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")

        $("#date5").append(response.list[39].dt_txt.slice(5, 10))
        $('#date5').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
        $('#date5').append(`<img src="${icon}">`);
        $('#date5').attr("style", "font-size: 10px; text-align: center;")
        $('#date5').append("Temperature: " + response.list[39].main.temp.toFixed(0) + "°")
        $('#date5').append("<br>")
        $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
      })
    }

    generateButton();
    clearForm();

    function generateButton() {
      var create = $("<button>")
      create.attr("class", "btn btn-outline-secondary")
      create.attr("type", "button")
      create.text(response.name)
      buttonDiv.prepend(create)
      var cityString = response.name
      cityButtonArr.push(cityString.toString())
      localStorage.setItem("cityStorage", JSON.stringify(cityButtonArr))
    };
  })
});
//end of event handler... finally!

function loadData() {
  var loadData = localStorage.getItem("cityStorage")
  if (loadData == null || loadData == "") {
    return;
  }
  cityButtonArr = JSON.parse(loadData)
  for (i = 0; i < cityButtonArr.length; i++) {
    var create = $("<button>")
    create.attr("class", "btn btn-outline-secondary")
    // create.attr("type", "button")
    create.text(cityButtonArr[i])
    buttonDiv.prepend(create)
  };
};

$(".btn").on('click', function () {
  city = $(this).text()
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    reloadData();
    $("#city-title").append(response.name)
    $(".city").attr("style", "font-weight: bold; font-size: 30px")
    $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
    var convert = response.main.temp
    var F = (convert - 273.15) * 1.80 + 32
    F = F.toFixed(0)
    $("#temperature").append("Temperature: " + F + "°")

    var longitude = response.coord.lon
    var latitude = response.coord.lat

    $("#UV-index").empty()
    var uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${latitude}&lon=${longitude}`
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      console.log("UV LOG")
      $("#UV-index").text("UV Index: " + response.value)
      if(response.value > 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-danger")
      }
      if(response.value < 3){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-success")
      }
      if(response.value > 3 && response.value < 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-warning")
      }
    });

    forecastData();

    function forecastData() {
      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}35&lon=${longitude}&units=imperial&APPID=0234a5db053f0c8c1789c2487e8d0de2`
      $.ajax({
        url: forecastUrl,
        method: "GET"
      }).then(function (response) {
        console.log("forecast response")
        console.log(response)

        clearForecastBoxes();

        $("#date1").append(response.list[7].dt_txt.slice(5, 10))
        $('#date1').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
        $('#date1').append(`<img src="${icon}">`);
        $('#date1').attr("style", "font-size: 10px; text-align: center;")
        $('#date1').append("Temperature: " + response.list[7].main.temp.toFixed(0) + "°")
        $('#date1').append("<br>")
        $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")

        $("#date2").append(response.list[15].dt_txt.slice(5, 10))
        $('#date2').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
        $('#date2').append(`<img src="${icon}">`);
        $('#date2').attr("style", "font-size: 10px; text-align: center;")
        $('#date2').append("Temperature: " + response.list[15].main.temp.toFixed(0) + "°")
        $('#date2').append("<br>")
        $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")

        $("#date3").append(response.list[23].dt_txt.slice(5, 10))
        $('#date3').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
        $('#date3').append(`<img src="${icon}">`);
        $('#date3').attr("style", "font-size: 10px; text-align: center;")
        $('#date3').append("Temperature: " + response.list[23].main.temp.toFixed(0) + "°")
        $('#date3').append("<br>")
        $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")

        $("#date4").append(response.list[31].dt_txt.slice(5, 10))
        $('#date4').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
        $('#date4').append(`<img src="${icon}">`);
        $('#date4').attr("style", "font-size: 10px; text-align: center;")
        $('#date4').append("Temperature: " + response.list[31].main.temp.toFixed(0) + "°")
        $('#date4').append("<br>")
        $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")

        $("#date5").append(response.list[39].dt_txt.slice(5, 10))
        $('#date5').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
        $('#date5').append(`<img src="${icon}">`);
        $('#date5').attr("style", "font-size: 10px; text-align: center;")
        $('#date5').append("Temperature: " + response.list[39].main.temp.toFixed(0) + "°")
        $('#date5').append("<br>")
        $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
      })
    }
      })
    }
  );


//Function to clear the input field upon 'submit'
function clearForm() {
  $("form").trigger('reset');
}

//function to have a city pre-loaded
//Plan to pre-populate the page according to the location of the user
function initialize() {
  var city = ""
  if(cityButtonArr.length > 0){
  lastSearched = cityButtonArr.reverse()
  var city = lastSearched[0]
  } else {
  var city = "Atlanta"
  }
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    reloadData();
    console.log(response)
    var icon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

    $('#icon').html(`<img src="${icon}">`); //  ES6
    $('#icon').attr("class", "icon")

    $("#city-title").append(response.name)
    $(".city").attr("style", "font-weight: bold; font-size: 30px")
    $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
    var convert = response.main.temp
    var F = (convert - 273.15) * 1.80 + 32
    F = F.toFixed(0)
    $("#temperature").append("Temperature: " + F + "°")

    var longitude = response.coord.lon
    var latitude = response.coord.lat
    $("#UV-index").empty()
    let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      
      $("#UV-index").text("UV Index: " + response.value)
      if(response.value > 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-danger")
      }
      if(response.value < 3){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-success")
      }
      if(response.value > 3 && response.value < 7){
      $("#UV-index").removeClass()
      $("#UV-index").addClass("badge badge-warning")
      }
    });

    forecastData();

    function forecastData() {
      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}35&lon=${longitude}&units=imperial&APPID=0234a5db053f0c8c1789c2487e8d0de2`
      $.ajax({
        url: forecastUrl,
        method: "GET"
      }).then(function (response) {
        console.log("forecast response")
        console.log(response)

        clearForecastBoxes();

        $("#date1").append(response.list[7].dt_txt.slice(5, 10))
        $('#date1').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[7].weather[0].icon}@2x.png`
        $('#date1').append(`<img src="${icon}">`);
        $('#date1').attr("style", "font-size: 10px; text-align: center;")
        $('#date1').append("Temperature: " + response.list[7].main.temp.toFixed(0) + "°")
        $('#date1').append("<br>")
        $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")

        $("#date2").append(response.list[15].dt_txt.slice(5, 10))
        $('#date2').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`
        $('#date2').append(`<img src="${icon}">`);
        $('#date2').attr("style", "font-size: 10px; text-align: center;")
        $('#date2').append("Temperature: " + response.list[15].main.temp.toFixed(0) + "°")
        $('#date2').append("<br>")
        $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")

        $("#date3").append(response.list[23].dt_txt.slice(5, 10))
        $('#date3').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`
        $('#date3').append(`<img src="${icon}">`);
        $('#date3').attr("style", "font-size: 10px; text-align: center;")
        $('#date3').append("Temperature: " + response.list[23].main.temp.toFixed(0) + "°")
        $('#date3').append("<br>")
        $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")

        $("#date4").append(response.list[31].dt_txt.slice(5, 10))
        $('#date4').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[31].weather[0].icon}@2x.png`
        $('#date4').append(`<img src="${icon}">`);
        $('#date4').attr("style", "font-size: 10px; text-align: center;")
        $('#date4').append("Temperature: " + response.list[31].main.temp.toFixed(0) + "°")
        $('#date4').append("<br>")
        $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")

        $("#date5").append(response.list[39].dt_txt.slice(5, 10))
        $('#date5').append("<br>")
        var icon = `http://openweathermap.org/img/wn/${response.list[39].weather[0].icon}@2x.png`
        $('#date5').append(`<img src="${icon}">`);
        $('#date5').attr("style", "font-size: 10px; text-align: center;")
        $('#date5').append("Temperature: " + response.list[39].main.temp.toFixed(0) + "°")
        $('#date5').append("<br>")
        $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
      });
    };
      });
    };
    
    initialize();









