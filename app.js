const express = require("express");
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//Error handling
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControlers");

//Routers
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

//body parser, readting data from body with 10kb or lower size
app.use(express.json({ limit: '10kb'}));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XXS
app.use(xss());

//Prevent parameter pollution, so you can query 2 or more
app.use(hpp({
  whitelist: [
    'suppliers',
    'ratingsAverage',
    'ratingsQuantity',
    'price',
    'ratings'
  ]
}));


//GLOBAL middlewares
//Security HTTP headers
app.use(helmet());


if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limiting to 100 request per hour from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 5*60*1000,
  message: 'Too many request from this IP, please try again in an hour'
})
app.use('/productpage', limiter)

//limiting to 5 login in 5mins
const loginlimiter = rateLimit({
  max: 5,
  windowMs: 5*60*1000,
  message: 'Please try again in 5 minutes'
})
app.use('/user/login', loginlimiter);





//Routes
app.use("/productpage", productRouter);
app.use("/user", userRouter);
app.use("/reviews", reviewRouter)



app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
