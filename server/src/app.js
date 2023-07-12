require('dotenv').config();
var compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');

const app = express();

// int middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());


// int db
require('./data/init.mongodb.lv1');
// const {checkOverLoad} = require('./helpers/check.connect');
// checkOverLoad();

// int routes 
app.use("/", require('./routers'));


//handling errors.



module.exports = app;