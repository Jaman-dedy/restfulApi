const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();




const userRoutes = require('./api/routes/user');
const rsvpRoutes = require('./api/routes/rsvp');
const questionRoutes = require('./api/routes/question');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/questions', questionRoutes);
app.use('/user',userRoutes);
app.use('/rsvp', rsvpRoutes);


module.exports = app;