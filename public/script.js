'use strict';

(() => {

  // navigator.geolocation.getCurrentPosition( (position) => {
  //   let lat = position.coords.latitude;
  //   let long = position.coords.longitude;
  //   console.log(`lat = ${lat}`);
  //   console.log(`long = ${long}`);
  // });

  function getTemp() {
    // fetch(`/api?myLat=${lat}&myLong=${long}`)
    fetch(`/api`)
    .then(r => r.json())
    .then((data) => {
      console.log(`it feels like ${data.currently.apparentTemperature} degrees right now`);
      console.log(`and it is ${data.currently.icon}`);
      // set temp to currnet feels like temp
      document.querySelector('#temp').innerHTML = data.currently.apparentTemperature;
      // set icon to current weather type
      // missing fog, clear-night, partly-cloudy-night, snow, & sleet
      if (data.currently.icon == 'cloudy') {
        document.querySelector('#icon').src = '/assets/rainy.png';
        document.querySelector('#string').innerHTML = 'So many clouds right now.';
      } else if (data.currently.icon == 'partly-cloudy-day') {
          document.querySelector('#icon').src = '/assets/partly_cloudy.png';
          document.querySelector('#string').innerHTML = 'The sun is trying to sneak out right now.';
      } else if (data.currently.icon == 'rain') {
          document.querySelector('#icon').src = '/assets/rainy.png';
          document.querySelector('#string').innerHTML = 'Bring an umbrella on your journey.';
      } else if (data.currently.icon == 'clear-day') {
          document.querySelector('#icon').src = '/assets/sunny.png';
          document.querySelector('#string').innerHTML = 'Bring your favorite sunglasses.';
      } else if (data.currently.icon == 'wind') {
          document.querySelector('#icon').src = '/assets/windy.png';
          document.querySelector('#string').innerHTML = 'Hang onto you cap, it’s windy right now.';
      }
    })
    .catch(err => console.log(err));
  }


  getTemp()
})();
