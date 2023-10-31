//LEVE 1 : 
'use strict'

const mongoose = require('mongoose');
// const { db: { host, port, name } } = require('../configs/mongodb.js');
// const connectString = `mongodb://${host}:${port}/${name}`;
// const connectString = process.env.URL_MONGO_CLOUD;
const connectString = `mongodb://127.0.0.1:27017/Ecomolala`;
const { countConnect } = require('../helpers/check.connect');

class Database {
    constructor() {
        this.connect();
    }

    //connect
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connectString, { maxPoolSize: 50 }).then(_ => {
            console.log(`Connected to MongooDb`, countConnect());
        })
            .catch(err => console.log('Error connecting to MongooDB'));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;






//LEVEV 0 : 
// 'use strict'

// const mongoose = require('mongoose');
// const connectString = `mongodb+srv://petpawskonjluu:123a123b@cluster0.bo6kfb7.mongodb.net/?retryWrites=true&w=majority`;
// mongoose.connect(connectString).then(_ => console.log('Connecting to MongooDb'))
//     .catch(err => console.log('Error connecting to MongooDB'));

// //dev
// if (1 === 1) {
//     mongoose.set('debug', true);
//     mongoose.set('debug', { color: true });
// }

// module.exports = mongoose;
