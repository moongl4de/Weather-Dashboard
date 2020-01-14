var APIKey = "0234a5db053f0c8c1789c2487e8d0de2";
var buttonDiv = $(".button-div")
var cityButtonArr = []
var testCounter = 0


$("#form").on('submit', function(e){
  e.preventDefault();
  var city=""
  
  city = $("#city-input").val()
  
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
   
  }).then(function(response) {
    console.log(queryURL)
    
    console.log(response)
    $("#city-title").empty()
    $("#city-title").append(response.name)
    $(".city").attr("style", "font-weight: bold; font-size: 30px", )
    $("#wind-speed").empty()
    $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
    var convert = response.main.temp
    var F = (convert - 273.15) * 1.80 + 32
    F = F.toFixed(0)
    console.log(F)
    $("#temperature").empty()
    $("#temperature").append("Temperature: " + F + "°")
    
    generateButton();

    function generateButton() {
      $("#city-input").text("")
      var create = $("<button>")
      create.attr("class", "btn btn-outline-secondary")
      create.attr("type", "button")
      create.text(response.name)
      buttonDiv.prepend(create)
      
      var cityString = response.name
      cityButtonArr.push(cityString.toString())
      
      localStorage.setItem("cityStorage", JSON.stringify(cityButtonArr))
      console.log("cityarray" + cityButtonArr)
      
    }
  }
  )
})

loadData();

function loadData(){
  console.log("array" + cityButtonArr)
  var loadData = localStorage.getItem("cityStorage")
  var loadedArr = JSON.parse(loadData)
  console.log("loadedArr" + loadedArr) 

 

  if(loadedArr != null && loadedArr != ""){
  cityButtonArr.push(loadedArr)
  for(i=0; i<cityButtonArr.length;i++){
    console.log("i" + i)
    var create = $("<button>")
    create.attr("class", "btn btn-outline-secondary")
    create.attr("type", "button")
    create.text(cityButtonArr[i])
    buttonDiv.prepend(create)
  }
}
 
  console.log(cityButtonArr.length)
}





