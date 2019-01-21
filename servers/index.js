require('@babel/polyfill');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/userRoute');
const rsvpRoutes = require('./routes/rsvpRoute');
const questionRoutes = require('./routes/questionRoute');
const meetupRoutes = require('./routes/meetupRoute');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rsvps', rsvpRoutes);
app.use('/api/v1/meetups', meetupRoutes);


module.exports = app;
