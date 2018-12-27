const express = require('express');
const morgan = require('morgan');
const app = express();

const userRoutes = require('./api/routes/user');
const meetupRoutes = require('./api/routes/meetup');
const questionRoutes = require('./api/routes/question');
const rsvpRoutes = require('./api/routes/rsvp');

app.use(morgan('dev'));

app.use('/user', userRoutes);
app.use('/meetup', meetupRoutes);
app.use('/question', questionRoutes);
app.use('/rsvp', rsvpRoutes);

module.exports = app;