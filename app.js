const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./api/routes/user');
const rsvpRoutes = require('./api/routes/rsvp');
const questionRoutes = require('./api/routes/question');
const meetupRoutes = require('./api/routes/meetup');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1/questions', questionRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/rsvps', rsvpRoutes);
app.use('/v1/meetups', meetupRoutes);


module.exports = app;
