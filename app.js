const express = require('express');
const app = express();

const userRoutes = require('./api/routes/user');
const meetupRoutes = require('./api/routes/meetup');
const questionRoutes = require('./api/routes/question');

app.use('/user', userRoutes);
app.use('/meetup', meetupRoutes);
app.use('/question', questionRoutes);

module.exports = app;