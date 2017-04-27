const fetch = require('node-fetch');

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

module.exports = { getLocation };
