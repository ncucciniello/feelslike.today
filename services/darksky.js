const fetch = require('node-fetch');
const API_KEY = process.env.API_KEY;
let myLat = '40.771372';
let myLong = '-73.952916';

function search(req, res, next) {
  fetch(`https://api.darksky.net/forecast/${API_KEY}/${myLat},${myLong}`)
  .then(r => r.json())
  .then((data) => {
    console.log(data);
    res.forecast = data;
    next();
  })
  .catch((err) => {
    console.log(err);
    res.err = err;
    next();
  });
}

module.exports = { search };
