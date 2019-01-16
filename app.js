const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./servers/routes/user');
const rsvpRoutes = require('./servers/routes/rsvp');
const questionRoutes = require('./servers/routes/question');
const meetupRoutes = require('./servers/routes/meetup');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/questions', questionRoutes);
app.use('/users', userRoutes);
app.use('/rsvps', rsvpRoutes);
app.use('/meetups', meetupRoutes);


module.exports = app;
