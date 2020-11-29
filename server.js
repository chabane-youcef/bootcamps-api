const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// *Load env vars
dotenv.config({
    path: './config/config.env'
});

//* connect to database
connectDB();

// *Route files
const bootcamps = require('./routes/bootcamps');
const {
    connection
} = require("mongoose");

const app = express();

//* body parser
app.use(express.json());

//* Dev loggin middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

// *mount routers
app.use('/api/v1/bootcamps', bootcamps);

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