const redis = require('redis')
const { promisify } = require('util');
const { reservationInventory } = require('../models/repositories/inventory.repo');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOSTNAME,
    port: parseInt(process.env.REDIS_PORT)
    // password: process.env.REDIS_PASSWORD
});

redisClient.connect();

redisClient.on('connect', function () {
    console.log('Connected to Redis...');
});

const pexpire = promisify(redisClient.pExpire).bind(redisClient);
const setnx = promisify(redisClient.setNX).bind(redisClient);
const del = promisify(redisClient.del).bind(redisClient);

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createLock = async (productId, quantity, cartId) => {
    console.log('resultXXX1');
    const key = `key${productId}`;
    const retryCount = 15;
    const exprireTime = 3000;


    //Khi 1 người đang thanh toán thì giữ lại không cho người khác 
    //thanh toán nữa, nếu có người khác vào thì cố gắng thử 10 lần
    for (let i = 0; i < retryCount.length; i++) {
        try {
            console.log('resultXXX2');
            const result = await setnx(key, exprireTime);
            // const result = 1;
            console.log(result, 'result');
            console.log('resultXXX100');

            if (result === 1) {
                console.log('resultXXX3');
                //ton kho
                const reservation = await reservationInventory({
                    productId, quantity, cartId
                })

                if (reservation.modifiedCount) {
                    console.log('resultXXX4');
                    await pexpire(key, exprireTime);
                    return key;
                }
                return null;
            } else {
                console.log('resultXXX99');
                await new Promise((resolve) => setTimeout(resolve, 50))
                // await sleep(10);
            }
            console.log('resultXXX5');
        } catch (error) {
            console.log('resultXXX88');
            throw new Error(error);
        }
    }
}

const deleteLock = async (keyLock) => {
    console.log('resultXXX6');
    return await del(keyLock);
}

module.exports = {
    createLock,
    deleteLock
}



