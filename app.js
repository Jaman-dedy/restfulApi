const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const meetupRoutes = require('./api/routes/meetup');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/meetup', meetupRoutes);



module.exports = app;