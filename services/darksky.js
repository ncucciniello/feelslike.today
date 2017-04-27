const fetch = require('node-fetch');
const API_KEY = process.env.API_KEY;

function search(req, res, next) {
  fetch(`https://api.darksky.net/forecast/${API_KEY}/${req.query.myLat},${req.query.myLong}`)
  .then(r => r.json())
  .then((data) => {
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
