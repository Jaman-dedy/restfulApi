const express = require('express');
const app = express();

const userRoutes = require('./api/routes/user');
const meetupRoutes = require('./api/routes/meetup');

app.use('/user', userRoutes);
app.use('/meetup', meetupRoutes);

module.exports = app;