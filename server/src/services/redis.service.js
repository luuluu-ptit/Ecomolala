const redis = require('redis')
const { promisify } = require('util');
const { reservationInventory } = require('../models/repositories/inventory.repo');
const redisClient = redis.createClient();

const pexpire = promisify(redisClient.pExpire).bind(redisClient);
const setnx = promisify(redisClient.setNX).bind(redisClient);
const del = promisify(redisClient.del).bind(redisClient);

const createLock = async (productId, quantity, cartId) => {
    const key = `key${productId}`;
    const retryCount = 15;
    const exprireTime = 3000;

    // khi 1 người đang thanh toán thì giữ lại không cho người khác 
    //thanh toán nữa, nếu có người khác vào thì cố gắng thử 10 lần
    for (let i = 0; i < retryCount; i++) {
        const result = await setnx(key, exprireTime);
        console.log(result, 'result');

        if (result == 1) {
            //ton kho
            const reservation = await reservationInventory({
                productId, quantity, cartId
            })

            if (reservation.modifiedCount) {
                await pexpire(key, exprireTime);
                return key;
            }
            return null;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 50))
        }
    }
}

const deleteLock = async (keyLock) => {
    return await del(keyLock);
}

module.exports = {
    createLock,
    deleteLock
}



