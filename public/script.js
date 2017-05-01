'use strict';

(() => {

  // Set "global" variables to be used later.
  let lat = '';
  let lng = '';
  let icon = $('<img>').attr('id', 'icon');

  function getLocation() {
    $.ajax({
      url:'http://ip-api.com/json',
      method: 'GET',
      dataType: 'JSON',
      success: (locationData) => {
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

        // set temp to curent feels like temp and round it to whole number.
        $('#temp').html(`Feels like ${Math.round(tempData.currently.apparentTemperature)}°F today.`);

        // create and set icon to current weather type and string to match.
        // ** missing fog, clear-night, partly-cloudy-night, snow, & sleet **
        icon.appendTo('body');

        if (tempData.currently.icon == 'cloudy') {
          icon.attr('src', '/assets/cloudy.png');
          $('#string').html('So many clouds right now.');
        } else if (tempData.currently.icon == 'partly-cloudy-day') {
            icon.attr('src', '/assets/partly_cloudy.png');
            $('#string').html('The sun is trying to sneak out right now.');
        } else if (tempData.currently.icon == 'partly-cloudy-night') {
            icon.attr('src', '/assets/cloudy.png');
            $('#string').html('The moon is hiding behind some clouds.');
        } else if (tempData.currently.icon == 'rain') {
            icon.attr('src', '/assets/rainy.png');
            $('#string').html('Bring an umbrella on your journey.');
        } else if (tempData.currently.icon == 'clear-day') {
            icon.attr('src', '/assets/sunny.png');
            $('#string').html('Bring your favorite sunglasses.');
        } else if (tempData.currently.icon == 'clear-night') {
            icon.attr('src', '/assets/cloudy.png');
            $('#string').html('The moon and stars are looking good right now.');
        }  else if (tempData.currently.icon == 'wind') {
            icon.attr('src', '/assets/windy.png');
            $('#string').html('Hang onto you cap, it’s windy right now.');
        }

      }
    });

  }

  // on page load the getLocation function will run
  getLocation()

})();
