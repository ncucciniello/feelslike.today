'use strict';

(() => {

  // navigator.geolocation.getCurrentPosition( (position) => {
  //   let lat = position.coords.latitude;
  //   let long = position.coords.longitude;
  //   console.log(`lat = ${lat}`);
  //   console.log(`long = ${long}`);
  // });

  function searchCity() {
    // fetch(`/api?myLat=${lat}&myLong=${long}`)
    fetch(`/api`)
    .then(r => r.json())
    .then((data) => {
      console.log(data.currently.apparentTemperature);
      document.querySelector('#temp').innerHTML = data.currently.apparentTemperature;
    })
    .catch(err => console.log(err));
  }

  // console.log('js is linked')
  let data = searchCity()

  // console.log(document.querySelector('#temp').innerHTML)
  // console.log(data)

})();
