// 'use strict';

// //Kiểm tra bao nhiêu connect trong hệ thống code...
// const mongoose = require('mongoose');
// const os = require('os');
// const process = require('process');
// const _SECONDS = 5000;

// const countConnect = () => {
//     const numberConnection = mongoose.connections.length;
//     console.log(`Number of connections::${numberConnection}`);
// }

// // CHECK OVERLOAD
// const checkOverLoad = () => {
//     setInterval(() => {
//         const numConnection = mongoose.connections.length;
//         const numCores = os.cpus().length;
//         const memoryUsage = process.memoryUsage().rss;

//         //Example maximum number of collections based on number osf cores
//         const maxConnections = numCores * 5;

//         console.log(`Active connections: ${numConnection}`);
//         console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

//         if (numConnection > maxConnections) {
//             console.log(`Maximum number of connections: ${maxConnections}`);
//         }

//     }, _SECONDS); // Monitor every 5seconds
// }
// module.exports = {
//     checkOverLoad,
//     countConnect
// }
