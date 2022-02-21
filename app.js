const express = require('express');

const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) Middlewares

//middleware - function that modify the incoming response data
//the data in the body is added to it

//morgan
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware hiii');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//changing the middleware stack

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

//mounting the router

// 4) Start Server
const port = 5000;

app.listen(port, () => {
  console.log('listening on port');
});

/*
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/
