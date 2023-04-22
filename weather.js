// Event listener for form submission

$("#zipForm").on("submit", function (e) {
  e.preventDefault();
  // Get zip code input value
  let zipCode = $("#zipCode").val();
  
  // check for valid zip code
  let re = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$"); // define regular exp to check zip code
  
  if (!zipCode.match(re)) { ////check if zip code is matching with regular exp or not
    
  // set all divs to empty strings to replace the weather details when user inputs invalid zip code  
    $("#city").html("");
    $("#currentTemp").html("");
    $("#conditions").html("");
    $("#Max").html("");
    $("#Min").html("");

    $("#error").html("PLEASE ENTER A VALID ZIP CODE"); //print the error msg on page
    return false;
  }

  const apiKey = "bd8d8651f1247a304b6bdcfff9a9d09e"; // my API key
  const apiUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;

  $("#error").html(""); //set error div to empty string to replace error with weather details

  // Fetch data from the OpenWeatherMap API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Extract relevant geolocation information from the API response
      const latitude = data.lat;
      const longitude = data.lon;

      // Use OpenWeatherMap API to get current weather
      $.getJSON(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
        function (data) {
          console.log(data);
          let date = new Date(data.dt * 1000);
          let weather = data.weather[0].description;
          let temperature = Math.round(data.main.temp);
          let tempMax = Math.round(data.main.temp_max);
          let tempMin = Math.round(data.main.temp_min);
          let city = data.name;
          let country = data.sys.country;

          // Display weather information
          const weatherInfo1 = `Current Weather in ${city}, ${country}:<br><br>Date: ${date}<br>`;
          $("#city").html(weatherInfo1);
          const weatherInfo3 = `Current Temperature: ${temperature} &deg;F<br>`;
          $("#currentTemp").html(weatherInfo3);
          const weatherInfo4 = `Weather: ${weather}`;
          $("#conditions").html(weatherInfo4);
          const weatherInfo5 = `Max Temperature: ${tempMax} &deg;F`;
          $("#Max").html(weatherInfo5);
          const weatherInfo6 = `Min Temperature: ${tempMin} &deg;F`;
          $("#Min").html(weatherInfo6);
        }
      )
        .done(function () {
          console.log("Weather data retrieved successfully");
        })
        .fail(function () {
          console.error("Failed to retrieve weather data");
        });
    });
});
