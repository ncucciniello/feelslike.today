const fetch = require('node-fetch');

// Using ip-api geolocation
function getLocation(req, res, next) {
  fetch(`http://ip-api.com/json`)
  .then(r => r.json())
  .then((data) => {
    // console.log(data);
    res.location = data;
    next();
  })
  .catch((err) => {
    console.log(err);
    res.err = err;
    next();
  });
}
// Using Google Maps Geolocatoin API
// function getLocation(req, res, next) {
//   fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD5COJtXRtxiPkp9MERs6BJNCawEYXYC0Q`,
//   {
//     method: "POST",
//   })
//   .then((r) => {
//     return r.json()
//   })
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

module.exports = { getLocation };
