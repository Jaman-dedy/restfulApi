const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();

const userRoutes = require('./api/routes/user');
const meetupRoutes = require('./api/routes/meetups');
const questionRoutes = require('./api/routes/questions');
const rsvpRoutes = require('./api/routes/rsvp');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/v1/users', userRoutes);
app.use('/v1/meetups', meetupRoutes);
app.use('/v1/questions', questionRoutes);
app.use('/v1/rsvp', rsvpRoutes);


module.exports = app;