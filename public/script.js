'use strict';

(() => {

  let icon = document.createElement('img');
  icon.setAttribute('id', 'icon')
  let body = document.querySelector('body');
  let lat = '40.9057';
  let long = '-74.079';

  function getPosition() {
    fetch(`http://ip-api.com/json`)
    .then(r => r.json())
    .then((data) => {
      lat = data.lat;
      long = data.lon;
    })
    .catch(err => console.log(err));
  }

  function getTemp() {
    fetch(`/api?myLat=${lat}&myLong=${long}`)
    // fetch(`/api`)
    .then(r => r.json())
    .then((data) => {

      // set temp to curent feels like temp and round it to whole number.
      document.querySelector('#temp').innerHTML = `Feels like ${Math.round(data.currently.apparentTemperature)} °F today.`;

      // creat and set icon to current weather type and string to match.
      // ** missing fog, clear-night, partly-cloudy-night, snow, & sleet **
      body.appendChild(icon);
      // console.log(data.currently.icon)
      if (data.currently.icon == 'cloudy') {
        document.querySelector('#icon').src = '/assets/cloudy.png';
        document.querySelector('#string').innerHTML = 'So many clouds right now.';
      } else if (data.currently.icon == 'partly-cloudy-day') {
          document.querySelector('#icon').src = '/assets/partly_cloudy.png';
          document.querySelector('#string').innerHTML = 'The sun is trying to sneak out right now.';
      } else if (data.currently.icon == 'partly-cloudy-night') {
          document.querySelector('#icon').src = '/assets/cloudy.png';
          document.querySelector('#string').innerHTML = 'The moon is hiding behind some clouds.';
      } else if (data.currently.icon == 'rain') {
          document.querySelector('#icon').src = '/assets/rainy.png';
          document.querySelector('#string').innerHTML = 'Bring an umbrella on your journey.';
      } else if (data.currently.icon == 'clear-day') {
          document.querySelector('#icon').src = '/assets/sunny.png';
          document.querySelector('#string').innerHTML = 'Bring your favorite sunglasses.';
      } else if (data.currently.icon == 'clear-night') {
          document.querySelector('#icon').src = '/assets/cloudy.png';
          document.querySelector('#string').innerHTML = 'The moon and stars are looking good right now.';
      }  else if (data.currently.icon == 'wind') {
          document.querySelector('#icon').src = '/assets/windy.png';
          document.querySelector('#string').innerHTML = 'Hang onto you cap, it’s windy right now.';
      }
    })
    .catch(err => console.log(err));
  }

  getTemp()

})();
