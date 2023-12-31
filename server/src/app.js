require('dotenv').config();
var compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');

const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}))

////////////////////////////////////////////////////////////////
// const http = require('http');
// const socketIo = require('socket.io');
// const chatSocket = require('./socketIO/chat');

// const server = http.createServer(app);
// const io = socketIo(server);

// chatSocket(io);
////////////////////////////////////////////////////////////////

// int middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
// int db
require('./data/init.mongodb.lv1');
// const {checkOverLoad} = require('./helpers/check.connect');
// checkOverLoad();
// int routes 
app.use("/", require('./routers'));
//handling errors.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal Server Error"
    })
})
module.exports = app;