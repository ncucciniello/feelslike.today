const router = require('express').Router();
const {getLocation} = require('../services/locationAPI.js');

router.get('/', getLocation, (req, res) => {
  res.json(res.location);
});

module.exports = router;
