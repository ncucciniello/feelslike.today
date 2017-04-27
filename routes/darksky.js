const router = require('express').Router();
const { getWeather } = require('../services/darksky.js');

router.get('/', getWeather, (req, res) => {
  res.json(res.forecast);
});

module.exports = router;
