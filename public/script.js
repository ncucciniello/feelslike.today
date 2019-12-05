'use strict';

(() => {

  // Set "global" variables.
  let lat = '';
  let lng = '';
  let icon = $('<img>').attr('id', 'icon');
  let string = $('#string');
  let hourlyData = [];

  function getLocation() {
    $.ajax({
      url:'http://ip-api.com/json',
      method: 'GET',
      dataType: 'JSON',
      success: (locationData) => {
        // console.log('Location = ' + locationData.city);
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
      url:`/weather?myLat=${lat}&myLong=${lng}?exclude=minutely,daily,flags`,
      method: 'GET',
      dataType: 'JSON',
      success: (tempData) => {
        // console.log('Current Weather Summary = ' + tempData.currently.summary)
        hourlyData = tempData.hourly.data
        // console.log(tempData)

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
            string.html('Looking good out there.');
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
            string.html('A couple clouds are hanging out with the moon.');
        } else if (tempData.currently.icon == 'snow') {
            icon.attr('src', '/assets/snow.png');
            string.html('Better bundle up, it’s snowing out there.');
        } else if (tempData.currently.icon == 'sleet') {
            icon.attr('src', '/assets/snow.png');
            string.html(`Don't slip, there is going to be sleet today.`);
        }
      getHourlyInfo();
      }
    });
  }

  function getHourlyInfo() {
    // console.log(convertTimestamp(hourlyData[0].time).date)
    hourlyData.forEach((item) => {
      if (convertTimestamp(item.time).date == convertTimestamp(hourlyData[0].time).date) {
        let img = $('<img>').attr('id', 'hourImg');

        if (item.icon == 'clear-day') {
          img.attr('src', '/assets/sunny.png');
        } else if (item.icon == 'cloudy') {
            img.attr('src', '/assets/cloudy.png');
        } else if (item.icon == 'partly-cloudy-day') {
            img.attr('src', '/assets/partly_cloudy.png');
        } else if (item.icon == 'rain') {
            img.attr('src', '/assets/rainy.png');
        } else if (item.icon == 'wind') {
            img.attr('src', '/assets/windy.png');
        } else if (item.icon == 'fog') {
            img.attr('src', '/assets/cloudy.png');
        } else if (item.icon == 'clear-night') {
            img.attr('src', '/assets/clear_night.png');
        } else if (item.icon == 'partly-cloudy-night') {
            img.attr('src', '/assets/partly_cloudy_night.png');
        } else if (item.icon == 'snow') {
            img.attr('src', '/assets/snow.png');
        } else if (item.icon == 'sleet') {
            img.attr('src', '/assets/snow.png');
        }
        let temp = $('<p id=hourTemp />').append(Math.round(item.temperature) + '°F');
        let time = $('<p id=hourTime />').append(convertTimestamp(item.time).time) ;
        let panel = $('<div>').attr('class', 'hourPanel')
        panel.append(img, temp, time);
        $('#hourlyPanel').append(panel)
      }
    });
  }

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),     // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),   // Add leading 0.
      ampm = 'AM',
      timeInfo;

    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh == 0) {
      h = 12;
    }

    timeInfo =
    {
      date: mm + '/' + dd + '/' + yyyy,
      time: h + ':' + min + ampm
    }
    return timeInfo;
  }

  function toggleHourly() {
    //If animated than we wait the animation to be over
    if ($(':animated').length) {
      return false;
    }

    if ($('#hourlyPanel').css('display') == 'block') {
      var height = '-=' + $('#hourlyPanel').height();
      var oppHeight = '+=' + $('#hourlyPanel').height();
    } else {
      var height = '+=' + $('#hourlyPanel').height();
      var oppHeight = '-=' + $('#hourlyPanel').height();
    }

    $("#hourlyPanel").slideToggle("slow");

    $("#main").animate({
      bottom: height
    }, "slow")

    $("#icon").animate({
      top: oppHeight
    }, "slow")
  }


  function setHeight() {
    $('#main').height(window.innerHeight);
  }

  // on page load the getLocation function will run
  getLocation()
  setHeight();

  if($(window).width() < 850 ) {
    $('#main').click(toggleHourly);
  } else {
      $("#hourly").click(toggleHourly);
    }

})();
