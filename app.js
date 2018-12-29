const express = require('express');
const morgan = require('morgan');
const app = express();




const userRoutes = require('./api/routes/user');
const rsvpRoutes = require('./api/routes/rsvp');

app.use(morgan('dev'));

app.use('/user',userRoutes);
app.use('/rsvp', rsvpRoutes);


module.exports = app;