require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const locationRoute = require('./routes/locationAPI.js');
const darkskyRoute = require('./routes/darksky.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname,'public')));

app.use('/location', locationRoute);
app.use('/weather', darkskyRoute);

app.listen(PORT, () => console.log('Server is listening on', PORT));
