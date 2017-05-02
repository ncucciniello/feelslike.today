'use strict';

(() => {

  // Set "global" variables to be used later.
  let lat = '';
  let lng = '';
  let icon = $('<img>').attr('id', 'icon');
  let string = $('#string');

  function getLocation() {
    $.ajax({
      url:'http://ip-api.com/json',
      method: 'GET',
      dataType: 'JSON',
      success: (locationData) => {
        console.log(locationData.city);
        lat = locationData.lat;
        lng = locationData.lon;
        if ( lat == '') {
          $('#temp').html(`Can not find location.`);
        } else {
          getTemp();
        }
      }
    });
  }

  function getTemp() {
    $.ajax({
      url:`/weather?myLat=${lat}&myLong=${lng}`,
      method: 'GET',
      dataType: 'JSON',
      success: (tempData) => {
        console.log(tempData.currently.summary)

        // set temp to curent feels like temp and round it to whole number.
        $('#temp').html(`Feels like ${Math.round(tempData.currently.apparentTemperature)}°F today.`);

        // create and set icon to current weather type and string to match.
        icon.appendTo('body');

        if (tempData.currently.icon == 'clear-day') {
          icon.attr('src', '/assets/sunny.png');
          string.html('Bring your favorite sunglasses.');
        } else if (tempData.currently.icon == 'cloudy') {
            icon.attr('src', '/assets/cloudy.png');
            string.html('So many clouds right now.');
        } else if (tempData.currently.icon == 'partly-cloudy-day') {
            icon.attr('src', '/assets/partly_cloudy.png');
            string.html('The sun is trying to sneak out right now.');
        } else if (tempData.currently.icon == 'rain') {
            icon.attr('src', '/assets/rainy.png');
            string.html('Bring an umbrella on your journey.');
        } else if (tempData.currently.icon == 'wind') {
            icon.attr('src', '/assets/windy.png');
            string.html('Hang onto you cap, it’s windy right now.');
        } else if (tempData.currently.icon == 'fog') {
            icon.attr('src', '/assets/cloudy.png');
            string.html('Visibitly is low, the fog is rolling in.');
        } else if (tempData.currently.icon == 'clear-night') {
            icon.attr('src', '/assets/clear_night.png');
            string.html('The stars are looking good right now.');
        } else if (tempData.currently.icon == 'partly-cloudy-night') {
            icon.attr('src', '/assets/partly_cloudy_night.png');
            string.html('The moon is hiding behind some clouds.');
        } else if (tempData.currently.icon == 'snow') {
            icon.attr('src', '/assets/snow.png');
            string.html('Better bundle up, it’s snowing out there.');
        } else if (tempData.currently.icon == 'sleet') {
            icon.attr('src', '/assets/snow.png');
            string.html(`Don't slip, there is going to be sleet today.`);
        }

      }
    });
  }

  // on page load the getLocation function will run
  getLocation()

})();
