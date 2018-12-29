const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();

const questionRoutes = require('./api/routes/question');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/questions', questionRoutes);


module.exports = app;