const express = require('express');
const morgan = require('morgan');
const app = express();

const rsvpRoutes = require('./api/routes/rsvp');

app.use(morgan('dev'));

app.use('/rsvp', rsvpRoutes);

module.exports = app;