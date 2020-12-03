const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// *Load env vars
dotenv.config({
    path: './config/config.env'
});

//* connect to database
connectDB();

// *Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

//* body parser
app.use(express.json());

//* Dev loggin middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

//* file uploading
app.use(fileupload());

//* set static folder
app.use(express.static(path.join(__dirname, 'public')))

// *mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mide on port ${PORT}`.magenta.bold)
);

//* Handle unhandled promise rejections
process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`.red);
    //! close server & exit process
    server.close(() => process.exit(1));
})