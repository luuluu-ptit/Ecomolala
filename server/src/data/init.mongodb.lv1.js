'use strict'

const mongoose = require('mongoose');
const connectString = `mongodb://127.0.0.1:27017/Ecomolala`;

mongoose.connect(connectString).then(_ => console.log('Connecting to MongooDb'))
    .catch(err => console.log('Error connecting to MongooDB'));

//dev
if (1 === 1) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
}

module.exports = mongoose;
