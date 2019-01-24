import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';


import questionRoutes from './routes/questionRoute';
import userRoutes from './routes/userRoute';
import meetupRoutes from './routes/meetupRoute';

require('@babel/polyfill');

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/meetups', meetupRoutes);


export default app;
